import {Testimonial} from '../models/testimoniales.js'

const guardarTestimonial= async (req,res)=>{

    const {nombre,correo,mensaje}= req.body;

    const errores=[]
    if(nombre.trim()===''){
        errores.push({mensaje:'El nombre está vacio'});
    }
    if(correo.trim()===''){
        errores.push({mensaje:'El correo está vacio'});
    }
    if(mensaje.trim()===''){
        errores.push({mensaje:'El mensaje está vacio'});
    }
    //obtener los testimoniales existentes.
    const testimoniales = await Testimonial.findAll();
    if(errores.length>0){
        res.render('testimoniales',{
            pagina:'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
        return;
    }

    try {
        console.log('creando testimonial...')
        await Testimonial.create({
            nombre,
            correo,
            mensaje
        });
        res.redirect('/testimoniales');//esta linea es necesaria para finalizar el proceso de inserción(?)
        
    } catch (error) {
        console.log(error);
    }
    
}

export{
    guardarTestimonial
}