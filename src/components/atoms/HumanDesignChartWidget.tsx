
import React, { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * HumanDesignChartWidget
 *
 * Exibe o iframe responsivo do Human Design chart com loading e tratamento de erro.
 */
const HumanDesignChartWidget: React.FC = () => {
  const isMobile = useIsMobile();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Para corrigir problemas com SSR/hidratação em alguns setups
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Early return: prevent server-side rendering/hydration mismatch
  if (!isClient) return null;

  const src = isMobile
    ? "https://humandesign.tools/widget/chart?mobile=1"
    : "https://humandesign.tools/widget/chart";

  // Tratamento de timeout para exibir erro se o iframe não carregar em 10s
  useEffect(() => {
    if (!loaded && isClient) {
      const timeout = setTimeout(() => {
        if (!loaded) setError(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [loaded, isClient]);

  return (
    <div className="mb-8 backdrop-blur-md bg-white/10 rounded-3xl p-4 md:p-8 border border-white/20 shadow-2xl animate-fade-in min-h-[480px] flex items-center justify-center relative">
      {!loaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/10 rounded-3xl pointer-events-none">
          <div className="animate-spin rounded-full border-t-2 border-b-2 border-astral-purple h-10 w-10 mb-2" />
          <span className="text-astral-purple text-sm font-medium">Carregando Human Design chart…</span>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-white/20 rounded-3xl">
          <span className="text-red-700 font-semibold mb-2">Falha ao carregar o gráfico de Human Design.</span>
          <span className="text-gray-700 text-sm mb-4 text-center">Verifique sua conexão ou tente novamente mais tarde.</span>
          <button
            className="bg-astral-purple hover:bg-astral-purple/90 text-white px-6 py-2 rounded-full shadow transition"
            onClick={() => {
              setError(false);
              setLoaded(false);
              if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.location.reload();
              }
            }}
            type="button"
          >
            Tentar novamente
          </button>
        </div>
      )}
      <iframe
        id="humanDesignWidget"
        ref={iframeRef}
        src={src}
        style={{ width: "100%", height: "450px", visibility: loaded && !error ? "visible" : "hidden" }}
        frameBorder={0}
        className="rounded-xl w-full"
        title="Human Design Chart Widget"
        allow="clipboard-write"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default HumanDesignChartWidget;
