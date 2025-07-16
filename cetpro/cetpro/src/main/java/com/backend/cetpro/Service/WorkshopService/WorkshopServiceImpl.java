package com.backend.cetpro.Service.WorkshopService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.cetpro.Controller.Dto.WorkshopItem;
import com.backend.cetpro.Repository.WorkshopRepository;
import com.backend.cetpro.Repository.Entity.WorkshopEntity;
import com.backend.cetpro.Service.Mapper.WorkshopMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkshopServiceImpl implements WorkshopService{
    
    private final WorkshopRepository workshopRepository;

    public List<WorkshopItem> list(){
        
        return workshopRepository.findAll().stream()
        .map(e->WorkshopMapper.fronEntityToDto(e, new WorkshopItem()))
        .collect(Collectors.toList());
    }

    public void create(WorkshopItem item){

        WorkshopEntity entity=WorkshopMapper.fromDtoToEntity(item, new WorkshopEntity());
        workshopRepository.save(entity);
    }

    public void update(Integer idTaller, WorkshopItem item){

        WorkshopEntity entity=workshopRepository.getReferenceById(idTaller);
        entity.setNombre(item.getNombre());
        entity.setDocente(item.getDocente());
        entity.setHorario(item.getHorario());

        workshopRepository.save(entity);
    }

    public void delete(Integer idTaller){
    
        workshopRepository.deleteById(idTaller);
    }


}
