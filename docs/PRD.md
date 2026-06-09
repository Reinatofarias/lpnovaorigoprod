# PRD — Landing Page Origo Company

## 1. Visão Geral

### 1.1 Produto
Landing Page institucional e de conversão para a **Origo Company**, agência de marketing digital especializada em ajudar empresas brasileiras a conquistar clientes qualificados nos Estados Unidos.

### 1.2 Objetivo
Criar uma landing page moderna, de alto impacto visual e alta taxa de conversão, que:
- Comunique claramente a proposta de valor da Origo Company
- Gere leads qualificados via WhatsApp
- Transmita autoridade e confiança com provas sociais
- Apresente o Método R.E.I como diferencial competitivo

### 1.3 Público-alvo
Empresários brasileiros que prestam serviços nos EUA e querem:
- Aumentar o número de clientes americanos
- Ter um processo estruturado de aquisição de clientes
- Deixar de depender de indicações e ter previsibilidade de vendas

### 1.4 Métricas de Sucesso
| Métrica | Meta |
|---------|------|
| Taxa de conversão (CTA → WhatsApp) | ≥ 5% |
| Tempo médio na página | ≥ 2 min |
| Taxa de rejeição (bounce) | ≤ 40% |
| Lighthouse Performance Score | ≥ 90 |
| Lighthouse Accessibility Score | ≥ 90 |

---

## 2. Contexto e Problema

### 2.1 Situação Atual
A Origo Company possui uma LP feita no Elementor (WordPress) que apresenta limitações de:
- **Performance**: Elementor gera HTML pesado com muitos scripts desnecessários
- **Manutenção**: Dependência de plugins pagos e atualizações do WordPress
- **Personalização**: Limitações visuais do page builder
- **SEO**: Estrutura HTML não otimizada

### 2.2 Solução Proposta
Landing page estática construída com HTML/CSS/JS puro, sem dependências de CMS, focada em:
- Performance máxima (< 1s de carregamento)
- Design premium com dark mode e acentos em roxo
- Animações suaves e micro-interações
- SEO otimizado desde a raiz
- Responsividade total (mobile-first)

---

## 3. Requisitos Funcionais

### 3.1 Navegação (Navbar)
| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | Logo da Origo Company no canto esquerdo | P0 |
| RF-02 | Menu com links âncora: Início, Problemas, Método, Serviços, Resultados | P0 |
| RF-03 | Botão CTA "Falar com Especialista" → WhatsApp | P0 |
| RF-04 | Navbar fixa no topo com efeito de blur ao rolar | P1 |
| RF-05 | Menu hamburger responsivo no mobile | P0 |
| RF-06 | Destaque visual no link ativo conforme scroll | P2 |

### 3.2 Seção Hero
| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-07 | Headline principal: "Aumente o número de clientes da sua empresa nos EUA." | P0 |
| RF-08 | Sub-headline: "Adquira clientes qualificados para os seus serviços nos Estados Unidos." | P0 |
| RF-09 | Texto de apoio com destaque em bold: "Sem fórmulas mágicas..." | P0 |
| RF-10 | Badge de prova social: "+200 projetos, 30-55% aumento em 6 meses" | P0 |
| RF-11 | Botão CTA: "Quero aumentar meu faturamento" → WhatsApp | P0 |
| RF-12 | Elemento visual/imagem no lado direito (desktop) | P1 |
| RF-13 | Animação de entrada (fade-in) nos elementos | P1 |
| RF-14 | Cards flutuantes com dados de resultado (animados) | P2 |

### 3.3 Seção Problemas ("3 Inimigos")
| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-15 | Título: "Hoje você tem 3 inimigos:" com "3 inimigos" em destaque | P0 |
| RF-16 | Subtítulo de resultado negativo | P0 |
| RF-17 | Card 01: "Anúncios que só atraem curiosos" | P0 |
| RF-18 | Card 02: "Funil que não responde na hora" | P0 |
| RF-19 | Card 03: "Oferta confusa" | P0 |
| RF-20 | Numeração grande e estilizada (01, 02, 03) | P1 |
| RF-21 | Efeito de hover nos cards com glow roxo | P2 |

