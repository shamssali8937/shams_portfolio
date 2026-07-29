import * as THREE from "three";

/**
 * Ultra-HD Procedural Texture Generator for Cinematic Space Planets.
 * Generates 2048x1024 high-resolution surface maps, normal bump maps, 
 * atmospheric cloud layers, and multi-band planetary ring textures.
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

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** Ultra-HD Terrestrial Earth/Ocean Surface Generator */
export function createTerrestrialTexture(
  baseColor: string,
  continentColor: string,
  options: TextureOptions = {}
): THREE.CanvasTexture {
  if (typeof window === "undefined") return new THREE.CanvasTexture(document.createElement("canvas"));
  const { width = 2048, height = 1024, seed = 42 } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  const [br, bg, bb] = parseHex(baseColor);
  const [cr, cg, cb] = parseHex(continentColor);

  // Deep Ocean Base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, `rgb(${Math.max(0, br - 15)},${Math.max(0, bg - 15)},${Math.max(0, bb - 10)})`);
  oceanGrad.addColorStop(0.5, `rgb(${br},${bg},${bb})`);
  oceanGrad.addColorStop(1, `rgb(${Math.max(0, br - 20)},${Math.max(0, bg - 20)},${Math.max(0, bb - 15)})`);
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Shallow Coastal Shelf Waters
  for (let i = 0; i < 120; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 160 + 40;
    const shelfGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
    shelfGrad.addColorStop(0, `rgba(${Math.min(255, br + 40)},${Math.min(255, bg + 50)},${Math.min(255, bb + 40)}, 0.45)`);
    shelfGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shelfGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Major Continents & Archipelagos
  for (let i = 0; i < 140; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 180 + 35;
    const alpha = rand() * 0.4 + 0.6;

    const landGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
    landGrad.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha})`);
    landGrad.addColorStop(0.65, `rgba(${Math.round(cr * 0.85)},${Math.round(cg * 0.9)},${Math.round(cb * 0.8)},${alpha * 0.8})`);
    landGrad.addColorStop(0.9, `rgba(${Math.round(cr * 0.7)},${Math.round(cg * 0.75)},${Math.round(cb * 0.65)},${alpha * 0.4})`);
    landGrad.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = landGrad;
    ctx.beginPath();
    ctx.ellipse(x, y, r * (1 + rand() * 1.2), r * (0.5 + rand() * 0.6), rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Polar Ice Caps
  const capH = height * 0.14;
  const northCap = ctx.createLinearGradient(0, 0, 0, capH);
  northCap.addColorStop(0, "rgba(245, 252, 255, 0.98)");
  northCap.addColorStop(0.7, "rgba(230, 245, 255, 0.7)");
  northCap.addColorStop(1, "rgba(230, 245, 255, 0)");
  ctx.fillStyle = northCap;
  ctx.fillRect(0, 0, width, capH);

  const southCap = ctx.createLinearGradient(0, height, 0, height - capH);
  southCap.addColorStop(0, "rgba(245, 252, 255, 0.98)");
  southCap.addColorStop(0.7, "rgba(230, 245, 255, 0.7)");
  southCap.addColorStop(1, "rgba(230, 245, 255, 0)");
  ctx.fillStyle = southCap;
  ctx.fillRect(0, height - capH, width, capH);

  // Perlin Fine Grain Noise Layer
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (rand() - 0.5) * 28;
    data[i]     = Math.max(0, Math.min(255, data[i] + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/** Ultra-HD Gas Giant Storm Band Generator (Jupiter / Saturn / Neptune) */
export function createGasGiantTexture(
  primaryColor: string,
  secondaryColor: string,
  options: TextureOptions = {}
): THREE.CanvasTexture {
  if (typeof window === "undefined") return new THREE.CanvasTexture(document.createElement("canvas"));
  const { width = 2048, height = 1024, seed = 88 } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  const [r1, g1, b1] = parseHex(primaryColor);
  const [r2, g2, b2] = parseHex(secondaryColor);

  // Multi-layered horizontal atmospheric bands
  const bands = 36 + Math.floor(rand() * 16);
  for (let i = 0; i < bands; i++) {
    const y = (i / bands) * height;
    const bh = height / bands + rand() * 16 - 8;
    const t = Math.sin((i / bands) * Math.PI * 2) * 0.5 + 0.5;
    const r = Math.round(r1 + (r2 - r1) * t + (rand() - 0.5) * 45);
    const g = Math.round(g1 + (g2 - g1) * t + (rand() - 0.5) * 35);
    const b = Math.round(b1 + (b2 - b1) * t + (rand() - 0.5) * 35);
    ctx.fillStyle = `rgb(${Math.max(0,Math.min(255,r))},${Math.max(0,Math.min(255,g))},${Math.max(0,Math.min(255,b))})`;
    ctx.fillRect(0, y, width, bh + 6);
  }

  // Wavy jet-stream shear lines
  for (let i = 0; i < 28; i++) {
    const y = rand() * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    const waveFreq = 0.02 + rand() * 0.02;
    const waveAmp = 8 + rand() * 16;
    for (let x = 0; x < width; x += 16) {
      ctx.lineTo(x, y + Math.sin(x * waveFreq + rand() * 8) * waveAmp);
    }
    ctx.strokeStyle = `rgba(255,255,255,${rand() * 0.2 + 0.05})`;
    ctx.lineWidth = rand() * 6 + 1;
    ctx.stroke();
  }

  // Great Red/Dark Oval Storm Spot
  const spotX = width * 0.62;
  const spotY = height * 0.62;
  const spotGrad = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 70);
  spotGrad.addColorStop(0, `rgba(${Math.min(255, r1 + 80)}, ${Math.max(0, g1 - 30)}, ${Math.max(0, b1 - 30)}, 0.9)`);
  spotGrad.addColorStop(0.5, `rgba(${r1}, ${g1}, ${b1}, 0.6)`);
  spotGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = spotGrad;
  ctx.beginPath();
  ctx.ellipse(spotX, spotY, 75, 40, 0.12, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/** Ultra-HD Rocky / Moon Cratered Surface Generator */
export function createRockyTexture(
  baseColor: string,
  options: TextureOptions = {}
): THREE.CanvasTexture {
  if (typeof window === "undefined") return new THREE.CanvasTexture(document.createElement("canvas"));
  const { width = 2048, height = 1024, seed = 77 } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  const [r, g, b] = parseHex(baseColor);

  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(0, 0, width, height);

  // Impact Craters with Bright Rims and Deep Shadows
  for (let i = 0; i < 110; i++) {
    const cx = rand() * width;
    const cy = rand() * height;
    const cr = rand() * 45 + 8;

    // Rim highlight
    const rimGrad = ctx.createRadialGradient(cx, cy, cr * 0.75, cx, cy, cr * 1.3);
    rimGrad.addColorStop(0, "rgba(0,0,0,0)");
    rimGrad.addColorStop(0.8, `rgba(255,255,255,${rand() * 0.3 + 0.1})`);
    rimGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = rimGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, cr * 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Crater Floor Shadow
    const floorGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * 0.75);
    floorGrad.addColorStop(0, `rgba(0,0,0,${rand() * 0.45 + 0.2})`);
    floorGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = floorGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, cr * 0.75, 0, Math.PI * 2);
    ctx.fill();
  }

  // Surface Noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (rand() - 0.5) * 36;
    data[i]     = Math.max(0, Math.min(255, data[i] + n));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/** Creates a high-relief procedural bump heightmap for mountain & crater depth */
export function createBumpMap(options: TextureOptions = {}): THREE.CanvasTexture {
  if (typeof window === "undefined") return new THREE.CanvasTexture(document.createElement("canvas"));
  const { width = 1024, height = 512, seed = 123 } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 160; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 60 + 10;
    const bright = rand() > 0.45;

    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, bright ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)");
    g.addColorStop(1, "rgba(128,128,128,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/** Creates a multi-ringed Saturn style texture */
export function createRingTexture(ringColor: string): THREE.CanvasTexture {
  if (typeof window === "undefined") return new THREE.CanvasTexture(document.createElement("canvas"));
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1;
  const ctx = canvas.getContext("2d")!;
  const [r, g, b] = parseHex(ringColor);

  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(0.08, `rgba(${r},${g},${b},0.15)`);
  grad.addColorStop(0.25, `rgba(${r},${g},${b},0.85)`);
  grad.addColorStop(0.32, `rgba(${r * 0.5},${g * 0.5},${b * 0.5},0.2)`); // Cassini Division gap!
  grad.addColorStop(0.36, "rgba(0,0,0,0)");
  grad.addColorStop(0.42, `rgba(${r},${g},${b},0.9)`);
  grad.addColorStop(0.7, `rgba(${r},${g},${b},0.65)`);
  grad.addColorStop(0.85, `rgba(${r},${g},${b},0.3)`);
  grad.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Creates a swirling atmospheric cloud layer texture */
export function createCloudTexture(options: TextureOptions = {}): THREE.CanvasTexture {
  if (typeof window === "undefined") return new THREE.CanvasTexture(document.createElement("canvas"));
  const { width = 2048, height = 1024, seed = 500 } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < 90; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 110 + 30;

    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${rand() * 0.55 + 0.25})`);
    g.addColorStop(0.5, `rgba(240,248,255,${rand() * 0.25})`);
    g.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, r * 2.2, r * 0.6, rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}
