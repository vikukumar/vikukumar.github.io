"use client";

import { useEffect, useRef } from "react";

type Planet = {
  name: string;
  radius: number;
  size: number;
  period: number;
  color: string;
  tilt: number;
  phase: number;
};

type ScenePalette = {
  brand: string;
  secondary: string;
  tertiary: string;
  foreground: string;
  isLight: boolean;
};

const planets: Planet[] = [
  { name: "Mercury", radius: 46, size: 2.2, period: 87.969, color: "#a99f92", tilt: 0.18, phase: 4.4 },
  { name: "Venus", radius: 68, size: 3.8, period: 224.701, color: "#e5c07b", tilt: -0.08, phase: 1.35 },
  { name: "Earth", radius: 96, size: 4.2, period: 365.256, color: "#60a5fa", tilt: 0.1, phase: 1.75 },
  { name: "Mars", radius: 126, size: 3.1, period: 686.98, color: "#f97316", tilt: -0.14, phase: 5.0 },
  { name: "Jupiter", radius: 174, size: 9.5, period: 4332.59, color: "#d8b48a", tilt: 0.04, phase: 0.6 },
  { name: "Saturn", radius: 224, size: 8.3, period: 10759.22, color: "#f4d49c", tilt: -0.1, phase: 5.1 },
  { name: "Uranus", radius: 270, size: 5.6, period: 30685.4, color: "#9be7ff", tilt: 0.08, phase: 2.2 },
  { name: "Neptune", radius: 316, size: 5.4, period: 60189, color: "#4f7cff", tilt: -0.06, phase: 4.0 }
];

const j2000 = Date.UTC(2000, 0, 1, 12);

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function orbitAngle(period: number, phase: number) {
  const days = (Date.now() - j2000) / 86400000;
  return phase + (days / period) * Math.PI * 2;
}

