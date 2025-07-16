import React, { useEffect, useState } from "react";
import payService from "../services/payService";
import { Link } from "react-router-dom";

const ListPagoComponent = () => {
  const [pagos, setPagos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagosPerPage] = useState(8);

  useEffect(() => {
    listarPagos();
  }, []);

  const listarPagos = () => {
    payService.getAllPago()
      .then((response) => {
        const formatted = response.data.map(pago => ({
          ...pago,
          fechaPago: new Date(pago.fechaPago)
        }));
        setPagos(formatted);
      })
      .catch(error => {
        console.error("Error al obtener pagos:", error);
      });
  };

  const deletePago = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este pago?")) {
      payService.deletePago(id)
        .then(() => {
          alert("Pago eliminado correctamente");
          listarPagos();
        })
        .catch(error => {
          console.error("Error al eliminar el pago:", error);
          alert("No se pudo eliminar el pago");
        });
    }
  };

  const indexOfLastPago = currentPage * pagosPerPage;
  const indexOfFirstPago = indexOfLastPago - pagosPerPage;
  const currentPagos = pagos.slice(indexOfFirstPago, indexOfLastPago);
  const totalPages = Math.ceil(pagos.length / pagosPerPage);
  const paginate = (number) => setCurrentPage(number);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Pagos Registrados</h2>

      <div className="row mb-4">
        <div className="col text-end">
          <Link to="add" className="btn btn-primary">
            Agregar Pago
          </Link>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>ID Alumno</th>
            <th>Nombre Alumno</th>
            <th>Fecha de Pago</th>
            <th>Monto Pagado</th>
            <th>Método de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPagos.length > 0 ? (
            currentPagos.map((pago) => (
              <tr key={pago.id}>
                <td>{pago.id}</td>
                <td>{pago.alumnoId}</td>
                <td>{pago.nombreAlumno}</td>
                <td>{pago.fechaPago.toLocaleDateString()}</td>
                <td>S/. {pago.montoPagado}</td>
                <td>{pago.metodoPago}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePago(pago.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No se encontraron pagos
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages).keys()].map((num) => (
              <li key={num + 1} className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginate(num + 1)}
                >
                  {num + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ListPagoComponent;
