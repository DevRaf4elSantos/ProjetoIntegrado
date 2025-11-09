import { v4 as gerarUUID } from 'uuid';     

import Database from '../data/database.js';

class AcountService {

    static async executarTransferencia(payload) {

        if (payload.valor <= 0 || payload.origem === payload.destino) {
            const erro = new Error("Valor inválido ou contas idênticas.");
            erro.nome = 'SolicitacaoInvalida';
            throw erro;
        }
        
        const client = await Database.obterConexao(); 
        await client.query('BEGIN'); 

        try {
            
            const querySaldo = "SELECT saldoDisponivel FROM contasCorrentes WHERE idConta = $1 FOR UPDATE";
            const resultado = await client.query(querySaldo, [payload.origem]); 

            if (resultado.linhas.length === 0) {
                throw new Error("Conta de débito não identificada.");
            }
            
            const saldoAtual = resultado.linhas[0].saldoDisponivel;

            if (saldoAtual < payload.valor) {
                const erro = new Error(`Saldo insuficiente para o montante de R$ ${payload.valor.toFixed(2)}.`);
                erro.nome = 'SaldoInsuficiente';
                throw erro; 
            }

            const protocoloUnico = gerarUUID(); 

            const sqlDebito = "UPDATE contasCorrentes SET saldoDisponivel = saldoDisponivel - $1 WHERE idConta = $2";
            await client.query(sqlDebito, [payload.valor, payload.origem]);

            const sqlCredito = "UPDATE contasCorrentes SET saldoDisponivel = saldoDisponivel + $1 WHERE idConta = $2";
            await client.query(sqlCredito, [payload.valor, payload.destino]);

            const sqlLog = "INSERT INTO logTransacoes (origem, destino, montante, protocolo, dataHora, descricao) VALUES ($1, $2, $3, $4, $5, $6)";
            await client.query(sqlLog, [payload.origem, payload.destino, payload.valor, protocoloUnico, new Date(), payload.descricao]);

            await client.query('COMMIT');
            
            return { protocoloUnico };

        } catch (erro) {
            await client.query('ROLLBACK');
            throw erro; 
        } finally {
            client.liberarConexao();
        }
    }
}

export default AcountService;