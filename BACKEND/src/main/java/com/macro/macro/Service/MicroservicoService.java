package com.macro.macro.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.macro.macro.Exception.BadRequestException;
import com.macro.macro.Exception.NotFoundException;
import com.macro.macro.Model.DTO.RequisicaoDTO;
import com.macro.macro.Model.ENUM.EAcao;
import com.macro.macro.Model.Microservico;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class MicroservicoService {

    public static final String COL_NAME = "Microservicos";

    public Microservico save(Microservico data) throws ExecutionException, InterruptedException {

        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COL_NAME).document();

        data.setCreatedAt(String.valueOf(LocalDate.now()));

        data.setUpdatedAt(String.valueOf(LocalDate.now()));

        data.setId(docRef.getId());

        docRef.set(data).get();

        return data;

    }

    public Microservico update(Microservico data) throws ExecutionException, InterruptedException {

        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef =
                db.collection(COL_NAME).document(data.getId());

        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new NotFoundException("Microserviço não encontrado para Atualizacao");
        }

        data.setUpdatedAt(String.valueOf(LocalDate.now()));

        docRef.set(data).get();

        return data;


    }

    public Microservico findById(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot doc = db.collection(COL_NAME).document(id).get().get();

        if (!doc.exists()) {
           throw new NotFoundException("Microserviço não encontrado para Atualização");
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
            throw new NotFoundException("Microservico não encontrado");
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
                output.append(line).append("\n");
            }

            int exitCode = process.waitFor();

            if (exitCode != 0) {
                throw new BadRequestException("Erro ao executar comando: " + output);
            }

            return output.toString();

        } catch (Exception e) {
            throw new BadRequestException("Falha ao executar comando " +  e.getMessage());
        }
    }

    public String fazerRequisicao(String url, RequisicaoDTO req) throws IOException, InterruptedException {

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(url + req.getEndpoints()));

        if (req.getHeaders() != null) {
            req.getHeaders().forEach(builder::header);
        }

        ObjectMapper mapper = new ObjectMapper();

        String json = "";

        if (req.getBody() != null) {
            json = mapper.writeValueAsString(req.getBody());
        }

        // Método HTTP

        switch (req.getMetodo().toUpperCase()) {
            case "GET":
                builder.GET();
                break;
            case "POST":
                builder.POST(HttpRequest.BodyPublishers.ofString(json));
                break;
            case "PUT":
                builder.PUT(HttpRequest.BodyPublishers.ofString(json));
                break;
            case "DELETE":
                builder.DELETE();
                break;
        }

        HttpRequest request = builder.build();

        long inicio = System.currentTimeMillis();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        long fim = System.currentTimeMillis();

        return response.body();

    }


//    public void adicionarRequisicao(String id, RequisicaoDTO requisicaoDTO) throws ExecutionException, InterruptedException {
//
//        Firestore db = FirestoreClient.getFirestore();
//
//        DocumentReference docRef = db.collection(COL_NAME).document(id);
//
//        docRef.update("requisicoes", FieldValue.arrayUnion(requisicaoDTO)).get();
//    }




}
