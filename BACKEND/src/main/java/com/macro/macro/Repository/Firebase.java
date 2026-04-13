package com.macro.macro.Repository;


import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

@Repository
public class Firebase {

    @PostConstruct
    public void iniciarBanco(){

        try {

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(
                            new ClassPathResource("firebase/firebase-key.json").getInputStream()))
                    .setProjectId("Macro-db")
                    .build();
            FirebaseApp.initializeApp(options);

            Firestore db = FirestoreClient.getFirestore();

        } catch (Exception e) {
            System.out.println(e.getCause());
            System.out.println(e.getMessage());
            throw new RuntimeException(e);


        }
    }


}
