import React, { useState, useEffect } from 'react';
import alumnoService from '../services/alumnoService';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddAlumnoComponent = () => {
    const [nombre, setNombre] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [gradoInstruccion, setGradoInstruccion] = useState('');
    const [direccion, setDireccion] = useState('');
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            alumnoService.getAllAlumnos()
                .then(response => {
                    const alumno = response.data.find(a => a.idAlumno === parseInt(id));
                    if (alumno) {
                        setNombre(alumno.nombre);
                        setDni(alumno.dni);
                        setTelefono(alumno.telefono);
                        setFechaNacimiento(alumno.fechaNacimiento);
                        setGradoInstruccion(alumno.gradoInstruccion);
                        setDireccion(alumno.direccion);
                    } else {
                        alert('Alumno no encontrado');
                    }
                })
                .catch(error => {
                    console.error('Error al obtener el alumno:', error);
                });
        }
    }, [id]);

    const saveAlumno = (e) => {
        e.preventDefault();

        const alumno = {
            nombre,
            dni,
            telefono,
            fechaNacimiento,
            gradoInstruccion,
            direccion
        };

        if (id) {
            alumnoService.updateAlumno(id, alumno)
                .then(() => {
                    alert("Alumno actualizado correctamente");
                    navigate("/alumnos");
                })
                .catch(error => {
                    console.error("Error al actualizar alumno:", error);
                });
        } else {
            alumnoService.createAlumno(alumno)
                .then(() => {
                    navigate("/alumnos");
                })
                .catch(error => {
                    console.error("Error al registrar alumno:", error);
                });
        }
    };

    const title = id ? 'Actualizar Alumno' : 'Registrar Alumno';

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center'>{title}</h2>
                    <div className='card-body'>
                        <form onSubmit={saveAlumno}>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Nombre</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder='Ingrese el nombre'
                                    required
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>DNI</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    placeholder='Ingrese el DNI'
                                    maxLength={8}
                                    required
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Teléfono</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    placeholder='Ingrese el teléfono'
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Fecha de Nacimiento</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Grado de Instrucción</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={gradoInstruccion}
                                    onChange={(e) => setGradoInstruccion(e.target.value)}
                                    placeholder='Ingrese el grado de instrucción'
                                />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Dirección</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    placeholder='Ingrese la dirección'
                                />
                            </div>

                            <div className='d-flex justify-content-between'>
                                <button type='submit' className='btn btn-primary'>
                                    {id ? 'Actualizar' : 'Registrar'}
                                </button>
                                <Link to='/alumnos' className='btn btn-danger'>
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

export default AddAlumnoComponent;
