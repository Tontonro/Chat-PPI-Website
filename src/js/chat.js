// ─── IHBT · Chat Logic ───────────────────────────────────────────────────────

const CHATS = {
  "sala-geral": {
    name: "# sala-geral",
    description: "The boys in slack",
    messages: [
      { user: "Gervas",     text: "Bora bill",                             time: "08:14" },
      { user: "tontoro",    text: "Deixe de frescura, macho",              time: "08:16" },
      { user: "Bentoso",    text: "fala aí, rapaziada, o que há de novo?", time: "08:19" },
      { user: "tontoro",    text: "Gervásio tá me devendo 2 reais",        time: "08:22" },
      { user: "Gervas",     text: "mentira",                               time: "08:31" },
      { user: "tontoro",    text: "me pague logo, cuide",                  time: "08:33" },
      { user: "Bentoso",    text: "pague o rapaz",                         time: "08:45" },
      { user: "Gervas",     text: "🫡",                                                                      time: "08:46" },
    ],
  },
  "cafe-digital": { 
    name: "# café-digital",
    description: "papo sobre software livre, distros e afins",
    messages: [
      { user: "tontoro",    text: "trocando pro Arch essa semana. alguém tem dica?",                         time: "09:05" },
      { user: "admin",      text: "prepara o espírito antes de instalar kkkk",                               time: "09:07" },
      { user: "hackerman",  text: "wiki do Arch é literalmente a melhor documentação do mundo",              time: "09:09" },
      { user: "usuario",    text: "comecei pelo Manjaro e fui migrando. caminho mais suave",                 time: "09:12" },
      { user: "devtest",    text: "EndeavourOS se quiser Arch com menos dor",                                time: "09:15" },
      { user: "tontoro",    text: "valeu galera, vou testar no VM primeiro",                                  time: "09:17" },
      { user: "admin",      text: "decisão sábia 👍",                                                        time: "09:18" },
    ],
  },
};

let currentChat = null;

document.addEventListener("DOMContentLoaded", () => {
  requireAuth();
  updateNav();

  const session = getSession();
  document.getElementById("session-user").textContent = session.username;

  // Logout button
  document.getElementById("logout-btn").addEventListener("click", () => {
    logout();
    window.location.href = "index.html";
  });

  // Chat sidebar items
  document.querySelectorAll(".chat-item").forEach((item) => {
    item.addEventListener("click", () => {
      const chatId = item.dataset.chat;
      openChat(chatId);
    });
  });

  // Send button
  document.getElementById("send-btn").addEventListener("click", sendMessage);
  document.getElementById("msg-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});

function openChat(chatId) {
  currentChat = chatId;
  const chat = CHATS[chatId];

  // Update sidebar active state
  document.querySelectorAll(".chat-item").forEach((el) => {
    el.classList.toggle("active-chat", el.dataset.chat === chatId);
  });

  // Update header
  document.getElementById("chat-title").textContent = chat.name;
  document.getElementById("chat-desc").textContent = chat.description;

  // Render messages
  renderMessages(chatId);

  // Show input area
  document.getElementById("chat-input-area").classList.remove("hidden");
  document.getElementById("chat-placeholder").classList.add("hidden");
  document.getElementById("msg-input").focus();
}

function renderMessages(chatId) {
  const box = document.getElementById("messages-box");
  const msgs = CHATS[chatId].messages;
  const session = getSession();

  box.innerHTML = msgs
    .map((m) => {
      const isMe = m.user === session.username;
      return `
      <div class="flex flex-col ${isMe ? "items-end" : "items-start"} mb-3">
        <span class="text-[10px] text-[#007700] mb-0.5">${isMe ? "você" : m.user} · ${m.time}</span>
        <div class="max-w-xs px-3 py-1.5 border ${
          isMe
            ? "border-[#00ff00] bg-[#001800] text-[#00ff00] text-right"
            : "border-[#005500] bg-black text-[#aaffaa]"
        } text-sm leading-snug">
          ${escapeHtml(m.text)}
        </div>
      </div>`;
    })
    .join("");

  box.scrollTop = box.scrollHeight;
}

function sendMessage() {
  if (!currentChat) return;
  const input = document.getElementById("msg-input");
  const text = input.value.trim();
  if (!text) return;

  const session = getSession();
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  CHATS[currentChat].messages.push({ user: session.username, text, time });
  input.value = "";
  renderMessages(currentChat);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
