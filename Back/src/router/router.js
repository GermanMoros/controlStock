const express= require('express');
const router = express();
// libreria que utilizaremos para la encriptacion de los password
const bcrypt= require('bcrypt');
// libreria que utilizaremos para la generacion de nuesrto token
const jwt= require('jsonwebtoken');
//////archivo de coneccion
const mysqlConeccion = require('../database/database');
//////fin archivo de coneccion

///////ruta raiz
router.get('/', (req, res)=>{
    res.send('');
});

//.Devuelve  todos los datos buzosycamperas
router.get('/buzosycamperas',verificarToken,  (req, res)=>{
    jwt.verify(req.token, 'empresaropa', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
        mysqlConeccion.query('select * from buzosycamperas', (err, registro)=>{
            if(!err){
                res.json(registro);
            }else{
                console.log(err)
            }
        })
        }
    })
});



// alta y baja
router.put('/altabuzosycamperas/:id',(req, res)=>{

    let id = req.params.id; 
  
            let query=`UPDATE buzosycamperas set Estado = 'A' WHERE idBuzosyCamperas='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de ALTA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
      
 });


router.put('/bajabuzosycamperas/:id',(req, res)=>{
     
    let id = req.params.id; 
  
            let query=`UPDATE buzosycamperas set Estado = 'B' WHERE idBuzosyCamperas='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de BAJA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
    //     }
    // })
 });


 router.get('/buzosycamperas/:idBuzosyCamperas', (req, res)=>{

  
            const {idBuzosyCamperas} = req.params
            mysqlConeccion.query('select * from buzosycamperas where idBuzosyCamperas=?',[idBuzosyCamperas], (err, registro)=>{
                if(!err){
                    res.json(registro);
                }else{
                    console.log(err)
                }
            })
        
    
});


/// EDIT
router.put('/edit_buzosycamperas/:id' , (req, res)=>{
    let idBuzosyCamperas = req.params.id;
    const {  Talle, Color, Cantidad} =req.body  
    console.log(req.body)
    let query=`UPDATE buzosycamperas SET Talle='${Talle}', Color='${Color}', Cantidad='${Cantidad}' WHERE idBuzosyCamperas='${idBuzosyCamperas}'`;
    mysqlConeccion.query(query, [Talle, Color, Cantidad, idBuzosyCamperas], (err, registros)=>{
        if(!err){
            res.json({
                    status: true,
                    datos: rows,
                    mensaje: 'El producto se edito correctamente'
            }) 
        }else{
            res.json({
                status: false,
                mensaje: 'Completar los campos correctamente'
            })
            console.log(err)
        }
    })
       
});



router.post('/listarbuzosycamperas', (req, res)=>{
    const { Talle, Cantidad, Color} = req.body
  
    let query=`SELECT * FROM buzosycamperas WHERE Talle='${Talle}' AND Cantidad='${Cantidad}' AND Color='${Color}'`;
    mysqlConeccion.query(query, (err, registros)=>{
      if(!err){
        if(registros.length > 0){
          res.send('El producto ya existe en la base de datos');
        } else {
          query=`INSERT INTO buzosycamperas (Talle, Cantidad, Color) VALUES ('${Talle}','${Cantidad}','${Color}') `;
          mysqlConeccion.query(query, (err, registros)=>{
            if(!err){
              res.send('Se inserto correctamente nuestro producto: '+Talle+Cantidad+Color);
            }else{
              console.log(err)
              res.send('El error es: '+err);
            }
          });
        }
      }else{
        console.log(err)
        res.send('El error es: '+err);
      }
    });
  });





////////////////////// CHANCLAS /////////////////////////


//.Devuelve  todos los datos 
router.get('/chanclas', verificarToken,  (req, res)=>{
    jwt.verify(req.token, 'empresaropa', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
        mysqlConeccion.query('select * from chanclas', (err, registro)=>{
            if(!err){
                res.json(registro);
            }else{
                console.log(err)
            }
        })
        }
    })
});



