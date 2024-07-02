import express from 'express';
import connectDB from './db';
import movieRoutes from './routes/index';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './../swagger.json';

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', movieRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export { app };
