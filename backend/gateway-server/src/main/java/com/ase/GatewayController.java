package com.ase;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GatewayController {

    @GetMapping("/")
    ResponseEntity<String> get()throws Exception{
        return ResponseEntity.ok("XRSF-Request");
    }
}
