# Luana Gondim — Website Portfólio

Portfólio pessoal de **Luana Gondim**, Product & UX/UI Designer — ex-arquiteta que hoje desenha produtos digitais com o mesmo rigor sistémico que antes aplicava ao desenho de edifícios.

**Foco do projeto:** uma landing page totalmente personalizada e construída à mão — sem templates, sem page builders — a traduzir um design do Figma em código front-end fiel ao pixel, animado e acessível.

## ✨ Destaques

- **Storytelling guiado pelo scroll** — uma secção hero fixa (pinned) transforma-se no header e revela o conteúdo "Sobre" à medida que o utilizador percorre a página, construído com `IntersectionObserver` e lógica própria de scroll-scrub (sem bibliotecas de animação).
- **Showcase de projetos interativo** — uma secção "Trabalhos Selecionados" sincronizada com o scroll, que liga o card do projeto ativo a uma imagem de pré-visualização a ecrã inteiro, com cursor circular personalizado no desktop.
- **Bilingue (PT/EN)** — um sistema leve baseado em `data-i18n` troca todos os textos em tempo real (incluindo strings com HTML), e o link de download do currículo adapta-se ao idioma ativo.
- **Responsivo por design, não por acaso** — layouts, interações e até que animações correm são adaptados a cada breakpoint (mobile, tablet, laptop, desktop) usando `matchMedia`, e não apenas CSS fluido.
- **Pensado para acessibilidade** — skip link, atributos `aria-*` na navegação e nos toggles, e alternativas para `prefers-reduced-motion` que substituem as animações fixas ao scroll por simples fades.
- **Atenção à performance** — sem frameworks nem etapa de build, imagens dos projetos com lazy-load, imagem da hero com carregamento eager, e fontes web pré-conectadas.

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilos | CSS3 (custom properties, Grid/Flexbox, sem framework) |
| Interatividade | JavaScript puro (ES6+) — sem bibliotecas ou frameworks |
| Tipografia | Google Fonts — Inter, Newsreader, Playfair Display |
| Origem do design | Figma (implementação design-to-code, fiel ao original) |
| Ferramentas | VS Code + Live Server |

Sem pipeline de build, sem dependências — toda a experiência corre sobre HTML/CSS/JS simples, o que mantém o site leve e rápido a carregar.

## 📁 Estrutura do Projeto

```
website-portfolio-luana/
├── index.html
├── css/
│   └── style.css        # folha de estilos única, organizada por componente
├── js/
│   └── script.js        # i18n, animações de scroll, comportamento responsivo
└── assets/
    ├── images/
    └── fonts/
```

## ▶️ Como Rodar Localmente

Basta abrir o `index.html` no navegador, ou usar uma ferramenta de live-reload como a extensão "Live Server" do VS Code para recarregamento automático durante o desenvolvimento.

## 📌 Status

**v1 — Página inicial concluída.** O portfólio de página única (hero, sobre, competências, trabalhos selecionados, timeline de experiência, contacto) está totalmente implementado e responsivo em todos os breakpoints.

**A seguir:** páginas de estudo de caso dedicadas a cada projeto em destaque (Paparico, NOS, Apoia+), expandindo o site de um portfólio de página única para uma montra de projetos multi-página.

## 👩‍💻 Sobre Mim

Sou **Product & UX/UI Designer** com mais de 8 anos de pensamento sistémico desenvolvido enquanto arquiteta, hoje aplicado ao design de produtos digitais — desde a investigação com utilizadores e wireframing até protótipos de alta fidelidade e resultados mensuráveis (ex: +15% de conversão num projeto real). Este projeto é a minha forma de mostrar que a sensibilidade de design se estende também à forma como um produto é efetivamente construído: interação pensada e atenção aos detalhes.

📧 gondimluana31@gmail.com · 📍 Lisboa, Portugal
