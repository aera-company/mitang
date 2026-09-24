# Revisão editorial 01 — 24/09/2026

Revisão cirúrgica pedida pelo Tiago sobre https://mitang-mu.vercel.app. Sem redesign: direção
visual, estrutura das seções, motion e os 90 dias (Mapear → Ativar → Otimizar) preservados.

## Redundâncias (Máquina AERA, Fluxo, Inteligência, ABM, Comunicação, IA)
- Módulos da Máquina AERA: de 7–8 itens para 3 cada, só o que as seções seguintes não detalham
  (radar, ABM, conteúdo e automação têm capítulo próprio).
- IA + automação: 11 usos → 6, sem repetir itens dos módulos.

## Escopo
- Novo texto logo abaixo do título: formatos, entregas e frentes priorizados mês a mês; o escopo
  define o que pode entrar, não um volume fixo de produção.
- Gestão: "priorização" → "priorização mensal das frentes".

## Português × inglês
- Módulos: Intelligence/Targeting/Connection/Learning → Inteligência/Contas/Conexão/Aprendizado.
- Entregas dos módulos: Mapa de contas, Cadências de abordagem, Pipeline comercial, Leitura de resultados.
- "Output" → "Entrega". Rótulo "Signal → Opportunity" → "Fluxo comercial".
- Canvas: Conta/Sinal/Aderência/Contato/Etapa; Alta/Média; Pesquisa/Contato/Conversa/Reunião.
- 90 dias: Mapa de contas v01; Abordagem, Conteúdo, Automação; Ciclo de aprendizado, Prioridades v02.
- Escopo: "account mapping" → "mapeamento de contas". Fechamento: Growth / Inteligência / Comunicação / Tecnologia.
- Mantidos por serem do mercado: ICP, CRM, pipeline, ABM, lead generation, follow-up, dashboard,
  LinkedIn, landing page, procurement, survey offshore, growth.

## Canvas comercial
- "SIMULAÇÃO / FORMATO ILUSTRATIVO" com explicação antes do radar e da tabela (desktop e mobile).
- Contas renomeadas "Exemplo A–D"; legenda "Canvas comercial · simulação".

## Métricas
- Removida a linha de cabeçalho "# Indicador Meta" e a coluna "após D30" (o texto ao lado já diz
  que as metas vêm depois do diagnóstico).

## Modelo comercial (substituído)
- Removidos: Implantação R$ 9.800, Operação R$ 14.500/mês e a timeline financeira.
- Novo: Piloto / 90 dias · R$ 9.800 / mês (protagonista) · descrição · implantação incluída ·
  custos de terceiros aprovados separadamente · investimento total do ciclo R$ 29.400 · nota
  secundária sobre a revisão ao fim dos 90 dias. Sem linguagem de desconto.

## QA
- lint, typecheck, build OK.
- Chrome: 1440, 1024, 768, 390 e reduced motion — sem erros de console, sem overflow horizontal.
- WebKit (Safari 1440 + iPhone 15): sem erros; sticky e cenas OK.
