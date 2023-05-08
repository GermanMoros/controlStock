import { useState } from 'react'
import '../login/Login.css'
import { Link} from 'react-router-dom'
import * as API from '../../Servicios/Servicios'


export function Login (){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensajeError, setmensajeError] = useState('');
    const [sesion, setSesion] = useState('');




    const enviarForm  = async (event)=>{
        event.preventDefault();
        const user = await API.Login({username, password})
        console.log(username,password)
        if(user.status){
            console.log("entra en el if")
            console.log(user.token);
            window.localStorage.setItem('usuario', JSON.stringify(user));
            window.localStorage.setItem('token', JSON.stringify(user.token));
            setSesion(sesion)
            setUsername('')
            setPassword('')
            window.location.reload(true)
        }else{
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }

        return(
            <>
            <div className='container'>
        <div class="login-box">
            <h2>Login</h2>
            <form onSubmit={enviarForm}>
                <h1 className="h3 mb-3 fw-normal text-muted">Ingresar sus datos</h1>
                    {
                        mensajeError?
                        <div class="alert alert-danger" role="alert">
                        {mensajeError}
                        </div>:''
                    }
        <div class="user-box">
        <input 
        required
        type="text" 
        name="" 
        placeholder='Usuario'
        value={username}
        onChange={(event)=> setUsername(event.target.value)}
    
        />
        
        <label for="floatingPassword">Usuario</label>
            </div>
            <div className="user-box">
    
    
        <input 
        required
        type="password" 
        name="" 
        placeholder='Contraseña'
        value={password}
        onChange={(event)=> setPassword(event.target.value)}
    
        />
    
        <label for="floatingPassword">Contraseña</label>
        </div>
        
        <button type='submit' data-text="Awesome" class="button">
        <span className="actual-text">&nbsp;Iniciar&nbsp;</span>
        <span className="hover-text" aria-hidden="true">&nbsp;Iniciar&nbsp;</span>
        </button>
    
    <Link to={'/registro'}>
    <button data-text="Awesome" class="button">
        <span className="actual-text">&nbsp;Registrarse&nbsp;</span>
        <span className="hover-text" aria-hidden="true">&nbsp;Registrarse&nbsp;</span>
    </button>
    </Link>
    
    </form>
    </div>
    </div>
    </>
        )
        
    
}