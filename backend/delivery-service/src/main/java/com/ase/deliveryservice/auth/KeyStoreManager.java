package com.ase.deliveryservice.auth;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.Key;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.PublicKey;

@Component
public class KeyStoreManager {
    private KeyStore keyStore;

    private String keyAlias;

    private char[] password = "Password1".toCharArray();

    public KeyStoreManager() throws KeyStoreException, IOException {
        loadKeyStore();
    }

    public void loadKeyStore() throws KeyStoreException, IOException {
        keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        File keystoreFile = new File("backend/auth-service/src/main/resources/auth.keystore");

        try (FileInputStream fis = new FileInputStream(keystoreFile)) {
            keyStore.load(fis, password);
            keyAlias = keyStore.aliases().nextElement();
        } catch (Exception e) {
            System.err.println("Error when loading Keystore");
            e.printStackTrace();
        }
    }

    protected PublicKey getPublicKey() {
        try {
            return keyStore.getCertificate(keyAlias).getPublicKey();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    protected Key getPrivateKey() {
        try {
            return keyStore.getKey(keyAlias, "Password1".toCharArray());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
