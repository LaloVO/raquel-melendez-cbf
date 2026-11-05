export type PatrimonioSlug = "vida" | "salud" | "ahorro" | "retiro";
export type PatrimonioVerb = "Diseña" | "Construye" | "Protege";

export type Answers = Record<string, string | string[]>;

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  prompt: string;
  help?: string;
  kind: "single" | "multi";
  options: QuestionOption[];
  // Opción que, en preguntas múltiples, excluye a las demás (ej. "Ninguno").
  exclusive?: string;
  showIf?: (answers: Answers) => boolean;
}

export interface Profile {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string; // YYYY-MM-DD
  fumador: "si" | "no";
}

export interface StrategyStep {
  verb: PatrimonioVerb;
  body: string;
}

export interface PatrimonioProduct {
  slug: PatrimonioSlug;
  name: string;
  verb: PatrimonioVerb;
  promise: string;
  intro: string;
  image: string;
  imageAlt: string;
  videoUrl?: string;
  steps: StrategyStep[];
  formTitle: string;
  questions: Question[];
  // Punto de partida para que Raquel oriente con el catálogo de Seguros Monterrey New York Life.
  orientation: (answers: Answers, profile: Profile) => string[];
}

const img = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const one = (answers: Answers, id: string) => {
  const v = answers[id];
  return typeof v === "string" ? v : undefined;
};

const MONEDA: Question = {
  id: "moneda",
  prompt: "¿En qué moneda prefieres construir tu estrategia?",
  kind: "single",
  options: [
    { value: "pesos", label: "Pesos mexicanos" },
    { value: "dolares", label: "Dólares estadounidenses" },
    { value: "udis", label: "UDIs (se ajustan a la inflación)" },
    { value: "orientacion", label: "Prefiero que Raquel me oriente" },
  ],
};

const SEXO: Question = {
  id: "sexo",
  prompt: "¿Cuál es tu sexo?",
  help: "Las aseguradoras lo usan para calcular la aportación.",
  kind: "single",
  options: [
    { value: "mujer", label: "Mujer" },
    { value: "hombre", label: "Hombre" },
  ],
};

const unique = (items: string[]) => Array.from(new Set(items));

