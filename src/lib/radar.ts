/* ============================================================
   MITANG RADAR — simulation data for the V01 mockup (26/09).
   Every account, signal, date and contact here is FICTITIOUS and
   printed under "Simulação / dados fictícios". Only the MITANG
   service names are real (brief §4, public site).
   ============================================================ */

export const RADAR_STAGES = [
  { short: "Pesquisa", status: "Conta em pesquisa" },
  { short: "Contato", status: "Primeiro contato" },
  { short: "Desenvolvimento", status: "Conta em desenvolvimento" },
  { short: "Reunião", status: "Reunião agendada" },
  { short: "Oportunidade", status: "Oportunidade com o comercial" },
] as const;

export type Fit = "Alta" | "Média" | "Baixa";

export type RadarPerson = { role: string; state: string };

export type RadarAccount = {
  key: string;
  name: string;
  segment: string;
  fit: Fit;
  signal: string;
  signalWhen: string;
  service: string;
  lastContact: string;
  nextAction: string;
  stage: number;
  /** Position on the plot (bearing in degrees, range 0–1). */
  bearing: number;
  range: number;
  people: RadarPerson[];
  brief: { know: string; why: string; who: string; history: string; materials: string };
};

export const RADAR_ACCOUNTS: RadarAccount[] = [
  {
    key: "A",
    name: "Operadora A",
    segment: "Operadora",
    fit: "Alta",
    signal: "Campanha de survey prevista para o próximo ciclo",
    signalWhen: "29 jul",
    service: "Survey Positioning",
    lastContact: "12 ago · case técnico enviado",
    nextAction: "Preparar abordagem para Gerência de Operações",
    stage: 2,
    bearing: 38,
    range: 0.62,
    people: [
      { role: "Gerência de Operações", state: "A abordar" },
      { role: "Engenharia de Projetos", state: "Em conversa" },
      { role: "Suprimentos", state: "Mapeado" },
    ],
    brief: {
      know: "Campanha de survey prevista. Engenharia de Projetos respondeu ao primeiro contato.",
      why: "Escopo ligado a posicionamento de alta precisão.",
      who: "Gerência de Operações, com Engenharia de Projetos como ponte.",
      history: "Sem projeto anterior registrado. Troca de e-mails em andamento.",
      materials: "Case técnico · one-page Survey Positioning",
    },
  },
  {
    key: "B",
    name: "EPC B",
    segment: "EPC",
    fit: "Alta",
    signal: "Projeto submarino em fase de planejamento",
    signalWhen: "02 ago",
    service: "Construction Support Survey",
    lastContact: "08 ago · conversa pelo LinkedIn",
    nextAction: "Enviar one-page técnico para Engenharia",
    stage: 1,
    bearing: 292,
    range: 0.44,
    people: [
      { role: "Engenharia", state: "Contato iniciado" },
      { role: "Suprimentos", state: "Mapeado" },
    ],
    brief: {
      know: "Projeto submarino em planejamento. Engenharia pediu material de referência.",
      why: "Na fase de planejamento, a conversa técnica ainda pode influenciar o escopo.",
      who: "Engenharia primeiro, Suprimentos na sequência.",
      history: "Nenhuma interação anterior à operação.",
      materials: "One-page técnico · apresentação de capacidade",
    },
  },
  {
    key: "C",
    name: "Renováveis C",
    segment: "Eólica offshore",
    fit: "Média",
    signal: "Levantamento geofísico em licenciamento",
    signalWhen: "06 ago",
    service: "Bathymetric and Geophysical Survey",
    lastContact: "Sem contato",
    nextAction: "Mapear decisores da área de Projetos",
    stage: 0,
    bearing: 118,
    range: 0.78,
    people: [{ role: "Direção técnica", state: "Mapeado" }],
    brief: {
      know: "Projeto em licenciamento, ainda sem cronograma de campo.",
      why: "Levantamentos geofísicos entram cedo no ciclo do projeto.",
      who: "Projetos ou Direção técnica, a confirmar.",
      history: "Sem histórico.",
      materials: "Conteúdo de contexto · case técnico",
    },
  },
  {
    key: "D",
    name: "Operadora D",
    segment: "Descomissionamento",
    fit: "Média",
    signal: "Plano de descomissionamento em preparação",
    signalWhen: "25 jul",
    service: "Decommissioning",
    lastContact: "20 ago · reunião marcada",
    nextAction: "Preparar material para a reunião com Direção técnica",
    stage: 3,
    bearing: 205,
    range: 0.7,
    people: [
      { role: "Direção técnica", state: "Em conversa" },
      { role: "Operação", state: "Contato iniciado" },
      { role: "Suprimentos", state: "Mapeado" },
    ],
    brief: {
      know: "Plano de descomissionamento em preparação. Direção técnica aceitou uma reunião.",
      why: "Demanda ligada diretamente a uma frente da MITANG.",
      who: "Direção técnica, com Operação na reunião.",
      history: "Duas trocas de e-mail e uma ligação.",
      materials: "Material para reunião · one-page Decommissioning (a criar)",
    },
  },
  {
    key: "E",
    name: "Integradora E",
    segment: "Serviços submarinos",
    fit: "Baixa",
    signal: "Ampliação de frota de apoio",
    signalWhen: "14 ago",
    service: "Dimensional Control / Dimcon",
    lastContact: "Sem contato",
    nextAction: "Manter em observação até novo sinal",
    stage: 0,
    bearing: 336,
    range: 0.86,
    people: [{ role: "Operação", state: "Mapeado" }],
    brief: {
      know: "Ampliação de frota anunciada, sem projeto associado ainda.",
      why: "Aderência baixa hoje. Pode mudar com um projeto novo.",
      who: "Operação, quando houver projeto.",
      history: "Sem histórico.",
      materials: "Apresentação de capacidade",
    },
  },
];

/** Learnings and priorities printed in the Insights tab (simulation). */
export const RADAR_INSIGHTS = {
  learnings: [
    "Contas em fase de planejamento respondem melhor a material técnico curto.",
    "Em EPCs, Engenharia abre a conversa antes de Suprimentos.",
    "A objeção mais comum é o momento do projeto, não o interesse.",
  ],
  priorities: [
    "Aprofundar as duas contas de aderência alta",
    "Criar um one-page específico de Decommissioning",
    "Revisar os critérios de aderência para renováveis",
  ],
};

/** "Antes × com a operação" (section 11). */
export const BEFORE_CHAIN = ["mercado", "planilha", "LinkedIn", "e-mail", "memória de alguém", "follow-up"];
export const WITH_CHAIN = [
  "mercado",
  "sinal",
  "conta",
  "decisor",
  "abordagem",
  "histórico",
  "próxima ação",
  "oportunidade",
];

/** Intelligence + creation: how a piece is born from a signal (example). */
export const PIECE_STEPS = [
  { text: "Radar identifica uma oportunidade", who: "Inteligência · tecnologia" },
  { text: "AERA identifica decisores", who: "Inteligência" },
  { text: "Percebemos que falta um material específico", who: "Estratégia" },
  { text: "AERA cria o material", who: "Comunicação · design" },
  { text: "Comercial entra na conversa mais preparado", who: "Comercial MITANG" },
];
