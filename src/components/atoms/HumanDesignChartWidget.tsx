
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * HumanDesignChartWidget
 *
 * Exibe o iframe responsivo do Human Design chart
 */
const HumanDesignChartWidget = () => {
  const isMobile = useIsMobile();

  const src = isMobile
    ? "https://humandesign.tools/widget/chart?mobile=1"
    : "https://humandesign.tools/widget/chart";

  return (
    <div className="mb-8 backdrop-blur-md bg-white/10 rounded-3xl p-4 md:p-8 border border-white/20 shadow-2xl animate-fade-in">
      <iframe
        id="humanDesignWidget"
        src={src}
        style={{ width: "100%", height: "450px" }}
        frameBorder={0}
        className="rounded-xl w-full"
        title="Human Design Chart Widget"
        allow="clipboard-write"
      />
    </div>
  );
};

export default HumanDesignChartWidget;
