import {createContext, useEffect, useState} from 'react'
import clienteAxios from '../config/axios'
import useAuth from "../hooks/useAuth"

const PacientesContext = createContext()

//toma los datos ingresados en el formulario y colocarlos en el state 

export const PacientesProvider = ({children}) => {

    const { auth } = useAuth(); 

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})   

    const [isLoading, setIsLoading] = useState(true);
    
    //obteniendo los pacientes cuando cargue la pagina 
    useEffect(() => {
        const obtenerPacientes = async () => {          
            
            try {                    
                const token = localStorage.getItem('apv-token') 

                if(!token) {  
                    //para que cuando este el login luego de cerrar sesión el state IsLoading sea true
                    setIsLoading(true)                    
                    //para que cuando este el login se reinicie el state de los pacientes, sino se hace el state se queda con los pacientes del ultimo veterinario logueado
                    setPacientes([])  
                                     
                    return
                }                

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }              

                const { data } = await clienteAxios('/pacientes', config)   

                //ordenamos los pacientes en el controler para que no saliera el flaseo, si quiesieramos ordear en el frontend seria:
                //const sortedDates = [... data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                setPacientes( data) 
                setIsLoading(false)                
                                
            } catch (error) {
                console.log(error)
                setIsLoading(false);
            }
        }
        obtenerPacientes()
    }, [auth])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('apv-token')

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        if(paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                
                //itera sobre el state busca el mismo id que estamos editando y reescribe todo el objeto 
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacientesActualizado)

            } catch (error) {
                console.log(error)
            }           
        } else{
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                //creando un nuevo objeto (pacienteAlmacenado) sin estos datos: createdAt, updatedAt, __v
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
                //colocando pacienteAlmacenado en el state
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdicion = paciente => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar el paciente?')

        if(confirmar) {

            const token = localStorage.getItem('apv-token')

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
                   
            try {
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                
                //itera sobre el state busca el mismo id que estamos editando y reescribe todo el objeto 
               const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
                //actualizar state
                setPacientes(pacientesActualizado)

            } catch (error) {
                console.log(error.response.data.msg)
            }   
        }
    }

  return (
    //definimos el provider del context 
        <PacientesContext.Provider
            value={{
                //haciendo disponibles las variables para los demas compornentes
                isLoading,
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente  
            }}
        >        
        {children}
        </PacientesContext.Provider>
  )
}

export default PacientesContext