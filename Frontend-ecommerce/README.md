
# Girly

E-commerce de moda y accesorios femeninos

# DESCRIPCIÓN DEL PROYECTO

Girly es una tienda en línea desarrollada con una arquitectura de frontend y backend en servicios separados. El backend está construido con NodeTS, Express y MySQL, proporcionando una API robusta para la gestión de productos, registro y autenticación de usuarios. El frontend utiliza ReactJS para ofrecer una interfaz de usuario dinámica y responsiva.

El proyecto cuenta con funcionalidades específicas para administradores, que pueden gestionar los productos de la tienda (crear, editar, eliminar), y para clientes, quienes pueden navegar por el catálogo, agregar productos al carrito, y realizar compras luego de realizar la autenticación.

# INSTALACIÓN

1. Clonar el respositorio:

- Backend:

    1-Navegar a la carpeta del servidor

    2- Ejecutar el comando: git clone https://github.com/LuzTappero/BACKEND-Girly

- Frontend:

    1- Navegar a la carpeta del servidor backend

    2- Ejecutar el comando git clone https://github.com/LuzTappero/Girly-ecommerce

2. Instalar las dependencias del proyecto:

- Backend:

    1-Navegar a la carpeta del servidor

    2- Ejecutar el comando: npm install

- Frontend:

    1- Navegar a la carpeta del frontend

    2- Ejecutar el comando npm install

3. Configurar las variables de entorno
 - Variables de Entorno para el Backend:

    PORT= 8080

    TIMES = 900000

    MAX= 100

    ORIGIN_ACCEPTED= http://localhost:5173 (local host del frotend para la configuración de cors)
- Variables de Entorno para la Base de Datos:

    DB_HOST=localhost

    DB_USER=tu-usuario

    DB_PASSWORD=tu-contraseña

    DB_NAME=nombre-de-tu-base-de-datos

    DB_DIALECT=mysql

- Variables de entorno para la configuración de la nube de imágenes cloudinary

    CLOUD_NAME=dmofgxbvt

    CLOUD_KEY=265163655817565

    CLOUD_SECRET=IwpxICQCVpkbvX24YNLstoNLGZY


4. Configurar la base de datos

La base de datos exportada se encuentra en la carpeta db, a la misma altura que src.

La tabla productos ya incluye un script de inserción para poblar el modelo con los productos necesarios.
La tabla productos ya incluye un script de inserción para poblar el modelo con las categorias necesarias.

5. Ejecutar la aplicación
- Backend:

    1-Navegar a la carpeta del servidor

    2- Ejecutar el comando: npm install

- Frontend:

    1- Navegar a la carpeta del frontend

    2- Ejecutar el comando npm install

# USO

### CLIENTES
- Los clientes pueden navegar por las diferentes secciones del sitio, como la tienda de productos, la página de inicio, "About", y la sección de autenticación. Desde allí, pueden registrarse como nuevos usuarios y autenticarse posteriormente, todo con medidas de seguridad adecuadas.
- Explorar el catálogo de productos con opciones de filtrado y búsqueda para encontrar fácilmente lo que desean:
    - Filtrado por precio mínimo y máximo.
    - Filtrado por categoría: ['Clothing', 'Shoes', 'Accesories', 'Bags', Jewelry, 'coats' ].
    - Búsqueda por nombre de producto.

### CLIENTES AUTENTICADOS

Los clientes que se registran y luego inician sesión obtienen acceso a funcionalidades adicionales, tales como:

- Gestión del Carrito de Compras:
    - Agregar productos al carrito.
    - Gestionar los artículos en el carrito, incluyendo ajustar cantidades (aumentar, disminuir, eliminar).
- Opciones de Compra Personalizadas:
    - Selección de métodos de envío según sus preferencias
    - Envío a domicilio.
    - Retiro en tienda.
- Historial de Compras:
    - Visualizar un historial detallado(con fecha de compra, producto, cantidad, precio, modo de envio) de las compras realizadas en la sección de perfil "My Purchases".
