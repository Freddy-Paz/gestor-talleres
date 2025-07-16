package com.backend.cetpro.Controller.Dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class StudentItem {

    private Integer idAlumno;
    private String nombre;
    private String dni;
    private String telefono;
    private LocalDate fechaNacimiento;
    private String gradoInstruccion;
    private String direccion;
    

}
