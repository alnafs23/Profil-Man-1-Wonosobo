import { useId } from "react";

/** Kurva halus melewati titik-titik (Catmull-Rom -> Bezier). */
function smooth(pts) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function Sparkline({ data, color = "#fff", height = 64, fill = true, dots = false, stretch = true, width = 240, label }) {
  const gid = useId().replace(/:/g, "");
  const n = data.length;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const pad = dots ? 8 : 3;
  const pts = data.map((v, i) => [
    n === 1 ? width / 2 : pad + (i * (width - pad * 2)) / (n - 1),
    height - pad - ((v - min) / (max - min || 1)) * (height - pad * 2),
  ]);
  const linha = smooth(pts);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
      className="block w-full" style={stretch ? { height } : undefined} role="img" aria-label={label}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".55" />
          <stop offset="100%" stopColor={color} stopOpacity=".05" />
        </linearGradient>
      </defs>
      {fill && pts.length > 1 && <path d={`${linha} L${pts[n - 1][0]},${height} L${pts[0][0]},${height} Z`} fill={`url(#${gid})`} />}
      <path d={linha} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      {dots && pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#4799eb" stroke={color} strokeWidth="1.5" />)}
    </svg>
  );
}

export function MiniBars({ data, color = "#fff", height = 64 }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex w-full items-end gap-[3px]" style={{ height }} aria-hidden="true">
      {data.map((v, i) => (
        <span key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${Math.max(6, (v / max) * 100)}%`, background: color, opacity: 0.45 }} />
      ))}
    </div>
  );
}

function ticks(max) {
  const kasar = max / 4 || 1;
  const p = Math.pow(10, Math.floor(Math.log10(kasar)));
  const langkah = [1, 2, 2.5, 5, 10].map((m) => m * p).find((s) => s >= kasar);
  return Array.from({ length: 5 }, (_, i) => i * langkah);
}

/** Grafik batang berpasangan (dua seri per label), gaya batang bulat. */
export function BarPairs({ labels, a, b, colors = ["#3b8cf5", "var(--a-bar2)"], names = [], height = 230 }) {
  const W = 640;
  const L = 44;
  const B = 26;
  const T = 10;
  const t = ticks(Math.max(...a, ...b, 1));
  const top = t[t.length - 1];
  const H = height;
  const area = H - B - T;
  const y = (v) => T + area - (v / top) * area;
  const step = (W - L - 8) / labels.length;
  const bw = Math.min(8, step / 3.2);
  const teks = "var(--a-muted)";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img"
      aria-label={`Grafik batang: ${names[0] || "seri 1"} dan ${names[1] || "seri 2"} per bulan`}>
      {t.map((v) => (
        <g key={v}>
          <line x1={L} x2={W - 4} y1={y(v)} y2={y(v)} stroke="var(--a-line)" strokeWidth="1" strokeDasharray={v === 0 ? "" : "3 4"} />
          <text x={L - 8} y={y(v) + 3.5} textAnchor="end" fontSize="10" fill={teks}>{new Intl.NumberFormat("id-ID", { notation: "compact" }).format(v)}</text>
        </g>
      ))}
      {labels.map((lb, i) => {
        const cx = L + step * i + step / 2;
        return (
          <g key={lb}>
            {[a[i], b[i]].map((v, k) => {
              const h = Math.max(v > 0 ? 3 : 0, (v / top) * area);
              return h > 0 ? (
                <rect key={k} x={cx + (k === 0 ? -bw - 1.5 : 1.5)} y={T + area - h} width={bw} height={h} rx={bw / 2} fill={colors[k]} />
              ) : null;
            })}
            <text x={cx} y={H - 8} textAnchor="middle" fontSize="10" fill={teks}>{lb}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function Progress({ value, color = "var(--a-primary)", height = 3, className = "" }) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-ad-line/70 ${className}`} style={{ height }} role="presentation">
      <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }} />
    </div>
  );
}
