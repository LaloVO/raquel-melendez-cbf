import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import { PATRIMONIO_CONFIG } from "./config";
import type { PatrimonioProduct } from "./products";

type VideoSource =
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "file"; src: string }
  | { kind: "none" };

const parseVideo = (url: string): VideoSource => {
  const clean = url.trim();
  if (!clean) return { kind: "none" };
  const yt = clean.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "youtube", id: yt[1] };
  const vimeo = clean.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "vimeo", id: vimeo[1] };
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(clean)) return { kind: "file", src: clean };
  return { kind: "none" };
};

interface YTPlayer {
  destroy: () => void;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: { videoId: string; playerVars?: Record<string, number>; events?: { onStateChange?: (e: { data: number }) => void } },
  ) => YTPlayer;
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApi: Promise<YTNamespace> | null = null;
const loadYouTubeApi = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!ytApi) {
    ytApi = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        if (window.YT) resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    });
  }
  return ytApi;
};

const YouTubeVideo = ({ id, onEnded }: { id: string; onEnded: () => void }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const endedRef = useRef(onEnded);
  endedRef.current = onEnded;

  useEffect(() => {
    let player: YTPlayer | null = null;
    let cancelled = false;
    // El reproductor reemplaza su nodo; se crea fuera del árbol que controla React.
    const mount = document.createElement("div");
    mount.className = "w-full h-full";
    const host = hostRef.current;
    host?.appendChild(mount);
    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      player = new YT.Player(mount, {
        videoId: id,
        playerVars: { autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1 },
        events: { onStateChange: (e) => e.data === 0 && endedRef.current() },
      });
    });
    return () => {
      cancelled = true;
      player?.destroy();
      host?.replaceChildren();
    };
  }, [id]);

  return <div ref={hostRef} className="absolute inset-0 [&_iframe]:w-full [&_iframe]:h-full" />;
};

const VimeoVideo = ({ id, onEnded }: { id: string; onEnded: () => void }) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!String(e.origin).includes("vimeo.com")) return;
      let data = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (data?.event === "ready") {
        frameRef.current?.contentWindow?.postMessage(JSON.stringify({ method: "addEventListener", value: "finish" }), "*");
      }
      if (data?.event === "finish") onEnded();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onEnded]);
  return (
    <iframe
      ref={frameRef}
      src={`https://player.vimeo.com/video/${id}?autoplay=1&api=1`}
      className="absolute inset-0 w-full h-full"
      allow="autoplay; fullscreen; picture-in-picture"
      title="Video explicativo"
    />
  );
};

interface Props {
  product: PatrimonioProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDesign: () => void;
}

const PatrimonioVideoModal = ({ product, open, onOpenChange, onDesign }: Props) => {
  const source = parseVideo(product.videoUrl ?? PATRIMONIO_CONFIG.videoUrl);
  const [ended, setEnded] = useState(source.kind === "none");

  useEffect(() => {
    if (open) setEnded(source.kind === "none");
  }, [open, source.kind]);

  const handleEnded = () => setEnded(true);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[120] bg-[#2E251E]/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-[121] w-[94vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-[#2E251E] text-[#FAF7F2] shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none"
        >
          <div className="relative aspect-video w-full bg-black">
            {source.kind === "youtube" && open && <YouTubeVideo id={source.id} onEnded={handleEnded} />}
            {source.kind === "vimeo" && open && <VimeoVideo id={source.id} onEnded={handleEnded} />}
            {source.kind === "file" && open && (
              <video src={source.src} className="absolute inset-0 w-full h-full" controls autoPlay playsInline onEnded={handleEnded} />
            )}
            {source.kind === "none" && (
              <>
                <img src={product.image} alt={product.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E251E] via-[#2E251E]/30 to-transparent" />
              </>
            )}
          </div>

          <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-xl">
              <DialogPrimitive.Title className="font-serif text-2xl md:text-3xl font-light leading-tight">
                {product.name}. <span className="italic text-[#E3A587]">{product.promise}</span>
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 font-sans text-sm text-[#FAF7F2]/65 leading-relaxed">
                {ended
                  ? "Cuando estés listo, empieza a diseñar tu estrategia con Raquel."
                  : "Mira cómo funciona esta estrategia. Al terminar, podrás comenzar."}
              </DialogPrimitive.Description>
            </div>

            <button
              type="button"
              onClick={onDesign}
              disabled={!ended}
              aria-hidden={!ended}
              tabIndex={ended ? 0 : -1}
              className={`shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#B76E4D] px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#FAF7F2] hover:text-[#2E251E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3A587] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E251E] motion-reduce:transition-none ${
                ended ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
              }`}
            >
              Diseñar mi patrimonio
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <DialogPrimitive.Close
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3A587]"
            aria-label="Cerrar video"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default PatrimonioVideoModal;
