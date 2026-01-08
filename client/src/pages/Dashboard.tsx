import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";
import Home from "./Home";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

/**
 * Protected dashboard page - redirects to landing if not authenticated
 */

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* User Header Bar */}
      <div className="fixed top-0 right-0 left-0 z-50 bg-card border-b border-border">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">{user.name}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content with offset for header */}
      <div className="pt-16">
        <Home />
      </div>
    </div>
  );
}
