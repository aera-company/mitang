/* ============================================================
   Proposal content — single source for lists, values and contact.
   Rules (brief §37): no invented metrics, clients, cases or targets.
   ============================================================ */

export const CONTACT = {
  /** AERA's approved inbox (confirmed by Tiago 23/09). */
  email: "sales@aera.company",
};

/** Headline values of the pilot (brief §24). The §25 variant stays out. */
export const PRICING = {
  setup: "R$ 9.800",
  monthly: "R$ 14.500",
};

/** The five acts that group the fifteen sections. */
export const ACTS = {
  thesis: "I — Tese",
  system: "II — Sistema",
  operation: "III — Operação",
  offer: "IV — Proposta",
  closing: "V — Próximo passo",
} as const;

export const JOB_WORDS = [
  "marketing",
  "lead generation",
  "oportunidades",
  "clientes",
  "reuniões",
  "comercial",
];

export const PROBLEM_CHAIN = [
  "Mercado",
  "Contas",
  "Decisores",
  "Contexto",
  "Abordagem",
  "Reunião",
  "Oportunidade",
];

export type Module = {
  n: string;
  name: string;
  title: string;
  items: string[];
  output: string;
};

export const MODULES: Module[] = [
  {
    n: "01",
    name: "Intelligence",
    title: "Mapear o mercado",
    items: [
      "contas-alvo",
      "projetos",
      "empresas",
      "movimentações relevantes",
      "segmentos",
      "potenciais demandas",
      "sinais comerciais",
    ],
    output: "Radar de oportunidades",
  },
  {
    n: "02",
    name: "Targeting",
    title: "Encontrar as pessoas certas",
    items: [
      "ICP",
      "account mapping",
      "decisores",
      "influenciadores",
      "compradores",
      "engenharia, suprimentos e operações",
      "procurement",
      "business development",
    ],
    output: "Account map",
  },
  {
    n: "03",
    name: "Connection",
    title: "Criar contexto para a abordagem",
    items: [
      "LinkedIn",
      "e-mail",
      "conteúdo",
      "landing pages",
      "apresentações",
      "cases",
      "mensagens comerciais",
      "campanhas específicas",
    ],
    output: "Outreach engine",
  },
  {
    n: "04",
    name: "Pipeline",
    title: "Transformar interesse em processo",
    items: [
      "CRM",
      "classificação",
      "lead scoring",
      "follow-up",
      "próximos passos",
      "histórico",
      "passagem para o comercial",
    ],
    output: "Commercial pipeline",
  },
  {
    n: "05",
    name: "Learning",
    title: "Fazer a operação aprender",
    items: [
      "resultados",
      "respostas",
      "objeções",
      "segmentos",
      "canais",
      "conversão",
      "oportunidades abertas",
    ],
    output: "Growth intelligence",
  },
];

export const FLOW = [
  "Mercado",
  "Sinal",
  "Conta",
  "Decisor",
  "Contato",
  "Interesse",
  "Reunião",
  "Oportunidade",
];

/** Demonstration rows for the market canvas — abstract, no real companies. */
export const DEMO_ROWS = [
  {
    account: "Conta A · operadora",
    signal: "Nova campanha de survey prevista",
    fit: "High",
    contact: "Gerência de operações",
    status: "Research",
  },
  {
    account: "Conta B · EPC",
    signal: "Projeto submarino em fase de contratação",
    fit: "High",
    contact: "Engenharia de projetos",
    status: "Contact",
  },
  {
    account: "Conta C · renováveis",
    signal: "Levantamento geofísico em licenciamento",
    fit: "Medium",
    contact: "Suprimentos",
    status: "Conversation",
  },
  {
    account: "Conta D · descomissionamento",
    signal: "Plano de descomissionamento publicado",
    fit: "Medium",
    contact: "Direção técnica",
    status: "Meeting",
  },
];

export const ABM_ROLES = [
  { role: "Operação", entry: "Case técnico" },
  { role: "Engenharia", entry: "One-page técnico" },
  { role: "Suprimentos", entry: "Apresentação de capacidade" },
  { role: "Projetos", entry: "Conteúdo de contexto" },
  { role: "Procurement", entry: "Material de qualificação" },
  { role: "Direção", entry: "Conversa executiva" },
];

