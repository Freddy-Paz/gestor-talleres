package com.backend.cetpro.Service.Mapper;

import com.backend.cetpro.Controller.Dto.PayItem;
import com.backend.cetpro.Repository.Entity.PayEntity;

public class PayMapper {

    private PayMapper(){};

    public static PayEntity fromDtoToEntity(PayItem item,PayEntity entity){

        entity.setFechaPago(item.getFechaPago());
        entity.setMontoPagado(item.getMontoPagado());
        entity.setMetodoPago(item.getMetodoPago());
        return entity;
    }

    public static PayItem fromEntityToDto(PayEntity entity,PayItem item){

        item.setId(entity.getId());
        item.setAlumnoId(entity.getAlumnoId().getIdAlumno());
        item.setNombreAlumno(entity.getAlumnoId().getNombre());
        item.setFechaPago(entity.getFechaPago());
        item.setMontoPagado(entity.getMontoPagado());
        item.setMetodoPago(entity.getMetodoPago());
        return item;
    }
}
