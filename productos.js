class Producto {
    constructor(id, nombre, precio, img, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = cantidad;
    }
}

const productos = [
    new Producto( 1, "Cartuchera", 500, "img/cartuchera.jpg", 1),
    new Producto( 2, "Lapices de colores", 1000, "img/lapices-de-colores.jpg", 1),
    new Producto( 3, "Pegamento adhesivo", 250, "img/voligoma.jpg", 1),
    new Producto( 4, "Cuaderno", 300, "img/cuaderno.jpg", 1),
    new Producto( 5, "Repuestos de hojas nº3", 400, "img/repuesto-de-hojas.jpg", 1),
    new Producto( 6, "Mochila", 5000, "img/mochila.jpg", 1),
    new Producto( 7, "Marcadores", 600, "img/marcadores.jpg", 1),
    new Producto( 8, "Birome", 100, "img/birome.jpg", 1)
];