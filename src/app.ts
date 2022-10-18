import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './swagger.config';
import postRoutes from './routes/post.routes';


const app : Application = express();

//Settings
app.set('port', process.env.PORT || 3000);



//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));



//Swagger Config
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));



//Routes
app.use(postRoutes);


export default app;

