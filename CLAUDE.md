# AERA × MITANG — proposta comercial HTML

Documento mestre: `../MITANG_AERA_HTML_PROPOSAL_BRIEF_V1.md`. Trabalho em passes
(§39) com aprovação do Tiago entre eles. Não publicar, não commitar, não deployar
sem ordem explícita.

## Stack

Next.js 16 + React 19 + Tailwind v4 + GSAP (ScrollTrigger só onde agrega, a
partir do PASS 03). Sem Lenis, sem Framer, sem Three.js. `turbopack.root` fixado
em `next.config.ts` (existe `~/package-lock.json`).

## Fundação (portada do site AERA, `~/Desktop/landing AERA/new-3d-landbase`)

- Instrument Sans (display + corpo, eixo `wdth`) e Geist Mono (índices e coordenadas).
- Tokens em `src/app/globals.css`: `.state-dark` / `.state-light`, grid de 12
  colunas (4 abaixo de 1024) via `.aera-grid` e `gridX(k)`.
- `src/components/aera-field/`: réguas, nós e setas alinhados ao grid.
- `src/components/motion/useGsapContext.ts`: um escopo GSAP por cena, dividido
  por breakpoint e reduced motion.

## Decisões (23/09/2026)

- Headlines em sentence case; caps só em labels técnicos curtos.
- Inglês só em rótulos de sistema (Intelligence, Account map…); narrativa em PT.
- Contato: `sales@aera.company`.
- Logo MITANG: wordmark tipográfico placeholder (`MitangWordmark`) até o arquivo oficial.
- Cores MITANG: teal `#0D6873`, petróleo `#021C25` (tokens `--teal`, `--petrol`),
  só como informação ativa. O PASS 01 ainda usa só neutros.
- Valores: R$ 9.800 + R$ 14.500/mês. A variante §25 não entra.

## Estrutura

`src/app/page.tsx` compõe 15 seções em 5 atos. Seções em
`src/components/proposal/`; conteúdo e listas em `src/lib/constants.ts`.
`?h=en` mostra a headline alternativa da hero ("From signal to opportunity").

## Motion (PASS 03+)

- `<html class="motion">` é posto por script inline só sem reduced motion; os
  estados iniciais em `globals.css` ficam sob `.motion`. Se nenhuma cena marcar
  `window.__motionReady` em 3s, a classe sai (conteúdo nunca fica preso escondido).
- Cada cena: `useGsapContext` com condições desktop / mobile / reduce e setup em
  `src/components/proposal/motion/*.ts`.
- Reframe (vaga → operação): palco sticky em CSS (`.rf-track` 320vh + `.rf-stage`)
  só em ≥1024px sem reduced motion; abaixo disso, fluxo editorial (`.rf-flow`).
- Sem pin via JS, sem scroll hijacking, sem Lenis.
- Hook padrão das cenas: `useScene(scope, play)` em `motion/useScene.ts`.
- QA de motion em `scripts/qa/` (Chrome headless via CDP, sem dependências):
  `scenes.mjs` (cenas por rolagem ou por tempo, a partir de um plano JSON),
  `fullpage.mjs` (página inteira já assentada; aceita `mobile` e `reduce`) e
  `sheet.py` (pranchas), `hover.mjs` (estado de hover). Flag `h=720` muda a
  altura da viewport. Id começando por dígito: usar `[id="90-dias"]`.

## Comandos

`npm run dev -- -p 3040` · `npm run build` · `npm start -- -p 3041` · `npm run lint`.
Launch configs em `../.claude/launch.json`. QA em `docs/qa/pass-XX/`.
