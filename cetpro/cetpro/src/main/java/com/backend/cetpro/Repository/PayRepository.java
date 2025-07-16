package com.backend.cetpro.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cetpro.Repository.Entity.PayEntity;

public interface PayRepository extends JpaRepository<PayEntity,Integer>{

}
