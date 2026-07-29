import * as THREE from "three";

/**
 * Procedural texture generator for planet surfaces.
 * Creates canvas-based textures — no external image files needed.
 * Each texture type uses layered noise patterns for a unique look.
 */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface TextureOptions {
  width?: number;
  height?: number;
  seed?: number;
}

/** Creates a terrestrial-style surface texture */
export function createPlanetTexture(
  baseColor: string,
  accentColor: string,
  options: TextureOptions = {}
): THREE.CanvasTexture {
  const { width = 512, height = 256, seed = 42 } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  // Parse hex color to RGB
  const parseHex = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };

  const [br, bg, bb] = parseHex(baseColor);
  const [ar, ag, ab] = parseHex(accentColor);

  // Base gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, `rgb(${br},${bg},${bb})`);
  grad.addColorStop(0.5, `rgb(${Math.round((br + ar) / 2)},${Math.round((bg + ag) / 2)},${Math.round((bb + ab) / 2)})`);
  grad.addColorStop(1, `rgb(${ar},${ag},${ab})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Noise blobs (continent-like patches)
  for (let i = 0; i < 80; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 40 + 10;
    const alpha = rand() * 0.15 + 0.03;
    const light = rand() > 0.5;

    const blobGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
    const color = light
      ? `rgba(255,255,255,${alpha})`
      : `rgba(0,0,0,${alpha})`;
    blobGrad.addColorStop(0, color);
    blobGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = blobGrad;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.5 + rand() * 0.5), rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine noise layer
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (rand() - 0.5) * 18;
    data[i]     = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Specular highlight band (equatorial glow)
  const specGrad = ctx.createLinearGradient(0, height * 0.3, 0, height * 0.7);
  specGrad.addColorStop(0, "rgba(255,255,255,0)");
  specGrad.addColorStop(0.5, "rgba(255,255,255,0.04)");
  specGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = specGrad;
  ctx.fillRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Creates a gas giant style banded texture */
export function createGasTexture(
  color1: string,
  color2: string,
  options: TextureOptions = {}
): THREE.CanvasTexture {
  const { width = 512, height = 256, seed = 99 } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  const parseHex = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };

  const [r1, g1, b1] = parseHex(color1);
  const [r2, g2, b2] = parseHex(color2);

  // Horizontal bands
  const bands = 14 + Math.floor(rand() * 10);
  for (let i = 0; i < bands; i++) {
    const y = (i / bands) * height;
    const bh = height / bands + rand() * 8 - 4;
    const t = i / bands;
    const r = Math.round(r1 + (r2 - r1) * t + (rand() - 0.5) * 30);
    const g = Math.round(g1 + (g2 - g1) * t + (rand() - 0.5) * 20);
    const b = Math.round(b1 + (b2 - b1) * t + (rand() - 0.5) * 20);
    ctx.fillStyle = `rgb(${Math.max(0,Math.min(255,r))},${Math.max(0,Math.min(255,g))},${Math.max(0,Math.min(255,b))})`;
    ctx.fillRect(0, y, width, bh + 4);
  }

  // Wavy band edges
  for (let i = 0; i < 8; i++) {
    const y = rand() * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < width; x += 8) {
      ctx.lineTo(x, y + Math.sin(x * 0.05 + rand() * 10) * (rand() * 6));
    }
    ctx.strokeStyle = `rgba(255,255,255,${rand() * 0.08})`;
    ctx.lineWidth = rand() * 3;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Creates a rocky/barren planet texture */
export function createRockyTexture(
  color: string,
  options: TextureOptions = {}
): THREE.CanvasTexture {
  const { width = 512, height = 256, seed = 7 } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  const h = color.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);

  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(0, 0, width, height);

  // Craters
  for (let i = 0; i < 40; i++) {
    const cx = rand() * width;
    const cy = rand() * height;
    const cr = rand() * 20 + 4;

    // Rim highlight
    const rimGrad = ctx.createRadialGradient(cx, cy, cr * 0.7, cx, cy, cr * 1.2);
    rimGrad.addColorStop(0, "rgba(255,255,255,0)");
    rimGrad.addColorStop(0.8, `rgba(255,255,255,${rand() * 0.12})`);
    rimGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = rimGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, cr * 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Crater floor (darker)
    const floorGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * 0.7);
    floorGrad.addColorStop(0, `rgba(0,0,0,${rand() * 0.25 + 0.1})`);
    floorGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = floorGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, cr * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine texture noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (rand() - 0.5) * 22;
    data[i]     = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Map of planet id → texture generator call.
 * Call this inside a useEffect or on scene mount (client-side only).
 */
export function generatePlanetTextures(): Record<string, THREE.CanvasTexture> {
  return {
    skills:   createPlanetTexture("#5E7C7B", "#3D5F5E", { seed: 11 }),
    projects: createPlanetTexture("#4A9B8E", "#1A5C54", { seed: 22 }),
    resume:   createRockyTexture("#C4956A", { seed: 33 }),
    github:   createRockyTexture("#8B8FA8", { seed: 44 }),
    blog:     createGasTexture("#7C6FAE", "#3D3566", { seed: 55 }),
    contact:  createPlanetTexture("#D97757", "#8C3E1F", { seed: 66 }),
  };
}
