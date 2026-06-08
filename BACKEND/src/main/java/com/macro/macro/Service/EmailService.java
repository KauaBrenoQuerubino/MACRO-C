package com.macro.macro.Service;

import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.macro.macro.Model.DTO.*;
import com.macro.macro.Model.Usuario;
import com.macro.macro.Until.PasswordUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;

@Service
public class EmailService {

    public static final String COL_NAME = "TOKEN";

    @Value("${spring.mail.username}")
    private String remetente;

    @Autowired
    UsuarioService service;


    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarEmail(String email) throws ExecutionException, InterruptedException, MessagingException {

        Usuario usuario = service.findByEmail(email);

        if (usuario == null) {
            return;
        }

        String token = gerarToken(email);

        String corpoEmail = """
        <html>
         <body style="font-family: Arial, sans-serif; color: #333;">
           <h2>Recuperação de Senha</h2>
           <p>Olá, <strong>%s</strong>!</p>
           <p>Recebemos uma solicitação para redefinir sua senha.</p>

           <p>
             <strong>Código de verificação:</strong>
           </p>

           <div style="
               font-size: 24px;
               font-weight: bold;
               color: #007BFF;
               padding: 10px;
               border: 1px solid #ddd;
               width: fit-content;">
               %s
           </div>

           <p>Este código expira em 15 minutos.</p>

           <p>Se você não solicitou isso, ignore este e-mail.</p>

           <br>

           <p>
             Atenciosamente,<br>
             Equipe MACRO
           </p>
         </body>
        </html>
        """.formatted(usuario.getNome(), token);

        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(email);
        helper.setFrom(remetente);
        helper.setSubject("TOKEN DE RECUPERAÇÃO");
        helper.setText(corpoEmail, true); // true = HTML

        mailSender.send(message);
    }

    public boolean validarCodigo(PasswordResetTokenDTO dto) throws ExecutionException, InterruptedException {


        Firestore db = FirestoreClient.getFirestore();

        Query query = db.collection(COL_NAME)
                .whereEqualTo("token", dto.getToken());

        QuerySnapshot querySnapshot = query.get().get();

        if (querySnapshot.isEmpty()) {
            return false;
        }

        DocumentSnapshot document = querySnapshot.getDocuments().get(0);

        RestaurarSenhaDTO tokenDTO =
                document.toObject(RestaurarSenhaDTO.class);

        LocalDateTime expirationTime = LocalDateTime.parse(tokenDTO.getDataExpiracao());

        if (LocalDateTime.now().isAfter(expirationTime)) {
            return false;
        }

        return true;

    }

    public void novaSenha(ResetSenhaDTO dto) throws ExecutionException, InterruptedException {

        Usuario usuario = service.findByEmail(dto.getEmail());

        if(usuario == null) {
            return;
        }

        PasswordResetTokenDTO passwordResetTokenDTO = new PasswordResetTokenDTO();
        passwordResetTokenDTO.setEmail(dto.getEmail());
        passwordResetTokenDTO.setToken(dto.getToken());

        System.out.println(validarCodigo(passwordResetTokenDTO));

        if (!validarCodigo(passwordResetTokenDTO)) {
            System.out.println("erro");
            return;
        }

        service.recuperarSenha(usuario.getId(), dto.getNovaSenha());

    }

    private String gerarToken(String email) throws ExecutionException, InterruptedException {

        String token = RandomStringUtils.randomAlphabetic(6).toUpperCase();

        RestaurarSenhaDTO rsDTO = new RestaurarSenhaDTO();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(15);

        rsDTO.setEmail(email);
        rsDTO.setDataExpiracao(String.valueOf(expirationTime));
        rsDTO.setToken(token);

        Firestore db = FirestoreClient.getFirestore();

        DocumentReference docRef = db.collection(COL_NAME).document();

        rsDTO.setId(docRef.getId());

        docRef.set(rsDTO).get();

        return token;

    }


}
