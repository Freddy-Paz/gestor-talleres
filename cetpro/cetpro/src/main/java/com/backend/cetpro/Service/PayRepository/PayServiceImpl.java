package com.backend.cetpro.Service.PayRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.cetpro.Controller.Dto.PayItem;
import com.backend.cetpro.Repository.PayRepository;
import com.backend.cetpro.Repository.StudentRepository;
import com.backend.cetpro.Repository.Entity.PayEntity;
import com.backend.cetpro.Repository.Entity.StudentEntity;
import com.backend.cetpro.Service.Mapper.PayMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService{

    private final PayRepository payRepository;
    private final StudentRepository studentRepository;

    public List<PayItem> list(){

        return payRepository.findAll().stream()
        .map(e->PayMapper.fromEntityToDto(e, new PayItem()))
        .collect(Collectors.toList());
    }

    public void create(PayItem item){

        StudentEntity alumno= studentRepository.findById(item.getAlumnoId()).orElseThrow(EntityNotFoundException::new);

        PayEntity entity=PayMapper.fromDtoToEntity(item,new PayEntity());
        entity.setAlumnoId(alumno);

        payRepository.save(entity);
    }

    public void delete(Integer id){
        payRepository.deleteById(id);
    }

}
