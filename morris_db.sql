CREATE DATABASE morris_db;

--Tabla de Usuarios
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  token_verify VARCHAR(200) NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified DATETIME,
  status INT NOT NULL,
  type_user INT NOT NULL,
PRIMARY KEY (id)) ENGINE = InnoDB;

--Tabla de Estados
CREATE TABLE status(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
PRIMARY KEY (id)) ENGINE = InnoDB;

--Tabla de Frutas
CREATE TABLE frutas(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  precio INT NOT NULL,
PRIMARY KEY (id)) ENGINE = InnoDB;

--REGISTROS
INSERT INTO status (nombre) VALUES
('Activado'), ('Pendiente'), ('Desactivado');

--JOINS (Pendientes a ser Procedimientos Almacenados)
SELECT
  U.id,
  U.nombres,
  U.apellidos,
  U.user_name,
  U.email,
  U.password,
  U.token_verify,
  U.created,
  U.modified,
  S.nombre AS 'status',
  U.type_user
FROM users AS U
INNER JOIN status AS S IN S.id = U.status;
