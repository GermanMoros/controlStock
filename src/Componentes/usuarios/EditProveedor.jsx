import React, { useEffect,useState } from 'react'
import { Link, useParams} from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function EditProveedores(){

    const [setProveedores] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    const [mensajeError, setMensajeError] = useState('')

    const [Nombre, setNombre] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Producto, setProducto] = useState('');
    const {idProveedores} = useParams();





   
    useEffect(()=>{
        // trae_datos(idClientes)
       trae_datos(idProveedores)
    },[])


    const trae_datos = async () => {
        console.log('aki toy')
        const datos = await API.getProveedorById(idProveedores);
        if (datos && datos[0]) {
            setNombre(datos[0].Nombre);
            setDireccion(datos[0].Direccion);
            setTelefono(datos[0].Telefono);
        }
    };



    const editar_proveedor = () => {
        if (Nombre && Direccion && Telefono) {
          const datos_proveedor = {
            Nombre: Nombre,
            Direccion: Direccion,
            Telefono: Telefono
           
          };
          
          API.UpdateProovedor(idProveedores,datos_proveedor)
             if(datos_proveedor) {
                setmensajeSuccess('Se editó al Proveedor');
              setTimeout(() => {
                setmensajeSuccess('');
              }, 2000);
            }
    
        
        } else {
            setMensajeError('Complete todos los campos');
            setTimeout(() => {
              setMensajeError('');
            }, 2000);
        }
      };

      return(
        <div className="card table bg-dark text-white">
            <div className="card-header">
                Edicion de los datos del proovedor
            </div>
            {
                mensajeSuccess?
                <div className="alert alert-success" role="alert">
                    {mensajeSuccess}
                </div>:''
            }
             {
                mensajeError?
                <div className="alert alert-danger" role="alert">
                    {mensajeError}
                </div>:''
            }
            <div className="card-body ">
                <div className='row'>

                <div className="form-group col-4" >
                  <label for="">Nombre</label>
                  <input 
                  type="text"
                   value={Nombre} 
                    onChange={(event)=>setNombre(event.target.value)}
                  name="" id="" className="form-control bg-dark text-white" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Direccion</label>
                  <input 
                  type="text"
                   value={Direccion} 
                   onChange={(event)=>setDireccion(event.target.value)}
                  name="" id="" className="form-control bg-dark text-white" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Telefono</label>
                  <input 
                  type="number" min="0"
                   value={Telefono} 
                   onChange={(event)=>setTelefono(event.target.value)}
                  name="" id="" className="form-control bg-dark text-white" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted ">&nbsp;</small>
                </div>


                <div className="form-group col-4">
                <label htmlFor="">Producto</label>
                <select 
                        value={Producto} 
                        onChange={(event)=>setProducto(event.target.value)}
                        className="form-control bg-dark text-white">
                                <option value="">Selecciona un producto</option>
                                <option value="BuzosyCamperas">BuzosyCamperas</option>
                                <option value="Remeras">Remeras</option>
                                <option value="Mallas">Mallas</option>
                                <option value="Chanclas">Chanclas</option>
                                <option value="Pantalones">Pantalones</option>
                               
                </select>
                <small id="helpId" className="text-muted">&nbsp;</small>
                </div>

        
                </div>
                <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                            
                <button onClick={editar_proveedor} type="button" className="btn btn-outline-secondary text-success">Guardar</button>
                <small id="helpId" className="text-muted">&nbsp;</small>

                <Link to={'/proveedores'}>
                <button type="button" className="btn btn-outline-secondary text-primary">Volver a la lista</button>
                </Link>
                
                                
                </div>
                </td>
            </div>
            
        </div>
    )
          }