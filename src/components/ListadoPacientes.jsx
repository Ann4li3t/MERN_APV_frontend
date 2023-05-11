import useAuth from "../hooks/useAuth";
import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
    
    const { pacientes, isLoading } = usePacientes() 

    return (
        <>
            {isLoading ? (
                <>
                    <p>Cargando pacientes...</p>
                </>
            ) :
            (
                <>
                    { pacientes.length ? 
                    (
                        <>
                            <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
        
                            <p className="text-xl mt-5 mb-10 text-center">
                                Administra tus {''}
                                <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                            </p>
        
                            {/* creamos props para mostrar la info de un paciente */}
                            {pacientes.map( paciente => (
                                <Paciente 
                                    key={paciente._id}
                                    paciente={paciente}
                                />
                            ))}
                        </>
                    ) : 
                    (
                        <>
                            <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>
        
                            <p className="text-xl mt-5 mb-10 text-center">
                                Comienza agregando pacientes {''}
                                <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
                            </p>
                        </>
                    )}
                </>

                
            )}
            
        </>
    )
  };
  
  export default ListadoPacientes;