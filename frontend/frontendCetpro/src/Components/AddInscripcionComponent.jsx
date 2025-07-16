import React, { useState } from 'react';
import enrollService from '../services/EnrollService';
import { Link, useNavigate } from 'react-router-dom';

const AddInscripcionComponent = () => {
  const [idAlumno, setIdAlumno] = useState('');
  const [idTaller, setIdTaller] = useState('');

  const navigate = useNavigate();

  const saveInscripcion = (e) => {
    e.preventDefault();

    const nuevaInscripcion = {
      idAlumno,
      idTaller,
    };

    enrollService
      .createInscripcion(nuevaInscripcion)
      .then(() => {
        alert('Inscripción registrada correctamente');
        navigate('/inscripciones');
      })
      .catch((error) => {
        console.error('Error al registrar inscripción:', error);
        alert('Error al registrar inscripción');
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center mt-3">Registrar Inscripción</h2>
          <div className="card-body">
            <form onSubmit={saveInscripcion}>
              <div className="form-group mb-3">
                <label className="form-label">ID del Alumno</label>
                <input
                  type="number"
                  className="form-control"
                  value={idAlumno}
                  onChange={(e) => setIdAlumno(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">ID del Taller</label>
                <input
                  type="number"
                  className="form-control"
                  value={idTaller}
                  onChange={(e) => setIdTaller(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
                <Link to="/inscripciones" className="btn btn-danger">
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInscripcionComponent;
