import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight, MessageSquare, Target, Zap, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Lukman Jaya AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign in
            </Button>
            <Button onClick={() => navigate("/login")}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-4 w-4" />
            AI-Powered Customer Service
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Transform Your Customer Service with{" "}
            <span className="text-primary">AI Intelligence</span>
          </h1>
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            Automate WhatsApp conversations, generate leads, and close sales 24/7
            with our advanced AI chatbot platform designed for Indonesian businesses.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" onClick={() => navigate("/login")}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/login")}>
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-card/50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-muted-foreground">
              Powerful features designed for high-ticket businesses
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MessageSquare,
                title: "AI Chatbot",
                description:
                  "24/7 intelligent responses trained on your business knowledge",
              },
              {
                icon: Target,
                title: "Lead Intelligence",
                description:
                  "Automatically qualify and score leads based on conversation intent",
              },
              {
                icon: Zap,
                title: "Instant Payments",
                description:
                  "Generate and send Midtrans payment links directly in chat",
              },
              {
                icon: Shield,
                title: "Human Takeover",
                description:
                  "Seamlessly switch to human agents for complex conversations",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join hundreds of Indonesian businesses using Lukman Jaya AI to
              automate their customer service and increase sales.
            </p>
            <Button size="xl" onClick={() => navigate("/login")}>
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">
              Lukman Jaya AI
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Lukman Jaya AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
