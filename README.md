# Sistema de Reservas de Apartamentos

## Descripción

La aplicación **Sistema de Reservas de Apartamentos** es una plataforma web diseñada para permitir a los usuarios registrarse, iniciar sesión, visualizar una lista de apartamentos disponibles y realizar reservas. Los administradores pueden gestionar los apartamentos y revisar las reservas realizadas. El sistema está diseñado con medidas de seguridad avanzadas para garantizar una experiencia segura y eficiente tanto para usuarios como administradores.

## Funcionalidades

- **Registro e Inicio de Sesión:** Los usuarios pueden registrarse con contraseñas cifradas y acceder a sus cuentas de manera segura mediante autenticación.
- **Listado de Apartamentos:** Los usuarios pueden ver una lista de apartamentos disponibles con detalles como ubicación, precio, y otros atributos.
- **Reservas:** Los usuarios pueden realizar reservas de apartamentos y consultar el estado de sus reservas.
- **Gestión de Apartamentos (Administrador):** Los administradores tienen acceso a la gestión de apartamentos y la visualización de reservas.
- **Gestión de Sesiones:** Uso de cookies seguras y gestión de sesiones mediante JWT.

## Tecnologías Utilizadas

- **Backend:** Node.js con Express
- **Base de Datos:** MYSQL
- **Autenticación:** JWT para manejo de sesiones
- **Seguridad:** bcryptjs para cifrado de contraseñas, csurf para protección contra CSRF, express-validator para validación de entradas
- **Pruebas:** Mocha, Chai, Sinon, Artillery

## Pruebas Realizadas

### Pruebas Unitarias

Se llevaron a cabo pruebas unitarias para validar las funcionalidades principales:

- **Registro de Usuarios:** Se validó la creación de usuarios con contraseñas cifradas.
- **Inicio de Sesión:** Se probó la validación de credenciales para asegurar la autenticidad de las sesiones de los usuarios.
  
**Herramientas usadas:** Mocha, Chai, Sinon  
**Resultados:** Todas las pruebas pasaron correctamente, validando las funciones críticas como el registro y el inicio de sesión.

### Pruebas de Carga

Se simularon varios escenarios de carga para evaluar la capacidad de la aplicación:

- **Escenario 1:** 10 usuarios concurrentes durante 60 segundos.  
  **Resultados:** La aplicación manejó la carga sin errores significativos, con un tiempo de respuesta medio de 2.1 ms.
  
- **Escenario 2:** 1000 usuarios concurrentes durante 60 segundos.  
  **Resultados:** La aplicación manejó la carga con algunos errores significativos, con un tiempo de respuesta medio de 2746 ms.

**Herramientas usadas:** Artillery

## Medidas de Seguridad Implementadas

1. **Validación de Entradas:** Uso de **express-validator** para prevenir inyecciones SQL y ataques XSS.  
   Ejemplo: Implementado en la función de edición de reservas.
   
2. **Autenticación Segura:**  
   - Contraseñas cifradas con **bcryptjs**.
   - Uso de **JWT** para gestionar sesiones de usuario.

3. **Protección contra CSRF:** Implementación de **csurf** para proteger todos los formularios contra ataques CSRF.

4. **Cifrado de Tráfico:** Recomendamos usar **HTTPS** en el entorno de producción para garantizar la seguridad del tráfico entre el servidor y el cliente.

## Vulnerabilidades Identificadas

- **Falta de Límites de Solicitudes:** No se ha implementado un middleware de limitación de solicitudes, lo que podría permitir ataques de fuerza bruta.

## Conclusión

La aplicación cumple con los requisitos funcionales y ha demostrado ser estable bajo condiciones normales de uso. Aunque algunos errores ocurrieron en escenarios de carga altos, la aplicación puede manejar un volumen de usuarios moderado sin problemas. Se recomienda implementar mejoras en la limitación de solicitudes para protegerse contra ataques de fuerza bruta.