function drawGlow(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, alpha = 1) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.35, color.replace(")", `, ${0.32 * alpha})`).replace("rgb", "rgba"));
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawSpiralGalaxy(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  rot: number,
  alpha: number,
  colors: string[],
  glowColor: string,
  coreColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.globalAlpha = alpha;
  drawGlow(ctx, 0, 0, 220 * scale, glowColor, 0.7);

  for (let arm = 0; arm < 3; arm++) {
    for (let i = 0; i < 180; i++) {
      const t = i / 180;
      const angle = t * Math.PI * 5.4 + arm * ((Math.PI * 2) / 3);
      const r = 10 + t * 230 * scale;
      const jitter = Math.sin(i * 9.17 + arm) * 8 * scale;
      const x = Math.cos(angle) * (r + jitter);
      const y = Math.sin(angle) * (r + jitter) * 0.42;
      ctx.fillStyle = colors[i % colors.length];
      ctx.globalAlpha = alpha * (1 - t * 0.55);
      ctx.beginPath();
      ctx.arc(x, y, Math.max(0.35, (1.9 - t) * scale), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = alpha;
  ctx.fillStyle = coreColor;
  ctx.beginPath();
  ctx.arc(0, 0, 6 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function ScrollScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef(0);
  const motionRef = useRef(0);
  const renderRef = useRef<(() => void) | null>(null);
  const paletteRef = useRef<ScenePalette>({
    brand: "96,165,250",
    secondary: "168,85,247",
    tertiary: "16,185,129",
    foreground: "232,236,249",
    isLight: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const readThemePalette = () => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      const readColor = (name: string, fallback: string) =>
        styles.getPropertyValue(name).trim().split(/\s+/).join(",") || fallback;

      paletteRef.current = {
        brand: readColor("--brand", "96,165,250"),
        secondary: readColor("--brand-secondary", "168,85,247"),
        tertiary: readColor("--brand-tertiary", "16,185,129"),
        foreground: readColor("--fg", "232,236,249"),
        isLight: root.dataset.theme === "light"
      };
    };
    readThemePalette();

    const rand = mulberry32(42690);
    const stars = Array.from({ length: 360 }, () => ({
      x: rand(),
      y: rand(),
      z: 0.25 + rand() * 1.8,
      a: 0.18 + rand() * 0.82,
      s: 0.45 + rand() * 1.55
    }));
    const dust = Array.from({ length: 150 }, () => ({
      x: rand(),
      y: rand(),
      r: 24 + rand() * 90,
      a: 0.015 + rand() * 0.055,
      c: rand() > 0.5 ? "brand" as const : "secondary" as const
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / max));
    };

    const drawPlanet = (planet: Planet, cx: number, cy: number, zoom: number, depth: number) => {
      const orbit = planet.radius * zoom;
      const angle = orbitAngle(planet.period, planet.phase);
      const px = cx + Math.cos(angle) * orbit;
      const py = cy + Math.sin(angle) * orbit * (0.46 + planet.tilt);
      const size = planet.size * zoom;

      ctx.strokeStyle = `rgba(148,163,184,${0.12 + depth * 0.18})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, orbit, orbit * (0.46 + planet.tilt), 0, 0, Math.PI * 2);
      ctx.stroke();

      drawGlow(ctx, px, py, size * 5.5, `rgb(${planet.color.match(/\w\w/g)?.map((h) => parseInt(h, 16)).join(",") ?? "255,255,255"})`, 0.7);
      ctx.fillStyle = planet.color;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();

      if (planet.name === "Saturn") {
        ctx.strokeStyle = "rgba(244,212,156,0.55)";
        ctx.lineWidth = Math.max(1, zoom);
        ctx.beginPath();
        ctx.ellipse(px, py, size * 1.85, size * 0.58, -0.35, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (planet.name === "Earth") {
        const moonAngle = orbitAngle(27.321, 0.2);
        const moonX = px + Math.cos(moonAngle) * 14 * zoom;
        const moonY = py + Math.sin(moonAngle) * 8 * zoom;
        ctx.strokeStyle = "rgba(226,232,240,0.18)";
        ctx.beginPath();
        ctx.ellipse(px, py, 14 * zoom, 8 * zoom, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#d8dee9";
        ctx.beginPath();
        ctx.arc(moonX, moonY, Math.max(1.2, 1.5 * zoom), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const render = () => {
      frame += 0.006;
      motionRef.current += (scrollRef.current - motionRef.current) * 0.045;
      const depth = motionRef.current;
      const palette = paletteRef.current;

      ctx.clearRect(0, 0, width, height);
      if (!palette.isLight) {
        const bg = ctx.createLinearGradient(0, 0, width, height);
        bg.addColorStop(0, `rgba(${palette.brand},0.08)`);
        bg.addColorStop(0.45, `rgba(${depth < 0.35 ? palette.brand : palette.secondary},0.1)`);
        bg.addColorStop(1, `rgba(${palette.tertiary},0.06)`);
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
      }

      for (const cloud of dust) {
        const x = ((cloud.x * width + depth * 220 * cloud.x) % (width + 220)) - 110;
        const y = ((cloud.y * height + Math.sin(frame + cloud.x * 8) * 22) % (height + 220)) - 110;
        const g = ctx.createRadialGradient(x, y, 0, x, y, cloud.r);
        const color = cloud.c === "brand" ? palette.brand : palette.secondary;
        g.addColorStop(0, `rgba(${color},${cloud.a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x - cloud.r, y - cloud.r, cloud.r * 2, cloud.r * 2);
      }

      for (const star of stars) {
        const drift = depth * 180 * star.z;
        const x = (star.x * width + drift + Math.sin(frame * star.z + star.y * 12) * 10) % width;
        const y = (star.y * height + depth * 70 * star.z) % height;
        ctx.globalAlpha = star.a * (0.55 + Math.sin(frame * 3 + star.x * 20) * 0.25);
        ctx.fillStyle = palette.isLight ? `rgb(${palette.foreground})` : "#fff";
        ctx.beginPath();
        ctx.arc(x, y, star.s * star.z, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const far = Math.max(0, 1 - depth * 2.6);
      const galaxyColors = [
        `rgb(${palette.brand})`,
        `rgb(${palette.secondary})`,
        `rgb(${palette.tertiary})`
      ];
      const coreColor = palette.isLight
        ? `rgba(${palette.foreground},0.28)`
        : "rgba(255,255,255,0.86)";
      drawSpiralGalaxy(ctx, width * 0.18, height * 0.22 + depth * 90, 0.95 + depth * 0.25, frame * 0.18, 0.5 * far, galaxyColors, `rgb(${palette.brand})`, coreColor);
      drawSpiralGalaxy(ctx, width * 0.78, height * 0.18 + depth * 70, 0.74, -frame * 0.16, 0.45 * far, galaxyColors, `rgb(${palette.secondary})`, coreColor);
      drawSpiralGalaxy(ctx, width * 0.62, height * 0.72 - depth * 120, 0.62, frame * 0.2, 0.35 * far, galaxyColors, `rgb(${palette.tertiary})`, coreColor);

      const milky = Math.min(1, Math.max(0, (depth - 0.12) / 0.55));
      ctx.save();
      ctx.translate(width * 0.5, height * (0.52 - milky * 0.1));
      ctx.rotate(-0.35 + depth * 0.35);
      const band = ctx.createLinearGradient(-width, 0, width, 0);
      band.addColorStop(0, `rgba(${palette.foreground},0)`);
      band.addColorStop(0.28, `rgba(${palette.brand},${0.05 + milky * 0.18})`);
      band.addColorStop(0.5, `rgba(${palette.foreground},${0.06 + milky * 0.18})`);
      band.addColorStop(0.72, `rgba(${palette.secondary},${0.05 + milky * 0.16})`);
      band.addColorStop(1, `rgba(${palette.foreground},0)`);
      ctx.fillStyle = band;
      ctx.filter = "blur(10px)";
      ctx.fillRect(-width, -height * 0.11, width * 2, height * 0.22);
      ctx.filter = "none";
      ctx.restore();

      const solar = Math.min(1, Math.max(0, (depth - 0.38) / 0.42));
      const cx = width * (0.5 - solar * 0.1);
      const cy = height * (0.52 + solar * 0.02);
      const zoom = Math.max(0.55, Math.min(width, height) / 760) * (0.45 + solar * 1.35);
      const sunAlpha = 0.18 + solar * 0.82;

      drawGlow(ctx, cx, cy, 94 * zoom, "rgb(251,191,36)", sunAlpha);
      ctx.fillStyle = `rgba(253,224,71,${sunAlpha})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 14 * zoom, 0, Math.PI * 2);
      ctx.fill();

      for (const planet of planets) {
        drawPlanet(planet, cx, cy, zoom, solar);
      }

      if (!reducedMotion) {
        raf = requestAnimationFrame(render);
      }
    };

    renderRef.current = render;
    const themeObserver = new MutationObserver(() => {
      readThemePalette();
      if (reducedMotion) {
        raf = requestAnimationFrame(() => renderRef.current?.());
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-company-theme"]
    });

    resize();
    updateScroll();
    render();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      renderRef.current = null;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="scroll-scene-canvas pointer-events-none fixed inset-0 z-0"
    />
  );
}
