const BASE_URL = import.meta.env.VITE_CBF_API_URL as string;
const API_KEY = import.meta.env.VITE_CBF_API_KEY as string;

export interface CBFImage {
  image_url: string;
}

export interface CBFProperty {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo?: string;
  precio: number;
  area?: number;
  habitaciones?: number;
  banios?: number;
  estacionamientos?: number;
  direccion?: string;
  colonia?: string;
  id_tipo_accion?: number;
  latitud?: number;
  longitud?: number;
  imagenes_propiedades?: CBFImage[];
}

export interface CBFUser {
  id: string;
  nombre_usuario: string;
  email_usuario: string;
  telefono_usuario?: string;
  imagen_perfil_usuario?: string;
}

export interface CBFSite {
  id: string;
  site_name: string;
  subdomain?: string;
  theme_config?: { logo?: string; primaryColor?: string };
  platform_config?: { mapbox_token?: string | null };
}

const headers = () => ({
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
});

export async function fetchSiteUser(): Promise<{ user: CBFUser; site: CBFSite }> {
  const res = await fetch(`${BASE_URL}/user`, { headers: headers() });
  if (!res.ok) throw new Error("Error al cargar datos del sitio");
  const json = await res.json();
  return json.data;
}

export async function fetchProperties(params?: {
  limit?: number;
  offset?: number;
  tipo?: string;
  id_tipo_accion?: number;
}): Promise<{ data: CBFProperty[]; pagination: { limit: number; offset: number; total: number } }> {
  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));
  if (params?.tipo) query.set("tipo", params.tipo);
  if (params?.id_tipo_accion !== undefined)
    query.set("id_tipo_accion", String(params.id_tipo_accion));

  const res = await fetch(`${BASE_URL}/properties?${query}`, { headers: headers() });
  if (!res.ok) throw new Error("Error al cargar propiedades");
  return res.json();
}

export async function fetchProperty(id: string): Promise<CBFProperty> {
  const res = await fetch(`${BASE_URL}/properties/${id}`, { headers: headers() });
  if (!res.ok) throw new Error("Propiedad no encontrada");
  const json = await res.json();
  return json.data ?? json;
}

export function formatPrice(precio: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(precio);
}
