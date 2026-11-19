/* Origo Company · efeitos da página (sem biblioteca).
   1. Blocos aparecem ao rolar e números contam até o valor.
   2. Luz suave que segue o mouse na abertura.
   3. Conversa da IA no WhatsApp acontece conforme a rolagem.
   Tudo para quando o aparelho pede "reduzir movimento". */
(function () {
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var celular = window.matchMedia('(max-width: 860px)');
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function contar(el) {
    var alvo = parseInt(el.getAttribute('data-alvo'), 10);
    if (!alvo || reduzir) { el.textContent = String(alvo || el.textContent); return; }
    var t0 = null, dur = 1400;
    function passo(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(alvo * e).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(passo);
    }
    el.textContent = '0';
    requestAnimationFrame(passo);
  }

  // 1. entrada ao rolar + contadores
  if ('IntersectionObserver' in window && !reduzir) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.rv').forEach(function (el) { io.observe(el); });

    var ioN = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        contar(e.target);
        ioN.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    $$('.cnt').forEach(function (el) { ioN.observe(el); });
  } else {
    $$('.rv').forEach(function (el) { el.classList.add('in'); });
  }

  // 2. luz que segue o mouse
  var area = document.querySelector('.luz-area'), luz = document.querySelector('.luz');
  if (area && luz && !reduzir && window.matchMedia('(pointer: fine)').matches) {
    var pendente = false, x = 0, y = 0;
    area.addEventListener('pointermove', function (ev) {
      var r = area.getBoundingClientRect();
      x = ev.clientX - r.left; y = ev.clientY - r.top;
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(function () {
        luz.style.setProperty('--lx', x + 'px');
        luz.style.setProperty('--ly', y + 'px');
        pendente = false;
      });
    });
  }

  // 3. conversa no WhatsApp
  var palco = document.querySelector('.chat-palco');
  var msgs = palco ? $$('.m', palco) : [];
  function mostrarTudo() { msgs.forEach(function (m) { m.classList.add('on'); }); }
  if (palco && msgs.length) {
    if (reduzir) {
      mostrarTudo();
    } else {
      var ioC = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && celular.matches) { e.target.classList.add('on'); } });
      }, { threshold: 0.6 });
      msgs.forEach(function (m) { ioC.observe(m); });

      var agendado = false;
      function atualizar() {
        agendado = false;
        if (celular.matches) return;
        var r = palco.getBoundingClientRect();
        var faixa = r.height - window.innerHeight;
        var p = faixa > 0 ? Math.min(1, Math.max(0, -r.top / faixa)) : 1;
        msgs.forEach(function (m, i) { m.classList.toggle('on', p >= (i + 0.3) / (msgs.length + 0.5)); });
      }
      window.addEventListener('scroll', function () { if (!agendado) { agendado = true; requestAnimationFrame(atualizar); } }, { passive: true });
      window.addEventListener('resize', atualizar);
      atualizar();
    }
  }
})();

/* Clique no WhatsApp: evento para o Google Tag Manager (quando for instalado) */
(function () {
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href*="wa.me"]');
    if (!a) return;
    var sec = a.closest('section, header, footer');
    window.dataLayer.push({ event: 'whatsapp_click', secao: (sec && (sec.id || sec.tagName.toLowerCase())) || 'pagina' });
  });
})();

/* Carrossel de serviços: setas, pontinhos e teclado */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-car]'), function (car) {
    var trilho = car.querySelector('.car-trilho');
    var itens = Array.prototype.slice.call(trilho.children);
    var pontos = car.querySelector('.car-pontos');
    var ant = car.querySelector('[data-dir="-1"]'), prox = car.querySelector('[data-dir="1"]');
    function passo() { return itens.length > 1 ? itens[1].offsetLeft - itens[0].offsetLeft : trilho.clientWidth; }
    function porTela() { return Math.max(1, Math.round(trilho.clientWidth / passo())); }
    function paginas() { return Math.max(1, itens.length - porTela() + 1); }
    function atual() { return Math.round(trilho.scrollLeft / passo()); }
    function ir(i) { trilho.scrollTo({ left: Math.max(0, Math.min(paginas() - 1, i)) * passo(), behavior: 'smooth' }); }
    function montarPontos() {
      pontos.innerHTML = '';
      for (var i = 0; i < paginas(); i++) {
        var b = document.createElement('button');
        b.type = 'button'; b.setAttribute('aria-label', 'Ir para o serviço ' + (i + 1));
        b.addEventListener('click', ir.bind(null, i));
        pontos.appendChild(b);
      }
      marcar();
    }
    function marcar() {
      var a = atual(), n = paginas();
      Array.prototype.forEach.call(pontos.children, function (b, i) { b.classList.toggle('on', i === Math.min(a, n - 1)); });
      ant.disabled = trilho.scrollLeft < 4;
      prox.disabled = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4;
    }
    ant.addEventListener('click', function () { ir(atual() - 1); });
    prox.addEventListener('click', function () { ir(atual() + 1); });
    trilho.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(atual() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); ir(atual() - 1); }
    });
    var agendado = false;
    trilho.addEventListener('scroll', function () { if (!agendado) { agendado = true; requestAnimationFrame(function () { agendado = false; marcar(); }); } }, { passive: true });
    window.addEventListener('resize', montarPontos);
    montarPontos();
  });
})();
