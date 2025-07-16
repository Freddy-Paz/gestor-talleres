CREATE TABLE alumnos (
    id_Alumno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    dni VARCHAR(8) NOT NULL UNIQUE,
    telefono VARCHAR(15),
    fecha_nacimiento DATE,
    grado_instruccion VARCHAR(50),
    direccion VARCHAR(255)
);

-- Tabla: tallereps
CREATE TABLE talleres (
    id_Taller INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    docente VARCHAR(100),
    horario VARCHAR(50)
);

-- Tabla: pagos
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno INT,
    taller INT,
    fecha_pago DATE NOT NULL,
    monto_pagado DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(50),
    pagado BOOLEAN DEFAULT FALSE, -- TRUE = pagado, FALSE = pendiente

    FOREIGN KEY (alumno) REFERENCES alumnos(id_Alumno),
    FOREIGN KEY (taller) REFERENCES talleres(id_Taller)
);

CREATE TABLE inscripcion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_taller INT NOT NULL,
    fecha_inscripcion DATE DEFAULT (CURRENT_DATE),

    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_Alumno) ON DELETE CASCADE,
    FOREIGN KEY (id_taller) REFERENCES talleres(id_Taller) ON DELETE CASCADE,

    UNIQUE (id_alumno, id_taller) -- Evita que un alumno se inscriba dos veces al mismo taller
);