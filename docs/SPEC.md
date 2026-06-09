# Spec-Driven — Especificação Técnica Detalhada

## 1. Visão da Arquitetura

```
┌─────────────────────────────────────────────────┐
│                  index.html                      │
│  ┌───────────────────────────────────────────┐  │
│  │ <nav>     Navbar fixa + blur              │  │
│  ├───────────────────────────────────────────┤  │
│  │ <section> Hero — 2 colunas (content|visual)│  │
│  ├───────────────────────────────────────────┤  │
│  │ <section> Problemas — 3 cards numerados   │  │
│  ├───────────────────────────────────────────┤  │
│  │ <section> Método R.E.I — 2 colunas        │  │
│  ├───────────────────────────────────────────┤  │
│  │ <section> Serviços — grid 3×2             │  │
│  ├───────────────────────────────────────────┤  │
│  │ <section> Resultados — 4 stat cards       │  │
│  ├───────────────────────────────────────────┤  │
│  │ <section> CTA Final — centralizado        │  │
│  ├───────────────────────────────────────────┤  │
│  │ <footer>  Footer — 3 colunas              │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  styles.css  ← Design System + Componentes       │
│  script.js   ← Animações + Interações            │
└─────────────────────────────────────────────────┘
```

---

## 2. Especificação do CSS (styles.css)

### 2.1 Organização do Arquivo

O CSS segue a metodologia **ITCSS** (Inverted Triangle CSS) adaptada:

```css
/* ============================================
   1. RESET & BASE
   ============================================ */
/* Box-sizing, margin reset, smooth scroll */

/* ============================================
   2. DESIGN TOKENS (Custom Properties)
   ============================================ */
/* :root com todas as variáveis */

/* ============================================
   3. TIPOGRAFIA
   ============================================ */
/* h1-h6, .section-title, .text-gradient, etc. */

/* ============================================
   4. COMPONENTES GLOBAIS
   ============================================ */
/* .btn, .btn--primary, .btn--lg, etc. */

/* ============================================
   5. LAYOUT: NAVBAR
   ============================================ */

/* ============================================
   6. LAYOUT: HERO
   ============================================ */

/* ============================================
   7. LAYOUT: PROBLEMAS
   ============================================ */

/* ============================================
   8. LAYOUT: MÉTODO
   ============================================ */

/* ============================================
   9. LAYOUT: SERVIÇOS
   ============================================ */

/* ============================================
   10. LAYOUT: RESULTADOS
   ============================================ */

/* ============================================
   11. LAYOUT: CTA FINAL
   ============================================ */

/* ============================================
   12. LAYOUT: FOOTER
   ============================================ */

/* ============================================
   13. ANIMAÇÕES (@keyframes)
   ============================================ */

/* ============================================
   14. RESPONSIVIDADE (Media Queries)
   ============================================ */

/* ============================================
   15. ACESSIBILIDADE
   ============================================ */
```

### 2.2 Nomenclatura CSS (BEM)

Padrão: **Block__Element--Modifier**

```css
/* Bloco */
.hero { }
.problem-card { }
.service-card { }

/* Elemento */
.hero__title { }
.hero__subtitle { }
.problem-card__number { }

/* Modificador */
.btn--primary { }
.btn--lg { }
.hero__orb--1 { }
```

### 2.3 Efeitos Visuais Especificados

#### Glassmorphism (Navbar)
```css
.navbar.scrolled {
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(65, 42, 156, 0.2);
}
```

#### Glow Effect (Cards)
```css
.problem-card:hover {
  border-color: rgba(65, 42, 156, 0.5);
  box-shadow: 0 0 20px rgba(65, 42, 156, 0.3),
              0 0 40px rgba(65, 42, 156, 0.1);
}
```

