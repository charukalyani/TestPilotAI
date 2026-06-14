import {
  Terminal,
  Shield,
  Zap,
  Bug,
  Code2,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Play,
  Clock,
  Repeat,
  AlertCircle,
  Cpu,
  Layers,
  Globe,
  Star,
  Quote,
  Sun,
  Moon
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Components ---

const Button = ({ children, variant = "primary", className = "", onClick }: any) => {
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm",
    brand: "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-100",
  };

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-2 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {children}
    </button>
  );
};

const Navbar = ({ onStartTesting, onLogin }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 ">TestPilot<span className="text-brand-600">AI</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">The Problem</a>
          <a href="#solution" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Solution</a>
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Features</a>
          <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Testimonials</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onLogin}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Log in
          </button>
          <Button onClick={onStartTesting}>
            Start Testing Free
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button className="text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <a href="#problem" className="text-base font-medium text-slate-600 ">The Problem</a>
          <a href="#solution" className="text-base font-medium text-slate-600 ">Solution</a>
          <a href="#features" className="text-base font-medium text-slate-600 ">Features</a>
          <a href="#testimonials" className="text-base font-medium text-slate-600">Testimonials</a>
          <button
            onClick={onStartTesting}
            className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl"
          >
            Start Testing Free
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onStartTesting }: any) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold mb-8 shadow-sm">
            <Cpu className="w-3.5 h-3.5" />
            AI-POWERED TESTING FOR MODERN TEAMS
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
            Automate your QA with <span className="text-gradient">Intelligent Agents.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop wasting hours on manual test scripts. TestPilot AI generates, runs, and heals automated tests using advanced LLMs so you can ship faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={onStartTesting}
              className="w-full sm:w-auto px-8 py-4 text-base"
              variant="brand"
            >
              Start Testing Free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base">
              <Play className="w-4 h-4 fill-slate-900 " />
              View Demo
            </Button>
          </div>

          <div className="pt-8 border-t border-slate-100 max-w-3xl mx-auto">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by elite QA teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40 grayscale contrast-125 ">
              <div className="text-lg font-black tracking-tighter text-slate-900">VERCEL</div>
              <div className="text-lg font-black tracking-tighter text-slate-900">STRIPE</div>
              <div className="text-lg font-black tracking-tighter text-slate-900">LINEAR</div>
              <div className="text-lg font-black tracking-tighter text-slate-900">GITHUB</div>
              <div className="text-lg font-black tracking-tighter text-slate-900">NOTION</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  const painPoints = [
    {
      icon: Clock,
      title: "Manual testing is too slow",
      description: "Human testers can't keep up with 50+ deployments a day. Bottlenecks delay your releases by weeks.",
      color: "text-amber-600 ",
      bg: "bg-amber-50 "
    },
    {
      icon: Repeat,
      title: "Repetitive script maintenance",
      description: "One small UI change breaks your entire Selenium suite. You spend more time fixing tests than building features.",
      color: "text-rose-600 ",
      bg: "bg-rose-50 "
    },
    {
      icon: AlertCircle,
      title: "Critical bugs are missed",
      description: "Manual coverage is never 100%. Edge cases slip through to production, costing you users and revenue.",
      color: "text-indigo-600 ",
      bg: "bg-indigo-50 "
    }
  ];

  return (
    <section id="problem" className="py-24 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-base font-bold text-rose-600 tracking-wide uppercase mb-4">The Problem</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Testing is the #1 bottleneck in modern software delivery.</h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              As your application grows, the cost of manual QA and script maintenance scales exponentially. Most teams are forced to choose between speed and quality.
            </p>
            <div className="space-y-6">
              {painPoints.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${point.bg} flex items-center justify-center`}>
                    <point.icon className={`w-6 h-6 ${point.color}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{point.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-inner">
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-slate-200 rounded-full animate-pulse" />
                <div className="h-4 w-1/2 bg-slate-200 rounded-full animate-pulse" />
                <div className="h-24 w-full bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center">
                  <div className="text-rose-600 font-mono text-xs flex items-center gap-2">
                    <Bug className="w-4 h-4" />
                    CRITICAL_ERROR: Element not found in DOM
                  </div>
                </div>
                <div className="h-4 w-2/3 bg-slate-200 rounded-full animate-pulse" />
                <div className="h-32 w-full bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
                  <p className="text-slate-400 text-xs italic">Waiting for QA approval...</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[240px]">
              <div className="text-3xl font-bold text-rose-600 mb-1">42%</div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Time wasted</div>
              <p className="text-[10px] text-slate-500 mt-2">Average engineering time spent on manual QA and test maintenance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Solution = () => {
  return (
    <section id="solution" className="py-24 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-base font-bold text-brand-400 tracking-wide uppercase mb-4">The Solution</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">AI that thinks like a QA Engineer.</h3>
          <p className="text-lg text-slate-400 leading-relaxed">
            TestPilot AI uses specialized LLMs to understand your application's intent. It doesn't just follow scripts—it explores, validates, and heals itself automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Zero Scripting",
              desc: "Describe your test in plain English. Our AI generates the Playwright code instantly.",
              icon: Code2
            },
            {
              title: "Self-Healing",
              desc: "When your UI changes, the AI identifies the update and fixes the test automatically.",
              icon: Zap
            },
            {
              title: "Autonomous Discovery",
              desc: "Our agents crawl your app to find bugs and edge cases before your users do.",
              icon: Globe
            }
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-6 border border-brand-500/30">
                <item.icon className="w-6 h-6 text-brand-400" />
              </div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "AI Test Case Generator",
      description: "Upload a screenshot or paste a URL. Our AI generates a full suite of functional test cases in seconds.",
      icon: Cpu,
      color: "text-brand-600 ",
      bg: "bg-brand-50 "
    },
    {
      title: "API Testing",
      description: "Automatically scan your endpoints. AI detects schema mismatches and security vulnerabilities in your REST/GraphQL APIs.",
      icon: Layers,
      color: "text-blue-600 ",
      bg: "bg-blue-50 "
    },
    {
      title: "UI Automation (Playwright)",
      description: "Export clean, production-ready Playwright or Cypress code. No proprietary lock-in, just pure open-source standards.",
      icon: Terminal,
      color: "text-emerald-600 ",
      bg: "bg-emerald-50 "
    },
    {
      title: "Bug Prediction",
      description: "Our ML models analyze your commit history to predict which parts of your app are most likely to have regressions.",
      icon: Shield,
      color: "text-indigo-600 ",
      bg: "bg-indigo-50 "
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold text-brand-600 tracking-wide uppercase mb-3">Features</h2>
          <p className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Superpowers for your QA workflow.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm transition-all group hover:-translate-y-2 hover:shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DemoPreview = () => {
  return (
    <section className="py-24 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold text-brand-600 tracking-wide uppercase mb-3">Dashboard</h2>
          <p className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Manage your entire QA lifecycle.</p>
        </div>

        <div className="relative mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-slate-50 p-3 shadow-2xl overflow-hidden">
          <div className="bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="h-14 border-b border-slate-100 flex items-center px-6 justify-between bg-slate-50/50 ">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-32 bg-slate-200 rounded-full" />
                <div className="w-8 h-8 rounded-full bg-slate-200 " />
              </div>
            </div>
            <div className="flex h-[600px]">
              <div className="w-64 border-r border-slate-100 p-6 hidden lg:block bg-slate-50/30 ">
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded bg-slate-200 " />
                      <div className={`h-2 rounded-full ${i === 1 ? 'bg-brand-400 w-full' : 'bg-slate-200 w-2/3'}`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-8 overflow-hidden">
                <div className="grid grid-cols-3 gap-6 mb-10">
                  {[
                    { label: "Total Tests", value: "12,402", color: "text-slate-900 " },
                    { label: "Success Rate", value: "99.8%", color: "text-emerald-600 " },
                    { label: "Bugs Found", value: "142", color: "text-rose-600 " }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 ">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</div>
                      <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-slate-900 ">Recent Test Runs</h4>
                    <button className="text-xs font-bold text-brand-600 ">View All</button>
                  </div>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-4 border border-slate-100 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${i === 3 ? 'bg-amber-50 ' : 'bg-emerald-50 '}`}>
                          <CheckCircle2 className={`w-5 h-5 ${i === 3 ? 'text-amber-600 ' : 'text-emerald-600 '}`} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 ">Production Regression Suite</div>
                          <div className="text-[10px] text-slate-500 ">Run #1204 • 2 mins ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="hidden sm:block">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Duration</div>
                          <div className="text-xs font-medium text-slate-900 ">45s</div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase">Details</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Head of QA @ Vercel",
      content: "TestPilot AI reduced our manual testing time by 80%. The self-healing feature is a game changer for our fast-moving team.",
      avatar: "https://picsum.photos/seed/sarah/100/100"
    },
    {
      name: "Marcus Thorne",
      role: "SDET Lead @ Stripe",
      content: "The AI test generation is scarily accurate. It caught three critical checkout bugs that our manual suite missed for months.",
      avatar: "https://picsum.photos/seed/marcus/100/100"
    },
    {
      name: "Elena Rodriguez",
      role: "Security Analyst @ GitHub",
      content: "Finally, a testing tool that integrates security scanning natively. It's now a mandatory part of our CI/CD pipeline.",
      avatar: "https://picsum.photos/seed/elena/100/100"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold text-brand-600 tracking-wide uppercase mb-3">Testimonials</h2>
          <p className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Loved by engineers worldwide.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative">
              <Quote className="absolute top-6 right-8 w-10 h-10 text-slate-50 " />
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-100 " referrerPolicy="no-referrer" />
                <div>
                  <div className="text-sm font-bold text-slate-900 ">{t.name}</div>
                  <div className="text-xs text-slate-500 ">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onStartTesting }: any) => {
  return (
    <section className="py-24 bg-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-brand-200 ">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
          <div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">Stop testing like it's 2015.</h2>
            <p className="text-brand-100 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Join 10,000+ engineering teams who use TestPilot AI to ship faster and more reliably.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartTesting}
                className="w-full sm:w-auto px-10 py-5 bg-white text-brand-600 font-bold rounded-full hover:bg-brand-50 transition-all shadow-xl"
              >
                Start Testing Free
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-brand-700 text-white font-bold rounded-full hover:bg-brand-800 transition-all border border-brand-500">
                Schedule a Demo
              </button>
            </div>
            <p className="mt-8 text-brand-200 text-sm font-medium">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">TestPilot<span className="text-brand-600">AI</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              The intelligent testing platform for modern engineering teams. Ship faster, test smarter.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:text-white cursor-pointer transition-colors">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:text-white cursor-pointer transition-colors">
                <Terminal className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 TestPilot AI Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main Page ---

export default function LandingPage({ onStartTesting, onLogin }: any) {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <Navbar onStartTesting={onStartTesting} onLogin={onLogin} />
      <main>
        <Hero onStartTesting={onStartTesting} />
        <Problem />
        <Solution />
        <Features />
        <DemoPreview />
        <SocialProof />
        <FinalCTA onStartTesting={onStartTesting} />
      </main>
      <Footer />
    </div>
  );
}
