-- Crear base y tablas según modelo de datos del enunciado.
CREATE DATABASE IF NOT EXISTS reservas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE reservas;

-- Tablas
CREATE TABLE IF NOT EXISTS salones (
  salon_id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  latitud DECIMAL(10,8) NULL,
  longitud DECIMAL(11,8) NULL,
  capacidad INT NULL,
  importe DECIMAL(10,2) NOT NULL,
  activo TINYINT(1) DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servicios (
  servicio_id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL,
  importe DECIMAL(10,2) NOT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS turnos (
  turno_id INT AUTO_INCREMENT PRIMARY KEY,
  orden INT NOT NULL,
  hora_desde TIME NOT NULL,
  hora_hasta TIME NOT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuarios (
  usuario_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
  contrasenia VARCHAR(255) NOT NULL,
  tipo_usuario TINYINT NOT NULL, -- 1 cliente, 2 empleado, 3 admin
  celular VARCHAR(20) NULL,
  foto VARCHAR(255) NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservas (
  reserva_id INT AUTO_INCREMENT PRIMARY KEY,
  fecha_reserva DATE NOT NULL,
  salon_id INT NOT NULL,
  usuario_id INT NOT NULL,
  turno_id INT NOT NULL,
  foto_cumpleaniero VARCHAR(255) NULL,
  tematica VARCHAR(255) NULL,
  importe_salon DECIMAL(10,2) NULL,
  importe_total DECIMAL(10,2) NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT reservas_fk2 FOREIGN KEY (salon_id) REFERENCES salones(salon_id),
  CONSTRAINT reservas_fk3 FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
  CONSTRAINT reservas_fk4 FOREIGN KEY (turno_id) REFERENCES turnos(turno_id)
);

CREATE TABLE IF NOT EXISTS reservas_servicios (
  reserva_servicio_id INT AUTO_INCREMENT PRIMARY KEY,
  reserva_id INT NOT NULL,
  servicio_id INT NOT NULL,
  importe DECIMAL(10,2) NOT NULL,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT reservas_servicios_fk1 FOREIGN KEY (reserva_id) REFERENCES reservas(reserva_id),
  CONSTRAINT reservas_servicios_fk2 FOREIGN KEY (servicio_id) REFERENCES servicios(servicio_id)
);

-- Seed mínimo (opcional)
INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo)
VALUES
('Admin','Root','admin@correo.com','$2a$10$QHkKc2qC1bBqK9d0sPVHbe3qH7KbnrZpNs/D/1bqQ3QxvVq8y8/3e',3,1) -- password: admin123
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);