#### Text Gradient
```css
.text-gradient {
  background: linear-gradient(135deg, #7B5FD4, #A78BFA, #C4B5FD);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### Floating Animation (Hero Cards)
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.hero__floating-card--1 { animation: float 4s ease-in-out infinite; }
.hero__floating-card--2 { animation: float 5s ease-in-out infinite 0.5s; }
.hero__floating-card--3 { animation: float 6s ease-in-out infinite 1s; }
```

#### Orb Effects (Background)
```css
.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.hero__orb--1 {
  width: 400px;
  height: 400px;
  background: #412A9C;
  top: 10%;
  right: 20%;
}

.hero__orb--2 {
  width: 300px;
  height: 300px;
  background: #5B3FBF;
  bottom: 20%;
  left: 10%;
}
```

---

## 3. Especificação do JavaScript (script.js)

### 3.1 Módulos Funcionais

```javascript
// ============================================
// 1. DOM Content Loaded (Entry Point)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initCounters();
  initMobileMenu();
  initSmoothScroll();
  initActiveLink();
});
```

### 3.2 Detalhamento de Cada Módulo

#### `initNavbar()`
**Propósito**: Navbar fixa com blur ao rolar

```
Comportamento:
1. Ao rolar > 50px:
   - Adiciona classe .navbar--scrolled
   - Ativa background blur + borda sutil
2. Ao rolar < 50px:
   - Remove a classe
   - Navbar volta a ser transparente

Implementação:
- window.addEventListener('scroll', handler)
- Usar requestAnimationFrame para throttle
- Classe CSS .navbar--scrolled controla o visual
```

#### `initScrollAnimations()`
**Propósito**: Elementos aparecem conforme entram na viewport

```
Comportamento:
1. Elementos com [data-animate] começam invisíveis (opacity: 0, translateY: 30px)
2. Quando entram na viewport (threshold: 0.1):
   - Classe .animate-in é adicionada
   - Transição CSS faz o fade-in + slide-up
   - Observer para de observar (animação única)
3. Atributo [data-delay] define delay da animação (100, 200, 300ms)

Elementos animados:
- .hero__content → fade-left
- .hero__visual → fade-right
- .problems__header → fade-up
- .problem-card (×3) → fade-up com delays escalonados
- .method__left → fade-left
- .method__right → fade-right
- .section-title (serviços, resultados) → fade-up
- .service-card (×6) → fade-up com delays escalonados
- .results__stats → fade-up
- .cta-section__content → fade-up
```

#### `initCounters()`
**Propósito**: Contadores animados na seção de resultados

```
Comportamento:
1. Elementos com [data-count] começam em "0"
2. Quando a seção .results entra na viewport:
   - Animação de contagem de 0 até o valor final
   - Duração: 2 segundos
   - Easing: ease-out (começa rápido, desacelera)
   - requestAnimationFrame para suavidade
3. "24/7" não é animado (já é texto estático)

Valores:
- 200 → conta de 0 a 200
- 55 → conta de 0 a 55
- 6 → conta de 0 a 6
```

#### `initMobileMenu()`
**Propósito**: Menu hamburger no mobile

```
Comportamento:
1. Botão .navbar__toggle alterna classe .navbar__menu--open
2. O botão se transforma em "X" (animação CSS dos 3 spans)
3. Ao clicar em um link do menu:
   - Menu fecha automaticamente
   - Scroll suave para a seção
4. Ao clicar fora do menu:
   - Menu fecha

Visual:
- Menu desliza de cima para baixo (ou do lado)
- Background escuro com blur
- Links centralizados verticalmente
```

#### `initSmoothScroll()`
**Propósito**: Scroll suave ao clicar nos links âncora

```
Comportamento:
1. Links com href="#id":
   - preventDefault()
   - scrollIntoView({ behavior: 'smooth' })
   - Offset de ~80px (altura do navbar)
```

#### `initActiveLink()`
**Propósito**: Destaque visual no link ativo do navbar

```
Comportamento:
1. IntersectionObserver observa cada <section>
2. Quando seção entra na viewport:
   - Link correspondente recebe classe .navbar__link--active
   - Links anteriores perdem a classe
```

