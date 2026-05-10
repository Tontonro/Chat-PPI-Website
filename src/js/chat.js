
const CHATS = {
  "sala-geral": {
    name: "# sala-geral",
    description: "The boys in slack",
    messages: [
      ...withRandomTimes([
        { user: "Gervas",     text: "Bora bill" },
        { user: "tontoro",    text: "Deixe de frescura, macho" },
        { user: "Bentoso",    text: "fala aí, rapaziada, o que há de novo?" },
        { user: "tontoro",    text: "Gervásio tá me devendo 2 reais" },
        { user: "Gervas",     text: "mentira" },
        { user: "tontoro",    text: "me pague logo, cuide" },
        { user: "Bentoso",    text: "pague o rapaz" },
        { user: "Gervas",     text: "🫡" },
      ], 8, 8),
    ],
  },
  "cafe-digital": { 
    name: "# café-digital",
    description: "papo sobre software livre, distros e afins",
    messages: [
      ...withRandomTimes([
        { user: "tontoro",    text: "trocando pro Arch essa semana. alguém tem dica?" },
        { user: "admin",      text: "prepara o espírito antes de instalar kkkk" },
        { user: "hackerman",  text: "wiki do Arch é literalmente a melhor documentação do mundo" },
        { user: "usuario",    text: "comecei pelo Manjaro e fui migrando. caminho mais suave" },
        { user: "devtest",    text: "EndeavourOS se quiser Arch com menos dor" },
        { user: "tontoro",    text: "valeu galera, vou testar no VM primeiro" },
        { user: "admin",      text: "decisão sábia 👍" },
      ], 9, 9),
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
  const msgInput = document.getElementById("msg-input");
  msgInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  msgInput.addEventListener("input", () => {
    msgInput.style.height = "auto";
    msgInput.style.height = Math.min(msgInput.scrollHeight, 120) + "px";
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

function getRandomTime(startHour = 0, endHour = 23) {
  const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
  const minute = Math.floor(Math.random() * 60);

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function getRandomTimes(count, startHour = 0, endHour = 23) {
  const startMinutes = startHour * 60;
  const endMinutes = endHour * 60 + 59;
  const times = [];

  while (times.length < count) {
    times.push(Math.floor(Math.random() * (endMinutes - startMinutes + 1)) + startMinutes);
  }

  return times
    .sort((a, b) => a - b)
    .map((totalMinutes) => {
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;

      return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    });
}

function withRandomTimes(messages, startHour = 0, endHour = 23) {
  const times = getRandomTimes(messages.length, startHour, endHour);

  return messages.map((message, index) => ({
    ...message,
    time: times[index],
  }));
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
  input.style.height = "auto";
  renderMessages(currentChat);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
