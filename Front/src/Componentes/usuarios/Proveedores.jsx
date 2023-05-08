import React, { useEffect } from "react";
import { useState } from "react";
import{Link} from 'react-router-dom'
import * as API from '../../Servicios/Servicios'


export function    Proveedores(){

    const [proveedor, setProveedores] = useState([]);
    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')

    useEffect(()=>{
        API.getProovedores().then(setProveedores)
    },[])
    
    //BOTONES//

    const bajaProovedor  = async(id)=>{
        console.log('el id que vamos a dar de baja es el',id)

        const user = await API.BajaProveedores(id)
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

    const altaProovedor = async(id)=>{
        const user = await API.AltaProveedores(id)
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
        Proveedores
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
        {/* <Link to = {'/crear_proveedor'}role="button" className="btn btn-outline-primary">Agregar Proveedor</Link> */}
        <div className="table-responsive">
        

                <table className="table text-white">

                    <thead>
        <Link to = {'/crear_proveedor'}role="button" className="btn btn-outline-primary">Agregar Proveedor</Link>

                        <tr>
                            
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {proveedor.map((provedor)=>(
                        <tr key={provedor.idProveedores}>
                            <td scope="row">{provedor.idProveedores}</td>
                            <td>{provedor.Nombre}</td>
                            <td>{provedor.Direccion}</td>
                            <td>{provedor.Telefono}</td>
                            <td>{provedor.Producto}</td>

                            <td>{provedor.Estado == 'A'?'Activo':'Baja'}</td>
                            <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                            { (provedor.Estado=='B')? 
                                <button onClick={() => altaProovedor(provedor.idProveedores,'A')} type="button" className="btn btn-outline-primary">Alta</button>
                                
                                :
                                <>
                                
                                <button onClick={() =>bajaProovedor(provedor.idProveedores,'B')}type="button" className="btn btn-outline-danger">Baja</button>
                            <Link name="" id="" className="btn btn-outline-secondary" to={`/edit_proveedores/${provedor.idProveedores}`} role="button">Editar </Link>
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