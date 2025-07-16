package com.backend.cetpro.Repository.Entity;

import java.time.LocalDate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "inscripcion", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"id_alumno", "id_taller"})
    })

@Data
public class EnrollEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_alumno", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private StudentEntity alumno;
    
    @ManyToOne
    @JoinColumn(name = "id_taller", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private WorkshopEntity taller;

    @Column(name = "fecha_inscripcion", insertable = false, updatable = false)
    private LocalDate fechaInscripcion;

    

}
