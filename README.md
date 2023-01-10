
<p align="center">
  <h1 align="center">Morris Core</h1>
  <p align="center">Backend basado en NodeJS como nucleo central de proyectos</p>
</p>
<p align="center">
  <a href="https://github.com/GatekoNeko141/morris-core/issues">
    <img src="https://img.shields.io/github/issues/GatekoNeko141/morris-core"/> 
  </a>
  <a href="https://github.com/GatekoNeko141/morris-core/network/members">
    <img src="https://img.shields.io/github/forks/GatekoNeko141/morris-core"/> 
  </a>  
  <a href="https://github.com/GatekoNeko141/morris-core/stargazers">
    <img src="https://img.shields.io/github/stars/GatekoNeko141/morris-core"/> 
  </a>
</p>

##  Dependencias
Estas son las librerías o frameworks del BackEnd que están siendo usadas por NodeJS y para que sirve cada una

| Librería | Función |
| ------ | ------ |
| Express | Manejo de APIs |
| MySQL | Gestor de Bases de Datos |
| Json Web Token | Generador de Tokens de usuario |
| Morgan | Capturador de peticiones HTTP |
| Nodemon | Monitoreo de cambios del servidor |
| DotEnv | Gestor de variables de entorno |
| Cookie Parser | Gestor de variables cookies |
| Cors | Control de acceso HTTP |
| BcryptJS | Librería de encriptación |
| Open | Librería del servidor para abrir una URL |

Ejecutar el siguiente comando para la instalación
```sh
npm install
```

## Variables de entorno
Configurar el archivo `.env` con las siguientes características

```sh
SV_PORT=3030

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_DATABASE=nombre_base_de_datos

JWT_SECRET_KEY=llave_secreta_para_generar_tokens
JWT_TIME_SESSION=60s
JWT_TIME_COOKIE=60
```