---

## 4. Especificação por Seção

### 4.1 Navbar

```
┌────────────────────────────────────────────────────────┐
│  ORIGO COMPANY    Início  Problemas  Método  ...  [CTA]│
└────────────────────────────────────────────────────────┘

Specs:
- Altura: 72px (desktop), 64px (mobile)
- Position: fixed, top: 0, z-index: 1000
- Background padrão: transparent
- Background scrolled: rgba(10, 10, 15, 0.85) + blur(12px)
- Transição: 300ms ease
- Max-width do container: 1200px, centralizado
- Padding horizontal: 20px

Logo:
- "ORIGO" → font-weight: 800, color: white
- "COMPANY" → font-weight: 800, color: #412A9C

Links:
- Font-size: 14px, weight: 500
- Color: var(--color-text-secondary)
- Hover: color white + underline animado por baixo
- Active: color white

CTA Button:
- Background: var(--gradient-accent)
- Padding: 10px 24px
- Border-radius: 8px
- Font-size: 14px, weight: 600
- Color: white
- Hover: brightness(1.1) + shadow-glow
```

### 4.2 Hero Section

```
┌──────────────────────────────────────────────┐
│  ┌──────────────┐  ┌────────────────────┐   │
│  │ [Badge]      │  │                    │   │
│  │ TÍTULO H1    │  │  [Floating Card 1] │   │
│  │ Subtítulo    │  │       ┌──────┐     │   │
│  │ Descrição    │  │  [FC2]│ Glow │     │   │
│  │ [Stats]      │  │       └──────┘     │   │
│  │ [CTA BUTTON] │  │  [Floating Card 3] │   │
│  └──────────────┘  └────────────────────┘   │
│                    [scroll indicator]         │
└──────────────────────────────────────────────┘

Specs:
- Min-height: 100vh
- Display: flex, align-items: center
- Padding: 120px 20px 80px (top tem navbar offset)
- Background: var(--color-bg-primary)
- Container max-width: 1200px

Background Effects:
- 2 orbs (pseudo-elementos ou divs absolutas)
- Grid overlay sutil (opcional, background-image com padrão de pontos)

Content (lado esquerdo, 50%):
- Badge: border 1px accent, border-radius: full, padding: 6px 16px
  - Dot animado (pulse) + texto 14px
- H1: font-size 48px (desktop), 32px (mobile), weight: 700
  - "clientes da sua empresa" com .text-gradient
  - Line-height: 1.15
- Subtítulo: font-size 22px, weight: 300, color: text-secondary
  - Visível apenas desktop (hidden mobile para não ficar longo)
- Descrição: font-size 18px, weight: 400, color: text-secondary
  - <strong> em branco para destaque
- Stats: display flex, gap 24px
  - Número: font-size 28px, weight: 800, color: white
  - Label: font-size 13px, color: text-muted
  - Divider: width 1px, height 40px, background: border color
- CTA: ver componente .btn--primary.btn--lg

Visual (lado direito, 50%):
- Wrapper com position: relative
- Glow central: radial-gradient do accent, blur 100px
- 3 floating cards com position: absolute
  - Background: rgba(10, 10, 15, 0.8) + border accent sutil
  - Backdrop-filter: blur(8px)
  - Padding: 12px 20px
  - Border-radius: 12px
  - Ícone SVG + texto
  - Animação: float (keyframes, durações diferentes)

Scroll Indicator:
- Centralizado, bottom: 30px
- Mouse shape com wheel animado (scroll-down)
- Fade out ao rolar
```

### 4.3 Seção Problemas

