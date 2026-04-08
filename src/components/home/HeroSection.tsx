import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Code,
  Brain,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  const stats = [
    { icon: Users, value: "10,000+", label: "طالب مسجل" },
    { icon: BookOpen, value: "150+", label: "كورس تعليمي" },
    { icon: Award, value: "98%", label: "نسبة الرضا" },
    { icon: TrendingUp, value: "85%", label: "معدل التوظيف" },
  ];

  const featuredTracks = [
    {
      icon: Code,
      name: "Full Stack Development",
      color: "from-primary to-secondary",
    },
    {
      icon: Brain,
      name: "Artificial Intelligence",
      color: "from-accent to-primary",
    },
  ];

  return (
    <section
      dir="rtl"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-gradient-glow" />
      </div>

      {/* ── Animated Blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-16 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-24 right-16 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* ── Grid Pattern ── */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />

      {/* ── Main Content ── */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>منصة التعليم التقني الأولى في مصر</span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.15] mb-5 opacity-0 animate-slide-up"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            ابنِ مستقبلك التقني
            <br />
            <span className="text-gradient block mt-5">مع EXMPEX Academy</span>
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl mb-8 opacity-0 animate-slide-up"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            اكتشف أكثر من 150 كورس تقني احترافي، واستفد من خدماتنا المتقدمة في
            الذكاء الاصطناعي وتطوير المواقع وأتمتة الأعمال.
          </p>

          {/* Featured Tracks */}
          <div
            className="flex flex-wrap gap-3 mb-10 opacity-0 animate-slide-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            {featuredTracks.map((track, index) => (
              <div
                key={index}
                className={`
                  flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                  bg-gradient-to-l ${track.color} bg-opacity-20
                  backdrop-blur-sm border border-white/20
                  hover:border-white/40 hover:scale-[1.03]
                  transition-all duration-300 cursor-pointer
                `}
              >
                <track.icon className="h-4.5 w-4.5 text-white shrink-0" />
                <span className="text-white font-medium text-sm">
                  {track.name}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap items-center gap-3 mb-20 opacity-0 animate-slide-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <Link to="/courses">
              <Button
                size="lg"
                className="
                  bg-gradient-primary hover:opacity-90 text-white shadow-glow
                  h-14 px-8 text-lg font-semibold
                  transition-all duration-300 hover:scale-[1.03] hover:shadow-xl
                  flex items-center gap-2
                "
              >
                استكشف الكورسات
                <ArrowRight className="h-4.5 w-4.5" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="
                border-white/25 text-white bg-white/5
                hover:bg-white/10 hover:border-white/40
                h-14 px-8 text-lg font-medium
                transition-all duration-300 hover:scale-[1.03]
                flex items-center gap-2
              "
            >
              <Play className="h-4 w-4 fill-white" />
              شاهد الفيديو التعريفي
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="
                  group p-5 rounded-2xl
                  bg-white/5 backdrop-blur-sm
                  border border-white/10
                  hover:bg-white/10 hover:border-white/25
                  transition-all duration-300 hover:scale-[1.04]
                  opacity-0 animate-scale-in
                "
                style={{
                  animationDelay: `${0.6 + index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <stat.icon className="h-5 w-5 text-accent shrink-0" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/55 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Fade ── */}
      {/* <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" /> */}
    </section>
  );
}
