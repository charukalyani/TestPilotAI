import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  Download,
  Filter,
  Calendar,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Table as TableIcon,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  X,
  Terminal,
  Activity,
  Shield,
  Cpu,
  ExternalLink,
  Loader2,
  Check
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// --- Mock Data ---

const successRateData = [
  { name: 'Passed', value: 850, color: '#10b981' },
  { name: 'Failed', value: 120, color: '#f43f5e' },
  { name: 'Skipped', value: 30, color: '#94a3b8' },
];

const apiPerformanceData = [
  { time: '00:00', latency: 120 },
  { time: '04:00', latency: 132 },
  { time: '08:00', latency: 401 },
  { time: '12:00', latency: 250 },
  { time: '16:00', latency: 210 },
  { time: '20:00', latency: 180 },
  { time: '23:59', latency: 150 },
];

const testTrendData = [
  { day: 'Mon', ui: 45, api: 32, security: 12 },
  { day: 'Tue', ui: 52, api: 38, security: 15 },
  { day: 'Wed', ui: 48, api: 45, security: 10 },
  { day: 'Thu', ui: 61, api: 42, security: 18 },
  { day: 'Fri', ui: 55, api: 50, security: 22 },
  { day: 'Sat', ui: 30, api: 25, security: 8 },
  { day: 'Sun', ui: 35, api: 28, security: 10 },
];

const detailedReports = [
  {
    id: 1,
    name: "Login Flow Regression",
    status: "passed",
    duration: "42s",
    durationMs: 42000,
    errors: "-",
    type: "UI",
    date: "2026-04-03",
    severity: "High",
    logs: [
      "[09:00:01] Initializing browser context...",
      "[09:00:03] Navigating to https://app.testify.io/login",
      "[09:00:05] Entering credentials for user: test_admin",
      "[09:00:08] Clicking 'Sign In' button",
      "[09:00:12] Waiting for dashboard redirection...",
      "[09:00:15] Dashboard loaded successfully.",
      "[09:00:42] Test completed. All assertions passed."
    ]
  },
  {
    id: 2,
    name: "User API /v1/profile",
    status: "failed",
    duration: "1.2s",
    durationMs: 1200,
    errors: "500 Internal Server Error",
    type: "API",
    date: "2026-04-03",
    severity: "Critical",
    stackTrace: `Error: Request failed with status code 500
    at createError (node_modules/axios/lib/core/createError.js:16:15)
    at settle (node_modules/axios/lib/core/settle.js:17:12)
    at IncomingMessage.handleStreamEnd (node_modules/axios/lib/adapters/http.js:269:11)
    at IncomingMessage.emit (events.js:327:22)
    at endReadableNT (_stream_readable.js:1327:12)
    at processTicksAndRejections (internal/process/task_queues.js:80:21)`,
    logs: [
      "[10:15:00] Sending GET request to /api/v1/profile",
      "[10:15:00] Headers: { Authorization: 'Bearer ****' }",
      "[10:15:01] Error received: 500 Internal Server Error",
      "[10:15:01] Payload: { \"error\": \"Database connection timeout\" }",
      "[10:15:01] Retrying request (1/3)...",
      "[10:15:01] Error received: 500 Internal Server Error",
      "[10:15:01] Test failed after 1 retry."
    ]
  },
  {
    id: 3,
    name: "SQL Injection Scan",
    status: "passed",
    duration: "5m 12s",
    durationMs: 312000,
    errors: "-",
    type: "Security",
    date: "2026-04-02",
    severity: "High",
    logs: [
      "[11:30:00] Starting security scan engine...",
      "[11:30:15] Scanning endpoint: /api/v1/search",
      "[11:31:45] Testing payload: ' OR 1=1 --",
      "[11:33:12] Testing payload: \"; DROP TABLE users; --",
      "[11:35:12] No vulnerabilities detected in 45 injection vectors."
    ]
  },
  {
    id: 4,
    name: "Checkout Integration",
    status: "passed",
    duration: "1m 05s",
    durationMs: 65000,
    errors: "-",
    type: "UI",
    date: "2026-04-02",
    severity: "Medium",
    logs: [
      "[14:20:00] Adding items to cart...",
      "[14:20:15] Navigating to checkout page",
      "[14:20:30] Entering shipping details",
      "[14:20:45] Selecting payment method: Credit Card",
      "[14:21:05] Order confirmation received: #ORD-9921"
    ]
  },
  {
    id: 5,
    name: "Payment Gateway Webhook",
    status: "failed",
    duration: "800ms",
    durationMs: 800,
    errors: "Timeout after 500ms",
    type: "API",
    date: "2026-04-01",
    severity: "High",
    stackTrace: `TimeoutError: Navigation timeout of 500ms exceeded
    at /app/node_modules/puppeteer/lib/cjs/puppeteer/common/LifecycleWatcher.js:106:111
    at async FrameManager.navigateFrame (/app/node_modules/puppeteer/lib/cjs/puppeteer/common/FrameManager.js:225:21)
    at async Frame.goto (/app/node_modules/puppeteer/lib/cjs/puppeteer/common/Frame.js:145:21)
    at async Page.goto (/app/node_modules/puppeteer/lib/cjs/puppeteer/common/Page.js:717:21)`,
    logs: [
      "[16:45:00] Listening for webhook events...",
      "[16:45:00] Incoming POST request to /webhooks/stripe",
      "[16:45:00] Processing event: payment_intent.succeeded",
      "[16:45:00] Internal processing timeout triggered at 500ms",
      "[16:45:00] Response sent: 504 Gateway Timeout"
    ]
  },
  {
    id: 6,
    name: "XSS Vulnerability Check",
    status: "warning",
    duration: "3m 45s",
    durationMs: 225000,
    errors: "Potential leak detected",
    type: "Security",
    date: "2026-04-01",
    severity: "Low",
    logs: [
      "[18:10:00] Initializing XSS scanner...",
      "[18:11:00] Testing payload: <script>alert(1)</script>",
      "[18:12:30] Payload reflected in response: /profile/settings",
      "[18:13:45] Warning: Content-Security-Policy header is missing."
    ]
  },
];

