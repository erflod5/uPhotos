# Practica 1 uPhotos: - FrontEnd
## Seminario de Sistemas 1
## Grupo 5

### Integrantes
|Nombre|Carnet  |
|--|--|
|Luis Angel Vargas Leon|201701023|
|Erik Gerardo Flores Diaz|201701066|

## Requisitos
Para la implementación de este proyecto de software, en su parte FrontEnd se necesitan las siguientes herramientas instaladas:
### NodeJS
``` 
https://nodejs.org/es/download
```
***
### Angular CLI
```
npm install -g @angular/cli
```
***
### TypeScript
```
npm install -g typescript
```

#### Demás requerimientos:
La aplicación utiliza varias dependencias como Express, RxJS, zone.js, font-awesome, bootstrap, JQuery, ngx-toastr y ngx-webcam
Las dependencias de estos se encuentran especificados en el archivo package.json, por lo que lo único necesario es instalarlos a través de npm con el siguiente comando:
```
npm install
```
Este comando instalará todas las dependencias especificadas en package.son

## Componentes
Las aplicaciones de Angular se dividen en componentes, la aplicación cuenta con los siguientes:
#### Login
Componente donde se encuentra el Login de la aplicación, cuenta con las funciones de ingresar a través de texto o de reconocimiento facial. El endpoint relacionado a este componente, declarado en **src/app-routing.module.ts** es:
```
/user
```
### SignIn
Componente donde se encuentra la funcionalidad de **Crear Nuevas Cuentas**. El endpoint relacionado a este componente, declarado en **src/app-routing.module.ts** es:
```
/signin
```
### Nav-bar
Componente que cuenta con la barra de navegación de la aplicación.
### User
Componente donde se encuentra la Galeria inicial de cada usuario, los usuarios son almacenados en el Local Storage para indicar las fotos que pertenecen a cada quien. El endpoint relacionado a este componente, declarado en **src/app-routing.module.ts** es:
```
/user
```
### Album
Componente donde se encuentra la distinción de imagenes por albumes, se analizan los atributos de las imagenes dadas por Rekognition. El endpoint relacionado a este componente, declarado en **src/app-routing.module.ts** es:
```
/album
```
### Me
Componente donde se encuentran las imagenes en las que aparece el usuario, analizadas por el atributo 'itsme' asignado en el análisis con Rekognition. El endpoint relacionado a este componente, declarado en **src/app-routing.module.ts** es:
```
/me
```
## api.service.ts
En este archivo de TypeScript se declararon todas las funciones que realizan peticiones http al BackEnd.
