package com.backend.cetpro.Service.EnrollService;

import java.util.List;

import com.backend.cetpro.Controller.Dto.EnrollItem;

public interface EnrollService {

    List<EnrollItem> list();

    void create(EnrollItem item);

    void delete(Integer id);

    List<EnrollItem> listWorkshop(String nombre);


}
