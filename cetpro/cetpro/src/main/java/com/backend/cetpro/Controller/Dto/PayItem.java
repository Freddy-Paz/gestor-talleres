package com.backend.cetpro.Controller.Dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class PayItem {

    private Integer id;
    private Integer alumnoId;
    private String nombreAlumno;
    private LocalDate fechaPago;
    private BigDecimal montoPagado;
    private String metodoPago;
}
