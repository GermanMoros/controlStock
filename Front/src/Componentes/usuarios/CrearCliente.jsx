import React, {  useState } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function CrearCliente(){

    
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    const [mensajeError, setmensajeError] = useState('')

    const [Nombre, setNombre] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Producto, setProducto] = useState('');
    
    
    
    const crear_cliente = async () => {
      if (Nombre && Direccion && Telefono && Producto) {
        const clientes = await API.getClientes();
        const clienteExistente = clientes.find(
          (cliente) =>
            cliente.Nombre.toLowerCase() === Nombre.toLowerCase() && cliente.Producto.toLowerCase() === Producto.toLowerCase()
        );
        if (clienteExistente) {
          setmensajeError('Ya existe un cliente con el mismo nombre y producto');
          return;
        }
    
        const datos_cliente = {
          Nombre: Nombre,
          Direccion: Direccion,
          Telefono: Telefono,
          Producto: Producto
        };
    
        API.SaveCliente(datos_cliente);
        Nombre.current.value=null;
        Direccion.current.value=null;
        Telefono.current.value=null;
        Producto.current.value=null;
    
        setmensajeSuccess('Se Creo el cliente');
        setTimeout(() => {
          setmensajeSuccess('');
          window.location.reload(true);
        }, 2000);
      }
    };
    return(
        <div className="card table bg-dark text-white">
            <div className="card-header">
                Agregar Cliente Nuevo
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
            <div className="card-body">
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
                  <small id="helpId" className="text-muted">&nbsp;</small>
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
                
                <div className="row">
                    <div className='col-3 mt-3'>
                        <button  onClick={crear_cliente}  type="button" className="btn btn-outline-secondary text-success">Agregar</button>
                        <small id="helpId" className="text-muted">&nbsp;</small>

                        <Link to={'/clientes'}><button type="button" className="btn btn-outline-secondary text-primary">Volver al listado</button></Link>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
    )
}