# practice-express-ecommerce-db

Database handlers for ecommerce
LIVE: (https://ecommerce-api-8vjd.onrender.com)

## Documentacion

## Questionario

Preguntas, observaciones, analisis, comparaciones

## Problemas:

# Database

> No tengo una forma de hacer "migraciones" en Mongo DB

Implemente una solucion temporal que consiste en un script que actualiza los productos cada vez que defino el modelo para estos, en el models/product.js.

```js
(async () => {
  try {
    await Product.deleteMany({});
    const categories = await Category.find({});
    const firstCategory = categories[0];
    const productObjects = productsData.map((product) => {
      product.category_id = firstCategory._id;
      return new Product(product);
    });
    const productsPromiseArray = productObjects.map((product) =>
      product.save()
    );
    productObjects.map((product) => {
      firstCategory.products = firstCategory.products.concat(product._id);
    });
    await firstCategory.save();
    await Promise.all(productsPromiseArray);
    logger.info('Succesfully products upload');
  } catch (error) {
    logger.error('Error: products uploading failed \n', error.message);
  }
})();
```

Funciona como en el testing; se empieza eliminanado los registros anteriores, creo unos nuevos a partir de "datos locales" y lo subo
Lo beuno de esto es que practicamente puedo editar documentos de la base de datos directamente de mi objeto javascript, me permite sincronizar cambios instantaneamenete.
Lo malo:

- Este proceso se repite cada que reinicia el servidor (y como en development las reiniciadas son seguidas pues debe ser pesado para el computador)
- Tengo que sincronizar todos los modelos involucrados a la vez, lo que implica comentar y descomentar scripts en diferentes archivos muy seguido
  Solucion:
- Puedo crear un script aparte para hacer estas "migraciones"
