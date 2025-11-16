USE reservas;

-- Turnos demo
INSERT INTO turnos (orden, hora_desde, hora_hasta, activo) VALUES
(1,'10:00:00','12:00:00',1),
(2,'14:00:00','16:00:00',1),
(3,'18:00:00','20:00:00',1)
ON DUPLICATE KEY UPDATE orden=VALUES(orden);

-- Salones demo
INSERT INTO salones (titulo, direccion, importe, activo) VALUES
('Salon Centro','Av. Siempre Viva 123', 50000,1),
('Salon Norte','Calle Falsa 742', 65000,1)
;

-- Servicios demo
INSERT INTO servicios (descripcion, importe, activo) VALUES
('Decoración básica', 10000,1),
('Catering standard', 25000,1),
('Animación infantil', 15000,1)
;

-- Usuarios demo
INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo)
VALUES ('Empleado','Demo','empleado@demo.com', '$2a$10$QHkKc2qC1bBqK9d0sPVHbe3qH7KbnrZpNs/D/1bqQ3QxvVq8y8/3e', 2,1)  -- admin123
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo)
VALUES ('Cliente','Demo','cliente@demo.com', '$2a$10$QHkKc2qC1bBqK9d0sPVHbe3qH7KbnrZpNs/D/1bqQ3QxvVq8y8/3e', 1,1)  -- admin123
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);
