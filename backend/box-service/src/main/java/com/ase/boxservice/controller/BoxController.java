package com.ase.boxservice.controller;


import com.ase.boxservice.dto.BoxDto;
import com.ase.boxservice.service.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/box")
public class BoxController {

    @Autowired
    private BoxService boxService;

    @PostMapping(value = "/add")
    public ResponseEntity<BoxDto> addBox(@RequestBody BoxDto boxDto){
        BoxDto savedDto =  boxService.save(boxDto);
        if(savedDto==null)
            return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok(savedDto);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<BoxDto> getById (@PathVariable String id){
        return ResponseEntity.ok(boxService.getById(id));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deleteById (@PathVariable String id){
        return ResponseEntity.ok(boxService.deleteBox(id));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<BoxDto>> listBoxes(){
        List<BoxDto> data = boxService.getAll();
        return ResponseEntity.ok(data);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<BoxDto> updateBox(@RequestBody BoxDto boxDto, @PathVariable String id) {
        BoxDto updatedDto = boxService.updateBox(boxDto,id);
        if(updatedDto==null)
            return ResponseEntity.badRequest().body(null);

        return ResponseEntity.ok(updatedDto);
    }

}
