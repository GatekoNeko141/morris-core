CREATE DATABASE morris_db;

/*TABLAS*/

/*Tabla de Estados*/
CREATE TABLE status(
  id_status INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
PRIMARY KEY (id_status)) ENGINE = InnoDB;

/*Tabla de Tipos de Usuario*/
CREATE TABLE type_users(
  id_type_user INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  id_status INT NOT NULL,
  PRIMARY KEY (id_type_user),
  FOREIGN KEY (id_status) REFERENCES status(id_status) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB;

/*Tabla de Usuarios*/
CREATE TABLE users(
  id_user INT NOT NULL AUTO_INCREMENT,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  token_verify VARCHAR(200) NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified DATETIME,
  id_status INT NOT NULL,
  id_type_user INT NOT NULL,
  PRIMARY KEY (id_user),
  FOREIGN KEY (id_status) REFERENCES status(id_status) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (id_type_user) REFERENCES type_users(id_type_user) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = InnoDB;

/*Tabla de Permisos*/
CREATE TABLE permissions(
  id_permission INT NOT NULL AUTO_INCREMENT,
  id_type_user INT NOT NULL,
  tabla VARCHAR(50) NOT NULL,
  can_create BIT DEFAULT 0,
  can_read BIT DEFAULT 0,
  can_update BIT DEFAULT 0,
  can_delete BIT DEFAULT 0,
  PRIMARY KEY (id_permission),
  FOREIGN KEY (id_type_user) REFERENCES type_users(id_type_user) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB;

/*Tabla de Frutas*/
CREATE TABLE frutas(
  id_fruta INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  precio INT NOT NULL,
  PRIMARY KEY (id_frutas)
) ENGINE = InnoDB;

/*Tabla de Paises*/
CREATE TABLE paises(
  id_paise INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  poblacion VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_paises)
) ENGINE = InnoDB;


/*REGISTROS*/

INSERT INTO status (nombre) VALUES
('Activado'), ('Pendiente'), ('Desactivado');

INSERT INTO type_users (nombre, id_status) VALUES
('Programador', 1), ('Admin', 1), ('Gerencia', 1);

INSERT INTO permissions (id_type_user, tabla) VALUES
(1, 'frutas'),(1, 'paises');

INSERT INTO users (nombres, apellidos, user_name, email, password, token_verify, id_status, id_type_user) VALUES
('John', 'Doe', 'johndoe', 'admin@dwings.com', '$2a$08$DlOe4MudRQyR2LqZ1SMkF.GHLHS2pDohDHjLwO8Y8qjRZTu5Tf5uW', 'ejrErYQdBb4uKt4awHR9', 1, 1);

INSERT INTO frutas (nombre, precio) VALUES
('Manzana', 2200),
('Racimo de Uvas', 4000),
('Banano', 1000);

INSERT INTO paises (nombre, poblacion) VALUES
('Colombia', '51 millones'), ('Venezuela', '28 millones'), ('Ecuador', '17 millones'),
('Brasil', '214 millones'), ('Argentina', '45 millones'), ('Chile', '19 millones'),
('Perú', '33 millones'), ('Bolivia', '12 millones'), ('Paraguay', '6 millones'),
('Uruguay', '3 millones');


/*PROCEDIMIENTOS*/

CREATE PROCEDURE getUsers(IN id_user INT)
BEGIN
  SELECT
    U.id_user,
    U.nombres,
    U.apellidos,
    U.user_name,
    U.email,
    U.password,
    U.token_verify,
    U.created,
    U.modified,
    S.nombre AS 'status',
    TU.nombre AS 'type_user'
  FROM users AS U
  INNER JOIN status AS S ON S.id_status = U.id_status
  INNER JOIN type_users AS TU ON TU.id_type_user = U.id_type_user
  WHERE U.id_user = id_user;
END;

CREATE PROCEDURE getUserPermission(IN id_user INT)
BEGIN
  SELECT
    TU.nombre AS 'type_user',
    PER.tabla,
    PER.can_create,
    PER.can_read,
    PER.can_update,
    PER.can_delete,
    S.nombre AS 'status'
  FROM permissions AS PER
  INNER JOIN type_users AS TU ON TU.id_type_user = PER.id_type_user
  INNER JOIN status AS S ON S.id_status = TU.id_status
  WHERE PER.id_type_user = (SELECT id_type_user FROM users WHERE id_user = id_user);
END;
