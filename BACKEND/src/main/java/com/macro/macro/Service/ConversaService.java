package com.macro.macro.Service;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.macro.macro.Model.Conversa;
import com.macro.macro.Model.DTO.ConversaDTO;
import com.macro.macro.Model.Mensagem;
import com.macro.macro.Model.Usuario;
import org.checkerframework.checker.units.qual.A;
import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ConversaService {

    @Autowired
    UsuarioService usuarioService;

    public static final String COL_NAME = "Conversa";
    public static final String SUBCOL_NAME = "Mensagens";



    public Conversa save(ConversaDTO dto) {

        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document();

            Conversa data = new Conversa();

            List<String> participantes = dto.getParticipantesEmails();

            data.setId(docRef.getId());

            data.setParticipantesId(participantes);

            data.setDataCriacao(String.valueOf(LocalDate.now()));

            docRef.set(data).get();

            return data;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar conversa");
        }
    }

    public Conversa findById(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot doc = db.collection(COL_NAME).document(id).get().get();

        if (!doc.exists()) {
            return null;
        }

        Conversa conversa = doc.toObject(Conversa.class);
        conversa.setId(doc.getId());

        return conversa;
    }

    public List<Conversa> findAll(int limit) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        List<Conversa> lista = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection(COL_NAME)
                .limit(limit)
                .get();

        for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
            Conversa conversa = doc.toObject(Conversa.class);
            conversa.setId(doc.getId());

            lista.add(conversa);
        }

        return lista;
    }

    public void delete(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COL_NAME).document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new RuntimeException("Conversa não encontrado");
        }

        docRef.delete().get();
    }


    public List<Conversa> findByUserID(String participanteId) throws Exception {

        Firestore db = FirestoreClient.getFirestore();

        List<Conversa> lista = new ArrayList<>();

        ApiFuture<QuerySnapshot> future =
                db.collection(COL_NAME).get();

        List<QueryDocumentSnapshot> documents =
                future.get().getDocuments();

        for (QueryDocumentSnapshot doc : documents) {

            Conversa conversa = doc.toObject(Conversa.class);

            if (conversa.getParticipantesId() != null) {

                boolean encontrou = conversa.getParticipantesId()
                        .stream()
                        .anyMatch(p -> p.equals(participanteId));

                if (encontrou) {
                    lista.add(conversa);
                }
            }
        }

        return lista;
    }

    public void adicionarMensagem(String conversaId, Mensagem msg) throws Exception {

        Firestore db = FirestoreClient.getFirestore();

        // referência da conversa
        DocumentReference conversaRef = db.collection(COL_NAME).document(conversaId);

        // cria documento na subcollection "mensagens"
        DocumentReference msgRef = conversaRef.collection(SUBCOL_NAME).document();

        msg.setId(msgRef.getId());
        msg.setDataEnvio(LocalDateTime.now().toString());

        msgRef.set(msg).get();

    }

    public List<Mensagem> getMensagens(String conversaId) throws Exception {

        Firestore db = FirestoreClient.getFirestore();

        QuerySnapshot snapshot = db.collection(COL_NAME)
                .document(conversaId)
                .collection(SUBCOL_NAME)
                .orderBy("dataEnvio")
                .get()
                .get();

        List<Mensagem> mensagens = new ArrayList<>();

        for (DocumentSnapshot doc : snapshot.getDocuments()) {
            mensagens.add(doc.toObject(Mensagem.class));
        }

        return mensagens;
    }






}
