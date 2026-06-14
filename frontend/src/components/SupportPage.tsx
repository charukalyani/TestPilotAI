import React, { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  BookOpen,
  ChevronDown,
  Send,
  User,
  Mail,
  MessageCircle,
  ExternalLink,
  LifeBuoy,
  Search
} from "lucide-react";

const FAQItem = ({ question, answer }: { question: string; answer: string;[key: string]: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-sm font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{question}</span>
        <div
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="pb-4 text-sm text-slate-500 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const faqs = [
    {
      question: "How do I generate my first AI test?",
      answer: "Head over to the 'Test Generator' tab, enter your application URL or upload a component file, and click 'Generate'. Our AI will analyze the code and create comprehensive test cases automatically."
    },
    {
      question: "Can I export tests to my existing CI/CD pipeline?",
      answer: "Yes! TestPilot AI supports exporting tests in various formats including Jest, Playwright, and Cypress. You can find export options in the 'Reports' or 'UI Automation' sections."
    },
    {
      question: "What is the difference between API and UI testing?",
      answer: "API testing focuses on the data layer and server responses, while UI automation simulates real user interactions in the browser. TestPilot AI provides dedicated tools for both."
    },
    {
      question: "How secure is my data and code?",
      answer: "We take security seriously. Your code is processed in secure, isolated environments and is never used to train global models. All data is encrypted at rest and in transit."
    }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 pb-20">
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-50 rounded-2xl mb-2">
          <LifeBuoy className="w-8 h-8 text-brand-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">How can we help you today?</h1>
        <p className="text-slate-500">Search our documentation or reach out to our support team for personalized assistance.</p>

        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: FAQs and Docs */}
        <div className="lg:col-span-2 space-y-8">
          {/* FAQ Section */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600" /> Frequently Asked Questions
              </h2>
            </div>
            <div className="p-6">
              <div className="divide-y divide-slate-100">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </section>

          {/* Documentation Card */}
          <section className="bg-brand-600 rounded-2xl p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <BookOpen className="w-32 h-32" />
            </div>
            <div className="relative z-10 space-y-4 max-w-md">
              <h2 className="text-2xl font-bold">Deep dive into our documentation</h2>
              <p className="text-brand-100">Learn how to master TestPilot AI with our comprehensive guides, API references, and video tutorials.</p>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-brand-600 font-bold rounded-xl hover:bg-brand-50 transition-all active:scale-95">
                View Documentation <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Contact and Chat */}
        <div className="space-y-8">
          {/* Contact Form */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600" /> Send us a message
              </h2>
            </div>
            <div className="p-6">
              {submitted ? (
                <div
                  className="text-center py-8 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Send className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900">Message Sent!</h3>
                  <p className="text-sm text-slate-500">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?"
                      rows={4}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Chat Support Placeholder */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center gap-4 group cursor-pointer hover:border-brand-200 transition-colors">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-sm">Live Chat</h3>
              <p className="text-xs text-slate-500">Average response: 5 mins</p>
            </div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </section>
        </div>
      </div>
    </div>
  );
}
