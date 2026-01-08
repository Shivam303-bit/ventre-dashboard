import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, TrendingUp, BarChart3, Zap } from "lucide-react";

/**
 * Design Philosophy: Clinical Minimalism with Warm Neutrals
 * Professional, centered landing page with prominent Ventre branding
 */

export default function Landing() {
  const { login, signup, isLoading } = useAuth();
  const [, setLocation] = useLocation();
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="/images/pattern-accent.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Logo & Brand */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">V</span>
              </div>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold text-foreground mb-2">Ventre</h1>
            <p className="text-xl text-muted-foreground">Understand Your Gut Health</p>
          </div>

          {/* Tagline */}
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Ventre passively tracks your digestive patterns and reveals trends that matter. 
              <span className="block font-semibold text-foreground mt-2">
                One event means nothing. Trends over time tell the real story.
              </span>
            </p>
          </div>

          {/* Auth Card */}
          <Card className="p-8 mb-12 shadow-lg">
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
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Trend-Based</h3>
              <p className="text-sm text-muted-foreground">
                See patterns over weeks and months, not daily noise.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Clear Data</h3>
              <p className="text-sm text-muted-foreground">
                Professional visualizations designed for clarity.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Passive</h3>
              <p className="text-sm text-muted-foreground">
                Automatic logging—no manual entry required.
              </p>
            </div>
          </div>

          {/* Trust Statement */}
          <div className="p-4 bg-secondary rounded-lg border border-border text-center">
            <div className="flex gap-2 items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm text-foreground">
                <strong>Not a medical device.</strong> Always consult healthcare providers for medical concerns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Ventre is a passive digestive tracking system. © 2026. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
