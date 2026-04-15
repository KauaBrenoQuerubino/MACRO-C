package com.macro.macro.Service;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.macro.macro.Model.Mensagem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class MensagemService {
    public static final String COL_NAME = "Mensagens";

    public Mensagem save(Mensagem data) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document();
            data.setId(docRef.getId());

            docRef.set(data);

            return data;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar mensagem");
        }
    }

    public Mensagem findById(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot doc = db.collection(COL_NAME).document(id).get().get();

        if (!doc.exists()) {
            return null;
        }

        Mensagem mensagem = doc.toObject(Mensagem.class);
        mensagem.setId(doc.getId());

        return mensagem;
    }

    public List<Mensagem> findAll(int limit) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        List<Mensagem> lista = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection(COL_NAME)
                .limit(limit)
                .get();

        for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
            Mensagem mensagem = doc.toObject(Mensagem.class);
            mensagem.setId(doc.getId());

            lista.add(mensagem);
        }

        return lista;
    }

    public void delete(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COL_NAME).document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new RuntimeException("Mensagem não encontrada");
        }

        docRef.delete().get();
    }
}
