# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# Girly

E-commerce de moda y accesorios femeninos

# DESCRIPCIÓN DEL PROYECTO

Girly es una tienda en línea desarrollada con una arquitectura de frontend y backend en servicios separados. El backend está construido con NodeTS, Express y MySQL, proporcionando una API robusta para la gestión de productos, registro y autenticación de usuarios. El frontend utiliza ReactJS para ofrecer una interfaz de usuario dinámica y responsiva.

El proyecto cuenta con funcionalidades específicas para administradores, que pueden gestionar los productos de la tienda (crear, editar, eliminar), y para clientes, quienes pueden navegar por el catálogo, agregar productos al carrito, y realizar compras luego de realizar la autenticación.

# INSTALACIÓN

1. Clonar el respositorio: git clone https://github.com/LuzTappero/Project-FullStack
2. Instalar las dependencias del proyecto:
- Para el Backend: posicionarse en la carpeta del servidor y ejecutar : npm install

- Para el Frontend: posicionarse en la carpeta del servidor y ejecutar : npm install

3. Configurar la base de datos: Ajusta los parámetros de conexión en el archivo de configuración.

nombres de variables de entorno de bases de datos"""!!!!

4. Ejecutar la aplicación
- Para el Backend: npm run dev (inicia el servidor en modo desarrollo)
- Para el Frotend: npm ..................................

# USO

### CLIENTES
- Los clientes pueden navegar por las distintas secciones del sitio, como la tienda de productos, la página de inicio, About, y acceder a la seccción de autenticación para registrarse como nuevos usuarios y posterior autenticación (CON SEGURIDAD)
- Explorar el catálogo de productos con opciones de filtrado
    - precio
    - categoria (nombras todas)
    - nombre de producto.
 y búsqueda para encontrar fácilmente lo que desean.

### CLIENTES AUTENTICADOS

Los clientes que se registran como nuevos usuarios e inician sesión obtienen funciones adicionales, tales como:
- Agregar productos al carrito de compras y gestionar los artículos en él, incluyendo la selección de cantidades.
- Elegir opciones de compra según sus preferencias y necesidades.
    -- envio
    -- a casa
- Realizar la compra y visualizar un listado con las compras realizadas y sus caracteristicas en la sección de profile 'My purchases'
- Acceso a perfil extra, crear, editar.
- deslogeo


### ADMINISTRADORES

Los administradores tienen acceso a una interfaz personalizada que incluye herramientas exclusivas para la gestión de productos:
- Agregar nuevos productos a la tienda, completando información detallada como nombre del producto, categoria, precio, AGREGAR imagenes DESDE LA COMPUTADORA DE CADA ADMINSITRADOR, SERAN SUBIDAS A LA NUBE y desde ahi accedidas.
- Editar productos existentes, modificando cualquier información del producto
- Eliminar productos.
Todos estos cambios realizados por el administrador son directamenete impactados en la base de datos.

# API ENDPOINTS

### BACKEND API (Servidor Node.ts con Express)

#### ENDPOINTS PARA LA GESTIÓN DE USUARIOS

- ** GET /user/
Devuelve una lista json con todos los usuarios (util para un administrador)

- ** GET /user/id/:id
Devuelve una lista json con todos el usuario específicado por (util para un administrador)
Ejemplo de respuesta JSON

    {
    "user_id": "244284aa-55bd-4fb2-8e04-2d38fb7a2c7b",//Random uuidv4
    "username": "User",
    "password": "Password hash",
    "email": "User@gmail.com",
    "role": "client",
    "created_at": "2024-09-07T22:47:57.000Z",
    "updated_at": "2024-09-07T22:47:57.000Z"
    },

- ** POST /user/register

Permite el registro de nuevos usuarios; por default todos los usuarios registrados a través del frontend serán registrados como rol 'client'.

¿Cómo crear un usuario rol 'admin'?

Insertar estos campos en una herramienta como postman haciendo un post a la ruta mencionada:
Cuerpo de la solicitud (JSON)

    {
        "username": "username",
        "password": "password",
        "email": "username@gmail.com",
        "role": "admin"
    }

- ** POST user/login

Permite la autenticación de usuarios registrados y proporciona acceso a las funciones específicas del sistema. Este endpoint permite tanto a clientes como a administradores iniciar sesión en la aplicación.

El propósito de éste endpoint es Autenticar a los usuarios y generar un token de acceso JWT (JSON Web Token) para sesiones seguras.
Cuerpo de la solicitud (JSON)

    {
        "email": "user@example.com",
        "password": "SecurePassword123!"
    }

En caso de éxito se obtiene un JSON con un mensaje de éxito y el token creado.
En caso de error se obtiene un JSON con un mensaje segun el error, contraseña incorrecta o usuario no encontrado en la base de datos.

MANEJO DEL TOKEN

- El Token JWT se envia en la respuesta exitosa del endpoint y es almacenado en el session storage del navegador para su uso en futuras solicitudes que deben ser protegidas.

- El token es incluido en el encabezado Authorization de las solicitudes a rutas protegidas.Las rutas que requieren autenticación y uso del token incluyen:
    - Acciones relacionadas a la creación de el perfil:
        - Creación de un perfil: Incluir datos personales como dirección (Address) y teléfono (Phone), necesarios para realizar compras con envío a domicilio.
        - Actualizar la información personal almacenada en el perfil del usuario.
        - Obtención del perfil: Recuperar los datos del perfil del usuario autenticado.

    - Gestión de compras:
        - Realizar una compra: Completar el proceso de compra y almacenar la orden en la base de datos.
        - Lista de compras: Obtener un historial de las compras realizadas por el usuario


- ** POST user/logout
Permite a los usuarios autenticados cerrar sesión en la aplicación.
Este endpoint realiza la desconexión segura del usuario y envía una respuesta en formato JSON confirmando el cierre de sesión.

El propósito del endpoint es finalizar la sesión del usuario autenticado y limpiar datos relacionados con la sesión activa.

Respuesta Exitosa (Código 200):

    {
        "message": "Logout successful"
    }


Acciones Posteriores al Cierre de Sesión:

- Eliminación del Token: El token JWT debe ser eliminado del session storage del navegador para asegurar que no se puedan realizar solicitudes autenticadas sin una nueva autenticación.
- Limpieza del Carrito: Los items almacenados en el local storage del navegador, que puedan estar en el carrito de compras, deben ser eliminados para evitar datos obsoletos.
- Datos del Perfil: luego de cierre de sesión los datos de perfil son seteados a nulos.


- ** DELETE user/:id
Permite eliminar un usuario específico por id.

Respuesta Exitosa (Código 200):

    {
        "message": "User deleted successfully"
    }

Respuesta en Caso de Error (Código 404)
    {
        "error": "User not found"
    }

- ** PATCH user/:id

Permite actualizar la información del usuario específicado por id.
Cuerpo de la solicitud

    {
        "username": "NewUsername",
        "password": "NewSecurePassword123.",
        "email": "newEmail@example.com",
    }
Respuesta exitosa (Código 200)

    {
        "message": "User profile updated successfully"
    }


ESTADO ACTUAL EN EL FRONTEND

Implementación Pendiente:

Las rutas para editar y eliminar usuarios están implementadas en el backend, pero aún no están conectadas ni implementadas en el frontend.
Estas funcionalidades se añadirán en futuras actualizaciones para permitir a los usuarios gestionar su información personal a través de la interfaz de usuario,proporcionando una experiencia de usuario más completa y dinámica.


#### ENDPOINTS PARA LA GESTIÓN DE PRODUCTOS
La ruta del get es visible para todo aquel que acceda a la página, la ruta de post, patch y delete son solo visibles desde el frontend para el usuario con rol 'admin', le permitirá realizar todas las acciones relacionadas con el CRUD de productos.

- ** GET /products

Esta ruta permite obtener toda la lista de productos presentes en la base de datos.
Respuesta exitosa (Código 200)

    [
    {
        "product_id": 1,
        "name": "T-shirt edit",
        "description": "Comfortable cotton t-shirt",
        "price": "9.99",
        "imagePath": "https://res.cloudinary.com/dmofgxbvt/image/upload/v1725501584/products/ib4b6by3zqvtq66xamw9.jpg",
        "category_id": 1,
        "created_at": "2024-09-04T19:26:25.000Z",
        "updated_at": "2024-09-05T01:59:43.000Z"
        },
    ...
    ]

- ** GET /products/:id
Obtiene la información detallada de un producto específico según su ID. Esta ruta es accesible para todos los usuarios.

Respuesta exitosa (Código 200)

    {
        "product_id": 1,
        "name": "T-shirt edit",
        "description": "Comfortable cotton t-shirt",
        "price": "9.99",
        "imagePath": "https://res.cloudinary.com/dmofgxbvt/image/upload/v1725501584/products/ib4b6by3zqvtq66xamw9.jpg",
        "category_id": 1,
        "created_at": "2024-09-04T19:26:25.000Z",
        "updated_at": "2024-09-05T01:59:43.000Z"
    }

RUTAS PROTEGIDAS (Solo para usuarios Administradores)

- ** POST /products/create

Esta ruta permite a los administradores crear nuevos productos. Está disponible tanto en el backend como en el frontend, siempre y cuando se valide el token de autenticación que se envia en el encabezado de la solicitud. El proceso se realiza a través de un formulario que asegura una experiencia de usuario intuitiva y eficiente, con vista inmediata de los productos agregados.

Cuerpo de la solicitud

    {
        "name": "New Product",
        "description": "Description of the new product",
        "price": "19.99",
        "imagePath": "URL de la imagen",
        "category_id": 2
    }

Respuesta exitosa (Código 201)

    {
        message: "Product created successfully"
    }


- ** PATCH /products/:id

Esta ruta permite a los administradores actualizar la información de un producto existente. Está disponible tanto en el backend como en el frontend, siempre y cuando se valide el token de autenticación  que se envia en el encabezado de la solicitud. La actualización se realiza a través de un formulario en el frontend, asegurando una experiencia de usuario sencilla y eficiente, con vista inmediata de los productos editados

Cuerpo de la solicitud

    {
        "name": "Updated Product Name",
        "description": "Updated description",
        "price": "29.99",
        "imagePath": "Updated image",
        "category_id": 3
    }
Respuesta Exitosa (Código 200)

    {
        "message": "Product updated successfully",
    }

- ** DELETE /products/:id

Respuesta exitosa (Códgo 204)
En caso de éxito, la respuesta no contiene un cuerpo, solo un código de estado que indica que la eliminación fue realizada correctamente.

Esta ruta permite a los administradores eliminar un producto existente. Está disponible tanto en el backend como en el frontend, siempre y cuando se valide el token de autenticación  que se envia en el encabezado de la solicitud. La solicitud se realiza a través de un método HTTP DELETE y asegura la eliminación del producto especificado, a través del parámetro :id.


MANEJO DE ERRORES Y MENSAJES EN EL MODELO PRODUCTO

Todos los mensajes y errores son mostrados al administrador a través de los formularios respectivos de cada endpoint, tanto para mensajes de éxito, errores producidos por campos incompletos , o falla al eliminar un producto porque está relacionado con otras tablas.


#### ENDPOINTS PARA LA GESTIÓN DEL PERFIL DEL USUARIOS

Este modelo le permite a un usuario autenticado, agregar datos solo si quiere hacer una compra que le tenga que llegar al domicilio, pudiendo tambien agregar un telefono de contacto y una red social (ésta última de manera opcional)


-- seguir con esto


#### ENDPOINTS PARA LA GESTIÓN DE CATEGORIAS

- ** GET /categories/

Respuesta exitosa (Código 200)
"categories":

    [
        {
                "category_id": 1,
                "name": "Clothing"
        },
    ...
    ]

El id de cada categoria es utilizado como Foreing key en la tabla productos. Este endpoint es llamado desde el servicio del Frontend para aplicar los filtros por categoria en la lista de los productos; también es utilizado por el administrador para seleccionar a que categoria pertenece el nuevo producto que desea crear.


Los endpoint que detallaré a continuación están correctamente en funcionamiento desde el backend, pero aún no están integrados al frontend. En el futuro, se agregarán para que el administrador pueda crear una nueva categoria si así lo desea al mismo tiempo que gestiona la creación de un producto.

- ** GET /categories/id/:id

Permite obtener una categoria segun su id

Respuesta exitosa (Código 200)

    {
        "category_id":2,
        "name": "Shoes"
    }

- ** POST /categories/create

Permite la creación de categorias especificando su nombre, el id se genera de manera autoincremental automaticamente por la base de datos.

Cuerpo de la solicitud

    {
        "name": "New Category"
    }

Respuesta exitosa (Código 201)

    {
        "message": "Category saved succesfully",
    }


- ** PATCH /categories/:id

Permite actualizar una categoria a través de su id

Cuerpo de la solicitud

    {
        "name": "Updated category "
    }

Respuesta Exitosa(200)

    {
        "message": "Category updated successfully"
    }


- ** DELETE /categories/:id

Permite eliminar una categoria a través de su id.

Respuesta Exitosa (200)

Respuesta Exitosa(200)

    {
        "message": "Category deleted successfully"
    }

En este caso si se envia un mensaje de eliminación exitosa para facilitar la comprensión, cuando sea implementado al frontend no se enviará ningun contenido en la respuesta y tendrá un código 204.


#### ENDPOINTS PARA LA GESTIÓN DE ORDENES DE COMPRA


- ** GET /orders

Este endpoint permite a los usuarios autenticados obtener un listado de sus órdenes de compra realizadas. El acceso a esta ruta requiere que el usuario esté autenticado y que el token de autenticación sea enviado en el encabezado de autorización. El token es verificado en el backend para garantizar que el usuario tenga permiso para acceder a esta información.

Uso:

Este endpoint está disponible desde el frontend (con validación del token enviado en el header de autenticación) permitiendo a los usuarios autenticados consultar sus propias órdenes de compra a través de su perfil.
Este endpoint está implementados en la sección PROFILE - MY PURCHASES

- ** POST /orders/saveCart

Este endpoint permite al usuario autenticado guardar los items de compra, como orden de compra en la base de datos, y luego consultarlos a través de la ruta en /orders
Este endpoint se ejecuta al confirmar una compra, los items comprados son guardados en la base de datos.


### FRONTEND API RUTAS

RUTAS PÚBLICAS

Estas rutas están disponibles para todos los usuarios, ya sea que estén autenticados o no.

- **GET "/" (Home)
Descripción: Página de inicio de la aplicación.

Uso: Página principal donde los usuarios pueden ver una vista general de la aplicación.

- **GET "/about" (about)
Descripción: Página de información sobre la marca de la tienda.

Uso: Proporciona detalles sobre la misión, visión, y/o el equipo detrás del e-commerce.

- **GET "/auth" (auth)
Descripción: Página de autenticación para iniciar sesión o registrarse.

Uso: Permite a los usuarios autenticarse en la aplicación o crear una nueva cuenta.

- ** GET "/shop" (Shop)

Descripción: Página principal del catálogo de productos.

Uso: Muestra una lista de productos disponibles para los usuarios.

- ** GET /access-denied
Descripción: Página que se muestra cuando un usuario intenta acceder a una ruta para la cual no tiene permisos.

Uso: Informa al usuario que no tiene acceso a la página o recurso solicitado.

- ** GET /*

Descripción: Página que se muestra cuando la ruta solicitada no se encuentra en la aplicación.

Uso: Proporciona una página de error 404 para las rutas no reconocidas.


RUTAS PROTEGIDAS

Estas rutas requieren que el usuario esté autenticado y que el token obtenido en el momento de la autenticación permanezca valido y sea el correcto.

- ** GET "/profile"

Descripción: Página del perfil del usuario autenticado.
Uso: Permite a los usuarios ver y editar su información personal.

- ** POST "/profile-create"

Descripción: Ruta para crear un nuevo perfil de usuario (si es necesario).
Uso: Permite a los usuarios agregar o actualizar su perfil con información adicional, como dirección y número de teléfono.

Ambas rutas protegidas dará acceso a usuarios clientes y usuarios administradores, diferenciando el contenido y funcionalidades segun la condición de su rol.

# TECNOLOGÍAS UTILIZADAS

## Backend

Node.js: Entorno de ejecución para JavaScript en el servidor.

TypeScript: Superset de JavaScript que agrega tipos estáticos.

MySQL Workbench: Herramienta para diseño, administración y modelado de bases de datos MySQL.

Sequelize: ORM (Object-Relational Mapping) para Node.js que facilita la interacción con bases de datos SQL.

Express: Framework web para Node.js, que facilita la creación de aplicaciones y APIs.Node,

Cloudinary: Servicio de almacenamiento y gestión de imágenes en la nube.

## Frontend

React: Biblioteca para construir interfaces de usuario interactivas.

JavaScript: Lenguaje de programación para desarrollar la lógica del frontend.

HTML5: Lenguaje de marcado para estructurar el contenido de las páginas web.

CSS: Hojas de estilo en cascada para diseñar y maquetar el contenido web.

Axios: Biblioteca para realizar solicitudes HTTP desde el frontend (si lo estás usando).

## Tecnologías comunes

CONTROL DE VERSIONES: Git para el control de versiones y GitHub para la gestión de repositorios.

REST API: Protocolo de comunicación para la interacción entre el frontend y el backend.

JSON: Formato de intercambio de datos utilizado para la comunicación entre frontend y backend.

JWT (JSON Web Tokens): Para autenticación y autorización en ambas capas (si es aplicable).

Cloudinary: utilizado en ambos servicios para la gestión y almacenamiento de imágenes.


# Contribución

Este proyecto es desarrollado como parte de una diplomatura personal y, por lo tanto, no está abierto a contribuciones externas. Sin embargo, si tienes comentarios o sugerencias para mejorar el proyecto, no dudes en contactarme directamente a través de mi email 'luztappero@gmail.com' o mi cuenta de linkedIn 'https://www.linkedin.com/in/luztappero/'

Agradezco cualquier retroalimentación constructiva que pueda ayudarme a mejorar el proyecto.


# Licencia
Este proyecto es de propiedad personal y está destinado a fines educativos dentro del marco de una diplomatura. No se concede ninguna licencia para su uso o distribución fuera del contexto académico. 