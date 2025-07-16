package com.backend.cetpro.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.cetpro.Repository.Entity.StudentEntity;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity,Integer> {
        List<StudentEntity> findByNombreContainingIgnoreCase(String nombre);


}
