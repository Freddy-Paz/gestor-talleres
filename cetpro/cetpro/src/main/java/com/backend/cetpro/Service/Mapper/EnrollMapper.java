package com.backend.cetpro.Service.Mapper;

import com.backend.cetpro.Controller.Dto.EnrollItem;
import com.backend.cetpro.Repository.Entity.EnrollEntity;

public class EnrollMapper {

    private EnrollMapper(){};

    public static EnrollEntity fromDtoToEntity(EnrollItem item, EnrollEntity entity){

        return entity;
    }

    public static EnrollItem fromEntityToDto(EnrollEntity entity,EnrollItem item){

        item.setId(entity.getId());
        item.setIdAlumno(entity.getAlumno().getIdAlumno());
        item.setNombreAlumno(entity.getAlumno().getNombre());
        item.setIdTaller(entity.getTaller().getIdTaller());
        item.setNombreTaller(entity.getTaller().getNombre());
        item.setFechaInscripcion(entity.getFechaInscripcion());

        return item;
    
    }





}
