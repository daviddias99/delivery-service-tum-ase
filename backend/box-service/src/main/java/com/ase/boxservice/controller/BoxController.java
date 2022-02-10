package com.ase.boxservice.controller;


import com.ase.boxservice.dto.BoxDto;
import com.ase.boxservice.dto.UserAndBoxDto;
import com.ase.boxservice.service.BoxService;
import com.ase.client.com.ase.contract.ResponseMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/box")
@Slf4j
public class BoxController {

    @Autowired
    private BoxService boxService;

    @Autowired
    ResponseMessage responseMessage;



    @PostMapping(value = "/add")
    public ResponseEntity<BoxDto> addBox(@RequestBody BoxDto boxDto){
        BoxDto savedDto =  boxService.save(boxDto);
        if(savedDto==null)
            return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok(savedDto);
    }

    @PostMapping(value = "/open")
    public ResponseEntity<ResponseMessage> checkTheBox(@RequestBody UserAndBoxDto userAndBoxDto){
        responseMessage = boxService.checkIfTheRfidIsValidForTheBox( userAndBoxDto.rfId, userAndBoxDto.boxId);
        if (responseMessage.getResponseType() == 0) {
            return ResponseEntity.badRequest().body(responseMessage);
        }

        return ResponseEntity.ok(responseMessage);
    }

    @PostMapping(value = "/close")
    public ResponseEntity<ResponseMessage> checkAndUpdateBox(@RequestBody UserAndBoxDto userAndBoxDto){
        responseMessage = boxService.closeBox( userAndBoxDto.rfId, userAndBoxDto.boxId);
        if (responseMessage.getResponseType() == 0) {
            return ResponseEntity.badRequest().body(responseMessage);
        }

        return ResponseEntity.ok(responseMessage);
    }

    @PostMapping(value = "/updateboxstatus")
    public ResponseEntity<ResponseMessage> updateBoxStatus(@RequestHeader(value = "Cookie", required = true) String cookie,@RequestBody String boxId){
        responseMessage = boxService.updateBoxStatus(boxId);
        if (responseMessage.getResponseType() == 0) {
            return ResponseEntity.badRequest().body(responseMessage);
        }

        return ResponseEntity.ok(responseMessage);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<BoxDto> getById ( @RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String id){
        if(id.length() !=24) //mongo object id size is 24. If length is different than no need to go to service
            return ResponseEntity.badRequest().body(null);
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
    public ResponseEntity<BoxDto> updateBox(@RequestHeader(value = "Cookie", required = true) String cookie ,@RequestBody BoxDto boxDto, @PathVariable String id) {
        BoxDto updatedDto = boxService.updateBox(boxDto,id);
        if(updatedDto==null)
            return ResponseEntity.badRequest().body(null);

        return ResponseEntity.ok(updatedDto);
    }


    @GetMapping(value = "/service-call/{id}")
    public ResponseEntity<BoxDto> getBoxByIdServiceCall ( @RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String id){
        if(id.length() !=24) //mongo object id size is 24. If length is different than no need to go to service
            return ResponseEntity.ok(null);
        return ResponseEntity.ok(boxService.getById(id));
    }

}
