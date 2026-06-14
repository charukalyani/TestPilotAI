import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Globe,
    Layers,
    Shield,
    Sparkles,
    Copy,
    Check,
    ChevronRight,
    AlertCircle,
    Terminal,
    Loader2,
    Trash2,
    Plus
} from "lucide-react";

type TestType = "UI" | "API" | "Security";
type Severity = "Critical" | "High" | "Medium" | "Low";

interface TestCase {
    id: string;
    title: string;
    steps: string[];
    expectedResult: string;
    severity: Severity;
}

const severityColors: Record<Severity, string> = {
    Critical: "bg-rose-600 text-white border-rose-700",
    High: "bg-rose-50 text-rose-600 border-rose-100",
    Medium: "bg-amber-50 text-amber-600 border-amber-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const characters = text.split("");
    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.01,
                        delayChildren: delay,
                    },
                },
            }}
        >
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

const TestCaseCard: React.FC<{ testCase: TestCase; isNew?: boolean }> = ({ testCase, isNew }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const text = `Title: ${testCase.title}\nSteps:\n${testCase.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\nExpected Result: ${testCase.expectedResult}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h4 className="text-lg font-bold text-slate-900 ">
                        {isNew ? <TypewriterText text={testCase.title} /> : testCase.title}
                    </h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${severityColors[testCase.severity]}`}>
                        {testCase.severity}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                    title="Copy to clipboard"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Steps</div>
                    <ul className="space-y-2">
                        {testCase.steps.map((step, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-600 ">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                                    {i + 1}
                                </span>
                                {isNew ? <TypewriterText text={step} delay={0.5 + i * 0.2} /> : step}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Expected Result</div>
                    <p className="text-sm text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100 ">
                        {isNew ? <TypewriterText text={testCase.expectedResult} delay={1.5} /> : testCase.expectedResult}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function TestGenerator() {
    const [url, setUrl] = useState("");
    const [type, setType] = useState<TestType>("UI");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStep, setGenerationStep] = useState(0);
    const [generatedTests, setGeneratedTests] = useState<TestCase[]>([]);
    const [isNewBatch, setIsNewBatch] = useState(false);

    const steps = [
        { label: "Analyzing URL", description: "Scanning the provided endpoint for structure and accessibility." },
        { label: "Detecting Components", description: "Identifying interactive elements, forms, and navigation patterns." },
        { label: "Generating Scenarios", description: "Using LLMs to craft comprehensive functional and edge-case tests." }
    ];

    const handleGenerate = async () => {
        if (!url) return;

        setIsGenerating(true);
        setGeneratedTests([]);
        setGenerationStep(0);
        setIsNewBatch(true);

        // Simulate Step-by-Step AI Generation
        for (let i = 0; i < steps.length; i++) {
            setGenerationStep(i);
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        const mockTests: TestCase[] = [
            {
                id: "1",
                title: "Verify User Authentication Flow",
                steps: [
                    "Navigate to the login page",
                    "Enter valid credentials in the email and password fields",
                    "Click the 'Sign In' button",
                    "Observe the redirection to the dashboard"
                ],
                expectedResult: "User is successfully logged in and redirected to the dashboard with a success notification.",
                severity: "Critical"
            },
            {
                id: "2",
                title: "Validate Password Reset Functionality",
                steps: [
                    "Click on 'Forgot Password' link",
                    "Enter a registered email address",
                    "Check for the reset email delivery",
                    "Follow the link and set a new password"
                ],
                expectedResult: "A secure reset link is sent, and the user can update their password successfully.",
                severity: "High"
            },
            {
                id: "3",
                title: "Check Responsive Navigation Menu",
                steps: [
                    "Resize the browser window to mobile width (375px)",
                    "Click on the hamburger menu icon",
                    "Verify all navigation links are visible",
                    "Click on a link to ensure it works"
                ],
                expectedResult: "The menu opens smoothly and all links are accessible and functional on mobile devices.",
                severity: "Medium"
            }
        ];

        setGeneratedTests(mockTests);
        setIsGenerating(false);
        // Reset new batch flag after some time to prevent re-typing on re-renders if any
        setTimeout(() => setIsNewBatch(false), 5000);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-brand-600" />
                    AI Test Generator
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Describe your feature or provide a URL to generate comprehensive test cases instantly.
                </p>
            </div>

            {/* Input Section */}
            <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3 space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">URL or API Endpoint</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 ">
                                {type === "API" ? <Terminal className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                            </div>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder={type === "API" ? "https://api.example.com/v1/users" : "https://example.com/dashboard"}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as TestType)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all outline-none appearance-none cursor-pointer"
                        >
                            <option value="UI">UI Automation</option>
                            <option value="API">API Testing</option>
                            <option value="Security">Security Scan</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 ">
                    <div className="flex items-center gap-4 text-xs text-slate-400 ">
                        <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            Playwright Ready
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            Edge Case Detection
                        </div>
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={!url || isGenerating}
                        className={`px-8 py-3 bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-100 flex items-center gap-2 transition-all ${(!url || isGenerating) ? "opacity-50 cursor-not-allowed" : "hover:bg-brand-700 active:scale-95"
                            }`}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                AI is Thinking...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Generate Test Cases
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        Generated Results
                        {generatedTests.length > 0 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-full">
                                {generatedTests.length} cases
                            </span>
                        )}
                    </h3>
                    {generatedTests.length > 0 && (
                        <button
                            onClick={() => setGeneratedTests([])}
                            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Clear All
                        </button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {isGenerating ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-12 flex flex-col items-center justify-center text-center space-y-8"
                        >
                            <div className="relative">
                                <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center relative overflow-hidden">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,#8b5cf6_100%)] opacity-20"
                                    />
                                    <Sparkles className="w-10 h-10 text-brand-600 relative z-10" />
                                </div>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg"
                                />
                            </div>

                            <div className="w-full max-w-md space-y-6">
                                <div className="space-y-2">
                                    <h4 className="font-bold text-slate-900 text-xl">{steps[generationStep].label}</h4>
                                    <p className="text-sm text-slate-500 ">{steps[generationStep].description}</p>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${((generationStep + 1) / steps.length) * 100}%` }}
                                            className="h-full bg-brand-600"
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span>Progress</span>
                                        <span>{Math.round(((generationStep + 1) / steps.length) * 100)}%</span>
                                    </div>
                                </div>

                                {/* Step Indicators */}
                                <div className="flex justify-center gap-2">
                                    {steps.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${i === generationStep ? "w-8 bg-brand-600" : i < generationStep ? "w-4 bg-emerald-500" : "w-4 bg-slate-200 "
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : generatedTests.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {generatedTests.map((test, index) => (
                                <TestCaseCard key={test.id} testCase={test} isNew={isNewBatch} />
                            ))}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Manual Test Case
                            </motion.button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center px-8"
                        >
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                                <AlertCircle className="w-8 h-8 text-slate-300 " />
                            </div>
                            <h4 className="font-bold text-slate-900 ">No test cases generated yet</h4>
                            <p className="text-sm text-slate-500 max-w-xs mt-1">Enter a URL above and click generate to see the AI magic happen.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
