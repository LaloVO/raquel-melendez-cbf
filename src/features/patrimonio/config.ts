// Configuración independiente de la línea Patrimonio.
// No depende de CBF/Homepty: estos valores los administra Raquel directamente.

export interface PatrimonioSocialLink {
  id: "instagram" | "facebook" | "tiktok" | "linkedin" | "youtube";
  label: string;
  url: string;
}

export const PATRIMONIO_CONFIG = {
  // Número de WhatsApp en formato internacional sin signos (ej. 52 + 10 dígitos).
  // Vacío = WhatsApp pide al visitante elegir el contacto.
  whatsappNumber: "",

  // Video explicativo compartido. Acepta URL de YouTube, Vimeo o archivo .mp4/.webm.
  // Cada estrategia puede sobrescribirlo con `videoUrl` en products.ts.
  videoUrl: "",

  // Solo se muestran las redes con URL.
  socials: [
    { id: "instagram", label: "Instagram", url: "" },
    { id: "facebook", label: "Facebook", url: "" },
    { id: "tiktok", label: "TikTok", url: "" },
    { id: "linkedin", label: "LinkedIn", url: "" },
  ] as PatrimonioSocialLink[],
};
