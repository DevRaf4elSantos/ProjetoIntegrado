class MockDBCliente {
    
    async query(sql, params) {
        
        if (sql.includes('SELECT saldoDisponivel')) {
            return { linhas: [{ saldoDisponivel: 35780.07 }] }; 
        }

        if (sql === 'BEGIN') {
            console.log('  [DB] Transação Iniciada.');
            return;
        }
        if (sql === 'COMMIT') {
            console.log('  [DB] Transação Confirmada (COMMIT).');
            return;
        }
        if (sql === 'ROLLBACK') {
            console.log('  [DB] Transação Revertida (ROLLBACK).');
            return;
        }
        
        return { linhasAfetadas: 1 };
    }

    liberarConexao() {
        console.log('  [DB] Conexão Liberada.');
    }
}

class DatabasePool {
    async obterConexao() {
        return new MockDBCliente();
    }
}

export default new DatabasePool();