package com.ase.notificationservice.auth;

import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.InputStream;
import java.security.Key;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.PublicKey;

@Component
public class KeyStoreManager {
    private KeyStore keyStore;

    private String keyAlias;

    private char[] password = "password".toCharArray();

    public KeyStoreManager() throws KeyStoreException, IOException{
        loadKeyStore();
    }

    public void loadKeyStore() throws KeyStoreException, IOException{
        keyStore = KeyStore.getInstance(KeyStore.getDefaultType());

        try(InputStream fis = getClass().getResourceAsStream("/auth.keystore")) {
            keyStore.load(fis,password);
            keyAlias = keyStore.aliases().nextElement();
        } catch(Exception e){
            System.err.println("Error when loading Keystore");
            e.printStackTrace();
        }
    }

    protected PublicKey getPublicKey(){
        try{
            return keyStore.getCertificate(keyAlias).getPublicKey();

        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    protected Key getPrivateKey(){
        try{
            return keyStore.getKey(keyAlias, password);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}

