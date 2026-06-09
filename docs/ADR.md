# ADRs — Architecture Decision Records

## Índice

1. [ADR-001: Tecnologia Base (HTML/CSS/JS Puro)](#adr-001)
2. [ADR-002: Design System e Tokens de Design](#adr-002)
3. [ADR-003: Estratégia de Responsividade](#adr-003)
4. [ADR-004: Estratégia de Animações](#adr-004)
5. [ADR-005: Carregamento de Fontes](#adr-005)
6. [ADR-006: Estratégia de Imagens](#adr-006)
7. [ADR-007: Integração com WhatsApp](#adr-007)
8. [ADR-008: Estrutura de Arquivos](#adr-008)

---

<a id="adr-001"></a>
## ADR-001: Tecnologia Base — HTML/CSS/JS Puro

### Status
✅ Aceito

### Contexto
A LP atual usa WordPress + Elementor, que gera HTML pesado (~2MB+), depende de múltiplos plugins pagos e tem performance ruim (LCP > 4s). Precisamos de uma solução leve e rápida.

### Decisão
Usar **HTML5 + CSS3 + JavaScript vanilla** sem frameworks ou build tools.

### Alternativas Consideradas

| Alternativa | Prós | Contras | Decisão |
|-------------|-------|---------|---------|
| **HTML/CSS/JS puro** | Zero dependências, máx. performance, fácil deploy | Sem componentização | ✅ Escolhido |
| **Vite + React** | Componentização, HMR | Overhead para LP simples, bundle maior | ❌ Rejeitado |
| **Next.js** | SSR, SEO built-in | Complexidade excessiva para LP estática | ❌ Rejeitado |
| **Astro** | Bom para estático | Curva de aprendizado, build necessário | ❌ Rejeitado |

### Justificativa
- Landing page é conteúdo estático sem interações complexas
- Performance é prioridade #1 (impacta diretamente conversão)
- Não há necessidade de gerenciamento de estado
- Deploy simples em qualquer hosting (Vercel, Netlify, S3, etc.)
- Zero vulnerabilidades de dependências

### Consequências
- ✅ Página carrega em < 1s
- ✅ Sem dependências para manter
- ✅ Qualquer dev pode editar
- ⚠️ CSS precisa ser bem organizado (sem CSS-in-JS)
- ⚠️ Animações complexas precisam ser manuais

---

<a id="adr-002"></a>
## ADR-002: Design System e Tokens de Design

### Status
✅ Aceito

### Contexto
Precisamos de um visual coeso e premium que transmita confiança e modernidade. O design atual usa dark mode com acentos em roxo.

### Decisão
Implementar um **design system via CSS Custom Properties** (variáveis CSS) com tokens semânticos.

### Tokens Definidos

#### Cores
```css
/* Cores Base */
--color-bg-primary: #0A0A0F;        /* Fundo principal — quase preto com tom azulado */
--color-bg-secondary: #111118;       /* Fundo de cards/seções alternadas */
--color-bg-tertiary: #1A1A25;        /* Fundo elevado (hovers, cards ativos) */

/* Acento (Roxo) */
--color-accent: #412A9C;             /* Roxo principal da marca */
--color-accent-light: #5B3FBF;       /* Roxo claro para hovers */
--color-accent-glow: rgba(65, 42, 156, 0.3); /* Glow/sombra */
--color-accent-subtle: rgba(65, 42, 156, 0.1); /* Fundo sutil */

/* Texto */
--color-text-primary: #FFFFFF;       /* Texto principal */
--color-text-secondary: #B0B0C0;     /* Texto secundário */
--color-text-muted: #6B6B80;         /* Texto desabilitado/sutil */

/* Gradientes */
--gradient-accent: linear-gradient(135deg, #412A9C 0%, #7B5FD4 100%);
--gradient-text: linear-gradient(135deg, #7B5FD4 0%, #A78BFA 50%, #C4B5FD 100%);
--gradient-bg: linear-gradient(180deg, #0A0A0F 0%, #111118 100%);
--gradient-card: linear-gradient(145deg, rgba(65, 42, 156, 0.15) 0%, rgba(10, 10, 15, 0.8) 100%);

/* Bordas */
--color-border: rgba(65, 42, 156, 0.2);
--color-border-hover: rgba(65, 42, 156, 0.5);
```

#### Tipografia
```css
--font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Scale (Major Third — 1.25) */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-md: 1.125rem;   /* 18px */
--font-size-lg: 1.25rem;    /* 20px */
--font-size-xl: 1.5rem;     /* 24px */
--font-size-2xl: 2rem;      /* 32px */
--font-size-3xl: 2.5rem;    /* 40px */
--font-size-4xl: 3rem;      /* 48px */
--font-size-5xl: 3.75rem;   /* 60px */
```

#### Espaçamento
```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
--space-4xl: 5rem;     /* 80px */
```

#### Efeitos
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-full: 9999px;

--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 20px rgba(65, 42, 156, 0.4);

--blur-glass: blur(12px);
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;
```

### Justificativa
- Custom Properties permitem temas e ajustes globais instantâneos
- Tokens semânticos separam "o que" do "como" (ex: `--color-accent` vs `#412A9C`)
- Escalas tipográficas e de espaçamento criam ritmo visual consistente
- Facilita manutenção futura (trocar cor da marca = 1 variável)

### Consequências
- ✅ Consistência visual garantida
- ✅ Fácil de ajustar/rebrandar
- ✅ Sem overhead de runtime (CSS nativo)
- ⚠️ Requer disciplina para não usar valores hardcoded

---

<a id="adr-003"></a>
## ADR-003: Estratégia de Responsividade

### Status
✅ Aceito

### Contexto
A LP precisa funcionar perfeitamente em mobile (onde chega ~70% do tráfego de anúncios), tablet e desktop.

### Decisão
Abordagem **desktop-first** com breakpoints bem definidos, usando CSS Grid e Flexbox.

### Breakpoints

| Nome | Range | Layout |
|------|-------|--------|
| Desktop | ≥ 1024px | 2 colunas no hero/método, grid 3×2 nos serviços |
| Tablet | 768px – 1023px | Layout adaptado, 2 colunas nos serviços |
| Mobile | < 768px | Coluna única, menu hamburger, tipografia reduzida |

### Padrões de Layout

```
Desktop (≥ 1024px):
┌──────────────────────────────────────┐
│  [Content 50%]  │  [Visual 50%]     │  ← Hero
├──────────────────────────────────────┤
│  [Card] [Card] [Card]               │  ← Problemas
├──────────────────────────────────────┤
│  [Image 50%]  │  [Content 50%]      │  ← Método
├──────────────────────────────────────┤
│  [Card] [Card] [Card]               │  ← Serviços (grid 3×2)
│  [Card] [Card] [Card]               │
└──────────────────────────────────────┘

Mobile (< 768px):
┌─────────────┐
│  [Content]  │  ← Hero
│  [Visual]   │
├─────────────┤
│  [Card]     │  ← Problemas
│  [Card]     │  (empilhados)
│  [Card]     │
├─────────────┤
│  [Content]  │  ← Método
├─────────────┤
│  [Card]     │  ← Serviços
│  [Card]     │  (coluna única)
│  ...        │
└─────────────┘
```

### Justificativa
- Desktop-first é mais natural para este design (criado pensando em desktop)
- CSS Grid para layouts complexos, Flexbox para alinhamento
- Breakpoints nos pontos onde o design "quebra", não em devices específicos

### Consequências
- ✅ Layout fluido em qualquer tela
- ✅ Sem media queries excessivas
- ⚠️ Testar em devices reais antes do deploy

---

<a id="adr-004"></a>
## ADR-004: Estratégia de Animações

### Status
✅ Aceito

### Contexto
A LP original usa animações do Elementor (`fadeInLeft`, `fadeInRight`, `fadeInUp`). Precisamos recriar isso de forma performática.

### Decisão
Usar **Intersection Observer API** para animações de scroll + **CSS transitions/keyframes** para micro-interações.

### Tipos de Animação

| Tipo | Tecnologia | Trigger |
|------|------------|---------|
| Fade-in ao scroll | IntersectionObserver + CSS classes | Scroll (viewport entry) |
| Contadores numéricos | JS `requestAnimationFrame` | Scroll (viewport entry) |
| Hover effects | CSS `:hover` transitions | Mouse hover |
| Floating cards (hero) | CSS `@keyframes` | Automático (loop) |
| Navbar blur | CSS + JS scroll listener | Scroll |
| Glow pulses | CSS `@keyframes` | Automático (loop) |

### Implementação

```javascript
// Intersection Observer para animações de scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target); // Uma vez só
    }
  });
}, { threshold: 0.1 });
```

### Acessibilidade
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Justificativa
- IntersectionObserver é mais performático que scroll listeners
- CSS transitions/keyframes usam GPU (não bloqueiam main thread)
- `prefers-reduced-motion` respeita preferências do usuário
- Animações são sutis e funcionais, não decorativas

### Consequências
- ✅ 60fps garantidos
- ✅ Zero jank visual
- ✅ Acessível para usuários com sensibilidade a movimento
- ⚠️ IntersectionObserver não funciona no IE11 (aceitável — fora do escopo)

---

<a id="adr-005"></a>
## ADR-005: Carregamento de Fontes

### Status
✅ Aceito

### Contexto
A fonte **Inter** é usada em toda a LP. Precisamos carregá-la sem causar FOIT (Flash of Invisible Text) ou FOUT (Flash of Unstyled Text) significativo.

### Decisão
Usar **Google Fonts com `preconnect`** e fallback system fonts.

### Implementação
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Pesos Necessários

| Peso | Uso |
|------|-----|
| 300 | Subtítulos, textos de apoio |
| 400 | Corpo de texto, descrições |
| 500 | Texto de ênfase moderada |
| 600 | Títulos de cards, método items |
| 700 | CTAs, títulos de seção |
| 800 | Hero headline (se necessário) |
| 900 | Números grandes (contadores) |

### Font Stack
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Justificativa
- `display=swap` evita FOIT (mostra fallback imediatamente)
- `preconnect` reduz latência de DNS/TLS em ~100-300ms
- Inter é uma fonte popular, provavelmente já em cache do usuário
- Stack de fallback garante que a página nunca fica sem texto

### Consequências
- ✅ Texto visível imediatamente (com fallback)
- ✅ Troca suave quando Inter carrega
- ⚠️ Dependência externa (Google Fonts) — mitigado pelo fallback
- ⚠️ FOUT leve nos primeiros milissegundos (aceitável)

---

<a id="adr-006"></a>
## ADR-006: Estratégia de Imagens

### Status
✅ Aceito

### Contexto
A LP original referencia imagens hospedadas em `lp.origoprod.com`. Precisamos decidir como tratar essas imagens na nova versão.

### Decisão
Para a v1, usar **placeholders visuais com CSS** (gradientes, ícones, formas) nos locais que precisariam de imagens reais. O usuário pode substituir depois com as imagens reais.

### Mapeamento de Imagens

| Local | Original | Solução v1 |
|-------|----------|-----------|
| Hero visual (direita) | `Voce-esta-1.png` | Cards flutuantes animados com ícones SVG |
| Foto do Renato | `Renato3.avif` | Placeholder estilizado com ícone de perfil |
| Background hero | `Background-4.png` | Gradiente CSS + orbs animados |
| Background método | `Fundo-roxo-com-Azul-scaled.jpg` | Gradiente CSS |

### Quando Imagens Reais Forem Adicionadas
```html
<!-- Formato recomendado -->
<picture>
  <source srcset="imagem.avif" type="image/avif">
  <source srcset="imagem.webp" type="image/webp">
  <img src="imagem.jpg" alt="Descrição" loading="lazy" width="600" height="400">
</picture>
```

### Justificativa
- Placeholders CSS não têm custo de rede (carregam instantaneamente)
- Mantém o design coeso mesmo sem as imagens originais
- `loading="lazy"` para imagens abaixo do fold quando forem adicionadas
- Formatos modernos (AVIF > WebP > JPG) para melhor compressão

### Consequências
- ✅ Zero dependências externas de imagem
- ✅ Performance máxima
- ⚠️ Menos impacto visual que fotos reais (mitigado com design cuidadoso)
- ⚠️ Usuário precisa substituir depois com assets reais

---

<a id="adr-007"></a>
## ADR-007: Integração com WhatsApp

### Status
✅ Aceito

### Contexto
O principal canal de conversão é o WhatsApp. Todos os CTAs direcionam para lá.

### Decisão
Usar **links `wa.me`** com mensagem pré-preenchida (opcional).

### Implementação
```
URL base: https://wa.me/5581985647633
Com mensagem: https://wa.me/5581985647633?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20M%C3%A9todo%20R.E.I
```

### CTAs na Página

| Local | Texto do CTA | Mensagem WhatsApp |
|-------|--------------|-------------------|
| Navbar | "Falar com Especialista" | (sem mensagem) |
| Hero | "Quero aumentar meu faturamento" | (sem mensagem) |
| Método | "Quero aumentar meu faturamento" | (sem mensagem) |
| CTA Final | "Falar com Especialista no WhatsApp" | (sem mensagem) |

### Atributos dos Links
```html
<a href="https://wa.me/5581985647633" 
   target="_blank" 
   rel="noopener noreferrer"
   aria-label="Abrir conversa no WhatsApp">
```

### Justificativa
- `wa.me` é o formato oficial do WhatsApp Business
- Funciona em desktop (WhatsApp Web) e mobile (app)
- `target="_blank"` não interrompe a navegação na LP
- `rel="noopener noreferrer"` por segurança

### Consequências
- ✅ Conversão direta e imediata
- ✅ Funciona em qualquer dispositivo
- ✅ Sem formulário — menor fricção
- ⚠️ Depende do WhatsApp estar instalado/configurado

---

<a id="adr-008"></a>
## ADR-008: Estrutura de Arquivos

### Status
✅ Aceito

### Contexto
Precisamos organizar o projeto de forma clara e manutenível.

### Decisão

```
LP NOVA/
├── docs/                    # Documentação do projeto
│   ├── PRD.md              # Product Requirements Document
│   ├── ADR.md              # Architecture Decision Records
│   └── SPEC.md             # Especificação técnica (Spec-Driven)
│
├── assets/                  # Assets estáticos
│   ├── images/             # Imagens (quando adicionadas)
│   └── icons/              # Ícones (se necessário separar)
│
├── index.html              # Página principal (única)
├── styles.css              # Todos os estilos
├── script.js               # Toda a lógica JS
└── README.md               # Instruções de uso e deploy
```

### Justificativa
- **Arquivo único por tipo**: Para uma LP, não há necessidade de split em múltiplos arquivos CSS/JS
- **Pasta docs/**: Documentação separada do código de produção
- **Pasta assets/**: Preparada para quando o usuário adicionar imagens reais
- **Flat structure**: Sem aninhamento desnecessário para um projeto simples

### Consequências
- ✅ Fácil de navegar e entender
- ✅ Deploy simples (copiar arquivos para hosting)
- ✅ Sem build step necessário
- ⚠️ Se o projeto crescer significativamente, repensar a estrutura
