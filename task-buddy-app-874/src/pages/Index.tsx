import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CheckSquare, ArrowRight, CheckCircle2, Shield, Zap, Users } from "lucide-react";

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: CheckCircle2,
      title: "Task Management",
      description: "Create, update, and organize your tasks with ease. Set priorities and due dates.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. Only you can access your tasks.",
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      description: "Lightning-fast performance across all devices. Works seamlessly on mobile and desktop.",
    },
    {
      icon: Users,
      title: "Personal Dashboard",
      description: "Get a clear overview of your productivity with stats and filtered views.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary">
              <CheckSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TaskFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Productivity made simple
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Organize your tasks,{" "}
            <span className="text-primary">boost your productivity</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            TaskFlow is a powerful yet simple task manager that helps you stay organized, 
            focused, and in control of your daily workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 shadow-glow">
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-20 border-t border-border/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything you need to stay productive
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple tools designed to help you manage tasks efficiently without the complexity.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-card border border-border/50 hover:shadow-lg transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20">
        <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl gradient-primary">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to get organized?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Join thousands of users who trust TaskFlow for their daily productivity.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 TaskFlow. Built with ❤️ for productivity enthusiasts.</p>
        </div>
      </footer>
    </div>
  );
}
