//este archivo se usa para configurar el servidor de express.

//const express= require('express');//esta sintaxis se conoce como "common js". <import express from 'express'> es la versión con "imports"
import express from 'express';// para usar esta forma de importar se debe escribir el parametro <"type": "module"> en el package.json.
import router from './routes/index.js';
import db from './config/db.js'
const app= express();//solo se puede tener una instancia de app. De otra forma se reinicia el servidor

//debemos crear un puerto para conectar con el servidor. Se usa process.evn.PORT para indicar el puerto cuando se haga deploytment en heroku. Este puerto es asignado por el servicio que albergue la app.
const port= process.env.PORT || 4000;//Las variables de entorno se acceden con process. El 4000 es para trabajar en local.
//conectar a la base de datos
db.authenticate()
    .then(()=> console.log('Conección a la base de datos establecida exitosamente'))
    .catch(error => console.log(error));

app.set('view engine', 'pug')
//cuando definimos un middleware y realizamos operaciones, debemos indicarle con next que siga ejecutando la pila de middlewares.
app.use((req,res, next)=>{

    const year= new Date();
    //para pasar valores de un archivo a una vista o otro archivo, se pueden usar las propedades locals
    res.locals.currentYear= year.getFullYear();
    res.locals.nombreSitio= "Agencia De Viajes";
    next();
})
//agregar body parser para leer los datos del formulario.
app.use(express.urlencoded({extended:true}))
//agregar router
app.use('/',router);//use se ejecuta cuando se llama alguno de los verbos de de solicitud.
//definir la carpeta publica
app.use(express.static('public'));



app.listen(port,() =>{
    console.log(`El servidor está funcionando en el puerto ${port}`);
})