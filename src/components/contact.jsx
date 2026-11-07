"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useHeroInfo } from "@/components/hero-info-context";
import { playTactileClick } from "@/utility/sound";

const PRESET_TOPICS = [
  "Enterprise Consultation",
  "Full-Time Role",
  "React & Next.js Architecture",
  "CMS / AEM Advisory",
];

export default function Contact() {
  const HeroInfo = useHeroInfo();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: PRESET_TOPICS[0],
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(HeroInfo.email);
      setCopied(true);
      playTactileClick("success");
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fallback
    }
  };

  const handleTopicSelect = (t) => {
    setFormData((prev) => ({ ...prev, topic: t }));
    playTactileClick("tick");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    playTactileClick("snap");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playTactileClick("success");

      // Mailto invocation
      const subject = encodeURIComponent(
        `[Portfolio] ${formData.topic} — from ${formData.name}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${HeroInfo.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section
      id="contact"
      className="bg-paper py-24 px-6 lg:px-8 border-t border-border-subtle relative bg-grain"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-16 border-b border-border-subtle font-mono text-xs text-charcoal-light">
          <div className="flex items-center gap-2">
            <span className="text-muted-green font-bold">[05]</span>
            <span className="uppercase tracking-widest text-charcoal">
              COMMUNICATIONS & DISPATCH CONSOLE
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-wider">
            DIRECT ROUTING ACTIVE
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Quick Copy (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2
                id="contact-heading"
                className="text-3xl sm:text-4xl font-bold text-charcoal leading-tight tracking-tight mb-4"
              >
                Initiate a conversation regarding ambitious engineering.
              </h2>
              <div className="w-16 h-1 bg-chartreuse mb-4" />
              <p className="text-sm text-charcoal-mid leading-relaxed">
                Currently open to select technical roles, enterprise CMS architecture discussions, and innovative digital product builds.
              </p>
            </div>

            {/* Quick Copy Email Card */}
            <div className="p-5 bg-ivory rounded-xl border border-border-subtle shadow-sm flex flex-col gap-3 font-mono">
              <span className="text-xs text-charcoal-light uppercase tracking-wider font-semibold">
                Direct Electronic Mail
              </span>
              <div className="flex items-center justify-between gap-2 p-3 bg-paper rounded-lg border border-border-mid/50">
                <span className="text-xs font-bold text-charcoal truncate">
                  {HeroInfo.email}
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-charcoal text-chartreuse hover:bg-black transition-colors text-xs font-semibold uppercase tracking-wider"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <ClipboardDocumentCheckIcon className="w-4 h-4 text-chartreuse" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Network Channels */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-charcoal-light uppercase tracking-wider font-semibold block">
                Professional Channels
              </span>

              <a
                href={HeroInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick("tick")}
                className="flex items-center justify-between p-3.5 bg-ivory border border-border-subtle rounded-xl hover:border-charcoal transition-colors group"
              >
                <span className="font-semibold text-charcoal group-hover:text-muted-green">
                  LinkedIn &rarr; /in/amanguptag
                </span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-charcoal-light group-hover:text-charcoal" />
              </a>

              <a
                href={HeroInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick("tick")}
                className="flex items-center justify-between p-3.5 bg-ivory border border-border-subtle rounded-xl hover:border-charcoal transition-colors group"
              >
                <span className="font-semibold text-charcoal group-hover:text-muted-green">
                  GitHub &rarr; /amanpahariya
                </span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-charcoal-light group-hover:text-charcoal" />
              </a>
            </div>
          </div>

          {/* Right Column: Dispatch Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-ivory border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="font-mono text-xs text-muted-green font-bold uppercase tracking-wider block mb-2">
                MESSAGE DISPATCH
              </span>
              <h3 className="text-xl font-bold text-charcoal mb-6">
                Send Direct Transmission
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Topic Selector Pills */}
                <div>
                  <label className="font-mono text-xs text-charcoal-light uppercase tracking-wider block mb-2 font-semibold">
                    Topic of Discussion
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_TOPICS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleTopicSelect(topic)}
                        className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                          formData.topic === topic
                            ? "bg-charcoal text-chartreuse border-charcoal font-bold"
                            : "bg-paper text-charcoal-mid border-border-subtle hover:border-charcoal-light"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-mono text-xs text-charcoal-light uppercase tracking-wider block mb-1.5 font-semibold"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 bg-paper border border-border-subtle rounded-xl text-xs font-mono text-charcoal placeholder-charcoal-light focus:outline-none focus:border-charcoal transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-mono text-xs text-charcoal-light uppercase tracking-wider block mb-1.5 font-semibold"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 bg-paper border border-border-subtle rounded-xl text-xs font-mono text-charcoal placeholder-charcoal-light focus:outline-none focus:border-charcoal transition-colors"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-xs text-charcoal-light uppercase tracking-wider block mb-1.5 font-semibold"
                  >
                    Transmission Content
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Provide details on project scope, timeline, or engineering requirements..."
                    className="w-full px-4 py-2.5 bg-paper border border-border-subtle rounded-xl text-xs font-mono text-charcoal placeholder-charcoal-light focus:outline-none focus:border-charcoal transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-chartreuse text-charcoal font-mono text-xs uppercase tracking-wider font-bold shadow-sm hover:bg-chartreuse-dark hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>DISPATCHING TRANSMISSION...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <PaperAirplaneIcon className="w-4 h-4" />
                    </>
                  )}
                </button>

                {submitted && (
                  <p className="font-mono text-xs text-muted-green text-center pt-2 flex items-center justify-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 text-chartreuse-dark" />
                    <span>Transmission initiated. Your mail client should launch.</span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
