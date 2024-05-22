document.addEventListener("DOMContentLoaded", function() {
    var btnSignin = document.querySelector("#signin");
    var btnSignup = document.querySelector("#signup");

    var body = document.querySelector("body");

    btnSignin.addEventListener("click", function () {
        body.className = "sign-in-js"; 
    });

    btnSignup.addEventListener("click", function () {
        body.className = "sign-up-js";
    });

    // Capturando os dados do formulário de cadastro e enviando para a API
    document.querySelector("#signup-submit").addEventListener("click", function() {
        var name = document.querySelector("#signup-name").value;
        var email = document.querySelector("#signup-email").value;
        var password = document.querySelector("#signup-password").value;

        fetch("https://localhost:44307/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Cadastro realizado com sucesso!");
            } else {
                alert("Erro no cadastro: " + data.message);
            }
        })
        .catch(error => console.error("Erro:", error));
    });

    // Capturando os dados do formulário de login e enviando para a API
    document.querySelector("#signin-submit").addEventListener("click", function() {
        var email = document.querySelector("#signin-email").value;
        var password = document.querySelector("#signin-password").value;

        fetch("https://localhost:44307/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login realizado com sucesso!");
                // Redirecionar para a página principal, por exemplo
                window.location.href = "home.html";
            } else {
                alert("Erro no login: " + data.message);
            }
        })
        .catch(error => console.error("Erro:", error));
    });
});