```
┌──────────────────────────────────────────────┐
│           HOJE VOCÊ TEM 3 INIMIGOS:          │
│        Resultado: clique caro, inbox...      │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ 01       │ │ 02       │ │ 03       │    │
│  │ Anúncios │ │ Funil    │ │ Oferta   │    │
│  │ que só...│ │ que não..│ │ confusa  │    │
│  └──────────┘ └──────────┘ └──────────┘    │
└──────────────────────────────────────────────┘

Specs:
- Background: var(--color-bg-secondary)
- Padding: 80px 20px
- Container max-width: 1200px

Header:
- H2: font-size 48px, weight: 600, uppercase
  - "3 inimigos:" com .text-accent (color: #412A9C)
- Subtítulo: font-size 20px, weight: 300, max-width: 700px
  - "Resultado:" em bold

Cards (grid 3 colunas, gap 24px):
- Background: var(--gradient-card) ou rgba(17, 17, 24, 0.8)
- Border: 1px solid var(--color-border)
- Border-radius: 16px
- Padding: 32px
- Position: relative (para o glow)

Card interna:
- Número: font-size 52px, weight: 700, color: accent com opacity 0.3
  - Position: absolute ou block no topo
- Título: font-size 22px, weight: 600, color: white
- Descrição: font-size 16px, weight: 400, color: text-secondary
- Glow (pseudo-elemento): opacity 0 → hover opacity 1
  - Radial gradient do accent, blur grande
  - Position: absolute, inset: -1px
  - z-index: -1

Hover:
- Border-color: var(--color-border-hover)
- box-shadow: var(--shadow-glow)
- Transform: translateY(-4px)
- Transition: 300ms ease
```

### 4.4 Seção Método R.E.I

```
┌──────────────────────────────────────────────┐
│  ┌─────────────┐  ┌───────────────────┐     │
│  │             │  │ [O MÉTODO]        │     │
│  │   [Foto     │  │ Método R.E.I      │     │
│  │    Renato]  │  │ "Relevância..."   │     │
│  │             │  │ ✓ Engrenagem      │     │
│  │             │  │ ✓ Relevância      │     │
│  │             │  │ ✓ Iteração        │     │
│  │             │  │ [CTA BUTTON]      │     │
│  └─────────────┘  └───────────────────┘     │
└──────────────────────────────────────────────┘

Specs:
- Background: var(--color-bg-primary) com gradient overlay
- Padding: 80px 20px 0 (bottom 0 para imagem flush)
- Container max-width: 1200px
- Display: flex, gap: 40px

Lado Esquerdo (50%):
- Imagem/placeholder do Renato
- Frame com border accent, border-radius 20px
- Se placeholder:
  - Background gradient sutil
  - Ícone de pessoa SVG centralizado
  - Nome + cargo abaixo

Lado Direito (50%):
- Badge "O MÉTODO":
  - Border: 1px solid accent
  - Border-radius: full
  - Padding: 5px 16px
  - Font-size: 13px, weight: 300, uppercase, letter-spacing: 2px
- Título: font-size 52px, weight: 400
  - "R.E.I" com .text-accent (bold)
- Subtítulo: font-size 20px, italic, color: text-secondary
- Items (flex column, gap 20px):
  - Cada item: flex row, gap 16px, align center
  - Ícone: 44px circle, background accent-subtle, check SVG
  - H3: font-size 24px, weight: 600
  - P: font-size 16px, weight: 400, color: text-secondary
- CTA: var(--btn-primary-lg)
- Borda ao redor: 1px solid accent, radius 20px, glow sutil
```

### 4.5 Seção Serviços

