package com.macro.macro.Service;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.macro.macro.Model.Chamado;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ChamadosService {
    public static final String COL_NAME = "Chamados";

    public Chamado save(Chamado data) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document();
            data.setId(docRef.getId());

            docRef.set(data).get();

            return data;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar chamado");
        }
    }

    public Chamado findById(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot doc = db.collection(COL_NAME).document(id).get().get();

        if (!doc.exists()) {
            return null;
        }

        Chamado Chamado = doc.toObject(Chamado.class);
        Chamado.setId(doc.getId());

        return Chamado;
    }

    public List<Chamado> findAll(int limit) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        List<Chamado> lista = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection(COL_NAME)
                .limit(limit)
                .get();

        for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
            Chamado Chamado = doc.toObject(Chamado.class);
            Chamado.setId(doc.getId());

            lista.add(Chamado);
        }

        return lista;
    }
    
    public List<Chamado> findByStatus(String status) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        List<Chamado> lista = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection(COL_NAME)
                .whereEqualTo("status", status)
                .get();

        for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
            Chamado Chamado = doc.toObject(Chamado.class);
            Chamado.setId(doc.getId());

            lista.add(Chamado);
        }

        return lista;
    }

    public void delete(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COL_NAME).document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new RuntimeException("Chamado não encontrado");
        }

        docRef.delete().get();
    }
}
