import axios from "axios";

const WORKSHOP_API_BASE_URL= 'http://localhost:8081/Workshop'

class workshopService {

    getAllWorkshop() {
        return axios.get(WORKSHOP_API_BASE_URL);
    }

    createWorkshop(workshop) {
        return axios.post(`${WORKSHOP_API_BASE_URL}/NewTaller`, workshop,{
            headers: {
                   'Content-Type': 'application/json'     
            }
        })
    }

    updateWorkshop(id,workshop) {
        return axios.put(`${WORKSHOP_API_BASE_URL}/${id}`, workshop, {
            headers:{
                "Content-Type":'application/json'
            }
        })
    }

    deleteWorkshop(id) {
        return axios.delete(`${WORKSHOP_API_BASE_URL}/${id}`);
    }
}

export default new workshopService();