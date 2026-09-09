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
      'work.title': 'Product design case studies backed by 8+ years of systemic, structured thinking.',
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
      'about.title': 'From blueprints to interfaces.',
      'about.p1': 'For eight years I led architecture and interior design projects, managing complex timelines, budgets and multidisciplinary teams from brief to delivery. That work built the systemic thinking I now apply to digital products: breaking down ambiguous problems, mapping structure before style, and designing for how people actually use a space, physical or digital.',
      'about.p2': "In 2024 I co-founded Paparico, where I led end-to-end UX/UI design, from research and journey mapping to interactive prototypes and a measurable increase in conversions. I'm now looking to bring that same rigor to a Product Design team and close collaboration with engineering.",
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

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* localStorage indisponível (modo privado, etc.) — ignorar silenciosamente */
    }
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
    const canPin = window.matchMedia('(min-width: 900px)').matches;

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

    // Onde a cabeça começa na foto original (1066×1600px) — usado para
    // calcular o enquadramento vertical final a partir das dimensões
    // reais da imagem e da caixa, em vez de uma percentagem fixa "no
    // olho" que só ficaria certa numa altura de ecrã específica.
    const IMG_HEAD_TOP_PX = 590;
    const IMG_HEAD_ROOM_PX = 100; // folga desejada acima da cabeça, na caixa final

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
    // começou a revelar-se e rola-se até lá.
    document.querySelectorAll('a[href="#sobre"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: wrapTop + growRangePx + revealRangePx * 0.08, behavior: 'smooth' });
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
      if (window.matchMedia('(max-width: 1619px)').matches) {
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
  /* posição do scroll dentro do pin (a partir de 1440px), que tinge a  */
  /* linha ativa e revela a imagem do respetivo projeto, "abrindo-a" a  */
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
    // o pin ativo (ver breakpoint em .work-layout, css/style.css).
    const scrubQuery = window.matchMedia('(min-width: 1440px)');
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
  /* Sem pin (mobile / prefers-reduced-motion), o default de --fp-glow/  */
  /* --fp-color em CSS já deixa o footer no estado final — nada a fazer  */
  /* aqui. */
  /* ------------------------------------------------------------------ */
  function initFooterFocus() {
    const wrap = document.querySelector('.footer-pin-wrap');
    const footer = document.querySelector('.footer');
    if (!wrap || !footer) return;

    const canPin = window.matchMedia('(min-width: 900px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canPin || reducedMotion) return;

    wrap.classList.add('is-pinned');

    const HEADER_OFFSET = 88; // mesmo top: do .footer sticky, ver css/style.css
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
    syncToScroll();
  }

  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initHeroClock();
    initHeadlineAlign();
    initHeroScrollMorph();
    initScrollReveal();
    initWorkDescPosition();
    initWorkScrub();
    initWorkCursor();
    initFooterFocus();
  });
})();
