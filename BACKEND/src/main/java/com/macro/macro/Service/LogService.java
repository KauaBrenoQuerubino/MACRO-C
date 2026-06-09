package com.macro.macro.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.macro.macro.Exception.InternalServerException;
import com.macro.macro.Exception.NotFoundException;
import com.macro.macro.Model.Log;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class LogService {

    public static final String COL_NAME = "Logs";

    public Log save(Log data) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document();
            data.setId(docRef.getId());

            docRef.set(data).get();

            return data;

        } catch (Exception e) {
            throw new InternalServerException("Erro ao salvar Log");
        }
    }

    public Log findById(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot doc = db.collection(COL_NAME).document(id).get().get();

        if (!doc.exists()) {
            throw new NotFoundException("Log nao encontrado");
        }

        Log log = doc.toObject(Log.class);
        log.setId(doc.getId());

        return log;
    }

    public List<Log> findAll(int limit) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        List<Log> lista = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection(COL_NAME)
                .limit(limit)
                .get();

        for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
            Log log = doc.toObject(Log.class);
            log.setId(doc.getId());

            lista.add(log);
        }

        return lista;
    }
}
