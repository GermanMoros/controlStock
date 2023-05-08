import React, { useEffect } from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'
import * as API from '../../Servicios/Servicios'


export function     ListaChanclas(){

    const [chancla, setChanclas] = useState([]);
    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')



    useEffect(()=>{
        API.getChanclas().then(setChanclas)
    },[])

    const bajaChanclas = async(id)=>{
        console.log('el id que vamos a dar de baja es el',id)

        const user = await API.BajaChanclas(id)
        if(user.status){
            
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('')
                window.location.reload(true)
            }, 3000)

        }else{
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }

    const altaChanclas = async(id)=>{
        const user = await API.AltaChanclas(id)
        if(user.status){
            setmensajeSuccess(user.mensaje)
            setTimeout(()=>{
                setmensajeSuccess('')
                window.location.reload(true)
            }, 3000)
        }else{
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }


////////////////////////////////////////////////////


    
    return(

        <div className="card table bg-dark text-white">
        <div className="card-header">
        Stock de Chanclas
        </div>
        {
                    mensajeError?
                    <div class="alert alert-warning" role="alert">
                     {mensajeError}
                    </div>:''
                }

                {
                    mensajeSuccess?
                    <div class="alert alert-success" role="alert">
                     {mensajeSuccess}
                    </div>:''
                }

        <div className="card-body">
        <div className="table-responsive">
            
                <table className="table text-white">
                    
                    <thead>
                    <Link to = {'/crear_chanclas'}role="button" className="btn btn-outline-primary">Agregar Producto</Link>

                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Talle</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Color</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chancla.map((chanclas)=>(
                        <tr key={chanclas.idChanclas}>
                            <td scope="row">{chanclas.idChanclas}</td>
                            <td>{chanclas.Talle}</td>
                            <td>{chanclas.Cantidad}</td>
                            <td>{chanclas.Color}</td>
                            <td>{chanclas.Estado == 'A'?'Activo':'Baja'}</td>
                            <td>

                            <div className="btn-group" role="group" aria-label="Basic example">
                            { (chanclas.Estado=='B')? 
                                <button onClick={() => altaChanclas(chanclas.idChanclas,'B')}type="button" className="btn btn-outline-primary">Alta</button>
                                :
                                <>
                                <button onClick={() => bajaChanclas(chanclas.idChanclas,'B')} type="button" className="btn btn-outline-danger">Baja</button>
                                <Link name="" id="" className="btn btn-outline-secondary" to={`/edit_chanclas/${chanclas.idChanclas}`} role="button">Editar </Link>
                                </>
                        }

                                </div>
                        
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
            
            

    )  
}