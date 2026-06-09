import os

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Estetica
estetica = html.replace('<title>Origo Company — Sistema de Aquisição de Clientes</title>', '<title>Origo Company — Marketing para Clínicas e Estética</title>')
estetica = estetica.replace('Eu coloco <strong class="text-gradient">clientes qualificados</strong> no seu comercial todos os meses.', 'Eu loto a <strong class="text-gradient">agenda da sua clínica</strong> com pacientes particulares.')
estetica = estetica.replace('Você tá <span class="text-accent">perdendo dinheiro</span> todo mês e nem percebe.', 'Você tá <span class="text-accent">perdendo pacientes particulares</span> todo mês.')
estetica = estetica.replace('Quero mais clientes', 'Quero lotar minha agenda')
with open("estetica.html", "w", encoding="utf-8") as f:
    f.write(estetica)

# Advogados
advogados = html.replace('<title>Origo Company — Sistema de Aquisição de Clientes</title>', '<title>Origo Company — Marketing para Advogados</title>')
advogados = advogados.replace('Eu coloco <strong class="text-gradient">clientes qualificados</strong> no seu comercial todos os meses.', 'Eu trago <strong class="text-gradient">clientes jurídicos ideais</strong> para o seu escritório.')
advogados = advogados.replace('Você tá <span class="text-accent">perdendo dinheiro</span> todo mês e nem percebe.', 'Você tá <span class="text-accent">perdendo honorários</span> todo mês e nem percebe.')
advogados = advogados.replace('Quero mais clientes', 'Quero fechar mais contratos')
with open("advogados.html", "w", encoding="utf-8") as f:
    f.write(advogados)

# Solar
solar = html.replace('<title>Origo Company — Sistema de Aquisição de Clientes</title>', '<title>Origo Company — Marketing para Energia Solar</title>')
solar = solar.replace('Eu coloco <strong class="text-gradient">clientes qualificados</strong> no seu comercial todos os meses.', 'Receba <strong class="text-gradient">orçamentos de energia solar</strong> no seu WhatsApp.')
solar = solar.replace('Você tá <span class="text-accent">perdendo dinheiro</span> todo mês e nem percebe.', 'Você tá <span class="text-accent">comprando leads frios</span> todo mês e fechando pouco.')
solar = solar.replace('Quero mais clientes', 'Quero orçamentos diários')
with open("solar.html", "w", encoding="utf-8") as f:
    f.write(solar)

# Imoveis
imoveis = html.replace('<title>Origo Company — Sistema de Aquisição de Clientes</title>', '<title>Origo Company — Marketing para Imobiliárias</title>')
imoveis = imoveis.replace('Eu coloco <strong class="text-gradient">clientes qualificados</strong> no seu comercial todos os meses.', 'Atraia <strong class="text-gradient">compradores qualificados</strong> para os seus imóveis de alto padrão.')
imoveis = imoveis.replace('Você tá <span class="text-accent">perdendo dinheiro</span> todo mês e nem percebe.', 'Você tá <span class="text-accent">perdendo vendas</span> todo mês e nem percebe.')
imoveis = imoveis.replace('Quero mais clientes', 'Quero vender mais imóveis')
with open("imoveis.html", "w", encoding="utf-8") as f:
    f.write(imoveis)