// alta y baja
router.put('/altachanclas/:id',(req, res)=>{
    
    let id = req.params.id; 
    
            let query=`UPDATE chanclas set Estado = 'A' WHERE idChanclas='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de ALTA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
       
 });


router.put('/bajachanclas/:id',(req, res)=>{
     
    let id = req.params.id; 
    
            let query=`UPDATE chanclas set Estado = 'B' WHERE idChanclas='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de BAJA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
      
 });


 
 router.get('/chanclas/:idChanclas', (req, res)=>{

  
            const {idChanclas} = req.params
            mysqlConeccion.query('select * from chanclas where idChanclas=?',[idChanclas], (err, registro)=>{
                if(!err){
                    res.json(registro);
                }else{
                    console.log(err)
                }
            })
        
    
});


/// EDIT
router.put('/edit_chanclas/:id' , (req, res)=>{
     
    let idChanclas = req.params.id;
    const {  Talle, Color, Cantidad} =req.body  
    console.log(req.body)
    let query=`UPDATE chanclas SET Talle='${Talle}', Color='${Color}', Cantidad='${Cantidad}' WHERE idChanclas='${idChanclas}'`;
    mysqlConeccion.query(query, [Talle, Color, Cantidad, idChanclas], (err, registros)=>{
        if(!err){
            res.send('El Id que editamos es : '+idChanclas+' y cambiamos muchos campos!!');
        }else{
            console.log(err)
        }
    })
       
});


router.post('/listarchanclas', (req, res)=>{
    const { Talle, Cantidad, Color} = req.body
    
            let query=`INSERT INTO chanclas (Talle, Cantidad, Color) VALUES ('${Talle}','${Cantidad}','${Color}') `;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestro producto: '+Talle+Cantidad+Color);
                }else{
                    console.log(err)
                    res.send('El error es: '+err);
                }
            })
       
    
});



//.Devuelve  todos los datos pantalones


router.get('/pantalones', verificarToken, (req, res)=>{
    jwt.verify(req.token, 'empresaropa', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
        mysqlConeccion.query('select * from pantalones', (err, registro)=>{
            if(!err){
                res.json(registro);
            }else{
                console.log(err)
            }
        })
        }
    })
});




// alta y baja
router.put('/altapantalones/:id',(req, res)=>{
    
    let id = req.params.id; 
   
            let query=`UPDATE pantalones set Estado = 'A' WHERE idPantalones='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de ALTA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
    
 });


router.put('/bajapantalones/:id',(req, res)=>{
    
    let id = req.params.id; 
   
            let query=`UPDATE pantalones set Estado = 'B' WHERE idPantalones='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de BAJA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
    //
 });



 router.get('/pantalones/:idPantalones', (req, res)=>{

    
            const {idPantalones} = req.params
            mysqlConeccion.query('select * from pantalones where idPantalones=?',[idPantalones], (err, registro)=>{
                if(!err){
                    res.json(registro);
                }else{
                    console.log(err)
                }
            })
        
    
});


/// EDIT
router.put('/edit_pantalones/:id' , (req, res)=>{
    let idPantalones = req.params.id;
    const {  Talle, Color, Cantidad} =req.body  
    console.log(req.body)
    let query=`UPDATE pantalones SET Talle='${Talle}', Color='${Color}', Cantidad='${Cantidad}' WHERE idPantalones='${idPantalones}'`;
    mysqlConeccion.query(query, [Talle, Color, Cantidad, idPantalones], (err, registros)=>{
        if(!err){
            res.send('El Id que editamos es : '+idPantalones+' y cambiamos muchos campos!!');
        }else{
            console.log(err)
        }
    })
       
});


