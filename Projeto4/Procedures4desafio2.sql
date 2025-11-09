DELIMITER //
CREATE PROCEDURE ExtratoConta (
    IN p_id_conta INT,
    IN p_data_inicio DATETIME,
    IN p_data_fim DATETIME,
    OUT p_saldo_total DECIMAL(10, 2)
)
BEGIN
	SELECT
        COALESCE(SUM(lt.valor), 0.00)
    INTO
        p_saldo_total
    FROM
        LogTransacoes lt
    WHERE
        lt.id_conta = p_id_conta
        AND lt.data_hora <= p_data_fim;
    
    SELECT
        lt.id_transacao,
        lt.valor,
        lt.data_hora,
        lt.descricao
    FROM
        LogTransacoes lt
    WHERE
        lt.id_conta = p_id_conta
        AND lt.data_hora BETWEEN p_data_inicio AND p_data_fim
    ORDER BY
        lt.data_hora DESC 
    LIMIT 10; 

END //

DELIMITER ;