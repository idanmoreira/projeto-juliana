
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import AstrologyChartWidget from "@/components/atoms/AstrologyChartWidget";

const TOOL_OPTIONS = [
  { value: "natal", label: "Mapa Natal" },
  { value: "transits", label: "Trânsitos" },
  { value: "synastry", label: "Sinastria" },
];

const AstrologyTools = () => {
  const [tool, setTool] = useState("natal");
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [chartResult, setChartResult] = useState<string | null>(null);

  const generateChart = (e: React.FormEvent) => {
    e.preventDefault();

    setTimeout(() => {
      setChartResult(
        `Basic birth chart for ${name} born on ${date ? format(date, 'PP') : ''} at ${time} in ${location}`
      );
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Menu horizontal de ferramentas */}
      <div className="flex flex-row items-center gap-2 md:gap-6 mb-6 border-b border-muted pb-2">
        {TOOL_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTool(value)}
            className={cn(
              "text-sm font-medium px-2 pb-2 transition-colors relative focus:outline-none",
              tool === value
                ? "text-astral-purple after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-astral-purple"
                : "text-muted-foreground hover:text-astral-purple"
            )}
            type="button"
            aria-current={tool === value ? "page" : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chart widget always visible */}
      <AstrologyChartWidget />

      {/* TOOL-SPECIFIC CONTENT */}
      {tool === "natal" && (
        <Card className="mb-8 border-astral-purple/30">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4 text-center">Mapa Natal</h3>
            <form onSubmit={generateChart} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name" 
                    placeholder="Digite seu nome" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthdate">Data de nascimento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="birthdate"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Escolha a data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Hora de nascimento</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Cidade ou local de nascimento</Label>
                  <Input 
                    id="location" 
                    placeholder="Digite a cidade/local" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-astral-purple hover:bg-astral-purple/90"
              >
                Gerar mapa natal
              </Button>
            </form>

            {chartResult && (
              <div className="mt-6 p-4 border border-astral-purple/30 bg-astral-purple/10 rounded-lg">
                <h4 className="font-semibold mb-2">Seu mapa básico</h4>
                <p>{chartResult}</p>
                <div className="mt-4 p-3 bg-astral-gold/10 border border-astral-gold rounded">
                  <p className="text-sm">Assine o Premium para obter seu mapa completo</p>
                  <Button 
                    variant="default" 
                    className="mt-2 bg-astral-gold hover:bg-astral-gold/90 text-astral-dark"
                  >
                    Assinar Premium
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {tool !== "natal" && (
        <Card className="mb-8 border-astral-purple/30">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              {TOOL_OPTIONS.find((opt) => opt.value === tool)?.label}
            </h3>
            <div className="text-center text-lg text-muted-foreground py-12">
              Em breve.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AstrologyTools;
