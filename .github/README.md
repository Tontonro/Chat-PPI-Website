
# IHBT-Chat – I Hate Big Techs

[![Status](https://img.shields.io/badge/status-finalizado-brightgreen)]()
[![Disciplina](https://img.shields.io/badge/disciplina-PPI-blue)]()
[![Licença](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> *"Comunicação descentralizada, resistência digital."*

O **IHBT-Chat** é um sistema de chat temático desenvolvido para a disciplina **Programação para Internet (PPI)** no **IFRN – Campus Santa Cruz**. Com estética **cyberpunk/terminal**, o projeto simula uma plataforma de mensagens segura e estilizada, utilizando apenas tecnologias front-end.

---

## Requisitos Atendidos

| Item | Status |
|------|--------|
| **Login** com 5+ usuários cadastrados | ✅ |
| Inclui usuário `mimmarcelo` / `Teste123` | ✅ |
| **Área de chat** restrita a autenticados | ✅ |
| **2 chats fictícios** com mensagens iniciais | ✅ |
| **Envio de mensagens** no chat | ✅ |
| **Página de desenvolvedores** (`dev.html`) | ✅ |
| **Página de referências/tecnologias** (`ref.html`) | ✅ |
| **Cabeçalho** com logomarca, nome e menu | ✅ |
| **Rodapé** com IFRN, disciplina e professor | ✅ |
| **Apenas front-end** – sem servidor | ✅ |

---

## Credenciais de Acesso

Use um dos seguintes usuários para testar:

| Usuário      | Senha       |
|--------------|-------------|
| `mimmarcelo` | `Teste123`  |
| `Tontonro`    | `Antonny1`  |
| `Udibone`    | `Bento2`    |
| `Nyx`        | `Gervásio3` |
| `root`       | `root`      |

> As credenciais são fixas e armazenadas no front-end (fins didáticos).

---

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Tontonro/IHBT-Chat.git
```

2. Abra o arquivo index.html em qualquer navegador moderno (Chrome, Firefox, Edge).
3. Faça login com uma das credenciais acima.
4. Explore o chat e as demais páginas via menu superior.

Não é necessário servidor – tudo roda localmente no navegador.

---

## Tecnologias Utilizadas

· HTML5 – Estrutura semântica
· CSS3 + Tailwind CSS (CDN) – Estilização responsiva e rápida
· JavaScript (ES6+) – Lógica de autenticação, manipulação do DOM e envio de mensagens
· Google Fonts (Share Tech Mono) – Tipografia monocromática

---

## Funcionalidades do Chat

· Duas salas temáticas:
  · # sala-geral – conversa geral entre os membros
  · # café-digital – papo sobre software livre e tecnologia
· Mensagens com horários (gerados aleatoriamente para as mensagens iniciais, e hora real para as novas)
· Diferenciação visual entre mensagens próprias e dos outros
· Input autoajustável (altura dinâmica)
· Envio via tecla Enter (com Shift+Enter para quebra de linha)

---

## Contexto Acadêmico

Trabalho desenvolvido para a disciplina Programação para Internet, sob orientação do professor Marcelo Figueiredo Barbosa Júnior, no IFRN – Campus Santa Cruz. Objetivos principais:

· Consolidar conceitos de front-end puro
· Manipulação do DOM e eventos
· Controle de sessão com sessionStorage
· Design de interfaces com Tailwind CSS e estilos customizados

---


## Aviso Legal

Este projeto possui fins estritamente educacionais. A marca "IHBT" e todo o conteúdo são fictícios, utilizados exclusivamente para aprendizado no âmbito da disciplina PPI.

---

## Licença

Distribuído sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
