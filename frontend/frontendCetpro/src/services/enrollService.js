import axios from "axios";

const ENROLL_API_BASE_URL= 'http://localhost:8081/inscribir'

class enrollService{
    
    getAllInsripciones(){
        return axios.get(ENROLL_API_BASE_URL);
    }

    getAllInscripcionTaller(nombre){
        return axios.get(`${ENROLL_API_BASE_URL}/listaInscripcion/${nombre}`);
    }

    createInscripcion(enroll){
        return axios.post(`${ENROLL_API_BASE_URL}/crear`,enroll,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    deleteInscripciion(id){
        return axios.delete(`${ENROLL_API_BASE_URL}/${id}`);
    }
}

export default new enrollService();