const header = document.querySelector("#header");
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");
const foto = document.querySelector(".foto");

const nav = document.querySelector("#main-nav");
const menuToggle = document.querySelector(".menu-toggle");


// =========================
// NAVBAR AL HACER SCROLL
// =========================

function actualizarHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
}

window.addEventListener("scroll", actualizarHeader);
actualizarHeader();


// =========================
// ANIMACION DE SECCIONES
// =========================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                obs.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach((element) => {
        observer.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("show");
    });

}


// =========================
// EFECTO MAQUINA DE ESCRIBIR
// =========================

const titulo = document.querySelector(".typing");

const textos = [
    "Software Developer",
    "Frontend Developer",
    "Web Developer"
];

let indiceTexto = 0;
let indiceLetra = 0;
let borrando = false;


function escribirTexto() {

    if (!titulo) return;

    const textoActual = textos[indiceTexto];


    // ESCRIBIENDO

    if (!borrando) {

        indiceLetra++;

        titulo.textContent =
            textoActual.substring(0, indiceLetra);


        if (indiceLetra >= textoActual.length) {

            borrando = true;

            setTimeout(escribirTexto, 1800);

            return;
        }

    }


    // BORRANDO

    else {

        indiceLetra--;

        titulo.textContent =
            textoActual.substring(0, indiceLetra);


        if (indiceLetra <= 0) {

            borrando = false;

            indiceTexto++;

            if (indiceTexto >= textos.length) {
                indiceTexto = 0;
            }

        }

    }


    setTimeout(
        escribirTexto,
        borrando ? 55 : 90
    );
}


escribirTexto();


// =========================
// LINKS DE NAVEGACION
// =========================

links.forEach((link) => {

    link.addEventListener("click", (event) => {

        const href = link.getAttribute("href");


        if (!href || !href.startsWith("#")) {
            return;
        }


        const destino = document.querySelector(href);


        if (!destino) {
            return;
        }


        event.preventDefault();


        destino.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        cerrarMenu();

    });

});


// =========================
// SECCION ACTIVA DEL MENU
// =========================

function actualizarLinkActivo() {

    const posicion =
        window.scrollY + 180;

    let seccionActual = "";


    sections.forEach((section) => {

        const inicio =
            section.offsetTop;

        const final =
            inicio + section.offsetHeight;


        if (
            posicion >= inicio &&
            posicion < final
        ) {

            seccionActual =
                section.id;

        }

    });


    links.forEach((link) => {

        const href =
            link.getAttribute("href");


        if (href === "#" + seccionActual) {

            link.classList.add("activo");

        } else {

            link.classList.remove("activo");

        }

    });

}


window.addEventListener(
    "scroll",
    actualizarLinkActivo
);

actualizarLinkActivo();


// =========================
// PARALLAX DE LA FOTO
// =========================

window.addEventListener(
    "mousemove",
    (event) => {

        if (
            !foto ||
            window.innerWidth <= 900
        ) {
            return;
        }


        const x =
            (event.clientX /
            window.innerWidth - 0.5) * 8;


        const y =
            (event.clientY /
            window.innerHeight - 0.5) * 8;


        foto.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);


// Volver la foto a su posición
// cuando el mouse sale de la página

document.addEventListener(
    "mouseleave",
    () => {

        if (!foto) return;

        foto.style.transform =
            "translate(0, 0)";

    }
);


// =========================
// MENU MOBILE
// =========================

function cerrarMenu() {

    if (!nav || !menuToggle) {
        return;
    }


    nav.classList.remove("open");

    menuToggle.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


if (menuToggle && nav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const abierto =
                nav.classList.toggle("open");


            menuToggle.classList.toggle(
                "open",
                abierto
            );


            menuToggle.setAttribute(
                "aria-expanded",
                String(abierto)
            );

        }
    );

}


// =========================
// CERRAR MENU AL AGRANDAR
// =========================

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 700) {
            cerrarMenu();
        }

    }
);


// =========================
// MENSAJE DE COMPROBACION
// =========================

console.log(
    "Portfolio de Lautaro Marengo cargado correctamente."
);
