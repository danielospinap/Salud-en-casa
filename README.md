# Salud en casa - inventario de productos (servicio)

Este es el servicio encargado de manejar los productos que se venden mediante la aplicación y en el portal web.

### Acciones
- Con el método POST: [Agregar producto.](https://solicitud-medicamentos-unnamed.herokuapp.com/producto/create)
- Con el método GET: [listar productos desde el portal web.](https://solicitud-medicamentos-unnamed.herokuapp.com/producto/list?origen=web)
- Con el método GET: [listar productos desde la aplicación móvil](https://solicitud-medicamentos-unnamed.herokuapp.com/producto/list?origen=mobile)
- Con el método PUT: [Actualizar un producto teniendo su id.](https://solicitud-medicamentos-unnamed.herokuapp.com/producto/update)
- Con el método DELETE: [Eliminar un producto teniendo su id.](https://solicitud-medicamentos-unnamed.herokuapp.com/producto/delete)

> **Nota**: Para agregar, actualizar y eliminar productos es necesario incluir un parametro **"autor"** que tenga el usuario del administrador que ejecuta la acción.

> **Nota**: Para actualizar y eliminar productos es necesario incluir un parametro **"id"** que tenga el id con el cual el producto está guardado en la base de datos.