export const PATRIMONIO_PRODUCTS: PatrimonioProduct[] = [
  {
    slug: "vida",
    name: "Vida",
    verb: "Protege",
    promise: "Protege a quienes dependen de ti.",
    intro:
      "Una estrategia de vida define cuánto necesitaría tu familia para seguir adelante si faltas o sufres una invalidez, y lo deja resuelto desde hoy. Raquel la diseña contigo a partir de tu edad, tus dependientes y tus compromisos.",
    image: img("photo-1609220136736-443140cffec6"),
    imageAlt: "Padre cargando a sus dos hijos frente a su casa",
    steps: [
      { verb: "Diseña", body: "Calculamos cuánto necesitaría tu familia: gastos del hogar, deudas y metas que no deben detenerse." },
      { verb: "Construye", body: "Elegimos el plazo, la moneda y una aportación que quepa en tu presupuesto." },
      { verb: "Protege", body: "Tu familia cuenta con un respaldo económico definido de antemano, sin depender de terceros." },
    ],
    formTitle: "Diseña tu estrategia de vida",
    questions: [
      SEXO,
      {
        id: "dependientes",
        prompt: "¿Quiénes dependen económicamente de ti?",
        kind: "multi",
        exclusive: "nadie",
        options: [
          { value: "pareja", label: "Mi pareja" },
          { value: "hijos", label: "Mis hijos" },
          { value: "padres", label: "Mis padres" },
          { value: "otros", label: "Otros familiares" },
          { value: "nadie", label: "Nadie por ahora" },
        ],
      },
      {
        id: "objetivo",
        prompt: "¿Qué quieres lograr con tu estrategia?",
        kind: "single",
        options: [
          { value: "temporal", label: "Proteger a mi familia durante un periodo clave" },
          { value: "vitalicio", label: "Dejar protección para toda la vida" },
          { value: "ahorro", label: "Proteger y, al mismo tiempo, ahorrar" },
          { value: "no-se", label: "Aún no lo sé" },
        ],
      },
      {
        id: "plazo",
        prompt: "¿Durante cuánto tiempo necesitas la protección?",
        kind: "single",
        options: [
          { value: "10", label: "Unos 10 años" },
          { value: "20", label: "Hasta que mis hijos sean independientes" },
          { value: "65", label: "Hasta mi retiro" },
          { value: "vida", label: "Toda la vida" },
          { value: "no-se", label: "No lo sé" },
        ],
      },
      {
        id: "suma",
        prompt: "¿Qué monto te gustaría que recibiera tu familia?",
        kind: "single",
        options: [
          { value: "<1m", label: "Menos de $1 millón" },
          { value: "1-3m", label: "Entre $1 y $3 millones" },
          { value: "3-5m", label: "Entre $3 y $5 millones" },
          { value: ">5m", label: "Más de $5 millones" },
          { value: "orientacion", label: "Prefiero calcularlo con Raquel" },
        ],
      },
      {
        id: "deudas",
        prompt: "¿Tienes compromisos que tu familia tendría que cubrir?",
        kind: "multi",
        exclusive: "ninguno",
        options: [
          { value: "hipoteca", label: "Hipoteca" },
          { value: "auto", label: "Crédito automotriz" },
          { value: "personal", label: "Crédito personal o tarjetas" },
          { value: "negocio", label: "Deudas de negocio" },
          { value: "ninguno", label: "Ninguno" },
        ],
      },
      {
        id: "actual",
        prompt: "¿Cuentas hoy con algún seguro de vida?",
        kind: "single",
        options: [
          { value: "empleo", label: "Sí, el de mi empleo" },
          { value: "individual", label: "Sí, uno individual" },
          { value: "no", label: "No" },
        ],
      },
      MONEDA,
      {
        id: "aportacion",
        prompt: "¿Cuánto podrías destinar al mes?",
        kind: "single",
        options: [
          { value: "<1500", label: "Hasta $1,500" },
          { value: "1500-3000", label: "De $1,500 a $3,000" },
          { value: "3000-6000", label: "De $3,000 a $6,000" },
          { value: ">6000", label: "Más de $6,000" },
          { value: "orientacion", label: "Prefiero definirlo con Raquel" },
        ],
      },
    ],
    orientation: (a) => {
      const out: string[] = [];
      const objetivo = one(a, "objetivo");
      const plazo = one(a, "plazo");
      if (objetivo === "temporal" || plazo === "10" || plazo === "20" || plazo === "65") out.push("Star Temporal®");
      if (objetivo === "vitalicio" || plazo === "vida") out.push("Orvi®");
      if (objetivo === "ahorro") {
        out.push("Mío®");
        if (one(a, "sexo") === "mujer") out.push("Vida Mujer®");
      }
      if (objetivo === "no-se" && out.length === 0) out.push("Star Temporal®", "Orvi®");
      return unique(out);
    },
  },
  {
    slug: "salud",
    name: "Salud",
    verb: "Protege",
    promise: "Protege tu salud y tu ahorro.",
    intro:
      "Un gasto médico mayor puede consumir en semanas lo que construiste en años. Esta estrategia define a quién proteger, dónde quieres atenderte y qué presupuesto anual tiene sentido para tu familia.",
    image: img("photo-1544367567-0f2fcb009e0b"),
    imageAlt: "Mujer practicando yoga frente al mar al atardecer",
    steps: [
      { verb: "Diseña", body: "Definimos a quién proteger y en qué hospitales quieres atenderte." },
      { verb: "Construye", body: "Equilibramos suma asegurada, deducible y aportación anual según tu presupuesto." },
      { verb: "Protege", body: "Ante un accidente o una enfermedad, cuentas con respaldo para hospital, tratamientos y especialistas." },
    ],
    formTitle: "Diseña tu estrategia de salud",
    questions: [
      {
        id: "personas",
        prompt: "¿A quiénes quieres proteger?",
        kind: "multi",
        options: [
          { value: "yo", label: "A mí" },
          { value: "pareja", label: "A mi pareja" },
          { value: "hijos", label: "A mis hijos" },
          { value: "padres", label: "A mis padres" },
        ],
      },
      {
        id: "edades",
        prompt: "¿Cuál es la edad de la persona mayor que quieres proteger?",
        kind: "single",
        options: [
          { value: "<40", label: "Menos de 40 años" },
          { value: "40-55", label: "Entre 40 y 55 años" },
          { value: "56-65", label: "Entre 56 y 65 años" },
          { value: ">65", label: "Más de 65 años" },
        ],
      },
      {
        id: "atencion",
        prompt: "¿Dónde te gustaría atenderte?",
        kind: "single",
        options: [
          { value: "convenio", label: "En hospitales en convenio, cuidando el presupuesto" },
          { value: "amplia", label: "En una red amplia de hospitales en México" },
          { value: "internacional", label: "En México y en el extranjero" },
          { value: "no-se", label: "Aún no lo sé" },
        ],
      },
      {
        id: "actual",
        prompt: "¿Tienen hoy un seguro de gastos médicos?",
        kind: "single",
        options: [
          { value: "empleo", label: "Sí, el de mi empleo" },
          { value: "individual", label: "Sí, uno individual" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "padecimientos",
        prompt: "¿Alguna de estas personas tiene un padecimiento diagnosticado?",
        help: "Ayuda a Raquel a revisar coberturas y periodos de espera.",
        kind: "single",
        options: [
          { value: "no", label: "No" },
          { value: "si", label: "Sí" },
          { value: "privado", label: "Prefiero comentarlo con Raquel" },
        ],
      },
      {
        id: "prioridad",
        prompt: "¿Qué es lo más importante para ti?",
        kind: "single",
        options: [
          { value: "deducible", label: "Pagar poco cuando use el seguro (deducible bajo)" },
          { value: "prima", label: "Una aportación anual accesible" },
          { value: "cobertura", label: "La cobertura más amplia posible" },
          { value: "no-se", label: "No lo sé" },
        ],
      },
      {
        id: "presupuesto",
        prompt: "¿Qué presupuesto anual contemplas para tu familia?",
        kind: "single",
        options: [
          { value: "<25k", label: "Hasta $25,000" },
          { value: "25-50k", label: "De $25,000 a $50,000" },
          { value: "50-100k", label: "De $50,000 a $100,000" },
          { value: ">100k", label: "Más de $100,000" },
          { value: "orientacion", label: "Prefiero definirlo con Raquel" },
        ],
      },
    ],
    orientation: (a) => {
      const map: Record<string, string[]> = {
        convenio: ["Alfa Medical Flex®"],
        amplia: ["Alfa Medical®"],
        internacional: ["Alfa Medical Internacional®"],
        "no-se": ["Alfa Medical®", "Alfa Medical Flex®"],
      };
      return map[one(a, "atencion") ?? "no-se"] ?? [];
    },
  },
  {
    slug: "ahorro",
    name: "Ahorro",
    verb: "Construye",
    promise: "Construye tus metas con fecha.",
    intro:
      "Ahorrar con un plan convierte una intención en una fecha. Esta estrategia fija para qué ahorras, en cuánto tiempo y con qué aportación, y al ser un seguro de vida con ahorro, tu familia queda respaldada durante el plazo.",
    image: img("photo-1579621970563-ebec7560ff3e"),
    imageAlt: "Brote de planta creciendo sobre monedas",
    steps: [
      { verb: "Diseña", body: "Ponemos nombre, monto y fecha a tu meta: educación, casa, negocio o un proyecto propio." },
      { verb: "Construye", body: "Definimos aportación, moneda y perfil de riesgo para llegar a tiempo." },
      { verb: "Protege", body: "Si algo te ocurre durante el plazo, tu familia queda respaldada." },
    ],
    formTitle: "Diseña tu estrategia de ahorro",
    questions: [
      {
        id: "meta",
        prompt: "¿Para qué quieres ahorrar?",
        kind: "single",
        options: [
          { value: "educacion", label: "La universidad de mis hijos" },
          { value: "meta", label: "Una meta concreta: casa, negocio o viaje" },
          { value: "crecer", label: "Hacer crecer mi dinero" },
          { value: "varias", label: "Varias metas a distintos plazos" },
        ],
      },
      {
        id: "edad_hijo",
        prompt: "¿Qué edad tiene tu hijo o hija menor?",
        kind: "single",
        showIf: (a) => a.meta === "educacion",
        options: [
          { value: "0-3", label: "De 0 a 3 años" },
          { value: "4-8", label: "De 4 a 8 años" },
          { value: "9-12", label: "De 9 a 12 años" },
          { value: ">12", label: "Más de 12 años" },
        ],
      },
      {
        id: "plazo",
        prompt: "¿En cuánto tiempo quieres alcanzar tu meta?",
        kind: "single",
        options: [
          { value: "3-5", label: "De 3 a 5 años" },
          { value: "5-10", label: "De 5 a 10 años" },
          { value: "10-15", label: "De 10 a 15 años" },
          { value: "15-20", label: "De 15 a 20 años" },
        ],
      },
      {
        id: "riesgo",
        prompt: "¿Cómo te sientes con las variaciones de tu inversión?",
        kind: "single",
        options: [
          { value: "conservador", label: "Prefiero certeza, aunque crezca menos" },
          { value: "moderado", label: "Acepto variaciones moderadas" },
          { value: "dinamico", label: "Busco mayor crecimiento con más variación" },
        ],
      },
      MONEDA,
      {
        id: "aportacion",
        prompt: "¿Cuánto podrías ahorrar al mes?",
        kind: "single",
        options: [
          { value: "<2000", label: "Hasta $2,000" },
          { value: "2000-5000", label: "De $2,000 a $5,000" },
          { value: "5000-10000", label: "De $5,000 a $10,000" },
          { value: ">10000", label: "Más de $10,000" },
        ],
      },
      {
        id: "actual",
        prompt: "¿Hoy ahorras o inviertes de forma constante?",
        kind: "single",
        options: [
          { value: "si", label: "Sí" },
          { value: "a-veces", label: "A veces" },
          { value: "no", label: "Todavía no" },
        ],
      },
    ],
    orientation: (a) => {
      const map: Record<string, string[]> = {
        educacion: ["SeguBeca®"],
        meta: ["Star Dotal®"],
        crecer: ["Realiza®"],
        varias: ["Mío®"],
      };
      return map[one(a, "meta") ?? ""] ?? [];
    },
  },
  {
    slug: "retiro",
    name: "Retiro",
    verb: "Diseña",
    promise: "Diseña el ingreso de tu futuro.",
    intro:
      "El retiro se decide mucho antes de la fecha. Esta estrategia estima el ingreso que vas a necesitar, lo compara con lo que ya tienes y define cuánto aportar desde hoy para llegar con tranquilidad.",
    image: img("photo-1473186578172-c141e6798cf4"),
    imageAlt: "Dos sillas de playa frente al mar",
    steps: [
      { verb: "Diseña", body: "Fijamos la edad y el ingreso mensual con los que quieres retirarte." },
      { verb: "Construye", body: "Sumamos lo que ya tienes (Afore, plan de tu empresa) y definimos la aportación que falta." },
      { verb: "Protege", body: "Al retirarte, recibes tu ahorro en un solo pago o como ingreso mensual." },
    ],
    formTitle: "Diseña tu estrategia de retiro",
    questions: [
      {
        id: "edad_retiro",
        prompt: "¿A qué edad te gustaría retirarte?",
        kind: "single",
        options: [
          { value: "55", label: "Alrededor de los 55" },
          { value: "60", label: "A los 60" },
          { value: "65", label: "A los 65" },
          { value: ">65", label: "Después de los 65" },
        ],
      },
      {
        id: "ingreso",
        prompt: "¿Qué ingreso mensual te gustaría tener en tu retiro?",
        help: "En pesos de hoy.",
        kind: "single",
        options: [
          { value: "<20k", label: "Hasta $20,000" },
          { value: "20-40k", label: "De $20,000 a $40,000" },
          { value: "40-80k", label: "De $40,000 a $80,000" },
          { value: ">80k", label: "Más de $80,000" },
        ],
      },
      {
        id: "forma",
        prompt: "¿Cómo te gustaría recibir tu ahorro?",
        kind: "single",
        options: [
          { value: "unico", label: "En un solo pago" },
          { value: "mensual", label: "Como ingreso mensual de por vida" },
          { value: "no-se", label: "Aún no lo sé" },
        ],
      },
      {
        id: "actual",
        prompt: "¿Con qué cuentas hoy para tu retiro?",
        kind: "multi",
        exclusive: "nada",
        options: [
          { value: "afore", label: "Afore" },
          { value: "empresa", label: "Plan de pensiones de mi empresa" },
          { value: "ppr", label: "Plan personal de retiro" },
          { value: "inmuebles", label: "Inmuebles o rentas" },
          { value: "nada", label: "Nada todavía" },
        ],
      },
      {
        id: "ocupacion",
        prompt: "¿Cuál es tu actividad principal?",
        kind: "single",
        options: [
          { value: "empleado", label: "Soy empleado" },
          { value: "independiente", label: "Trabajo por mi cuenta" },
          { value: "empresario", label: "Tengo un negocio" },
          { value: "otro", label: "Otra" },
        ],
      },
      {
        id: "deducible",
        prompt: "¿Te interesa que tu ahorro para el retiro sea deducible de impuestos?",
        kind: "single",
        options: [
          { value: "si", label: "Sí" },
          { value: "no", label: "No" },
          { value: "no-se", label: "Quiero saber si me conviene" },
        ],
      },
      {
        id: "aportacion",
        prompt: "¿Cuánto podrías destinar al mes?",
        kind: "single",
        options: [
          { value: "<2000", label: "Hasta $2,000" },
          { value: "2000-5000", label: "De $2,000 a $5,000" },
          { value: "5000-10000", label: "De $5,000 a $10,000" },
          { value: ">10000", label: "Más de $10,000" },
        ],
      },
    ],
    orientation: (a) => {
      const out = ["Imagina Ser®"];
      if (one(a, "edad_retiro") === "55") out.push("Revisar edad de retiro: Imagina Ser® contempla retiro a partir de los 60");
      return out;
    },
  },
];

export const getPatrimonioProduct = (slug?: string) =>
  PATRIMONIO_PRODUCTS.find((p) => p.slug === slug);
