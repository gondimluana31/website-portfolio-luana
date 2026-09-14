/**
 * Luana Gondim — Portfólio
 * Script principal: relógio ao vivo da Hero, tradução PT/EN
 * e animações de entrada respeitando prefers-reduced-motion.
 */
(() => {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Traduções (PT é o idioma base do documento; EN é gerado a partir   */
  /* do conteúdo original definido no Figma).                          */
  /* ------------------------------------------------------------------ */
  const translations = {
    en: {
      'a11y.skip': 'Skip to content',
      'nav.trabalho': 'Work',
      'nav.sobre': 'About',
      'nav.contacto': 'Contact',
      'nav.curriculo': 'Resume ↗',
      'hero.headline': 'I design digital products<br class="hero__headline-break-m"> with the rigor of someone<br class="hero__headline-break-m"> who once designed buildings.',
      'hero.status': 'Available for work',
      'work.title': 'Product design case studies backed by 8+ years of systemic, structured thinking.',
      'work.heading.title': 'Selected<br><em>work</em>',
      'work.result': 'RESULT',
      'work.viewProject': 'View project →',
      'work.items.0.title': 'Paparico — Landing Page Redesign',
      'work.items.0.desc': "I restructured the business's digital presence to build trust and drive direct sales, from user research to a validated interactive prototype.",
      'work.items.0.tags.0': 'UX Research',
      'work.items.0.tags.1': 'Wireframing',
      'work.items.0.tags.2': 'Prototyping',
      'work.items.0.metric': '+15% conversions',
      'work.items.1.title': 'Paparico — Internal SaaS Platform',
      'work.items.1.desc': 'Discovery, user flow and wireframing for an internal management system that automated manual order and invoicing processes.',
      'work.items.1.tags.0': 'Discovery',
      'work.items.1.tags.1': 'User Flow',
      'work.items.1.tags.2': 'Design System',
      'work.items.1.metric': '4h/day saved',
      'work.items.2.title': 'NOS — Rethinking the Package Purchase Experience',
      'work.items.2.desc': "Redesign concept for the package purchase journey for one of Portugal's largest telecom operators.",
      'work.items.2.tags.0': 'UX/UI Design',
      'work.items.2.tags.1': 'Conceptual Redesign',
      'work.items.2.tags.2': 'Academic Project',
      'work.items.2.metric': 'Case study',
      'work.items.3.title': 'Apoia+ — Redesigning Access to Public Support',
      'work.items.3.desc': 'Postgraduate group project centralizing scattered information on public support programs for micro and small businesses — research, business strategy and brand identity.',
      'work.items.3.tags.0': 'UX Research',
      'work.items.3.tags.1': 'Business Strategy',
      'work.items.3.tags.2': 'Group Project',
      'work.items.3.metric': 'Case study',
      'about.eyebrow': 'ABOUT',
      'about.title': 'From blueprints<br><em>to interfaces.</em>',
      'about.p1': "For eight years, I led architecture and interior design projects, managing teams, budgets and complex timelines. That's where I developed the systemic thinking I now apply to digital design: understanding the problem, structuring before styling, and designing for people.",
      'about.p2': 'In 2024, I co-founded Paparico, where I led UX/UI projects end to end, from research to prototypes and results. Today, I look to bring that same rigor to a Product Design team, in close collaboration with engineering.',
      'about.stats.0': 'Years of systemic thinking',
      'about.stats.1': 'Years in product design',
      'about.stats.2': 'Conversion increase, real project',
      'about.cardBack.title': 'From architect to Product Designer.',
      'about.cardBack.cue': 'See the journey ↓',
      'skills.eyebrow': 'SKILLS & TOOLS',
      'skills.design.title': 'Design',
      'skills.design.list': 'Figma (Auto-layout, Variables) - Design Thinking - Design Systems - Style Guides',
      'skills.research.title': 'UX Research',
      'skills.research.list': 'User Flows - Wireframing - Nielsen Heuristics - Usability Testing',
      'skills.process.title': 'Process & Agility',
      'skills.process.list': 'Jira - Scrum/Kanban - DesignOps',
      'skills.tech.title': 'Technical',
      'skills.tech.list': 'HTML - CSS - JavaScript (basics)',
      'skills.ai.title': 'Artificial Intelligence',
      'skills.ai.list': 'Figma Make - Claude - ChatGPT - Midjourney - Notion AI',
      'experience.eyebrow': 'EXPERIENCE',
      'experience.items.0.date': 'Ongoing',
      'experience.items.0.role': 'Postgraduate Degree, Web UX/UI Design',
      'experience.items.1.role': 'UX/UI Designer',
      'experience.items.2.role': 'Co-founder & Product Designer',
      'experience.items.3.role': 'Co-founder & Architect',
      'experience.items.4.role': 'UX/UI Bootcamp',
      'footer.eyebrow': "LET'S TALK?",
      'footer.title':
        'I create work that captures <em>attention</em>, sparks <em>emotion</em> and is impossible to <span class="footer__highlight">ignore</span>.',
      'footer.copyright': 'Luana Gondim — Product & UX/UI Designer',
      'footer.linkedin': 'LinkedIn',
      'footer.behance': 'Behance',
      'footer.location': 'Lisbon, Portugal',
    },
  };

  const STORAGE_KEY = 'lg-portfolio-lang';
  const originals = new Map();
  const i18nNodes = document.querySelectorAll('[data-i18n]');

  i18nNodes.forEach((node) => {
    originals.set(node, node.innerHTML);
  });

  function applyLanguage(lang) {
    const dict = translations[lang];

    i18nNodes.forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (lang === 'pt' || !dict || !(key in dict)) {
        node.innerHTML = originals.get(node);
      } else if (node.hasAttribute('data-i18n-html')) {
        // Só o título do footer precisa disto: a tradução carrega <em>/
        // <span> próprios (ver footer.title acima) para manter as
        // palavras em itálico e o destaque de "ignorar" também em EN.
        node.innerHTML = dict[key];
      } else {
        node.textContent = dict[key];
      }
    });

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('.site-header__lang-btn').forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // Botão "Currículo" (header + Hero, ver index.html) — troca o PDF
    // para o par certo (PT/EN) conforme o idioma ativo.
    document.querySelectorAll('[data-cv-pt]').forEach((link) => {
      link.href = lang === 'en' ? link.dataset.cvEn : link.dataset.cvPt;
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* localStorage indisponível (modo privado, etc.) — ignorar silenciosamente */
    }

    // "ignorar"/"ignore" troca de innerHTML (data-i18n-html acima) —
    // o .footer__highlight de antes é destruído e recriado, por isso a
    // mancha do footer (mobile) precisa de remedir a posição dele (ver
    // positionFooterGlowOrigin, definida mais abaixo).
    positionFooterGlowOrigin();
  }

  function initLanguage() {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      /* ignorar */
    }

    const lang = saved === 'en' ? 'en' : 'pt';
    if (lang !== 'pt') applyLanguage(lang);

    document.querySelectorAll('.site-header__lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });
  }

  /* ------------------------------------------------------------------ */
  /* Relógio da Hero: mostra a hora/data local, ao vivo, como no Figma.  */
  /* ------------------------------------------------------------------ */
  function initHeroClock() {
    const el = document.getElementById('heroClock');
    if (!el) return;

    const pad = (n) => String(n).padStart(2, '0');

    function update() {
      const now = new Date();
      const hh = pad(now.getHours());
      const mm = pad(now.getMinutes());
      const ss = pad(now.getSeconds());
      const dd = pad(now.getDate());
      const mo = pad(now.getMonth() + 1);
      const yyyy = now.getFullYear();
      el.textContent = `${hh}:${mm}:${ss} - ${dd}/${mo}/${yyyy}`;
    }

    update();
    setInterval(update, 1000);
  }

  /* ------------------------------------------------------------------ */
  /* Alinha o headline secundário da Hero com a palavra "Sobre" da nav,  */
  /* recalculando sempre que o layout muda de tamanho.                  */
  /* ------------------------------------------------------------------ */
  function initHeadlineAlign() {
    const sobre = document.getElementById('navSobre');
    const headline = document.querySelector('.hero__headline');
    const intro = document.querySelector('.hero__intro');
    if (!sobre || !headline || !intro) return;

    function align() {
      // Abaixo do breakpoint mobile o headline empilha a 100% de largura
      // (regra no CSS) — não faz sentido alinhar com a "Sobre" aí.
      if (window.innerWidth <= 768) {
        headline.style.marginLeft = '';
        return;
      }
      // Referência é o próprio .hero__intro (onde o margin-left é aplicado),
      // já dentro do padding do container — não o .hero__inner por fora dele.
      const introLeft = intro.getBoundingClientRect().left;
      const sobreLeft = sobre.getBoundingClientRect().left;
      headline.style.marginLeft = `${sobreLeft - introLeft}px`;
    }

    align();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(align, 100);
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(align);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Hero + Sobre, um único percurso preso: enquanto a Hero fica "presa" */
  /* no topo, o scroll conduz (não apenas dispara) tudo em sequência —   */
  /* primeiro o título e a nav encolhem/sobem e dão lugar ao header      */
  /* fixo (que ganha fundo, logo "I'm LUA." e nav), a headline           */
  /* secundária e a hora desaparecem, e a foto cresce até preencher a    */
  /* Hero inteira (fullscreen); só depois disso, com a MESMA foto já     */
  /* fixa por trás (nenhuma segunda imagem), o texto da secção Sobre     */
  /* revela-se por cima dela em sequência, sem soltar o pin.             */
  /* ------------------------------------------------------------------ */
  function initHeroScrollMorph() {
    const wrap = document.getElementById('heroPinWrap');
    const hero = document.getElementById('top');
    const header = document.getElementById('siteHeader');
    if (!wrap || !hero || !header) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 1366px — FASE 1 (iPad Air/Pro, 769-1365px, ver style.css) usa o
    // modelo mobile (initMobileHeroMorph) nessa faixa; este pin "de
    // verdade" liga a partir daí, incluindo o iPad Pro em paisagem
    // (1366px — tirado do modelo mobile 2026-09-13, ver nota em
    // style.css: ficava "num limbo", sem as animações do header/foto).
    const canPin = window.matchMedia('(min-width: 1366px)').matches;

    if (prefersReduced || !canPin) {
      initSimpleHeaderReveal(hero, header);
      initSimpleAboutReveal();
      return;
    }

    const heroInner = document.querySelector('.hero__inner');
    const heroName = document.querySelector('.hero__name');
    const heroNameDrops = document.querySelectorAll('.hero__name-drop');
    const heroTagline = document.querySelector('.hero__tagline');
    const heroNavLinks = document.querySelectorAll('.hero__navlinks a');
    const heroResume = document.querySelector('.hero__resume');
    const heroHeadline = document.querySelector('.hero__headline');
    const heroMetas = document.querySelectorAll('.hero__meta');
    const heroBottom = document.querySelector('.hero__bottom');
    const imageBox = document.querySelector('.hero__image');
    const imageEl = imageBox ? imageBox.querySelector('img') : null;
    const headerLogo = document.querySelector('.site-header__logo');
    const headerNavLinks = document.querySelectorAll('.site-header__navlinks a');
    const headerLang = document.querySelector('.site-header__lang');
    const headerResume = document.querySelector('.site-header__resume');

    // Texto da secção Sobre, sobreposto à mesma foto (ver .hero__about
    // no HTML/CSS) — revelado em sequência depois de ela fixar.
    const aboutTitle = document.querySelector('.about__title');
    const aboutTextBottom = document.querySelector('.about__text--bottom');
    const aboutTextTop = document.querySelector('.about__text--top');
    const aboutStats = document.querySelector('.about__stats');
    const aboutStages = [
      { el: aboutTitle, start: 0 },
      { el: aboutTextBottom, start: 0.25 },
      { el: aboutTextTop, start: 0.5 },
      { el: aboutStats, start: 0.75 },
    ].filter((stage) => stage.el);

    wrap.classList.add('is-pinned');

    let imgRect0 = null; // posição/tamanho "de repouso" da foto, relativa à Hero
    let dropWidths = []; // largura "de repouso" de cada trecho a desaparecer ("HI, " / "NA")
    // Percurso preso dividido em dois troços, em pixels (recalculados no
    // resize): 100vh para a foto crescer (+ transição do header) e mais
    // 120vh depois disso para o texto da secção Sobre revelar por cima
    // dela, já fixa — ver .hero-pin-wrap.is-pinned (320vh = 100 + 100 + 120).
    let growRangePx = window.innerHeight;
    let revealRangePx = window.innerHeight * 1.2;

    function measureImageRect() {
      imageBox.classList.remove('is-growing');
      imageBox.style.position = '';
      imageBox.style.top = '';
      imageBox.style.left = '';
      imageBox.style.width = '';
      imageBox.style.height = '';

      const heroRect = heroInner.getBoundingClientRect();
      const boxRect = imageBox.getBoundingClientRect();
      imgRect0 = {
        top: boxRect.top - heroRect.top,
        left: boxRect.left - heroRect.left,
        width: boxRect.width,
        height: boxRect.height,
      };
      // Reserva o mesmo espaço na linha flex para a remoção da foto do
      // fluxo (position:absolute) não colapsar a altura da linha.
      if (heroBottom) heroBottom.style.minHeight = `${boxRect.height}px`;
    }

    function measureNameDrops() {
      heroNameDrops.forEach((span) => {
        span.style.width = '';
      });
      dropWidths = Array.from(heroNameDrops).map((span) => span.getBoundingClientRect().width);
    }

    // "HI, I'm LUANA" cresce até a ponta encostar no mesmo limite direito
    // do botão Currículo / "Disponível para trabalho" (o mesmo grid da
    // secção da foto — ver --gutter) — medido de verdade em vez de um
    // vw "no olho", porque a largura real do texto depende da fonte e
    // muda com letter-spacing, não escala 1:1 com a largura do ecrã.
    function fitHeroName() {
      if (!heroName || !heroResume) return;
      heroName.style.fontSize = ''; // volta ao tamanho fluido do CSS antes de medir
      const nameRect = heroName.getBoundingClientRect();
      const availableWidth = heroResume.getBoundingClientRect().right - nameRect.left;
      const baseFontSize = parseFloat(getComputedStyle(heroName).fontSize);
      if (!(nameRect.width > 0) || !(availableWidth > 0) || !baseFontSize) return;
      heroName.style.fontSize = `${baseFontSize * (availableWidth / nameRect.width)}px`;
    }

    // Transformação exata (posição + escala) para cada elemento da Hero
    // terminar pixel-a-pixel sobre o seu par real no header — que já
    // existe no DOM (só invisível), por isso a posição já dá pra medir.
    // O mesmo mecanismo serve para o título→logo e para cada link/botão.
    const morphPairs = [];

    function addMorphPair(from, to) {
      if (from && to) morphPairs.push({ from, to, transform: null });
    }

    addMorphPair(heroName, headerLogo);
    heroNavLinks.forEach((a, i) => addMorphPair(a, headerNavLinks[i]));
    addMorphPair(heroResume, headerResume);

    function measureMorphPairs() {
      morphPairs.forEach((pair) => {
        const prevTransform = pair.from.style.transform;
        pair.from.style.transform = 'none';
        const fromRect = pair.from.getBoundingClientRect();
        const fromFontSize = parseFloat(getComputedStyle(pair.from).fontSize) || 1;
        const toFontSize = parseFloat(getComputedStyle(pair.to).fontSize) || fromFontSize;
        const toRect = pair.to.getBoundingClientRect();
        pair.transform = {
          tx: toRect.left - fromRect.left,
          ty: toRect.top - fromRect.top,
          scale: toFontSize / fromFontSize,
        };
        pair.from.style.transform = prevTransform;
      });
    }

    measureImageRect();
    fitHeroName();
    measureNameDrops();
    measureMorphPairs();

    const clamp01 = (n) => Math.min(1, Math.max(0, n));
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
    const ease = (p, start, end) => (end === start ? (p >= end ? 1 : 0) : clamp01((p - start) / (end - start)));
    const lerp = (a, b, t) => a + (b - a) * t;

    // Onde a cabeça começa na foto original (1440×2161px — medido por
    // varrimento de pixels no ficheiro atual; a foto de referência
    // trocou em 2026-09-14 e o valor antigo, 590, era calibrado para a
    // foto anterior, 1066×1600px) — usado para calcular o enquadramento
    // vertical final a partir das dimensões reais da imagem e da caixa,
    // em vez de uma percentagem fixa "no olho" que só ficaria certa
    // numa altura de ecrã específica.
    const IMG_HEAD_TOP_PX = 806;
    // Folga acima da cabeça, na caixa final (px) — recalibrada junto com
    // IMG_HEAD_TOP_PX (era 100) para bater com os ~41%/~45% pedidos a
    // 1520px/1950px de largura (pedido 2026-09-14, depois da troca da foto).
    const IMG_HEAD_ROOM_PX = 150;

    function targetObjectPositionY(boxWidth, boxHeight) {
      if (!imageEl || !imageEl.naturalWidth || !imageEl.naturalHeight) return 58;
      // object-fit:cover escala pela maior das duas razões, para a foto
      // cobrir a caixa inteira nas duas direções.
      const scale = Math.max(boxWidth / imageEl.naturalWidth, boxHeight / imageEl.naturalHeight);
      const excess = imageEl.naturalHeight * scale - boxHeight; // sobra vertical, recortada pelo object-position
      if (excess <= 0) return 50; // a foto cabe certinha na vertical — nada para recortar
      const offset = clamp(IMG_HEAD_TOP_PX * scale - IMG_HEAD_ROOM_PX, 0, excess);
      return (offset / excess) * 100;
    }

    let ticking = false;
    let lastProgress = -1;

    function applyProgress(p) {
      const outP = ease(p, 0, 0.45); // conteúdo da Hero a encolher/desaparecer
      const inP = ease(p, 0.35, 0.75); // header a ganhar corpo

      const outOpacity = 1 - outP;
      const riseY = outP * -40;
      // Logo, links e Currículo REAIS do header (nítidos) cobrem as
      // versões que "pousaram" via transform assim que o movimento
      // termina (outP chega a 1 em p=0.45) — a versão em movimento usa
      // "transform: scale()", que o navegador só reamostra em vez de
      // redesenhar a fonte, ficando visivelmente embaçada/desbotada se
      // ficar visível por muito tempo. Por isso a troca acontece logo
      // a seguir ao encolhimento, não mais tarde — e numa janela curta
      // (4% do percurso, não 10%): as duas versões ficam sobrepostas
      // enquanto o crossfade decorre, e a reamostragem da que está em
      // transform faz o texto ler-se com um "fantasma"/duplo bem
      // visível se ficar tempo a mais nesse meio-termo — sobretudo ao
      // voltar para o topo a rolar, quando o scroll tende a abrandar
      // exatamente aqui perto do fim do percurso da Hero.
      const handoffIn = ease(p, 0.46, 0.5);

      // Título, links da nav e botão Currículo deslocam-se de verdade
      // (mesmo elemento, via transform) até pousar pixel-a-pixel sobre
      // o respetivo par no header. Depois do handoff (handoffIn=1) eles
      // ficam com opacity:0 — sem isto, quando a Hero solta o pin e
      // volta a rolar normalmente, o transform (calculado para uma
      // posição fixa) fica "desactualizado" em relação à nova posição
      // do elemento no fluxo, e sobra uma cópia fantasma a arrastar
      // atrás do header (fixo) enquanto se rola mais.
      morphPairs.forEach((pair) => {
        if (!pair.transform) return;
        const tx = lerp(0, pair.transform.tx, outP);
        const ty = lerp(0, pair.transform.ty, outP);
        const s = lerp(1, pair.transform.scale, outP);
        pair.from.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
        pair.from.style.transformOrigin = 'top left';
        pair.from.style.opacity = String(1 - handoffIn);
      });
      // "HI, " e "NA" encolhem (largura + opacidade) até sumirem por
      // completo, sobrando só "I'm LUA." — o "." já era um caractere
      // real do título, por isso não precisa de fade próprio. O corte
      // (overflow:hidden) só liga quando dropP>0, para não cortar a
      // ponta da vírgula de "HI," no estado parado. Somem quase de
      // imediato (dropP chega a 1 logo nos primeiros 20% de outP, não
      // só no fim do encolhimento) — a meia-largura cortada de
      // "HI,"/"NA", já a encolher junto com o bloco inteiro, lê-se
      // como letras partidas ("H", "N" soltos) se ficar visível por
      // muito scroll; zero é sempre mais limpo que "meio H".
      const dropP = ease(outP, 0, 0.2);
      heroNameDrops.forEach((span, i) => {
        span.classList.toggle('is-collapsing', dropP > 0);
        if (dropP > 0) {
          const w = dropWidths[i] || 0;
          span.style.width = `${w * (1 - dropP)}px`;
        } else {
          span.style.width = '';
        }
        span.style.opacity = String(1 - dropP);
      });
      if (heroTagline) {
        heroTagline.style.opacity = String(outOpacity);
        heroTagline.style.transform = `translateY(${riseY}px)`;
      }
      if (heroHeadline) {
        heroHeadline.style.opacity = String(outOpacity);
      }
      heroMetas.forEach((m) => {
        m.style.opacity = String(outOpacity);
      });

      // Fundo/contorno do header ganham alfa gradualmente, sempre
      // encostados ao topo (sem deslizar) — mesmo vinho da Hero, não
      // branco, então "I'm LUA" fica branco o tempo todo (sem migrar
      // de cor) e nunca perde contraste.
      header.style.backgroundColor = `rgba(109, 33, 22, ${inP})`;
      header.style.borderBottomColor = `rgba(255, 255, 255, ${inP * 0.15})`;
      header.classList.toggle('is-interactive', inP > 0.5);
      // O PT/EN não tem par na Hero (nasce só no header), por isso
      // acompanha o mesmo ritmo do fundo a ganhar corpo.
      if (headerLang) headerLang.style.opacity = String(inP);
      if (headerLogo) headerLogo.style.opacity = String(handoffIn);
      headerNavLinks.forEach((a) => {
        a.style.opacity = String(handoffIn);
      });
      if (headerResume) headerResume.style.opacity = String(handoffIn);
    }

    let lastGrowP = -1;

    // Cresce a foto até preencher a Hero inteira; ao contrário do resto
    // do morph (applyProgress), continua a correr depois de growP
    // chegar a 1 e ficar ali travado — mas nesse ponto já não há nada
    // para recalcular (a Hero permanece presa o percurso inteiro, então
    // a foto, já com o tamanho final, simplesmente fica onde está
    // enquanto o texto da secção Sobre revela por cima — daí o early
    // return quando growP não muda).
    function updateImagePin(growP) {
      if (!imgRect0 || growP === lastGrowP) return;
      lastGrowP = growP;

      if (growP <= 0) {
        if (imageBox.classList.contains('is-growing')) {
          imageBox.classList.remove('is-growing');
          imageBox.style.position = '';
          imageBox.style.top = '';
          imageBox.style.left = '';
          imageBox.style.width = '';
          imageBox.style.height = '';
          if (imageEl) imageEl.style.objectPosition = '';
        }
        return;
      }

      if (!imageBox.classList.contains('is-growing')) {
        imageBox.classList.add('is-growing');
        imageBox.style.position = 'absolute';
      }

      // O alvo é a própria .hero (largura total, de ponta a ponta),
      // não .hero__inner — que tem a largura travada pelo container —
      // para a foto ficar mesmo fullscreen, convertido para o
      // referencial de .hero__inner, o containing block real do
      // position:absolute. O topo recua a altura do header (fixo, por
      // cima de tudo) para a foto, já cheia, começar por baixo dele —
      // não ficar escondida atrás.
      const heroInnerRect = heroInner.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const headerHeight = header.offsetHeight;
      const targetTop = heroRect.top - heroInnerRect.top + headerHeight;
      const targetLeft = heroRect.left - heroInnerRect.left;
      const targetHeight = heroRect.height - headerHeight;

      imageBox.style.top = `${lerp(imgRect0.top, targetTop, growP)}px`;
      imageBox.style.left = `${lerp(imgRect0.left, targetLeft, growP)}px`;
      imageBox.style.width = `${lerp(imgRect0.width, heroRect.width, growP)}px`;
      imageBox.style.height = `${lerp(imgRect0.height, targetHeight, growP)}px`;
      // O enquadramento acompanha o crescimento: começa no topo (só o
      // padrão arquitetónico) e termina no enquadramento final — que
      // deixa a cabeça com ~100px de folga acima, calculado a partir do
      // tamanho real da caixa (ver targetObjectPositionY) — mantido
      // enquanto o texto da secção Sobre revela por cima, já fixa.
      if (imageEl) imageEl.style.objectPosition = `center ${lerp(0, targetObjectPositionY(heroRect.width, targetHeight), growP)}%`;
    }

    // Revela o texto da secção Sobre em sequência — só depois de a foto
    // terminar de crescer (scrolled >= growRangePx) — um bloco de cada
    // vez, e esconde de novo na mesma sequência ao rolar para trás (ver
    // .about__title/.about__text/.about__stats).
    function updateAboutReveal(scrolled) {
      if (scrolled < growRangePx) {
        aboutStages.forEach((stage) => stage.el.classList.remove('is-revealed'));
        return;
      }
      const aboutP = clamp01((scrolled - growRangePx) / revealRangePx);
      aboutStages.forEach((stage) => {
        stage.el.classList.toggle('is-revealed', aboutP >= stage.start);
      });
    }

    function updateProgress() {
      ticking = false;
      if (wrap.offsetHeight <= window.innerHeight) return;

      const scrolled = -wrap.getBoundingClientRect().top;
      const heroP = clamp01(scrolled / growRangePx);

      // Correm sempre, mesmo quando heroP não muda (fica travado em 1
      // assim que a foto termina de crescer) — é o scroll além desse
      // ponto que decide o que revelar a seguir.
      updateImagePin(heroP);
      updateAboutReveal(scrolled);

      if (Math.abs(heroP - lastProgress) < 0.001) return;
      lastProgress = heroP;

      header.classList.add('is-scrubbing');
      applyProgress(heroP);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      growRangePx = window.innerHeight;
      revealRangePx = window.innerHeight * 1.2;
      measureImageRect();
      fitHeroName();
      measureNameDrops();
      measureMorphPairs();
      lastProgress = -1;
      lastGrowP = -1;
      updateProgress();
    });

    // Os links "Sobre" apontam para dentro da própria Hero (a mesma
    // secção que .about__overlay sobrepõe, ver #sobre no HTML) — a
    // navegação nativa por âncora pousaria só no topo dela; aqui
    // calcula-se o ponto exato do percurso preso em que o texto já
    // revelou por completo (aboutP=1, ver updateAboutReveal/aboutStages
    // acima — o último estágio, .about__stats, só liga a partir de
    // 0.75) e rola-se até lá, em vez de parar a meio da revelação.
    document.querySelectorAll('a[href="#sobre"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: wrapTop + growRangePx + revealRangePx, behavior: 'smooth' });
      });
    });

    updateProgress();

    // As fontes (Playfair Display, Inter) podem ainda não ter carregado
    // no momento das medições acima — sem isto, os alvos do morph
    // ficariam "presos" às métricas da fonte de substituição do
    // navegador, e o deslocamento de cada elemento sairia errado.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measureImageRect();
        fitHeroName();
        measureNameDrops();
        measureMorphPairs();
        lastProgress = -1;
        lastGrowP = -1;
        updateProgress();
      });
    }
  }

  /* Alternativa simples (mobile / prefers-reduced-motion): sem prender
     o scroll nem crescer a foto — o header só surge com um fade quando
     a Hero sai do ecrã, como um header fixo comum. */
  function initSimpleHeaderReveal(hero, header) {
    if (!('IntersectionObserver' in window)) {
      header.classList.add('is-visible', 'is-interactive');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const show = !entry.isIntersecting;
        header.classList.toggle('is-visible', show);
        header.classList.toggle('is-interactive', show);
      },
      { rootMargin: '-88px 0px 0px 0px', threshold: 0 }
    );
    observer.observe(hero);
  }

  /* Alternativa simples (mobile / prefers-reduced-motion) para o texto
     da secção Sobre: sem pin nem foto a crescer (ver
     initSimpleHeaderReveal), cada bloco revela-se por si ao entrar na
     tela, em vez de seguir o progresso do scroll dentro da foto. */
  function initSimpleAboutReveal() {
    const stageEls = [
      document.querySelector('.about__title'),
      document.querySelector('.about__text--bottom'),
      document.querySelector('.about__text--top'),
      document.querySelector('.about__stats'),
    ].filter(Boolean);

    if (!stageEls.length) return;

    if (!('IntersectionObserver' in window)) {
      stageEls.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );
    stageEls.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /* Animação de "descoberta": o conteúdo vai sendo revelado à medida    */
  /* que o scroll o traz para a tela.                                   */
  /* ------------------------------------------------------------------ */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      [
        '.work-heading',
        '.work-item',
        '.skills .eyebrow',
        '.skill',
        '.experience .eyebrow',
        '.timeline__entry',
        '.footer__cta',
      ].join(', ')
    );

    if (!('IntersectionObserver' in window) || targets.length === 0) {
      return;
    }

    targets.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /* Selected Work — alinha o "top" do texto de apoio (posicionado de   */
  /* forma absoluta, ver .work-heading__desc em style.css) com o traço  */
  /* superior do primeiro work-item. Essa posição depende da altura do  */
  /* ecrã (a lista é empurrada para baixo por .work-layout__left, ver   */
  /* justify-content: space-between), por isso é medida em JS, não fixa */
  /* em CSS — recalculada sempre que a janela muda de tamanho.          */
  /* ------------------------------------------------------------------ */
  function initWorkDescPosition() {
    const layout = document.querySelector('.work-layout');
    const desc = document.querySelector('.work-heading__desc');
    const firstItem = document.querySelector('.work-item');

    if (!layout || !desc || !firstItem) return;

    function position() {
      if (window.matchMedia('(max-width: 1519px)').matches) {
        desc.style.top = '';
        return;
      }
      const layoutTop = layout.getBoundingClientRect().top;
      const itemTop = firstItem.getBoundingClientRect().top;
      desc.style.top = `${itemTop - layoutTop}px`;
    }

    position();
    window.addEventListener('resize', position);
  }

  /* ------------------------------------------------------------------ */
  /* Selected Work — sem interação de cursor: o único gatilho é a       */
  /* posição do scroll dentro do pin (a partir de 1520px, mesmo limiar  */
  /* que desliga o pin em style.css — ver ".work-pin-spacer" no bloco   */
  /* "Responsivo — Tablet"), que tinge a linha ativa e revela a imagem  */
  /* do respetivo projeto, "abrindo-a" a                                */
  /* partir do canto inferior esquerdo (clip-path, ver style.css) —     */
  /* mesmo mecanismo da referência enviada (neutomni.com), com o visual */
  /* do estado ativo conforme o Figma (node 243:11647).                 */
  /* ------------------------------------------------------------------ */
  function initWorkScrub() {
    const wrap = document.querySelector('.work-pin-wrap');
    const layout = document.querySelector('.work-layout');
    const items = document.querySelectorAll('.work-item');
    const previewLinks = document.querySelectorAll('.work-preview__link');
    const rightCol = document.querySelector('.work-layout__right');
    const desc = document.querySelector('.work-heading__desc');
    const title = document.querySelector('.work-heading__title');

    if (!wrap || !layout || !items.length || !previewLinks.length || !rightCol) return;

    // Enquanto nenhum work-item está ativo, o texto de apoio
    // ("Estudos de caso...") fica à altura do primeiro item (ver
    // initWorkDescPosition). Assim que o PRIMEIRO fica ativo, desliza
    // para junto do título, centrado com ele — via transform, não
    // top/right, para animar suave a partir da posição de repouso. Só
    // remede/reanima na fronteira liga/desliga (isShifted), não a cada
    // troca de item (0→1→2→3) — senão a animação repetia a cada
    // seleção em vez de só na primeira. Volta ao repouso assim que
    // nenhum item está ativo.
    let isShifted = false;
    function updateDescShift(index) {
      if (!desc || !title) return;
      const shifted = index !== -1;
      if (shifted === isShifted) return;
      isShifted = shifted;
      desc.classList.toggle('is-shifted', shifted);
      if (!shifted) {
        desc.style.transform = '';
        return;
      }
      // Desliga a transition antes de medir a posição de repouso — com
      // ela ligada, "transform: none" só começava a animar (o browser
      // não salta logo para lá), e o getBoundingClientRect apanhava a
      // transform a meio da animação anterior, não o valor de repouso
      // real. Volta a ligar a transition só depois de medir, para o
      // salto até ao alvo é que anima.
      const prevTransition = desc.style.transition;
      desc.style.transition = 'none';
      desc.style.transform = 'none';
      const titleRect = title.getBoundingClientRect();
      const descRect = desc.getBoundingClientRect();
      const dx = titleRect.right + 24 - descRect.left;
      // Centrado com o título, não alinhado pelo topo — o título tem
      // 2 linhas grandes, o texto de apoio é bem mais baixo, e
      // alinhar só os topos deixava-o "preso" lá em cima.
      const dy = titleRect.top + titleRect.height / 2 - (descRect.top + descRect.height / 2);
      desc.offsetHeight; // força reflow antes de voltar a ligar a transition
      desc.style.transition = prevTransition;
      desc.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    function setActive(index) {
      items.forEach((item, i) => item.classList.toggle('is-active', i === index));
      previewLinks.forEach((link) => {
        link.classList.toggle('is-active', link.dataset.index === String(index));
      });
      rightCol.classList.toggle('has-preview', index !== -1);
      updateDescShift(index);
    }

    // O scroll-scrub só faz sentido com as duas colunas lado a lado e
    // o pin ativo (ver breakpoint em .work-layout, css/style.css) —
    // 1520px (movido de 1620px em 2026-09-14, pedido), não 1440px:
    // antes os dois números não batiam (o CSS já tinha desligado o pin
    // em max-width:1519px, deixando este scrub "armado" sem efeito
    // visual entre 1440 e 1519px).
    const scrubQuery = window.matchMedia('(min-width: 1520px)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let canScrub = scrubQuery.matches && !reducedQuery.matches;

    const IDLE_FRACTION = 0.08; // início do pin sem nenhum item ativo, só o texto
    const HEADER_OFFSET = 88; // altura do site-header, mesmo top: do .work-layout sticky
    let ticking = false;

    function scrollProgress() {
      const range = wrap.offsetHeight - layout.offsetHeight;
      if (range <= 0) return 0;
      const scrolled = HEADER_OFFSET - wrap.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, scrolled / range));
    }

    function indexFromProgress(progress) {
      if (progress <= IDLE_FRACTION) return -1;
      const p = (progress - IDLE_FRACTION) / (1 - IDLE_FRACTION);
      return Math.min(items.length - 1, Math.floor(p * items.length));
    }

    function syncToScroll() {
      setActive(canScrub ? indexFromProgress(scrollProgress()) : -1);
    }

    function onScroll() {
      if (!canScrub || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setActive(indexFromProgress(scrollProgress()));
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      canScrub = scrubQuery.matches && !reducedQuery.matches;
      // Força o updateDescShift a remedir no próximo setActive — a
      // posição de repouso do título/desc muda com o ecrã, não dá
      // para assumir que o transform já calculado continua certo.
      isShifted = false;
      if (desc) desc.style.transform = '';
      syncToScroll();
    });

    syncToScroll();
  }

  /* ------------------------------------------------------------------ */
  /* Selected Work — cursor circular (cor do header) que segue o rato    */
  /* enquanto ele está sobre a linha ativa ou a imagem ativa — a seta    */
  /* do sistema continua visível, o círculo só reforça que a área toda  */
  /* (ver .work-item__link e .work-preview__link) é clicável. Só em     */
  /* dispositivos com rato real (hover: hover, pointer: fine).           */
  /* ------------------------------------------------------------------ */
  function initWorkCursor() {
    const cursor = document.querySelector('.work-cursor');
    const rowLinks = document.querySelectorAll('.work-item__link');
    const previewLinks = document.querySelectorAll('.work-preview__link');

    if (!cursor || (!rowLinks.length && !previewLinks.length)) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let curX = -100;
    let curY = -100;
    let scale = 0.7;

    function tick() {
      curX += (targetX - curX) * 0.22;
      curY += (targetY - curY) * 0.22;
      cursor.style.transform = `translate(${curX}px, ${curY}px) scale(${scale})`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    function track(e) {
      targetX = e.clientX - 17;
      targetY = e.clientY - 17;
    }

    function bind(el, isActive) {
      el.addEventListener('mousemove', track);
      el.addEventListener('mouseenter', (e) => {
        if (!isActive(el)) return;
        scale = 1;
        cursor.classList.add('is-visible');
        track(e);
      });
      el.addEventListener('mouseleave', () => {
        scale = 0.7;
        cursor.classList.remove('is-visible');
      });
    }

    rowLinks.forEach((link) => {
      bind(link, (el) => el.closest('.work-item').classList.contains('is-active'));
    });
    previewLinks.forEach((link) => {
      bind(link, (el) => el.classList.contains('is-active'));
    });
  }

  /* ------------------------------------------------------------------ */
  /* Selected Work (mobile + tablet/laptop, ≤1519px) — sem gatilho de    */
  /* scroll aqui: a única interação é o clique — cada work-item ganha    */
  /* a sua própria janela de foto por baixo do conteúdo (.work-item__    */
  /* photo, ver style.css), que abre ao clicar no card. Acordeão —       */
  /* nunca mais do que uma foto aberta ao mesmo tempo: ao clicar noutro  */
  /* card, a foto aberta anterior fecha e a nova abre; clicar no mesmo   */
  /* card fecha-a. Os links continuam a apontar para "#" (placeholder),  */
  /* por isso preventDefault em todos — sem isso o clique saltava a      */
  /* página para o topo. Fora dessa faixa (desktop, >1519px, onde a      */
  /* pré-visualização já vem pelo scroll-scrub) fica display:none (CSS)  */
  /* e esta função nem chega a correr lá.                                */
  /* ------------------------------------------------------------------ */
  function initWorkPhotoToggle() {
    if (!window.matchMedia('(max-width: 1519px)').matches) return;

    const items = Array.from(document.querySelectorAll('.work-item'));
    if (items.length === 0) return;

    const links = items.map((item) => item.querySelector('.work-item__link'));
    const photos = items.map((item) => item.querySelector('.work-item__photo'));

    if (photos.every((photo) => !photo)) return;

    links.forEach((link, index) => {
      if (!link) return;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const photo = photos[index];
        if (!photo) return;
        const wasOpen = photo.classList.contains('is-open');
        photos.forEach((p) => p && p.classList.remove('is-open'));
        if (!wasOpen) photo.classList.add('is-open');
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Footer (mobile) — a mancha (.footer__glow) nasce à altura da        */
  /* palavra "ignorar" (.footer__highlight), não num ponto fixo          */
  /* (bottom:-10%, pensado para o desktop, onde o título quebra de forma */
  /* mais previsível), mas centralizada na página no eixo horizontal     */
  /* (left:50%, ver style.css — não o X da própria palavra, que por o    */
  /* título ser alinhado à esquerda ficava puxado para a margem). No     */
  /* mobile a altura da palavra depende do que sobra depois de o título  */
  /* quebrar em várias linhas — muda com a largura do ecrã e com o       */
  /* idioma (PT/EN, ver applyLanguage, que troca o innerHTML inteiro do  */
  /* título e recria o .footer__highlight) — por isso só o TOP é medido  */
  /* em JS, não fixo em CSS (mesma ideia de initWorkDescPosition).       */
  /* Procura o elemento de novo a cada chamada, nunca guarda uma         */
  /* referência antiga (o applyLanguage destrói e cria um novo a cada    */
  /* troca de idioma). */
  /* ------------------------------------------------------------------ */
  function positionFooterGlowOrigin() {
    // 1365px — FASE 1 (iPad Air/Pro, 769-1365px) usa o mesmo
    // footer__glow com origem na palavra "ignorar" que o mobile, ver
    // style.css. iPad Pro em paisagem (1366px) já é desktop.
    if (!window.matchMedia('(max-width: 1365px)').matches) return;

    const footer = document.querySelector('.footer');
    const highlight = document.querySelector('.footer__highlight');
    if (!footer || !highlight) return;

    const footerRect = footer.getBoundingClientRect();
    const wordRect = highlight.getBoundingClientRect();
    const top = wordRect.top - footerRect.top + wordRect.height / 2;

    footer.style.setProperty('--fp-origin-top', `${top}px`);
  }

  /* ------------------------------------------------------------------ */
  /* Footer — a mancha (.footer__glow) não existe ainda quando o footer  */
  /* fixa, só é revelada depois de o utilizador começar a rolar lá       */
  /* dentro, e cresce devagar, encostada ao fundo, até cobrir o footer   */
  /* inteiro (branco → mesmo vinho escuro do header), levando o texto    */
  /* consigo ("ignorar" a vermelho → branco) — os 4 frames do Figma      */
  /* ("Footer / Contact"), tocados em contínuo e devagar, esticados pelo */
  /* pin quase inteiro, em vez de aos saltos ou num troço curto. Um      */
  /* único progress 0-1 (posição do scroll dentro do pin) alimenta       */
  /* --fp-glow/--fp-color, que o CSS interpola (ver .footer/             */
  /* .footer__glow, css/style.css) — mesmo mecanismo de pin da Hero/     */
  /* Selected Work (initHeroScrollMorph/initWorkScrub): a wrap ganha     */
  /* altura extra (.is-pinned), o footer fica sticky lá dentro. A        */
  /* suavidade (scroll-scrub contínuo em vez de passos) é a mesma ideia  */
  /* da secção "we keep our focus on important things" de neutomni.com.  */
  /* O pin já ligava no desktop (≥900px) e no mobile (≤768px) — a FASE 1 */
  /* (iPad Air/Pro, 769-1365px, ver style.css) fecha o único buraco que  */
  /* sobrava (769-899px, antes com título compacto sem pin) ao adotar o  */
  /* modelo mobile nessa faixa toda: com isso o pin passa a cobrir 100%  */
  /* das larguras, só o prefers-reduced-motion continua a desligá-lo.    */
  /* Sem pin, o default de --fp-glow/--fp-color em CSS já deixa o footer */
  /* no estado final — nada a fazer aqui. */
  /* ------------------------------------------------------------------ */
  function initFooterFocus() {
    const wrap = document.querySelector('.footer-pin-wrap');
    const footer = document.querySelector('.footer');
    if (!wrap || !footer) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    wrap.classList.add('is-pinned');

    // Mesmo top: do .footer sticky, ver css/style.css — 88px no desktop
    // de verdade (mesma altura do .site-header lá, agora incluindo o
    // iPad Pro em paisagem, 1366px), 72px no mobile e na faixa iPad
    // Air/Pro (retrato) da FASE 1 (769-1365px — header também vira
    // 72px lá, ver .site-header nesse bloco).
    const HEADER_OFFSET = window.matchMedia('(max-width: 1365px)').matches ? 72 : 88;
    const clamp01 = (n) => Math.min(1, Math.max(0, n));
    const ease = (p, start, end) => (end === start ? (p >= end ? 1 : 0) : clamp01((p - start) / (end - start)));
    let ticking = false;

    function scrollProgress() {
      const range = wrap.offsetHeight - footer.offsetHeight;
      if (range <= 0) return 1;
      const scrolled = HEADER_OFFSET - wrap.getBoundingClientRect().top;
      return clamp01(scrolled / range);
    }

    function applyProgress(p) {
      // Nada acontece nos primeiros ~12% do pin — a mancha não existe
      // ainda (scale 0, ver .footer__glow) quando o footer acaba de
      // fixar, para o início ficar "limpo" e a mancha surgir como
      // surpresa só depois de o utilizador começar mesmo a rolar, não
      // logo ao chegar. Dali até quase ao fim do pin ela cresce devagar
      // e sem parar — a transição inteira esticada pelo pin fora, não
      // só um troço curto, para se ler como lenta, não abrupta.
      const glow = ease(p, 0.12, 0.92);
      // A cor do texto segue o PROGRESSO DA PRÓPRIA MANCHA, não o
      // scroll — sincroniza sempre com o que está desenhado, em vez de
      // arriscar um meio-termo lavado sobre uma mancha ainda
      // incompleta. O título tem 3 linhas a alturas diferentes, por
      // isso a mancha já toca a linha de baixo bem antes de cobrir a
      // secção toda — o troço aqui (0.03-0.4, quase desde o início da
      // própria mancha) começa a trocar a cor logo que isso acontece,
      // não só quando já está tudo coberto.
      footer.style.setProperty('--fp-glow', glow.toFixed(3));
      footer.style.setProperty('--fp-color', ease(glow, 0.03, 0.4).toFixed(3));
      // Só usado no mobile (ver .footer::after, style.css) — camada
      // sólida sem blur nenhum, que só ganha opacidade nos últimos 15%
      // do progresso da própria mancha, quando ela já cobre quase todo
      // o ecrã: garante um preenchimento 100% opaco no fim, sem
      // depender de a mancha desfocada (que tem sempre alguma
      // transparência bem perto da própria borda) cobrir os cantos
      // com exatidão.
      footer.style.setProperty('--fp-solid', ease(glow, 0.85, 1).toFixed(3));
    }

    function syncToScroll() {
      applyProgress(scrollProgress());
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        applyProgress(scrollProgress());
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', syncToScroll);

    // Estado inicial do pin: mancha ainda pequena, antes de qualquer
    // scroll lá dentro (o default em CSS é o estado final — aqui é
    // onde a animação realmente começa).
    footer.style.setProperty('--fp-glow', '0');
    footer.style.setProperty('--fp-color', '0');
    footer.style.setProperty('--fp-solid', '0');
    syncToScroll();
  }

  /* ==================================================================== */
  /* A PARTIR DAQUI: só MOBILE — ver princípio gravado em memória         */
  /* (mobile-only-scope). Nenhuma das duas funções abaixo toca em         */
  /* initHeroScrollMorph, initSimpleHeaderReveal ou initSimpleAboutReveal */
  /* (nem nas suas variáveis, nem nos seletores que elas usam:            */
  /* .is-pinned, .about__title/.about__text/.about__stats, .is-revealed,  */
  /* .is-visible...) — código e classes de estado completamente à parte   */
  /* (sufixo "-m"), para o desktop e o fallback de prefers-reduced-motion */
  /* ficarem garantidamente inalterados, não só "visualmente iguais nos   */
  /* meus testes". Ver .hero__topline-m/.hero__about-m/.about-m__*        */
  /* (index.html) e a secção "Responsivo — Mobile" (style.css).           */
  /* ==================================================================== */

  /* ------------------------------------------------------------------ */
  /* MOBILE — Sanduíche do header: abre/fecha o painel com a nav +      */
  /* PT/EN (.site-header__menu-toggle-m/.site-header__menu-m). Corre     */
  /* sempre (independente do scroll/pin) — abrir/fechar o menu não        */
  /* depende de initMobileHeroMorph estar ativa.                          */
  /* ------------------------------------------------------------------ */
  function initMobileMenu() {
    const toggle = document.querySelector('.site-header__menu-toggle-m');
    const menu = document.getElementById('siteHeaderMenuM');
    const header = document.getElementById('siteHeader');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.classList.toggle('is-open-m', open);
      menu.classList.toggle('is-open-m', open);
      toggle.setAttribute('aria-expanded', String(open));

      if (!header) return;
      // O painel em si já nasce opaco (--hero-bg sólido), mas a barra
      // do header por cima dele, e o texto lá dentro (nav + PT/EN),
      // acompanham o scroll em alfa contínuo (ver applyProgress em
      // initMobileHeroMorph) — o sanduíche já é clicável a partir de
      // meio fade (.is-interactive liga em inP>0.5), por isso dava
      // para abrir o painel com a barra ainda semi-transparente por
      // cima (deixando ver a foto por trás) e os links lá dentro ainda
      // esmaecidos. Com o menu aberto tudo isto fica sempre a 100%.
      const navEls = menu.querySelectorAll('.site-header__navlinks a');
      const lang = menu.querySelector('.site-header__lang');
      if (open) {
        header.style.backgroundColor = 'rgba(109, 33, 22, 1)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)';
        navEls.forEach((a) => {
          a.style.opacity = '1';
        });
        if (lang) lang.style.opacity = '1';
      } else {
        // Devolve tudo ao valor "verdadeiro" (o do scroll atual) assim
        // que o painel fecha — recalcula aqui, mesmo cálculo do inP em
        // applyProgress (initMobileHeroMorph); não dá para chamar essa
        // função diretamente (fecha sobre variáveis privadas de outra
        // função), e disparar um scroll sintético não bastaria:
        // updateProgress só reaplica quando a posição muda de verdade.
        const wrap = document.getElementById('heroPinWrap');
        const scrolled = wrap ? -wrap.getBoundingClientRect().top : window.scrollY;
        const heroP = Math.min(1, Math.max(0, scrolled / window.innerHeight));
        const inP = Math.min(1, Math.max(0, (heroP - 0.35) / 0.4));
        header.style.backgroundColor = `rgba(109, 33, 22, ${inP})`;
        header.style.borderBottomColor = `rgba(255, 255, 255, ${inP * 0.15})`;
        navEls.forEach((a) => {
          a.style.opacity = String(inP);
        });
        if (lang) lang.style.opacity = String(inP);
      }
    }

    toggle.addEventListener('click', () => {
      setOpen(!menu.classList.contains('is-open-m'));
    });

    // Fecha ao escolher um link (Trabalho/Sobre/Contacto) ou ao trocar
    // de idioma — sem isto o painel ficava aberto por cima do conteúdo
    // depois de já ter navegado para lá.
    menu.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    // Toque/clique fora do painel (mas não no próprio botão, que já
    // trata do seu clique acima) também fecha.
    document.addEventListener('click', (e) => {
      if (!menu.classList.contains('is-open-m')) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
  }

  /* ------------------------------------------------------------------ */
  /* MOBILE — Hero + Sobre presos, com o mesmo espírito do              */
  /* initHeroScrollMorph (desktop) mas isolado por completo dele: nome  */
  /* "morph" (translate+scale) até ao logo do header, "HI, "/"NA"       */
  /* encolhem, Currículo e a nav (Trabalho/Sobre/Contacto — sem par 1:1 */
  /* no header, convergem todas para o ícone do sanduíche) desvanecem   */
  /* ao "pousar", a foto cresce até fullscreen, e o duplicado da secção */
  /* Sobre (.hero__about-m/.about-m__*, index.html) revela-se por cima  */
  /* dela em 3 passos EXCLUSIVOS (só um de cada vez, não cumulativo —   */
  /* sem espaço para 2 colunas como no desktop).                        */
  /* ------------------------------------------------------------------ */
  function initMobileHeroMorph() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 1365px, não 768px — FASE 1 (iPad Air/Pro, 769-1365px, ver bloco
    // "Responsivo — iPad Air / iPad Pro" em style.css) reaproveita
    // esta função para essa faixa: mesma CSS (.is-pinned-m,
    // .hero__about-m, sanduíche, etc.) duplicada lá para esses
    // tamanhos, exatamente como no mobile (max-width:768px) original.
    // iPad Pro em paisagem (1366px) foi tirado daqui 2026-09-13 — ver
    // nota em style.css — e passa a usar o pin do desktop de verdade
    // (initHeroScrollMorph) em vez deste.
    const isMobile = window.matchMedia('(max-width: 1365px)').matches;
    if (prefersReduced || !isMobile) return;

    const wrap = document.getElementById('heroPinWrap');
    const hero = document.getElementById('top');
    const header = document.getElementById('siteHeader');
    const heroInner = document.querySelector('.hero__inner');
    const heroName = document.querySelector('.hero__name');
    const imageBox = document.querySelector('.hero__image');
    if (!wrap || !hero || !header || !heroInner || !heroName || !imageBox) return;

    const heroNameDrops = document.querySelectorAll('.hero__name-drop');
    const heroTagline = document.querySelector('.hero__tagline');
    const heroResume = document.querySelector('.hero__resume');
    const heroNavLinks = document.querySelectorAll('.hero__navlinks a');
    const heroHeadline = document.querySelector('.hero__headline');
    // .hero__status-m (o "Disponível para trabalho" sobreposto à foto,
    // ver index.html) não tem a classe .hero__meta partilhada de
    // propósito — reaproveitá-la faria o "display:none" de repouso
    // (fora do mobile, ver style.css) perder para o "display:flex" da
    // regra base de .hero__meta (mesma especificidade, ordem no
    // ficheiro decidia) e o selo passaria a aparecer no desktop
    // também. Aqui só junta os dois na mesma lista para desvanecerem
    // juntos.
    const heroMetas = document.querySelectorAll('.hero__meta, .hero__status-m');
    const heroBottom = document.querySelector('.hero__bottom');
    const imageEl = imageBox.querySelector('img');

    const headerLogo = document.querySelector('.site-header__logo');
    const headerResume = document.querySelector('.site-header__resume');
    const headerMenuToggle = document.querySelector('.site-header__menu-toggle-m');
    const headerLangM = document.querySelector('.site-header__menu-m .site-header__lang');
    const headerNavLinksM = document.querySelectorAll('.site-header__menu-m .site-header__navlinks a');

    // Duplicado da secção Sobre (ver index.html) — classes próprias,
    // nada partilhado com .about__title/.about__text/.about__stats
    // (essas continuam só do desktop/fallback, ver initSimpleAboutReveal).
    const aboutTitle = document.querySelector('.about-m__title');
    const aboutTextBottom = document.querySelector('.about-m__text--bottom');
    const aboutTextTop = document.querySelector('.about-m__text--top');
    const aboutStats = document.querySelector('.about-m__stats');

    wrap.classList.add('is-pinned-m');

    let imgRect0 = null;
    let dropWidths = [];
    // Percurso preso dividido em dois troços: 100vh para a foto crescer
    // (+ transição do header) e mais 210vh (3 troços de about, não 4,
    // e cada um precisa do seu próprio espaço de scroll para ler-se com
    // calma, já que substitui o anterior em vez de se somar a ele — ver
    // updateAboutReveal) depois disso. wrap.style.height soma tudo
    // (100vh do próprio sticky + estes dois troços) — classe própria
    // (.is-pinned-m), nunca a altura fixa de .hero-pin-wrap.is-pinned
    // (desktop, style.css).
    const revealMultiplier = 2.1;
    let growRangePx = window.innerHeight;
    let revealRangePx = window.innerHeight * revealMultiplier;
    wrap.style.height = `${100 + 100 + revealMultiplier * 100}vh`;

    function measureImageRect() {
      imageBox.classList.remove('is-growing-m');
      imageBox.style.position = '';
      imageBox.style.top = '';
      imageBox.style.left = '';
      imageBox.style.width = '';
      imageBox.style.height = '';

      const heroRect = heroInner.getBoundingClientRect();
      const boxRect = imageBox.getBoundingClientRect();
      imgRect0 = {
        top: boxRect.top - heroRect.top,
        left: boxRect.left - heroRect.left,
        width: boxRect.width,
        height: boxRect.height,
      };
      if (heroBottom) heroBottom.style.minHeight = `${boxRect.height}px`;
    }

    function measureNameDrops() {
      heroNameDrops.forEach((span) => {
        span.style.width = '';
      });
      dropWidths = Array.from(heroNameDrops).map((span) => span.getBoundingClientRect().width);
    }

    // Nome -> logo do header (par real, translate+scale) e Currículo
    // -> Currículo do header (também par real, sempre visível). A nav
    // não tem par 1:1 no header mobile — os três links convergem para
    // o MESMO alvo, o ícone do sanduíche, dando a sensação de serem
    // "recolhidos" para dentro dele.
    const morphPairs = [];
    function addMorphPair(from, to) {
      if (from && to) morphPairs.push({ from, to, transform: null });
    }
    addMorphPair(heroName, headerLogo);
    addMorphPair(heroResume, headerResume);
    if (headerMenuToggle) {
      heroNavLinks.forEach((a) => addMorphPair(a, headerMenuToggle));
    }

    function measureMorphPairs() {
      morphPairs.forEach((pair) => {
        const prevTransform = pair.from.style.transform;
        pair.from.style.transform = 'none';
        const fromRect = pair.from.getBoundingClientRect();
        const fromFontSize = parseFloat(getComputedStyle(pair.from).fontSize) || 1;
        const toFontSize = parseFloat(getComputedStyle(pair.to).fontSize) || fromFontSize;
        const toRect = pair.to.getBoundingClientRect();
        pair.transform = {
          tx: toRect.left - fromRect.left,
          ty: toRect.top - fromRect.top,
          scale: toFontSize / fromFontSize,
        };
        pair.from.style.transform = prevTransform;
      });
    }

    measureImageRect();
    measureNameDrops();
    measureMorphPairs();

    const clamp01 = (n) => Math.min(1, Math.max(0, n));
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
    const ease = (p, start, end) => (end === start ? (p >= end ? 1 : 0) : clamp01((p - start) / (end - start)));
    const lerp = (a, b, t) => a + (b - a) * t;

    // 806 — mesmo valor medido na foto atual (1440×2161px) usado na
    // função de desktop (ver IMG_HEAD_TOP_PX em initHeroScrollMorph);
    // a foto de referência trocou em 2026-09-14, por isso o valor
    // antigo (590) já não vale — era calibrado para a foto anterior,
    // 1066×1600px.
    const IMG_HEAD_TOP_PX = 806;
    // Folga acima da cabeça (px) — interpolada pela LARGURA da caixa,
    // não um valor fixo só: em caixas mais largas que altas (iPad Air
    // em paisagem — Fase 1, 769-1365px, já que o iPad Pro em paisagem,
    // 1366px, virou desktop de verdade — ver nota 2026-09-13 em
    // style.css) sobra "excess" vertical de verdade pra recortar, e o
    // mesmo valor fixo de telemóvel deixava a cabeça perto demais do
    // topo. MIN recalibrado em 2026-09-14 (era 100) para bater com os
    // ~90% pedidos no iPad mini (768×1024, caixa 768×952) depois da
    // troca da foto — MAX (1365px de largura de caixa) não foi
    // reportado como errado, por isso ficou como estava; vale conferir
    // se ainda faz sentido depois deste ajuste do MIN.
    const IMG_HEAD_ROOM_MIN_PX = 249; // ≤768px de largura de caixa
    const IMG_HEAD_ROOM_MAX_PX = 310; // ≥1365px de largura de caixa (calibrado para a foto anterior — não confirmado com a foto atual)

    // Ecrãs muito pequenos (largura <390px E altura <800px — ex. Galaxy
    // S8+, 360×740, e o iPhone SE, 375×667): com object-fit:cover o
    // "excess" vertical é 0 nesse formato de caixa (ver comentário em
    // targetObjectPositionY), tornando object-position inútil — nenhum
    // valor resolve (confirmado 2026-09-13). Só aqui trocamos para
    // object-fit:none — mostra a imagem no tamanho NATURAL (1440×2161px,
    // sem escalar), o que cria sobra vertical de verdade, e ESSE
    // object-position passa a funcionar de facto (ver updateImagePin,
    // onde object-fit também é trocado). Recalibrado em 2026-09-14 (era
    // 357, para a foto anterior) para bater com os ~32% pedidos no
    // iPhone SE (375×667, caixa 375×595, já sem os 72px do header).
    const IMG_HEAD_ROOM_NONE_PX = 305;

    function useNoneFit() {
      return window.innerWidth < 390 && window.innerHeight < 800;
    }

    /* Object-position-Y da foto crescida, a partir das dimensões reais
       da caixa e da imagem original (1440×2161px — ver IMG_HEAD_TOP_PX).
       Quando a caixa é mais alta que larga na MESMA proporção da
       imagem (praticamente todo telemóvel em retrato), "excess" (sobra
       vertical depois do object-fit:cover) é 0: a imagem cobre a
       altura exata da caixa, o recorte acontece só nas laterais, e
       NENHUM valor de object-position muda o enquadramento vertical —
       ver useNoneFit()/IMG_HEAD_ROOM_NONE_PX acima para a saída desse
       caso nos ecrãs mais estreitos/baixos. */
    function targetObjectPositionY(boxWidth, boxHeight) {
      if (!imageEl || !imageEl.naturalWidth || !imageEl.naturalHeight) return 58;

      if (useNoneFit()) {
        const excessNone = imageEl.naturalHeight - boxHeight;
        if (excessNone <= 0) return 50;
        const offsetNone = clamp(IMG_HEAD_TOP_PX - IMG_HEAD_ROOM_NONE_PX, 0, excessNone);
        return (offsetNone / excessNone) * 100;
      }

      const scale = Math.max(boxWidth / imageEl.naturalWidth, boxHeight / imageEl.naturalHeight);
      const excess = imageEl.naturalHeight * scale - boxHeight;
      if (excess <= 0) return 50;
      const room = lerp(IMG_HEAD_ROOM_MIN_PX, IMG_HEAD_ROOM_MAX_PX, clamp01((boxWidth - 768) / (1365 - 768)));
      const offset = clamp(IMG_HEAD_TOP_PX * scale - room, 0, excess);
      return (offset / excess) * 100;
    }

    let ticking = false;
    let lastProgress = -1;

    function applyProgress(p) {
      const outP = ease(p, 0, 0.45);
      const inP = ease(p, 0.35, 0.75);
      const outOpacity = 1 - outP;
      const riseY = outP * -40;
      const handoffIn = ease(p, 0.46, 0.5);

      morphPairs.forEach((pair) => {
        if (!pair.transform) return;
        const tx = lerp(0, pair.transform.tx, outP);
        const ty = lerp(0, pair.transform.ty, outP);
        const s = lerp(1, pair.transform.scale, outP);
        pair.from.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
        pair.from.style.transformOrigin = 'top left';
        pair.from.style.opacity = String(1 - handoffIn);
      });

      const dropP = ease(outP, 0, 0.2);
      heroNameDrops.forEach((span, i) => {
        span.classList.toggle('is-collapsing', dropP > 0);
        if (dropP > 0) {
          const w = dropWidths[i] || 0;
          span.style.width = `${w * (1 - dropP)}px`;
        } else {
          span.style.width = '';
        }
        span.style.opacity = String(1 - dropP);
      });

      if (heroTagline) {
        heroTagline.style.opacity = String(outOpacity);
        heroTagline.style.transform = `translateY(${riseY}px)`;
      }
      if (heroHeadline) heroHeadline.style.opacity = String(outOpacity);
      heroMetas.forEach((m) => {
        m.style.opacity = String(outOpacity);
      });

      header.style.backgroundColor = `rgba(109, 33, 22, ${inP})`;
      header.style.borderBottomColor = `rgba(255, 255, 255, ${inP * 0.15})`;
      header.classList.toggle('is-interactive', inP > 0.5);

      if (headerLogo) headerLogo.style.opacity = String(handoffIn);
      if (headerResume) headerResume.style.opacity = String(handoffIn);
      if (headerMenuToggle) headerMenuToggle.style.opacity = String(handoffIn);
      if (headerLangM) headerLangM.style.opacity = String(inP);
      headerNavLinksM.forEach((a) => {
        a.style.opacity = String(inP);
      });
    }

    let lastGrowP = -1;

    function updateImagePin(growP) {
      if (!imgRect0 || growP === lastGrowP) return;
      lastGrowP = growP;

      if (growP <= 0) {
        if (imageBox.classList.contains('is-growing-m')) {
          imageBox.classList.remove('is-growing-m');
          imageBox.style.position = '';
          imageBox.style.top = '';
          imageBox.style.left = '';
          imageBox.style.width = '';
          imageBox.style.height = '';
          if (imageEl) {
            imageEl.style.objectPosition = '';
            imageEl.style.objectFit = '';
          }
        }
        return;
      }

      if (!imageBox.classList.contains('is-growing-m')) {
        imageBox.classList.add('is-growing-m');
        imageBox.style.position = 'absolute';
      }

      const heroInnerRect = heroInner.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const headerHeight = header.offsetHeight;
      const targetTop = heroRect.top - heroInnerRect.top + headerHeight;
      const targetLeft = heroRect.left - heroInnerRect.left;
      const targetHeight = heroRect.height - headerHeight;

      imageBox.style.top = `${lerp(imgRect0.top, targetTop, growP)}px`;
      imageBox.style.left = `${lerp(imgRect0.left, targetLeft, growP)}px`;
      imageBox.style.width = `${lerp(imgRect0.width, heroRect.width, growP)}px`;
      imageBox.style.height = `${lerp(imgRect0.height, targetHeight, growP)}px`;
      if (imageEl) {
        // object-fit não é interpolável (é um on/off) — troca direto,
        // sem lerp; ver useNoneFit()/IMG_HEAD_ROOM_NONE_PX acima.
        imageEl.style.objectFit = useNoneFit() ? 'none' : '';
        imageEl.style.objectPosition = `center ${lerp(0, targetObjectPositionY(heroRect.width, targetHeight), growP)}%`;
      }
    }

    // Revelação em 3 passos EXCLUSIVOS (ao contrário do desktop,
    // cumulativo): só um dos três (texto de baixo, texto de cima,
    // números) fica visível de cada vez, sobrepostos no mesmo lugar
    // (ver .about-m__text/.about-m__stats, style.css) — o scroll TROCA
    // qual está revelado. O título aparece já no primeiro troço e fica.
    function updateAboutReveal(scrolled) {
      const swapEls = [aboutTextBottom, aboutTextTop, aboutStats];
      // .is-active-m liga a auréola clara por trás do texto — vive em
      // .hero__image (ver ::after em style.css), não em .hero__about-m,
      // para se mover/encolher junto com a foto (herda o mesmo
      // top/left/width/height animado por updateImagePin) em vez de
      // ficar presa a uma posição fixa no ecrã enquanto a foto já
      // mudou de tamanho por baixo dela. Sem isto ela ficava sempre
      // ligada assim que a página abre (.is-pinned-m liga logo ao
      // carregar, bem antes de haver scroll ou texto nenhum para
      // iluminar), "engolindo" a foto/fundo vinho da Hero num degradê a
      // branco visível mesmo em repouso.
      if (imageBox) imageBox.classList.toggle('is-active-m', scrolled >= growRangePx);
      if (scrolled < growRangePx) {
        if (aboutTitle) aboutTitle.classList.remove('is-shown-m');
        swapEls.forEach((el) => el && el.classList.remove('is-shown-m'));
        return;
      }
      if (aboutTitle) aboutTitle.classList.add('is-shown-m');
      const aboutP = clamp01((scrolled - growRangePx) / revealRangePx);
      const activeIndex = Math.min(swapEls.length - 1, Math.floor(aboutP * swapEls.length));
      swapEls.forEach((el, i) => {
        if (el) el.classList.toggle('is-shown-m', i === activeIndex);
      });
    }

    function updateProgress() {
      ticking = false;
      if (wrap.offsetHeight <= window.innerHeight) return;

      const scrolled = -wrap.getBoundingClientRect().top;
      const heroP = clamp01(scrolled / growRangePx);

      updateImagePin(heroP);
      updateAboutReveal(scrolled);

      if (Math.abs(heroP - lastProgress) < 0.001) return;
      lastProgress = heroP;

      header.classList.add('is-scrubbing');
      applyProgress(heroP);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      growRangePx = window.innerHeight;
      revealRangePx = window.innerHeight * revealMultiplier;
      measureImageRect();
      measureNameDrops();
      measureMorphPairs();
      lastProgress = -1;
      lastGrowP = -1;
      updateProgress();
    });

    // O link "Sobre" (Hero e o do painel do sanduíche, ambos
    // href="#sobre") aponta para dentro da própria Hero — a navegação
    // nativa por âncora pousaria só no topo dela (ou nem isso, o
    // duplicado mobile não tem id="sobre" — ver index.html); aqui
    // calcula-se o ponto exato do percurso preso em que a revelação
    // (3 passos exclusivos, ver updateAboutReveal acima) já chegou ao
    // último passo (os números/.about-m__stats) e rola-se até lá, em
    // vez de parar no primeiro texto a meio da sequência.
    document.querySelectorAll('a[href="#sobre"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: wrapTop + growRangePx + revealRangePx, behavior: 'smooth' });
      });
    });

    updateProgress();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measureImageRect();
        measureNameDrops();
        measureMorphPairs();
        lastProgress = -1;
        lastGrowP = -1;
        updateProgress();
      });
    }
  }

  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initHeroClock();
    initHeadlineAlign();
    initHeroScrollMorph();
    initMobileMenu();
    initMobileHeroMorph();
    initScrollReveal();
    initWorkDescPosition();
    initWorkScrub();
    initWorkCursor();
    initWorkPhotoToggle();
    initFooterFocus();

    // positionFooterGlowOrigin também é chamada por applyLanguage (mais
    // acima) sempre que o PT/EN troca o innerHTML de "ignorar" — aqui só
    // liga a medição inicial e os dois gatilhos que fazem o layout mudar
    // sem passar por applyLanguage: redimensionar a janela e a fonte do
    // título (var(--font-display)) acabar de carregar (pode reflowar o
    // texto depois da 1ª medição).
    positionFooterGlowOrigin();
    window.addEventListener('resize', positionFooterGlowOrigin);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(positionFooterGlowOrigin);
    }
  });
})();
