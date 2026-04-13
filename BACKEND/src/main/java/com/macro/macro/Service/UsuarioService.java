package com.macro.macro.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.macro.macro.Model.Usuario;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;


@Service
public class UsuarioService {

    public static final String COL_NAME = "usuarios";

    public Usuario save(Usuario data) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document();
            data.setId(docRef.getId());

            docRef.set(data);

            return data;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar usuário");
        }
    }

    public Usuario findById(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot doc = db.collection(COL_NAME).document(id).get().get();

        if (!doc.exists()) {
            return null;
        }

        Usuario usuario = doc.toObject(Usuario.class);
        usuario.setId(doc.getId());

        return usuario;
    }

    public List<Usuario> findAll(int limit) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        List<Usuario> lista = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection(COL_NAME)
                .limit(limit)
                .get();

        for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
            Usuario usuario = doc.toObject(Usuario.class);
            usuario.setId(doc.getId());

            lista.add(usuario);
        }

        return lista;
    }

    public void delete(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COL_NAME).document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        docRef.delete().get();
    }
}
