import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, TrendingUp, BarChart3, Zap } from "lucide-react";

/**
 * Design Philosophy: Clinical Minimalism with Warm Neutrals
 * Landing page with authentication forms and hero section
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/hero-bg.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">
                  Understand Your Gut Health
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Ventre passively tracks your digestive patterns and reveals trends that matter. One event means nothing. Trends over time tell the real story.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Trend-Based Insights</h3>
                    <p className="text-sm text-muted-foreground">See patterns over weeks and months, not daily noise.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <BarChart3 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Clear Visualizations</h3>
                    <p className="text-sm text-muted-foreground">Professional charts designed for clarity and confidence.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Passive Tracking</h3>
                    <p className="text-sm text-muted-foreground">Automatic logging—no manual entry required.</p>
                  </div>
                </div>
              </div>

              {/* Trust Statement */}
              <div className="p-4 bg-secondary rounded-lg border border-border">
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    <strong>Not a medical device.</strong> Ventre displays patterns and trends. Always consult a healthcare provider for medical concerns.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Auth Form */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md p-8">
                <div className="space-y-6">
                  <div>
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
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Dashboard Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to understand your digestive health trends
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Gut Health Score",
                description:
                  "Composite metric combining frequency, consistency, and regularity patterns.",
              },
              {
                title: "Frequency Tracking",
                description:
                  "Weekly and daily bowel movement counts with timing analysis.",
              },
              {
                title: "Consistency Trends",
                description:
                  "Track stool consistency patterns over time without medical labels.",
              },
              {
                title: "Regularity Index",
                description:
                  "Measure how predictable your digestive timing is week to week.",
              },
              {
                title: "Correlation Analysis",
                description:
                  "See how hydration, diet, and lifestyle factors associate with your patterns.",
              },
              {
                title: "Insights Feed",
                description:
                  "Neutral, pattern-based observations about your digestive health.",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>
            Ventre is a passive digestive tracking system. Not a medical device. Always consult healthcare providers for medical concerns.
          </p>
        </div>
      </footer>
    </div>
  );
}
