import React, { useEffect, useState } from 'react';
import alumnoService from '../services/alumnoService';
import { Link } from 'react-router-dom';

const ListAlumnosComponent = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [alumnosPerPage] = useState(8);

  useEffect(() => {
    listarAlumnos();
  }, []);

  // Obtener todos los alumnos
  const listarAlumnos = () => {
    alumnoService
      .getAllAlumnos()
      .then((response) => setAlumnos(response.data))
      .catch((error) =>
        console.error("Error al obtener alumnos:", error)
      );
  };

  // Buscar alumnos por nombre
  const handleBuscar = () => {
    setCurrentPage(1); // Reiniciar a la primera página al buscar
    if (searchNombre.trim() === "") {
      listarAlumnos();
      return;
    }

    alumnoService
      .getAllAlumnosNombre(searchNombre.trim())
      .then((response) => setAlumnos(response.data))
      .catch((error) => {
        console.error("Error al buscar alumnos:", error);
        alert("No se pudo buscar el alumno");
      });
  };

  // Eliminar alumno
  const eliminarAlumno = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este alumno?")) {
      alumnoService
        .deleteAlumno(id)
        .then(() => {
          alert("Alumno eliminado correctamente");
          listarAlumnos();
        })
        .catch((error) => {
          console.error("Error al eliminar alumno:", error);
          alert("No se pudo eliminar el alumno");
        });
    }
  };
    const eliminartTodo = () => {
    if (window.confirm("¿Estás seguro de eliminar todos los alumnoS?")) {
      alumnoService
        .deleteAllAlumnos()
        .then(() => {
          alert("Todos los alumnos fueron eliminados correctamente.e");
          listarAlumnos();
        })
        .catch((error) => {
          console.error("Error al eliminar los alumno:", error);
          alert("No se pudo eliminar los alumno");
        });
    }
  };

    const descargarExcel = () => {
    alumnoService.generateExcel().then((response) => {
      // Crear una URL con el blob recibido
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Crear un enlace temporal para forzar la descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte_alumnos.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Limpieza
    }).catch(error => {
      console.error("Error al descargar el archivo Excel:", error);
      alert("No se pudo generar el archivo.");
    });
  };



  // Calcular alumnos por página
  const indexOfLastAlumno = currentPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = alumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);
  const totalPages = Math.ceil(alumnos.length / alumnosPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2 className="text-center my-4">Gestor de Alumnos</h2>

      {/* Buscador */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={searchNombre}
            onChange={(e) => setSearchNombre(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleBuscar}>
            Buscar
          </button>
        </div>
        <div className="col-md-6 text-end">
          <Link to="add" className="btn btn-primary me-2">
            Agregar Alumno
          </Link>
        </div>
      </div>

      {/* Tabla de alumnos */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Fecha Nacimiento</th>
            <th>Grado Instrucción</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentAlumnos.length > 0 ? (
            currentAlumnos.map((alumno) => (
              <tr key={alumno.idAlumno}>
                <td>{alumno.idAlumno}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.dni}</td>
                <td>{alumno.telefono}</td>
                <td>{alumno.fechaNacimiento}</td>
                <td>{alumno.gradoInstruccion}</td>
                <td>{alumno.direccion}</td>
                <td>
                  <Link
                    to={`edit/${alumno.idAlumno}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarAlumno(alumno.idAlumno)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No se encontraron alumnos
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='row '>
                <div className='col-md-6 text-start'>
          <button className='btn btn-primary' onClick={() => descargarExcel()}>
            Generar reporte
          </button>
        </div>
        <div className='col-md-6 text-end'>
          <button className='btn btn-danger' onClick={() => eliminartTodo()}>
            Borrar Todo
          </button>
        </div>

      </div>

        
      {/* Paginación */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number + 1} className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ListAlumnosComponent;
