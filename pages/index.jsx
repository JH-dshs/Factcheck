import Head from "next/head";
import { useState, useEffect, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');`;

const LOGO_IMG = "data:image/png;base64,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";

const VERDICTS = [
  { label: "사실",        eng: "TRUE",          color: "#00F5A0", glow: "rgba(0,245,160,0.25)",   score: 5, icon: "✓" },
  { label: "대체로 사실", eng: "MOSTLY TRUE",   color: "#7BF1A8", glow: "rgba(123,241,168,0.25)", score: 4, icon: "◎" },
  { label: "절반의 진실", eng: "HALF TRUE",     color: "#FFD166", glow: "rgba(255,209,102,0.25)", score: 3, icon: "◑" },
  { label: "대체로 거짓", eng: "MOSTLY FALSE",  color: "#FF9A3C", glow: "rgba(255,154,60,0.25)",  score: 2, icon: "◐" },
  { label: "거짓",        eng: "FALSE",          color: "#FF3B6B", glow: "rgba(255,59,107,0.25)",  score: 1, icon: "✗" },
  { label: "판단불가",    eng: "UNVERIFIABLE",   color: "#8B8FA8", glow: "rgba(139,143,168,0.25)", score: 0, icon: "?" },
];

const css = `
  ${FONT}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

  @keyframes spin     { to { transform: rotate(360deg); } }
  @keyframes fadeUp   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes glow-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
  @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }

  .btn-primary {
    background: linear-gradient(90deg,#6366F1,#8B5CF6,#6366F1);
    background-size: 200% auto;
    animation: shimmer 2.4s linear infinite;
    color: #fff; cursor: pointer;
  }
  .btn-primary:disabled {
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.2);
    cursor: not-allowed; animation: none;
  }
  .hcard { transition: transform .18s ease; cursor: pointer; }
  .hcard:hover { transform: translateY(-2px); }
  .close-btn:hover { background: rgba(255,255,255,0.1) !important; }
`;

/* ── Radial gauge ── */
function Gauge({ verdict, size = 72 }) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 80); return () => clearTimeout(t); }, []);
  const r = 28, circ = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle cx="36" cy="36" r={r} fill="none"
          stroke={verdict.color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={on ? circ - (verdict.score / 5) * circ : circ}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)", filter: `drop-shadow(0 0 5px ${verdict.color})` }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
        <span style={{ fontSize: 16, color: verdict.color, lineHeight: 1 }}>{verdict.icon}</span>
        <span style={{ fontFamily: "Syne", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: .5 }}>
          {verdict.score === 0 ? "—" : `${verdict.score}/5`}
        </span>
      </div>
    </div>
  );
}

/* ── Loading steps indicator ── */
function LoadingSteps({ step }) {
  const steps = ["정보 수집 중...", "교차 검증 중...", "정밀 판정 중..."];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "16px 0" }}>
      {steps.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: done || active ? 1 : 0.25, transition: "opacity .3s ease" }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              background: done ? "rgba(0,245,160,0.15)" : active ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
              border: `1.5px solid ${done ? "#00F5A0" : active ? "#6366F1" : "rgba(255,255,255,0.1)"}`,
            }}>
              {done
                ? <span style={{ fontSize: 9, color: "#00F5A0" }}>✓</span>
                : active
                  ? <div style={{ width: 8, height: 8, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", borderTopColor: "#6366F1", animation: "spin .7s linear infinite" }} />
                  : <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
              }
            </div>
            <span style={{ fontFamily: "DM Sans", fontSize: 12, color: done ? "#00F5A0" : active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>
              {s}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── History card ── */
function HistoryCard({ item, onOpen, idx }) {
  return (
    <div className="hcard" onClick={() => onOpen(item)}
      style={{
        display: "flex", gap: 14, alignItems: "center",
        padding: "16px 18px", borderRadius: 14, marginBottom: 8,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderLeft: `3px solid ${item.verdict.color}`,
        animation: `fadeUp .35s ease ${idx * 50}ms both`,
      }}
    >
      <Gauge verdict={item.verdict} size={56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "DM Sans", fontSize: 13.5, color: "rgba(255,255,255,0.8)",
          lineHeight: 1.5, fontWeight: 500, marginBottom: 7,
          overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>"{item.text}"</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "Syne", fontSize: 10, fontWeight: 700, letterSpacing: 1, color: item.verdict.color, textTransform: "uppercase" }}>
            {item.verdict.eng}
          </span>
          <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 10 }}>·</span>
          <span style={{ fontFamily: "DM Sans", fontSize: 11, color: "rgba(255,255,255,0.22)" }}>{item.date}</span>
          {item.searched && (
            <>
              <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 10 }}>·</span>
              <span style={{ fontFamily: "DM Sans", fontSize: 10, color: "rgba(99,102,241,0.7)" }}>✦ Google 검색 검증</span>
            </>
          )}
        </div>
      </div>
      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.15)", flexShrink: 0 }}>›</span>
    </div>
  );
}

