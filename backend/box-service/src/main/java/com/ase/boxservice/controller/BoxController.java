package com.ase.boxservice.controller;


import com.ase.boxservice.dto.BoxDto;
import com.ase.boxservice.service.BoxService;
import com.ase.client.com.ase.contract.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/box")
public class BoxController {

    @Autowired
    private BoxService boxService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<BoxDto> addBox(@RequestBody BoxDto boxDto){
        BoxDto savedDto =  boxService.save(boxDto);
        if(savedDto==null)
            return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok(savedDto);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<BoxDto> getById (@PathVariable String id){
        return ResponseEntity.ok(boxService.getById(id));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteById (@PathVariable String id){
        return ResponseEntity.ok(boxService.deleteBox(id));
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<List<BoxDto>> listBoxes(){
        List<BoxDto> data = boxService.getAll();
        return ResponseEntity.ok(data);
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<BoxDto> updateBox(@RequestBody BoxDto boxDto, @PathVariable String id) {
        BoxDto updatedDto = boxService.updateBox(boxDto,id);
        if(updatedDto==null)
            return ResponseEntity.badRequest().body(null);

        return ResponseEntity.ok(updatedDto);
    }

}