### 3.4 Seção Método R.E.I
| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-22 | Imagem/foto do Renato (CEO) no lado esquerdo | P1 |
| RF-23 | Badge "O MÉTODO" com borda | P1 |
| RF-24 | Título: "Método R.E.I" com R.E.I em destaque | P0 |
| RF-25 | Subtítulo: "Relevância, Engrenagem, Iteração" (itálico) | P0 |
| RF-26 | Item ✓ Engrenagem: mecanismo único, público qualificado, promessa simples | P0 |
| RF-27 | Item ✓ Relevância: anúncios + páginas + automações (24/7) | P0 |
| RF-28 | Item ✓ Iteração: medir o que importa e ajustar rápido | P0 |
| RF-29 | Botão CTA: "Quero aumentar meu faturamento" → WhatsApp | P0 |

### 3.5 Seção Serviços ("O que eu faço POR VOCÊ")
| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-30 | Título com destaque em "POR VOCÊ" | P0 |
| RF-31 | Card: Estratégia — posicionamento, proposta de valor, oferta | P0 |
| RF-32 | Card: Landing Pages — páginas de alta conversão | P0 |
| RF-33 | Card: Automações — chatbots e fluxos 24/7 | P0 |
| RF-34 | Card: Tráfego Pago — anúncios que convertem | P0 |
| RF-35 | Card: CRM & Follow-up — gestão de leads | P0 |
| RF-36 | Card: Copywriting — mensagens persuasivas | P0 |
| RF-37 | Ícone SVG representativo em cada card | P1 |
| RF-38 | Efeito de hover com elevação e glow | P2 |

### 3.6 Seção Resultados (Social Proof)
| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-39 | Título: "Resultados que falam por si" | P0 |
| RF-40 | Contador animado: 200+ projetos | P0 |
| RF-41 | Contador animado: 55% aumento médio | P0 |
| RF-42 | Contador animado: 6 meses prazo | P0 |
| RF-43 | Badge: 24/7 automações ativas | P0 |
| RF-44 | Animação de contagem ao entrar na viewport | P1 |

### 3.7 Seção CTA Final
| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-45 | Headline persuasivo: "Pronto para conquistar o mercado americano?" | P0 |
| RF-46 | Texto de apoio mencionando o Método R.E.I | P0 |
| RF-47 | Botão CTA grande com ícone do WhatsApp | P0 |
| RF-48 | Efeito de glow/pulse no botão para chamar atenção | P2 |

### 3.8 Footer
| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-49 | Logo da Origo Company | P0 |
| RF-50 | Tagline da agência | P1 |
| RF-51 | Links de navegação | P1 |
| RF-52 | Links de contato (WhatsApp, Website) | P0 |
| RF-53 | Copyright © 2025 | P0 |

---

## 4. Requisitos Não-Funcionais

### 4.1 Performance
| ID | Requisito | Meta |
|----|-----------|------|
| RNF-01 | First Contentful Paint (FCP) | < 1.0s |
| RNF-02 | Largest Contentful Paint (LCP) | < 2.5s |
| RNF-03 | Cumulative Layout Shift (CLS) | < 0.1 |
| RNF-04 | Total Blocking Time (TBT) | < 200ms |
| RNF-05 | Tamanho total da página (sem imagens) | < 100KB |

### 4.2 Responsividade
| ID | Requisito |
|----|-----------|
| RNF-06 | Desktop: ≥ 1024px — layout em 2 colunas no hero e método |
| RNF-07 | Tablet: 768px–1023px — layout adaptado |
| RNF-08 | Mobile: < 768px — layout em coluna única, menu hamburger |
| RNF-09 | Breakpoints intermediários para transições suaves |

### 4.3 Acessibilidade
| ID | Requisito |
|----|-----------|
| RNF-10 | Contraste mínimo WCAG AA (4.5:1 para texto normal) |
| RNF-11 | Todos os elementos interativos com `aria-label` |
| RNF-12 | Navegação por teclado funcional |
| RNF-13 | Textos alternativos em imagens |
| RNF-14 | Fontes com tamanho mínimo de 16px no body |

