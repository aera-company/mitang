/* ============================================================
   Proposal content — single source for lists, values and contact.
   Rules (brief §37): no invented metrics, clients, cases or targets.
   ============================================================ */

export const CONTACT = {
  /** AERA's approved inbox (confirmed by Tiago 23/09). */
  email: "sales@aera.company",
};

/** Commercial model — revised by Tiago 24/09: one monthly price, setup
    included, 3-month cycle. No discount / promo language anywhere. */
export const PRICING = {
  monthly: "R$ 9.800",
  cycleTotal: "R$ 29.400",
};

/** The five acts that group the sixteen sections. */
export const ACTS = {
  thesis: "I · Tese",
  system: "II · Sistema",
  operation: "III · Operação",
  offer: "IV · Proposta",
  closing: "V · Próximo passo",
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

/* Each module lists only what the later sections do NOT detail (radar,
   ABM, content and automation have their own chapters). */
export const MODULES: Module[] = [
  {
    n: "01",
    name: "Inteligência",
    title: "Mapear o mercado",
    items: ["contas e projetos-alvo", "movimentações e sinais comerciais", "segmentos prioritários"],
    output: "Radar de oportunidades",
  },
  {
    n: "02",
    name: "Contas",
    title: "Encontrar as pessoas certas",
    items: ["ICP", "mapa de contas", "decisores e influenciadores"],
    output: "Mapa de contas",
  },
  {
    n: "03",
    name: "Conexão",
    title: "Criar contexto para a abordagem",
    items: ["mensagens por perfil", "materiais comerciais", "LinkedIn e e-mail"],
    output: "Cadências de abordagem",
  },
  {
    n: "04",
    name: "Pipeline",
    title: "Transformar interesse em processo",
    items: ["CRM e qualificação", "follow-up e próximos passos", "passagem para o comercial"],
    output: "Pipeline comercial",
  },
  {
    n: "05",
    name: "Aprendizado",
    title: "Fazer a operação aprender",
    items: ["respostas e objeções", "conversão por segmento e canal", "ajuste de prioridades"],
    output: "Leitura de resultados",
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

/** SIMULATION rows for the market canvas — fictitious accounts, signals and
    contacts, only to show the format. Never read as research. */
export const DEMO_ROWS = [
  {
    account: "Exemplo A · operadora",
    signal: "Nova campanha de survey prevista",
    fit: "Alta",
    contact: "Gerência de operações",
    status: "Pesquisa",
  },
  {
    account: "Exemplo B · EPC",
    signal: "Projeto submarino em fase de contratação",
    fit: "Alta",
    contact: "Engenharia de projetos",
    status: "Contato",
  },
  {
    account: "Exemplo C · renováveis",
    signal: "Levantamento geofísico em licenciamento",
    fit: "Média",
    contact: "Suprimentos",
    status: "Conversa",
  },
  {
    account: "Exemplo D · descomissionamento",
    signal: "Plano de descomissionamento publicado",
    fit: "Média",
    contact: "Direção técnica",
    status: "Reunião",
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
  "Pesquisa e enriquecimento de contas",
  "Classificação de leads",
  "Preparação de reuniões",
  "Alertas e lembretes de follow-up",
  "Organização do CRM",
  "Materiais e dashboards com apoio de IA",
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
    deliverables: ["Diagnóstico", "ICP", "Mapa de contas v01", "Pipeline v01"],
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
    deliverables: ["Radar", "Abordagem", "Conteúdo", "Automação"],
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
    deliverables: ["Ciclo de aprendizado", "Dashboard", "Prioridades v02"],
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
      "mapeamento de contas",
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
      "priorização mensal das frentes",
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

/* Working model (added 24/09): hybrid, close to the team, no fixed on-site
   quota. Lanes read across one month; `kind` sets the glyph. */
export type CadenceLane = {
  when: string;
  title: string;
  detail: string;
  kind: "weekly" | "continuous" | "periodic" | "monthly";
};

export const CADENCE: CadenceLane[] = [
  {
    when: "Semanal",
    title: "Reunião de operação · 45–60 min",
    detail: "Radar, contas, contatos, respostas, oportunidades e próximos passos.",
    kind: "weekly",
  },
  {
    when: "Contínuo",
    title: "Acompanhamento remoto",
    detail: "Execução, ajustes e troca direta com o comercial ao longo da semana.",
    kind: "continuous",
  },
  {
    when: "Periódico",
    title: "Encontros presenciais na MITANG",
    detail: "Imersão, planejamento, revisão de oportunidades e alinhamento com o comercial.",
    kind: "periodic",
  },
  {
    when: "Mensal",
    title: "Reunião de estratégia e performance",
    detail: "Aprendizados, performance, prioridades e foco do próximo ciclo.",
    kind: "monthly",
  },
];

export const JOINT = {
  aera: ["organização", "inteligência", "comunicação", "tecnologia"],
  mitang: ["conhecimento técnico", "mercado", "validação", "comercial"],
};
