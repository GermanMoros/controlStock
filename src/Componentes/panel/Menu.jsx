import { Link } from 'react-router-dom'
import { Principal } from './Principal'
import { useState,useEffect } from "react"
import * as API from '../../Servicios/Servicios'


export function Menu(){

  const [usuario, setUsuario] = useState('')
  const [nombre_usuario, setNombreUsuario] = useState('')

  const logout  = async (event)=>{
          setUsuario('')
          window.localStorage.removeItem('usuario')
          window.location.href=('/')
  }

  useEffect(()=>{
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    if(usuarioLogueado){
      setNombreUsuario(usuarioLogueado.datos[0].apellido_nombre)
    }
  },[])



    return(
        <nav className="navbar navbar-expand-lg">
  <a className="navbar-brand text-light" href='/'><b>Banzai Clothes</b></a>
  <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse " id="navbarNavDropdown">
    <ul className="navbar-nav ">
      <li className="nav-item active">
      <Link className="nav-link text-light"to={'/'}>Inicio</Link>
      </li>

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Administración
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to={'/Clientes'}>Clientes</Link>
          <Link className="dropdown-item" to={'/Proveedores'}>Proveedores</Link>

          
        </div>
      </li>



      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Productos
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to={'/listarbuzosycamperas'}>Buzos y camperas</Link>
          <Link className="dropdown-item" to={'/listarchanclas'}>Chanclas</Link>
          <Link className="dropdown-item" to={'/listarmallas'}>Mallas</Link>
          <Link className="dropdown-item" to={'/listarpantalones'}>Pantalones</Link>
          <Link className="dropdown-item" to={'/listarremeras'}>Remeras</Link>
        </div>
      </li>
      <li className="nav-item active text-light" >  
      <a className='nav-link dropdown text-primary'>Usuario: <b>{nombre_usuario}</b>  </a>
      </li>
      <li className="nav-item active">
      <button onClick={logout} className="btn btn-outline-danger"to={'/'}>Cerrar Sesión</button>
      </li>
    </ul>
  </div>
</nav>

    )
}