- Gestión del Perfil:
    - Acceder y editar el perfil personal, que puede incluir información opcional como dirección, teléfono, y enlaces a redes sociales.
- Seguridad en la Sesión:
    - Cerrar sesión de manera segura para proteger la cuenta y los datos del usuario.


### ADMINISTRADORES

Los administradores tienen acceso a una interfaz personalizada con herramientas exclusivas para gestionar el catálogo de productos de manera eficiente:
- Agregar Nuevos Productos:
    - Permite a los administradores añadir nuevos productos a la tienda, proporcionando información detallada como el nombre del producto,descripción, categoría, precio,imagenes.
    - Pueden cargar imágenes directamente desde su computadora, que se suben automáticamente a la nube.

- Editar productos existentes:
    - Modificar cualquier información relevante de los productos, incluyendo nombre, descripción, precio, imagenes y categoría.

- Eliminar Productos:
    - Permite eliminar productos del catálogo de la tienda, lo que también se refleja automáticamente en la base de datos.

Todos los cambios realizados por los administradores se aplican directamente a la base de datos, asegurando que el catálogo esté siempre actualizado y refleje la información más reciente.


# API ENDPOINTS

### BACKEND API (Servidor Node.ts con Express)

#### ENDPOINTS PARA LA GESTIÓN DE USUARIOS (UserModel)

- GET /user/
Devuelve una lista json con todos los usuarios (util para un administrador)
Ejemplo de respuesta JSON

    [
        {
            "user_id": "244284aa-55bd-4fb2-8e04-2d38fb7a2c7b",
            "username": "User",
            "email": "User@gmail.com",
            "role": "client",
            "created_at": "2024-09-07T22:47:57.000Z",
            "updated_at": "2024-09-07T22:47:57.000Z"
        },
    ...
    ]


- GET /user/id/:id
Devuelve una lista json con todos el usuario específicado por id.Es útil para un administrador.
Ejemplo de respuesta JSON
    {
        "user_id": "244284aa-55bd-4fb2-8e04-2d38fb7a2c7b",//Random uuidv4
        "username": "User",
        "password": "Password hash",
        "email": "User@gmail.com",
        "role": "client",
        "created_at": "2024-09-07T22:47:57.000Z",
        "updated_at": "2024-09-07T22:47:57.000Z"
    }

-  POST /user/register

Permite el registro de nuevos usuarios. Por defecto, todos los usuarios registrados a través del frontend tendrán el rol de 'client'.

¿Cómo crear un usuario rol 'admin'?

Insertar estos campos en una herramienta como postman haciendo un post a la ruta mencionada:
Cuerpo de la solicitud (JSON)

    {
        "username": "username",
        "password": "password",
        "email": "username@gmail.com",
        "role": "admin"
    }

-  POST user/login

Permite la autenticación de usuarios registrados y proporciona acceso a las funciones específicas del sistema. Este endpoint permite tanto a clientes como a administradores iniciar sesión.

Genera un token de acceso JWT (JSON Web Token) para sesiones seguras.

Cuerpo de la solicitud

    {
        "email": "user@example.com",
        "password": "SecurePassword123!"
    }

- Respuesta exitosa:
    - Devuelve un mensaje de éxito y el token creado.

- Manejo del Token:
    - El Token JWT se envía en la respuesta exitosa y se almacena en el session storage del navegador para futuras solicitudes a rutas protegidas.
    - Las rutas protegidas incluyen:
        - Gestión del perfil: Crear, actualizar y obtener información del perfil e historial de compras.


-  POST user/logout

Permite a los usuarios autenticados cerrar sesión de forma segura.

Respuesta exitosa (Código 200):
    {
        "message": "Logout successful"
    }

Acciones Posteriores al Cierre de Sesión:

- Eliminación del token JWT del session storage.
- Limpieza del carrito de compras en el local storage.
- Los datos del perfil se restablecen a null.


- DELETE user/:id
Permite eliminar un usuario específico por id.

Respuesta Exitosa (Código 200):

    {
        "message": "User deleted successfully"
    }

