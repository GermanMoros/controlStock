import React, { useEffect,useState } from 'react'
import { Link, useParams} from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function EditPantalones(){

    const [setPantalones] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    const [Talle, setTalle] = useState('');
    const [Color, setColor] = useState('');
    const [Cantidad, setCantidad] = useState('');
    const {idPantalones} = useParams();




    useEffect(()=>{
        // trae_datos(idClientes)
       trae_datos(idPantalones)
    },[])


    const trae_datos = async ()=>{
        const datos= await API.getPantalonesById(idPantalones);
        console.log('los datos enviados son',datos[0].Talle)
            setTalle(datos[0].Talle)
            setCantidad(datos[0].Cantidad)
            setColor(datos[0].Color)

        }


    const editar_pantalones = ()=>{
        const datos_enviar={
            Talle: Talle,
            Cantidad: Cantidad,
            Color: Color
        };
        API.UpdatePantalones(idPantalones,datos_enviar);
        // nombre_curso.current.value=null;
        
        setmensajeSuccess('Se edito el producto')
            setTimeout(()=>{
                setmensajeSuccess('')
                window.location.reload(true)
            }, 2000)
        }


    return(
        <div className="card table bg-dark text-white">
            <div className="card-header">
                Edicion de los datos del producto
            </div>
            {
                mensajeSuccess?
                <div className="alert alert-success" role="alert">
                    {mensajeSuccess}
                </div>:''
            }
            <div className="card-body ">
                <div className='row'>

                <div className="form-group col-4" >
                  <label for="">Talle</label>
                  <input 
                  type="text"
                   value={Talle} 
                    // onChange={(event)=>setTalle(event.target.value)}
                  name="" id="" className="form-control bg-dark text-white" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Cantidad</label>
                  <input 
                  required
                  type="number" min="0"
                   value={Cantidad} 
                   onChange={(event)=>setCantidad(event.target.value)}
                  name="" id="" className="form-control bg-dark text-white" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Color</label>
                  <input 
                  type="text"
                   value={Color} 
                //    onChange={(event)=>setColor(event.target.value)}
                  name="" id="" className="form-control bg-dark text-white" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted ">&nbsp;</small>
                </div>
        
                </div>
                <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                            
                <button onClick={editar_pantalones} type="button" className="btn btn-outline-secondary text-success">Guardar</button>
                <small id="helpId" className="text-muted">&nbsp;</small>

                <Link to={'/listarpantalones'}>
                <button type="button" className="btn btn-outline-secondary text-primary">Volver a la lista</button>
                </Link>
                
                                
                </div>
                </td>
            </div>
            
        </div>
    )
        }