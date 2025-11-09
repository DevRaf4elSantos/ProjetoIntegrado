import express from 'express';
import AcountService from '../services/AcountService.js'; 
const router = express.Router();

router.post('/transferir', async (req, res) => {
    
    const { contaDebito, contaCredito, montante, notaTransacao } = req.body;

    try {
        const resultadoOperacao = await AcountService.executarTransferencia({ 
            origem: contaDebito, 
            destino: contaCredito, 
            valor: montante,
            descricao: notaTransacao
        });
        
        return res.status(201).json({
            status: "Concluído",
            protocoloUnico: resultadoOperacao.protocoloUnico
        });

    } catch (erro) {
        
        if (erro.nome === 'RecursoInvalido' || erro.nome === 'RestricaoSaldo') {
            return res.status(400).json({ codigo: erro.nome, mensagem: erro.mensagem });
        }

        return res.status(500).json({ 
            codigo: "ErroInterno", 
            mensagem: "Erro na tentativa de transferência, tente novamente mais tarde." 
        });
    }
});



export default router;