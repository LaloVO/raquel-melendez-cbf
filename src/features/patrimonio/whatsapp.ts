import { PATRIMONIO_CONFIG } from "./config";
import type { Answers, PatrimonioProduct, Profile, Question } from "./products";

export const calcAge = (isoDate: string, today = new Date()) => {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return NaN;
  let age = today.getFullYear() - y;
  const beforeBirthday = today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d);
  if (beforeBirthday) age -= 1;
  return age;
};

export const formatDate = (isoDate: string) => {
  const [y, m, d] = isoDate.split("-");
  return y && m && d ? `${d}/${m}/${y}` : isoDate;
};

export const visibleQuestions = (product: PatrimonioProduct, answers: Answers) =>
  product.questions.filter((q) => !q.showIf || q.showIf(answers));

export const answerLabel = (q: Question, value: string | string[] | undefined) => {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.map((v) => q.options.find((o) => o.value === v)?.label ?? v).join(", ");
};

export const whatsappUrl = (text: string) => {
  const number = PATRIMONIO_CONFIG.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

export const buildLeadMessage = (product: PatrimonioProduct, profile: Profile, answers: Answers) => {
  const questions = visibleQuestions(product, answers);
  const age = calcAge(profile.fechaNacimiento);
  const orientation = product.orientation(answers, profile);

  const lines = [
    `Hola Raquel, quiero diseñar mi patrimonio: *${product.name}*.`,
    "",
    "*Mis datos*",
    `Nombre: ${profile.nombres} ${profile.apellidos}`,
    `Fecha de nacimiento: ${formatDate(profile.fechaNacimiento)}${Number.isFinite(age) ? ` (${age} años)` : ""}`,
    `Fumador: ${profile.fumador === "si" ? "Sí" : "No"}`,
    "",
    "*Mis respuestas*",
    ...questions.map((q, i) => `${i + 1}. ${q.prompt}\n   ${answerLabel(q, answers[q.id]) || "Sin respuesta"}`),
  ];

  if (orientation.length) {
    lines.push("", "*Punto de partida para mi orientación*", ...orientation.map((o) => `• ${o}`));
  }

  return lines.join("\n");
};

export const buildPhoneMessage = (product: PatrimonioProduct, profile: Profile, phone: string) =>
  `Hola Raquel, soy ${profile.nombres} ${profile.apellidos}. Te envié mi estrategia de ${product.name}. Si prefieres llamarme, mi número es ${phone}.`;
