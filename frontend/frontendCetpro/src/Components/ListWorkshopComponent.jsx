import React, { useEffect, useState } from 'react';
import workshopService from '../services/workshopService';
import { Link } from 'react-router-dom';

const ListWorkshopComponent = () => {
  const [workshops, setWorkshops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [workshopsPerPage] = useState(8);

  useEffect(() => {
    listarTalleres();
  }, []);

  const listarTalleres = () => {
    workshopService.getAllWorkshop()
      .then(response => setWorkshops(response.data))
      .catch(error => console.error("Error al obtener talleres:", error));
  };

  const eliminarTaller = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este taller?")) {
      workshopService.deleteWorkshop(id)
        .then(() => {
          alert("Taller eliminado correctamente");
          listarTalleres();
        })
        .catch(error => {
          console.error("Error al eliminar taller:", error);
        });
    }
  };

  // Calcular talleres visibles por página
  const indexOfLastWorkshop = currentPage * workshopsPerPage;
  const indexOfFirstWorkshop = indexOfLastWorkshop - workshopsPerPage;
  const currentWorkshops = workshops.slice(indexOfFirstWorkshop, indexOfLastWorkshop);
  const totalPages = Math.ceil(workshops.length / workshopsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2 className="text-center my-4">Gestor de Talleres</h2>
      <div className="mb-3 text-end">
        <Link to="/talleres/add" className="btn btn-primary me-2">
          Agregar Taller
        </Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Docente</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentWorkshops.length > 0 ? (
            currentWorkshops.map((taller) => (
              <tr key={taller.idTaller}>
                <td>{taller.idTaller}</td>
                <td>{taller.nombre}</td>
                <td>{taller.docente}</td>
                <td>{taller.horario}</td>
                <td>
                  <Link to={`/talleres/edit/${taller.idTaller}`} className="btn btn-info btn-sm me-2">Editar</Link>
                  <button onClick={() => eliminarTaller(taller.idTaller)} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No se encontraron talleres</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages).keys()].map(number => (
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

export default ListWorkshopComponent;
