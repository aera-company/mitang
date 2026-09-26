# AERA × MITANG · V1 apresentação + V1 comercial (26/09/2026)

## Rotas
- `/mitang`: Versão 01 · Apresentação / conversa. Sem investimento, sem condições comerciais,
  fecha em "Começar pela conversa." com "Agendar uma conversa" e "Conversar sobre a operação"
  (mailto sales@aera.company, assuntos distintos; sem calendário externo).
- `/mitang/proposta`: Versão 02 · Proposta comercial (piloto R$ 9.800/mês, total R$ 29.400).
- `/`: mantém a proposta comercial, para não quebrar o link já compartilhado.

Mesmos componentes, uma variante via contexto (`variant.tsx`). Só leem a variante: rótulo da
hero, rótulo do ato IV, a seção de investimento (só comercial), frase de orçamento e dois
itens do escopo, e o fechamento.

## Imagem oficial
- Origem: site público da MITANG, página Survey Positioning (mitang.com.br/survey-positioning),
  asset `177a24_b6e05ae0d50e4f58a1e09aed9e3dbef6~mv2.jpeg` (2420×1815). Convés de embarcação em operação.
- Tratamento: P&B embutido no arquivo, contraste levemente ajustado; next/image entrega AVIF/WebP
  no tamanho da tela (390 px no celular). Crédito na legenda.
- Posição escolhida: B, seção "O problema real". A (hero) competia com o radar e virava fundo
  atmosférico de stock; em B a foto é a pausa editorial que liga a tese ao mercado real.

## QA
lint · typecheck · build OK. Chrome 1440 / 1280 / 768 / 390 + reduced motion nas duas rotas;
WebKit Safari 1440 + iPhone 15 nas duas rotas. 0 erros de console, 0 overflow, CLS 0,
nenhuma seção duplicada, uma única imagem. Versão sem preço: nenhum "R$", nenhum termo de
investimento, orçamento ou contratação.
