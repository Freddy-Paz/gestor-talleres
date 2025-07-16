import React, { useEffect, useState } from "react";
import enrollService from "../services/EnrollService";
import { Link } from "react-router-dom";

const ListEnrollComponent = () => {
  const [enroll, setEnroll] = useState([]);
  const [SearchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [enrollsPerPage] = useState(8);

  useEffect(() => {
    listarInscripcion();
  }, []);

  const listarInscripcion = () => {
    enrollService
      .getAllInsripciones()
      .then((response) => {
        const enrollWithFormattedDates = response.data.map((item) => ({
          ...item,
          fechaInscripcion: new Date(item.fechaInscripcion),
        }));
        setEnroll(enrollWithFormattedDates);
      })
      .catch((error) => {
        console.error("Error al obtener alumnos:", error);
      });
  };

  const handleSearch = () => {
    const name = SearchName.trim();
    setCurrentPage(1);

    if (name === "") {
      listarInscripcion();
      return;
    }

    enrollService
      .getAllInscripcionTaller(name)
      .then((response) => {
        const formatted = response.data.map((item) => ({
          ...item,
          fechaInscripcion: new Date(item.fechaInscripcion),
        }));
        setEnroll(formatted);
      })
      .catch((error) => {
        console.error("Error al obtener inscripciones:", error);
        alert("No se pudo buscar inscripciones");
      });
  };

  const deleteEnroll = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta inscripción?")) {
      enrollService
        .deleteInscripciion(id)
        .then(() => {
          alert("Inscripción eliminada correctamente");
          listarInscripcion();
        })
        .catch((error) => {
          console.error("Error al eliminar inscripción:", error);
          alert("No se pudo eliminar inscripción");
        });
    }
  };

  const indexOfLastEnroll = currentPage * enrollsPerPage;
  const indexOfFirstEnroll = indexOfLastEnroll - enrollsPerPage;
  const currentEnrolls = enroll.slice(indexOfFirstEnroll, indexOfLastEnroll);
  const totalPages = Math.ceil(enroll.length / enrollsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Inscripciones</h2>

      <div className="row mb-4 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por taller"
            value={SearchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleSearch}>
            Buscar
          </button>
        </div>
        <div className="col-md-6 text-end">
          <Link to="add" className="btn btn-primary me-2">
            Agregar Inscripción
          </Link>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Id_Alumno</th>
            <th>Alumno</th>
            <th>Id_Taller</th>
            <th>Taller</th>
            <th>Fecha_Inscripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentEnrolls.length > 0 ? (
            currentEnrolls.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.idAlumno}</td>
                <td>{item.nombreAlumno}</td>
                <td>{item.idTaller}</td>
                <td>{item.nombreTaller}</td>
                <td>{item.fechaInscripcion.toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEnroll(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No se encontraron inscripciones
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

export default ListEnrollComponent;


/*import React, { useEffect, useState } from 'react';
import enrollService from '../services/EnrollService';
import { Link } from 'react-router-dom';

const ListInscripcionesComponent = () => {
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    fetchInscripciones();
  }, []);

  const fetchInscripciones = () => {
    enrollService.getAllInsripciones()
      .then(res => setInscripciones(res.data))
      .catch(err => console.error("Error al obtener inscripciones:", err));
  };

  const eliminarInscripcion = (id) => {
    if (window.confirm("¿Seguro de eliminar esta inscripción?")) {
      enrollService.deleteInscripciion(id)
        .then(() => {
          alert("Inscripción eliminada");
          fetchInscripciones();
        })
        .catch(err => {
          console.error("Error al eliminar:", err);
          alert("No se pudo eliminar");
        });
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Lista de Inscripciones</h2>

      <Link to="/inscripciones/add" className="btn btn-success mb-3">
        Nueva Inscripción
      </Link>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Alumno</th>
            <th>Taller</th>
            <th>Fecha Inscripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.length > 0 ? (
            inscripciones.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombreAlumno}</td>
                <td>{item.nombreTaller}</td>
                <td>{item.fechaInscripcion}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarInscripcion(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" className="text-center">No hay inscripciones</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListInscripcionesComponent;*/
