import React, { useState } from 'react';
import payService from '../services/payService';
import { Link, useNavigate } from 'react-router-dom';

const AddPagoComponent = () => {
  const [alumnoId, setAlumnoId] = useState('');
  const [fechaPago, setFechaPago] = useState('');
  const [montoPagado, setMontoPagado] = useState('');
  const [metodoPago, setMetodoPago] = useState('');

  const navigate = useNavigate();

  const savePago = (e) => {
    e.preventDefault();

    const nuevoPago = {
      alumnoId: parseInt(alumnoId),
      fechaPago,
      montoPagado: parseFloat(montoPagado),
      metodoPago,
    };

    payService
      .createPago(nuevoPago)
      .then(() => {
        alert('Pago registrado correctamente');
        navigate('/pagos');
      })
      .catch((error) => {
        console.error('Error al registrar pago:', error);
        alert('Error al registrar el pago');
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center mt-3">Registrar Pago</h2>
          <div className="card-body">
            <form onSubmit={savePago}>
              <div className="form-group mb-3">
                <label className="form-label">ID del Alumno</label>
                <input
                  type="number"
                  className="form-control"
                  value={alumnoId}
                  onChange={(e) => setAlumnoId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Fecha de Pago</label>
                <input
                  type="date"
                  className="form-control"
                  value={fechaPago}
                  onChange={(e) => setFechaPago(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Monto Pagado</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={montoPagado}
                  onChange={(e) => setMontoPagado(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Método de Pago</label>
                <input
                  type="text"
                  className="form-control"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
                <Link to="/pagos" className="btn btn-danger">
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

export default AddPagoComponent;
