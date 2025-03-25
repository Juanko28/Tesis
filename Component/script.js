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

    document.getElementById("RegistrarBtn").addEventListener("click", async function () {
        const name = document.querySelector("#div22 input[placeholder='Nombres']").value;
        const email = document.querySelector("#div22 input[placeholder='Correo']").value;
        const password = document.querySelector("#div22 input[placeholder='Contraseña']").value;
    
        const response = await fetch("http://127.0.0.1:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
    
        const data = await response.json();
        alert(data.message);
    });

    document.getElementById("IniciarBtn").addEventListener("click", async function () {
        const email = document.querySelector("#div11 input[placeholder='Correo']").value;
        const password = document.querySelector("#div11 input[placeholder='Contraseña']").value;
    
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
    
        const data = await response.json();
        alert(data.message);
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