Respuesta en Caso de Error (Código 404)
    {
        "error": "User not found"
    }

- PATCH user/:id

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

La ruta de GET es accesible para cualquier usuario que visite la página. Sin embargo, las rutas de POST, PATCH y DELETE están restringidas solo a usuarios con rol de 'admin'. Estas rutas permiten realizar todas las acciones relacionadas con el CRUD de productos desde el frontend para administradores.

- GET /products

Esta ruta permite obtener toda la lista de productos presentes en la base de datos. Es accesible para todos los usuarios.
Respuesta exitosa (Código 200):

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

- GET /products/:id
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

RUTAS DE GESTION DE PRODUCTOS

-  POST /products/create

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


- PATCH /products/:id

Esta ruta permite a los administradores actualizar la información de un producto existente. Está disponible tanto en el backend como en el frontend, siempre y cuando se valide el token de autenticación  que se envia en el encabezado de la solicitud. La actualización se realiza a través de un formulario en el frontend, asegurando una experiencia de usuario sencilla y eficiente, con vista inmediata de los productos editados

Cuerpo de la solicitud

    {
        "name": "Updated Product Name",
        "description": "Updated description",
        "price": "29.99",
        "imagePath": "Updated image",
        "category_id": 3
    }

Respuesta Exitosa (Código 200):

    {
        "message": "Product updated successfully"
    }

- DELETE /products/:id

Respuesta exitosa (Códgo 204)

En caso de éxito, la respuesta no contiene un cuerpo, solo un código de estado que indica que la eliminación fue realizada correctamente.

MANEJO DE ERRORES Y MENSAJES EN EL MODELO PRODUCTO

Todos los mensajes de éxito y errores se muestran al administrador a través de los formularios correspondientes de cada endpoint. Esto incluye mensajes de éxito, errores por campos incompletos o fallas al eliminar un producto debido a que está relacionado con otras tablas.


#### ENDPOINTS PARA LA GESTIÓN DEL PERFIL DE USUARIOS AUTENTICADOS

Este modelo permite a un usuario autenticado agregar información adicional solo si desea realizar una compra que necesite entrega a domicilio. Los usuarios pueden agregar datos como la dirección de envío, un número de teléfono de contacto y, opcionalmente, una red social.

- GET /profile/byUser

Este endpoint permite obtener el perfil de un usuario autenticado según su user_id de la tabla users. La solicitud requiere verificación de token para asegurar que el usuario esté autenticado.

- POST /profile/create

Este endpoint permite a los usuarios autenticados crear un perfil con datos adicionales opcionales. Esto es útil si el usuario desea realizar una compra con envío a domicilio. La solicitud debe estar autenticada.

- PUT /profile/:profile_id

Este endpoint permite a los usuarios autenticados actualizar su perfil utilizando el profile_id. Solo un usuario autenticado puede realizar esta acción.

Estos tres endpoints son llamados a través desde frontend con el token de autenticación en el encabezado de la solicitud y se verifica en el backend a través del Middleware 'verifyToken' antes de seguir la función al controller.


#### ENDPOINTS PARA LA GESTIÓN DE CATEGORIAS

- GET /categories/

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
____

Los endpoints que se detallan a continuación funcionan correctamente en el backend, pero aún no están integrados en el frontend. En el futuro, se agregarán para que el administrador pueda crear una nueva categoría mientras gestiona la creación de un producto.

-  GET /categories/id/:id

Permite obtener una categoria segun su id

Respuesta exitosa (Código 200)

    {
        "category_id":2,
        "name": "Shoes"
    }

-  POST /categories/create

Este endpoint permite la creación de categorías especificando su nombre. El id se genera automáticamente de manera incremental en la base de datos.

Cuerpo de la solicitud

    {
        "name": "New Category"
    }

Respuesta exitosa (Código 201)

    {
        "message": "Category saved succesfully"
    }


-  PATCH /categories/:id

Este endpoint permite actualizar el nombre de una categoría específica a través de su id.

Cuerpo de la solicitud

    {
        "name": "Updated category "
    }

