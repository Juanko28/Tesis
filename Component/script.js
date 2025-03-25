document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerBtn").addEventListener("click", function () {
        // Oculta con animación
        fadeOut(document.getElementById("div11"));
        fadeOut(document.getElementById("div21"));
        
        // Muestra con animación después de un pequeño delay
        setTimeout(() => {
            fadeIn(document.getElementById("div12"));
            fadeIn(document.getElementById("div22"));
        }, 300);

        // Cambia los tamaños con animación
        let div1 = document.getElementById("div1");
        let div2 = document.getElementById("div2");

        div1.classList.replace("w-3/5", "w-2/5");
        div2.classList.replace("w-2/5", "w-3/5");

        div1.classList.replace("bg-white", "bg-[#60C2BB]");
        div2.classList.replace("bg-[#60C2BB]", "bg-white");
    });

    document.getElementById("loginBtn").addEventListener("click", function () {
        fadeOut(document.getElementById("div12"));
        fadeOut(document.getElementById("div22"));

        setTimeout(() => {
            fadeIn(document.getElementById("div11"));
            fadeIn(document.getElementById("div21"));
        }, 300);

        let div1 = document.getElementById("div1");
        let div2 = document.getElementById("div2");

        div1.classList.replace("w-2/5", "w-3/5");
        div2.classList.replace("w-3/5", "w-2/5");

        div1.classList.replace("bg-[#60C2BB]", "bg-white");
        div2.classList.replace("bg-white", "bg-[#60C2BB]");
    });
});

// Función para hacer fade-in
function fadeIn(element) {
    element.classList.remove("hidden");
    setTimeout(() => {
        element.classList.add("opacity-100", "scale-100");
        element.classList.remove("opacity-0", "scale-95");
    }, 10);
}

// Función para hacer fade-out
function fadeOut(element) {
    element.classList.add("opacity-0", "scale-95");
    element.classList.remove("opacity-100", "scale-100");
    setTimeout(() => {
        element.classList.add("hidden");
    }, 300);
}
