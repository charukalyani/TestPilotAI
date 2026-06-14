import React, { useState, useEffect, useRef } from "react";
import {
    Play,
    Camera,
    Terminal,
    Globe,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    Monitor,
    Smartphone,
    Tablet,
    RotateCcw,
    ExternalLink,
    Activity,
    Search,
    Layout
} from "lucide-react";

interface AutomationStep {
    id: string;
    action: string;
    selector: string;
    status: "pending" | "running" | "passed" | "failed";
    timestamp: string;
    duration?: string;
}

interface Screenshot {
    id: string;
    url: string;
    label: string;
    timestamp: string;
}

export default function UIAutomation() {
    const [url, setUrl] = useState("https://testpilot.ai/demo");
    const [isRunning, setIsRunning] = useState(false);
    const [steps, setSteps] = useState<AutomationStep[]>([]);
    const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const logEndRef = useRef<HTMLDivElement>(null);

    const mockSteps: Omit<AutomationStep, "id" | "status" | "timestamp">[] = [
        { action: "Navigate", selector: "https://testpilot.ai/demo" },
        { action: "Wait for selector", selector: "button.hero-cta" },
        { action: "Click", selector: "button.hero-cta" },
        { action: "Fill", selector: "input#email" },
        { action: "Type", selector: "hello@testpilot.ai" },
        { action: "Click", selector: "button#submit" },
        { action: "Wait for navigation", selector: "/dashboard" },
        { action: "Assert visibility", selector: "h1.welcome-msg" },
    ];

    const handleRunTest = () => {
        setIsRunning(true);
        setSteps([]);
        setScreenshots([]);
        setCurrentStepIndex(0);

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex >= mockSteps.length) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }

            const newStep: AutomationStep = {
                id: Math.random().toString(36).substr(2, 9),
                ...mockSteps[currentIndex],
                status: "passed",
                timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                duration: `${(Math.random() * 2 + 0.5).toFixed(1)}s`
            };

            setSteps(prev => [...prev, newStep]);
            setCurrentStepIndex(currentIndex);

            // Randomly take a screenshot for some steps
            if (currentIndex % 3 === 0) {
                handleCaptureScreenshot(`Step ${currentIndex + 1}: ${mockSteps[currentIndex].action}`);
            }

            currentIndex++;
        }, 1500);
    };

    const handleCaptureScreenshot = (label: string = "Manual Capture") => {
        const newScreenshot: Screenshot = {
            id: Math.random().toString(36).substr(2, 9),
            url: `https://picsum.photos/seed/${Math.random()}/800/600`,
            label,
            timestamp: new Date().toLocaleTimeString()
        };
        setScreenshots(prev => [newScreenshot, ...prev]);
    };

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [steps]);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Layout className="w-6 h-6 text-brand-600" />
                        UI Automation
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Execute Playwright-powered automated tests in a live cloud environment.
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                    <button
                        onClick={() => setViewport("desktop")}
                        className={`p-2 rounded-xl transition-all ${viewport === "desktop" ? "bg-brand-50 text-brand-600 " : "text-slate-400 hover:text-slate-600 "}`}
                    >
                        <Monitor className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewport("tablet")}
                        className={`p-2 rounded-xl transition-all ${viewport === "tablet" ? "bg-brand-50 text-brand-600 " : "text-slate-400 hover:text-slate-600 "}`}
                    >
                        <Tablet className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewport("mobile")}
                        className={`p-2 rounded-xl transition-all ${viewport === "mobile" ? "bg-brand-50 text-brand-600 " : "text-slate-400 hover:text-slate-600 "}`}
                    >
                        <Smartphone className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* URL Bar */}
            <div className="flex gap-3 p-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex-1 relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 " />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                        placeholder="Enter website URL..."
                    />
                </div>
                <button
                    onClick={() => setScreenshots([]) || setSteps([])}
                    className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                    title="Reset"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
                <button
                    onClick={() => handleCaptureScreenshot()}
                    className="px-4 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                    <Camera className="w-4 h-4" />
                    <span className="hidden sm:inline">Screenshot</span>
                </button>
                <button
                    onClick={handleRunTest}
                    disabled={isRunning}
                    className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-100 flex items-center gap-2 hover:bg-brand-700 active:scale-95 transition-all disabled:opacity-50"
                >
                    {isRunning ? <Clock className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    {isRunning ? "Running..." : "Run Test"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Live Execution Log */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[500px]">
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                </div>
                                <div className="h-4 w-px bg-slate-800 mx-2" />
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                                    <Terminal className="w-3.5 h-3.5" />
                                    playwright-runner.log
                                </div>
                            </div>
                            {isRunning && (
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-2 custom-scrollbar">
                            {steps.length === 0 && !isRunning && (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2">
                                    <Activity className="w-8 h-8 opacity-20" />
                                    <p>Waiting for test execution...</p>
                                </div>
                            )}
                            {steps.map((step, i) => (
                                <div
                                    key={step.id}
                                    className="flex items-start gap-4 group animate-in fade-in slide-in-from-left-2 duration-300"
                                >
                                    <span className="text-slate-600 w-16 flex-shrink-0">[{step.timestamp}]</span>
                                    <span className="text-brand-400 font-bold w-20 flex-shrink-0 uppercase">{step.action}</span>
                                    <span className="text-slate-300 flex-1 break-all">{step.selector}</span>
                                    <span className="text-emerald-500 font-bold">{step.duration}</span>
                                </div>
                            ))}
                            <div ref={logEndRef} />
                        </div>
                    </div>

                    {/* Timeline of Actions */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-brand-600" />
                            Execution Timeline
                        </h3>
                        <div className="relative">
                            <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 " />
                            <div className="flex justify-between relative">
                                {mockSteps.slice(0, 6).map((step, i) => {
                                    const isCompleted = i <= currentStepIndex;
                                    const isCurrent = i === currentStepIndex;
                                    return (
                                        <div key={i} className="flex flex-col items-center gap-3 relative z-10">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${isCompleted ? "bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-100 " : "bg-white border-slate-200 text-slate-300 "
                                                } ${isCurrent ? "ring-4 ring-brand-100 scale-110" : ""}`}>
                                                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                                            </div>
                                            <div className="text-center">
                                                <div className={`text-[10px] font-bold uppercase tracking-wider ${isCompleted ? "text-slate-900 " : "text-slate-400 "}`}>
                                                    {step.action}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Screenshots Preview */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Camera className="w-4 h-4 text-brand-600" />
                                Screenshots
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-full">
                                    {screenshots.length}
                                </span>
                            </h3>
                        </div>

                        <div className="space-y-4 overflow-y-auto max-h-[650px] pr-2 custom-scrollbar">
                            {screenshots.map((shot) => (
                                <div
                                    key={shot.id}
                                    className="group relative rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all animate-in fade-in zoom-in-95 duration-300"
                                >
                                    <img
                                        src={shot.url}
                                        alt={shot.label}
                                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white text-xs font-bold">{shot.label}</span>
                                            <button className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-all">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{shot.timestamp}</span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 ">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Captured
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {screenshots.length === 0 && (
                                <div className="py-20 flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                                        <Camera className="w-6 h-6 opacity-20" />
                                    </div>
                                    <p className="text-xs font-medium">No screenshots captured yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
