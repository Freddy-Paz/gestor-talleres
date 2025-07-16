package com.backend.cetpro.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.cetpro.Repository.Entity.WorkshopEntity;

@Repository
public interface WorkshopRepository extends JpaRepository<WorkshopEntity,Integer> {

}
