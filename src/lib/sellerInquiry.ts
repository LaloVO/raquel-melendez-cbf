import { fetchCatalog, postSellerInquiry, uploadFile } from "@/lib/cbf";

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

/**
 * Catálogos del formulario por CBF con el token del sitio (owner, 2026-10-16: los sitios no leen Supabase). Si CBF no responde,
 * el formulario queda sin opciones en vez de romperse, como antes.
 */
export async function fetchEstados(): Promise<{ id_estado: number; nombre_estado: string }[]> {
  return fetchCatalog<{ id_estado: number; nombre_estado: string }>("estados").catch(() => []);
}

export async function fetchCiudadesByEstado(
  idEstado: number
): Promise<{ id_ciudad: number; nombre_ciudad: string }[]> {
  return fetchCatalog<{ id_ciudad: number; nombre_ciudad: string }>("ciudades", { id_estado: String(idEstado) })
    .catch(() => []);
}

export async function fetchAmenidades(): Promise<
  { id_amenidad: number; nombre_amenidad: string }[]
> {
  return fetchCatalog<{ id_amenidad: number; nombre_amenidad: string }>("amenidades").catch(() => []);
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
