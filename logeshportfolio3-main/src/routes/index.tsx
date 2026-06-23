import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import {
  Brain, Code2, Database, Server, Sparkles, GraduationCap, Trophy,
  Users, Clock, Zap, Heart, MessageSquare, Lightbulb, Puzzle,
  ArrowUp, Mail, Github, Linkedin, Cpu, Layers, Terminal, FileCode,
  ArrowRight, Download, ChevronDown, Rocket, Activity, MousePointer2,
  Phone,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Logesh M | Full Stack Developer | AI Prompt Engineer | LLM Engineer" },
      { name: "description", content: "Portfolio of Logesh M showcasing projects, AI expertise, web development skills, and aspirations in Large Language Models." },
      { property: "og:title", content: "Logesh M | Full Stack Developer | AI Prompt Engineer | LLM Engineer" },
      { property: "og:description", content: "Portfolio of Logesh M showcasing projects, AI expertise, web development skills, and aspirations in Large Language Models." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

/* ---------------- Particles ---------------- */
function Particles() {
  const particles = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {particles.map((_, i) => {
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 6;
        const dur = 4 + Math.random() * 6;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/60 blur-[1px]"
            style={{
              width: size, height: size,
              left: `${left}%`, top: `${top}%`,
              animation: `float-particle ${dur}s ease-in-out ${delay}s infinite`,
              boxShadow: "0 0 12px var(--primary-glow)",
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- Typing effect ---------------- */
function Typewriter({ phrases }: { phrases: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = phrases[idx];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setIdx((idx + 1) % phrases.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx, phrases]);

  return (
    <span>
      {text}
      <span className="cursor-blink text-primary-glow">|</span>
    </span>
  );
}

/* ---------------- Counter ---------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      onUpdate: (v) => setVal(Math.round(v * 10) / 10),
    });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------------- Loader ---------------- */
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2 border-primary/30" />
        <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-t-primary border-r-accent border-b-transparent border-l-transparent animate-spin" />
        <Brain className="absolute inset-0 m-auto h-8 w-8 text-primary-glow" />
      </div>
      <p className="mt-6 text-sm tracking-[0.3em] text-muted-foreground uppercase">Initializing Neural Net</p>
    </motion.div>
  );
}

/* ---------------- Cursor glow ---------------- */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      className="pointer-events-none fixed z-[60] hidden md:block"
      style={{
        left: pos.x - 150, top: pos.y - 150,
        width: 300, height: 300,
        background: "radial-gradient(circle, oklch(0.78 0.18 310 / 18%), transparent 60%)",
        transition: "transform 0.15s ease-out",
      }}
    />
  );
}

/* ---------------- Section wrapper ---------------- */
function Section({ id, title, kicker, children }: { id: string; title: string; kicker?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-14"
      >
        {kicker && <p className="text-xs tracking-[0.4em] uppercase text-primary-glow mb-3">{kicker}</p>}
        <h2 className="text-4xl md:text-5xl font-bold">
          {title.split(" ").map((w, i) => (
            <span key={i} className={i === title.split(" ").length - 1 ? "text-gradient" : ""}>{w} </span>
          ))}
        </h2>
      </motion.div>
      {children}
    </section>
  );
}

/* ---------------- Main ---------------- */
function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <Loader onDone={() => setLoading(false)} />;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Particles />
      <CursorGlow />
      <div className="fixed inset-0 -z-20 neural-grid opacity-30" />

      {/* Scroll progress */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-[2px] z-50 bg-gradient-to-r from-primary via-accent to-primary-glow"
      />

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/40 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#hero" className="flex items-center gap-2 font-bold">
            <Cpu className="h-5 w-5 text-primary-glow" />
            <span className="text-gradient text-lg">Logesh.M</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {[
              ["About", "about"], ["Education", "education"], ["Skills", "skills"],
              ["Journey", "journey"], ["Contact", "contact"],
            ].map(([l, h]) => (
              <a key={h} href={`#${h}`} className="hover:text-foreground transition-colors">{l}</a>
            ))}
          </nav>
          <a href="#contact" className="rounded-full px-5 py-2 text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition">
            Let's Connect
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        {/* Ambience layers */}
        <div aria-hidden className="absolute inset-0 hero-grid-bg opacity-60 -z-10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none transition-opacity"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), oklch(0.7 0.22 295 / 18%), transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 px-4 py-1.5 text-xs mb-5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted-foreground">Available for opportunities</span>
              <span className="text-foreground/50">·</span>
              <span className="text-primary-glow">2026</span>
            </div>

            {/* Role chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {["AI", "Full Stack", "LLM", "Prompt Engineering"].map((t) => (
                <span key={t} className="text-[11px] tracking-wide uppercase rounded-full px-2.5 py-1 glass-card text-foreground/80">
                  {t}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-5">
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="text-gradient-animated">Logesh M</span>
                <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-primary via-accent to-secondary underline-draw" />
              </span>
            </h1>

            {/* Terminal-style typewriter */}
            <div className="glass-card rounded-xl px-4 py-3 mb-6 max-w-md font-mono text-sm md:text-base flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </span>
              <span className="text-primary-glow">~</span>
              <span className="text-foreground/90 truncate">
                <Typewriter phrases={[
                  "Aspiring Full Stack Developer",
                  "AI Prompt Engineer",
                  "LLM Engineer",
                ]} />
              </span>
            </div>

            <p className="text-muted-foreground max-w-lg leading-relaxed mb-8">
              A Computer Science student passionate about Artificial Intelligence, Full Stack
              Development, and Large Language Models — building impactful technologies that
              solve real-world problems.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="#contact"
                className="btn-shimmer group rounded-full px-6 py-3 font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground inline-flex items-center gap-2 shadow-[0_10px_40px_-10px_var(--primary-glow)] hover:scale-[1.03] transition"
              >
                Hire Me
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#journey"
                className="rounded-full px-6 py-3 font-medium border border-border bg-card/40 hover:bg-card/80 hover:border-primary/40 transition inline-flex items-center gap-2"
              >
                View My Journey
                <ChevronDown className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="rounded-full px-5 py-3 text-sm font-medium text-foreground/80 hover:text-foreground inline-flex items-center gap-2 transition"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>

            {/* Social row */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Github, href: "#", label: "GitHub" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Mail, href: "#contact", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-10 w-10 grid place-items-center rounded-full glass-card text-foreground/70 hover:text-primary-glow hover:scale-110 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
              {[
                { icon: Rocket, to: 5, label: "Projects Built" },
                { icon: Cpu, to: 8, label: "Technologies" },
                { icon: Trophy, to: 3, label: "Certifications" },
              ].map(({ icon: Icon, to, label }, i) => (
                <div key={i} className="glass-card rounded-2xl p-3 md:p-4 relative overflow-hidden group">
                  <Icon className="h-4 w-4 text-primary-glow mb-2 group-hover:scale-110 transition" />
                  <div className="text-2xl md:text-3xl font-bold text-gradient">
                    <Counter to={to} suffix="+" />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
                  <div className="absolute inset-x-3 bottom-2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Neural orb visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[520px] md:h-[700px] flex items-center justify-center"
          >
            {/* Conic halo */}
            <div className="absolute w-[480px] h-[480px] md:w-[600px] md:h-[600px] rounded-full conic-halo opacity-40 blur-2xl" />
            {/* Glow */}
            <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-3xl animate-pulse-glow" />
            {/* Scanline grid inside orb */}
            <div className="absolute w-[26rem] h-[26rem] md:w-[30rem] md:h-[30rem] rounded-full neural-grid scan-mask opacity-50" />

            <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-full glass-card flex items-center justify-center">
              {/* Ring 1 */}
              <div className="absolute inset-3 rounded-full border border-primary/30 animate-[spin_20s_linear_infinite]">
                {[0, 120, 240].map((a) => (
                  <div key={a} className="absolute top-1/2 left-1/2 h-4 w-4 -mt-2 -ml-2 rounded-full bg-primary-glow"
                    style={{ transform: `rotate(${a}deg) translateY(-50%) translateY(-${186}px)`, boxShadow: "0 0 18px var(--primary-glow)" }} />
                ))}
              </div>
              {/* Ring 2 */}
              <div className="absolute inset-8 rounded-full border border-accent/30 animate-[spin_14s_linear_infinite_reverse]">
                {[60, 180, 300].map((a) => (
                  <div key={a} className="absolute top-1/2 left-1/2 h-3 w-3 -mt-1.5 -ml-1.5 rounded-full bg-accent"
                    style={{ transform: `rotate(${a}deg) translateY(-50%) translateY(-${162}px)` }} />
                ))}
              </div>
              {/* Ring 3 */}
              <div className="absolute inset-14 rounded-full border border-secondary/30 animate-[spin_10s_linear_infinite]">
                {[30, 150, 270].map((a) => (
                  <div key={a} className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -mt-1.25 -ml-1.25 rounded-full bg-secondary"
                    style={{ transform: `rotate(${a}deg) translateY(-50%) translateY(-${130}px)` }} />
                ))}
              </div>
              {/* Profile picture */}
              <div className="relative z-10 w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden ring-[3px] ring-primary/40 ring-offset-4 ring-offset-background shadow-[0_0_40px_var(--primary-glow)]">
                <img
                  src="https://i.postimg.cc/X72vBXrs/Whats-App-Image-2026-06-17-at-11-01-55-AM.jpg"
                  alt="Logesh M"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Floating chips */}
            {[
              { icon: Code2, label: "React", x: "-12%", y: "8%" },
              { icon: Database, label: "Backend", x: "92%", y: "14%" },
              { icon: Terminal, label: "LLM", x: "-10%", y: "72%" },
              { icon: Layers, label: "Full Stack", x: "88%", y: "78%" },
              { icon: FileCode, label: "TypeScript", x: "45%", y: "-2%" },
              { icon: Cpu, label: "Python", x: "48%", y: "98%" },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="absolute glass-card rounded-full px-3 py-1.5 hidden sm:flex items-center gap-2 text-xs animate-drift hover:scale-110 hover:border-primary/60 transition"
                style={{ left: c.x, top: c.y, animationDelay: `${i * 0.4}s` }}
              >
                <c.icon className="h-3.5 w-3.5 text-primary-glow" />
                {c.label}
              </motion.div>
            ))}

            {/* Telemetry card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="absolute -bottom-2 right-0 glass-card rounded-xl px-3 py-2 hidden md:flex items-center gap-2 text-[11px]"
            >
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <svg width="48" height="16" viewBox="0 0 48 16" className="text-primary-glow">
                <polyline
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  points="0,10 6,8 12,12 18,5 24,9 30,3 36,7 42,4 48,8"
                />
              </svg>
              <span className="text-muted-foreground">Neural link · <span className="text-emerald-400">stable</span></span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <a
          href="#about"
          aria-label="Scroll to about"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary-glow transition"
        >
          <MousePointer2 className="h-4 w-4 animate-scroll-bounce" />
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        </a>
      </section>


      {/* ABOUT / OBJECTIVE */}
      <Section id="about" title="Career Objective" kicker="01 — About">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <p className="text-lg md:text-xl leading-relaxed text-foreground/90 relative">
            A highly motivated <span className="text-gradient font-semibold">Computer Science student</span> passionate
            about Artificial Intelligence, Full Stack Development, and Large Language Models. Dedicated
            to continuous learning, innovation, and building impactful technologies that solve real-world
            problems. Seeking opportunities to apply technical expertise while growing into an
            <span className="text-gradient font-semibold"> AI-driven software engineer</span>.
          </p>
        </motion.div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Academic Highlights" kicker="02 — Education">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: GraduationCap,
              title: "B.E. Computer Science & Engineering",
              place: "Kangeyam Institute of Technology",
              period: "2024 — 2028",
              status: "Currently Pursuing",
              score: null,
            },
            {
              icon: Trophy,
              title: "HSC",
              place: "Government Higher Secondary School, Peruntholuvu",
              period: "Higher Secondary",
              status: "Completed",
              score: 86.4,
            },
            {
              icon: Trophy,
              title: "SSLC",
              place: "Government Higher Secondary School, Peruntholuvu",
              period: "Secondary",
              status: "Completed",
              score: 91.4,
            },
          ].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-7 relative group"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  <e.icon className="h-6 w-6 text-primary-glow" />
                </div>
                {e.score !== null ? (
                  <div className="relative">
                    <div className="rounded-full px-3 py-1 text-sm font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground animate-pulse-glow">
                      {e.score}%
                    </div>
                  </div>
                ) : (
                  <span className="text-xs px-3 py-1 rounded-full border border-primary/40 text-primary-glow">
                    {e.status}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-1">{e.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{e.place}</p>
              <p className="text-xs text-primary-glow/80 tracking-wider uppercase">{e.period}</p>

              {e.score !== null && (
                <div className="mt-5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${e.score}%` }}
                    viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* INTERESTS */}
      <Section id="interests" title="Areas of Interest" kicker="03 — Focus">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "AI in Data Science", desc: "Exploring intelligent systems that turn data into insight." },
            { icon: Server, title: "Backend Development", desc: "Building robust APIs and scalable server architectures." },
            { icon: Code2, title: "Frontend Development", desc: "Crafting modern, performant, and beautiful interfaces." },
          ].map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl p-8 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500" />
              <it.icon className="h-10 w-10 text-primary-glow mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2 relative">{it.title}</h3>
              <p className="text-sm text-muted-foreground relative">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Technical Skills" kicker="04 — Stack">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FileCode, name: "Python" },
              { icon: Puzzle, name: "React" },
              { icon: Code2, name: "Node.js" },
              { icon: Layers, name: "TypeScript" },
              { icon: Terminal, name: "C++" },
              { icon: FileCode, name: "Git" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.04 }}
                className="glass-card rounded-xl p-5 flex flex-col gap-3"
              >
                <s.icon className="h-6 w-6 text-primary-glow" />
                <span className="font-medium text-sm">{s.name}</span>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-5 text-muted-foreground">Soft Skills</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Users, label: "Leadership" },
                { icon: Clock, label: "Time Management" },
                { icon: Zap, label: "Adaptability" },
                { icon: Heart, label: "Self-Motivation" },
                { icon: Sparkles, label: "Quick Learning" },
                { icon: MessageSquare, label: "Communication" },
                { icon: Users, label: "Teamwork" },
                { icon: Lightbulb, label: "Problem Solving" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="glass-card rounded-full px-4 py-2.5 flex items-center gap-2 text-sm hover:border-primary/60 transition"
                >
                  <s.icon className="h-3.5 w-3.5 text-primary-glow" />
                  {s.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* JOURNEY / TIMELINE */}
      <Section id="journey" title="Activities & Extras" kicker="05 — Journey">
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
          {[
            { title: "Adventure Axis Club", desc: "Active member, exploring leadership and outdoor challenges.", icon: Sparkles },
            { title: "Cricket Player", desc: "Regular player demonstrating teamwork, focus, and discipline.", icon: Trophy },
            { title: "Continuous Learning", desc: "Constantly exploring AI, LLMs, and modern web technologies.", icon: Brain },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex md:items-center mb-10 ${i % 2 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2 pl-12 md:px-8">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                <t.icon className="h-4 w-4 text-primary-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* HOBBIES */}
      <Section id="hobbies" title="Beyond Coding" kicker="06 — Life">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { emoji: "🏏", title: "Cricket Enthusiast", desc: "On the field, building teamwork and strategy." },
            { emoji: "🌱", title: "Gardening Lover", desc: "Finding calm and creativity tending to plants." },
            { emoji: "📚", title: "Lifelong Learner", desc: "Always curious, always reading, always growing." },
          ].map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div className="text-5xl mb-4">{h.emoji}</div>
              <h3 className="text-lg font-semibold mb-2">{h.title}</h3>
              <p className="text-sm text-muted-foreground">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Let's Build Together" kicker="07 — Contact">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <p className="text-muted-foreground mb-3 relative">Open to opportunities, collaborations & internships</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-8 relative">
            Have an idea? <span className="text-gradient">Let's make it real.</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4 relative mb-10">
            <a href="mailto:logeshmcs@gmail.com" className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 transition animate-pulse-glow">
              <Mail className="h-4 w-4" /> Email Me
            </a>
            <a href="https://github.com/LOGESHM-333" className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium border border-border bg-card/40 hover:bg-card/80 transition">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/logesh-m-462b06328/" className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium border border-border bg-card/40 hover:bg-card/80 transition">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download="Logesh Resume.pdf" className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium border border-border bg-card/40 hover:bg-card/80 transition">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto relative text-left">
            <a href="tel:+919363968797" className="glass-card rounded-xl p-4 flex items-center gap-3 hover:border-primary/60 transition">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary-glow" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Mobile</p>
                <p className="font-medium">+91 93639 68797</p>
              </div>
            </a>
            <a href="mailto:logeshmcs@gmail.com" className="glass-card rounded-xl p-4 flex items-center gap-3 hover:border-primary/60 transition">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary-glow" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                <p className="font-medium">logeshmcs@gmail.com</p>
              </div>
            </a>
          </div>
        </motion.div>
      </Section>

      <footer className="border-t border-border py-10 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Logesh M. Crafted with passion, powered by curiosity.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="tel:+919363968797" className="hover:text-primary-glow transition flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> +91 93639 68797
            </a>
            <a href="mailto:logeshmcs@gmail.com" className="hover:text-primary-glow transition flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> logeshmcs@gmail.com
            </a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground animate-pulse-glow"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
