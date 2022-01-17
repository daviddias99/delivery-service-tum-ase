package com.ase.boxservice;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@ComponentScan("com.ase")
@SpringBootApplication
@EnableMongoRepositories
@EnableEurekaClient

public class BoxServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoxServiceApplication.class, args);
    }

    @Bean
    public ModelMapper getModelMapper(){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        //modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE); //HATA OLURSA BUNA GEC
        return modelMapper;
    }

}
