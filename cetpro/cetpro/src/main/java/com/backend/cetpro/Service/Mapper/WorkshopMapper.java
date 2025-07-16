package com.backend.cetpro.Service.Mapper;

import com.backend.cetpro.Controller.Dto.WorkshopItem;
import com.backend.cetpro.Repository.Entity.WorkshopEntity;

public class WorkshopMapper {

    private WorkshopMapper (){};

    public static WorkshopEntity fromDtoToEntity(WorkshopItem item, WorkshopEntity entity){

        entity.setNombre(item.getNombre());
        entity.setDocente(item.getDocente());
        entity.setHorario(item.getHorario());
        return entity;
    }

    public static WorkshopItem fronEntityToDto(WorkshopEntity entity, WorkshopItem item){

        item.setIdTaller(entity.getIdTaller());
        item.setNombre(entity.getNombre());
        item.setDocente(entity.getDocente());
        item.setHorario(entity.getHorario());
        return item;
    }


}
