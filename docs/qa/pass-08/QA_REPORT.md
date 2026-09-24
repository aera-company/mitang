# AERA × MITANG — QA final (PASS 08)

Data: 24/09/2026 · Build de produção local (`npm start -- -p 3041`). Nada publicado.

## Checklist §38

| Item | Resultado | Como foi verificado |
|---|---|---|
| Revisar todo o texto | OK | Varredura editorial; nenhum termo vetado (§35) |
| Validar valores | OK | R$ 9.800 (implantação) · R$ 14.500/mês (operação). Variante §25 (R$ 12.500) ausente do código |
| Validar contato | OK | `sales@aera.company` (decisão 23/09); `tiago@` ausente |
| Validar logo AERA | OK | Marca aprovada do site AERA (`public/brand/aera-mark.png`) |
| Validar logo MITANG | **Pendente** | Wordmark tipográfico placeholder até o arquivo oficial |
| Desktop 1440 / 1280 | OK | Página inteira capturada, cenas conferidas |
| Tablet (768) | OK | Degrau tipográfico próprio; radar da hero ajustado |
| iPhone | OK (emulado) | Chrome 390 + WebKit com o perfil iPhone 15. Falta testar num aparelho real |
| Safari | OK (WebKit) | Playwright WebKit 26.6: sticky, clip-path e scrub funcionam; 0 erros. Falta testar no Safari do Mac |
| Chrome | OK | Headless, todas as larguras |
| Reduced motion | OK | Tudo aparece estático no estado final; sem `.motion` |
| Sem overflow horizontal | OK | 1440, 1280, 1024, 768, 390 |
| Sem layout shift relevante | OK | CLS 0 (Lighthouse e PerformanceObserver) |
| Sem erro de console | OK | Chrome e WebKit, desktop e mobile |
| `npm run lint` | OK | |
| `npm run typecheck` | OK | Script adicionado neste passe |
| `npm run build` | OK | |
| Lighthouse | OK | Ver abaixo |
| Revisão visual por screenshots | OK | `final/` e `webkit/` |

## Lighthouse

| | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Desktop | 100 | 96 | 100 | 63* |
| Mobile | 95 | 96 | 100 | 63* |

\* SEO baixo de propósito: a proposta tem `noindex, nofollow` e `robots.txt` bloqueando tudo.

Desktop: LCP 0,6 s · TBT 0 ms · CLS 0 · FCP 0,3 s. Mobile (4G simulado): LCP 2,9 s · TBT 80 ms.

Acessibilidade 96: o que resta são falsos positivos de contraste nas etapas que só acendem com a rolagem
(cadeia do problema, fluxo). O Lighthouse fotografa esses elementos ainda apagados, no meio da animação.

## Correções feitas neste passe

- `aria-label` inválido em `<p>` (indicador abre/avança/fecha) → removido; o texto visível já descreve.
- Cinza secundário sobre papel 4,45:1 → 5,09:1 (`--muted-light` 0,58 → 0,62).
- Títulos de duas linhas sem espaço entre as linhas no texto acessível → espaço explícito.

## Acessibilidade estrutural

- Ordem de tabulação: pular para o conteúdo → explorar proposta → CTA; foco visível nos três.
- Um `h1`; `h2` por seção; `h3` nos módulos, fases e colunas do time.
- 14/14 seções com `aria-labelledby` válido; sem ids duplicados; `lang="pt-BR"`.
- SVGs decorativos com `aria-hidden`; a cena visual da vaga tem texto `sr-only` equivalente.

## Pendências (fora do código)

1. Logo oficial da MITANG.
2. Teste num iPhone e no Safari reais.
3. Decisões abertas do PASS 06: total do piloto (não exibido), pulso do radar no fechamento, assunto do e-mail.
4. Publicação: só com ordem do Tiago (repo próprio + hospedagem ainda não criados).
