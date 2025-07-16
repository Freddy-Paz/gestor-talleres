package com.backend.cetpro.Service.Mapper;

import com.backend.cetpro.Controller.Dto.StudentItem;
import com.backend.cetpro.Repository.Entity.StudentEntity;

public class StudentMapper {

    private StudentMapper(){};

    public static StudentEntity fromDtoToEntity(StudentItem item, StudentEntity entity){

        entity.setNombre(item.getNombre());
        entity.setDni(item.getDni());
        entity.setTelefono(item.getTelefono());
        entity.setFechaNacimiento(item.getFechaNacimiento());
        entity.setGradoInstruccion(item.getGradoInstruccion());
        entity.setDireccion(item.getDireccion());

        return entity;
    }

    public static StudentItem fromEntityToDto(StudentEntity entity, StudentItem item){
        
        item.setIdAlumno(entity.getIdAlumno());
        item.setNombre(entity.getNombre());
        item.setDni(entity.getDni());
        item.setTelefono(entity.getTelefono());
        item.setFechaNacimiento(entity.getFechaNacimiento());
        item.setGradoInstruccion(entity.getGradoInstruccion());
        item.setDireccion(entity.getDireccion());
        
        return item;
    }
}
