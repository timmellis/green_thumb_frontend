import Axios from 'axios';

export default Axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})
