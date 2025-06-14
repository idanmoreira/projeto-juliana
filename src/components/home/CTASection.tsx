import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 gradient-bg star-field">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Unlock clarity and guidance—discover what the stars have in store for you today.
          </p>
          <Tabs defaultValue="consultation" className="w-full max-w-md mx-auto">
            <TabsList className="grid grid-cols-2 mb-8 bg-card/30 border border-border">
              <TabsTrigger value="consultation">Consultation</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
            </TabsList>
            <TabsContent value="consultation" className="space-y-4">
              <Button className="w-full bg-astral-purple hover:bg-astral-purple/90 text-white py-6 text-lg">
                Book a Session
              </Button>
              <p className="text-sm text-muted-foreground">
                Individual consultations for insight, alignment, and progress.
              </p>
            </TabsContent>
            <TabsContent value="membership" className="space-y-4">
              <Button className="w-full bg-astral-gold hover:bg-astral-gold/90 text-astral-dark py-6 text-lg">
                Join Premium
              </Button>
              <p className="text-sm text-muted-foreground">
                Get access to all exclusive resources, discounts, and ongoing support!
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