router.post('/listarpantalones', (req, res)=>{
    const { Talle, Cantidad, Color} = req.body
    
            let query=`INSERT INTO pantalones (Talle, Cantidad, Color) VALUES ('${Talle}','${Cantidad}','${Color}') `;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestro producto: '+Talle+Cantidad+Color);
                }else{
                    console.log(err)
                    res.send('El error es: '+err);
                }
            })
       
    
});


//.Devuelve  todos los datos mallas
router.get('/mallas', verificarToken, (req, res)=>{
    jwt.verify(req.token, 'empresaropa', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
        mysqlConeccion.query('select * from mallas', (err, registro)=>{
            if(!err){
                res.json(registro);
            }else{
                console.log(err)
            }
        })
        }
    })
});



// alta y baja
router.put('/altamallas/:id',(req, res)=>{
   
    let id = req.params.id; 
    
            let query=`UPDATE mallas set Estado = 'A' WHERE idMallas='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de ALTA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
      
 });


router.put('/bajamallas/:id',(req, res)=>{ 
    let id = req.params.id; 
   dStatus(403);
        // }else{
            let query=`UPDATE mallas set Estado = 'B' WHERE idMallas='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de BAJA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
    //     }
    // })
 });

 router.get('/mallas/:idMallas', (req, res)=>{


            const {idMallas} = req.params
            mysqlConeccion.query('select * from mallas where idMallas=?',[idMallas], (err, registro)=>{
                if(!err){
                    res.json(registro);
                }else{
                    console.log(err)
                }
            })
        
    
});


/// EDIT
router.put('/edit_mallas/:id' , (req, res)=>{
    
    let idMallas = req.params.id;
    const {  Talle, Color, Cantidad} =req.body  
    console.log(req.body)
    let query=`UPDATE mallas SET Talle='${Talle}', Color='${Color}', Cantidad='${Cantidad}' WHERE idMallas='${idMallas}'`;
    mysqlConeccion.query(query, [Talle, Color, Cantidad, idMallas], (err, registros)=>{
        if(!err){
            res.send('El Id que editamos es : '+idMallas+' y cambiamos muchos campos!!');
        }else{
            console.log(err)
        }
    })
       
});



router.post('/listarmallas', (req, res)=>{
    const { Talle, Cantidad, Color} = req.body
    
            let query=`INSERT INTO mallas (Talle, Cantidad, Color) VALUES ('${Talle}','${Cantidad}','${Color}') `;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestro producto: '+Talle+Cantidad+Color);
                }else{
                    console.log(err)
                    res.send('El error es: '+err);
                }
            })
       
    
});








//.Devuelve  todos los datos remeras

router.get('/remeras', verificarToken, (req, res)=>{
    jwt.verify(req.token, 'empresaropa', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
        mysqlConeccion.query('select * from remeras', (err, registro)=>{
            if(!err){
                res.json(registro);
            }else{
                console.log(err)
            }
        })
        }
    })
});



// alta y baja
router.put('/altaremeras/:id',(req, res)=>{
     
    let id = req.params.id; 
    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
    //     if(error){
    //         res.sendStatus(403);
        // }else{
            let query=`UPDATE remeras set Estado = 'A' WHERE idRemeras='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de ALTA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
    //     }
    // })
 });


router.put('/bajaremeras/:id',(req, res)=>{
    
    let id = req.params.id; 
    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
    //     if(error){
    //         res.sendStatus(403);
        // }else{
            let query=`UPDATE remeras set Estado = 'B' WHERE idRemeras='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El producto se dio de BAJA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
    //     }
    // })
 });


 router.get('/remeras/:idRemeras', (req, res)=>{

    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
    //     if(error){
    //         res.sendStatus(403);
        // }else{
            const {idRemeras} = req.params
            mysqlConeccion.query('select * from remeras where idRemeras=?',[idRemeras], (err, registro)=>{
                if(!err){
                    res.json(registro);
                }else{
                    console.log(err)
                }
            })
        // }
    // })   
    
});


