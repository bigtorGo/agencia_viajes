import { Testimonial } from '../models/testimoniales.js';
import {Viaje} from '../models/viaje.js'
export {
    paginaIncio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}

const paginaIncio= async (req,res)=>{//req lo que envia el cliente, response - lo que el servidor retorna.
    
    const finds=[];
    finds.push(Viaje.findAll({limit:3}));//trae los primeros 3 registros
    finds.push(Testimonial.findAll({limit:3}));
    try {
        const resultado = await Promise.all(finds)//este enfoque permite hacer una busqueda paralela, sin esperar la secuencialidad de varios await.
        res.render('inicio',{// render es utilizado para devolver una respuesta que se renderizará.
            pagina: 'Inicio',
            clase:'home',
            viajes:resultado[0],
            testimoniales:resultado[1]
        });
    } catch (error) {
        console.log(error)
    }
    
   
}
const paginaNosotros= (req,res)=>{
    res.render('nosotros',{
        pagina: 'Nosotros'
    });   
}

const paginaViajes=async (req,res)=>{

    const viajes= await Viaje.findAll();

    res.render('viajes',{//se le pasan a viajes.pug los datos en el objeto
        pagina: 'Próximos viajes',
        viajes
    });
}

const paginaTestimoniales= async (req,res)=>{

    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        });
        
    } catch (error) {
        console.log(error);
    }
   
}
//viaje por slug

const paginaDetalleViaje= async (req,res)=>{
   
    console.log(req.params);
    const { viaje }= req.params;//este parametro se crea en el index de los routers en: router.get('/viajes/:viaje',paginaViajes)
    
    try{
        const datosViaje= await Viaje.findOne({where: {slug:viaje}});//si el parametro tiene el mismo nombre que el campo de la tabla(en este caso slug) se puede dejar solo el nombre(slug) sin la asignación de valor(slug: viaje)
        res.render('viaje',{
            pagina: 'Información Viaje',
            datosViaje
        })
    }catch(error){
        console.log(error);
    }
}

