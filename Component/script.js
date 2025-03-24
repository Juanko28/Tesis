document.getElementById("InicesBtn").addEventListener("click", function() {
    window.location.href = "/ventanas/user.html";
});

function intercambiarDivs() {
    let div1 = document.getElementById("div1");
    let div2 = document.getElementById("div2");

    div1.style.transform = "translateX(100%)";
    div2.style.transform = "translateX(-100%)";

    setTimeout(() => {
        let padre = div1.parentNode;
        padre.insertBefore(div2, div1);

        div1.style.transform = "translateX(0)";
        div2.style.transform = "translateX(0)";
    }, 500);
}