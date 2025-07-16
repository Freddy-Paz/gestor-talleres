import React, { useState, useEffect } from 'react';
import workshopService from '../services/workshopService';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AddWorkshopComponent = () => {
  const [nombre, setNombre] = useState('');
  const [docente, setDocente] = useState('');
  const [horario, setHorario] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      workshopService.getAllWorkshop().then(response => {
        const taller = response.data.find(t => t.idTaller === parseInt(id));
        if (taller) {
          setNombre(taller.nombre);
          setDocente(taller.docente);
          setHorario(taller.horario);
        }
      }).catch(error => console.error("Error al obtener taller:", error));
    }
  }, [id]);

  const saveTaller = (e) => {
    e.preventDefault();

    const workshop = { nombre, docente, horario };

    if (id) {
      workshopService.updateWorkshop(id, workshop)
        .then(() => {
          alert("Taller actualizado correctamente");
          navigate("/talleres");
        }).catch(error => console.error("Error al actualizar taller:", error));
    } else {
      workshopService.createWorkshop(workshop)
        .then(() => navigate("/talleres"))
        .catch(error => console.error("Error al registrar taller:", error));
    }
  };

  const title = id ? 'Actualizar Taller' : 'Registrar Taller';

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">{title}</h2>
          <div className="card-body">
            <form onSubmit={saveTaller}>
              <div className="form-group mb-2">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Docente</label>
                <input
                  type="text"
                  className="form-control"
                  value={docente}
                  onChange={(e) => setDocente(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Horario</label>
                <input
                  type="text"
                  className="form-control"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  {id ? 'Actualizar' : 'Registrar'}
                </button>
                <Link to="/talleres" className="btn btn-danger">Cancelar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkshopComponent;