// --- Components ---

const Badge = ({ children, variant = "neutral" }: { children: React.ReactNode; variant?: "neutral" | "brand" | "success" | "error" | "warning" | "info" }) => {
  const variants = {
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    brand: "bg-brand-50 text-brand-600 border-brand-100",
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    error: "bg-rose-50 text-rose-600 border-rose-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    info: "bg-blue-50 text-blue-600 border-blue-100",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${variants[variant]}`}>
      {children}
    </span>
  );
};

const SeverityTag = ({ severity }: { severity: string }) => {
  const colors: Record<string, string> = {
    Critical: "bg-rose-600 text-white border-rose-700",
    High: "bg-rose-50 text-rose-600 border-rose-100",
    Medium: "bg-amber-50 text-amber-600 border-amber-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${colors[severity] || colors.Low}`}>
      {severity}
    </span>
  );
};

export default function Reports() {
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [testType, setTestType] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [durationFilter, setDurationFilter] = useState("All Durations");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<typeof detailedReports[0] | null>(null);
  const [showErrorModal, setShowErrorModal] = useState<typeof detailedReports[0] | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const filteredReports = useMemo(() => {
    return detailedReports.filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = testType === "All Types" || report.type === testType.split(" ")[0];
      const matchesStatus = statusFilter === "All Statuses" || report.status === statusFilter.toLowerCase();

      let matchesDuration = true;
      if (durationFilter === "Short (< 5s)") matchesDuration = report.durationMs < 5000;
      if (durationFilter === "Medium (5s - 1m)") matchesDuration = report.durationMs >= 5000 && report.durationMs < 60000;
      if (durationFilter === "Long (> 1m)") matchesDuration = report.durationMs >= 60000;

      return matchesSearch && matchesType && matchesStatus && matchesDuration;
    });
  }, [searchQuery, testType, statusFilter, durationFilter]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 2000);
    }, 2500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-brand-600" />
            Reports & Analytics
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Deep dive into your testing performance and identify bottlenecks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`px-4 py-2 border text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm min-w-[120px] justify-center ${exportComplete
                ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : exportComplete ? (
              <>
                <Check className="w-4 h-4" />
                Done!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </>
            )}
          </button>
          <button className="px-4 py-2 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-100 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Report
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filters:</span>
        </div>

        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
          >
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Custom Range</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            className="pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
          >
            <option>All Types</option>
            <option>UI Automation</option>
            <option>API Testing</option>
            <option>Security Scan</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
          >
            <option>All Statuses</option>
            <option>Passed</option>
            <option>Failed</option>
            <option>Warning</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
          >
            <option>All Durations</option>
            <option>Short (&lt; 5s)</option>
            <option>Medium (5s - 1m)</option>
            <option>Long (&gt; 1m)</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Test Success Rate (Pie) */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Success Rate</h3>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <ArrowUpRight className="w-3 h-3" />
              +2.4%
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={successRateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {successRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Executions</div>
              <div className="text-xl font-bold text-slate-900">1,000</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Success</div>
              <div className="text-xl font-bold text-emerald-600">85%</div>
            </div>
          </div>
        </div>

        {/* API Performance (Line) */}
        <div className="lg:col-span-2 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">API Latency (ms)</h3>
            <div className="flex items-center gap-1 text-rose-600 text-xs font-bold">
              <ArrowDownRight className="w-3 h-3" />
              -15ms
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={apiPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Test Volume Trend (Bar) */}
        <div className="lg:col-span-3 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Test Volume by Category</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-brand-500" />
                <span className="text-xs font-medium text-slate-500">UI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs font-medium text-slate-500">API</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-xs font-medium text-slate-500">Security</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={testTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="ui" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} barSize={40} />
                <Bar dataKey="api" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={40} />
                <Bar dataKey="security" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TableIcon className="w-5 h-5 text-brand-600" />
            <h3 className="font-bold text-slate-900">Detailed Test Logs</h3>
          </div>
          <button className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Test Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Errors</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                      {report.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={report.type === "UI" ? "brand" : report.type === "API" ? "info" : "error"}>
                      {report.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <SeverityTag severity={report.severity} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {report.status === "passed" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : report.status === "failed" ? (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                      )}
                      <span className={`text-xs font-bold capitalize ${report.status === "passed" ? 'text-emerald-600' :
                          report.status === "failed" ? 'text-rose-600' :
                            'text-amber-600'
                        }`}>
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-medium text-slate-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      onClick={(e) => {
                        if (report.status === "failed") {
                          e.stopPropagation();
                          setShowErrorModal(report);
                        }
                      }}
                      className={`text-xs font-medium ${report.errors === '-'
                          ? 'text-slate-400'
                          : 'text-rose-500 flex items-center gap-1 hover:underline cursor-help'
                        }`}
                    >
                      {report.errors !== '-' && <AlertCircle className="w-3 h-3" />}
                      {report.errors}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {report.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredReports.length === 0 && (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No reports found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setTestType("All Types");
                  setStatusFilter("All Statuses");
                  setDurationFilter("All Durations");
                }}
                className="mt-2 text-brand-600 text-sm font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-center">
          <button className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2">
            Load More Reports
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Log Viewer Side Panel */}
      <AnimatePresence>
        {selectedReport && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedReport.status === "passed" ? "bg-emerald-100 text-emerald-600" :
                      selectedReport.status === "failed" ? "bg-rose-100 text-rose-600" :
                        "bg-amber-100 text-amber-600"
                    }`}>
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{selectedReport.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      ID: #{selectedReport.id} • {selectedReport.date} • {selectedReport.duration}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Type</div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      {selectedReport.type === "UI" ? <Activity className="w-3 h-3 text-brand-500" /> :
                        selectedReport.type === "API" ? <Cpu className="w-3 h-3 text-blue-500" /> :
                          <Shield className="w-3 h-3 text-rose-500" />}
                      {selectedReport.type}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Severity</div>
                    <SeverityTag severity={selectedReport.severity} />
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</div>
                    <Badge variant={selectedReport.status === "passed" ? "success" : selectedReport.status === "failed" ? "error" : "warning"}>
                      {selectedReport.status}
                    </Badge>
                  </div>
                </div>

                {/* Logs Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    Execution Logs
                  </h4>
                  <div className="bg-slate-900 rounded-2xl p-4 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto">
                    {selectedReport.logs.map((log, i) => (
                      <div key={i} className="hover:bg-slate-800 py-0.5 px-2 rounded transition-colors whitespace-nowrap">
                        <span className="text-slate-500 mr-2">{i + 1}</span>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedReport.status === "failed" && (
                  <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                    <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-2">
                      <AlertCircle className="w-4 h-4" />
                      Failure Summary
                    </div>
                    <p className="text-xs text-rose-700 leading-relaxed">
                      The test failed due to a {selectedReport.errors}. This usually indicates a regression in the backend service or a network timeout.
                      <button
                        onClick={() => setShowErrorModal(selectedReport)}
                        className="ml-2 font-bold underline hover:text-rose-800"
                      >
                        View Stack Trace
                      </button>
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <button className="px-4 py-2 text-slate-600 text-sm font-bold hover:text-slate-900 transition-colors">
                  Download Logs (.txt)
                </button>
                <button className="px-6 py-2 bg-brand-600 text-white text-sm font-bold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-100">
                  Re-run Test
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowErrorModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-rose-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">Error Stack Trace</h3>
                </div>
                <button
                  onClick={() => setShowErrorModal(null)}
                  className="p-2 hover:bg-rose-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-rose-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Error Message</div>
                  <div className="text-sm font-bold text-rose-600">{showErrorModal.errors}</div>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Stack Trace</span>
                    <button className="text-[10px] font-bold text-brand-600 hover:underline">Copy to Clipboard</button>
                  </div>
                  <pre className="p-4 font-mono text-[11px] leading-relaxed text-slate-700 overflow-x-auto bg-white">
                    {showErrorModal.stackTrace}
                  </pre>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowErrorModal(null)}
                    className="px-6 py-2 text-slate-600 text-sm font-bold hover:text-slate-900 transition-colors"
                  >
                    Dismiss
                  </button>
                  <button className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg">
                    Open in Debugger
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
