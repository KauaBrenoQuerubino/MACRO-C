package com.macro.macro.Service;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.macro.macro.Model.Conversa;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ConversaService {

    public static final String COL_NAME = "Conversa";

    public Conversa save(Conversa data) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document();
            data.setId(docRef.getId());

            docRef.set(data);

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






}
