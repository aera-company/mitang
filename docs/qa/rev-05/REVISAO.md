# Revisão 05 · Além da execução + MITANG Radar (26/09)

Local apenas, não publicado. As duas rotas compartilham os componentes:
/mitang/proposta já mostra a mesma estrutura e mantém só o bloco comercial
(R$ 9.800/mês · R$ 29.400), sem alteração de preço.

## Nova ordem
01 Hero · 02 Ponto de partida · 03 Problema real · 04 Máquina AERA · 05 Fluxo ·
06 Inteligência de mercado · 07 ABM · 08 Comunicação que vende · 09 IA + automação ·
**10 Além da execução** · **11 MITANG Radar** · 12 Primeiros 90 dias · 13 Como a AERA entra ·
14 Modelo de atuação · 15 Escopo · 16 Métricas · (17 Modelo comercial, só /proposta) ·
17/18 Próximo passo.

## Novo
- `Beyond.tsx` + `motion/beyondMotion.ts`: 5 blocos editoriais com números grandes;
  no desktop, diagrama de camadas sticky que empilha uma camada por bloco lido
  (reversível), sobre a linha "Rotina comercial em andamento".
- `MitangRadar.tsx` + `ui/RadarApp.tsx` + `motion/radarMotion.ts` + `lib/radar.ts`:
  interface V01 (tabs Radar/Contas/Decisores/Pipeline/Insights, conta selecionada,
  avançar etapa, reiniciar), AERA AI Brief, Antes × Com a operação, sequência
  inteligência + criação (exemplo fictício de descomissionamento).
- Dados: 5 contas fictícias (Operadora A, EPC B, Renováveis C, Operadora D,
  Integradora E). Só os nomes dos serviços MITANG são reais (site público).

## Reduções para manter o ritmo
- 06 Inteligência de mercado: saiu o canvas com 4 linhas simuladas (o formato
  completo agora vive no Radar). Ficaram o radar e os 5 campos que a leitura registra,
  com link para a seção 11.
- 09 IA + automação: saiu "A decisão comercial continua humana." (agora no AI Brief).
- 12 Primeiros 90 dias: itens que viraram trilha do Radar saíram das listas
  (stack/CRM, critérios, primeiro radar, automações); cada fase ganhou a linha
  "MITANG Radar · Estruturar / Alimentar / Evoluir".
- `DEMO_ROWS` removido de `constants.ts`.

## QA
Build e lint ok. Chrome 1440/1280/768/390 e reduced motion: 0 erros, sem overflow,
CLS 0. /mitang sem preço e sem termos proibidos. WebKit Safari 1440 + iPhone 15:
0 erros, tabs e avançar etapa funcionando. Teclado: setas/Home/End nas tabs,
contas são botões com aria-pressed, anúncio aria-live da conta selecionada.
