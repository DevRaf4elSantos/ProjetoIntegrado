create database Transacoes;

use Transacoes;

CREATE TABLE LogTransacoes (
    id_transacao INT PRIMARY KEY AUTO_INCREMENT,
    id_conta INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL, 
    data_hora DATETIME NOT NULL,
    descricao VARCHAR(255),
    INDEX idx_conta_data (id_conta, data_hora)
);

INSERT INTO LogTransacoes (id_conta, valor, data_hora, descricao) VALUES

(01, 15000.00, '2025-09-01 10:00:00', 'Depósito Inicial'),
(01, -384.85, '2025-09-05 14:30:00', 'Compra Material de Construção'),
(01, 547.58, '2025-09-10 18:45:00', 'Deposito Jacomi Peixe'),
(01, -50.52, '2025-09-15 08:00:00', 'Tarifa Mensal'),
(01, 750.18, '2025-09-20 12:15:00', 'Pagamento - 123Milhas'),
(01, 5080.99, '2025-10-01 16:00:00', 'PIX - Cliente Beta'),
(01, -158.44, '2025-10-05 09:30:00', 'Assinatura Software ERP'),
(01, -250.07, '2025-10-10 11:00:00', 'Combustível EFA'),
(01, 10058.03, '2025-10-15 13:45:00', 'Venda de Produto #456'),
(01, -401.02, '2025-10-20 17:00:00', 'Pagamento Internet'),
(01, 250.99, '2025-10-25 09:00:00', 'Venda Pequena #789'),
(01, 8850.05, '2025-10-30 14:00:00', 'Consultoria Técnica'),
(01, -188.70, '2025-11-01 11:30:00', 'Compra de Domínio Web'),
(01, 2001.09, '2025-11-05 15:00:00', 'Recebimento de Crédito'),
(01, -450.97, '2025-11-07 10:45:00', 'Marketing Digital - Ads');
