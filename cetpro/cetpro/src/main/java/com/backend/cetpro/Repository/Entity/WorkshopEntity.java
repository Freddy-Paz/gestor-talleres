package com.backend.cetpro.Repository.Entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "talleres")
@Data
public class WorkshopEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id_Taller")
    private Integer idTaller;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "docente", length = 100)
    private String docente;

    @Column(name = "horario", length = 50)
    private String horario;
    
}