/// EDIT
router.put('/edit_remeras/:id' , (req, res)=>{
    //asigna a id_curso el valor que recibe por el parametro 
    let idRemeras = req.params.id;
    const {  Talle, Color, Cantidad} =req.body  
    console.log(req.body)
    let query=`UPDATE remeras SET Talle='${Talle}', Color='${Color}', Cantidad='${Cantidad}' WHERE idRemeras='${idRemeras}'`;
    mysqlConeccion.query(query, [Talle, Color, Cantidad, idRemeras], (err, registros)=>{
        if(!err){
            res.send('El Id que editamos es : '+idRemeras+' y cambiamos muchos campos!!');
        }else{
            console.log(err)
        }
    })
       
});


router.post('/listarremeras', (req, res)=>{
    const { Talle, Cantidad, Color} = req.body
    
            let query=`INSERT INTO remeras (Talle, Cantidad, Color) VALUES ('${Talle}','${Cantidad}','${Color}') `;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestro producto: '+Talle+Cantidad+Color);
                }else{
                    console.log(err)
                    res.send('El error es: '+err);
                }
            })
       
    
});



////////////////////////////////////////////////////////
/////////////////////PROVEEDORES /////////////////////////
//////////////////////////////////////////////////////




//Devuelve a todos los Proveedores activos de nuestra base de datos 
router.get('/proveedores',verificarToken, (req, res)=>{
    
    jwt.verify(req.token, 'empresaropa', (error)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConeccion.query('select * from proveedores', (err, registro)=>{
                if(!err){
                    res.json(registro);
                }else{
                    console.log(err)
                }
            })
        }
    });    
});


///// ALTA /////
router.put('/altaproveedores/:id',(req, res)=>{
    //asigna a id_alumno el valor que recibe por el parametro 
    let id = req.params.id; 
    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
    //     if(error){
    //         res.sendStatus(403);
        // }else{
            let query=`UPDATE proveedores set Estado = 'A' WHERE idProveedores='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El proveedor se dio de ALTA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
    //     }
    // })
 });

///// BAJA  /////

router.put('/bajaproveedores/:id',(req, res)=>{
    //asigna a id_alumno el valor que recibe por el parametro 
    let id = req.params.id; 
    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
    //     if(error){
    //         res.sendStatus(403);
        // }else{
            let query=`UPDATE proveedores set Estado = 'B' WHERE idProveedores='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El proveedor se dio de BAJA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
    //     }
    // })
 });


 router.get('/proveedor/:idProveedores', (req, res)=>{

    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
    //     if(error){
    //         res.sendStatus(403);
        // }else{
            const {idProveedores} = req.params
            mysqlConeccion.query('select * from proveedores where idProveedores=?',[idProveedores], (err, registro)=>{
                if(!err){
                    res.json(registro);
                }else{
                    console.log(err)
                }
            })
        // }
    // })   
    
});


/// EDIT
router.put('/edit_proveedor/:id' , (req, res)=>{
    //asigna a id_curso el valor que recibe por el parametro 
    let idProveedores = req.params.id;
    const {  Nombre, Direccion, Telefono} =req.body  
    console.log(req.body)
    let query=`UPDATE proveedores SET Nombre='${Nombre}', Direccion='${Direccion}', Telefono='${Telefono}' WHERE idProveedores='${idProveedores}'`;
    mysqlConeccion.query(query, [Nombre, Direccion, Telefono, idProveedores], (err, registros)=>{
        if(!err){
            res.send('El Id que editamos es : '+idProveedores+' y cambiamos muchos campos!!');
        }else{
            console.log(err)
        }
    })
       
});

router.post('/proveedores', (req, res)=>{
    const { Nombre, Direccion, Telefono,Producto} = req.body
    
            let query=`INSERT INTO proveedores (Nombre, Direccion, Telefono, Producto) VALUES ('${Nombre}','${Direccion}','${Telefono}','${Producto}') `;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestro proveedor: '+Nombre);
                }else{
                    console.log(err)
                    res.send('El error es: '+err);
                }
            })
       
    
});