Respuesta Exitosa(200)

    {
        "message": "Category updated successfully"
    }


- DELETE /categories/:id

Este endpoint permite eliminar una categoría específica a través de su id.


Respuesta Exitosa(200)

    {
        "message": "Category deleted successfully"
    }

Nota: En este caso, se envía un mensaje de eliminación exitosa para facilitar la comprensión. Cuando se implemente en el frontend, no se enviará ningún contenido en la respuesta y se utilizará un código de estado 204.

#### ENDPOINTS PARA LA GESTIÓN DE ORDENES DE COMPRA


- GET /orders

Este endpoint permite a los usuarios autenticados obtener un listado de sus órdenes de compra realizadas. El acceso a esta ruta requiere que el usuario esté autenticado y que el token de autenticación sea enviado en el encabezado de autorización. El token es verificado en el backend para garantizar que el usuario tenga permiso para acceder a esta información.

Uso:

Este endpoint es accesible desde el frontend, donde se valida el token enviado en el encabezado de autenticación. Los usuarios pueden consultar sus órdenes de compra a través de la sección "PROFILE - MY PURCHASES" en su perfil.


- POST /orders/saveCart

Este endpoint permite a un usuario autenticado guardar los ítems de su carrito de compras como una nueva orden de compra en la base de datos. Este proceso se ejecuta cuando el usuario confirma una compra. Los ítems comprados se guardan en la base de datos y pueden consultarse posteriormente a través del 'profile'.

Al confirmar una compra desde el frontend, se envía una solicitud a este endpoint. El backend guarda los detalles de la compra en la base de datos, incluyendo los productos, cantidades, precios, y la información del usuario.


### FRONTEND API RUTAS

Las rutas del frontend se dividen en dos categorías: rutas públicas, que están disponibles para todos los usuarios, y rutas protegidas, que requieren autenticación.

RUTAS PÚBLICAS

Estas rutas están disponibles para todos los usuarios, ya sea que estén autenticados o no.

- GET "/" (Home)

    Descripción: Página de inicio de la aplicación.

    Uso: Página principal donde los usuarios pueden ver una vista general de la aplicación.

- GET "/about" (about)

    Descripción: Página de información sobre la marca de la tienda.

    Uso: Proporciona detalles sobre la misión, visión, y/o el equipo detrás del e-commerce.

- GET "/auth" (auth)

    Descripción: Página de autenticación para iniciar sesión o registrarse.

    Uso: Permite a los usuarios autenticarse en la aplicación o crear una nueva cuenta.

- GET "/shop" (Shop)

    Descripción: Página principal del catálogo de productos.

    Uso: Muestra una lista de productos disponibles, permitiendo a los usuarios navegar y buscar productos por categorías, precios, nombre, etc.

- GET "/access-denied"

    Descripción: Página que se muestra cuando un usuario intenta acceder a una ruta para la cual no tiene permisos.

    Uso:  Informa al usuario que no tiene acceso a la página o recurso solicitado y ofrece opciones para navegar a otras secciones.

-  GET "/*"

    Descripción: Página que se muestra cuando la ruta solicitada no se encuentra en la aplicación.

    Uso: Proporciona una página de error 404 para las rutas no reconocidas, con opciones para regresar al inicio o navegar a otras secciones.


RUTAS PROTEGIDAS

Estas rutas requieren que el usuario esté autenticado y que el token obtenido en el momento de la autenticación sea válido. Se diferencian por el contenido y las funcionalidades según el rol del usuario (cliente o administrador).

- GET "/profile"

    Descripción: Página del perfil del usuario autenticado.
    Uso: Permite a los usuarios ver y editar su información personal, como nombre, correo electrónico, y dirección. Los administradores pueden ver información adicional según su rol.

- POST "/profile-create"

    Descripción: Ruta para crear o actualizar un perfil de usuario.
    Uso: Permite a los usuarios agregar o actualizar información adicional, como dirección y número de teléfono, que puede ser útil para realizar compras con envío a domicilio.


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