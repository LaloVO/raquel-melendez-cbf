import { postSellerInquiry, uploadFile } from "@/lib/cbf";

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string) || "https://nxouqoyppkiqrhfzovny.supabase.co";
const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
  ".eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54b3Vxb3lwcGtpcXJoZnpvdm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MDQxODMsImV4cCI6MjA5NDI4MDE4M30" +
  ".zDlAxuD-YISh93Y4CWTWuJJP9HAWlPru32MbAfc3dtA";


export interface SellerInquiryPayload {
  nombre_completo: string;
  email: string;
  telefono: string;
  id_tipo_accion?: number;
  titulo_propiedad?: string;
  id_tipo_propiedad?: number;
  precio_propiedad?: number;
  id_estado?: number;
  id_ciudad?: number;
  estado_nombre?: string;
  ciudad_nombre?: string;
  codigo_postal?: string;
  colonia?: string;
  direccion?: string;
  referencias?: string;
  latitud?: number | null;
  longitud?: number | null;
  area_propiedad?: number;
  area_construida?: number;
  habitaciones_propiedad?: number;
  banios_propiedad?: number;
  estacionamientos_propiedad?: number;
  numero_plantas?: number;
  descripcion_propiedad?: string;
  descripcion_estado_propiedad?: string;
  descripcion_inversion_propiedad?: string;
  es_herencia?: boolean;
  /** Fotos subidas con `uploadFile(…, "seller_image")`, por su ruta. */
  imagenes: { path: string; nombre_imagen: string; orden: number }[];
  /** Documentos subidos con `uploadFile(…, "seller_document")`, por su ruta. */
  documentos: { path: string; nombre_documento: string; required: boolean }[];
  amenidades: number[];
}

/**
 * Sube una foto o un documento de la captación con permiso de CBF y devuelve su ruta (owner, 2026-10-16: «es el CBF el que escribe
 * en Supabase, NO los sitios»). Los buckets de captación ya no aceptan subidas con la llave pública (migración 20261016000100).
 */
export function uploadSellerFile(file: File, bucket: "seller-inquiry-images" | "seller-inquiry-docs"): Promise<string> {
  return uploadFile(file, bucket === "seller-inquiry-images" ? "seller_image" : "seller_document");
}

/**
 * La captación completa en una sola petición a CBF, que la guarda en `seller_inquiries` y sus tablas hijas a nombre del asesor del
 * sitio (el asesor sale del token). Antes se escribía con la llave pública y el `return=representation` la rechazaba siempre.
 */
export function submitSellerInquiry(payload: SellerInquiryPayload): Promise<{ id: string }> {
  return postSellerInquiry(payload);
}

export async function fetchEstados(): Promise<{ id_estado: number; nombre_estado: string }[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/estados?select=id_estado,nombre_estado&order=nombre_estado`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function fetchCiudadesByEstado(
  idEstado: number
): Promise<{ id_ciudad: number; nombre_ciudad: string }[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/ciudades?select=id_ciudad,nombre_ciudad&id_estado=eq.${idEstado}&order=nombre_ciudad`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function fetchAmenidades(): Promise<
  { id_amenidad: number; nombre_amenidad: string }[]
> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/amenidades?select=id_amenidad,nombre_amenidad&order=nombre_amenidad`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function geocodeAddress(
  direccion: string,
  ciudad: string,
  estado: string,
  mapboxToken: string
): Promise<{ lat: number; lng: number } | null> {
  if (!mapboxToken || !direccion) return null;
  try {
    const query = encodeURIComponent(`${direccion}, ${ciudad}, ${estado}, México`);
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&limit=1&country=mx`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const feature = data.features?.[0];
    if (!feature) return null;
    const [lng, lat] = feature.center;
    return { lat, lng };
  } catch {
    return null;
  }
}
