package com.backend.cetpro.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.backend.cetpro.Controller.Dto.StudentItem;
import com.backend.cetpro.Service.StudentService.StudentService;

import lombok.RequiredArgsConstructor;

import java.io.ByteArrayInputStream;
import org.springframework.http.HttpHeaders;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/student")
@RequiredArgsConstructor

public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<List<StudentItem>> list(){
        List<StudentItem> items=studentService.list();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/buscar/{nombre}")
    public ResponseEntity<List<StudentItem>> listName(@PathVariable String nombre){

        List<StudentItem> items=studentService.listName(nombre);
        return ResponseEntity.ok(items);

    }

    @PostMapping("/nuevoAlumno")
    public ResponseEntity<Void> create(@RequestBody StudentItem item){

        studentService.create(item);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Integer id, @RequestBody StudentItem item ){

        studentService.update(id,item);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        studentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/borrar-todo")
    public ResponseEntity<Void> deleteAllStudent(){
        studentService.deleteAllStudent();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/alumnos/reporte-excel")
public ResponseEntity<InputStreamResource> exportAlumnosExcel() {
    try {
        List<StudentItem> students = studentService.list();
        ByteArrayInputStream in = studentService.generateExcel(students);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=alumnos.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(in));

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.internalServerError().build();
    }
}
}
