package com.macro.macro.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.macro.macro.Model.ENUM.EAcao;
import com.macro.macro.Model.Microservico;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class MicroservicoService {

    public static final String COL_NAME = "Microservicos";

    public Microservico save(Microservico data) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document();

            data.setId(docRef.getId());

            docRef.set(data).get();

            return data;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar microservico");
        }
    }

    public Microservico update(Microservico data) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef =
                    db.collection(COL_NAME).document(data.getId());

            DocumentSnapshot snapshot = docRef.get().get();

            if (!snapshot.exists()) {
                throw new RuntimeException("Microserviço não encontrado");
            }

            docRef.set(data).get();

            return data;

        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public Microservico findById(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot doc = db.collection(COL_NAME).document(id).get().get();

        if (!doc.exists()) {
            return null;
        }

        Microservico microservico = doc.toObject(Microservico.class);
        microservico.setId(doc.getId());

        return microservico;
    }

    public List<Microservico> findAll(int limit) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        List<Microservico> lista = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection(COL_NAME)
                .limit(limit)
                .get();

        for (QueryDocumentSnapshot doc : future.get().getDocuments()) {

            System.out.println(doc.getData());

            Microservico microservico = doc.toObject(Microservico.class);
            microservico.setId(doc.getId());

            lista.add(microservico);
        }

        return lista;
    }

    public void delete(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COL_NAME).document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new RuntimeException("Microservico não encontrado");
        }

        docRef.delete().get();
    }


    /// Gerenciar Microservicos ///


    public void executarAcao(Microservico ms, EAcao acao) {

        switch (acao) {
            case START:
                executarComando("docker", "start", ms.getNome());
                break;
            case STOP:
                executarComando("docker", "stop", ms.getNome());
                break;
            case RESTART:
                executarComando("docker",  "restart",  ms.getNome());
                break;
        }
    }

    public String executarComando(String... comando) {
        try {

            ProcessBuilder pb = new ProcessBuilder(comando);
            pb.redirectErrorStream(true);

            Process process = pb.start();

            StringBuilder output = new StringBuilder();
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                output.append(line).append("\n");
            }

            int exitCode = process.waitFor();

            if (exitCode != 0) {
                throw new RuntimeException("Erro ao executar comando: " + output);
            }

            return output.toString();

        } catch (Exception e) {
            throw new RuntimeException("Falha ao executar comando", e);
        }
    }





}
