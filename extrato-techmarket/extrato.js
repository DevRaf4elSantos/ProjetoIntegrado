const transacoes = [
    { id: 1, descricao: "Compra na Loja Dona Rosinha", data: "2025-11-05", valor: -500.00, tipo: "Cartão de Crédito" },
    { id: 2, descricao: "Pagamento de Fatura BancoPig (Pix)", data: "2025-11-04", valor: - 6200.00, tipo: "Transferência" }, 
    { id: 3, descricao: "PIX Recebido - Cliente Mestre Kami", data: "2025-11-03", valor: + 850.00, tipo: "PIX" },
    { id: 4, descricao: "Compra na loja do Guerreiros dos Chá", data: "2025-11-02", valor: -12500.50, tipo: "Cartão" }, 
    { id: 5, descricao: "Pix Recebido - Cliente Niklaus Mikaelson", data: "2025-11-01", valor: + 35000.00, tipo: "Crédito" },
    { id: 6, descricao: "Pix Enviado - Cliente Jorginho do Beach", data: "2025-11-07", valor: -4999.99, tipo: "Transferência" },
];

const VALOR_LIMITE = 5000; 

function formatarMoeda(valor) {
    const absValor = Math.abs(valor);
    return absValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderizarExtrato() {
    const container = document.getElementById('extrato-dinamico');
    if (!container) return; 

    let htmlContent = '';

    transacoes.forEach(transacao => {

        let classeDestaqueArtigo = '';
        if (transacao.valor <= -VALOR_LIMITE) {
            classeDestaqueArtigo = 'destaque-alto-valor'; 
        } else if (transacao.valor >= VALOR_LIMITE) {
            classeDestaqueArtigo = 'destaque-credito-linha'; 
        }

        let classeValor = ''; 

        if (transacao.valor <= -VALOR_LIMITE) {
            classeValor = 'destaque-debito-forte';
        } else if (transacao.valor >= VALOR_LIMITE) {
            classeValor = 'destaque-credito-forte';
        } else {
            classeValor = transacao.valor < 0 ? 'debito' : 'credito';
        }
        
        const dataFormatada = new Date(transacao.data).toLocaleDateString('pt-BR');
            
        htmlContent += `
            <article class="transacao ${classeDestaqueArtigo}">
                <div class="info-principal">
                    <span class="descricao">${transacao.descricao}</span>
                    <span class="valor ${classeValor}"> 
                        ${transacao.valor < 0 ? '-' : '+'} ${formatarMoeda(transacao.valor)}
                    </span>
                </div>
                <div class="info-secundaria">
                    <time datetime="${transacao.data}" class="data">${dataFormatada}</time>
                    <span class="tipo">${transacao.tipo}</span>
                </div>
            </article>
        `;
    });

    container.innerHTML = htmlContent; 
}

renderizarExtrato();