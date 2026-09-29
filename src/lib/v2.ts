/* ============================================================
   V2 content (29/09): shorter, clearer about the service and about
   where AERA ends and MITANG's sales team begins. No pricing here.
   ============================================================ */

/** Act labels for the V2 reading. */
export const ACTS_V2 = {
  challenge: "I · Desafio",
  service: "II · Serviço",
  radar: "III · Radar",
  operation: "IV · Operação",
  closing: "V · Próximo passo",
} as const;

/** What AERA takes on: four fronts, one line each (30/09). */
export const FRONTS = [
  {
    n: "01",
    title: "Mercado & oportunidades",
    text: "Mapeamento de contas, projetos, sinais e decisores.",
  },
  {
    n: "02",
    title: "Prospecção & lead generation",
    text: "Listas, abordagens, cadências, follow-up e evolução até reunião qualificada.",
  },
  {
    n: "03",
    title: "Comunicação comercial",
    text: "Apresentações, cases, landing pages, conteúdos e materiais específicos para apoiar oportunidades.",
  },
  {
    n: "04",
    title: "Tecnologia & gestão",
    text: "CRM, pipeline, automações, IA, dashboards e MITANG Radar.",
  },
];

/** Where AERA ends and MITANG's sales team begins. */
export const HANDOFF = {
  aera: ["identifica", "pesquisa", "aborda", "nutre", "organiza", "prepara", "gera reunião"],
  mitang: ["valida tecnicamente", "desenvolve proposta", "negocia", "fecha"],
};

/** How the operation works: the path, with what happens at each step
    (absorbs market intelligence, ABM, lead generation and learning). */
export const FLOW_V2 = [
  { step: "Mercado", note: "Segmentos, projetos e movimentações lidos de forma contínua." },
  { step: "Sinal", note: "O fato que torna uma conta relevante agora." },
  { step: "Conta", note: "Prioridade por aderência aos serviços da MITANG." },
  { step: "Decisor", note: "Várias pessoas por conta: operação, engenharia, suprimentos." },
  { step: "Abordagem", note: "Mensagem e material por perfil, com cadência e follow-up." },
  { step: "Reunião", note: "Conversa qualificada, com contexto e histórico." },
  { step: "Oportunidade", note: "Nas mãos do comercial da MITANG." },
];

/** When an opportunity asks for a piece (example of how it works). */
export const PIECE_V2 = [
  "oportunidade identificada",
  "decisores mapeados",
  "falta um material específico",
  "AERA cria",
  "comercial entra mais preparado",
];

/** What stays beyond the routine. */
export const STAYS = [
  "Inteligência acumulada",
  "Processo organizado",
  "Tecnologia aplicada",
  "Materiais comerciais",
  "Sistema que evolui",
];

/** 90 days, trimmed to show evolution rather than everything possible. */
export const PHASES_V2 = [
  { range: "00–30 dias", verb: "Mapear", items: ["imersão", "ICP", "contas", "pipeline", "Radar V01"] },
  { range: "31–60 dias", verb: "Ativar", items: ["sinais", "decisores", "abordagens", "materiais", "prospecção"] },
  {
    range: "61–90 dias",
    verb: "Otimizar",
    items: ["performance", "objeções", "insights", "evolução do Radar", "próximas prioridades"],
  },
];

export const RHYTHM = [
  { when: "Semanal", what: "Reunião operacional" },
  { when: "Contínuo", what: "Execução remota" },
  { when: "Periódico", what: "Encontros presenciais" },
  { when: "Mensal", what: "Estratégia e performance" },
];
