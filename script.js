const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

//------CARRITO-------//

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//------PRODUCTOS-------//

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">$ ${product.precio}</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "Comprar";
    comprar.className = "Comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);


        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }

        carritoCounter();
        saveLocal();
    })
})

//-----SAVE LOCAL------//

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//------PINTAR CARRITO-------//

const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title p-4">Carrito</h1>
    `;
    modalContainer.append(modalHeader);


    const modalButton = document.createElement("h1");
    modalButton.innerHTML = `
    <h2 class="modal-header-button p-4">X</h2>
`;;
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>$ ${product.precio}</p>
            <span class="restar">➖</span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar">➕</span>
            <p>Total: ${product.cantidad * product.precio}</p>
            `
            ;
        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar")

        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto)
    });



    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar: $ ${total}`

    modalContainer.append(totalBuying);


    if (carrito.length > 0) {
        const finalizarCompraBtn = document.createElement("button");
        finalizarCompraBtn.innerText = "Finalizar compra";
        finalizarCompraBtn.className = "finalizar-btn";


        modalContainer.append(finalizarCompraBtn);


        finalizarCompraBtn.addEventListener("click", () => {
            finalizarCompraBtn.disabled = true;
            const formulario = document.createElement("form");
            formulario.className = "formulario";
            formulario.innerHTML = `
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
            <label for="telefono">Teléfono:</label>
            <input type="tel" id="telefono" name="telefono">
            <button type="submit">Enviar</button>
        `;

            function validarFormulario() {
                const nombre = document.getElementById("nombre").value;
                const email = document.getElementById("email").value;
                const telefono = document.getElementById("telefono").value;

                if (nombre === "" || email === "" || telefono === "") {
                    Swal.fire("Error", "Por favor, completa todos los campos del formulario", "error");
                    return false;
                }

                return true;
            }

            formulario.addEventListener("submit", (event) => {
                event.preventDefault();
                if (validarFormulario()) {
                    Swal.fire("¡Muchas gracias por su compra!", "¡El correo con el resumen de compra ha sido enviado exitosamente!", "success"
                    );
                    modalContainer.style.display = "none";
                    carrito = [];
                    saveLocal();
                    pintarCarrito();
                    document.getElementById("cantidadCarrito").textContent = 0;
                } else {
                    Swal.fire("Error", "Por favor, completa todos los campos del formulario", "error");
                }
            });

            modalContainer.append(formulario);
        });
    }
};

verCarrito.addEventListener("click", pintarCarrito);

//------ELIMINAR PRODUCTO-------//

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

//------CONTADOR DE ELEMENTOS-------//

const carritoCounter = () => {
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();

