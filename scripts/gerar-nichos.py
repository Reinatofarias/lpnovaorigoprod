"""Gera as páginas de nicho (advogados, estetica, imoveis, solar) a partir do index.html.

Uso: python3 scripts/gerar-nichos.py
Cada nicho troca só o que é dele: título, abertura, conversa de exemplo da IA,
textos dos títulos de serviços e chamada final, e a mensagem do WhatsApp.
Rode de novo sempre que o index.html mudar, para os nichos acompanharem.
"""
import re
import urllib.parse
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
BASE = (RAIZ / 'index.html').read_text(encoding='utf-8')

NICHOS = {
    'advogados': {
        'titulo': 'Marketing para escritórios de advocacia · Origo Company',
        'descricao': 'Clientes certos chegando ao seu escritório pelo Google e pelo WhatsApp, dentro das regras da OAB. Tráfego pago, site e IA no atendimento. Diagnóstico gratuito.',
        'h1': 'Clientes certos chegando ao seu escritório, <span class="grad">sem depender só de indicação.</span>',
        'sub': 'Google Ads, site e IA no WhatsApp para escritórios de advocacia, com comunicação informativa e dentro das regras da OAB. Você atende quem já procura a sua área.',
        'desafio': 'Qual é o desafio do <span class="grad">seu escritório hoje?</span>',
        'final': 'Conte como o seu escritório capta clientes hoje. <span class="grad">A gente indica por onde começar.</span>',
        'wa': 'escritório de advocacia',
        'chat_nome': 'Escritório exemplo',
        'chat': ['Boa noite. Meu benefício do INSS foi negado, vocês atendem esse tipo de caso?',
                 'Atendemos sim. Para entender melhor: o pedido foi de aposentadoria ou de auxílio?',
                 'Aposentadoria por idade. Negaram mês passado.',
                 'Entendi. A advogada pode avaliar o seu caso amanhã às 10h ou às 15h. Qual fica melhor?',
                 'Amanhã às 15h.',
                 'Consulta marcada · amanhã, 15h'],
    },
    'estetica': {
        'titulo': 'Marketing para clínicas e estética · Origo Company',
        'descricao': 'Agenda da sua clínica com mais pacientes particulares: tráfego pago, site e IA no WhatsApp que responde e agenda. Diagnóstico gratuito.',
        'h1': 'Agenda da sua clínica cheia, <span class="grad">com pacientes particulares.</span>',
        'sub': 'Anúncio para quem procura o seu procedimento, página que convence e IA no WhatsApp que responde na hora e agenda a avaliação. Você cuida dos pacientes.',
        'desafio': 'Qual é o desafio da <span class="grad">sua clínica hoje?</span>',
        'final': 'Conte como a sua clínica atrai pacientes hoje. <span class="grad">A gente indica por onde começar.</span>',
        'wa': 'clínica',
        'chat_nome': 'Clínica exemplo',
        'chat': None,  # mantém a conversa do site principal (clareamento)
    },
    'imoveis': {
        'titulo': 'Marketing para imobiliárias e corretores · Origo Company',
        'descricao': 'Compradores qualificados para os seus imóveis: tráfego pago, páginas de imóvel e IA no WhatsApp que qualifica e agenda visita. Diagnóstico gratuito.',
        'h1': 'Compradores qualificados para os seus imóveis, <span class="grad">sem correr atrás de curioso.</span>',
        'sub': 'Anúncio para quem está procurando imóvel na sua região, página de cada empreendimento e IA no WhatsApp que qualifica o comprador e agenda a visita.',
        'desafio': 'Qual é o desafio da <span class="grad">sua imobiliária hoje?</span>',
        'final': 'Conte como você capta compradores hoje. <span class="grad">A gente indica por onde começar.</span>',
        'wa': 'imobiliária',
        'chat_nome': 'Imobiliária exemplo',
        'chat': ['Oi, vi o anúncio do apartamento de 3 quartos. Ainda está disponível?',
                 'Está sim! Você pretende financiar ou comprar à vista?',
                 'Financiar. Já tenho a carta de crédito aprovada.',
                 'Ótimo! O corretor pode te mostrar o apartamento sábado às 9h ou às 11h. Qual prefere?',
                 'Sábado às 11h.',
                 'Visita marcada · sábado, 11h'],
    },
    'solar': {
        'titulo': 'Marketing para energia solar · Origo Company',
        'descricao': 'Pedidos de orçamento de energia solar no seu WhatsApp: tráfego pago, página que convence e IA que qualifica pela conta de luz. Diagnóstico gratuito.',
        'h1': 'Pedidos de orçamento de energia solar <span class="grad">chegando no seu WhatsApp.</span>',
        'sub': 'Anúncio para quem quer reduzir a conta de luz, página que explica a economia e IA no WhatsApp que pede a conta, qualifica e marca a visita técnica.',
        'desafio': 'Qual é o desafio da <span class="grad">sua empresa de energia solar?</span>',
        'final': 'Conte como você capta clientes hoje. <span class="grad">A gente indica por onde começar.</span>',
        'wa': 'empresa de energia solar',
        'chat_nome': 'Solar exemplo',
        'chat': ['Oi, minha conta de luz vem uns R$ 600. Vale a pena colocar placa?',
                 'Com esse valor costuma valer, sim! O imóvel é casa ou empresa? E o telhado é de cerâmica ou laje?',
                 'Casa, telhado de cerâmica.',
                 'Perfeito. Me manda uma foto da conta de luz que o técnico já leva o orçamento na visita. Terça às 8h ou quinta às 14h?',
                 'Quinta às 14h. Já mando a foto.',
                 'Visita técnica marcada · quinta, 14h'],
    },
}


