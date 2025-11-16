USE reservas;
DROP PROCEDURE IF EXISTS sp_reservas_por_mes;
DELIMITER //
CREATE PROCEDURE sp_reservas_por_mes(IN yr INT)
BEGIN
  SELECT MONTH(fecha_reserva) AS mes, COUNT(*) AS total
  FROM reservas
  WHERE YEAR(fecha_reserva) = yr AND activo = 1
  GROUP BY MONTH(fecha_reserva)
  ORDER BY mes;
END //
DELIMITER ;
