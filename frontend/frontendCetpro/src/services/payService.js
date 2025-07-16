import axios from "axios";

const PAGOS_API_BASE_URL='http://localhost:8081/pagos';

class payService {

    getAllPago(){
        return axios.get(PAGOS_API_BASE_URL);
    }

    createPago(pago){
        return axios.post(`${PAGOS_API_BASE_URL}/newPago`, pago,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    
    deletePago(id) {
        return axios.delete(`${PAGOS_API_BASE_URL}/${id}`);
    }
}

export default new payService();