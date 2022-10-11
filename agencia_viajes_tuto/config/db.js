import Sequelize   from "sequelize";
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_NAME);

const db= new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{//esta información debe ser modificada al usar un hosting
    host:process.env.DB_HOST,//para ocultar información importante es necesario usar variabless de entorno. Las variables de entorno tienen valores que cambian dependiendo si el proyecto está en desarrollo(local) o producción(servidor de producció)
    port:process.env.DB_PORT,
    dialect: 'mysql',
    define:{
        timestamps:false
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorAliases:false
});

export default db;