import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Testimonial= db.define('testimoniales',{
    // al parecer por defecto sequelize asigna el nombre de id al pk de cada tabla, por lo que tuve que crear las tablas con el mismo nombre.
    nombre:{
        type: Sequelize.STRING
    },
    correo:{
        type: Sequelize.STRING
    },
    mensaje:{
        type: Sequelize.STRING
    }
})