package com.backend.cetpro.Service.WorkshopService;

import java.util.List;

import com.backend.cetpro.Controller.Dto.WorkshopItem;

public interface WorkshopService {

    List<WorkshopItem> list();

    void create(WorkshopItem item);

    void update(Integer idTaller, WorkshopItem item);

    void delete(Integer idTaller);

}
