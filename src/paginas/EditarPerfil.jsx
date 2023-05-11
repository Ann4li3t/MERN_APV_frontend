import { useEffect,useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth"

const EditarPerfil = () => {
    const { auth,actualizarPerfil } = useAuth()

    const [perfil, setPerfil] = useState({})   
    const [alerta, setAlerta] = useState({}) 

    //para no cambiar el state original hasta que se no se hayan guardado los cambios 
    useEffect(() =>{
        setPerfil(auth)
    },[auth])

    const handleSubmit = async e => {
        e.preventDefault()
        const { nombre, email } = perfil
        if([nombre, email].includes('')) {
            setAlerta({
                msg: 'Email y Nombre son obligatorios.',
                error: true
            })
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)        
    } 

    const { msg } = alerta

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
            <span className="text-indigo-600 font-bold">Información aquí</span> 
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                {msg && <Alerta alerta={alerta} />}
                <form
                    onSubmit={handleSubmit}
                >  
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Nombre</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nombre" //este name tiene que ser el mismo nombre de la propiedad del objeto que tiene el state 
                            value={perfil.nombre || ''} //se pone asi porque cuando carga al principio esta vacio y luego es que cambia
                            //para no perder la informacion previa del objeto, lo que hace es tomar una copia del state y reescribe solo el campo del objeto en el cual nos encontramos editanto y que esta asociado con el input 
                            onChange={ e => setPerfil({
                                ...perfil, //se toma una copia del state perfil (en el useEffect le habiamos pasado el auth que tiene la imnfo del vet loguedo
                                [e.target.name] : e.target.value //escribe solo en la propiedad name y las demas las va a mantener intactas
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="web"
                            value={perfil.web || ''}
                            onChange={ e => setPerfil({
                                ...perfil, 
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Teléfono</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={ e => setPerfil({
                                ...perfil, 
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Email</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="email"
                            value={perfil.email || ''}
                            onChange={ e => setPerfil({
                                ...perfil, 
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil