import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, Facebook, Instagram, Linkedin, MessageCircle, PencilLine, Phone, Youtube, Music2 } from "lucide-react";
import { PATRIMONIO_CONFIG, type PatrimonioSocialLink } from "./config";
import type { Answers, PatrimonioProduct, Profile, Question } from "./products";
import { answerLabel, buildLeadMessage, buildPhoneMessage, calcAge, formatDate, visibleQuestions, whatsappUrl } from "./whatsapp";

const profileSchema = z.object({
  nombres: z.string().trim().min(2, "Escribe tu nombre o nombres").max(60, "Usa máximo 60 caracteres"),
  apellidos: z.string().trim().min(2, "Escribe tus apellidos").max(80, "Usa máximo 80 caracteres"),
  fechaNacimiento: z
    .string()
    .min(1, "Indica tu fecha de nacimiento")
    .refine((v) => {
      const age = calcAge(v);
      return Number.isFinite(age) && age >= 18 && age <= 99;
    }, "Revisa la fecha: necesitas tener al menos 18 años"),
  fumador: z.enum(["si", "no"], { required_error: "Selecciona una opción", invalid_type_error: "Selecciona una opción" }),
});

type Stage = "datos" | "preguntas" | "revision" | "gracias";

const inputClass =
  "w-full h-12 rounded-full border border-[#6E6259]/25 bg-[#FAF7F2] px-5 font-sans text-sm text-[#2E251E] placeholder:text-[#6E6259]/50 focus:border-[#B76E4D] focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E4D]/25 transition-colors";

const primaryButton =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#B76E4D] px-7 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#2E251E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E4D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

const ghostButton =
  "inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 font-sans text-xs font-medium text-[#6E6259] transition-colors hover:text-[#B76E4D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E4D]/40";

const socialIcon: Record<PatrimonioSocialLink["id"], typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Music2,
};

const isAnswered = (q: Question, value: Answers[string] | undefined) =>
  Array.isArray(value) ? value.length > 0 : Boolean(value);

interface Props {
  product: PatrimonioProduct;
}

const PatrimonioForm = ({ product }: Props) => {
  const [stage, setStage] = useState<Stage>("datos");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [qi, setQi] = useState(0);
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneSent, setPhoneSent] = useState(false);
  const advanceTimer = useRef<number>();
  const stageRef = useRef<HTMLDivElement>(null);

  const form = useForm<Profile>({ resolver: zodResolver(profileSchema), mode: "onTouched" });
  const fumador = form.watch("fumador");

  const questions = useMemo(() => visibleQuestions(product, answers), [product, answers]);
  const question = questions[Math.min(qi, questions.length - 1)];
  const socials = PATRIMONIO_CONFIG.socials.filter((s) => s.url.trim());
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  // Reinicia el flujo si el visitante cambia de estrategia sin recargar.
  useEffect(() => {
    setStage("datos");
    setAnswers({});
    setQi(0);
    setEditing(false);
    setPhoneSent(false);
  }, [product.slug]);

  const focusStage = () =>
    window.requestAnimationFrame(() => {
      const el = stageRef.current;
      if (!el) return;
      el.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
      // Mantiene visible el inicio de cada paso bajo el navbar fijo.
      const top = el.getBoundingClientRect().top;
      if (top < 96 || top > window.innerHeight * 0.6) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollBy({ top: top - 120, behavior: reduce ? "auto" : "smooth" });
      }
    });

  const goTo = (next: Stage, index = 0) => {
    setStage(next);
    setQi(index);
    focusStage();
  };

  const onProfile = form.handleSubmit((data) => {
    setProfile({ ...data, nombres: data.nombres.trim(), apellidos: data.apellidos.trim() });
    goTo(editing ? "revision" : "preguntas");
    setEditing(false);
  });

  const nextQuestion = (current: Answers) => {
    const list = visibleQuestions(product, current);
    if (editing || qi >= list.length - 1) {
      setEditing(false);
      goTo("revision");
    } else {
      setQi(qi + 1);
      focusStage();
    }
  };

  const choose = (q: Question, value: string) => {
    if (q.kind === "single") {
      const updated = { ...answers, [q.id]: value };
      setAnswers(updated);
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = window.setTimeout(() => nextQuestion(updated), 260);
      return;
    }
    const current = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
    let next: string[];
    if (current.includes(value)) next = current.filter((v) => v !== value);
    else if (value === q.exclusive) next = [value];
    else next = [...current.filter((v) => v !== q.exclusive), value];
    setAnswers({ ...answers, [q.id]: next });
  };

  const message = profile ? buildLeadMessage(product, profile, answers) : "";
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length >= 10 && phoneDigits.length <= 13;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E9DDCF] bg-white shadow-elegant">
      <div className="h-1 w-full bg-[#B76E4D]" aria-hidden />
      <div ref={stageRef} className="p-6 sm:p-8 md:p-10" aria-live="polite">
        {stage === "datos" && (
          <form onSubmit={onProfile} noValidate key="datos" className="animate-fade-in motion-reduce:animate-none">
            <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#2E251E]">{product.formTitle}</h2>
            <p className="mt-3 max-w-lg font-sans text-sm leading-relaxed text-[#6E6259]">
              Empieza con cuatro datos. Con ellos y unas preguntas breves, Raquel prepara tu orientación.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-sans text-xs font-medium text-[#4A3F35]">Nombre(s)</span>
                <input
                  id="patrimonio-nombres"
                  data-autofocus
                  autoComplete="given-name"
                  className={inputClass}
                  aria-invalid={Boolean(form.formState.errors.nombres)}
                  {...form.register("nombres")}
                />
                {form.formState.errors.nombres && <span className="px-2 font-sans text-xs text-[#A4452A]">{form.formState.errors.nombres.message}</span>}
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-sans text-xs font-medium text-[#4A3F35]">Apellidos</span>
                <input autoComplete="family-name" className={inputClass} aria-invalid={Boolean(form.formState.errors.apellidos)} {...form.register("apellidos")} />
                {form.formState.errors.apellidos && <span className="px-2 font-sans text-xs text-[#A4452A]">{form.formState.errors.apellidos.message}</span>}
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-sans text-xs font-medium text-[#4A3F35]">Fecha de nacimiento</span>
                <input
                  type="date"
                  max={today}
                  autoComplete="bday"
                  className={inputClass}
                  aria-invalid={Boolean(form.formState.errors.fechaNacimiento)}
                  {...form.register("fechaNacimiento")}
                />
                {form.formState.errors.fechaNacimiento && (
                  <span className="px-2 font-sans text-xs text-[#A4452A]">{form.formState.errors.fechaNacimiento.message}</span>
                )}
              </label>
              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 font-sans text-xs font-medium text-[#4A3F35]">¿Fumas?</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["si", "no"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={fumador === v}
                      onClick={() => form.setValue("fumador", v, { shouldValidate: true })}
                      className={`h-12 rounded-full border font-sans text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E4D]/40 ${
                        fumador === v
                          ? "border-[#B76E4D] bg-[#B76E4D] text-white"
                          : "border-[#6E6259]/25 bg-[#FAF7F2] text-[#4A3F35] hover:border-[#B76E4D]"
                      }`}
                    >
                      {v === "si" ? "Sí" : "No"}
                    </button>
                  ))}
                </div>
                {form.formState.errors.fumador && <span className="px-2 font-sans text-xs text-[#A4452A]">{form.formState.errors.fumador.message}</span>}
              </fieldset>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans text-[11px] leading-relaxed text-[#6E6259]/70 sm:max-w-xs">
                Tus datos solo se comparten con Raquel cuando envías el mensaje de WhatsApp.
              </p>
              <button type="submit" className={primaryButton}>
                {editing ? "Guardar datos" : "Comenzar"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {stage === "preguntas" && question && (
          <div key={question.id} className="animate-fade-in motion-reduce:animate-none">
            <fieldset>
              <legend
                tabIndex={-1}
                data-autofocus
                className="font-serif text-2xl md:text-3xl font-light leading-snug text-[#2E251E] outline-none"
              >
                {question.prompt}
              </legend>
              {question.help && <p className="mt-2 font-sans text-sm text-[#6E6259]">{question.help}</p>}
              {question.kind === "multi" && <p className="mt-2 font-sans text-xs text-[#6E6259]/80">Puedes elegir varias opciones.</p>}

              <div className="mt-6 grid gap-3" role={question.kind === "single" ? "radiogroup" : "group"}>
                {question.options.map((opt) => {
                  const value = answers[question.id];
                  const selected = Array.isArray(value) ? value.includes(opt.value) : value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role={question.kind === "single" ? "radio" : "checkbox"}
                      aria-checked={selected}
                      onClick={() => choose(question, opt.value)}
                      className={`group flex min-h-[56px] w-full items-center justify-between gap-4 rounded-2xl border px-5 py-3 text-left font-sans text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E4D]/40 motion-reduce:transition-none ${
                        selected
                          ? "border-[#B76E4D] bg-[#B76E4D]/[0.07] text-[#2E251E]"
                          : "border-[#E9DDCF] bg-[#FAF7F2]/60 text-[#4A3F35] hover:border-[#B76E4D]/60 hover:bg-white"
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          selected ? "border-[#B76E4D] bg-[#B76E4D] text-white" : "border-[#6E6259]/30 text-transparent"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8">
              <div className="h-1 w-full overflow-hidden rounded-full bg-[#E9DDCF]">
                <div
                  className="h-full rounded-full bg-[#B76E4D] transition-[width] duration-500 motion-reduce:transition-none"
                  style={{ width: `${((qi + 1) / questions.length) * 100}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  className={ghostButton}
                  onClick={() => {
                    if (editing) {
                      setEditing(false);
                      goTo("revision");
                    } else if (qi === 0) goTo("datos");
                    else {
                      setQi(qi - 1);
                      focusStage();
                    }
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {editing ? "Volver al resumen" : "Anterior"}
                </button>
                <span className="font-sans text-xs text-[#6E6259]/80">
                  Pregunta {qi + 1} de {questions.length}
                </span>
                {question.kind === "multi" ? (
                  <button type="button" className={primaryButton} disabled={!isAnswered(question, answers[question.id])} onClick={() => nextQuestion(answers)}>
                    {editing ? "Guardar" : "Siguiente"}
                  </button>
                ) : (
                  <span className="hidden w-[120px] sm:block" aria-hidden />
                )}
              </div>
            </div>
          </div>
        )}

        {stage === "revision" && profile && (
          <div key="revision" className="animate-fade-in motion-reduce:animate-none">
            <h2 tabIndex={-1} data-autofocus className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#2E251E] outline-none">
              Revisa tu estrategia
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-[#6E6259]">
              Al enviar, se abrirá WhatsApp con tus datos y respuestas listos para Raquel.
            </p>

            <dl className="mt-8 divide-y divide-[#E9DDCF] border-y border-[#E9DDCF]">
              <div className="flex items-start justify-between gap-4 py-4">
                <div>
                  <dt className="font-sans text-xs text-[#6E6259]">Tus datos</dt>
                  <dd className="mt-1 font-sans text-sm text-[#2E251E]">
                    {profile.nombres} {profile.apellidos} · {formatDate(profile.fechaNacimiento)} ({calcAge(profile.fechaNacimiento)} años) ·{" "}
                    {profile.fumador === "si" ? "Fumador" : "No fumador"}
                  </dd>
                </div>
                <button
                  type="button"
                  className={ghostButton}
                  aria-label="Editar tus datos"
                  onClick={() => {
                    setEditing(true);
                    goTo("datos");
                  }}
                >
                  <PencilLine className="h-4 w-4" />
                </button>
              </div>
              {questions.map((q, i) => (
                <div key={q.id} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <dt className="font-sans text-xs text-[#6E6259]">{q.prompt}</dt>
                    <dd className="mt-1 font-sans text-sm text-[#2E251E]">{answerLabel(q, answers[q.id]) || "Sin respuesta"}</dd>
                  </div>
                  <button
                    type="button"
                    className={ghostButton}
                    aria-label={`Editar: ${q.prompt}`}
                    onClick={() => {
                      setEditing(true);
                      goTo("preguntas", i);
                    }}
                  >
                    <PencilLine className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" className={ghostButton} onClick={() => goTo("preguntas", questions.length - 1)}>
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </button>
              <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" onClick={() => goTo("gracias")} className={primaryButton}>
                <MessageCircle className="h-4 w-4" />
                Enviar
              </a>
            </div>
          </div>
        )}

        {stage === "gracias" && profile && (
          <div key="gracias" className="animate-fade-in motion-reduce:animate-none">
            <h2 tabIndex={-1} data-autofocus className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#2E251E] outline-none">
              Gracias por enviarnos tu estrategia, <span className="italic text-[#B76E4D]">{profile.nombres}</span>.
            </h2>
            <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-[#6E6259]">
              Raquel revisará tus respuestas y te escribirá por WhatsApp para comenzar tu orientación de {product.name.toLowerCase()}.
            </p>
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center font-sans text-xs text-[#B76E4D] underline underline-offset-4 hover:text-[#2E251E]"
            >
              ¿No se abrió WhatsApp? Ábrelo de nuevo
            </a>

            <div className="mt-8 rounded-2xl border border-[#E9DDCF] bg-[#FAF7F2] p-5 sm:p-6">
              {phoneSent ? (
                <p className="flex items-center gap-3 font-sans text-sm text-[#2E251E]">
                  <Check className="h-4 w-4 text-[#B76E4D]" />
                  Listo. Raquel también podrá llamarte al {phone}.
                </p>
              ) : (
                <>
                  <label htmlFor="patrimonio-telefono" className="font-sans text-sm text-[#2E251E]">
                    ¿Prefieres una llamada? Deja tu teléfono <span className="text-[#6E6259]">(opcional)</span>
                  </label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B76E4D]" />
                      <input
                        id="patrimonio-telefono"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="10 dígitos"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`${inputClass} bg-white pl-11`}
                      />
                    </div>
                    <a
                      href={phoneValid ? whatsappUrl(buildPhoneMessage(product, profile, phone.trim())) : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!phoneValid}
                      onClick={(e) => {
                        if (!phoneValid) e.preventDefault();
                        else setPhoneSent(true);
                      }}
                      className={`${primaryButton} ${phoneValid ? "" : "pointer-events-none opacity-40"}`}
                    >
                      Enviar mi número
                    </a>
                  </div>
                </>
              )}
            </div>

            {socials.length > 0 && (
              <div className="mt-8">
                <h3 className="font-serif text-xl text-[#2E251E]">Sigue a Raquel</h3>
                <p className="mt-1 font-sans text-sm text-[#6E6259]">
                  Comparte ideas para diseñar, construir y proteger tu patrimonio mientras preparas tu orientación.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socials.map((s) => {
                    const Icon = socialIcon[s.id];
                    return (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#E9DDCF] px-5 font-sans text-xs text-[#4A3F35] transition-colors hover:border-[#B76E4D] hover:text-[#B76E4D]"
                      >
                        <Icon className="h-4 w-4" />
                        {s.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatrimonioForm;