export const SALES_ASSETS = [
  { name: "Case", question: "Abre a conversa" },
  { name: "Landing page", question: "Abre a conversa" },
  { name: "Apresentação", question: "Avança a conversa" },
  { name: "Vídeo curto", question: "Abre a conversa" },
  { name: "LinkedIn", question: "Abre a conversa" },
  { name: "E-mail", question: "Avança a conversa" },
  { name: "One-page técnico", question: "Avança a conversa" },
  { name: "Material para reunião", question: "Ajuda a fechar" },
];

export const AUTOMATION_USES = [
  "Pesquisa de contas",
  "Enriquecimento de informações",
  "Classificação de leads",
  "Resumo de empresas",
  "Preparação de reuniões",
  "Alertas",
  "Follow-up",
  "Organização do CRM",
  "Geração assistida de materiais",
  "Dashboards",
  "Inteligência acumulada",
];

export type Phase = {
  range: string;
  verb: string;
  items: string[];
  deliverables: string[];
};

export const PHASES: Phase[] = [
  {
    range: "00–30 dias",
    verb: "Mapear",
    items: [
      "imersão com liderança e comercial",
      "serviços prioritários",
      "histórico de clientes",
      "ICP e segmentos",
      "contas prioritárias",
      "processo comercial atual",
      "materiais existentes",
      "stack atual, CRM e base disponível",
      "critérios de qualificação",
    ],
    deliverables: ["Diagnóstico", "ICP", "Account map v01", "Pipeline v01"],
  },
  {
    range: "31–60 dias",
    verb: "Ativar",
    items: [
      "primeiro radar de oportunidades",
      "listas priorizadas",
      "cadências",
      "conteúdos e materiais comerciais",
      "landing pages quando fizer sentido",
      "automações",
      "tracking",
      "prospecção estruturada",
    ],
    deliverables: ["Radar", "Outreach", "Content", "Automation"],
  },
  {
    range: "61–90 dias",
    verb: "Otimizar",
    items: [
      "leitura de performance",
      "respostas e objeções",
      "qualificação",
      "ajuste de ICP",
      "novas hipóteses",
      "evolução de materiais",
      "integração mais profunda com o comercial",
    ],
    deliverables: ["Learning loop", "Dashboard", "Priorities v02"],
  },
];

export const TEAM = {
  mitang: [
    "Conhecimento técnico",
    "Relacionamento de mercado",
    "Operação",
    "Especialistas",
    "Proposta comercial",
    "Negociação",
    "Fechamento",
  ],
  aera: [
    "Estratégia",
    "Inteligência",
    "Growth",
    "Comunicação",
    "Design",
    "Tecnologia",
    "Automação",
    "Organização do pipeline",
  ],
};

export const SCOPE = [
  {
    area: "Estratégia & inteligência",
    items: [
      "planejamento de growth",
      "ICP e segmentação",
      "account mapping",
      "radar de oportunidades",
      "pesquisa comercial",
    ],
  },
  {
    area: "Lead generation",
    items: [
      "construção e qualificação de listas",
      "identificação de decisores",
      "estratégias de abordagem",
      "cadências",
      "acompanhamento",
    ],
  },
  {
    area: "Comunicação",
    items: [
      "direção estratégica",
      "materiais comerciais",
      "conteúdo B2B",
      "peças de apoio",
      "landing pages específicas quando aplicável",
    ],
  },
  {
    area: "Tecnologia",
    items: ["CRM e pipeline", "automações", "IA aplicada", "tracking", "dashboards"],
  },
  {
    area: "Gestão",
    items: [
      "acompanhamento recorrente",
      "reuniões de alinhamento",
      "priorização",
      "interface próxima com o comercial",
    ],
  },
];

export const OUT_OF_SCOPE = [
  "Investimento em mídia",
  "Contratação de bases externas",
  "Licenças de softwares de terceiros",
  "Produção audiovisual complexa",
  "Viagens fora do Rio",
  "Impressão",
  "Eventos",
  "Desenvolvimento de sistemas de grande porte",
  "Serviços técnicos de pré-venda offshore",
];

export const METRICS = [
  "Contas mapeadas",
  "Decisores identificados",
  "Sinais e oportunidades encontradas",
  "Contatos iniciados",
  "Respostas",
  "Conversas qualificadas",
  "Reuniões geradas",
  "Oportunidades entregues ao comercial",
  "Evolução por segmento",
  "Motivos de perda e objeções",
];

export const SETUP_INCLUDES = [
  "diagnóstico",
  "ICP",
  "pipeline",
  "CRM",
  "automações iniciais",
  "dashboard",
  "desenho operacional",
  "configuração da base de trabalho",
];