### 4.4 SEO
| ID | Requisito |
|----|-----------|
| RNF-15 | Meta tags (title, description, viewport) |
| RNF-16 | Apenas 1 tag `<h1>` na página |
| RNF-17 | Hierarquia semântica de headings (h1 → h2 → h3) |
| RNF-18 | HTML5 semântico (`<nav>`, `<section>`, `<footer>`) |
| RNF-19 | Open Graph tags para compartilhamento |

### 4.5 Compatibilidade
| ID | Requisito |
|----|-----------|
| RNF-20 | Chrome, Firefox, Safari, Edge (últimas 2 versões) |
| RNF-21 | iOS Safari e Chrome Android |
| RNF-22 | Sem dependências externas (exceto Google Fonts) |

---

## 5. Conteúdo e Copy

### 5.1 Tom de Voz
- **Direto e confiante** — sem rodeios, vai ao ponto
- **Profissional mas acessível** — não é corporativo demais
- **Orientado a resultado** — sempre focado em números e provas
- **Urgência sutil** — criar senso de oportunidade sem ser agressivo

### 5.2 Palavras-chave
- Clientes qualificados EUA
- Marketing digital para empresas nos Estados Unidos
- Método R.E.I
- Tráfego pago EUA
- Automação de vendas
- Landing page de conversão

### 5.3 Dados para Prova Social
| Dado | Valor |
|------|-------|
| Projetos concluídos | +200 |
| Aumento médio de faturamento | 30% a 55% |
| Prazo médio de resultado | 6 meses |
| Automações ativas | 24/7 |

---

## 6. Assets Necessários

| Asset | Tipo | Status | Fonte |
|-------|------|--------|-------|
| Logo Origo Company | SVG/PNG | ⏳ A criar (texto estilizado) | — |
| Foto do Renato (CEO) | AVIF/WebP | ✅ Disponível | `Renato3.avif` |
| Background Hero | PNG | ✅ Disponível | `Background-4.png` |
| Imagem "Você está" | PNG | ✅ Disponível | `Voce-esta-1.png` |
| Background Roxo | JPG | ✅ Disponível | `Fundo-roxo-com-Azul-scaled.jpg` |
| Ícones dos serviços | SVG inline | ⏳ A criar | — |
| Favicon | ICO/PNG | ⏳ A criar | — |

---

## 7. Informações da Agência

| Campo | Valor |
|-------|-------|
| **Nome** | Origo Company |
| **CEO** | Renato |
| **Especialidade** | Marketing digital para brasileiros nos EUA |
| **Método proprietário** | R.E.I (Relevância, Engrenagem, Iteração) |
| **WhatsApp** | +55 81 98564-7633 |
| **Website atual** | lp.origoprod.com |
| **CTA principal** | "Quero aumentar meu faturamento" |

---

## 8. Cronograma (Estimativa)

| Fase | Descrição | Tempo |
|------|-----------|-------|
| Fase 1 | Documentação (PRD, ADR, Spec) | ✅ |
| Fase 2 | Design System (CSS) | ~30 min |
| Fase 3 | Estrutura HTML | ~20 min |
| Fase 4 | Estilização completa | ~40 min |
| Fase 5 | JavaScript (animações, interações) | ~20 min |
| Fase 6 | Responsividade e polish | ~20 min |
| Fase 7 | Testes e validação | ~10 min |

---

## 9. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Imagens externas ficarem fora do ar | Alto | Fazer fallback com gradients/placeholders |
| Fonte Inter não carregar | Médio | Definir fallback: `system-ui, -apple-system, sans-serif` |
| WhatsApp link não abrir no desktop | Baixo | Usar `https://wa.me/` que funciona em ambos |
| Animações pesadas no mobile | Médio | `prefers-reduced-motion` media query |

---

## 10. Fora de Escopo (v1)

- ❌ Blog / conteúdo dinâmico
- ❌ Sistema de agendamento online
- ❌ Formulário de contato com backend
- ❌ Área do cliente / login
- ❌ Multilíngue (EN/PT) — apenas PT-BR
- ❌ Analytics/tracking (pode ser adicionado depois)