////////////////////////////////////////////////////////
/////////////////////CLIENTES /////////////////////////
//////////////////////////////////////////////////////




 //Devuelve a todos los Clientes activos de nuestra base de datos 
router.get('/clientes',verificarToken,(req, res)=>{

    jwt.verify(req.token, 'empresaropa', (error)=>{
        if(error){
            res.sendStatus(403);
        }else{
            mysqlConeccion.query('select * from Clientes', (err, registro)=>{
                if(!err){
                    res.json(registro);
                }else{
                    console.log(err)
                }
            })
        }
    })   

});


router.get('/clientes/:idClientes', (req, res)=>{

    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
    //     if(error){
    //         res.sendStatus(403);
        // }else{
            const {idClientes} = req.params
            console.log(req.params)
            mysqlConeccion.query('select * from Clientes where idClientes=?',[idClientes], (err, registro)=>{
                if(!err){
                    res.json(registro);
                }else{
                    console.log(err)
                }
            })
        // }
    // })   
    
});


//metodo para insertar Clientes a travez del metodo POST
router.post('/clientes', (req, res)=>{
    const { Nombre, Direccion, Telefono,Producto} = req.body
    
            let query=`INSERT INTO clientes (Nombre, Direccion, Telefono, Producto) VALUES ('${Nombre}','${Direccion}','${Telefono}','${Producto}') `;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestro cliente: '+Nombre);
                }else{
                    console.log(err)
                    res.send('El error es: '+err);
                }
            })
       
    
});


router.put('/edit_clientes/:id',(req, res)=>{
    // jwt.verify(req.token, 'empresaropa', (error)=>{
    //     if(error){
    //         res.sendStatus(403)
    //     }else{
            let idClientes = req.params.id;
            const {  Nombre, Direccion, Telefono} =req.body  
            console.log(req.body)
            mysqlConeccion.query(`UPDATE clientes SET Nombre='${Nombre}', Direccion='${Direccion}', Telefono='${Telefono}' WHERE idClientes='${idClientes}'`, (err, registros)=>{
                if(!err){
                    res.send('El Id que editamos es : '+idClientes+' y cambiamos muchos campos!!');
                }else{
                    console.log(err)
                }
            })
        // }
    // }) 
});




//ALTA CLIENTE

router.put('/altaclientes/:id',verificarToken,(req, res)=>{
    //asigna a id_alumno el valor que recibe por el parametro 
    let id = req.params.id; 
    jwt.verify(req.token, 'empresaropa', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            let query=`UPDATE clientes set Estado = 'A' WHERE idClientes='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El usuario se dio de ALTA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
        }
    })
 });

///// BAJA CLIENTE /////

router.put('/bajaclientes/:id',verificarToken,(req, res)=>{
     
    let id = req.params.id; 
    jwt.verify(req.token, 'empresaropa', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            let query=`UPDATE clientes set Estado = 'B' WHERE idClientes='${id}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El usuario se dio de BAJA correctamente"
                    });
                }else{
                    console.log('El error  es : '+ err); 
                }
            })
        }
    })
 });







////////////// /////////////////
//////////////Usuarios /////////
////////////// /////////////////
router.get('/usuarios', verificarToken, (req, res)=>{

        jwt.verify(req.token, 'empresaropa', (error, valido)=>{
            if(error){
                res.sendStatus(403);
            }else{
                mysqlConeccion.query('select * from usuarios', (err, registro)=>{
                    if(!err){
                        res.json(registro);
                    }else{
                        console.log(err)
                    }
                })
            }
        })   
        
});


