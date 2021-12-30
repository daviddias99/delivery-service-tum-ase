package com.ase.authservice.jwt;

import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URL;
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

    public File loadEmployeesWithSpringInternalClass() throws FileNotFoundException {
        return ResourceUtils.getFile(
                "classpath:auth.keystore");
    }

    public void loadKeyStore() throws KeyStoreException, IOException {
        keyStore = KeyStore.getInstance(KeyStore.getDefaultType());

        // // ClassLoader loader = KeyStoreManager.class.getClassLoader();
        // URL url1 = getClass().getClassLoader().getResource("bootstrap.yml");
        // InputStream url2 = getClass().getClassLoader().getResourceAsStream("auth.keystore");
        File keystoreFile = new File("src/main/resources/auth.keystore");

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
