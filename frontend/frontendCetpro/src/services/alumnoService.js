import axios from 'axios'

const ALUMNOS_API_BASE_URL='http://localhost:8081/student';

class alumnoService {

    getAllAlumnos(){
        return axios.get(ALUMNOS_API_BASE_URL);
    }

    getAllAlumnosNombre(nombre){
        return axios.get(`${ALUMNOS_API_BASE_URL}/buscar/${nombre}`)
    }

    createAlumno(student){
        return axios.post(`${ALUMNOS_API_BASE_URL}/nuevoAlumno`, student,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    updateAlumno(id,student){
        return axios.put(`${ALUMNOS_API_BASE_URL}/${id}`, student,{
            headers:{
                "Content-Type":'application/json'
            }
        })
    }

    deleteAlumno(id){
        return axios.delete(`${ALUMNOS_API_BASE_URL}/${id}`);
    }

    deleteAllAlumnos(){
        return axios.delete(`${ALUMNOS_API_BASE_URL}/borrar-todo`)
    }

    generateExcel(){
        return axios.get(`${ALUMNOS_API_BASE_URL}/alumnos/reporte-excel`, {
            responseType: 'blob',
        });
    }

}
export default new alumnoService();