////////////login de usuarios //////////////
router.post('/login', (req, res)=>{
    const {username, password} =req.body
    if(username!=undefined && password!=undefined){
        mysqlConeccion.query('select u.username,  u.password,  u.email, u.apellido_nombre from usuarios u where u.estado="A" AND username=?',[username], (err, rows)=>{
            if(!err){
                if(rows.length!=0){
                    const bcryptPassword = bcrypt.compareSync(password, rows[0].password);
                    if(bcryptPassword){
                        jwt.sign({rows}, 'empresaropa' ,(err, token)=>{
                       res.json(
                        {
                            status: true,
                            datos: rows,
                            token: token,
                            mensaje: "Ingreso correctamente"
                        })
                    })
                    }else{
                        res.json(
                            {
                                status: false,
                                mensaje:"La Contraseña es incorrecta"
                                
                            
                            });
                    }
                }else{
                    res.json(
                        {
                            status: false,
                            mensaje:"El usuario no existe "
                        });

                }
            }else{
                res.json(
                    {
                        status: false,
                        mensaje:"Error en el servidor"
                    });
                    
            }
        });
    }else{
        res.json({
            status: false,
            mensaje:"Faltan completar datos"
        })
    }
});

////////////login de usuarios //////////////
router.post('/registro', async(req, res)=>{
    const {username, password, email, apellido_nombre} =req.body
    let hash = bcrypt.hashSync(password,10);

    let queryCheck=`SELECT * FROM usuarios WHERE username='${username}'`;
    mysqlConeccion.query(queryCheck, (err, result)=>{
        if(!err){
            if(result.length > 0){
                res.json({
                    status: false,
                    mensaje:"El nombre de usuario ya existe"
                });
            }else{
                let query=`INSERT INTO usuarios (username, password, email, apellido_nombre, fecha_creacion) VALUES ('${username}','${hash}','${email}','${apellido_nombre}',NOW())`;
                mysqlConeccion.query(query, (err, registros)=>{
                    if(!err){
                        res.json({
                            status: true,
                            mensaje:"El usuario se creo correctamente"
                        });
                    }else{
                        res.json({
                            status: false,
                            mensaje:"Hay un error al registrar el usuario"
                        });
                    }
                });
            }
        }else{
            res.json({
                status: false,
                mensaje:"Hay un error al registrar el usuario"
            });
        }
    });
});

router.put('/resetpassword/:id', (req, res)=>{
    // asigna a id_usuario el valor que recibe por el parametro 
     let id  = req.params.id;
    // //asigna el valor que recibe  en el Body 
     const { password } =req.body 
     let hash = bcrypt.hashSync(password,10); 
    //  generamos la query de modificacion del password
     let query=`UPDATE usuarios SET password='${hash}' WHERE id='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.send('El Id que editamos es : '+id+' y cambiamos el password! Muchas gracias!');
        }else{
            console.log(err)
        }
    })

    
});


router.put('/bajausuario/:id', (req, res)=>{
    // asigna a id_usuario el valor que recibe por el parametro 
     let id  = req.params.id;
     let query=`UPDATE usuarios SET estado='B' WHERE id='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El usuario se dio de BAJA correctamente"
            });
        }else{
            console.log(err)
        }
    })
    
});

router.put('/altausuario/:id', (req, res)=>{
    // asigna a id_usuario el valor que recibe por el parametro 
     let id  = req.params.id;
     let query=`UPDATE usuarios SET estado='A' WHERE id='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El usuario se dio de Alta correctamente"
            });
        }else{
            console.log(err)
        }
    })
    
});
////////////// /////////////////
// //////////////////////Nuestras funciones /////////
function verificarToken(req, res, next){
    // console.log('controlo lo que llega', req.headers)
    const BearerHeader= req.headers['authorization']
    if(typeof BearerHeader!=='undefined'){
        const bearerToken= BearerHeader.split(" ")[1]
        req.token=bearerToken;
        next();
    }else{
         res.send('Para consultar las apis debe estar autenticado');
        // console.log('Ocurrio un error')
    }
}

module.exports = router;