```
┌──────────────────────────────────────────────┐
│       O QUE EU FAÇO POR VOCÊ                 │
│                                              │
│  ┌────────┐ ┌────────┐ ┌────────┐           │
│  │ ♞      │ │ 🖥     │ │ 💬     │           │
│  │Estratég│ │Landing │ │Autom.  │           │
│  │Posicio.│ │Páginas │ │Chatbot │           │
│  └────────┘ └────────┘ └────────┘           │
│  ┌────────┐ ┌────────┐ ┌────────┐           │
│  │ 📈     │ │ ⏰     │ │ ✏️     │           │
│  │Tráfego │ │CRM &   │ │Copywri │           │
│  │Pago    │ │Followup│ │ting    │           │
│  └────────┘ └────────┘ └────────┘           │
└──────────────────────────────────────────────┘

Specs:
- Background: var(--color-bg-secondary)
- Padding: 80px 20px
- Container max-width: 1200px

Título: seção-title padrão, center

Grid:
- Display: grid
- grid-template-columns: repeat(3, 1fr) (desktop)
- grid-template-columns: repeat(2, 1fr) (tablet)
- grid-template-columns: 1fr (mobile)
- Gap: 24px

Cards:
- Background: var(--gradient-card)
- Border: 1px solid var(--color-border)
- Border-radius: 16px
- Padding: 32px
- Transition: all 300ms ease

Card interna:
- Ícone: 56px × 56px container, border-radius: 12px
  - Background: var(--color-accent-subtle)
  - SVG: 32px, stroke: accent
- Título: font-size 20px, weight: 600, margin-top: 20px
- Descrição: font-size 15px, weight: 400, color: text-secondary, margin-top: 8px

Hover:
- Border-color: accent
- box-shadow: shadow-glow
- Transform: translateY(-6px)
- Ícone background: accent (mais opaco)
```

### 4.6 Seção Resultados

```
┌──────────────────────────────────────────────┐
│       RESULTADOS QUE FALAM POR SI            │
│       Mais de 200 projetos...                │
│                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ 200+ │ │ 55%  │ │  6   │ │ 24/7 │       │
│  │Projet│ │Aumen.│ │meses │ │Autom.│       │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
└──────────────────────────────────────────────┘

Specs:
- Background: var(--color-bg-primary)
- Padding: 80px 20px
- Orb decorativo (background effect)

Stats Grid:
- Display: grid, 4 colunas (desktop), 2×2 (tablet/mobile)
- Gap: 24px
- Max-width: 900px, centralizado

Stat Card:
- Text-align: center
- Background: var(--gradient-card)
- Border: 1px solid var(--color-border)
- Border-radius: 16px
- Padding: 40px 24px

Stat interna:
- Número: font-size 48px, weight: 800, color: accent-light
  - Animação de contagem (JS)
- Sufixo (+, %, meses): mesmo estilo, inline
- Label: font-size 14px, weight: 500, color: text-secondary, uppercase
  - Letter-spacing: 1px
```

### 4.7 CTA Final

```
┌──────────────────────────────────────────────┐
│                                              │
│     Pronto para conquistar o                 │
│     mercado americano?                       │
│                                              │
│     Fale agora com um especialista...        │
│                                              │
│     [🟢 FALAR COM ESPECIALISTA NO WHATSAPP]  │
│                                              │
└──────────────────────────────────────────────┘

Specs:
- Background: gradient escuro com orbs
- Padding: 100px 20px
- Text-align: center
- Max-width conteúdo: 700px

Título: font-size 40px, weight: 700
  - "mercado americano" com .text-gradient

Descrição: font-size 18px, weight: 400, color: text-secondary

CTA:
- .btn--primary.btn--xl (maior que o normal)
- Ícone WhatsApp SVG inline
- Animação de pulse no glow (sutil)
- Padding: 18px 40px
- Font-size: 18px
```

### 4.8 Footer

