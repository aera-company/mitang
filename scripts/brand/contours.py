"""Generate a topographic contour pattern (MITANG IV: isolines) as an SVG
used as a CSS mask. Smooth random field -> marching squares -> chained,
lightly simplified polylines. Usage: python3 scripts/brand/contours.py"""
import numpy as np

W, H = 1600, 1000           # viewBox
NX, NY = 320, 200           # field resolution
rng = np.random.default_rng(2011)  # MITANG since 2011

xs = np.linspace(0, 1, NX); ys = np.linspace(0, H / W, NY)
X, Y = np.meshgrid(xs, ys)
F = np.zeros_like(X)
for _ in range(14):  # a few broad bumps and basins
    cx, cy = rng.uniform(-0.1, 1.1), rng.uniform(-0.1, H / W + 0.1)
    s = rng.uniform(0.08, 0.28); a = rng.choice([-1, 1]) * rng.uniform(0.4, 1.0)
    F += a * np.exp(-((X - cx) ** 2 + (Y - cy) ** 2) / (2 * s * s))
F += 0.18 * np.sin(X * 5.1 + 1.3) * np.cos(Y * 4.3 + 0.4)

levels = np.linspace(F.min(), F.max(), 26)[2:-2]
sx, sy = W / (NX - 1), H / (NY - 1)

def segments(level):
    segs = []
    v = F
    for j in range(NY - 1):
        for i in range(NX - 1):
            a, b, c, d = v[j, i], v[j, i + 1], v[j + 1, i + 1], v[j + 1, i]
            idx = (a > level) | ((b > level) << 1) | ((c > level) << 2) | ((d > level) << 3)
            if idx in (0, 15):
                continue
            def interp(p, q, vp, vq):
                t = (level - vp) / (vq - vp)
                return (p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1]))
            P = [(i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)]
            V = [a, b, c, d]
            e = {0: interp(P[0], P[1], V[0], V[1]), 1: interp(P[1], P[2], V[1], V[2]),
                 2: interp(P[2], P[3], V[2], V[3]), 3: interp(P[3], P[0], V[3], V[0])}
            table = {1: [(3, 0)], 2: [(0, 1)], 3: [(3, 1)], 4: [(1, 2)], 5: [(3, 0), (1, 2)],
                     6: [(0, 2)], 7: [(3, 2)], 8: [(2, 3)], 9: [(0, 2)], 10: [(0, 1), (2, 3)],
                     11: [(1, 2)], 12: [(1, 3)], 13: [(0, 1)], 14: [(3, 0)]}
            for e1, e2 in table[int(idx)]:
                segs.append((e[e1], e[e2]))
    return segs

def chain(segs):
    key = lambda p: (round(p[0], 4), round(p[1], 4))
    ends = {}
    for k, (p, q) in enumerate(segs):
        ends.setdefault(key(p), []).append(k); ends.setdefault(key(q), []).append(k)
    used = [False] * len(segs); lines = []
    for k in range(len(segs)):
        if used[k]:
            continue
        used[k] = True
        line = [segs[k][0], segs[k][1]]
        for direction in (0, 1):
            while True:
                tip = line[-1] if direction == 0 else line[0]
                nxt = None
                for m in ends.get(key(tip), []):
                    if not used[m]:
                        nxt = m; break
                if nxt is None:
                    break
                used[nxt] = True
                p, q = segs[nxt]
                other = q if key(p) == key(tip) else p
                if direction == 0: line.append(other)
                else: line.insert(0, other)
        lines.append(line)
    return lines

paths = []
for lv in levels:
    for line in chain(segments(lv)):
        if len(line) < 6:
            continue
        pts = line[::3] + [line[-1]]
        d = "M" + " L".join(f"{p[0]*sx:.1f} {p[1]*sy:.1f}" for p in pts)
        paths.append(d)

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">'
       f'<g fill="none" stroke="#000" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">'
       + "".join(f'<path d="{d}"/>' for d in paths) + "</g></svg>")
open("public/brand/mitang-contours.svg", "w").write(svg)
print(len(paths), "paths", len(svg) // 1024, "KB")
