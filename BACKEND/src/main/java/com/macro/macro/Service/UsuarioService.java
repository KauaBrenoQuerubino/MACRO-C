package com.macro.macro.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.type.DateTime;
import com.macro.macro.Model.DTO.UsuarioDTO;
import com.macro.macro.Model.Usuario;
import com.macro.macro.Until.PasswordUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;


@Service
public class UsuarioService {

    public static final String COL_NAME = "Usuarios";

    public Usuario save(UsuarioDTO dto) {

        try {

            Firestore db = FirestoreClient.getFirestore();

            Usuario existente = findByEmail(dto.getEmail());

            Usuario usuario;

            if (existente != null) {


                usuario = existente;

                usuario.setNome(dto.getNome());
                usuario.setEmail(dto.getEmail());
                usuario.setPerfil(dto.getPerfil());


                usuario.setUpdatedAt(String.valueOf(LocalDate.now()));

                if (dto.getSenha() != null && !dto.getSenha().isEmpty()) {
                    usuario.setSenhaHash(PasswordUtil.encode(dto.getSenha()));
                }

                db.collection(COL_NAME).document(usuario.getId()).set(usuario).get();

            } else {

                usuario = new Usuario();

                String id = "ID_" + LocalDate.now() + "_" + dto.getNome();


                usuario.setId(id);
                usuario.setNome(dto.getNome());
                usuario.setFotoPerfil(dto.getFotoPerfil());
                usuario.setEmail(dto.getEmail());
                usuario.setSenhaHash(PasswordUtil.encode(dto.getSenha()));
                usuario.setPerfil(dto.getPerfil());
                usuario.setStatus("ATIVO");
                usuario.setCreatedAt(String.valueOf(LocalDate.now()));
                usuario.setUpdatedAt(String.valueOf(LocalDate.now()));


                DocumentReference docRef = db.collection(COL_NAME).document(id);

                docRef.set(usuario).get();


            }

            return usuario;


        } catch (Exception e) {
            throw new RuntimeException("Erro ao salvar usuário" + e);
        }
    }

    public Usuario findByEmail(String email) throws ExecutionException, InterruptedException {

        if (email == null || email.trim().isEmpty()) {
            return null;
        }

        Firestore db = FirestoreClient.getFirestore();

        Query query = db.collection(COL_NAME)
                .whereEqualTo("email", email)
                .limit(1);

        QuerySnapshot querySnapshot = query.get().get();

        if (querySnapshot.isEmpty()) {
            return null;
        }

        DocumentSnapshot doc = querySnapshot.getDocuments().get(0);

        return doc.toObject(Usuario.class);
    }

    public List<Usuario> findByEmails(List<String> emails)
            throws ExecutionException, InterruptedException {

        if (emails == null || emails.isEmpty()) {
            return new ArrayList<>();
        }

        Firestore db = FirestoreClient.getFirestore();

        Query query = db.collection(COL_NAME)
                .whereIn("email", emails);

        QuerySnapshot querySnapshot = query.get().get();

        List<Usuario> usuarios = new ArrayList<>();

        for (DocumentSnapshot doc : querySnapshot.getDocuments()) {
            usuarios.add(doc.toObject(Usuario.class));
        }

        return usuarios;
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

    public String processarImagem(MultipartFile file) throws IOException {

        byte[] bytes = file.getBytes();

        // valida tamanho (1MB)
        if (bytes.length > 1_000_000) {
            throw new RuntimeException("Imagem muito grande");
        }

        // (opcional) comprimir aqui

        return Base64.getEncoder().encodeToString(bytes);
    }

}
