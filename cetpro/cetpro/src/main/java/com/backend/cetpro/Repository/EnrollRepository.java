package com.backend.cetpro.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cetpro.Repository.Entity.EnrollEntity;

public interface EnrollRepository extends JpaRepository<EnrollEntity,Integer>{
     List<EnrollEntity> findByTallerNombreContainingIgnoreCase(String nombreTaller);

}
