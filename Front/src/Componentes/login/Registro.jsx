import { useState } from "react"
import { Link } from "react-router-dom";
import * as API from '../../Servicios/Servicios'

export function Registro(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [apellido_nombre, setApellidonombre] = useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('');
    const [mensajeError, setmensajeError] = useState('');




    const registroForm  = async (event)=>{
        event.preventDefault();
        const user = await API.Registro({username, password, email, apellido_nombre})
        if(user.status){
            setmensajeSuccess(user.mensaje)
            setTimeout(()=>{
                setmensajeSuccess('');
            }, 4000)
            window.location.href=('/')
            window.alert("El usuario se creo correctamente")
        } else{
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('');
            }, 3000)
            window.alert(user.mensaje)
        }
    }
    return(
        <>
        <div className="container">
        {
            mensajeSuccess?
            <div className="alert alert-success" role="alert">
                {mensajeSuccess}
            </div>:''
        }
       
        <div class="login-box">
    <h2>Crear Usuario</h2>
    <form onSubmit={registroForm}>
    <div class="user-box">
    <input 
    required
    type="text" 
    name="" 
    placeholder="Nombre del Usuario" 
    value={username} 
    onChange={(event)=>setUsername(event.target.value)}
    />
    <small id="helpId" className="text-muted">&nbsp;</small>
    <label>Nombre del Usuario</label>
    </div>


    <div class="user-box">
    <input 
        required
    type="password" 
    name="" 
    value={password}
    placeholder="Contraseña" 
    onChange={(event)=>setPassword(event.target.value)}
    />
    <small id="helpId" className="text-muted">&nbsp;</small>
    <label>Contraseña</label>
    </div>

    <div class="user-box">
    <input 
    required
    type="email" 
    name="" 
    placeholder="Email" 
    value={email}
    onChange={(event)=>setEmail(event.target.value)}
    />
    <small id="helpId" className="text-muted">&nbsp;</small>
    <label>Email</label>
    </div>

    <div class="user-box">
    <input 
    required
    type="text" 
    name="" 
    placeholder="Apellido y Nombre" 
    value={apellido_nombre}
    onChange={(event)=>setApellidonombre(event.target.value)}
    />
    <small id="helpId" className="text-muted">&nbsp;</small>
    <label>Apellido y Nombre</label>
    </div>

    

    <button type="submit" data-text="Awesome" class="button">
    <span class="actual-text">&nbsp;Registrarse&nbsp;</span>
    <span class="hover-text" aria-hidden="true">&nbsp;Registrarse&nbsp;</span>
</button>

<Link to={'/'}>
<button data-text="Awesome" class="button">
    <span class="actual-text">&nbsp;Volver&nbsp;</span>
    <span class="hover-text" aria-hidden="true">&nbsp;Volver&nbsp;</span>
</button>
</Link>




  </form>
</div>

        </div>
        </>
    )
    }