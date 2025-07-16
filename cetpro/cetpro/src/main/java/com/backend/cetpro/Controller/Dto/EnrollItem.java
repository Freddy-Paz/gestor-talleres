package com.backend.cetpro.Controller.Dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class EnrollItem {

    private Integer id;
    private Integer idAlumno;
    private String nombreAlumno;
    private Integer idTaller;
    private String nombreTaller;
    private LocalDate fechaInscripcion;

}
