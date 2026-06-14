import { sendApiRequest } from "../services/apiService";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Send,
    Plus,
    Trash2,
    Clock,
    CheckCircle2,
    XCircle,
    Copy,
    Check,
    ChevronRight,
    Code2,
    Settings2,
    Database,
    Loader2
} from "lucide-react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface Header {
    key: string;
    value: string;
}

interface ApiResponse {
    status: number;
    time: string;
    size: string;
    body: any;
}

export default function APITesting() {
    const [method, setMethod] = useState<Method>("GET");
    const [url, setUrl] = useState("https://api.testpilot.ai/v1/users");
    const [headers, setHeaders] = useState<Header[]>([{ key: "Content-Type", value: "application/json" }]);
    const [body, setBody] = useState('{\n "name": "John Doe",\n "email": "john@example.com"\n}');
    const [activeTab, setActiveTab] = useState<"headers" | "body">("headers");
    const [isSending, setIsSending] = useState(false);
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [copied, setCopied] = useState(false);

    const handleAddHeader = () => setHeaders([...headers, { key: "", value: "" }]);
    const handleRemoveHeader = (index: number) => setHeaders(headers.filter((_, i) => i !== index));
    const handleHeaderChange = (index: number, field: "key" | "value", val: string) => {
        const newHeaders = [...headers];
        newHeaders[index][field] = val;
        setHeaders(newHeaders);
    };

    const handleSend = async () => {
        setIsSending(true);
        setResponse(null);

        try {
            const requestHeaders: Record<string, string> = {};

            headers.forEach((header) => {
                if (header.key && header.value) {
                    requestHeaders[header.key] = header.value;
                }
            });

            const payload = {
                method,
                url,
                headers: requestHeaders,
                body:
                    method === "POST" || method === "PUT"
                        ? JSON.parse(body)
                        : null,
            };

            const result = await sendApiRequest(payload);

            setResponse({
                status: result.status,
                time: result.time || "0ms",
                size: `${JSON.stringify(result.data).length} bytes`,
                body: result.data,
            });
        } catch (error: any) {
            setResponse({
                status: 500,
                time: "0ms",
                size: "0",
                body: {
                    error: error.message,
                },
            });
        } finally {
            setIsSending(false);
        }
    };

    const handleCopyResponse = () => {
        if (!response) return;
        navigator.clipboard.writeText(JSON.stringify(response.body, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col gap-6">
            {/* Header & Controls */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Database className="w-6 h-6 text-brand-600" />
                        API Testing
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Test your endpoints with a simplified, high-performance interface.
                    </p>
                </div>
            </div>

            {/* Main Split Layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-0">

                {/* Request Panel (60%) */}
                <div className="lg:col-span-3 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100 space-y-6">
                        <div className="flex items-center gap-4 p-2 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                            <div className="relative">
                                <select
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value as Method)}
                                    className={`pl-6 pr-12 py-4 rounded-full text-sm font-black border-none outline-none cursor-pointer transition-all appearance-none shadow-sm ${method === "GET" ? "bg-emerald-50 text-emerald-600 " :
                                            method === "POST" ? "bg-blue-50 text-blue-600 " :
                                                method === "PUT" ? "bg-amber-50 text-amber-600 " :
                                                    "bg-rose-50 text-rose-600 "
                                        }`}
                                >
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                                <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
                            </div>

                            <div className="flex-1 relative group">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Enter API endpoint URL..."
                                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-900 shadow-sm group-hover:border-brand-300 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none"
                                />
                            </div>

                            <button
                                onClick={handleSend}
                                disabled={isSending}
                                className="px-10 py-4 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-full shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center gap-2"
                            >
                                {isSending ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                <span>Send</span>
                            </button>
                        </div>

                        <div className="flex gap-8 border-b border-slate-100 px-4">
                            <button
                                onClick={() => setActiveTab("headers")}
                                className={`pb-3 text-sm font-bold transition-all relative ${activeTab === "headers" ? "text-brand-600" : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                Headers
                                {activeTab === "headers" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600" />}
                            </button>
                            <button
                                onClick={() => setActiveTab("body")}
                                className={`pb-3 text-sm font-bold transition-all relative ${activeTab === "body" ? "text-brand-600" : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                Body
                                {activeTab === "body" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {activeTab === "headers" ? (
                                <motion.div
                                    key="headers"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-3"
                                >
                                    {headers.map((header, index) => (
                                        <div key={index} className="flex gap-2 group">
                                            <input
                                                type="text"
                                                placeholder="Key"
                                                value={header.key}
                                                onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
                                                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-1 focus:ring-brand-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Value"
                                                value={header.value}
                                                onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
                                                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-1 focus:ring-brand-500"
                                            />
                                            <button
                                                onClick={() => handleRemoveHeader(index)}
                                                className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleAddHeader}
                                        className="text-xs font-bold text-brand-600 flex items-center gap-1.5 mt-4 hover:text-brand-700"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        Add Header
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="body"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="h-full"
                                >
                                    <textarea
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        className="w-full h-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-900 outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                                        spellCheck={false}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Response Panel (40%) */}
                <div className="lg:col-span-2 flex flex-col bg-slate-50 rounded-3xl border border-slate-200 shadow-inner overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white ">
                        <h3 className="font-bold text-slate-900 ">Response</h3>
                        {response && (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-2 h-2 rounded-full ${response.status === 200 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                    <span className="text-xs font-bold text-slate-600 ">{response.status} OK</span>
                                </div>
                                <div className="text-xs font-bold text-slate-400">{response.time}</div>
                                <div className="text-xs font-bold text-slate-400">{response.size}</div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto relative">
                        <AnimatePresence mode="wait">
                            {isSending ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
                                    <p className="text-sm font-bold text-slate-500">Waiting for response...</p>
                                </motion.div>
                            ) : response ? (
                                <motion.div
                                    key="response"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col"
                                >
                                    <div className="flex justify-end mb-2">
                                        <button
                                            onClick={handleCopyResponse}
                                            className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-brand-600 transition-colors"
                                        >
                                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                            {copied ? "Copied!" : "Copy JSON"}
                                        </button>
                                    </div>
                                    <pre className="flex-1 p-4 bg-white border border-slate-100 rounded-2xl text-xs font-mono text-slate-800 overflow-auto">
                                        {JSON.stringify(response.body, null, 2)}
                                    </pre>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-8"
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                                        <Send className="w-8 h-8 text-slate-200 " />
                                    </div>
                                    <h4 className="font-bold text-slate-900 ">No Response Yet</h4>
                                    <p className="text-sm text-slate-500 max-w-xs mt-1">Configure your request and click "Send" to see the API response here.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
}
