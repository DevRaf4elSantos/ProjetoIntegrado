import express from 'express';
import accountController from './controllers/AcountController.js'; 

const app = express();

app.use(express.json());

app.use('/api/v1', accountController);

app.get('/', (req, res) => {
    res.send('API de Transações TechMarket Online.');
});


export default app;