const USERS = [
  { username: "mimmarcelo", password: "Teste123" },
  { username: "Udibone", password: "Bento2" },
  { username: "Tontoro", password: "Antonny1" },
  { username: "Nyx", password: "Gervásio3" },
  { username: "root", password: "root" }
]

const SESSION_KEY = "ihbt_user";

function login(username, password) {
  const found = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (found) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: found.username }));
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function requireAuth() {
  if (!getSession()) {
    window.location.href = "index.html";
  }
}

function updateNav() {
  const chatLink = document.getElementById("chat-link");
  const logoutItem = document.getElementById("logout-link");
  if (getSession()) {
    if (chatLink) chatLink.classList.remove("hidden");
    if (logoutItem) logoutItem.classList.remove("hidden");
  } else {
    if (chatLink) chatLink.classList.add("hidden");
    if (logoutItem) logoutItem.classList.add("hidden");
  }
}
