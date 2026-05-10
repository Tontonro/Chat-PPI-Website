document.addEventListener("DOMContentLoaded", () => {
  updateNav();

  if (getSession()) {
    window.location.href = "chat.html";
    return;
  }

  const btn = document.getElementById("login-btn");
  const userInput = document.getElementById("username");
  const passInput = document.getElementById("password");
  const errorMsg = document.getElementById("error-msg");

  function attempt() {
    const username = userInput.value.trim();
    const password = passInput.value;
    errorMsg.textContent = "";

    if (!username || !password) {
      errorMsg.textContent = "> erro: preencha todos os campos.";
      return;
    }

    if (login(username, password)) {
      errorMsg.style.color = "#00ff00";
      errorMsg.textContent = "> autenticado. redirecionando...";
      setTimeout(() => (window.location.href = "chat.html"), 700);
    } else {
      userInput.classList.add("border-red-500");
      passInput.classList.add("border-red-500");
      errorMsg.textContent = "> erro: credenciais inválidas.";
      setTimeout(() => {
        userInput.classList.remove("border-red-500");
        passInput.classList.remove("border-red-500");
      }, 1200);
    }
  }

  btn.addEventListener("click", attempt);
  passInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") attempt();
  });
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") passInput.focus();
  });
});
