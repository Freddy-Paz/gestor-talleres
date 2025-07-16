package com.backend.cetpro.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.cetpro.Controller.Dto.PayItem;
import com.backend.cetpro.Service.PayRepository.PayService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pagos")
@RequiredArgsConstructor

public class PayController {

    private final PayService payService;

    @GetMapping()
    public ResponseEntity<List<PayItem>> list(){
        
        List<PayItem> items=payService.list();
        return ResponseEntity.ok(items);
    }

    @PostMapping("/newPago")
    public ResponseEntity<Void> create(@RequestBody PayItem item){

        payService.create(item);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){

        payService.delete(id);
        return ResponseEntity.ok().build();
    }

}
