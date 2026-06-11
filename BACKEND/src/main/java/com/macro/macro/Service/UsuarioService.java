package com.macro.macro.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.type.DateTime;
import com.macro.macro.Exception.ConflictException;
import com.macro.macro.Exception.NotFoundException;
import com.macro.macro.Exception.UnauthorizedException;
import com.macro.macro.Model.DTO.ResetSenhaDTO;
import com.macro.macro.Model.DTO.UpdateSenhaDTO;
import com.macro.macro.Model.DTO.UpdateUsuarioDTO;
import com.macro.macro.Model.DTO.UsuarioDTO;
import com.macro.macro.Model.Microservico;
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

    public Usuario save(UsuarioDTO dto) throws ExecutionException, InterruptedException {

        Firestore db = FirestoreClient.getFirestore();

        Usuario existente = findByEmail(dto.getEmail());

        if (existente != null) {
            throw new ConflictException("Email ja cadastrado!");
        }

        Usuario usuario;

        usuario = new Usuario();


        usuario.setNome(dto.getNome());
        usuario.setFotoPerfil(dto.getFotoPerfil());
        usuario.setEmail(dto.getEmail());
        usuario.setSenhaHash(PasswordUtil.encode(dto.getSenha()));
        usuario.setPerfil(dto.getPerfil());
        usuario.setStatus("ATIVO");
        usuario.setCreatedAt(String.valueOf(LocalDate.now()));
        usuario.setUpdatedAt(String.valueOf(LocalDate.now()));

        DocumentReference docRef = db.collection(COL_NAME).document();

        usuario.setId(docRef.getId());

        docRef.set(usuario).get();


        return usuario;
    }

    public Usuario update(String id, UpdateUsuarioDTO dto) throws ExecutionException, InterruptedException {

        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COL_NAME).document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new NotFoundException("Usuario não encontrado");
        }
        Usuario usuario = snapshot.toObject(Usuario.class);

        usuario.setNome(dto.getNome());

        usuario.setFotoPerfil(dto.getFotoPerfil());

        usuario.setEmail(dto.getEmail());

        usuario.setPerfil(dto.getPerfil());

        usuario.setStatus(dto.getStatus());

        usuario.setUpdatedAt(String.valueOf(LocalDate.now()));

        docRef.set(usuario).get();

        return usuario;
    }

    public void atualizarSenha(String id, UpdateSenhaDTO dto) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COL_NAME).document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new NotFoundException("Usuario não encontrado para o Update");
        }

        Usuario usuario = snapshot.toObject(Usuario.class);

        if (!PasswordUtil.matches(dto.getSenhaAtual(), usuario.getSenhaHash())) {
            throw new UnauthorizedException("Senha atual incorreta");
        }

        usuario.setSenhaHash(PasswordUtil.encode(dto.getNovaSenha()));
        usuario.setUpdatedAt(String.valueOf(LocalDate.now()));
        docRef.set(usuario).get();

    }

    public void recuperarSenha(String id, String senha) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        System.out.println("Senha:" + senha);

        DocumentReference docRef = db.collection(COL_NAME).document(id);
        DocumentSnapshot snapshot = docRef.get().get();

        if (!snapshot.exists()) {
            throw new NotFoundException("Usuário não encontrado para atualização");
        }

        Usuario usuario = snapshot.toObject(Usuario.class);

        usuario.setSenhaHash(PasswordUtil.encode(senha));
        usuario.setUpdatedAt(String.valueOf(LocalDate.now()));

        docRef.set(usuario).get();

    }

    public Usuario findById(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        DocumentSnapshot doc = db.collection(COL_NAME).document(id).get().get();

        if (!doc.exists()) {
            throw new NotFoundException("Usuario não encontrado");
        }

        Usuario usuario = doc.toObject(Usuario.class);
        usuario.setId(doc.getId());

        return usuario;
    }

    public Usuario findByEmail(String email) throws ExecutionException, InterruptedException {

        if (email == null || email.trim().isEmpty()) {
            throw new UnauthorizedException("O email nao pode estar nulo");
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

    public List<Usuario> findByEmails(List<String> emails) throws ExecutionException, InterruptedException {

        if (emails == null || emails.isEmpty()) {
            throw new UnauthorizedException("O email não pode estar nulo");
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
            throw new NotFoundException("Usuário não encontrado");
        }

        docRef.delete().get();
    }



}
