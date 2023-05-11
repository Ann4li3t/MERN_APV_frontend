import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
    //baseURL: 'http://localhost:5174/api'
})

export default clienteAxios