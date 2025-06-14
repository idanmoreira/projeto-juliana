
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * AstrologyChartWidget
 *
 * Renders the Neutrino astrology chart iframe responsively, styled to fit the app's design.
 */
const AstrologyChartWidget = () => {
  const isMobile = useIsMobile();

  const src = isMobile
    ? "https://neutrinoplatform.com/widget/chart/new?apiKey=6dc1fa162b1dda904f9649f365496e3d9fe0166f&mobile=1"
    : "https://neutrinoplatform.com/widget/chart/new?apiKey=6dc1fa162b1dda904f9649f365496e3d9fe0166f";

  return (
    <div className="mb-8 backdrop-blur-md bg-white/10 rounded-3xl p-4 md:p-8 border border-white/20 shadow-2xl animate-fade-in">
      <iframe
        id="chartWidget"
        src={src}
        style={{ width: "100%", height: "450px" }}
        frameBorder={0}
        className="rounded-xl w-full"
        title="Astrology Chart Widget"
        allow="clipboard-write"
      />
    </div>
  );
};

export default AstrologyChartWidget;
