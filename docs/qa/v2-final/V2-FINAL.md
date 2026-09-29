# V2 final em /mitang (30/09, local, não publicada)

`/mitang` renderiza `ProposalV2`. `/mitang/proposta` sem mudança de conteúdo.
A rota `/mitang/v2` foi removida. A V1 longa fica preservada na tag v1.1.

## Arquitetura
Hero · 01 O desafio · 02 O problema real · 03 O que a AERA assume ·
04 Como a operação funciona (fluxo + quem faz o quê) · 05 MITANG Radar
(com a peça) · 06 Além da rotina · 07 Primeiros 90 dias + Como trabalhamos ·
08 Próximo passo.

## Extensão (V1 pública × V2)
- Seções: 17 → 9 (Hero + 8).
- Altura da página em 1440 com motion: 25.449 px → 13.871 px (−45%).
- Altura em 1440 com reduced motion: 23.590 px → 11.886 px (−50%).
- Palavras fora do mockup do Radar: 1.812 → 760 (−58%). Mockup intacto (248).

## QA
- Build, typecheck e lint ok.
- Chrome 1440, 1280, 768, 390: 0 erros, sem overflow, CLS 0, sem preço, CTA único.
- Reduced motion 1440 e 390: página inteira visível.
- Radar 1440 e 390: tabs, conta, avançar etapa, teclado.
- WebKit Safari 1440 + iPhone 15: 0 erros, sem overflow, nenhum preço, Radar ok.
- HTML, metadata e todos os scripts de /mitang sem R$, 9.800, 29.400,
  investimento, implantação, contratação, fee, orçamento, piloto ou desconto.