/* ── Detail modal ── */
function Modal({ item, onClose }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 30); return () => clearTimeout(t); }, []);
  const close = () => { setVis(false); setTimeout(onClose, 220); };

  return (
    <div onClick={close} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      opacity: vis ? 1 : 0, transition: "opacity .22s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 500, borderRadius: 22, overflow: "hidden",
        background: "linear-gradient(145deg,#111120,#0d0d1a)",
        border: `1px solid ${item.verdict.color}35`,
        boxShadow: `0 0 50px ${item.verdict.glow}, 0 30px 60px rgba(0,0,0,0.55)`,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: "transform .22s cubic-bezier(.34,1.4,.64,1)",
        maxHeight: "88vh", overflowY: "auto",
      }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "Syne", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>팩트체크 결과</span>
            {item.searched && <span style={{ fontFamily: "DM Sans", fontSize: 10, color: "rgba(99,102,241,0.8)", padding: "2px 8px", borderRadius: 999, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>✦ Google 검색 검증</span>}
          </div>
          <button className="close-btn" onClick={close} style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 12 }}>✕</button>
        </div>

        <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontFamily: "DM Sans", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, fontStyle: "italic" }}>"{item.text}"</p>
        </div>

        <div style={{ padding: "20px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 20, alignItems: "center" }}>
          <Gauge verdict={item.verdict} size={88} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Syne", fontSize: 26, fontWeight: 800, color: item.verdict.color, textTransform: "uppercase", lineHeight: 1, marginBottom: 4, textShadow: `0 0 20px ${item.verdict.glow}` }}>
              {item.verdict.label}
            </div>
            <div style={{ fontFamily: "Syne", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 2, marginBottom: 12 }}>{item.verdict.eng}</div>
            <div style={{ display: "flex", gap: 4 }}>
              {[1,2,3,4,5].map(n => (
                <div key={n} style={{ flex: 1, height: 5, borderRadius: 3,
                  background: n <= item.verdict.score ? item.verdict.color : "rgba(255,255,255,0.08)",
                  boxShadow: n <= item.verdict.score ? `0 0 6px ${item.verdict.color}` : "none",
                  transition: `background .3s ease ${n*80}ms`,
                }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "18px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontFamily: "Syne", fontSize: 9, fontWeight: 700, letterSpacing: 2.5, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: 10 }}>AI 분석</div>
          <p style={{ fontFamily: "DM Sans", fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>{item.summary}</p>
        </div>

        {item.sources?.length > 0 && (
          <div style={{ padding: "16px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontFamily: "Syne", fontSize: 9, fontWeight: 700, letterSpacing: 2.5, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: 10 }}>참고 출처</div>
            {item.sources.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6, fontFamily: "DM Sans", fontSize: 12.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                <span style={{ color: item.verdict.color, fontSize: 9, marginTop: 3, flexShrink: 0 }}>◈</span>{s}
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: "14px 22px" }}>
          <p style={{ fontFamily: "DM Sans", fontSize: 11, color: "rgba(255,255,255,0.2)", lineHeight: 1.7 }}>
            ⚠ 멀티소스 AI 교차검증 결과입니다. 확실하지 않은 사안은 판독불가로 처리됩니다. 중요한 사안은 반드시 공신력 있는 출처를 직접 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════ MAIN ══════════ */
export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(null);
  const MINJU_IMG = "data:image/webp;base64,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";

  const [photo, setPhoto] = useState(null);
  const [removingBg, setRemovingBg] = useState(false);

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show original first
    const originalUrl = await new Promise(res => {
      const reader = new FileReader();
      reader.onload = ev => res(ev.target.result);
      reader.readAsDataURL(file);
    });
    setPhoto(originalUrl);
    setRemovingBg(true);

    try {
      const { removeBackground } = await import("https://esm.sh/@imgly/background-removal@1.4.5");
      const blob = await removeBackground(file, {
        publicPath: "https://esm.sh/@imgly/background-removal@1.4.5/dist/",
      });
      const url = URL.createObjectURL(blob);
      setPhoto(url);
    } catch (err) {
      console.error("누끼 실패:", err);
      // keep original on failure
    } finally {
      setRemovingBg(false);
    }
  };

  useEffect(() => {
    const run = async () => {
      setRemovingBg(true);
      setPhoto(MINJU_IMG);
      try {
        const res = await fetch(MINJU_IMG);
        const blob = await res.blob();
        const { removeBackground } = await import("https://esm.sh/@imgly/background-removal@1.4.5");
        const out = await removeBackground(blob, { publicPath: "https://esm.sh/@imgly/background-removal@1.4.5/dist/" });
        setPhoto(URL.createObjectURL(out));
      } catch (e) {
        console.error(e);
        setPhoto(MINJU_IMG);
      } finally {
        setRemovingBg(false);
      }
    };
    run();
  }, []);

  const handleCheck = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setLoadStep(0);

    try {
      setLoadStep(0);
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim() }),
      });

      setLoadStep(1);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "오류가 발생했습니다.");

      setLoadStep(2);
      await new Promise(r => setTimeout(r, 500));

      const verdict = VERDICTS.find(v => v.label === data.verdict) || VERDICTS[5];
      const item = {
        id: Date.now(),
        text: input.trim(),
        verdict,
        searched: data.searched,
        date: new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, ".").replace(/\.$/, ""),
        summary: data.summary,
        sources: data.sources || [],
      };

      setHistory(prev => [item, ...prev]);
      setModal(item);
      setInput("");
    } catch (e) {
      console.error(e);
      alert(e.message || "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
      setLoadStep(0);
    }
  };

  return (
    <>
      <Head>
        <title>민주팩트체크</title>
        <meta name="description" content="최신 AI 기술로 다각도 교차 검증, 확실한 것만 판정합니다" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: "#07070F", color: "#fff", fontFamily: "DM Sans, sans-serif" }}>

        {/* ambient */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -200, left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: -100, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,160,0.04) 0%, transparent 65%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 620, margin: "0 auto", padding: "0 18px 80px" }}>

          {/* Header */}
          <div style={{ paddingTop: 52, paddingBottom: 40, textAlign: "center" }}>

            {/* Photo + Title row */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <div style={{ position: "relative", width: 110, height: 110 }}>
                {/* checkerboard bg for transparency */}
                <div style={{
                  width: 110, height: 110, borderRadius: "50%", overflow: "hidden",
                  border: photo ? "2px solid rgba(99,102,241,0.4)" : "2px dashed rgba(255,255,255,0.2)",
                  backgroundImage: "linear-gradient(45deg,#1a1a1a 25%,transparent 25%),linear-gradient(-45deg,#1a1a1a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1a1a1a 75%),linear-gradient(-45deg,transparent 75%,#1a1a1a 75%)",
                  backgroundSize: "10px 10px",
                  backgroundPosition: "0 0,0 5px,5px -5px,-5px 0",
                  boxShadow: photo && !removingBg ? "0 0 0 4px rgba(99,102,241,0.15), 0 12px 36px rgba(99,102,241,0.25)" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all .3s ease",
                }}>
                  {photo && <img src={photo} alt="민주" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                {removingBg && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    background: "rgba(7,7,15,0.7)", backdropFilter: "blur(3px)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
                  }}>
                    <div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.15)", borderTopColor: "#A5B4FC", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                    <span style={{ fontFamily: "DM Sans", fontSize: 9, color: "rgba(255,255,255,0.5)" }}>누끼 중...</span>
                  </div>
                )}
                {/* click to change photo */}
                <label style={{
                  position: "absolute", inset: 0, borderRadius: "50%", cursor: "pointer",
                  display: "flex", alignItems: "flex-end", justifyContent: "center",
                  paddingBottom: 8, opacity: 0, transition: "opacity .2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}
                >
                  <span style={{ fontFamily: "DM Sans", fontSize: 9, color: "#fff", background: "rgba(0,0,0,0.6)", padding: "2px 6px", borderRadius: 4 }}>변경</span>
                  <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
                </label>
              </div>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: "rgba(99,102,241,0.09)", border: "1px solid rgba(99,102,241,0.18)", marginBottom: 18 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00F5A0", boxShadow: "0 0 8px #00F5A0", animation: "glow-pulse 1.8s ease-in-out infinite" }} />
              <span style={{ fontFamily: "DM Sans", fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: 1.5, textTransform: "uppercase" }}>멀티소스 크로스체킹 · AI 심층 검증</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <img src={LOGO_IMG} alt="" style={{
                width: 52, height: 52, borderRadius: "50%",
                objectFit: "cover", objectPosition: "center top",
                border: "2px solid rgba(99,102,241,0.45)",
                boxShadow: "0 0 16px rgba(99,102,241,0.3)",
              }} />
              <h1 style={{ fontFamily: "Syne", fontSize: 36, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, margin: 0 }}>
                <span style={{ color: "#fff" }}>민주</span><span style={{ color: "#6366F1", textShadow: "0 0 28px rgba(99,102,241,0.45)" }}>팩트체크</span>
              </h1>
            </div>
            <p style={{ fontFamily: "DM Sans", fontSize: 14, color: "rgba(255,255,255,0.28)", marginTop: 8 }}>
              최신 AI 기술로 다각도 교차 검증, 확실한 것만 판정합니다
            </p>
          </div>

          {/* Input Card */}
          <div style={{
            borderRadius: 18, overflow: "hidden", marginBottom: 28,
            background: "rgba(255,255,255,0.025)", border: "1.5px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
          }}>
            <div style={{ padding: "18px 18px 0" }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) handleCheck(); }}
                disabled={loading}
                placeholder={"검증할 뉴스 내용이나 주장을 입력하세요..."}
                rows={4}
                style={{
                  width: "100%", resize: "none", background: "transparent", border: "none", outline: "none",
                  fontFamily: "DM Sans", fontSize: 14, color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.75, caretColor: "#6366F1",
                  opacity: loading ? 0.4 : 1,
                }}
              />
            </div>

            {/* Loading steps shown inside card */}
            {loading && (
              <div style={{ padding: "0 18px" }}>
                <LoadingSteps step={loadStep} />
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px 16px" }}>
              <span style={{ fontFamily: "DM Sans", fontSize: 11, color: "rgba(255,255,255,0.18)" }}>Ctrl+Enter</span>
              <button
                onClick={handleCheck}
                disabled={!input.trim() || loading}
                className={input.trim() && !loading ? "btn-primary" : ""}
                style={{
                  padding: "9px 22px", borderRadius: 10, border: "none",
                  fontFamily: "Syne", fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
                  display: "flex", alignItems: "center", gap: 7,
                }}
              >
                팩트체크 →
              </button>
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontFamily: "Syne", fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}>
                  검증 히스토리 · {history.length}건
                </span>
                <button onClick={() => setHistory([])}
                  style={{ fontFamily: "DM Sans", fontSize: 11, color: "rgba(255,255,255,0.2)", background: "none", border: "none", cursor: "pointer" }}>
                  초기화
                </button>
              </div>
              {history.map((item, i) => <HistoryCard key={item.id} item={item} onOpen={setModal} idx={i} />)}
            </div>
          )}

          {history.length === 0 && !loading && (
            <div style={{ textAlign: "center", padding: "50px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 12, opacity: .3 }}>🔍</div>
              <p style={{ fontFamily: "DM Sans", fontSize: 13, color: "rgba(255,255,255,0.18)", lineHeight: 1.7 }}>
                주장을 입력하면 최신 AI 기술로<br />다각도 교차 검증을 수행합니다
              </p>
            </div>
          )}
        </div>

        {modal && <Modal item={modal} onClose={() => setModal(null)} />}
      </div>
    </>
  );
   }
