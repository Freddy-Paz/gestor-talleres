package com.backend.cetpro.Service.StudentService;


import java.io.ByteArrayInputStream;
import java.util.List;

import com.backend.cetpro.Controller.Dto.StudentItem;

public interface StudentService {

    List<StudentItem> list();

    List<StudentItem> listName(String nombre);

    void create(StudentItem item);

    void update(Integer id, StudentItem item);

    void delete(Integer id);

    void deleteAllStudent();

    ByteArrayInputStream generateExcel(List<StudentItem> students);




}
