package com.backend.cetpro.Service.EnrollService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.cetpro.Controller.Dto.EnrollItem;
import com.backend.cetpro.Repository.EnrollRepository;
import com.backend.cetpro.Repository.StudentRepository;
import com.backend.cetpro.Repository.WorkshopRepository;
import com.backend.cetpro.Repository.Entity.EnrollEntity;
import com.backend.cetpro.Repository.Entity.StudentEntity;
import com.backend.cetpro.Repository.Entity.WorkshopEntity;
import com.backend.cetpro.Service.Mapper.EnrollMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnrollServiceImpl implements EnrollService{

    private final EnrollRepository enrollRepository;
    private final StudentRepository studentRepository;
    private final WorkshopRepository workshopRepository;

    public List<EnrollItem> list(){
        return enrollRepository.findAll().stream()
        .map(e->EnrollMapper.fromEntityToDto(e, new EnrollItem()))
        .collect(Collectors.toList());
    }

    public List<EnrollItem> listWorkshop(String nombre){
        return enrollRepository.findByTallerNombreContainingIgnoreCase(nombre).stream()
        .map(e->EnrollMapper.fromEntityToDto(e, new EnrollItem()))
        .collect(Collectors.toList());
    }

    public void create(EnrollItem item){

        StudentEntity alumno=studentRepository.findById(item.getIdAlumno()).orElseThrow(EntityNotFoundException::new);
        WorkshopEntity taller= workshopRepository.findById(item.getIdTaller()).orElseThrow(EntityNotFoundException::new);

        EnrollEntity entity=EnrollMapper.fromDtoToEntity(item, new EnrollEntity());
        entity.setAlumno(alumno);
        entity.setTaller(taller);
        enrollRepository.save(entity);
    }

    public void delete(Integer id){
        enrollRepository.deleteById(id);
    }
}
