import { memo, useEffect, useRef } from "react";

type Props = {
  onMuscleSelect: (muscle: string) => void;
};

declare global {
  interface Window {
    Sketchfab?: any;
  }
}

const SKETCHFAB_SCRIPT_ID = "sketchfab-viewer-api";

function loadSketchfabScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Sketchfab) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(SKETCHFAB_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () =>
        reject(new Error("No se pudo cargar la Sketchfab Viewer API"))
      );
      return;
    }

    const script = document.createElement("script");
    script.id = SKETCHFAB_SCRIPT_ID;
    script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("No se pudo cargar la Sketchfab Viewer API"));

    document.body.appendChild(script);
  });
}

function SketchfabViewer({ onMuscleSelect }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<any>(null);
  const initializedRef = useRef(false);
  const onMuscleSelectRef = useRef(onMuscleSelect);

  useEffect(() => {
    onMuscleSelectRef.current = onMuscleSelect;
  }, [onMuscleSelect]);

  useEffect(() => {
    let cancelled = false;

    async function initViewer() {
      if (initializedRef.current) return;

      const iframe = iframeRef.current;
      if (!iframe) return;

      try {
        await loadSketchfabScript();

        if (cancelled || initializedRef.current) return;

        if (!window.Sketchfab) {
          throw new Error("window.Sketchfab no está disponible después de cargar el script");
        }

        const client = new window.Sketchfab("1.12.1", iframe);

        initializedRef.current = true;

        client.init("e402d3d541eb4b199c57d5410f5d3c57", {
          success: (api: any) => {
            if (cancelled) return;

            apiRef.current = api;
            api.start();

            api.addEventListener("annotationSelect", (index: number) => {
              api.getAnnotation(index, (err: any, annotation: any) => {
                if (err || !annotation?.name) return;
                onMuscleSelectRef.current(annotation.name);
              });
            });
          },
          error: () => {
            console.error("Error al inicializar Sketchfab");
            initializedRef.current = false;
          },
          ui_controls: 1,
          ui_infos: 1,
          ui_stop: 0,
        });
      } catch (error) {
        console.error("Error cargando Sketchfab:", error);
        initializedRef.current = false;
      }
    }

    initViewer();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Sketchfab Viewer"
      className="h-full w-full rounded-xl"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowFullScreen
    />
  );
}

export default memo(SketchfabViewer);