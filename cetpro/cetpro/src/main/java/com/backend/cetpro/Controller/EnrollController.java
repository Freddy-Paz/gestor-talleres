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

import com.backend.cetpro.Controller.Dto.EnrollItem;
import com.backend.cetpro.Service.EnrollService.EnrollService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/inscribir")
@RequiredArgsConstructor
public class EnrollController {

    private final EnrollService enrollService;

    @GetMapping
    public ResponseEntity<List<EnrollItem>> list(){
        
        List<EnrollItem> items=enrollService.list();
        return ResponseEntity.ok(items);
    }
    @GetMapping("/listaInscripcion/{nombre}")
    public ResponseEntity<List<EnrollItem>> listWorkshop(@PathVariable String nombre){
        List<EnrollItem> items= enrollService. listWorkshop(nombre);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/crear")
    public ResponseEntity<Void> create(@RequestBody EnrollItem item){

        enrollService.create(item);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){

        enrollService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
