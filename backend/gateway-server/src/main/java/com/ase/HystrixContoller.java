package com.ase;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("fallbacks")
public class HystrixContoller {


    @GetMapping("/user")
    public String userFallback(){
        return "User Service is not available";
    }

    @GetMapping("/box")
    public String boxFallback(){
        return "Box Service is not available";
    }

    @GetMapping("/delivery")
    public String deliveryFallback(){
        return "Delivery Service is not available";
    }

    @GetMapping("/auth")
    public String authFallback(){
        return "Authentication Service is not available";
    }
}
