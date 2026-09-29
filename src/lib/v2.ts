/* ============================================================
   /mitang · final (01/10). Built from the MITANG job post
   (Marketing & Lead Generation): AERA is the operation the post
   describes; the MITANG Radar is its infrastructure. No pricing here.
   ============================================================ */

export const ACTS_V2 = {
  start: "I · Ponto de partida",
  operation: "II · Operação",
  infra: "III · Infraestrutura",
  closing: "IV · Próximo passo",
} as const;

/** The post, as MITANG wrote it (quoted, not paraphrased). */
export const JOB = {
  title: "Analista / Especialista de Marketing & Lead Generation",
  quote: "Marketing aqui não termina no lead.",
};

/** MITANG's public fronts (site), used only as context, never explained. */
export const MITANG_FRONTS = [
  "Survey Positioning",
  "Bathymetric & Geophysical",
  "ROC",
  "Descomissionamento",
  "Construction Support",
  "Onshore Support",
  "Renewable",
];

/** What AERA takes on: four fronts. */
export const FRONTS = [
  {
    n: "01",
    title: "Demanda",
    purpose: "Criar razões para o mercado conversar com a MITANG.",
    items: [
      "campanhas de geração de demanda",
      "LinkedIn",
      "e-mail marketing",
      "conteúdo B2B",
      "ações pós-evento",
      "mídia paga quando fizer sentido",
      "campanhas por serviço ou segmento",
      "landing pages específicas",
    ],
  },
  {
    n: "02",
    title: "Prospecção",
    purpose: "Encontrar e abrir as contas certas.",
    items: [
      "ICP",
      "listas qualificadas",
      "mapeamento de contas",
      "decisores",
      "Sales Navigator quando aplicável",
      "outbound",
      "abordagens e cadências",
      "nutrição e follow-up",
      "reuniões qualificadas",
    ],
  },
  {
    n: "03",
    title: "Comunicação comercial",
    purpose: "Dar ao Comercial os argumentos e materiais que cada oportunidade pede.",
    items: [
      "apresentações",
      "cases",
      "one-pages",
      "landing pages",
      "vídeo",
      "conteúdo técnico",
      "mensagens",
      "materiais para reunião",
      "posicionamento quando necessário",
    ],
  },
  {
    n: "04",
    title: "Inteligência & operação",
    purpose: "Fazer tudo isso funcionar como processo.",
    items: [
      "CRM",
      "pipeline",
      "classificação",
      "métricas de conversão",
      "automações",
      "dashboards",
      "aprendizado",
      "MITANG Radar",
    ],
  },
];

/** From market to opportunity. `owner`: who carries the step. */
export const FLOW_V2 = [
  { step: "Sinal", note: "Identificamos uma movimentação relevante.", owner: "AERA" },
  { step: "Contas", note: "Definimos quais empresas fazem sentido.", owner: "AERA" },
  { step: "Decisores", note: "Encontramos por onde entrar.", owner: "AERA" },
  { step: "Estratégia", note: "Escolhemos mensagem, oferta e canal.", owner: "AERA" },
  {
    step: "Ativação",
    note: "LinkedIn, e-mail, outbound, campanha, evento, conteúdo ou mídia.",
    owner: "AERA",
  },
  { step: "Follow-up", note: "Trabalhamos a relação até existir contexto para reunião.", owner: "AERA" },
  { step: "Reunião", note: "O Comercial MITANG entra mais preparado.", owner: "AERA + MITANG" },
  { step: "Oportunidade", note: "A MITANG conduz proposta, negociação e fechamento.", owner: "MITANG" },
];

/** Who does what along the way. */
export const HANDOFF = {
  aera: ["pesquisa", "planeja", "cria", "ativa", "aborda", "nutre", "acompanha", "mede", "organiza"],
  mitang: ["valida tecnicamente", "entra na conversa", "constrói proposta", "negocia", "fecha"],
};

/** A market signal may ask for any of these, or a mix. */
export const RESPONSES = [
  "contato direto",
  "campanha",
  "conteúdo",
  "landing page",
  "case",
  "mídia",
  "apresentação",
];

export const COMPETENCIES = ["Estratégia", "Growth", "Criação", "Tecnologia", "Gestão"];

/** The first 90 days, concrete. No volume targets before the diagnosis. */
export const PHASES_V2 = [
  {
    range: "00–30 dias",
    verb: "Estruturar",
    items: [
      "imersão com Comercial e liderança",
      "frentes e serviços prioritários",
      "ICP e segmentos",
      "mapeamento de contas",
      "auditoria de base, CRM e materiais",
      "estrutura de mensagens",
      "Radar V01",
      "plano do primeiro ciclo de ativação",
    ],
  },
  {
    range: "31–60 dias",
    verb: "Colocar no mercado",
    items: [
      "primeiras listas e contas",
      "decisores",
      "campanhas e/ou outbound",
      "LinkedIn e e-mail",
      "follow-up",
      "ativos comerciais prioritários",
      "tratamento de leads de eventos e canais digitais",
      "pipeline em uso",
    ],
  },
  {
    range: "61–90 dias",
    verb: "Aprender e acelerar",
    items: [
      "análise de conversão",
      "respostas e objeções",
      "otimização de mensagens",
      "ajuste de ICP",
      "teste de novos canais",
      "evolução das campanhas",
      "evolução do Radar",
      "prioridades do próximo ciclo",
    ],
  },
];

export const RHYTHM = [
  { when: "Semanal", what: "Operação e pipeline." },
  { when: "Contínuo", what: "Execução e acompanhamento remoto." },
  { when: "Periódico", what: "Presença na MITANG para imersão, planejamento e revisão." },
  { when: "Mensal", what: "Estratégia, performance e prioridades." },
];
