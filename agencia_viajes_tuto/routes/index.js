/*este archivo contendrá las rutas de nuestra aplicación1*/
import express from 'express';
import {paginaIncio, paginaNosotros,paginaViajes,paginaTestimoniales,paginaDetalleViaje} from '../controllers/paginasController.js'
import { guardarTestimonial } from '../controllers/testimonialController.js';
const router= express.Router();
// el '/' indica que la ruta es la raíz. req y res hacen referencia a los objetos que contienen la información del requerimiento y la respuesta respectivamente.
router.get('/',paginaIncio)
router.get('/nosotros',paginaNosotros);
router.get('/viajes',paginaViajes);
router.get('/viajes/:viaje',paginaDetalleViaje);//:viaje es un parametro
router.get('/testimoniales',paginaTestimoniales);
router.post('/testimoniales',guardarTestimonial);

router.get('/prueba-de-ruta',(req,res)=>{//req lo que envia el cliente, response - lo que el servidor retorna.
    
    const titulo='La ultima estrella'
    res.render('nosotros',{
        mision: 'Nuesstra misión es entregar la información de los viajes más convenientes',
        vision:'Esperamos que con nuestra asesoria puedas encontrar el viaje ideal para ti y tú bolcillo',
        titulo
    });//se usa para renderizar una vista html. Al tener un motor de plantillas, buscara el archivo con el  nombre de nosotros, en este caso nosotros.js en views
    
});
router.get('/yo',(req,res)=>{
   
    res.json({
        rut:'17-682-241-4',
        nombre:'Víctor Hugo Gómez Atabales'
    });
    
})

export default router;