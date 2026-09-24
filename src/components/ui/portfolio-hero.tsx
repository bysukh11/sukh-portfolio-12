import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, Play, Volume2, FileText } from "lucide-react";

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

// Sample data — replace with your real work
const videoProjects = [
  {
    title: "Client Commercial",
    description: "This 28-second-long video advertises Calgary's local nightclub called Dreamer's Night Club. This project was edited on Final Cut Pro.",
    tag: "Commercial",
  },
  {
    title: "Interview: Education Student",
    description: "12-minute narrative documentary edit, structured from 4 hours of raw interview footage.",
    tag: "Documentary",
  },
  {
    title: "YouTube-Style Horror video",
    description: "3-minute multi-camera highlight edit for a live event, synced to a custom audio mix.",
    tag: "Live Event",
  },
];

const audioProjects = [
  {
    title: "Audio Story",
    description: "Full episode mix and master — noise reduction, leveling, and mastering for a weekly podcast.",
    tag: "Podcast",
  },
  {
    title: "Voiceover Sound Design",
    description: "Layered voiceover with ambient sound design for a broadcast promo spot.",
    tag: "Broadcast",
  },
];

const articles = [
  {
    title: "Unlock convenience: How university lockers are a student’s best friend",
    description: "A simple yet comprehensible material educating students on the resources available at Mount Royal University",
    date: "2026",
  },
  {
    title: "Building a Sound Design Workflow From Scratch",
    excerpt: "How I set up a repeatable process for layering ambience, foley, and dialogue in post.",
    date: "2025",
  },
  {
    title: "Notes From Broadcasting School",
    excerpt: "Reflections on the projects and mentors that shaped how I think about storytelling.",
    date: "2025",
  },
];

export default function Component() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { label: "HOME", href: "#top", highlight: true },
    { label: "ABOUT", href: "#about" },
    { label: "VIDEO", href: "#video-projects" },
    { label: "AUDIO", href: "#audio-projects" },
    { label: "ARTICLES", href: "#articles" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <div
      id="top"
      className="min-h-screen text-foreground transition-colors"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              ) : (
                <Menu className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[200px] md:w-[240px] border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
                }}
              >
                {menuItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href}
                    className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300"
                    style={{
                      color: item.highlight ? "#C3E41D" : isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C3E41D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.highlight ? "#C3E41D" : (isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)");
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Signature */}
          <div className="text-4xl" style={{ color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)", fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
            S
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
            aria-label="Toggle theme"
          >
            <div
              className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text="SUKH"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[400px] sm:text-[75px] md:text-[100px] lg:text-[125px] leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="DHILLON"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[400px] sm:text-[75px] md:text-[100px] lg:text-[125px] leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Profile Picture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[80px] h-[130px] sm:w-[110px] sm:h-[175px] md:w-[140px] md:h-[220px] lg:w-[165px] lg:h-[260px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
                <img
                  src="https://i.ibb.co/Ngx1FdP2/IMG-0964.jpg"
                  alt="https://i.ibb.co/Ngx1FdP2/IMG-0964.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="Sculpting time and light into wake dreams."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        <a href="#about" aria-label="Scroll down" className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300">
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
        </a>
      </main>

      {/* About Section */}
      <section id="about" className="px-6 py-24 md:py-32 max-w-screen-lg mx-auto">
        <h2 className="text-sm font-bold tracking-[0.3em] mb-6" style={{ color: "#C3E41D" }}>
          ABOUT
        </h2>
        <p className="text-2xl md:text-4xl font-bold leading-tight mb-6">
        Hi there, I'm Sukh!
I'm a recent broadcasting graduate turning raw footage into stories that connect video, audio, and everything in between.
        </p>
        <p className="text-neutral-500 text-base md:text-lg leading-relaxed max-w-2xl">
        I'm a Bachelor of Communications graduate from Mount Royal University in Calgary, majoring in Broadcast Media Studies with a minor in Marketing. This portfolio showcases my work in interviews, promotional content, and video/audio production, built on a foundation in scriptwriting, shooting, and editing using DaVinci Resolve, Adobe Audition, Adobe Premiere Pro, and Final Cut Pro. I'm looking to bring that experience into content creation, marketing, and media production roles.
        </p>
      </section>

      {/* Video Projects Section */}
      <section id="video-projects" className="px-6 py-24 md:py-32 max-w-screen-lg mx-auto">
        <h2 className="text-sm font-bold tracking-[0.3em] mb-10" style={{ color: "#C3E41D" }}>
          VIDEO PROJECTS
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {videoProjects.map((project) => (
            <div
              key={project.title}
              className="p-6 rounded-lg border transition-colors duration-300"
              style={{
                borderColor: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 85%)",
              }}
            >
              <div
                className="w-full aspect-video rounded-md mb-4 flex items-center justify-center"
                style={{ backgroundColor: isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 92%)" }}
              >
                <Play className="w-10 h-10 text-neutral-500" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-bold tracking-widest text-neutral-500">{project.tag}</span>
              <h3 className="text-xl font-bold mt-2 mb-2">{project.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Audio Projects Section */}
      <section id="audio-projects" className="px-6 py-24 md:py-32 max-w-screen-lg mx-auto">
        <h2 className="text-sm font-bold tracking-[0.3em] mb-10" style={{ color: "#C3E41D" }}>
          AUDIO PROJECTS
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {audioProjects.map((project) => (
            <div
              key={project.title}
              className="p-6 rounded-lg border transition-colors duration-300 flex items-start gap-4"
              style={{
                borderColor: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 85%)",
              }}
            >
              <div
                className="shrink-0 w-14 h-14 rounded-md flex items-center justify-center"
                style={{ backgroundColor: isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 92%)" }}
              >
                <Volume2 className="w-6 h-6 text-neutral-500" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-neutral-500">{project.tag}</span>
                <h3 className="text-xl font-bold mt-2 mb-2">{project.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="px-6 py-24 md:py-32 max-w-screen-lg mx-auto">
        <h2 className="text-sm font-bold tracking-[0.3em] mb-10" style={{ color: "#C3E41D" }}>
          ARTICLES
        </h2>
        <div className="space-y-8">
          {articles.map((article) => (
            <div
              key={article.title}
              className="pb-8 border-b flex items-start gap-4"
              style={{
                borderColor: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 85%)",
              }}
            >
              <FileText className="w-6 h-6 mt-1 shrink-0 text-neutral-500" strokeWidth={1.5} />
              <div>
                <span className="text-xs font-bold tracking-widest text-neutral-500">{article.date}</span>
                <h3 className="text-xl font-bold mt-2 mb-2">{article.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{article.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-24 md:py-32 max-w-screen-lg mx-auto text-center">
        <h2 className="text-sm font-bold tracking-[0.3em] mb-6" style={{ color: "#C3E41D" }}>
          CONTACT
        </h2>
        <p className="text-2xl md:text-4xl font-bold mb-8">Let's work together.</p>
        <a
          href="mailto:your.email@example.com"
          className="inline-block text-lg md:text-xl font-bold underline decoration-2 underline-offset-4"
          style={{ color: "#C3E41D" }}
        >
          sukhdeepd171@gmail.com 
        </a>
      </section>
    </div>
  );
}