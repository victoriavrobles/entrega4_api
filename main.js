const express = require('express');
const { Router } = express;
const app = express();
const Contenedor = require('./contenedor');

const routeProducts = Router();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const contenedor = new Contenedor('products.json')
app.use('/api/productos', routeProducts)

// GET
routeProducts.get('/', async (peticion, respuesta) =>{
    const allProducts = await contenedor.getAll();
    respuesta.status(200).json(allProducts);
})

routeProducts.get("/:id", async (peticion, respuesta) => {
    console.log(`getById req recibida con exito`);
    const id = parseInt(req.params.id);
    const producto = await contenedor.getById(id);
    !producto && res.status(404).json({ error: 'producto no encontrado' });
    respuesta.status(200).json(producto);
});

// POST
routeProducts.post('/', async (peticion, respuesta) => {
    const body = req.body;
    const newProductId = await contenedor.save(body);
    respuesta.status(200).send(`Producto agregado con el id: ${newProductId}`);
})

// PUT
routeProducts.put('/:id', async (peticion, respuesta) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    const productUpdated = await contenedor.updateById(id, body);
    productUpdated
        ? respuesta.status(200).send(`El producto: ${id} ha sido actualizado`)
        : respuesta.status(404).send({ error: 'producto no encontrado' })
})

// DELETE
routeProducts.delete('/:id', async (peticion, respuesta) => {
    const id = parseInt(req.params.id);
    const removedProduct = await contenedor.deleteById(id);
    removedProduct
        ? respuesta.status(200).json(`El producto: ${id} ha sido eliminado.`)
        : respuesta.status(404).json({ error: 'producto no encontrado' });
})


const server = app.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor: ${error}`));