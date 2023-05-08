import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function CrearProveedor(){

    
  const [mensajeSuccess, setmensajeSuccess] = useState('')
  const [mensajeError, setmensajeError] = useState('')

  const [Nombre, setNombre] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Producto, setProducto] = useState('');

  
  const crear_proveedor = async () => {
    if (Nombre && Direccion && Telefono && Producto) {
      const proveedores = await API.getProovedores();
      const proveedorExistente = proveedores.find(
        (proveedor) =>
          proveedor.Nombre.toLowerCase() === Nombre.toLowerCase() && proveedor.Producto.toLowerCase() === Producto.toLowerCase()
      );
      if (proveedorExistente) {
        setmensajeError('Ya existe un proveedor con el mismo nombre y producto');
        return;
      }
  
      const datos_proveedor = {
        Nombre: Nombre,
        Direccion: Direccion,
        Telefono: Telefono,
        Producto: Producto
      };
  
      API.SaveProveedor(datos_proveedor);
      Nombre.current.value=null;
      Direccion.current.value=null;
      Telefono.current.value=null;
      Producto.current.value=null;
  
      setmensajeSuccess('Se Creo el proveedor');
      setTimeout(() => {
        setmensajeSuccess('');
        window.location.reload(true);
      }, 2000);
    }
  };
  
  
    return(
        <div className="card table bg-dark text-white">
            <div className="card-header">
                Agregar Proveedor Nuevo
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
                  required
                  type="text"
                   value={Nombre} 
                   onChange={(event)=>setNombre(event.target.value)}
                  name="" id="" className="form-control bg-dark text-white" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Direccion</label>
                  <input 
                  required
                  type="text"
                   value={Direccion} 
                   onChange={(event)=>setDireccion(event.target.value)}
                  name="" id="" className="form-control bg-dark text-white" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Telefono</label>
                  <input 
                  required
                  type="number" min="0"
                   value={Telefono} 
                   onChange={(event)=>setTelefono(event.target.value)}
                  name="" id="" className="form-control bg-dark text-white" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
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

                <div className="row">
                    <div className='col-3 mt-3'>
                        <button  onClick={crear_proveedor}  type="button" className="btn btn-outline-secondary text-success">Agregar</button>
                        <small id="helpId" className="text-muted">&nbsp;</small>

                        <Link to={'/proveedores'}><button type="button" className="btn btn-outline-secondary text-primary">Volver al listado</button></Link>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
    )
}