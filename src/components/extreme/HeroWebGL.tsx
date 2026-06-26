'use client';

import { useEffect, useRef } from 'react';

const VS = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FS = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

out vec4 outColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 m = uMouse / uResolution;
  float t = uTime * 0.11;

  vec3 base = vec3(0.929, 0.922, 0.902);
  vec3 orange = vec3(1.0, 0.42, 0.08);
  vec3 purple = vec3(0.545, 0.22, 0.918);
  vec3 pink = vec3(0.98, 0.45, 0.62);

  float blobOrange = smoothstep(0.4, 0.92, 1.0 - length(uv - vec2(0.78, 0.72) - (m - 0.5) * 0.06));
  float blobPurple = smoothstep(0.42, 0.9, 1.0 - length(uv - vec2(0.92, 0.18) + vec2(sin(t) * 0.03, 0.0)));
  float blobPink = smoothstep(0.48, 0.88, 1.0 - length(uv - vec2(0.12, 0.85) + vec2(0.0, cos(t * 1.2) * 0.04)));

  vec3 col = base;
  col = mix(col, mix(base, orange, 0.62), blobOrange * 0.28);
  col = mix(col, mix(base, purple, 0.5), blobPurple * 0.18);
  col = mix(col, mix(base, pink, 0.42), blobPink * 0.12);
  col += noise(uv * 2.4 + t) * 0.012;

  float vignette = smoothstep(1.05, 0.35, length(uv - vec2(0.35, 0.65)));
  col *= mix(0.93, 1.0, vignette);

  outColor = vec4(col, 1.0);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroWebGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.35 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VS);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(program, 'position');
    const uRes = gl.getUniformLocation(program, 'uResolution');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');

    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      };
    };

    const draw = (now: number) => {
      const t = reduced ? 0 : (now - start) / 1000;
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
