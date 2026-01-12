import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, TrendingUp, BarChart3, Zap, Calendar, Activity, Droplet, Brain } from "lucide-react";

/**
 * Design Philosophy: Clinical Minimalism with Warm Neutrals + Slight Vibe Coding
 * Landing page with top login button and feature facts grid
 */

export default function Landing() {
  const { login, signup, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLoginMode) {
        if (!formData.email || !formData.password) {
          setError("Please fill in all fields");
          return;
        }
        await login(formData.email, formData.password);
      } else {
        if (!formData.email || !formData.password || !formData.name) {
          setError("Please fill in all fields");
          return;
        }
        await signup(formData.email, formData.password, formData.name);
      }
      setLocation("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const features = [
    {
      icon: Calendar,
      title: "Weekly Trends",
      description: "See patterns over weeks and months, not daily noise.",
    },
    {
      icon: Activity,
      title: "Frequency Tracking",
      description: "Monitor bowel movements and timing consistency.",
    },
    {
      icon: BarChart3,
      title: "Clear Visualizations",
      description: "Professional charts designed for clarity and confidence.",
    },
    {
      icon: Droplet,
      title: "Hydration Insights",
      description: "Correlate water intake with digestive patterns.",
    },
    {
      icon: Brain,
      title: "Smart Correlations",
      description: "Discover associations between lifestyle and digestive health.",
    },
    {
      icon: Zap,
      title: "Passive Tracking",
      description: "Automatic logging—no manual entry required.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-15 pointer-events-none">
        <img
          src="/images/pattern-accent.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header with Login Button */}
      <header className="relative z-40 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo-frame.png" alt="Ventre Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-foreground">Ventre</h1>
          </div>
          <Button
            onClick={() => {
              setShowAuthModal(true);
              setIsLoginMode(true);
              setFormData({ email: "", password: "", name: "" });
              setError("");
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Understand Your Gut Health
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              Ventre passively tracks your digestive patterns and reveals trends that matter.
            </p>
            <p className="text-lg font-semibold text-foreground">
              One event means nothing. Trends over time tell the real story.
            </p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => {
              setShowAuthModal(true);
              setIsLoginMode(false);
              setFormData({ email: "", password: "", name: "" });
              setError("");
            }}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8"
          >
            Get Started Free
          </Button>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 bg-card/50 backdrop-blur-sm"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 lg:py-16 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 text-center">
              <div className="flex gap-3 items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-foreground">
                  <strong>Not a medical device.</strong> Ventre displays patterns and trends. Always consult healthcare providers for medical concerns.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">
                  {isLoginMode ? "Welcome Back" : "Get Started"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {isLoginMode
                    ? "Sign in to view your gut health dashboard"
                    : "Create an account to track your digestive health"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={isLoading}
                      className="w-full"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base font-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isLoginMode ? "Signing in..." : "Creating account..."}
                    </>
                  ) : isLoginMode ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setFormData({ email: "", password: "", name: "" });
                  setError("");
                }}
                disabled={isLoading}
                className="w-full"
              >
                {isLoginMode ? "Create Account" : "Sign In"}
              </Button>

              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="relative border-t border-border py-6 text-center bg-card/30 backdrop-blur-sm">
        <p className="text-xs text-muted-foreground">
          Ventre is a passive digestive tracking system. © 2026. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