```
┌──────────────────────────────────────────────┐
│  ORIGO COMPANY    │  Navegação  │  Contato   │
│  Tagline          │  Início     │  WhatsApp  │
│                   │  Problemas  │  Website   │
│                   │  Método     │            │
│                   │  Serviços   │            │
│                   │  Resultados │            │
├──────────────────────────────────────────────┤
│  © 2025 Origo Company. Todos os direitos...  │
└──────────────────────────────────────────────┘

Specs:
- Background: #06060A (mais escuro que o bg principal)
- Border-top: 1px solid var(--color-border)
- Padding: 60px 20px 24px

Top:
- Display: grid, 3 colunas (auto, 1fr, 1fr) — desktop
- Coluna única no mobile

Brand:
- Logo igual ao navbar
- Tagline: font-size 14px, color: text-muted, max-width: 280px

Links:
- H4: font-size 14px, weight: 600, uppercase, letter-spacing: 1px, color: text-secondary
- Links: font-size 14px, weight: 400, color: text-muted
- Hover: color white

Bottom:
- Border-top: 1px solid var(--color-border)
- Padding-top: 24px
- Font-size: 13px, color: text-muted
- Text-align: center
```

---

## 5. Componentes Reutilizáveis

### 5.1 Botão (.btn)

```css
/* Base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-family);
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
  border-radius: var(--radius-md);
}

/* Variantes */
.btn--primary {
  background: var(--gradient-accent);
  color: white;
  box-shadow: 0 4px 15px rgba(65, 42, 156, 0.3);
}

.btn--primary:hover {
  filter: brightness(1.15);
  box-shadow: 0 6px 25px rgba(65, 42, 156, 0.5);
  transform: translateY(-2px);
}

/* Tamanhos */
.btn--md  { padding: 10px 24px; font-size: 14px; }
.btn--lg  { padding: 14px 32px; font-size: 16px; }
.btn--xl  { padding: 18px 40px; font-size: 18px; }
```

### 5.2 Título de Seção (.section-title)

```css
.section-title {
  font-size: var(--font-size-4xl); /* 48px */
  font-weight: 700;
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-md);
}

.section-subtitle {
  font-size: var(--font-size-lg); /* 20px */
  font-weight: 300;
  color: var(--color-text-secondary);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
```

### 5.3 Text Accent (.text-accent)

```css
.text-accent {
  color: var(--color-accent-light);
}
```

---

## 6. IDs Únicos para Elementos Interativos

| Elemento | ID | Propósito |
|----------|-----|-----------|
| Navbar | `navbar` | Scroll detection |
| Nav menu | `navMenu` | Toggle mobile |
| Nav toggle button | `navToggle` | Mobile hamburger |
| Hero section | `hero` | Anchor link |
| Hero CTA | `hero-cta` | Tracking |
| Problemas section | `problemas` | Anchor link |
| Método section | `metodo` | Anchor link |
| Serviços section | `servicos` | Anchor link |
| Resultados section | `resultados` | Anchor link |
| CTA section | `cta` | Anchor link |
| Final CTA | `final-cta` | Tracking |

---

## 7. Checklist de Validação

### Performance
- [ ] Lighthouse Performance ≥ 90
- [ ] FCP < 1.0s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Total page size < 100KB (sem imagens)

### Responsividade
- [ ] Desktop 1920×1080 — layout correto
- [ ] Desktop 1366×768 — layout correto
- [ ] Tablet 768×1024 — layout adaptado
- [ ] Mobile 375×812 (iPhone) — coluna única
- [ ] Mobile 360×640 (Android) — coluna única

### Acessibilidade
- [ ] Contraste WCAG AA
- [ ] Navegação por teclado
- [ ] aria-labels nos botões
- [ ] Alt text nas imagens
- [ ] prefers-reduced-motion respeitado

### Funcionalidade
- [ ] Todos os links WhatsApp funcionam
- [ ] Smooth scroll funciona
- [ ] Menu mobile abre/fecha
- [ ] Animações de scroll disparam
- [ ] Contadores animam
- [ ] Navbar blur ativa ao rolar

### SEO
- [ ] Meta title presente
- [ ] Meta description presente
- [ ] Apenas 1 `<h1>`
- [ ] Hierarquia h1 → h2 → h3
- [ ] HTML semântico
- [ ] Open Graph tags

### Cross-browser
- [ ] Chrome ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Edge ✓
- [ ] iOS Safari ✓
- [ ] Chrome Android ✓