def trocar(html, padrao, novo, contagem=1, regex=False):
    if regex:
        html2, n = re.subn(padrao, lambda m: novo, html, count=contagem, flags=re.S)
    else:
        n = html.count(padrao)
        html2 = html.replace(padrao, novo, contagem)
    if n == 0:
        raise SystemExit(f'não achei: {padrao[:80]}')
    return html2


def gerar(slug, n):
    h = BASE
    h = trocar(h, r'<title>.*?</title>', f'<title>{n["titulo"]}</title>', regex=True)
    h = trocar(h, r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{n["descricao"]}">', regex=True)
    h = trocar(h, r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{n["titulo"]}">', regex=True)
    h = trocar(h, r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{n["descricao"]}">', regex=True)
    h = re.sub(r'(<h1 class="h1"[^>]*>).*?(</h1>)', lambda m: m.group(1) + n['h1'] + m.group(2), h, count=1, flags=re.S)
    h = re.sub(r'(<p style="margin: 0; font-size: 19px; color: #9AA0BC; max-width: 540px">).*?(</p>)', lambda m: m.group(1) + n['sub'] + m.group(2), h, count=1, flags=re.S)
    h = trocar(h, 'Qual é o desafio do <span class="grad">seu negócio hoje?</span>', n['desafio'])
    h = trocar(h, 'Conte qual é o desafio do seu negócio. <span class="grad">A gente indica por onde começar.</span>', n['final'])
    h = trocar(h, '<strong style="font-size: 15px">Clínica exemplo</strong>', f'<strong style="font-size: 15px">{n["chat_nome"]}</strong>')
    if n['chat']:
        for i, txt in enumerate(n['chat'], 1):
            if i < 6:
                h = re.sub(rf'(<div class="m m{i}"[^>]*>).*?(<span style="display: block; font-size: 11px)', lambda m, t=txt: m.group(1) + t + m.group(2), h, count=1, flags=re.S)
            else:
                h = re.sub(r'(<div class="m m6"[^>]*>).*?(</div>)', lambda m, t=txt: m.group(1) + t + m.group(2), h, count=1, flags=re.S)
    # mensagens do WhatsApp dizem o nicho
    marca = urllib.parse.quote(f' ({n["wa"]})')
    h = re.sub(r'(https://wa\.me/5581985647633\?text=[^"]*?)(")', lambda m: m.group(1) + marca + m.group(2), h)
    # canonical e og:url
    url = f'https://www.origocompany.org/{slug}'
    h = h.replace('<meta name="twitter:card"', f'<link rel="canonical" href="{url}">\n<meta property="og:url" content="{url}">\n<meta name="twitter:card"', 1)
    (RAIZ / f'{slug}.html').write_text(h, encoding='utf-8')
    print('ok', slug)


if __name__ == '__main__':
    for slug, dados in NICHOS.items():
        gerar(slug, dados)
