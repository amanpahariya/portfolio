"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  StopIcon,
  TrashIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  CpuChipIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { playTactileClick } from "@/utility/sound";
import { sendGTMEvent } from "@/utility/gtm";

const STARTER_PROMPTS = [
  {
    icon: BuildingOffice2Icon,
    title: "BlackRock & AEM",
    desc: "AEM & enterprise systems experience",
    query: "What is your role with Adobe Experience Manager (AEM) at BlackRock?",
  },
  {
    icon: CpuChipIcon,
    title: "35% Latency Cut",
    desc: "Invoice optimization details",
    query: "How did you achieve the 35% invoice pipeline speedup at Invock?",
  },
  {
    icon: BoltIcon,
    title: "Core Tech Stack",
    desc: "Frontend, backend & cloud tools",
    query: "What is your primary engineering stack and architectural approach?",
  },
  {
    icon: EnvelopeIcon,
    title: "Hiring & Availability",
    desc: "Open roles & best way to connect",
    query: "Are you open to new software engineering opportunities and how do we connect?",
  },
];

const FOLLOWUP_PILLS = [
  "AEM at BlackRock",
  "35% Invoice Optimization",
  "React & Next.js",
  "Connect with Aman",
  "Why hire Aman?",
];

// Tokenizes bold, markdown links, code blocks, raw URLs, and emails cleanly
function TokenizedText({ text }) {
  const regex = /(\*\*[\s\S]+?\*\*|`[^`]+`|\[[\s\S]+?\]\([\s\S]+?\)|https?:\/\/[^\s<)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        // **bold**
        if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
          return (
            <strong key={i} className="font-bold text-charcoal">
              {part.slice(2, -2)}
            </strong>
          );
        }

        // `code`
        if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
          return (
            <code
              key={i}
              className="px-1.5 py-0.5 rounded bg-paper border border-border-mid/50 font-mono text-[12px] text-charcoal font-semibold"
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        // [label](url)
        const mdLinkMatch = part.match(/^\[([\s\S]+?)\]\(([\s\S]+?)\)$/);
        if (mdLinkMatch) {
          const [, label, url] = mdLinkMatch;
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-semibold text-muted-green hover:text-charcoal underline underline-offset-2 transition-colors"
            >
              <span>{label}</span>
              <ArrowTopRightOnSquareIcon className="w-3 h-3 inline ml-0.5" />
            </a>
          );
        }

        // Bare URL
        if (part.startsWith("http://") || part.startsWith("https://")) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-semibold text-muted-green hover:text-charcoal underline underline-offset-2 transition-colors break-all"
            >
              <span>{part}</span>
              <ArrowTopRightOnSquareIcon className="w-3 h-3 inline ml-0.5" />
            </a>
          );
        }

        // Bare Email
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
          return (
            <a
              key={i}
              href={`mailto:${part}`}
              className="font-semibold text-muted-green hover:text-charcoal underline underline-offset-2 transition-colors"
            >
              {part}
            </a>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// Full Block Markdown Formatter supporting Headings, Tables, Lists, and Paragraphs
function FormattedMessage({ content, isStreaming }) {
  const lines = content.split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Table Detection (contiguous lines with pipes: | Col 1 | Col 2 |)
    if (trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.includes("|")) {
      const tableLines = [];
      while (
        i < lines.length &&
        lines[i].trim().startsWith("|") &&
        lines[i].trim().endsWith("|")
      ) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (rowStr) =>
          rowStr
            .slice(1, -1)
            .split("|")
            .map((c) => c.trim());

        const headers = parseRow(tableLines[0]);
        let startRow = 1;
        // Check if second line is divider (e.g. |---|---|)
        if (tableLines[1].replace(/[\s\-|:]/g, "") === "") {
          startRow = 2;
        }
        const rows = tableLines.slice(startRow).map(parseRow);

        blocks.push({ type: "table", headers, rows });
        continue;
      }
    }

    // 2. Heading 3
    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      i++;
      continue;
    }

    // 3. Heading 2
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      i++;
      continue;
    }

    // 4. Heading 1
    if (trimmed.startsWith("# ")) {
      blocks.push({ type: "h1", text: trimmed.slice(2) });
      i++;
      continue;
    }

    // 5. Unordered List (contiguous lines with - or *)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listItems = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: "ul", items: listItems });
      continue;
    }

    // 6. Numbered List (contiguous lines with 1. 2. etc.)
    if (/^\d+\.\s/.test(trimmed)) {
      const listItems = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items: listItems });
      continue;
    }

    // 7. Regular Paragraph
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("|") &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      blocks.push({ type: "p", text: paraLines.join("\n") });
    }
  }

  return (
    <div className="space-y-3 text-[14px] leading-relaxed text-charcoal font-sans">
      {blocks.map((block, idx) => {
        // Table Block
        if (block.type === "table") {
          return (
            <div
              key={idx}
              className="overflow-x-auto my-3 rounded-xl border border-border-mid/70 bg-paper/50 shadow-xs"
            >
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-paper border-b border-border-mid text-charcoal">
                  <tr>
                    {block.headers.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className="px-3.5 py-2.5 font-bold tracking-tight whitespace-nowrap"
                      >
                        <TokenizedText text={h} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/60">
                  {block.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="hover:bg-white/40 transition-colors"
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="px-3.5 py-2.5 text-charcoal-mid align-top leading-relaxed text-xs"
                        >
                          <TokenizedText text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // Headings
        if (block.type === "h1") {
          return (
            <h1
              key={idx}
              className="text-lg font-bold text-charcoal mt-3 mb-1 font-sans"
            >
              <TokenizedText text={block.text} />
            </h1>
          );
        }

        if (block.type === "h2") {
          return (
            <h2
              key={idx}
              className="text-base font-bold text-charcoal mt-3 mb-1 font-sans"
            >
              <TokenizedText text={block.text} />
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              key={idx}
              className="text-xs font-mono font-bold uppercase tracking-wider text-muted-green mt-3 mb-1"
            >
              <TokenizedText text={block.text} />
            </h3>
          );
        }

        // Unordered List
        if (block.type === "ul") {
          return (
            <ul key={idx} className="space-y-1.5 my-2 pl-0.5">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-chartreuse-dark mt-2 flex-shrink-0" />
                  <span className="flex-1 leading-snug">
                    <TokenizedText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        // Numbered List
        if (block.type === "ol") {
          return (
            <ol
              key={idx}
              className="space-y-1.5 my-2 pl-5 list-decimal text-charcoal text-xs"
            >
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-snug">
                  <TokenizedText text={item} />
                </li>
              ))}
            </ol>
          );
        }

        // Regular Paragraph
        return (
          <p key={idx} className="leading-relaxed">
            <TokenizedText text={block.text} />
          </p>
        );
      })}

      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-chartreuse-dark ml-1 animate-pulse align-middle" />
      )}
    </div>
  );
}

export default function AiCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const abortControllerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => textareaRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isStreaming]);

  // Global shortcut (Cmd+K / Ctrl+K) and open event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          playTactileClick(next ? "snap" : "tick");
          return next;
        });
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        playTactileClick("tick");
      }
    };

    const handleOpenAmanAi = () => {
      setIsOpen(true);
      playTactileClick("snap");
      sendGTMEvent("archon_opened", { trigger: "custom_event" });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-aman-ai", handleOpenAmanAi);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-aman-ai", handleOpenAmanAi);
    };
  }, [isOpen]);

  // Send message & stream tokens
  const handleSend = async (queryText) => {
    const query = (queryText || input).trim();
    if (!query || isStreaming) return;

    playTactileClick("tick");
    sendGTMEvent("archon_message_sent", {
      query_length: query.length,
      has_context: messages.length > 0,
    });
    setInput("");

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const userMsgId = `user-${Date.now()}`;
    const assistantMsgId = `assistant-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: "user", text: query },
      { id: assistantMsgId, role: "assistant", text: "" },
    ]);

    setIsStreaming(true);

    try {
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
        signal: abortController.signal,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Streaming service unavailable");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, text: accumulatedText } : m
          )
        );
      }

      playTactileClick("success");
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Stream stopped by user");
      } else {
        console.error("Stream error:", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  text:
                    "I am currently ready to assist. Please email amangupta201497@gmail.com for technical inquiries.",
                }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      playTactileClick("tick");
    }
  };

  const handleClear = () => {
    if (isStreaming) handleStop();
    setMessages([]);
    playTactileClick("snap");
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playTactileClick("tick");
    sendGTMEvent("archon_response_copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Launcher Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            playTactileClick("snap");
            sendGTMEvent("archon_opened", { trigger: "floating_pill" });
          }}
          className="group flex items-center gap-3 px-4 py-2.5 bg-charcoal text-ivory rounded-full shadow-2xl hover:bg-black border border-charcoal-light/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          aria-label="Open Archon — Aman's Autonomous Agent"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chartreuse opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-chartreuse" />
          </span>

          <span className="font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5">
            <SparklesIcon className="w-3.5 h-3.5 text-chartreuse" />
            <span>Archon</span>
          </span>

          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white/15 px-2 py-0.5 rounded text-charcoal-light border border-white/20">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Slide-over Copilot Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setIsOpen(false);
                playTactileClick("tick");
              }}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative w-full sm:w-[560px] h-full bg-[#FAF8F5] text-charcoal shadow-2xl border-l border-border-mid/70 flex flex-col z-10"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-border-subtle bg-[#F7F4EE] flex items-center justify-between select-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-charcoal text-chartreuse font-mono font-bold flex items-center justify-center text-xs shadow-xs">
                    AG
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-charcoal tracking-tight font-sans">
                        Archon
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-chartreuse/25 text-charcoal border border-chartreuse-dark/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-chartreuse-dark" />
                        AGENT
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-charcoal-light">
                      Aman Gupta&apos;s Autonomous Agent &bull; Real-time Streaming
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <a
                    href="mailto:amangupta201497@gmail.com"
                    onClick={() => playTactileClick("tick")}
                    title="Email Aman directly"
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-paper border border-border-mid/70 hover:border-charcoal text-[11px] font-mono font-medium text-charcoal hover:bg-white transition-all mr-1"
                  >
                    <EnvelopeIcon className="w-3.5 h-3.5 text-muted-green" />
                    <span>Connect</span>
                  </a>

                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClear}
                      title="Clear chat"
                      className="p-1.5 rounded-lg text-charcoal-light hover:text-charcoal hover:bg-paper transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      playTactileClick("tick");
                    }}
                    title="Close (Esc)"
                    className="p-1.5 rounded-lg text-charcoal-light hover:text-charcoal hover:bg-paper transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Message Feed / Welcome Screen */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {messages.length === 0 ? (
                  // Welcome Screen
                  <div className="h-full flex flex-col justify-center space-y-6 py-4">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-paper border border-border-subtle font-mono text-[10px] text-muted-green font-semibold uppercase tracking-wider">
                        <SparklesIcon className="w-3.5 h-3.5" />
                        <span>Interactive Engineering Copilot</span>
                      </div>
                      <h4 className="text-2xl font-bold text-charcoal tracking-tight font-sans">
                        Ask Archon anything.
                      </h4>
                      <p className="text-xs text-charcoal-mid leading-relaxed max-w-md">
                        Archon is grounded in Aman Gupta&apos;s verified experience at <strong>BlackRock</strong>, <strong>TCS</strong>, and <strong>Invock Digital</strong>. Instant streaming answers.
                      </p>
                    </div>

                    {/* Starter Prompts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {STARTER_PROMPTS.map((prompt, idx) => {
                        const Icon = prompt.icon;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSend(prompt.query)}
                            className="group p-3.5 text-left rounded-xl bg-paper border border-border-subtle hover:border-charcoal hover:bg-white transition-all shadow-xs flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="p-1.5 rounded-md bg-ivory border border-border-subtle text-muted-green group-hover:text-charcoal">
                                <Icon className="w-4 h-4" />
                              </span>
                              <ArrowRightIcon className="w-3 h-3 text-charcoal-light opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <span className="font-bold text-xs text-charcoal block mb-0.5">
                              {prompt.title}
                            </span>
                            <span className="text-[11px] text-charcoal-light leading-snug">
                              {prompt.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Active Conversation Feed
                  <div className="space-y-6">
                    {messages.map((msg) => {
                      const isUser = msg.role === "user";

                      return (
                        <div
                          key={msg.id}
                          className={`flex gap-3 ${
                            isUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          {!isUser && (
                            <div className="w-7 h-7 rounded-lg bg-charcoal text-chartreuse font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                              AG
                            </div>
                          )}

                          <div
                            className={`flex flex-col ${
                              isUser ? "items-end max-w-[85%]" : "items-start max-w-[92%]"
                            }`}
                          >
                            <span className="font-mono text-[10px] text-charcoal-light uppercase tracking-wider mb-1 px-1">
                              {isUser ? "You" : "Aman AI"}
                            </span>

                            <div
                              className={`${
                                isUser
                                  ? "bg-charcoal text-ivory rounded-2xl rounded-tr-xs px-4 py-3 shadow-xs text-sm"
                                  : "text-charcoal pl-0.5 w-full"
                              }`}
                            >
                              {isUser ? (
                                <p className="leading-relaxed font-sans">{msg.text}</p>
                              ) : (
                                <>
                                  <FormattedMessage
                                    content={msg.text}
                                    isStreaming={
                                      isStreaming &&
                                      msg.id === messages[messages.length - 1]?.id
                                    }
                                  />

                                  {msg.text && (
                                    <div className="pt-2 mt-2 flex items-center gap-3 text-[11px] font-mono text-charcoal-light">
                                      <button
                                        type="button"
                                        onClick={() => handleCopy(msg.id, msg.text)}
                                        className="inline-flex items-center gap-1 hover:text-charcoal transition-colors px-2 py-0.5 rounded hover:bg-paper"
                                      >
                                        {copiedId === msg.id ? (
                                          <>
                                            <ClipboardDocumentCheckIcon className="w-3.5 h-3.5 text-chartreuse-dark" />
                                            <span className="text-chartreuse-dark font-semibold">
                                              Copied
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                                            <span>Copy response</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Follow-up Pills */}
              {messages.length > 0 && (
                <div className="px-6 py-2 bg-paper/60 border-t border-border-subtle flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar">
                  <span className="text-charcoal-light text-[10px] uppercase flex-shrink-0">
                    Follow-up:
                  </span>
                  {FOLLOWUP_PILLS.map((pill, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(pill)}
                      disabled={isStreaming}
                      className="flex-shrink-0 px-2.5 py-1 rounded-full bg-ivory border border-border-subtle hover:border-charcoal hover:bg-white text-charcoal transition-all disabled:opacity-50"
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 sm:p-5 bg-[#F7F4EE] border-t border-border-subtle">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="relative flex flex-col bg-white border border-border-mid rounded-2xl p-3 shadow-xs focus-within:border-charcoal focus-within:ring-1 focus-within:ring-charcoal transition-all"
                >
                  <textarea
                    ref={textareaRef}
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(input);
                      }
                    }}
                    placeholder="Ask Archon about BlackRock, AEM, React, or hiring Aman..."
                    className="w-full bg-transparent text-sm text-charcoal placeholder-charcoal-light focus:outline-none resize-none leading-relaxed"
                  />

                  <div className="flex items-center justify-between pt-2 border-t border-border-subtle/50 mt-1">
                    <span className="text-[10px] font-mono text-charcoal-light">
                      Enter &crarr; to send &bull; Shift+Enter for new line
                    </span>

                    {isStreaming ? (
                      <button
                        type="button"
                        onClick={handleStop}
                        className="px-3 py-1.5 rounded-lg bg-charcoal text-chartreuse hover:bg-black transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
                      >
                        <StopIcon className="w-3.5 h-3.5" />
                        <span>Stop</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!input.trim()}
                        className={`p-1.5 rounded-lg transition-all ${
                          input.trim()
                            ? "bg-chartreuse text-charcoal hover:bg-chartreuse-dark font-bold scale-105"
                            : "bg-paper text-charcoal-light/40 cursor-not-allowed"
                        }`}
                        aria-label="Send query"
                      >
                        <PaperAirplaneIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>

                {/* AI Disclaimer & Direct Contact Note */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-charcoal-light/75 px-1 gap-2 select-none">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 flex-shrink-0" />
                    <span className="truncate">Archon can make mistakes. Verify critical facts with Aman.</span>
                  </span>
                  <a
                    href="mailto:amangupta201497@gmail.com"
                    onClick={() => playTactileClick("tick")}
                    className="inline-flex items-center gap-1 text-charcoal font-semibold hover:text-muted-green underline underline-offset-2 transition-colors flex-shrink-0 text-[11px]"
                  >
                    <span>Connect</span>
                    <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
