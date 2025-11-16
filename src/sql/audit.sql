USE reservas;

CREATE TABLE IF NOT EXISTS auditoria (
  audit_id INT AUTO_INCREMENT PRIMARY KEY,
  entidad VARCHAR(50) NOT NULL,
  entidad_id INT NOT NULL,
  accion ENUM('CREATE','UPDATE','DELETE') NOT NULL,
  usuario_id INT NULL,
  detalle JSON NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS trg_reservas_ai;
DELIMITER //
CREATE TRIGGER trg_reservas_ai AFTER INSERT ON reservas
FOR EACH ROW
BEGIN
  INSERT INTO auditoria(entidad, entidad_id, accion, usuario_id, detalle)
  VALUES ('reservas', NEW.reserva_id, 'CREATE', NEW.usuario_id, JSON_OBJECT('importe_total', NEW.importe_total));
END//
DELIMITER ;

DROP TRIGGER IF EXISTS trg_reservas_au;
DELIMITER //
CREATE TRIGGER trg_reservas_au AFTER UPDATE ON reservas
FOR EACH ROW
BEGIN
  INSERT INTO auditoria(entidad, entidad_id, accion, usuario_id, detalle)
  VALUES ('reservas', NEW.reserva_id, 'UPDATE', NEW.usuario_id, JSON_OBJECT('old_total', OLD.importe_total, 'new_total', NEW.importe_total));
END//
DELIMITER ;

DROP TRIGGER IF EXISTS trg_reservas_bd;
DELIMITER //
CREATE TRIGGER trg_reservas_bd BEFORE UPDATE ON reservas
FOR EACH ROW
BEGIN
  IF NEW.activo = 0 AND OLD.activo = 1 THEN
    INSERT INTO auditoria(entidad, entidad_id, accion, usuario_id, detalle)
    VALUES ('reservas', OLD.reserva_id, 'DELETE', OLD.usuario_id, NULL);
  END IF;
END//
DELIMITER ;
