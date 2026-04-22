import React, { useState, useEffect, useCallback, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  remove,
} from "firebase/database";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAKYDX6aZHDQZ4k4xV5VyuSuTWLYkfwUNI",
  authDomain: "courses-3f9d8.firebaseapp.com",
  databaseURL:
    "https://courses-3f9d8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "courses-3f9d8",
  storageBucket: "courses-3f9d8.firebasestorage.app",
  messagingSenderId: "254378235562",
  appId: "1:254378235562:web:6135bc007011806f1fe2d3",
};

const fbApp = initializeApp(FIREBASE_CONFIG);
const db = getDatabase(fbApp);

// ─── Theme ────────────────────────────────────────────────────
const LIGHT = {
  bg: "#f9f8f6",
  card: "#ffffff",
  card2: "#f4f3f0",
  text: "#18181b",
  sub: "#71717a",
  border: "#e4e4e7",
  accent: "#16a34a",
  accentBg: "#f0fdf4",
  danger: "#dc2626",
  dangerBg: "#fef2f2",
  warn: "#d97706",
  warnBg: "#fffbeb",
  shadow: "0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)",
};
const DARK = {
  bg: "#0c0c0e",
  card: "#17171a",
  card2: "#222226",
  text: "#fafafa",
  sub: "#71717a",
  border: "#27272a",
  accent: "#22c55e",
  accentBg: "#052e16",
  danger: "#ef4444",
  dangerBg: "#2d0f0f",
  warn: "#f59e0b",
  warnBg: "#1c1407",
  shadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
};

// ─── Icons ────────────────────────────────────────────────────
const PATHS = {
  home: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z M9 21V12h6v9",
  cart: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0",
  check: "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  calendar:
    "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  users:
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
  trash:
    "M3 6h18 M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6",
  more: "M12 5a1 1 0 110-2 1 1 0 010 2z M12 13a1 1 0 110-2 1 1 0 010 2z M12 21a1 1 0 110-2 1 1 0 010 2z",
  x: "M18 6L6 18 M6 6l12 12",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  arrowRight: "M5 12h14 M12 5l7 7-7 7",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 3a4 4 0 100 8 4 4 0 000-8z",
  note: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  heart:
    "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  clock: "M12 2a10 10 0 100 20A10 10 0 0012 2z M12 6v6l4 2",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  pill: "M9 3H4a1 1 0 00-1 1v4a1 1 0 001 1h5 M15 3h5a1 1 0 011 1v4a1 1 0 01-1 1h-5 M9 9v6 M15 9v6 M9 15H4a1 1 0 00-1 1v4a1 1 0 001 1h5 M15 15h5a1 1 0 011 1v4a1 1 0 01-1 1h-5",
  baby: "M12 2a5 5 0 015 5v1a5 5 0 01-10 0V7a5 5 0 015-5z M9 11.5S9 14 12 14s3-2.5 3-2.5 M9.5 9h.01 M14.5 9h.01 M3 21s1-4 4-5 M21 21s-1-4-4-5",
  repeat:
    "M17 1l4 4-4 4 M3 11V9a4 4 0 014-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 01-4 4H3",
  sun: "M12 17a5 5 0 100-10 5 5 0 000 10z M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42",
  wallet:
    "M21 12V7H5a2 2 0 010-4h14v4 M3 5v14a2 2 0 002 2h16v-5 M18 12a2 2 0 000 4h3v-4h-3z",
  trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  alertCircle: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
};

function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.75 }) {
  const d = PATHS[name] || "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      {d.split(" M").map((seg, i) => (
        <path key={i} d={(i === 0 ? "" : "M") + seg} />
      ))}
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────
const CATEGORIES = [
  { id: "frigo", label: "Frigo" },
  { id: "congelo", label: "Congélo" },
  { id: "placard", label: "Placard" },
  { id: "hygiene", label: "Hygiène" },
  { id: "fruits", label: "Fruits & Légumes" },
];
const URGENCY = [
  { id: "urgent", label: "Urgent", color: "#dc2626" },
  { id: "bientot", label: "Bientôt", color: "#d97706" },
  { id: "pasPresse", label: "Pas pressé", color: "#16a34a" },
];
const TACHE_CATS = [
  { id: "menage", label: "Ménage" },
  { id: "cuisine", label: "Cuisine" },
  { id: "enfants", label: "Enfants" },
  { id: "admin", label: "Admin" },
  { id: "exterieur", label: "Extérieur" },
  { id: "autre", label: "Autre" },
];
const MOIS = [
  "Janv",
  "Févr",
  "Mars",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sept",
  "Oct",
  "Nov",
  "Déc",
];
const MOIS_LONG = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
const HIST_DEFAULT = [
  "Lait",
  "Oeufs",
  "Pâtes",
  "Beurre",
  "Fromage",
  "Poulet",
  "Tomates",
  "Riz",
  "Savon",
  "Shampooing",
  "Carottes",
  "Yaourts",
  "Pain",
  "Farine",
  "Huile",
  "Sel",
  "Sucre",
  "Café",
];
const TABS = [
  { id: "home", label: "Accueil", icon: "home" },
  { id: "courses", label: "Courses", icon: "cart" },
  { id: "taches", label: "Tâches", icon: "checkCircle" },
  { id: "agenda", label: "Agenda", icon: "calendar" },
  { id: "famille", label: "Famille", icon: "users" },
  { id: "finances", label: "Finances", icon: "wallet" },
];

// ─── Utils ────────────────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return "";
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (min < 2) return "à l'instant";
  if (min < 60) return `${min}min`;
  if (h < 24) return `${h}h`;
  if (d < 7) return `${d}j`;
  return new Date(ts).toLocaleDateString("fr");
}
function semaineGrossesse(dpa) {
  if (!dpa) return null;
  const debut = new Date(dpa);
  debut.setDate(debut.getDate() - 280);
  return Math.max(
    0,
    Math.min(
      42,
      Math.floor((Date.now() - debut.getTime()) / (7 * 24 * 3600000))
    )
  );
}
function ageEnfant(ddn) {
  if (!ddn) return null;
  const n = new Date(ddn),
    now = new Date();
  const m =
    (now.getFullYear() - n.getFullYear()) * 12 + now.getMonth() - n.getMonth();
  if (m < 24) return `${m} mois`;
  const a = Math.floor(m / 12),
    mo = m % 12;
  return mo > 0 ? `${a} ans ${mo} mois` : `${a} ans`;
}
function isToday(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr),
    now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}
function isThisWeek(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr),
    now = new Date();
  const diff = d - now;
  return diff >= 0 && diff < 7 * 24 * 3600000;
}
function isPast(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date() && !isToday(dateStr);
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getDate()} ${MOIS[d.getMonth()]}`;
}

function useDarkMode() {
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const h = (e) => setDark(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return dark;
}

function useFirebase(path, def) {
  const [data, setData] = useState(def);
  useEffect(() => {
    const r = ref(db, path);
    const unsub = onValue(r, (snap) => setData(snap.val() ?? def));
    return () => unsub();
  }, [path]);
  const setter = useCallback((val) => set(ref(db, path), val), [path]);
  return [data, setter];
}

// ─── Global CSS ───────────────────────────────────────────────
function GlobalCSS({ th }) {
  return (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display:ital@0;1&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    html, body, #root { height: 100%; }
    body { font-family: 'DM Sans', sans-serif; background: ${th.bg}; color: ${th.text}; -webkit-font-smoothing: antialiased; }
    input, textarea, select, button { font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { display: none; }
    .t { transition: all 0.18s cubic-bezier(0.4,0,0.2,1); }
    .btn { cursor: pointer; border: none; background: none; }
    .btn:active { opacity: 0.6; transform: scale(0.97); }
    @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .up { animation: slideUp 0.22s ease both; }
    .pulse { animation: pulse 2s infinite; }
    input:focus, textarea:focus { outline: none; border-color: ${th.accent} !important; box-shadow: 0 0 0 3px ${th.accent}22; }
    input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.4; }
    .header-bar { transition: transform 0.3s ease, opacity 0.3s ease; }
    .header-bar.hidden { transform: translateY(-100%); opacity: 0; }
  `}</style>
  );
}

// ─── Notifications ────────────────────────────────────────────
function useNotifications(taches, agenda, finances) {
  const [notifPerm, setNotifPerm] = useState("default");
  const [notifs, setNotifs] = useState([]);
  const shownRef = useRef(new Set());

  async function requestPerm() {
    try {
      if (!("Notification" in window)) return;
      const perm = await Notification.requestPermission();
      setNotifPerm(perm);
    } catch (e) {
      return;
    }
  }

  useEffect(() => {
    const checks = [];
    const now = new Date();

    // Tâches en retard ou du jour
    Object.values(taches || {}).forEach((t) => {
      if (t.done || !t.datePrevu) return;
      const d = new Date(t.datePrevu);
      if (
        d <= now &&
        !shownRef.current.has("t_" + t.datePrevu + t.description)
      ) {
        checks.push({
          id: "t_" + t.datePrevu + t.description,
          type: "tache",
          title: isPast(t.datePrevu) ? "Tâche en retard" : "Tâche aujourd'hui",
          body: t.description,
          level: isPast(t.datePrevu) ? "danger" : "warn",
        });
      }
    });

    // Factures urgentes
    Object.values(finances?.factures || {}).forEach((f) => {
      if (f.payee || !f.echeance) return;
      const diff = new Date(f.echeance) - now;
      if (diff < 0 && !shownRef.current.has("f_late_" + f.echeance + f.titre)) {
        checks.push({
          id: "f_late_" + f.echeance + f.titre,
          type: "facture",
          title: "Facture en retard",
          body: `${f.titre} — ${parseFloat(f.montant).toFixed(2)} CHF`,
          level: "danger",
        });
      } else if (
        diff >= 0 &&
        diff < 3 * 24 * 3600000 &&
        !shownRef.current.has("f_urgent_" + f.echeance + f.titre)
      ) {
        checks.push({
          id: "f_urgent_" + f.echeance + f.titre,
          type: "facture",
          title: "Facture dans 3 jours",
          body: `${f.titre} — ${parseFloat(f.montant).toFixed(2)} CHF`,
          level: "warn",
        });
      }
    });

    // RDV dans les 24h
    Object.values(agenda || {}).forEach((a) => {
      if (!a.date) return;
      const diff = new Date(a.date) - now;
      if (
        diff >= 0 &&
        diff < 24 * 3600000 &&
        !shownRef.current.has("a_" + a.date + a.titre)
      ) {
        checks.push({
          id: "a_" + a.date + a.titre,
          type: "agenda",
          title: "RDV demain",
          body: a.titre + (a.heure ? " à " + a.heure : ""),
          level: "warn",
        });
      }
    });

    if (checks.length === 0) return;
    checks.forEach((n) => shownRef.current.add(n.id));
    setNotifs((prev) => [...prev, ...checks].slice(-10));

    // Push notification si permission accordée
    try {
      if (notifPerm === "granted" && "Notification" in window) {
        checks.forEach((n) => {
          try {
            new Notification(n.title, { body: n.body, icon: "/icon.png" });
          } catch (e) {}
        });
      }
    } catch (e) {}
  }, [taches, agenda, finances?.factures, notifPerm]);

  function dismiss(id) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }
  function clearAll() {
    setNotifs([]);
  }

  return { notifs, notifPerm, requestPerm, dismiss, clearAll };
}

function NotifBadge({ count, th }) {
  if (!count) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: -4,
        right: -4,
        background: "#dc2626",
        borderRadius: 99,
        minWidth: 16,
        height: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 700,
        color: "#fff",
        padding: "0 3px",
      }}
    >
      {count > 9 ? "9+" : count}
    </div>
  );
}

function NotifPanel({
  th,
  dark,
  notifs,
  notifPerm,
  requestPerm,
  dismiss,
  clearAll,
}) {
  const [open, setOpen] = useState(false);
  const COLORS = { danger: "#dc2626", warn: "#d97706", info: "#16a34a" };

  return (
    <>
      <div style={{ position: "relative" }}>
        <button
          className="btn t"
          onClick={() => setOpen((o) => !o)}
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 12,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <NotifBadge count={notifs.length} th={th} />
        </button>
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 100,
              left: 16,
              right: 16,
              background: th.card,
              borderRadius: 20,
              padding: "20px 18px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 20,
                  color: th.text,
                }}
              >
                Notifications
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {notifPerm !== "granted" && (
                  <button
                    className="btn t"
                    onClick={requestPerm}
                    style={{
                      fontSize: 12,
                      color: th.accent,
                      fontWeight: 600,
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: `1px solid ${th.accent}30`,
                      background: th.accentBg,
                    }}
                  >
                    Activer
                  </button>
                )}
                {notifs.length > 0 && (
                  <button
                    className="btn"
                    onClick={clearAll}
                    style={{ fontSize: 13, color: th.sub }}
                  >
                    Tout effacer
                  </button>
                )}
              </div>
            </div>
            {notifPerm === "default" && (
              <div
                style={{
                  background: th.warnBg,
                  borderRadius: 12,
                  padding: "12px 14px",
                  marginBottom: 14,
                  fontSize: 13,
                  color: th.warn,
                }}
              >
                Activez les notifications pour être alerté même quand l'app est
                fermée.
              </div>
            )}
            {!notifs.length && (
              <div
                style={{
                  textAlign: "center",
                  padding: "24px 0",
                  fontSize: 15,
                  color: th.sub,
                }}
              >
                Aucune notification
              </div>
            )}
            {notifs.map((n) => (
              <div
                key={n.id}
                style={{
                  background: th.card2,
                  borderRadius: 14,
                  padding: "13px 14px",
                  marginBottom: 8,
                  borderLeft: `3px solid ${COLORS[n.level] || th.accent}`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: COLORS[n.level] || th.text,
                      marginBottom: 3,
                    }}
                  >
                    {n.title}
                  </div>
                  <div style={{ fontSize: 13, color: th.sub }}>{n.body}</div>
                </div>
                <button
                  className="btn"
                  onClick={() => dismiss(n.id)}
                  style={{ color: th.sub, padding: 2 }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── App Root ─────────────────────────────────────────────────
export default function App() {
  const dark = useDarkMode();
  const th = dark ? DARK : LIGHT;
  const [profil, setProfil] = useState(
    () => localStorage.getItem("foyer_profil") || null
  );
  const [tab, setTab] = useState("home");

  const [stock, setStock] = useFirebase("nfc/stock", {});
  const [courses, setCourses] = useFirebase("nfc/courses", {});
  const [budget, setBudget] = useFirebase("nfc/budget", {
    mensuel: 800,
    depense: 0,
    mois: new Date().getMonth(),
    historique: [],
  });
  const [historique, setHistorique] = useFirebase(
    "nfc/historique",
    HIST_DEFAULT
  );
  const [taches, setTaches] = useFirebase("nfc/taches", {});
  const [agenda, setAgenda] = useFirebase("nfc/agenda", {});
  const [famille, setFamille] = useFirebase("nfc/famille", {
    enfants: {},
    grossesse: {},
    grossesseActive: false,
  });
  const [medicaments, setMedicaments] = useFirebase("nfc/medicaments", {});
  const [notes, setNotes] = useFirebase("nfc/notes", "");
  const [finances, setFinances] = useFirebase("nfc/finances", {
    salaires: {},
    factures: {},
  });
  const [depenses, setDepenses] = useFirebase("nfc/depenses", {});

  const { notifs, notifPerm, requestPerm, dismiss, clearAll } =
    useNotifications(taches, agenda, finances);

  // Présence Firebase
  useEffect(() => {
    if (!profil) return;
    set(ref(db, `nfc/presence/${profil}`), Date.now());
    const iv = setInterval(
      () => set(ref(db, `nfc/presence/${profil}`), Date.now()),
      30000
    );
    return () => clearInterval(iv);
  }, [profil]);

  // Reset budget si nouveau mois
  useEffect(() => {
    if (!budget) return;
    const now = new Date().getMonth();
    if (budget.mois !== undefined && budget.mois !== now) {
      const hist = [
        ...(budget.historique || []),
        {
          mois: budget.mois,
          annee: new Date().getFullYear(),
          depense: budget.depense,
        },
      ].slice(-6);
      setBudget({ ...budget, depense: 0, mois: now, historique: hist });
    }
  }, [budget?.mois]);

  if (!profil)
    return (
      <div>
        <GlobalCSS th={th} />
        <ProfilScreen
          th={th}
          dark={dark}
          onSelect={(p) => {
            setProfil(p);
            localStorage.setItem("foyer_profil", p);
          }}
        />
      </div>
    );

  const shared = {
    th,
    dark,
    profil,
    stock,
    setStock,
    courses,
    setCourses,
    budget,
    setBudget,
    historique,
    setHistorique,
    taches,
    setTaches,
    agenda,
    setAgenda,
    famille,
    setFamille,
    medicaments,
    setMedicaments,
    notes,
    setNotes,
    finances,
    setFinances,
    depenses,
    setDepenses,
  };

  return (
    <div style={{ minHeight: "100vh", background: th.bg, paddingBottom: 110 }}>
      <GlobalCSS th={th} />

      {/* Header */}
      <div
        style={{
          background: th.text,
          padding: "52px 20px 18px",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 26,
                color: dark ? "#0c0c0e" : "#fafafa",
                letterSpacing: -0.5,
              }}
            >
              Home
            </div>
            <div
              style={{
                fontSize: 13,
                color: dark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)",
                marginTop: 1,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#22c55e",
                  marginRight: 6,
                  verticalAlign: "middle",
                }}
              />
              Synchronisé
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <NotifPanel
              th={th}
              dark={dark}
              notifs={notifs}
              notifPerm={notifPerm}
              requestPerm={requestPerm}
              dismiss={dismiss}
              clearAll={clearAll}
            />
            <button
              className="btn t"
              onClick={() => {
                setProfil(null);
                localStorage.removeItem("foyer_profil");
              }}
              style={{
                background: dark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "9px 14px",
                color: dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon
                name="user"
                size={15}
                color={dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"}
              />
              {profil === "abdullah" ? "Abdullah" : "Pranvera"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 18px 0" }}>
        {tab === "home" && <HomeTab {...shared} setTab={setTab} />}
        {tab === "courses" && <CoursesTab {...shared} />}
        {tab === "taches" && <TachesTab {...shared} />}
        {tab === "agenda" && <AgendaTab {...shared} />}
        {tab === "famille" && <FamilleTab {...shared} />}
        {tab === "finances" && <FinancesTab {...shared} />}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: th.card,
          borderTop: `1px solid ${th.border}`,
          display: "flex",
          paddingBottom: 20,
          paddingTop: 8,
          zIndex: 50,
          overflowX: "auto",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            className="btn t"
            onClick={() => setTab(t.id)}
            style={{
              flex: "1 0 0",
              minWidth: 52,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              color: tab === t.id ? th.accent : th.sub,
              padding: "0 4px",
            }}
          >
            <Icon
              name={t.icon}
              size={20}
              color={tab === t.id ? th.accent : th.sub}
              strokeWidth={tab === t.id ? 2.2 : 1.6}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: tab === t.id ? 700 : 500,
                letterSpacing: 0.1,
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────
function HomeTab({
  th,
  dark,
  profil,
  budget,
  courses,
  taches,
  agenda,
  famille,
  medicaments,
  finances,
  setTab,
}) {
  const coursesArr = Object.values(courses || {});
  const urgents = coursesArr.filter((c) => c.urgency === "urgent").length;
  const pct = Math.min(
    100,
    Math.round(((budget?.depense || 0) / (budget?.mensuel || 800)) * 100)
  );
  const tachesAujourdhui = Object.values(taches || {}).filter(
    (t) => t.datePrevu && isToday(t.datePrevu) && !t.done
  );
  const tachesRetard = Object.values(taches || {}).filter(
    (t) => t.datePrevu && isPast(t.datePrevu) && !t.done
  );
  const tachesRecentes = Object.values(taches || {})
    .filter((t) => t.done)
    .sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0))
    .slice(0, 3);
  const agendaProchain = Object.entries(agenda || {})
    .map(([id, v]) => ({ id, ...v }))
    .filter((a) => a.date && new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 2);
  const enfants = Object.values(famille?.enfants || {});
  const sw = semaineGrossesse(famille?.grossesse?.dpa);
  const grossesseActive = famille?.grossesseActive ?? false;
  const dernierMed = Object.values(medicaments || {}).sort(
    (a, b) => (b.ts || 0) - (a.ts || 0)
  )[0];
  const budgetDanger = pct >= 90,
    budgetWarn = pct >= 70 && pct < 90;

  return (
    <div className="up">
      <div
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 30,
          color: th.text,
          marginBottom: 22,
          letterSpacing: -0.5,
        }}
      >
        Bonjour, {profil === "abdullah" ? "Abdullah" : "Pranvera"}.
      </div>

      {/* Budget card */}
      <Tile
        th={th}
        onClick={() => setTab("courses")}
        style={{ marginBottom: 12 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <div>
            <ULabel th={th}>Budget {MOIS_LONG[new Date().getMonth()]}</ULabel>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: -0.5,
                marginTop: 4,
                color: budgetDanger
                  ? th.danger
                  : budgetWarn
                  ? th.warn
                  : th.text,
              }}
            >
              {(budget?.depense || 0).toFixed(2)}
              <span style={{ fontSize: 15, fontWeight: 400, color: th.sub }}>
                {" "}
                / {budget?.mensuel || 800} CHF
              </span>
            </div>
          </div>
          <div
            style={{
              padding: "6px 12px",
              borderRadius: 10,
              background: budgetDanger
                ? th.dangerBg
                : budgetWarn
                ? th.warnBg
                : th.card2,
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: budgetDanger
                  ? th.danger
                  : budgetWarn
                  ? th.warn
                  : th.accent,
              }}
            >
              {pct}%
            </span>
          </div>
        </div>
        <div
          style={{
            background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
            borderRadius: 99,
            height: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: budgetDanger
                ? th.danger
                : budgetWarn
                ? th.warn
                : th.accent,
              width: `${pct}%`,
              height: "100%",
              borderRadius: 99,
              transition: "width 0.6s",
            }}
          />
        </div>
      </Tile>

      {/* Stat grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <Tile th={th} onClick={() => setTab("courses")} style={{ margin: 0 }}>
          <ULabel th={th}>À acheter</ULabel>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: th.text,
              letterSpacing: -0.5,
              marginTop: 4,
            }}
          >
            {coursesArr.length}
          </div>
          <div
            style={{
              fontSize: 13,
              color: urgents > 0 ? th.danger : th.sub,
              marginTop: 3,
              fontWeight: urgents > 0 ? 600 : 400,
            }}
          >
            {urgents > 0
              ? `${urgents} urgent${urgents > 1 ? "s" : ""}`
              : "Rien d'urgent"}
          </div>
        </Tile>
        <Tile
          th={th}
          onClick={() => setTab("taches")}
          style={{
            margin: 0,
            borderLeft:
              tachesRetard.length > 0
                ? `3px solid ${th.danger}`
                : tachesAujourdhui.length > 0
                ? `3px solid ${th.warn}`
                : undefined,
          }}
        >
          <ULabel th={th}>Aujourd'hui</ULabel>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color:
                tachesRetard.length > 0
                  ? th.danger
                  : tachesAujourdhui.length > 0
                  ? th.warn
                  : th.text,
              letterSpacing: -0.5,
              marginTop: 4,
            }}
          >
            {tachesAujourdhui.length || "—"}
          </div>
          <div
            style={{
              fontSize: 13,
              color: tachesRetard.length > 0 ? th.danger : th.sub,
              marginTop: 3,
              fontWeight: tachesRetard.length > 0 ? 700 : 400,
            }}
          >
            {tachesRetard.length > 0
              ? `${tachesRetard.length} en retard`
              : tachesAujourdhui.length > 0
              ? `tâche${tachesAujourdhui.length > 1 ? "s" : ""} prévue${
                  tachesAujourdhui.length > 1 ? "s" : ""
                }`
              : "Rien de planifié"}
          </div>
        </Tile>
        {grossesseActive && sw !== null && (
          <Tile th={th} onClick={() => setTab("famille")} style={{ margin: 0 }}>
            <ULabel th={th}>Grossesse</ULabel>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: th.text,
                letterSpacing: -0.5,
                marginTop: 4,
              }}
            >
              SA {sw}
            </div>
            <div style={{ fontSize: 13, color: th.sub, marginTop: 3 }}>
              {Math.max(0, 280 - sw * 7)} jours restants
            </div>
          </Tile>
        )}
        {enfants.map((e) => (
          <Tile
            key={e.id}
            th={th}
            onClick={() => setTab("famille")}
            style={{ margin: 0 }}
          >
            <ULabel th={th}>{e.prenom}</ULabel>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: th.text,
                marginTop: 4,
              }}
            >
              {ageEnfant(e.ddn) || "—"}
            </div>
            <div style={{ fontSize: 13, color: th.sub, marginTop: 3 }}>
              Voir le suivi
            </div>
          </Tile>
        ))}
      </div>

      {/* Dernier médicament */}
      {dernierMed && (
        <Tile th={th} style={{ marginBottom: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <ULabel th={th}>Dernier médicament</ULabel>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: th.text,
                  marginTop: 4,
                }}
              >
                {dernierMed.medicament}
              </div>
              <div style={{ fontSize: 13, color: th.sub, marginTop: 2 }}>
                {dernierMed.enfant} · {dernierMed.dose}
              </div>
            </div>
            <span style={{ fontSize: 13, color: th.sub }}>
              {timeAgo(dernierMed.ts)}
            </span>
          </div>
        </Tile>
      )}

      {/* Agenda */}
      {agendaProchain.length > 0 && (
        <Tile th={th} style={{ marginBottom: 12 }}>
          <SectionHead
            th={th}
            label="Prochains rendez-vous"
            action="Voir tout"
            onAction={() => setTab("agenda")}
          />
          {agendaProchain.map((a, i) => (
            <div
              key={a.id}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                padding: "10px 0",
                borderBottom:
                  i < agendaProchain.length - 1
                    ? `1px solid ${th.border}`
                    : "none",
              }}
            >
              <div
                style={{
                  background: th.text,
                  borderRadius: 10,
                  width: 46,
                  height: 46,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: th.bg,
                    lineHeight: 1,
                  }}
                >
                  {new Date(a.date).getDate()}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.5)",
                    fontWeight: 600,
                  }}
                >
                  {MOIS[new Date(a.date).getMonth()]}
                </span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: th.text }}>
                  {a.titre}
                </div>
                <div style={{ fontSize: 13, color: th.sub }}>
                  {a.heure || ""}
                  {a.lieu ? ` · ${a.lieu}` : ""}
                </div>
              </div>
            </div>
          ))}
        </Tile>
      )}

      {/* Finances alert */}
      {(() => {
        const factures = Object.values(finances?.factures || {}).filter(
          (f) => !f.payee
        );
        const urgent = factures.filter((f) => {
          if (!f.echeance) return false;
          const diff = new Date(f.echeance) - new Date();
          return diff >= 0 && diff < 7 * 24 * 3600000;
        });
        const retard = factures.filter(
          (f) => f.echeance && new Date(f.echeance) < new Date()
        );
        if (!urgent.length && !retard.length) return null;
        return (
          <div
            onClick={() => setTab("finances")}
            style={{
              background: retard.length ? th.dangerBg : th.warnBg,
              border: `1px solid ${
                retard.length ? th.danger + "40" : th.warn + "40"
              }`,
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 12,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: retard.length ? th.danger : th.warn,
                marginBottom: 4,
              }}
            >
              {retard.length > 0
                ? `${retard.length} facture${
                    retard.length > 1 ? "s" : ""
                  } en retard`
                : `${urgent.length} facture${
                    urgent.length > 1 ? "s" : ""
                  } à payer sous 7 jours`}
            </div>
            <div style={{ fontSize: 13, color: th.sub }}>
              {[
                ...retard,
                ...urgent.filter((u) => !retard.find((r) => r.id === u.id)),
              ]
                .map(
                  (f) => `${f.titre} (${parseFloat(f.montant).toFixed(2)} CHF)`
                )
                .join(", ")}
            </div>
          </div>
        );
      })()}

      {/* Tâches récentes */}
      {tachesRecentes.length > 0 && (
        <Tile th={th}>
          <SectionHead
            th={th}
            label="Récemment fait"
            action="Tout voir"
            onAction={() => setTab("taches")}
          />
          {tachesRecentes.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom:
                  i < tachesRecentes.length - 1
                    ? `1px solid ${th.border}`
                    : "none",
              }}
            >
              <Icon name="checkCircle" size={18} color={th.accent} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: th.text }}>
                  {t.description}
                </div>
                <div style={{ fontSize: 13, color: th.sub }}>
                  {t.par === "abdullah" ? "Abdullah" : "Pranvera"} ·{" "}
                  {timeAgo(t.doneAt)}
                </div>
              </div>
            </div>
          ))}
        </Tile>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COURSES
// ─────────────────────────────────────────────────────────────
function CoursesTab({
  th,
  dark,
  profil,
  stock,
  setStock,
  courses,
  setCourses,
  budget,
  setBudget,
  historique,
  setHistorique,
}) {
  const [subTab, setSubTab] = useState("liste");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [modalMode, setModalMode] = useState("stock");
  const [form, setForm] = useState({
    name: "",
    category: "frigo",
    urgency: "bientot",
    qty: 1,
  });
  const [sugg, setSugg] = useState([]);
  const [openOpts, setOpenOpts] = useState({});
  const [articleEnCours, setArticleEnCours] = useState(null);
  const [prix, setPrix] = useState("");
  const [confirmData, setConfirmData] = useState(null);
  const [modeCourses, setModeCourses] = useState(false);

  const stockArr = Object.entries(stock || {})
    .map(([id, v]) => ({ id, ...v }))
    .filter(
      (i) => !search || i.name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        (a.status === "manquant" ? -1 : 1) - (b.status === "manquant" ? -1 : 1)
    );
  const coursesArr = Object.entries(courses || {})
    .map(([id, v]) => ({ id, ...v }))
    .filter(
      (i) => !search || i.name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        ({ urgent: 0, bientot: 1, pasPresse: 2 }[a.urgency] -
        { urgent: 0, bientot: 1, pasPresse: 2 }[b.urgency])
    );
  const pct = Math.min(
    100,
    Math.round(((budget?.depense || 0) / (budget?.mensuel || 800)) * 100)
  );

  function marquerManquant(item) {
    update(ref(db, `nfc/stock/${item.id}`), { status: "manquant" });
    if (
      !Object.values(courses || {}).find(
        (c) => c.name === item.name && c.fromStock
      )
    )
      set(ref(db, `nfc/courses/c_${Date.now()}`), {
        name: item.name,
        category: item.category,
        qty: item.qty || 1,
        urgency: item.urgency || "bientot",
        fromStock: true,
        addedBy: profil,
        addedAt: Date.now(),
      });
  }
  function marquerOk(item) {
    update(ref(db, `nfc/stock/${item.id}`), { status: "ok" });
    Object.entries(courses || {}).forEach(([cid, cv]) => {
      if (cv.name === item.name && cv.fromStock)
        remove(ref(db, `nfc/courses/${cid}`));
    });
  }
  function updateStockQty(item, d) {
    const q = Math.max(0, (item.qty || 1) + d);
    update(ref(db, `nfc/stock/${item.id}`), { qty: q });
    if (q === 0 && item.status === "ok") marquerManquant(item);
  }
  function cocherCourse(item) {
    setArticleEnCours(item.id);
    setPrix("");
    setModal("prix");
  }
  function confirmerAchat(skip) {
    const item = courses?.[articleEnCours];
    if (!item) {
      setModal(null);
      return;
    }
    const p = skip ? 0 : parseFloat(prix) || 0;
    setBudget({
      ...budget,
      depense: Math.round(((budget?.depense || 0) + p) * 100) / 100,
    });
    if (item.fromStock) {
      const sid = Object.keys(stock || {}).find(
        (k) => stock[k].name === item.name
      );
      if (sid) update(ref(db, `nfc/stock/${sid}`), { status: "ok" });
    }
    remove(ref(db, `nfc/courses/${articleEnCours}`));
    setArticleEnCours(null);
    setPrix("");
    setModal(null);
  }
  function confirmerAdd() {
    const name = form.name.trim();
    if (!name) return;
    const id = (modalMode === "stock" ? "s_" : "c_") + Date.now();
    if (modalMode === "stock")
      set(ref(db, `nfc/stock/${id}`), {
        ...form,
        name,
        status: "ok",
        createdBy: profil,
        createdAt: Date.now(),
      });
    else
      set(ref(db, `nfc/courses/${id}`), {
        ...form,
        name,
        fromStock: false,
        addedBy: profil,
        addedAt: Date.now(),
      });
    if (!(historique || []).includes(name))
      setHistorique([name, ...(historique || [])].slice(0, 60));
    setModal(null);
    setSugg([]);
    setForm({ name: "", category: "frigo", urgency: "bientot", qty: 1 });
  }

  if (modeCourses)
    return (
      <ModeCourses
        courses={coursesArr}
        th={th}
        onCheck={cocherCourse}
        onExit={() => setModeCourses(false)}
      />
    );

  return (
    <div className="up">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <PageTitle th={th}>Courses</PageTitle>
        <GhostBtn
          th={th}
          label="Mode marché"
          onClick={() => setModeCourses(true)}
        />
      </div>

      {/* Budget bar */}
      <div
        onClick={() => setModal("budget")}
        style={{
          background: th.card,
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 14,
          cursor: "pointer",
          border: `1px solid ${th.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <ULabel th={th}>Budget {MOIS_LONG[new Date().getMonth()]}</ULabel>
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: pct > 90 ? th.danger : pct > 70 ? th.warn : th.text,
              marginTop: 4,
            }}
          >
            {(budget?.depense || 0).toFixed(2)}{" "}
            <span style={{ fontSize: 14, fontWeight: 400, color: th.sub }}>
              / {budget?.mensuel || 800} CHF
            </span>
          </div>
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: pct > 90 ? th.danger : pct > 70 ? th.warn : th.accent,
          }}
        >
          {pct}%
        </div>
      </div>

      <SegControl
        th={th}
        options={[
          ["stock", `Stock (${stockArr.length})`],
          ["liste", `À acheter (${coursesArr.length})`],
        ]}
        value={subTab}
        onChange={(v) => {
          setSubTab(v);
          setSearch("");
        }}
        style={{ marginBottom: 14 }}
      />

      <SearchBar
        th={th}
        value={search}
        onChange={setSearch}
        style={{ marginBottom: 14 }}
      />

      {/* STOCK */}
      {subTab === "stock" && (
        <>
          {CATEGORIES.map((cat) => {
            const items = stockArr.filter((i) => i.category === cat.id);
            if (!items.length) return null;
            return (
              <div key={cat.id} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: th.sub,
                    marginBottom: 10,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                  }}
                >
                  {cat.label}
                </div>
                {items.map((item) => {
                  const urg =
                    URGENCY.find((u) => u.id === item.urgency) || URGENCY[1];
                  const qty = item.qty || 1;
                  const low = qty <= 1 && item.status === "ok";
                  const isOpen = openOpts[item.id];
                  return (
                    <div
                      key={item.id}
                      style={{
                        background: th.card,
                        borderRadius: 14,
                        padding: "14px 16px",
                        marginBottom: 8,
                        border: `1px solid ${
                          item.status === "manquant"
                            ? th.danger + "30"
                            : low
                            ? th.warn + "30"
                            : th.border
                        }`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: th.text,
                            }}
                          >
                            {item.name}
                          </div>
                          <div
                            style={{ display: "flex", gap: 8, marginTop: 4 }}
                          >
                            <span
                              style={{
                                fontSize: 13,
                                color: urg.color,
                                fontWeight: 600,
                              }}
                            >
                              {urg.label}
                            </span>
                            {item.status === "manquant" && (
                              <span
                                className="pulse"
                                style={{
                                  fontSize: 13,
                                  color: th.danger,
                                  fontWeight: 600,
                                }}
                              >
                                · Manquant
                              </span>
                            )}
                            {low && item.status !== "manquant" && (
                              <span
                                style={{
                                  fontSize: 13,
                                  color: th.warn,
                                  fontWeight: 600,
                                }}
                              >
                                · Presque fini
                              </span>
                            )}
                          </div>
                        </div>
                        <QtyMini
                          th={th}
                          qty={qty}
                          onChange={(d) => updateStockQty(item, d)}
                        />
                        {item.status === "ok" ? (
                          <IconBtn
                            th={th}
                            onClick={() => marquerManquant(item)}
                          >
                            <Icon name="x" size={16} color={th.danger} />
                          </IconBtn>
                        ) : (
                          <IconBtn
                            th={th}
                            onClick={() => marquerOk(item)}
                            accent
                            th={th}
                          >
                            <Icon name="check" size={16} color={th.accent} />
                          </IconBtn>
                        )}
                        <IconBtn
                          th={th}
                          onClick={() =>
                            setOpenOpts((p) => ({
                              ...p,
                              [item.id]: !p[item.id],
                            }))
                          }
                        >
                          <Icon name="more" size={16} color={th.sub} />
                        </IconBtn>
                      </div>
                      {isOpen && (
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            marginTop: 12,
                            paddingTop: 12,
                            borderTop: `1px solid ${th.border}`,
                          }}
                        >
                          {URGENCY.map((u) => (
                            <ChipBtn
                              key={u.id}
                              th={th}
                              dark={dark}
                              active={item.urgency === u.id}
                              label={u.label}
                              color={u.color}
                              onClick={() => {
                                update(ref(db, `nfc/stock/${item.id}`), {
                                  urgency: u.id,
                                });
                                setOpenOpts((p) => ({
                                  ...p,
                                  [item.id]: false,
                                }));
                              }}
                              small
                            />
                          ))}
                          <button
                            className="btn"
                            onClick={() =>
                              setConfirmData({
                                title: `Supprimer "${item.name}" ?`,
                                action: () => {
                                  remove(ref(db, `nfc/stock/${item.id}`));
                                  Object.entries(courses || {}).forEach(
                                    ([cid, cv]) => {
                                      if (cv.name === item.name && cv.fromStock)
                                        remove(ref(db, `nfc/courses/${cid}`));
                                    }
                                  );
                                  setOpenOpts((p) => ({
                                    ...p,
                                    [item.id]: false,
                                  }));
                                },
                              })
                            }
                            style={{
                              borderRadius: 8,
                              padding: "7px 12px",
                              fontSize: 13,
                              color: th.danger,
                              border: `1px solid ${th.danger}30`,
                            }}
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {!stockArr.length && (
            <EmptyState
              th={th}
              title="Stock vide"
              sub="Ajoutez vos premiers articles"
            />
          )}
          <PrimaryBtn
            th={th}
            label="Ajouter au stock"
            onClick={() => {
              setModalMode("stock");
              setForm({
                name: "",
                category: "frigo",
                urgency: "bientot",
                qty: 1,
              });
              setModal("add");
            }}
          />
        </>
      )}

      {/* LISTE */}
      {subTab === "liste" && (
        <>
          {coursesArr.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 14, color: th.sub }}>
                {coursesArr.length} article{coursesArr.length > 1 ? "s" : ""}
              </span>
              <button
                className="btn"
                onClick={() => setModal("clear")}
                style={{ color: th.danger, fontSize: 14, fontWeight: 600 }}
              >
                Vider la liste
              </button>
            </div>
          )}
          {!coursesArr.length && (
            <EmptyState th={th} title="Liste vide" sub="Tout est en stock !" />
          )}
          {coursesArr.map((item) => {
            const urg =
              URGENCY.find((u) => u.id === item.urgency) || URGENCY[1];
            const isOpen = openOpts[item.id];
            return (
              <div
                key={item.id}
                style={{
                  background: th.card,
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 8,
                  border: `1px solid ${th.border}`,
                  borderLeft: `3px solid ${urg.color}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontSize: 16, fontWeight: 600, color: th.text }}
                    >
                      {item.name}
                    </div>
                    <div style={{ fontSize: 13, color: th.sub, marginTop: 3 }}>
                      {item.addedBy === "abdullah" ? "Abdullah" : "Pranvera"} ·{" "}
                      {timeAgo(item.addedAt)}
                      {item.fromStock ? " · Stock" : ""}
                    </div>
                  </div>
                  <QtyMini
                    th={th}
                    qty={item.qty || 1}
                    onChange={(d) =>
                      update(ref(db, `nfc/courses/${item.id}`), {
                        qty: Math.max(1, (item.qty || 1) + d),
                      })
                    }
                  />
                  <IconBtn th={th} onClick={() => cocherCourse(item)} accent>
                    <Icon name="check" size={18} color={th.accent} />
                  </IconBtn>
                  <IconBtn
                    th={th}
                    onClick={() =>
                      setOpenOpts((p) => ({ ...p, [item.id]: !p[item.id] }))
                    }
                  >
                    <Icon name="more" size={16} color={th.sub} />
                  </IconBtn>
                </div>
                {isOpen && (
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: `1px solid ${th.border}`,
                    }}
                  >
                    {URGENCY.map((u) => (
                      <ChipBtn
                        key={u.id}
                        th={th}
                        dark={dark}
                        active={item.urgency === u.id}
                        label={u.label}
                        color={u.color}
                        onClick={() => {
                          update(ref(db, `nfc/courses/${item.id}`), {
                            urgency: u.id,
                          });
                          setOpenOpts((p) => ({ ...p, [item.id]: false }));
                        }}
                        small
                      />
                    ))}
                    <button
                      className="btn"
                      onClick={() =>
                        setConfirmData({
                          title: `Retirer "${item.name}" ?`,
                          action: () => {
                            const cv = courses[item.id];
                            remove(ref(db, `nfc/courses/${item.id}`));
                            if (cv?.fromStock) {
                              const sid = Object.keys(stock || {}).find(
                                (k) => stock[k].name === cv.name
                              );
                              if (sid)
                                update(ref(db, `nfc/stock/${sid}`), {
                                  status: "manquant",
                                });
                            }
                            setOpenOpts((p) => ({ ...p, [item.id]: false }));
                          },
                        })
                      }
                      style={{
                        borderRadius: 8,
                        padding: "7px 12px",
                        fontSize: 13,
                        color: th.danger,
                        border: `1px solid ${th.danger}30`,
                      }}
                    >
                      Retirer
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          <PrimaryBtn
            th={th}
            label="Ajouter à la liste"
            onClick={() => {
              setModalMode("courses");
              setForm({
                name: "",
                category: "frigo",
                urgency: "bientot",
                qty: 1,
              });
              setModal("add");
            }}
          />
        </>
      )}

      {/* Modal — Ajouter */}
      {modal === "add" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>
            {modalMode === "stock" ? "Ajouter au stock" : "Ajouter à la liste"}
          </SheetTitle>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <input
              autoFocus
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
                const v = e.target.value.toLowerCase();
                setSugg(
                  v
                    ? (historique || [])
                        .filter(
                          (h) =>
                            h.toLowerCase().includes(v) && h !== e.target.value
                        )
                        .slice(0, 5)
                    : []
                );
              }}
              placeholder="Nom de l'article"
              style={inputStyle(th)}
            />
            {sugg.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  right: 0,
                  background: th.card,
                  borderRadius: 12,
                  border: `1px solid ${th.border}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  zIndex: 10,
                  overflow: "hidden",
                }}
              >
                {sugg.map((s) => (
                  <div
                    key={s}
                    onClick={() => {
                      setForm((f) => ({ ...f, name: s }));
                      setSugg([]);
                    }}
                    style={{
                      padding: "14px 16px",
                      cursor: "pointer",
                      fontSize: 15,
                      borderBottom: `1px solid ${th.border}`,
                      color: th.text,
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
          <FLabel th={th}>Catégorie</FLabel>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            {CATEGORIES.map((c) => (
              <ChipBtn
                key={c.id}
                th={th}
                dark={dark}
                active={form.category === c.id}
                label={c.label}
                onClick={() => setForm((f) => ({ ...f, category: c.id }))}
              />
            ))}
          </div>
          <FLabel th={th}>Urgence</FLabel>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {URGENCY.map((u) => (
              <button
                key={u.id}
                className="btn t"
                onClick={() => setForm((f) => ({ ...f, urgency: u.id }))}
                style={{
                  flex: 1,
                  padding: "12px 4px",
                  borderRadius: 12,
                  fontSize: 14,
                  border: `1.5px solid ${
                    form.urgency === u.id ? u.color : th.border
                  }`,
                  background: "transparent",
                  color: form.urgency === u.id ? u.color : th.sub,
                  fontWeight: form.urgency === u.id ? 700 : 500,
                }}
              >
                {u.label}
              </button>
            ))}
          </div>
          <FLabel th={th}>Quantité</FLabel>
          <QtyRow
            th={th}
            qty={form.qty}
            onChange={(d) =>
              setForm((f) => ({ ...f, qty: Math.max(1, f.qty + d) }))
            }
          />
          <PrimaryBtn
            th={th}
            label="Ajouter"
            onClick={confirmerAdd}
            disabled={!form.name.trim()}
            style={{ marginTop: 18 }}
          />
        </Sheet>
      )}

      {/* Modal — Budget */}
      {modal === "budget" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <BudgetSheet
            th={th}
            budget={budget}
            onSave={(m, d) => {
              setBudget({ ...budget, mensuel: m, depense: d });
              setModal(null);
            }}
          />
        </Sheet>
      )}

      {/* Modal — Prix */}
      {modal === "prix" && (
        <Sheet th={th}>
          <SheetTitle th={th}>
            {courses?.[articleEnCours]?.name} — acheté
          </SheetTitle>
          <p style={{ fontSize: 15, color: th.sub, marginBottom: 16 }}>
            Montant payé (optionnel)
          </p>
          <input
            autoFocus
            type="number"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            placeholder="0.00 CHF"
            style={{
              ...inputStyle(th),
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 18,
            }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="btn"
              onClick={() => confirmerAchat(true)}
              style={{
                flex: 1,
                padding: 15,
                borderRadius: 12,
                background: th.card2,
                color: th.sub,
                fontSize: 15,
                border: `1px solid ${th.border}`,
              }}
            >
              Passer
            </button>
            <button
              className="btn"
              onClick={() => confirmerAchat(false)}
              style={{
                flex: 2,
                padding: 15,
                borderRadius: 12,
                background: th.text,
                color: th.bg,
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Confirmer
            </button>
          </div>
        </Sheet>
      )}

      {modal === "clear" && (
        <ConfirmSheet
          th={th}
          title="Vider la liste ?"
          sub="Les articles du stock resteront marqués manquants."
          onCancel={() => setModal(null)}
          onConfirm={() => {
            Object.entries(courses || {}).forEach(([cid, cv]) => {
              remove(ref(db, `nfc/courses/${cid}`));
              if (cv.fromStock) {
                const sid = Object.keys(stock || {}).find(
                  (k) => stock[k].name === cv.name
                );
                if (sid)
                  update(ref(db, `nfc/stock/${sid}`), { status: "manquant" });
              }
            });
            setModal(null);
          }}
          confirmLabel="Vider"
          danger
        />
      )}
      {confirmData && (
        <ConfirmSheet
          th={th}
          title={confirmData.title}
          onCancel={() => setConfirmData(null)}
          onConfirm={() => {
            confirmData.action();
            setConfirmData(null);
          }}
          confirmLabel="Supprimer"
          danger
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MODE MARCHÉ
// ─────────────────────────────────────────────────────────────
function ModeCourses({ courses, th, onCheck, onExit }) {
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: courses.filter((c) => c.category === cat.id),
  })).filter((g) => g.items.length);
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
        background: "#0c0c0e",
        color: "#fafafa",
        padding: "52px 20px 40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 32,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 32,
              color: "#fafafa",
              letterSpacing: -0.5,
            }}
          >
            Mode marché
          </div>
          <div
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.35)",
              marginTop: 4,
            }}
          >
            {courses.length} article{courses.length !== 1 ? "s" : ""} restant
            {courses.length !== 1 ? "s" : ""}
          </div>
        </div>
        <button
          className="btn"
          onClick={onExit}
          style={{
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.65)",
            borderRadius: 12,
            padding: "11px 18px",
            fontSize: 14,
            fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Terminer
        </button>
      </div>
      {!courses.length ? (
        <div style={{ textAlign: "center", paddingTop: 80 }}>
          <div
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 36,
              color: "#fafafa",
              marginBottom: 8,
            }}
          >
            Tout acheté.
          </div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.35)" }}>
            Belle course !
          </div>
        </div>
      ) : (
        grouped.map((g) => (
          <div key={g.id} style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.28)",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {g.label}
            </div>
            {g.items.map((item) => {
              const urg = URGENCY.find((u) => u.id === item.urgency);
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 16,
                    padding: "18px 20px",
                    marginBottom: 8,
                    borderLeft: `3px solid ${urg?.color}`,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: "#fafafa",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.3)",
                        marginTop: 3,
                      }}
                    >
                      Qté : {item.qty || 1}
                    </div>
                  </div>
                  <button
                    className="btn"
                    onClick={() => onCheck(item)}
                    style={{
                      background: "#16a34a",
                      color: "#fff",
                      borderRadius: 14,
                      width: 54,
                      height: 54,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      name="check"
                      size={24}
                      color="#fff"
                      strokeWidth={2.5}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TÂCHES
// ─────────────────────────────────────────────────────────────
function TachesTab({ th, dark, profil, taches, setTaches }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    description: "",
    categorie: "menage",
    datePrevu: "",
    recurrente: false,
    frequence: "semaine",
  });
  const [vue, setVue] = useState("aFaire");
  const [confirmDel, setConfirmDel] = useState(null);

  const arr = Object.entries(taches || {}).map(([id, v]) => ({ id, ...v }));
  const aFaire = arr
    .filter((t) => !t.done)
    .sort((a, b) => {
      if (a.datePrevu && b.datePrevu)
        return new Date(a.datePrevu) - new Date(b.datePrevu);
      if (a.datePrevu) return -1;
      if (b.datePrevu) return 1;
      return (b.ts || 0) - (a.ts || 0);
    });
  const faites = arr
    .filter((t) => t.done)
    .sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));

  const retard = aFaire.filter((t) => t.datePrevu && isPast(t.datePrevu));
  const aujourdhui = aFaire.filter((t) => t.datePrevu && isToday(t.datePrevu));
  const semaine = aFaire.filter(
    (t) =>
      t.datePrevu &&
      !isToday(t.datePrevu) &&
      !isPast(t.datePrevu) &&
      isThisWeek(t.datePrevu)
  );
  const later = aFaire.filter(
    (t) =>
      !t.datePrevu ||
      (!isToday(t.datePrevu) &&
        !isPast(t.datePrevu) &&
        !isThisWeek(t.datePrevu))
  );

  function ajouter() {
    if (!form.description.trim()) return;
    set(ref(db, `nfc/taches/t_${Date.now()}`), {
      ...form,
      description: form.description.trim(),
      par: profil,
      ts: Date.now(),
      done: false,
    });
    setForm({
      description: "",
      categorie: "menage",
      datePrevu: "",
      recurrente: false,
      frequence: "semaine",
    });
    setModal(false);
  }
  function marquerFaite(t) {
    update(ref(db, `nfc/taches/${t.id}`), {
      done: true,
      doneAt: Date.now(),
      doneBy: profil,
    });
    if (t.recurrente && t.datePrevu) {
      const next = new Date(t.datePrevu);
      if (t.frequence === "jour") next.setDate(next.getDate() + 1);
      else if (t.frequence === "semaine") next.setDate(next.getDate() + 7);
      else next.setMonth(next.getMonth() + 1);
      const { id: _id, ...rest } = t;
      set(ref(db, `nfc/taches/t_${Date.now()}`), {
        ...rest,
        done: false,
        doneAt: null,
        doneBy: null,
        ts: Date.now(),
        datePrevu: next.toISOString().split("T")[0],
      });
    }
  }

  function TaskRow({ t }) {
    const cat = TACHE_CATS.find((c) => c.id === t.categorie) || TACHE_CATS[0];
    const en_retard = t.datePrevu && isPast(t.datePrevu);
    return (
      <div
        style={{
          background: th.card,
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 8,
          border: `1px solid ${en_retard ? th.danger + "30" : th.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <button
            className="btn t"
            onClick={() => !t.done && marquerFaite(t)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: `2px solid ${t.done ? th.accent : th.border}`,
              background: t.done ? th.accent : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            {t.done && (
              <Icon name="check" size={14} color="#fff" strokeWidth={2.5} />
            )}
          </button>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: t.done ? th.sub : th.text,
                textDecoration: t.done ? "line-through" : "none",
              }}
            >
              {t.description}
            </div>
            <div
              style={{
                fontSize: 13,
                color: th.sub,
                marginTop: 4,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span>{cat.label}</span>
              {t.datePrevu && (
                <span
                  style={{
                    color: en_retard
                      ? th.danger
                      : isToday(t.datePrevu)
                      ? th.warn
                      : th.sub,
                    fontWeight: en_retard || isToday(t.datePrevu) ? 700 : 400,
                  }}
                >
                  ·{" "}
                  {en_retard
                    ? `En retard · ${formatDate(t.datePrevu)}`
                    : isToday(t.datePrevu)
                    ? "Aujourd'hui"
                    : formatDate(t.datePrevu)}
                </span>
              )}
              {t.recurrente && (
                <span style={{ color: th.accent, fontWeight: 600 }}>
                  · ↻{" "}
                  {t.frequence === "jour"
                    ? "Quotidien"
                    : t.frequence === "semaine"
                    ? "Hebdo"
                    : "Mensuel"}
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: th.sub, marginTop: 2 }}>
              {t.par === "abdullah" ? "Abdullah" : "Pranvera"}{" "}
              {t.done && t.doneBy
                ? `· Fait par ${
                    t.doneBy === "abdullah" ? "Abdullah" : "Pranvera"
                  }`
                : ""}
            </div>
          </div>
          {!t.done && (
            <button
              className="btn"
              onClick={() => setConfirmDel(t.id)}
              style={{ padding: 4 }}
            >
              <Icon name="trash" size={16} color={th.sub} />
            </button>
          )}
        </div>
      </div>
    );
  }

  function Group({ label, tasks, labelColor }) {
    if (!tasks.length) return null;
    return (
      <>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: labelColor || th.sub,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginBottom: 8,
            marginTop: 16,
          }}
        >
          {label}
        </div>
        {tasks.map((t) => (
          <TaskRow key={t.id} t={t} />
        ))}
      </>
    );
  }

  return (
    <div className="up">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <PageTitle th={th}>Tâches</PageTitle>
        <PrimaryBtnSmall
          th={th}
          label="Ajouter"
          onClick={() => setModal(true)}
        />
      </div>

      <SegControl
        th={th}
        options={[
          ["aFaire", `À faire (${aFaire.length})`],
          ["faites", `Faites (${faites.length})`],
        ]}
        value={vue}
        onChange={setVue}
        style={{ marginBottom: 16 }}
      />

      {vue === "aFaire" && (
        <>
          {!aFaire.length && (
            <EmptyState
              th={th}
              title="Aucune tâche"
              sub="Planifiez ou enregistrez vos tâches"
            />
          )}
          {retard.length > 0 && (
            <>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: th.danger,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                En retard
              </div>
              {retard.map((t) => (
                <TaskRow key={t.id} t={t} />
              ))}
            </>
          )}
          <Group label="Aujourd'hui" tasks={aujourdhui} labelColor={th.warn} />
          <Group label="Cette semaine" tasks={semaine} />
          <Group label="Sans date / Plus tard" tasks={later} />
        </>
      )}
      {vue === "faites" && (
        <>
          {!faites.length && (
            <EmptyState th={th} title="Aucune tâche complétée" sub="" />
          )}
          {faites.map((t) => (
            <TaskRow key={t.id} t={t} />
          ))}
        </>
      )}

      {modal && (
        <Sheet th={th} onClose={() => setModal(false)}>
          <SheetTitle th={th}>Nouvelle tâche</SheetTitle>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Description de la tâche..."
            style={{
              ...inputStyle(th),
              minHeight: 90,
              resize: "none",
              marginBottom: 14,
            }}
          />
          <FLabel th={th}>Catégorie</FLabel>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            {TACHE_CATS.map((c) => (
              <ChipBtn
                key={c.id}
                th={th}
                dark={dark}
                active={form.categorie === c.id}
                label={c.label}
                onClick={() => setForm((f) => ({ ...f, categorie: c.id }))}
              />
            ))}
          </div>
          <FLabel th={th}>Date prévue</FLabel>
          <input
            type="date"
            value={form.datePrevu}
            onChange={(e) =>
              setForm((f) => ({ ...f, datePrevu: e.target.value }))
            }
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <div
            onClick={() =>
              setForm((f) => ({ ...f, recurrente: !f.recurrente }))
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "13px 14px",
              background: th.card2,
              borderRadius: 12,
              cursor: "pointer",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                border: `2px solid ${form.recurrente ? th.accent : th.border}`,
                background: form.recurrente ? th.accent : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {form.recurrente && (
                <Icon name="check" size={13} color="#fff" strokeWidth={2.5} />
              )}
            </div>
            <span style={{ fontSize: 15, color: th.text, fontWeight: 500 }}>
              Tâche récurrente
            </span>
          </div>
          {form.recurrente && (
            <>
              <FLabel th={th}>Fréquence</FLabel>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {[
                  ["jour", "Quotidien"],
                  ["semaine", "Hebdo"],
                  ["mois", "Mensuel"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    className="btn t"
                    onClick={() => setForm((f) => ({ ...f, frequence: id }))}
                    style={{
                      flex: 1,
                      padding: "11px 4px",
                      borderRadius: 12,
                      fontSize: 14,
                      border: `1.5px solid ${
                        form.frequence === id ? th.accent : th.border
                      }`,
                      background: "transparent",
                      color: form.frequence === id ? th.accent : th.sub,
                      fontWeight: form.frequence === id ? 700 : 500,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
          <PrimaryBtn
            th={th}
            label="Enregistrer"
            onClick={ajouter}
            disabled={!form.description.trim()}
            style={{ marginTop: 4 }}
          />
        </Sheet>
      )}
      {confirmDel && (
        <ConfirmSheet
          th={th}
          title="Supprimer cette tâche ?"
          onCancel={() => setConfirmDel(null)}
          onConfirm={() => {
            remove(ref(db, `nfc/taches/${confirmDel}`));
            setConfirmDel(null);
          }}
          confirmLabel="Supprimer"
          danger
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AGENDA
// ─────────────────────────────────────────────────────────────
function AgendaTab({ th, dark, profil, agenda }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    titre: "",
    date: "",
    heure: "",
    lieu: "",
    qui: "les deux",
    notes: "",
    categorie: "medical",
  });
  const [confirmDel, setConfirmDel] = useState(null);

  const arr = Object.entries(agenda || {})
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const avenir = arr.filter(
    (a) => !a.date || new Date(a.date + "T23:59") >= new Date()
  );
  const passes = arr
    .filter((a) => a.date && new Date(a.date + "T23:59") < new Date())
    .reverse();

  const RDV_CATS = [
    { id: "medical", label: "Médical" },
    { id: "admin", label: "Admin" },
    { id: "ecole", label: "École" },
    { id: "famille", label: "Famille" },
    { id: "autre", label: "Autre" },
  ];

  function ajouter() {
    if (!form.titre.trim()) return;
    set(ref(db, `nfc/agenda/a_${Date.now()}`), {
      ...form,
      titre: form.titre.trim(),
      createdBy: profil,
      createdAt: Date.now(),
    });
    setForm({
      titre: "",
      date: "",
      heure: "",
      lieu: "",
      qui: "les deux",
      notes: "",
      categorie: "medical",
    });
    setModal(false);
  }

  function RDVCard({ a }) {
    const pastCard = a.date && new Date(a.date + "T23:59") < new Date();
    const nearCard = !pastCard && a.date && isThisWeek(a.date);
    return (
      <div
        style={{
          background: th.card,
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 8,
          border: `1px solid ${nearCard ? th.warn + "40" : th.border}`,
          opacity: pastCard ? 0.5 : 1,
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          {a.date && (
            <div
              style={{
                background: pastCard ? th.card2 : th.text,
                borderRadius: 12,
                width: 50,
                height: 50,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  color: pastCard ? th.sub : th.bg,
                  lineHeight: 1,
                }}
              >
                {new Date(a.date).getDate()}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: pastCard
                    ? th.sub
                    : dark
                    ? "rgba(0,0,0,0.4)"
                    : "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                }}
              >
                {MOIS[new Date(a.date).getMonth()]}
              </span>
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: th.text }}>
              {a.titre}
            </div>
            {(a.heure || a.lieu) && (
              <div style={{ fontSize: 13, color: th.sub, marginTop: 3 }}>
                {a.heure}
                {a.lieu ? ` · ${a.lieu}` : ""}
              </div>
            )}
            {a.notes && (
              <div
                style={{
                  fontSize: 13,
                  color: th.sub,
                  marginTop: 3,
                  fontStyle: "italic",
                }}
              >
                {a.notes}
              </div>
            )}
            <div style={{ fontSize: 12, color: th.sub, marginTop: 3 }}>
              {a.qui === "abdullah"
                ? "Abdullah"
                : a.qui === "pranvera"
                ? "Pranvera"
                : "Abdullah & Pranvera"}
            </div>
          </div>
          <button className="btn" onClick={() => setConfirmDel(a.id)}>
            <Icon name="trash" size={16} color={th.sub} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="up">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <PageTitle th={th}>Agenda</PageTitle>
        <PrimaryBtnSmall
          th={th}
          label="Ajouter"
          onClick={() => setModal(true)}
        />
      </div>
      {!avenir.length && !passes.length && (
        <EmptyState
          th={th}
          title="Aucun rendez-vous"
          sub="Ajoutez vos prochains RDV"
        />
      )}
      {avenir.length > 0 && (
        <>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: th.sub,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            À venir
          </div>
          {avenir.map((a) => (
            <RDVCard key={a.id} a={a} />
          ))}
        </>
      )}
      {passes.length > 0 && (
        <>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: th.sub,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            Passés
          </div>
          {passes.slice(0, 5).map((a) => (
            <RDVCard key={a.id} a={a} />
          ))}
        </>
      )}

      {modal && (
        <Sheet th={th} onClose={() => setModal(false)}>
          <SheetTitle th={th}>Nouveau rendez-vous</SheetTitle>
          <input
            autoFocus
            value={form.titre}
            onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))}
            placeholder="Titre"
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div>
              <FLabel th={th}>Date</FLabel>
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                style={inputStyle(th)}
              />
            </div>
            <div>
              <FLabel th={th}>Heure</FLabel>
              <input
                type="time"
                value={form.heure}
                onChange={(e) =>
                  setForm((f) => ({ ...f, heure: e.target.value }))
                }
                style={inputStyle(th)}
              />
            </div>
          </div>
          <FLabel th={th}>Lieu</FLabel>
          <input
            value={form.lieu}
            onChange={(e) => setForm((f) => ({ ...f, lieu: e.target.value }))}
            placeholder="Ex: HFR Fribourg"
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <FLabel th={th}>Catégorie</FLabel>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            {RDV_CATS.map((c) => (
              <ChipBtn
                key={c.id}
                th={th}
                dark={dark}
                active={form.categorie === c.id}
                label={c.label}
                onClick={() => setForm((f) => ({ ...f, categorie: c.id }))}
              />
            ))}
          </div>
          <FLabel th={th}>Qui</FLabel>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {[
              ["abdullah", "Abdullah"],
              ["pranvera", "Pranvera"],
              ["les deux", "Les deux"],
            ].map(([id, label]) => (
              <button
                key={id}
                className="btn t"
                onClick={() => setForm((f) => ({ ...f, qui: id }))}
                style={{
                  flex: 1,
                  padding: "12px 4px",
                  borderRadius: 12,
                  fontSize: 13,
                  border: `1.5px solid ${
                    form.qui === id ? th.text : th.border
                  }`,
                  background: form.qui === id ? th.text : "transparent",
                  color: form.qui === id ? th.bg : th.sub,
                  fontWeight: form.qui === id ? 700 : 500,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <FLabel th={th}>Notes</FLabel>
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Infos supplémentaires..."
            style={{
              ...inputStyle(th),
              minHeight: 70,
              resize: "none",
              marginBottom: 18,
            }}
          />
          <PrimaryBtn
            th={th}
            label="Enregistrer"
            onClick={ajouter}
            disabled={!form.titre.trim()}
          />
        </Sheet>
      )}
      {confirmDel && (
        <ConfirmSheet
          th={th}
          title="Supprimer ce rendez-vous ?"
          onCancel={() => setConfirmDel(null)}
          onConfirm={() => {
            remove(ref(db, `nfc/agenda/${confirmDel}`));
            setConfirmDel(null);
          }}
          confirmLabel="Supprimer"
          danger
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FAMILLE
// ─────────────────────────────────────────────────────────────
function FamilleTab({
  th,
  dark,
  profil,
  famille,
  medicaments,
  setMedicaments,
  notes,
  setNotes,
}) {
  const [section, setSection] = useState(null);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [confirmSuppr, setConfirmSuppr] = useState(null);
  const [notesLocal, setNotesLocal] = useState(notes || "");
  const notesTimer = useRef(null);

  const enfantsArr = Object.entries(famille?.enfants || {})
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => new Date(a.ddn) - new Date(b.ddn));
  const grossesse = famille?.grossesse || {};
  const grossesseActive = famille?.grossesseActive ?? false;
  const sw = semaineGrossesse(grossesse.dpa);
  const medsArr = Object.entries(medicaments || {})
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => (b.ts || 0) - (a.ts || 0));

  const navTabs = [
    ...enfantsArr.map((e) => ({ id: e.id, label: e.prenom })),
    ...(grossesseActive ? [{ id: "grossesse", label: "Grossesse" }] : []),
    { id: "medicaments", label: "Médicaments" },
    { id: "notes", label: "Notes" },
  ];
  const activeId = section || navTabs[0]?.id || "notes";
  const enfantActuel = enfantsArr.find((e) => e.id === activeId);
  const dernierPoids =
    enfantActuel?.poids?.length > 0
      ? enfantActuel.poids[enfantActuel.poids.length - 1]
      : null;

  useEffect(() => {
    setNotesLocal(notes || "");
  }, [notes]);

  function handleNotes(val) {
    setNotesLocal(val);
    clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(() => set(ref(db, "nfc/notes"), val), 800);
  }
  function ajouterEnfant() {
    if (!form.prenom || !form.ddn) return;
    const id = "enfant_" + Date.now();
    set(ref(db, `nfc/famille/enfants/${id}`), {
      prenom: form.prenom.trim(),
      ddn: form.ddn,
      poids: [],
    });
    setForm({});
    setModal(null);
    setSection(id);
  }
  function ajouterPoids() {
    if (!form.poids || !form.date || !enfantActuel) return;
    const arr = [
      ...(enfantActuel.poids || []),
      {
        poids: parseFloat(form.poids),
        taille: parseFloat(form.taille) || null,
        date: form.date,
        notes: form.notes || "",
      },
    ].sort((a, b) => new Date(a.date) - new Date(b.date));
    set(ref(db, `nfc/famille/enfants/${enfantActuel.id}`), {
      ...enfantActuel,
      poids: arr,
    });
    setForm({});
    setModal(null);
  }
  function ajouterMedicament() {
    if (!form.medicament || !form.enfant) return;
    set(ref(db, `nfc/medicaments/med_${Date.now()}`), {
      ...form,
      par: profil,
      ts: Date.now(),
    });
    setForm({});
    setModal(null);
  }
  function ajouterNoteGrossesse() {
    if (!form.note) return;
    const arr = [
      ...(grossesse.notes || []),
      {
        note: form.note,
        date: new Date().toISOString().split("T")[0],
        ts: Date.now(),
      },
    ];
    set(ref(db, "nfc/famille/grossesse"), { ...grossesse, notes: arr });
    setForm({});
    setModal(null);
  }
  function convertirEnEnfant() {
    if (!form.prenom || !form.ddn) return;
    const id = "enfant_" + Date.now();
    set(ref(db, `nfc/famille/enfants/${id}`), {
      prenom: form.prenom.trim(),
      ddn: form.ddn,
      poids: [],
    });
    set(ref(db, "nfc/famille/grossesseActive"), false);
    setForm({});
    setModal(null);
    setSection(id);
  }

  return (
    <div className="up">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <PageTitle th={th}>Famille</PageTitle>
        <div style={{ display: "flex", gap: 8 }}>
          {!grossesseActive && (
            <button
              className="btn t"
              onClick={() => {
                set(ref(db, "nfc/famille/grossesseActive"), true);
                setSection("grossesse");
              }}
              style={{
                color: th.sub,
                fontSize: 13,
                fontWeight: 600,
                border: `1px solid ${th.border}`,
                borderRadius: 10,
                padding: "8px 12px",
                background: th.card,
              }}
            >
              + Grossesse
            </button>
          )}
          <PrimaryBtnSmall
            th={th}
            label="+ Enfant"
            onClick={() => {
              setForm({});
              setModal("addEnfant");
            }}
          />
        </div>
      </div>

      {/* Nav tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 18,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {navTabs.map((t) => (
          <button
            key={t.id}
            className="btn t"
            onClick={() => setSection(t.id)}
            style={{
              flexShrink: 0,
              padding: "11px 18px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              background: activeId === t.id ? th.text : th.card,
              color: activeId === t.id ? th.bg : th.sub,
              border: `1px solid ${activeId === t.id ? th.text : th.border}`,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Profil enfant */}
      {enfantActuel && (
        <>
          <Tile th={th} style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 22,
                    color: th.text,
                  }}
                >
                  {enfantActuel.prenom}
                </div>
                <div style={{ fontSize: 15, color: th.sub, marginTop: 2 }}>
                  {ageEnfant(enfantActuel.ddn) || "—"}
                </div>
              </div>
              <button
                className="btn"
                onClick={() => setConfirmSuppr(enfantActuel.id)}
              >
                <Icon name="trash" size={18} color={th.sub} />
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <InfoBox
                th={th}
                label="Naissance"
                value={
                  enfantActuel.ddn
                    ? new Date(enfantActuel.ddn).toLocaleDateString("fr")
                    : "—"
                }
              />
              {dernierPoids && (
                <InfoBox
                  th={th}
                  label="Dernier poids"
                  value={`${dernierPoids.poids} kg`}
                  sub={formatDate(dernierPoids.date)}
                />
              )}
              {dernierPoids?.taille && (
                <InfoBox
                  th={th}
                  label="Taille"
                  value={`${dernierPoids.taille} cm`}
                  sub={formatDate(dernierPoids.date)}
                />
              )}
            </div>
          </Tile>

          <Tile th={th} style={{ marginBottom: 12 }}>
            <SectionHead
              th={th}
              label="Suivi poids / taille"
              action="+ RDV pédiatre"
              onAction={() => {
                setForm({ date: new Date().toISOString().split("T")[0] });
                setModal("poids");
              }}
            />
            {!enfantActuel.poids?.length && (
              <div
                style={{
                  fontSize: 14,
                  color: th.sub,
                  textAlign: "center",
                  padding: "12px 0",
                }}
              >
                Aucune donnée
              </div>
            )}
            {[...(enfantActuel.poids || [])]
              .reverse()
              .slice(0, 6)
              .map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "11px 0",
                    borderBottom: `1px solid ${th.border}`,
                  }}
                >
                  <span style={{ fontSize: 14, color: th.sub }}>
                    {new Date(p.date).toLocaleDateString("fr")}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{ fontSize: 15, fontWeight: 700, color: th.text }}
                    >
                      {p.poids} kg
                    </div>
                    {p.taille && (
                      <div style={{ fontSize: 13, color: th.sub }}>
                        {p.taille} cm
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </Tile>

          <Tile th={th}>
            <SectionHead
              th={th}
              label="Médicaments récents"
              action="Donner"
              onAction={() => {
                setForm({ enfant: enfantActuel.prenom });
                setModal("medicament");
              }}
            />
            {!medsArr.filter((m) => m.enfant === enfantActuel.prenom)
              .length && (
              <div
                style={{
                  fontSize: 14,
                  color: th.sub,
                  textAlign: "center",
                  padding: "10px 0",
                }}
              >
                Aucun enregistrement
              </div>
            )}
            {medsArr
              .filter((m) => m.enfant === enfantActuel.prenom)
              .slice(0, 5)
              .map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "11px 0",
                    borderBottom: `1px solid ${th.border}`,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 15, fontWeight: 600, color: th.text }}
                    >
                      {m.medicament}
                    </div>
                    <div style={{ fontSize: 13, color: th.sub }}>{m.dose}</div>
                  </div>
                  <span style={{ fontSize: 13, color: th.sub }}>
                    {timeAgo(m.ts)}
                  </span>
                </div>
              ))}
          </Tile>
        </>
      )}

      {/* Grossesse */}
      {activeId === "grossesse" && grossesseActive && (
        <>
          <Tile th={th} style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22,
                  color: th.text,
                }}
              >
                Grossesse
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                <button
                  className="btn"
                  onClick={() => {
                    setForm({ dpa: grossesse.dpa || "" });
                    setModal("grossesse");
                  }}
                  style={{ color: th.accent, fontSize: 14, fontWeight: 600 }}
                >
                  Modifier
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    set(ref(db, "nfc/famille/grossesseActive"), false);
                    setSection(enfantsArr[0]?.id || "notes");
                  }}
                  style={{ color: th.danger, fontSize: 14, fontWeight: 600 }}
                >
                  Désactiver
                </button>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <InfoBox
                th={th}
                label="Semaine"
                value={sw !== null ? `SA ${sw}` : "—"}
              />
              <InfoBox
                th={th}
                label="Terme prévu"
                value={
                  grossesse.dpa
                    ? new Date(grossesse.dpa).toLocaleDateString("fr")
                    : "—"
                }
              />
              {sw !== null && (
                <InfoBox
                  th={th}
                  label="Trimestre"
                  value={sw < 13 ? "1er T." : sw < 27 ? "2ème T." : "3ème T."}
                />
              )}
              {sw !== null && (
                <InfoBox
                  th={th}
                  label="Restant"
                  value={`${Math.max(0, 280 - sw * 7)} jours`}
                />
              )}
            </div>
            {sw !== null && (
              <div
                style={{
                  background: dark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.07)",
                  borderRadius: 99,
                  height: 5,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: th.accent,
                    width: `${Math.min(100, (sw / 42) * 100)}%`,
                    height: "100%",
                    borderRadius: 99,
                    transition: "width 0.6s",
                  }}
                />
              </div>
            )}
            <button
              className="btn t"
              onClick={() => {
                setForm({});
                setModal("convertir");
              }}
              style={{
                width: "100%",
                marginTop: 18,
                padding: 14,
                borderRadius: 12,
                background: th.accentBg,
                color: th.accent,
                fontSize: 15,
                fontWeight: 700,
                border: `1px solid ${th.accent}30`,
              }}
            >
              Bébé est né — Créer le profil
            </button>
          </Tile>

          <Tile th={th}>
            <SectionHead
              th={th}
              label="Notes grossesse"
              action="Ajouter"
              onAction={() => {
                setForm({});
                setModal("noteGrossesse");
              }}
            />
            {!(grossesse.notes?.length > 0) && (
              <div
                style={{
                  fontSize: 14,
                  color: th.sub,
                  textAlign: "center",
                  padding: "12px 0",
                }}
              >
                Aucune note
              </div>
            )}
            {[...(grossesse.notes || [])].reverse().map((n, i) => (
              <div
                key={i}
                style={{
                  padding: "11px 0",
                  borderBottom: `1px solid ${th.border}`,
                }}
              >
                <div style={{ fontSize: 15, color: th.text, fontWeight: 500 }}>
                  {n.note}
                </div>
                <div style={{ fontSize: 12, color: th.sub, marginTop: 3 }}>
                  {n.date}
                </div>
              </div>
            ))}
          </Tile>
        </>
      )}

      {/* Médicaments */}
      {activeId === "medicaments" && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: th.sub }}>
              Historique
            </div>
            <PrimaryBtnSmall
              th={th}
              label="Donner"
              onClick={() => {
                setForm({});
                setModal("medicament");
              }}
            />
          </div>
          {!medsArr.length && (
            <EmptyState
              th={th}
              title="Aucun médicament"
              sub="Enregistrez les médicaments donnés"
            />
          )}
          {medsArr.map((m) => (
            <div
              key={m.id}
              style={{
                background: th.card,
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 8,
                border: `1px solid ${th.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 16, fontWeight: 600, color: th.text }}
                  >
                    {m.medicament}
                  </div>
                  <div style={{ fontSize: 13, color: th.sub, marginTop: 3 }}>
                    {m.enfant} · {m.dose} ·{" "}
                    {m.par === "abdullah" ? "Abdullah" : "Pranvera"}
                  </div>
                  <div style={{ fontSize: 12, color: th.sub, marginTop: 2 }}>
                    {timeAgo(m.ts)}
                  </div>
                </div>
                <button
                  className="btn"
                  onClick={() => remove(ref(db, `nfc/medicaments/${m.id}`))}
                >
                  <Icon name="trash" size={16} color={th.sub} />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Notes partagées */}
      {activeId === "notes" && (
        <Tile th={th}>
          <SectionHead th={th} label="Notes partagées" />
          <textarea
            value={notesLocal}
            onChange={(e) => handleNotes(e.target.value)}
            placeholder="Notes libres synchronisées entre vous deux..."
            style={{
              ...inputStyle(th),
              minHeight: 260,
              resize: "none",
              marginTop: 8,
            }}
          />
          <div style={{ fontSize: 12, color: th.sub, marginTop: 8 }}>
            Sauvegarde automatique
          </div>
        </Tile>
      )}

      {/* Sheets */}
      {modal === "addEnfant" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>Ajouter un enfant</SheetTitle>
          <FLabel th={th}>Prénom</FLabel>
          <input
            value={form.prenom || ""}
            onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))}
            placeholder="Ex: Ibrahim"
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <FLabel th={th}>Date de naissance</FLabel>
          <input
            type="date"
            value={form.ddn || ""}
            onChange={(e) => setForm((f) => ({ ...f, ddn: e.target.value }))}
            style={{ ...inputStyle(th), marginBottom: 18 }}
          />
          <PrimaryBtn
            th={th}
            label="Ajouter"
            onClick={ajouterEnfant}
            disabled={!form.prenom || !form.ddn}
          />
        </Sheet>
      )}

      {modal === "poids" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>RDV pédiatre — {enfantActuel?.prenom}</SheetTitle>
          <FLabel th={th}>Date</FLabel>
          <input
            type="date"
            value={form.date || ""}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div>
              <FLabel th={th}>Poids (kg)</FLabel>
              <input
                type="number"
                step="0.1"
                value={form.poids || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, poids: e.target.value }))
                }
                placeholder="0.0"
                style={inputStyle(th)}
              />
            </div>
            <div>
              <FLabel th={th}>Taille (cm)</FLabel>
              <input
                type="number"
                value={form.taille || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, taille: e.target.value }))
                }
                placeholder="0"
                style={inputStyle(th)}
              />
            </div>
          </div>
          <FLabel th={th}>Notes</FLabel>
          <input
            value={form.notes || ""}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Observations..."
            style={{ ...inputStyle(th), marginBottom: 18 }}
          />
          <PrimaryBtn
            th={th}
            label="Enregistrer"
            onClick={ajouterPoids}
            disabled={!form.poids || !form.date}
          />
        </Sheet>
      )}

      {modal === "medicament" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>Médicament donné</SheetTitle>
          <FLabel th={th}>Enfant</FLabel>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {enfantsArr.map((e) => (
              <button
                key={e.id}
                className="btn t"
                onClick={() => setForm((f) => ({ ...f, enfant: e.prenom }))}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 12,
                  fontSize: 14,
                  border: `1.5px solid ${
                    form.enfant === e.prenom ? th.text : th.border
                  }`,
                  background:
                    form.enfant === e.prenom ? th.text : "transparent",
                  color: form.enfant === e.prenom ? th.bg : th.sub,
                  fontWeight: 600,
                }}
              >
                {e.prenom}
              </button>
            ))}
          </div>
          <FLabel th={th}>Médicament</FLabel>
          <input
            value={form.medicament || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, medicament: e.target.value }))
            }
            placeholder="Ex: Dafalgan, Nurofen..."
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <FLabel th={th}>Dose</FLabel>
          <input
            value={form.dose || ""}
            onChange={(e) => setForm((f) => ({ ...f, dose: e.target.value }))}
            placeholder="Ex: 180mg, 5ml..."
            style={{ ...inputStyle(th), marginBottom: 18 }}
          />
          <PrimaryBtn
            th={th}
            label="Enregistrer"
            onClick={ajouterMedicament}
            disabled={!form.medicament || !form.enfant}
          />
        </Sheet>
      )}

      {modal === "grossesse" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>Date prévue d'accouchement</SheetTitle>
          <FLabel th={th}>DPA</FLabel>
          <input
            type="date"
            defaultValue={grossesse.dpa || ""}
            onChange={(e) => setForm((f) => ({ ...f, dpa: e.target.value }))}
            style={{ ...inputStyle(th), marginBottom: 18 }}
          />
          <PrimaryBtn
            th={th}
            label="Enregistrer"
            onClick={() => {
              set(ref(db, "nfc/famille/grossesse"), { ...grossesse, ...form });
              setModal(null);
            }}
          />
        </Sheet>
      )}

      {modal === "noteGrossesse" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>Nouvelle note</SheetTitle>
          <textarea
            autoFocus
            value={form.note || ""}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            placeholder="Ex: Écho morphologique OK, bébé en bonne santé..."
            style={{
              ...inputStyle(th),
              minHeight: 120,
              resize: "none",
              marginBottom: 18,
            }}
          />
          <PrimaryBtn
            th={th}
            label="Enregistrer"
            onClick={ajouterNoteGrossesse}
            disabled={!form.note?.trim()}
          />
        </Sheet>
      )}

      {modal === "convertir" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>Bébé est né !</SheetTitle>
          <FLabel th={th}>Prénom</FLabel>
          <input
            value={form.prenom || ""}
            onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))}
            placeholder="Prénom"
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <FLabel th={th}>Date de naissance</FLabel>
          <input
            type="date"
            value={form.ddn || ""}
            onChange={(e) => setForm((f) => ({ ...f, ddn: e.target.value }))}
            style={{ ...inputStyle(th), marginBottom: 18 }}
          />
          <PrimaryBtn
            th={th}
            label="Créer le profil"
            onClick={convertirEnEnfant}
            disabled={!form.prenom || !form.ddn}
          />
        </Sheet>
      )}

      {confirmSuppr && (
        <ConfirmSheet
          th={th}
          title={`Supprimer le profil de ${enfantActuel?.prenom} ?`}
          sub="Toutes les données seront effacées."
          onCancel={() => setConfirmSuppr(null)}
          onConfirm={() => {
            remove(ref(db, `nfc/famille/enfants/${confirmSuppr}`));
            setConfirmSuppr(null);
            setSection(null);
          }}
          confirmLabel="Supprimer"
          danger
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FINANCES
// ─────────────────────────────────────────────────────────────
const FACTURE_CATS = [
  { id: "loyer", label: "Loyer" },
  { id: "assurance", label: "Assurance" },
  { id: "electricite", label: "Électricité" },
  { id: "internet", label: "Internet / Téléphone" },
  { id: "abonnement", label: "Abonnement" },
  { id: "impots", label: "Impôts" },
  { id: "sante", label: "Santé" },
  { id: "autre", label: "Autre" },
];

function FinancesTab({
  th,
  dark,
  profil,
  finances,
  setFinances,
  budget,
  depenses,
  setDepenses,
}) {
  const [vue, setVue] = useState("aPayer");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [confirmDel, setConfirmDel] = useState(null);
  const [searchFact, setSearchFact] = useState("");
  const now = new Date();
  const [moisSel, setMoisSel] = useState(now.getMonth());
  const [anneeSel, setAnneeSel] = useState(now.getFullYear());
  const estMoisCourant =
    moisSel === now.getMonth() && anneeSel === now.getFullYear();

  function navMois(dir) {
    let m = moisSel + dir,
      a = anneeSel;
    if (m < 0) {
      m = 11;
      a--;
    }
    if (m > 11) {
      m = 0;
      a++;
    }
    setMoisSel(m);
    setAnneeSel(a);
  }

  const salaireFixe = finances?.salaireFixe || { abdullah: 0, pranvera: 0 };
  const allSalaires = Object.entries(finances?.salaires || {})
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const allFactures = Object.entries(finances?.factures || {})
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => new Date(a.echeance) - new Date(b.echeance));

  // Pour le mois sélectionné
  const salaires = allSalaires.filter((s) => {
    const d = new Date(s.date);
    return d.getMonth() === moisSel && d.getFullYear() === anneeSel;
  });
  const facturesMois = allFactures.filter((f) => {
    const d = new Date(f.echeance);
    return d.getMonth() === moisSel && d.getFullYear() === anneeSel;
  });
  const aPayerArr = facturesMois.filter((f) => !f.payee);
  const payeesArr = facturesMois
    .filter((f) => f.payee)
    .sort(
      (a, b) =>
        new Date(b.datePaiement || b.echeance) -
        new Date(a.datePaiement || a.echeance)
    );

  // Revenus : salaires saisis OU salaire fixe si aucun saisi ce mois
  const totalSalaireSaisi = salaires.reduce(
    (sum, s) => sum + (parseFloat(s.montant) || 0),
    0
  );
  const totalSalaireFixe =
    (parseFloat(salaireFixe.abdullah) || 0) +
    (parseFloat(salaireFixe.pranvera) || 0);
  const useSalaireFixe = totalSalaireSaisi === 0 && totalSalaireFixe > 0;
  const totalSalaireMois = useSalaireFixe
    ? totalSalaireFixe
    : totalSalaireSaisi;
  const totalFacturesMois = facturesMois.reduce(
    (sum, f) => sum + (parseFloat(f.montant) || 0),
    0
  );
  const totalPayesMois = payeesArr.reduce(
    (sum, f) => sum + (parseFloat(f.montant) || 0),
    0
  );
  // Courses : budget du mois courant uniquement
  const depenseCourses = estMoisCourant ? parseFloat(budget?.depense) || 0 : 0;
  const totalCharges = totalPayesMois + depenseCourses;

  // Urgences toujours basées sur le temps réel
  const urgentes = allFactures.filter((f) => {
    if (f.payee || !f.echeance) return false;
    const diff = new Date(f.echeance) - new Date();
    return diff >= 0 && diff < 7 * 24 * 3600000;
  });
  const enRetardFact = allFactures.filter(
    (f) => !f.payee && f.echeance && new Date(f.echeance) < new Date()
  );
  // Recherche
  const aPayerFiltrees = searchFact
    ? aPayerArr.filter((f) =>
        f.titre?.toLowerCase().includes(searchFact.toLowerCase())
      )
    : [];
  const payeesFiltrees = searchFact
    ? payeesArr.filter((f) =>
        f.titre?.toLowerCase().includes(searchFact.toLowerCase())
      )
    : payeesArr;
  // Dépenses diverses
  const allDepenses = Object.entries(depenses || {})
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const depensesMois = allDepenses.filter((d) => {
    const dt = new Date(d.date);
    return dt.getMonth() === moisSel && dt.getFullYear() === anneeSel;
  });
  const totalDepensesMois = depensesMois.reduce(
    (s, d) => s + (parseFloat(d.montant) || 0),
    0
  );
  const totalChargesAvecDep =
    totalPayesMois + depenseCourses + totalDepensesMois;
  const soldeEstimeTotal = totalSalaireMois - totalChargesAvecDep;

  function ajouterSalaire() {
    if (!form.montant || !form.date || !form.profil_s) return;
    set(ref(db, `nfc/finances/salaires/s_${Date.now()}`), {
      ...form,
      createdAt: Date.now(),
    });
    setForm({});
    setModal(null);
  }
  function ajouterFacture() {
    if (!form.titre || !form.montant) return;
    set(ref(db, `nfc/finances/factures/f_${Date.now()}`), {
      ...form,
      titre: form.titre.trim(),
      montant: parseFloat(form.montant),
      payee: false,
      createdAt: Date.now(),
    });
    setForm({});
    setModal(null);
  }
  function marquerPayee(f) {
    update(ref(db, `nfc/finances/factures/${f.id}`), {
      payee: true,
      datePaiement: new Date().toISOString().split("T")[0],
    });
    if (f.recurrente) {
      const next = new Date(f.echeance || new Date());
      if (f.frequence === "mensuelle") next.setMonth(next.getMonth() + 1);
      else if (f.frequence === "trimestrielle")
        next.setMonth(next.getMonth() + 3);
      else next.setFullYear(next.getFullYear() + 1);
      const { id: _id, payee: _p, datePaiement: _dp, ...rest } = f;
      set(ref(db, `nfc/finances/factures/f_${Date.now()}`), {
        ...rest,
        payee: false,
        echeance: next.toISOString().split("T")[0],
      });
    }
  }
  function rouvrirFacture(f) {
    update(ref(db, `nfc/finances/factures/${f.id}`), {
      payee: false,
      datePaiement: null,
    });
  }

  function FactureCard({ f, showPay = true, onDuplicate }) {
    const cat = FACTURE_CATS.find((c) => c.id === f.categorie);
    const retard = !f.payee && f.echeance && new Date(f.echeance) < new Date();
    const urgent = !f.payee && !retard && urgentes.find((u) => u.id === f.id);
    const borderColor = retard ? th.danger : urgent ? th.warn : th.border;
    return (
      <div
        style={{
          background: th.card,
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 8,
          border: `1px solid ${borderColor}`,
          borderLeft: f.payee
            ? `1px solid ${th.border}`
            : `3px solid ${borderColor}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: f.payee ? th.sub : th.text,
                }}
              >
                {f.titre}
              </span>
              {f.recurrente && (
                <span
                  style={{ fontSize: 12, color: th.accent, fontWeight: 600 }}
                >
                  ↻ {f.frequence}
                </span>
              )}
            </div>
            <div style={{ fontSize: 13, color: th.sub, marginTop: 3 }}>
              {cat?.label}
              {f.echeance && (
                <span
                  style={{
                    color: retard ? th.danger : urgent ? th.warn : th.sub,
                    fontWeight: retard || urgent ? 700 : 400,
                  }}
                >
                  {" "}
                  · {retard ? "En retard — " : ""}
                  {formatDate(f.echeance)}
                </span>
              )}
              {f.payee && f.datePaiement && (
                <span> · Payé le {formatDate(f.datePaiement)}</span>
              )}
            </div>
            {f.notes && (
              <div
                style={{
                  fontSize: 13,
                  color: th.sub,
                  marginTop: 3,
                  fontStyle: "italic",
                }}
              >
                {f.notes}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: f.payee ? th.sub : th.text,
              }}
            >
              {parseFloat(f.montant || 0).toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: th.sub }}>CHF</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 12,
            paddingTop: 10,
            borderTop: `1px solid ${th.border}`,
          }}
        >
          {showPay && !f.payee && (
            <button
              className="btn t"
              onClick={() => marquerPayee(f)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 10,
                background: th.accentBg,
                color: th.accent,
                fontSize: 14,
                fontWeight: 700,
                border: `1px solid ${th.accent}30`,
              }}
            >
              Marquer payée
            </button>
          )}
          {f.payee && (
            <button
              className="btn t"
              onClick={() => rouvrirFacture(f)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 10,
                background: th.card2,
                color: th.sub,
                fontSize: 13,
                border: `1px solid ${th.border}`,
              }}
            >
              Rouvrir
            </button>
          )}
          {onDuplicate && (
            <button
              className="btn t"
              onClick={onDuplicate}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                background: th.card2,
                border: `1px solid ${th.border}`,
                fontSize: 13,
                color: th.sub,
                fontWeight: 600,
              }}
            >
              Copier
            </button>
          )}
          <button
            className="btn"
            onClick={() =>
              setConfirmDel({ id: f.id, titre: f.titre, path: "factures" })
            }
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: th.card2,
              border: `1px solid ${th.border}`,
            }}
          >
            <Icon name="trash" size={15} color={th.sub} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="up">
      {/* Header + sélecteur de mois */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <PageTitle th={th}>Finances</PageTitle>
        {!estMoisCourant && (
          <button
            className="btn t"
            onClick={() => {
              setMoisSel(now.getMonth());
              setAnneeSel(now.getFullYear());
            }}
            style={{
              fontSize: 13,
              color: th.accent,
              fontWeight: 600,
              padding: "6px 12px",
              borderRadius: 10,
              border: `1px solid ${th.accent}30`,
              background: th.accentBg,
            }}
          >
            Aujourd'hui
          </button>
        )}
      </div>

      {/* Navigateur mois */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: th.card,
          borderRadius: 16,
          padding: "14px 16px",
          marginBottom: 14,
          border: `1px solid ${th.border}`,
        }}
      >
        <button
          className="btn t"
          onClick={() => navMois(-1)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: th.card2,
            border: `1px solid ${th.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 22,
              color: th.text,
              letterSpacing: -0.3,
            }}
          >
            {MOIS_LONG[moisSel]}
          </div>
          <div style={{ fontSize: 13, color: th.sub, marginTop: 1 }}>
            {anneeSel}
            {estMoisCourant ? " · Mois en cours" : ""}
          </div>
        </div>
        <button
          className="btn t"
          onClick={() => navMois(1)}
          disabled={estMoisCourant}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: th.card2,
            border: `1px solid ${th.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: estMoisCourant ? 0.3 : 1,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Alertes — toujours basées sur aujourd'hui */}
      {estMoisCourant && (enRetardFact.length > 0 || urgentes.length > 0) && (
        <div
          style={{
            background: enRetardFact.length > 0 ? th.dangerBg : th.warnBg,
            border: `1px solid ${
              enRetardFact.length > 0 ? th.danger + "40" : th.warn + "40"
            }`,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Icon
              name="alertCircle"
              size={18}
              color={enRetardFact.length > 0 ? th.danger : th.warn}
            />
            <div>
              {enRetardFact.length > 0 && (
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: th.danger,
                    marginBottom: 2,
                  }}
                >
                  {enRetardFact.length} facture
                  {enRetardFact.length > 1 ? "s" : ""} en retard
                </div>
              )}
              {urgentes.length > 0 && (
                <div style={{ fontSize: 14, fontWeight: 600, color: th.warn }}>
                  {urgentes.length} facture{urgentes.length > 1 ? "s" : ""} à
                  payer dans les 7 jours
                </div>
              )}
              {[
                ...enRetardFact,
                ...urgentes.filter(
                  (u) => !enRetardFact.find((r) => r.id === u.id)
                ),
              ].map((f) => (
                <div
                  key={f.id}
                  style={{ fontSize: 13, color: th.sub, marginTop: 2 }}
                >
                  · {f.titre} — {parseFloat(f.montant).toFixed(2)} CHF
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overview du mois sélectionné */}
      <Tile th={th} style={{ marginBottom: 14 }}>
        {/* Revenus */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 12,
            borderBottom: `1px solid ${th.border}`,
          }}
        >
          <div>
            <ULabel th={th}>Revenus{useSalaireFixe ? " (fixe)" : ""}</ULabel>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: th.accent,
                marginTop: 4,
              }}
            >
              {totalSalaireMois.toFixed(2)}{" "}
              <span style={{ fontSize: 13, fontWeight: 400, color: th.sub }}>
                CHF
              </span>
            </div>
            {useSalaireFixe && (
              <div style={{ fontSize: 12, color: th.sub, marginTop: 2 }}>
                Abdullah {parseFloat(salaireFixe.abdullah || 0).toFixed(0)} +
                Pranvera {parseFloat(salaireFixe.pranvera || 0).toFixed(0)}
              </div>
            )}
          </div>
          <button
            className="btn t"
            onClick={() => {
              setForm({
                abdullah: salaireFixe.abdullah || "",
                pranvera: salaireFixe.pranvera || "",
              });
              setModal("salaireFixe");
            }}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              background: th.card2,
              border: `1px solid ${th.border}`,
              color: th.sub,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Salaire fixe
          </button>
        </div>

        {/* Factures */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 12,
            paddingBottom: 12,
            borderBottom: `1px solid ${th.border}`,
          }}
        >
          <div>
            <ULabel th={th}>
              Factures
              {payeesArr.length > 0
                ? ` (${payeesArr.length} payée${
                    payeesArr.length > 1 ? "s" : ""
                  })`
                : ""}
            </ULabel>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: totalFacturesMois > 0 ? th.danger : th.sub,
                marginTop: 4,
              }}
            >
              {totalFacturesMois.toFixed(2)}{" "}
              <span style={{ fontSize: 13, fontWeight: 400, color: th.sub }}>
                CHF
              </span>
            </div>
          </div>
          {aPayerArr.length > 0 && (
            <div
              style={{
                padding: "6px 12px",
                borderRadius: 10,
                background: th.dangerBg,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: th.danger }}>
                {aPayerArr.length} restante{aPayerArr.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Courses — mois courant uniquement */}
        {estMoisCourant && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 12,
              paddingBottom: 12,
              borderBottom: `1px solid ${th.border}`,
            }}
          >
            <div>
              <ULabel th={th}>Courses ({MOIS[moisSel]})</ULabel>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: depenseCourses > 0 ? th.warn : th.sub,
                  marginTop: 4,
                }}
              >
                {depenseCourses.toFixed(2)}{" "}
                <span style={{ fontSize: 13, fontWeight: 400, color: th.sub }}>
                  / {budget?.mensuel || 800} CHF
                </span>
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: th.card2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color:
                    depenseCourses / (budget?.mensuel || 800) > 0.8
                      ? th.danger
                      : th.sub,
                }}
              >
                {Math.round((depenseCourses / (budget?.mensuel || 800)) * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Dépenses diverses */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 12,
            paddingBottom: 12,
            borderBottom: `1px solid ${th.border}`,
          }}
        >
          <div>
            <ULabel th={th}>Dépenses diverses</ULabel>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: totalDepensesMois > 0 ? th.warn : th.sub,
                marginTop: 4,
              }}
            >
              {totalDepensesMois.toFixed(2)}{" "}
              <span style={{ fontSize: 13, fontWeight: 400, color: th.sub }}>
                CHF
              </span>
            </div>
            <div style={{ fontSize: 12, color: th.sub, marginTop: 2 }}>
              {depensesMois.length} dépense
              {depensesMois.length !== 1 ? "s" : ""}
            </div>
          </div>
          <button
            className="btn t"
            onClick={() => setVue("depenses")}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              background: th.card2,
              border: `1px solid ${th.border}`,
              color: th.sub,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Voir
          </button>
        </div>

        {/* Solde */}
        <div style={{ paddingTop: 14 }}>
          <ULabel th={th}>Solde estimé</ULabel>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color:
                totalSalaireMois === 0
                  ? th.sub
                  : soldeEstimeTotal >= 0
                  ? th.accent
                  : th.danger,
              letterSpacing: -0.5,
              marginTop: 4,
            }}
          >
            {totalSalaireMois === 0
              ? "—"
              : `${soldeEstimeTotal >= 0 ? "+" : ""}${soldeEstimeTotal.toFixed(
                  2
                )} CHF`}
          </div>
          {totalSalaireMois > 0 && (
            <div style={{ fontSize: 13, color: th.sub, marginTop: 3 }}>
              Revenus − factures − courses − dépenses
            </div>
          )}
        </div>
      </Tile>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 18,
          overflowX: "auto",
          paddingBottom: 2,
        }}
      >
        {[
          ["aPayer", `À payer (${aPayerArr.length})`],
          ["payees", `Payées (${payeesArr.length})`],
          ["salaires", `Salaires (${salaires.length})`],
          ["depenses", `Dépenses (${depensesMois.length})`],
          ["annuel", "Annuel"],
        ].map(([id, label]) => (
          <button
            key={id}
            className="btn t"
            onClick={() => setVue(id)}
            style={{
              flexShrink: 0,
              padding: "11px 18px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              background: vue === id ? th.text : th.card,
              color: vue === id ? th.bg : th.sub,
              border: `1px solid ${vue === id ? th.text : th.border}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Taux d'endettement */}
      {totalSalaireMois > 0 && (
        <div
          style={{
            background: th.card,
            borderRadius: 14,
            padding: "13px 16px",
            marginBottom: 14,
            border: `1px solid ${th.border}`,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: th.sub,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 6,
              }}
            >
              Taux de charges
            </div>
            <div
              style={{
                background: dark
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(0,0,0,0.07)",
                borderRadius: 99,
                height: 6,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background:
                    totalChargesAvecDep / totalSalaireMois > 0.8
                      ? th.danger
                      : totalChargesAvecDep / totalSalaireMois > 0.6
                      ? th.warn
                      : th.accent,
                  width: `${Math.min(
                    100,
                    (totalChargesAvecDep / totalSalaireMois) * 100
                  ).toFixed(0)}%`,
                  height: "100%",
                  borderRadius: 99,
                  transition: "width 0.6s",
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color:
                  totalChargesAvecDep / totalSalaireMois > 0.8
                    ? th.danger
                    : totalChargesAvecDep / totalSalaireMois > 0.6
                    ? th.warn
                    : th.accent,
              }}
            >
              {Math.min(
                100,
                (totalChargesAvecDep / totalSalaireMois) * 100
              ).toFixed(0)}
              %
            </div>
            <div style={{ fontSize: 11, color: th.sub }}>des revenus</div>
          </div>
        </div>
      )}

      {/* Recherche */}
      {(vue === "aPayer" || vue === "payees") && (
        <SearchBar
          th={th}
          value={searchFact}
          onChange={setSearchFact}
          style={{ marginBottom: 14 }}
        />
      )}

      {/* À payer */}
      {vue === "aPayer" && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 14, color: th.sub }}>
              {aPayerFiltrees.length > 0
                ? `Total : ${aPayerFiltrees
                    .reduce((s, f) => s + (parseFloat(f.montant) || 0), 0)
                    .toFixed(2)} CHF`
                : searchFact
                ? "Aucun résultat"
                : "Rien à payer"}
            </div>
            <PrimaryBtnSmall
              th={th}
              label="+ Facture"
              onClick={() => {
                setForm({
                  categorie: "autre",
                  recurrente: false,
                  frequence: "mensuelle",
                });
                setModal("facture");
              }}
            />
          </div>
          {!aPayerFiltrees.length && (
            <EmptyState
              th={th}
              title={
                searchFact
                  ? "Aucune facture trouvée"
                  : "Aucune facture en attente"
              }
              sub={searchFact ? "" : "Tout est à jour !"}
            />
          )}
          {!searchFact &&
            enRetardFact.filter((f) =>
              facturesMois.find((fm) => fm.id === f.id)
            ).length > 0 && (
              <>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: th.danger,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  En retard
                </div>
                {enRetardFact
                  .filter((f) => facturesMois.find((fm) => fm.id === f.id))
                  .map((f) => (
                    <FactureCard
                      key={f.id}
                      f={f}
                      onDuplicate={() => {
                        const {
                          id: _,
                          payee: _p,
                          datePaiement: _dp,
                          ...rest
                        } = f;
                        setForm({
                          ...rest,
                          echeance: "",
                          titre: f.titre + " (copie)",
                        });
                        setModal("facture");
                      }}
                    />
                  ))}
              </>
            )}
          {!searchFact &&
            urgentes.filter(
              (u) =>
                !enRetardFact.find((r) => r.id === u.id) &&
                facturesMois.find((fm) => fm.id === u.id)
            ).length > 0 && (
              <>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: th.warn,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    marginBottom: 8,
                    marginTop: 12,
                  }}
                >
                  Dans les 7 jours
                </div>
                {urgentes
                  .filter(
                    (u) =>
                      !enRetardFact.find((r) => r.id === u.id) &&
                      facturesMois.find((fm) => fm.id === u.id)
                  )
                  .map((f) => (
                    <FactureCard
                      key={f.id}
                      f={f}
                      onDuplicate={() => {
                        const {
                          id: _,
                          payee: _p,
                          datePaiement: _dp,
                          ...rest
                        } = f;
                        setForm({
                          ...rest,
                          echeance: "",
                          titre: f.titre + " (copie)",
                        });
                        setModal("facture");
                      }}
                    />
                  ))}
              </>
            )}
          {(searchFact
            ? aPayerFiltrees
            : aPayerArr.filter(
                (f) =>
                  !enRetardFact.find((r) => r.id === f.id) &&
                  !urgentes.find((u) => u.id === f.id)
              )
          ).length > 0 && (
            <>
              {!searchFact && (
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: th.sub,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    marginBottom: 8,
                    marginTop: 12,
                  }}
                >
                  À venir
                </div>
              )}
              {(searchFact
                ? aPayerFiltrees
                : aPayerArr.filter(
                    (f) =>
                      !enRetardFact.find((r) => r.id === f.id) &&
                      !urgentes.find((u) => u.id === f.id)
                  )
              ).map((f) => (
                <FactureCard
                  key={f.id}
                  f={f}
                  onDuplicate={() => {
                    const { id: _, payee: _p, datePaiement: _dp, ...rest } = f;
                    setForm({
                      ...rest,
                      echeance: "",
                      titre: f.titre + " (copie)",
                    });
                    setModal("facture");
                  }}
                />
              ))}
            </>
          )}
        </>
      )}

      {/* Payées */}
      {vue === "payees" && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 14, color: th.sub }}>
              {payeesArr.length > 0
                ? `Total payé : ${totalPayesMois.toFixed(2)} CHF`
                : "Aucun historique"}
            </div>
            <PrimaryBtnSmall
              th={th}
              label="+ Facture"
              onClick={() => {
                setForm({
                  categorie: "autre",
                  recurrente: false,
                  frequence: "mensuelle",
                  payee: true,
                  datePaiement: new Date().toISOString().split("T")[0],
                });
                setModal("facture");
              }}
            />
          </div>
          {!payeesFiltrees.length && (
            <EmptyState
              th={th}
              title={
                searchFact ? "Aucune facture trouvée" : "Aucune facture payée"
              }
              sub=""
            />
          )}
          {payeesFiltrees.map((f) => (
            <FactureCard
              key={f.id}
              f={f}
              showPay={false}
              onDuplicate={() => {
                const { id: _, payee: _p, datePaiement: _dp, ...rest } = f;
                setForm({ ...rest, echeance: "", titre: f.titre + " (copie)" });
                setModal("facture");
              }}
            />
          ))}
        </>
      )}

      {/* Salaires */}
      {vue === "salaires" && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 14, color: th.sub }}>
              Revenus enregistrés ce mois
            </div>
            <PrimaryBtnSmall
              th={th}
              label="+ Salaire"
              onClick={() => {
                setForm({
                  profil_s: profil,
                  date: new Date().toISOString().split("T")[0],
                });
                setModal("salaire");
              }}
            />
          </div>
          {useSalaireFixe && (
            <div
              style={{
                background: th.accentBg,
                border: `1px solid ${th.accent}30`,
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: th.accent,
                  marginBottom: 4,
                }}
              >
                Salaire fixe actif
              </div>
              <div style={{ fontSize: 13, color: th.sub }}>
                Abdullah : {parseFloat(salaireFixe.abdullah || 0).toFixed(2)}{" "}
                CHF · Pranvera :{" "}
                {parseFloat(salaireFixe.pranvera || 0).toFixed(2)} CHF
              </div>
              <div style={{ fontSize: 13, color: th.sub, marginTop: 2 }}>
                Total : {totalSalaireFixe.toFixed(2)} CHF / mois
              </div>
              <button
                className="btn t"
                onClick={() => {
                  setForm({
                    abdullah: salaireFixe.abdullah || "",
                    pranvera: salaireFixe.pranvera || "",
                  });
                  setModal("salaireFixe");
                }}
                style={{
                  marginTop: 10,
                  padding: "8px 14px",
                  borderRadius: 10,
                  background: th.card,
                  border: `1px solid ${th.border}`,
                  color: th.text,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Modifier le fixe
              </button>
            </div>
          )}
          {!salaires.length && !useSalaireFixe && (
            <EmptyState
              th={th}
              title="Aucun salaire enregistré"
              sub="Ajoutez vos revenus ou configurez un salaire fixe"
            />
          )}
          {salaires.map((s) => (
            <div
              key={s.id}
              style={{
                background: th.card,
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 8,
                border: `1px solid ${th.border}`,
                borderLeft: `3px solid ${th.accent}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 16, fontWeight: 600, color: th.text }}
                  >
                    {s.profil_s === "abdullah" ? "Abdullah" : "Pranvera"}
                  </div>
                  <div style={{ fontSize: 13, color: th.sub, marginTop: 3 }}>
                    {s.date ? formatDate(s.date) : "—"}
                    {s.notes ? ` · ${s.notes}` : ""}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{ fontSize: 20, fontWeight: 700, color: th.accent }}
                  >
                    +{parseFloat(s.montant || 0).toFixed(2)}
                  </div>
                  <div style={{ fontSize: 12, color: th.sub }}>CHF</div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  paddingTop: 8,
                  borderTop: `1px solid ${th.border}`,
                }}
              >
                <button
                  className="btn"
                  onClick={() =>
                    setConfirmDel({
                      id: s.id,
                      titre:
                        s.profil_s === "abdullah"
                          ? "salaire Abdullah"
                          : "salaire Pranvera",
                      path: "salaires",
                    })
                  }
                >
                  <Icon name="trash" size={15} color={th.sub} />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Dépenses diverses */}
      {vue === "depenses" &&
        (() => {
          const DEP_CATS = [
            { id: "resto", label: "Restos & sorties", color: "#f97316" },
            { id: "vetements", label: "Vêtements", color: "#8b5cf6" },
            { id: "loisirs", label: "Loisirs", color: "#06b6d4" },
            { id: "transport", label: "Transport", color: "#64748b" },
            { id: "sante", label: "Santé", color: "#ec4899" },
            { id: "cadeaux", label: "Cadeaux", color: "#f59e0b" },
            { id: "enfants", label: "Enfants", color: "#22c55e" },
            { id: "hightech", label: "High-tech", color: "#6366f1" },
            { id: "sport", label: "Sport", color: "#14b8a6" },
            { id: "autre", label: "Autre", color: "#71717a" },
          ];
          const totalAbd = depensesMois
            .filter((d) => d.par === "abdullah")
            .reduce((s, d) => s + (parseFloat(d.montant) || 0), 0);
          const totalPrv = depensesMois
            .filter((d) => d.par === "pranvera")
            .reduce((s, d) => s + (parseFloat(d.montant) || 0), 0);
          const parCat = DEP_CATS.map((c) => ({
            ...c,
            total: depensesMois
              .filter((d) => d.categorie === c.id)
              .reduce((s, d) => s + (parseFloat(d.montant) || 0), 0),
            items: depensesMois.filter((d) => d.categorie === c.id),
          }))
            .filter((c) => c.total > 0)
            .sort((a, b) => b.total - a.total);
          return (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 14, color: th.sub }}>
                  Total :{" "}
                  <span style={{ fontWeight: 700, color: th.text }}>
                    {totalDepensesMois.toFixed(2)} CHF
                  </span>
                </div>
                <PrimaryBtnSmall
                  th={th}
                  label="+ Dépense"
                  onClick={() => {
                    setForm({
                      par: profil,
                      date: new Date().toISOString().split("T")[0],
                      categorie: "autre",
                    });
                    setModal("depense");
                  }}
                />
              </div>

              {!depensesMois.length && (
                <EmptyState
                  th={th}
                  title="Aucune dépense ce mois"
                  sub="Ajoutez vos achats et sorties"
                />
              )}

              {depensesMois.length > 0 && (
                <>
                  {/* Répartition par personne */}
                  <Tile th={th} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: th.sub,
                        marginBottom: 12,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Par personne
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          background: th.card2,
                          borderRadius: 12,
                          padding: "12px 14px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            color: th.sub,
                            marginBottom: 4,
                          }}
                        >
                          Abdullah
                        </div>
                        <div
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: th.text,
                          }}
                        >
                          {totalAbd.toFixed(2)}
                        </div>
                        <div style={{ fontSize: 12, color: th.sub }}>CHF</div>
                      </div>
                      <div
                        style={{
                          background: th.card2,
                          borderRadius: 12,
                          padding: "12px 14px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            color: th.sub,
                            marginBottom: 4,
                          }}
                        >
                          Pranvera
                        </div>
                        <div
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: th.text,
                          }}
                        >
                          {totalPrv.toFixed(2)}
                        </div>
                        <div style={{ fontSize: 12, color: th.sub }}>CHF</div>
                      </div>
                    </div>
                  </Tile>

                  {/* Répartition par catégorie */}
                  {parCat.length > 0 && (
                    <Tile th={th} style={{ marginBottom: 14 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: th.sub,
                          marginBottom: 14,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Par catégorie
                      </div>
                      {parCat.map((c) => (
                        <div key={c.id} style={{ marginBottom: 12 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 5,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: th.text,
                              }}
                            >
                              {c.label}
                            </span>
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: th.text,
                              }}
                            >
                              {c.total.toFixed(2)} CHF
                            </span>
                          </div>
                          <div
                            style={{
                              background: dark
                                ? "rgba(255,255,255,0.07)"
                                : "rgba(0,0,0,0.07)",
                              borderRadius: 99,
                              height: 5,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                background: c.color,
                                width: `${Math.min(
                                  100,
                                  (c.total / totalDepensesMois) * 100
                                ).toFixed(0)}%`,
                                height: "100%",
                                borderRadius: 99,
                                transition: "width 0.5s",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </Tile>
                  )}

                  {/* Liste des dépenses */}
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: th.sub,
                      letterSpacing: 1.2,
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Détail
                  </div>
                  {depensesMois.map((d) => {
                    const cat =
                      DEP_CATS.find((c) => c.id === d.categorie) ||
                      DEP_CATS[DEP_CATS.length - 1];
                    return (
                      <div
                        key={d.id}
                        style={{
                          background: th.card,
                          borderRadius: 14,
                          padding: "13px 16px",
                          marginBottom: 8,
                          border: `1px solid ${th.border}`,
                          borderLeft: `3px solid ${cat.color}`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: th.text,
                              }}
                            >
                              {d.titre || cat.label}
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                color: th.sub,
                                marginTop: 3,
                              }}
                            >
                              {cat.label} ·{" "}
                              {d.par === "abdullah" ? "Abdullah" : "Pranvera"} ·{" "}
                              {d.date ? formatDate(d.date) : ""}
                            </div>
                            {d.notes && (
                              <div
                                style={{
                                  fontSize: 13,
                                  color: th.sub,
                                  marginTop: 2,
                                  fontStyle: "italic",
                                }}
                              >
                                {d.notes}
                              </div>
                            )}
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <div
                              style={{
                                fontSize: 17,
                                fontWeight: 700,
                                color: th.text,
                              }}
                            >
                              {parseFloat(d.montant || 0).toFixed(2)}
                            </div>
                            <div style={{ fontSize: 11, color: th.sub }}>
                              CHF
                            </div>
                          </div>
                          <button
                            className="btn"
                            onClick={() =>
                              remove(ref(db, `nfc/depenses/${d.id}`))
                            }
                            style={{ padding: 4 }}
                          >
                            <Icon name="trash" size={15} color={th.sub} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          );
        })()}

      {/* Vue annuelle */}
      {vue === "annuel" &&
        (() => {
          const moisListe = Array.from({ length: 12 }, (_, i) => i);
          return (
            <div>
              <div style={{ fontSize: 14, color: th.sub, marginBottom: 16 }}>
                Résumé {anneeSel}
              </div>
              {moisListe.map((m) => {
                const sal = allSalaires.filter((s) => {
                  const d = new Date(s.date);
                  return d.getMonth() === m && d.getFullYear() === anneeSel;
                });
                const facts = allFactures.filter((f) => {
                  const d = new Date(f.echeance);
                  return d.getMonth() === m && d.getFullYear() === anneeSel;
                });
                const payees = facts.filter((f) => f.payee);
                const totalR =
                  sal.reduce((s, v) => s + (parseFloat(v.montant) || 0), 0) ||
                  (totalSalaireFixe > 0 ? totalSalaireFixe : 0);
                const totalC = payees.reduce(
                  (s, v) => s + (parseFloat(v.montant) || 0),
                  0
                );
                const depDivers = allDepenses
                  .filter((d) => {
                    const dt = new Date(d.date);
                    return dt.getMonth() === m && dt.getFullYear() === anneeSel;
                  })
                  .reduce((s, d) => s + (parseFloat(d.montant) || 0), 0);
                const solde = totalR - totalC - depDivers;
                const isCurrent =
                  m === now.getMonth() && anneeSel === now.getFullYear();
                const isFuture = new Date(anneeSel, m, 1) > now;
                return (
                  <div
                    key={m}
                    onClick={() => {
                      setMoisSel(m);
                      setVue("aPayer");
                    }}
                    style={{
                      background: isCurrent
                        ? dark
                          ? "rgba(34,197,94,0.08)"
                          : "#f0fdf4"
                        : th.card,
                      borderRadius: 14,
                      padding: "13px 16px",
                      marginBottom: 8,
                      border: `1px solid ${
                        isCurrent ? th.accent + "40" : th.border
                      }`,
                      cursor: "pointer",
                      opacity: isFuture ? 0.45 : 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: th.text,
                          }}
                        >
                          {MOIS_LONG[m]}
                          {isCurrent ? " · En cours" : ""}
                        </div>
                        <div
                          style={{ fontSize: 13, color: th.sub, marginTop: 3 }}
                        >
                          {isFuture
                            ? "—"
                            : `${
                                totalR > 0 ? `+${totalR.toFixed(0)}` : "—"
                              } CHF revenus · ${facts.length} facture${
                                facts.length !== 1 ? "s" : ""
                              }`}
                        </div>
                      </div>
                      {!isFuture && totalR > 0 && (
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: 16,
                              fontWeight: 700,
                              color: solde >= 0 ? th.accent : th.danger,
                            }}
                          >
                            {solde >= 0 ? "+" : ""}
                            {solde.toFixed(0)}
                          </div>
                          <div style={{ fontSize: 11, color: th.sub }}>CHF</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

      {/* Modal — Facture */}
      {modal === "facture" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>Nouvelle facture</SheetTitle>
          <FLabel th={th}>Titre</FLabel>
          <input
            autoFocus
            value={form.titre || ""}
            onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))}
            placeholder="Ex: Loyer, Swisscom, Assurance..."
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div>
              <FLabel th={th}>Montant (CHF)</FLabel>
              <input
                type="number"
                step="0.01"
                value={form.montant || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, montant: e.target.value }))
                }
                placeholder="0.00"
                style={inputStyle(th)}
              />
            </div>
            <div>
              <FLabel th={th}>Échéance</FLabel>
              <input
                type="date"
                value={form.echeance || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, echeance: e.target.value }))
                }
                style={inputStyle(th)}
              />
            </div>
          </div>
          <FLabel th={th}>Catégorie</FLabel>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            {FACTURE_CATS.map((c) => (
              <ChipBtn
                key={c.id}
                th={th}
                dark={dark}
                active={form.categorie === c.id}
                label={c.label}
                onClick={() => setForm((f) => ({ ...f, categorie: c.id }))}
              />
            ))}
          </div>
          <div
            onClick={() =>
              setForm((f) => ({ ...f, recurrente: !f.recurrente }))
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "13px 14px",
              background: th.card2,
              borderRadius: 12,
              cursor: "pointer",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                border: `2px solid ${form.recurrente ? th.accent : th.border}`,
                background: form.recurrente ? th.accent : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {form.recurrente && (
                <Icon name="check" size={13} color="#fff" strokeWidth={2.5} />
              )}
            </div>
            <span style={{ fontSize: 15, color: th.text, fontWeight: 500 }}>
              Facture récurrente
            </span>
          </div>
          {form.recurrente && (
            <>
              <FLabel th={th}>Fréquence</FLabel>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {[
                  ["mensuelle", "Mensuelle"],
                  ["trimestrielle", "Trimestrielle"],
                  ["annuelle", "Annuelle"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    className="btn t"
                    onClick={() => setForm((f) => ({ ...f, frequence: id }))}
                    style={{
                      flex: 1,
                      padding: "11px 4px",
                      borderRadius: 12,
                      fontSize: 13,
                      border: `1.5px solid ${
                        form.frequence === id ? th.accent : th.border
                      }`,
                      background: "transparent",
                      color: form.frequence === id ? th.accent : th.sub,
                      fontWeight: form.frequence === id ? 700 : 500,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
          <FLabel th={th}>Notes</FLabel>
          <input
            value={form.notes || ""}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Référence, détails..."
            style={{ ...inputStyle(th), marginBottom: 18 }}
          />
          <PrimaryBtn
            th={th}
            label="Enregistrer"
            onClick={ajouterFacture}
            disabled={!form.titre?.trim() || !form.montant}
          />
        </Sheet>
      )}

      {/* Modal — Salaire */}
      {modal === "salaire" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>Nouveau revenu</SheetTitle>
          <FLabel th={th}>Qui</FLabel>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {[
              ["abdullah", "Abdullah"],
              ["pranvera", "Pranvera"],
            ].map(([id, label]) => (
              <button
                key={id}
                className="btn t"
                onClick={() => setForm((f) => ({ ...f, profil_s: id }))}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 12,
                  fontSize: 15,
                  border: `1.5px solid ${
                    form.profil_s === id ? th.text : th.border
                  }`,
                  background: form.profil_s === id ? th.text : "transparent",
                  color: form.profil_s === id ? th.bg : th.sub,
                  fontWeight: 700,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <FLabel th={th}>Montant (CHF)</FLabel>
          <input
            type="number"
            step="0.01"
            value={form.montant || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, montant: e.target.value }))
            }
            placeholder="0.00"
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <FLabel th={th}>Date de réception</FLabel>
          <input
            type="date"
            value={form.date || ""}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            style={{ ...inputStyle(th), marginBottom: 14 }}
          />
          <FLabel th={th}>Notes</FLabel>
          <input
            value={form.notes || ""}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Ex: Salaire mars, prime..."
            style={{ ...inputStyle(th), marginBottom: 18 }}
          />
          <PrimaryBtn
            th={th}
            label="Enregistrer"
            onClick={ajouterSalaire}
            disabled={!form.montant || !form.profil_s || !form.date}
          />
        </Sheet>
      )}

      {/* Modal — Dépense diverse */}
      {modal === "depense" &&
        (() => {
          const DEP_CATS = [
            { id: "resto", label: "Restos & sorties" },
            { id: "vetements", label: "Vêtements" },
            { id: "loisirs", label: "Loisirs" },
            { id: "transport", label: "Transport" },
            { id: "sante", label: "Santé" },
            { id: "cadeaux", label: "Cadeaux" },
            { id: "enfants", label: "Enfants" },
            { id: "hightech", label: "High-tech" },
            { id: "sport", label: "Sport" },
            { id: "autre", label: "Autre" },
          ];
          return (
            <Sheet th={th} onClose={() => setModal(null)}>
              <SheetTitle th={th}>Nouvelle dépense</SheetTitle>
              <FLabel th={th}>Titre (optionnel)</FLabel>
              <input
                value={form.titre || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titre: e.target.value }))
                }
                placeholder="Ex: Nike Air Max, Sushi Yoshi..."
                style={{ ...inputStyle(th), marginBottom: 14 }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div>
                  <FLabel th={th}>Montant (CHF)</FLabel>
                  <input
                    autoFocus
                    type="number"
                    step="0.01"
                    value={form.montant || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, montant: e.target.value }))
                    }
                    placeholder="0.00"
                    style={inputStyle(th)}
                  />
                </div>
                <div>
                  <FLabel th={th}>Date</FLabel>
                  <input
                    type="date"
                    value={form.date || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                    style={inputStyle(th)}
                  />
                </div>
              </div>
              <FLabel th={th}>Catégorie</FLabel>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginBottom: 14,
                }}
              >
                {DEP_CATS.map((c) => (
                  <ChipBtn
                    key={c.id}
                    th={th}
                    dark={dark}
                    active={form.categorie === c.id}
                    label={c.label}
                    onClick={() => setForm((f) => ({ ...f, categorie: c.id }))}
                  />
                ))}
              </div>
              <FLabel th={th}>Qui</FLabel>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {[
                  ["abdullah", "Abdullah"],
                  ["pranvera", "Pranvera"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    className="btn t"
                    onClick={() => setForm((f) => ({ ...f, par: id }))}
                    style={{
                      flex: 1,
                      padding: 14,
                      borderRadius: 12,
                      fontSize: 15,
                      border: `1.5px solid ${
                        form.par === id ? th.text : th.border
                      }`,
                      background: form.par === id ? th.text : "transparent",
                      color: form.par === id ? th.bg : th.sub,
                      fontWeight: 700,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <FLabel th={th}>Notes</FLabel>
              <input
                value={form.notes || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="Détails..."
                style={{ ...inputStyle(th), marginBottom: 18 }}
              />
              <PrimaryBtn
                th={th}
                label="Enregistrer"
                onClick={() => {
                  if (!form.montant) return;
                  set(ref(db, `nfc/depenses/d_${Date.now()}`), {
                    ...form,
                    montant: parseFloat(form.montant),
                    par: form.par || profil,
                    createdAt: Date.now(),
                  });
                  setForm({});
                  setModal(null);
                  setVue("depenses");
                }}
                disabled={!form.montant}
              />
            </Sheet>
          );
        })()}

      {/* Modal — Salaire fixe */}
      {modal === "salaireFixe" && (
        <Sheet th={th} onClose={() => setModal(null)}>
          <SheetTitle th={th}>Salaire fixe mensuel</SheetTitle>
          <p
            style={{
              fontSize: 14,
              color: th.sub,
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            Ce montant sera utilisé automatiquement chaque mois si vous n'avez
            pas saisi de salaire manuel. Modifiez-le en cas d'augmentation.
          </p>
          <FLabel th={th}>Abdullah (CHF / mois)</FLabel>
          <input
            type="number"
            step="100"
            value={form.abdullah || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, abdullah: e.target.value }))
            }
            placeholder="0"
            style={{ ...inputStyle(th), marginBottom: 16 }}
          />
          <FLabel th={th}>Pranvera (CHF / mois)</FLabel>
          <input
            type="number"
            step="100"
            value={form.pranvera || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, pranvera: e.target.value }))
            }
            placeholder="0"
            style={{ ...inputStyle(th), marginBottom: 8 }}
          />
          <div style={{ fontSize: 13, color: th.sub, marginBottom: 20 }}>
            Total :{" "}
            {(
              (parseFloat(form.abdullah) || 0) +
              (parseFloat(form.pranvera) || 0)
            ).toFixed(2)}{" "}
            CHF / mois
          </div>
          <PrimaryBtn
            th={th}
            label="Enregistrer"
            onClick={() => {
              set(ref(db, "nfc/finances/salaireFixe"), {
                abdullah: parseFloat(form.abdullah) || 0,
                pranvera: parseFloat(form.pranvera) || 0,
              });
              setModal(null);
            }}
          />
        </Sheet>
      )}

      {confirmDel && (
        <ConfirmSheet
          th={th}
          title={`Supprimer ce ${confirmDel.titre} ?`}
          onCancel={() => setConfirmDel(null)}
          onConfirm={() => {
            remove(ref(db, `nfc/finances/${confirmDel.path}/${confirmDel.id}`));
            setConfirmDel(null);
          }}
          confirmLabel="Supprimer"
          danger
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROFIL SCREEN
// ─────────────────────────────────────────────────────────────
function ProfilScreen({ th, dark, onSelect }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: th.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      }}
    >
      <div
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 52,
          color: th.text,
          letterSpacing: -1.5,
          marginBottom: 6,
        }}
      >
        Home
      </div>
      <div style={{ fontSize: 16, color: th.sub, marginBottom: 56 }}>
        Qui êtes-vous ?
      </div>
      {[
        ["abdullah", "Abdullah"],
        ["pranvera", "Pranvera"],
      ].map(([id, label]) => (
        <button
          key={id}
          className="btn t"
          onClick={() => onSelect(id)}
          style={{
            width: "100%",
            maxWidth: 340,
            padding: "20px 24px",
            borderRadius: 18,
            border: `1px solid ${th.border}`,
            background: th.card,
            color: th.text,
            fontSize: 18,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
            boxShadow: th.shadow,
          }}
        >
          <span>{label}</span>
          <Icon name="arrowRight" size={18} color={th.sub} />
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// UI ATOMS
// ─────────────────────────────────────────────────────────────
function Tile({ th, children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: th.card,
        borderRadius: 16,
        padding: 16,
        border: `1px solid ${th.border}`,
        boxShadow: th.shadow,
        cursor: onClick ? "pointer" : "default",
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
function PageTitle({ th, children }) {
  return (
    <div
      style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 26,
        color: th.text,
        letterSpacing: -0.5,
      }}
    >
      {children}
    </div>
  );
}
function SectionHead({ th, label, action, onAction }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: th.text }}>
        {label}
      </div>
      {action && (
        <button
          className="btn"
          onClick={onAction}
          style={{ color: th.accent, fontSize: 14, fontWeight: 600 }}
        >
          {action}
        </button>
      )}
    </div>
  );
}
function InfoBox({ th, label, value, sub }) {
  return (
    <div
      style={{ background: th.card2, borderRadius: 12, padding: "12px 14px" }}
    >
      <div
        style={{
          fontSize: 11,
          color: th.sub,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, color: th.text }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: th.sub, marginTop: 2 }}>{sub}</div>
      )}
    </div>
  );
}
function ULabel({ th, children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: th.sub,
        letterSpacing: 0.8,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}
function FLabel({ th, children }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: th.sub,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}
function Sheet({ th, onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        zIndex: 200,
        backdropFilter: "blur(8px)",
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: th.card,
          borderRadius: 24,
          padding: "28px 22px 40px",
          width: "calc(100% - 32px)",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
function SheetTitle({ th, children }) {
  return (
    <div
      style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 22,
        color: th.text,
        marginBottom: 20,
        letterSpacing: -0.3,
      }}
    >
      {children}
    </div>
  );
}
function ConfirmSheet({
  th,
  title,
  sub,
  onCancel,
  onConfirm,
  confirmLabel,
  danger,
}) {
  return (
    <Sheet th={th} onClose={onCancel}>
      <div
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 20,
          color: th.text,
          marginBottom: sub ? 8 : 24,
        }}
      >
        {title}
      </div>
      {sub && (
        <p style={{ fontSize: 14, color: th.sub, marginBottom: 22 }}>{sub}</p>
      )}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          className="btn"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: 15,
            borderRadius: 12,
            background: th.card2,
            color: th.sub,
            fontSize: 15,
            border: `1px solid ${th.border}`,
          }}
        >
          Annuler
        </button>
        <button
          className="btn"
          onClick={onConfirm}
          style={{
            flex: 1,
            padding: 15,
            borderRadius: 12,
            background: danger ? th.dangerBg : th.text,
            color: danger ? th.danger : th.bg,
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </Sheet>
  );
}
function PrimaryBtn({ th, label, onClick, disabled, style }) {
  return (
    <button
      className="btn t"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: 15,
        borderRadius: 14,
        background: disabled ? th.border : th.text,
        color: disabled ? th.sub : th.bg,
        fontSize: 16,
        fontWeight: 700,
        cursor: disabled ? "default" : "pointer",
        ...style,
      }}
    >
      {label}
    </button>
  );
}
function PrimaryBtnSmall({ th, label, onClick }) {
  return (
    <button
      className="btn t"
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: 11,
        background: th.text,
        color: th.bg,
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {label}
    </button>
  );
}
function GhostBtn({ th, label, onClick }) {
  return (
    <button
      className="btn t"
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 11,
        background: th.card2,
        color: th.sub,
        fontSize: 14,
        fontWeight: 600,
        border: `1px solid ${th.border}`,
      }}
    >
      {label}
    </button>
  );
}
function IconBtn({ th, children, onClick, accent }) {
  return (
    <button
      className="btn t"
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        border: `1px solid ${th.border}`,
        background: accent ? th.accentBg : th.card2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}
function QtyMini({ th, qty, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button
        className="btn t"
        onClick={() => onChange(-1)}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          border: `1px solid ${th.border}`,
          background: th.card2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="minus" size={13} color={th.sub} />
      </button>
      <span
        style={{
          fontWeight: 700,
          fontSize: 15,
          minWidth: 18,
          textAlign: "center",
          color: th.text,
        }}
      >
        {qty}
      </span>
      <button
        className="btn t"
        onClick={() => onChange(1)}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          border: `1px solid ${th.border}`,
          background: th.card2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="plus" size={13} color={th.sub} />
      </button>
    </div>
  );
}
function QtyRow({ th, qty, onChange }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 4 }}
    >
      <button
        className="btn t"
        onClick={() => onChange(-1)}
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          border: `1px solid ${th.border}`,
          background: th.card2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="minus" size={18} color={th.sub} />
      </button>
      <span
        style={{
          fontWeight: 700,
          fontSize: 26,
          minWidth: 32,
          textAlign: "center",
          color: th.text,
        }}
      >
        {qty}
      </span>
      <button
        className="btn t"
        onClick={() => onChange(1)}
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          border: `1px solid ${th.border}`,
          background: th.card2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="plus" size={18} color={th.sub} />
      </button>
    </div>
  );
}
function ChipBtn({ th, dark, active, label, color, onClick, small }) {
  return (
    <button
      className="btn t"
      onClick={onClick}
      style={{
        borderRadius: 10,
        padding: small ? "7px 12px" : "9px 14px",
        fontSize: small ? 13 : 14,
        fontWeight: active ? 700 : 500,
        border: `1.5px solid ${active ? color || th.text : th.border}`,
        background: active ? (color ? color + "18" : th.card2) : "transparent",
        color: active ? color || th.text : th.sub,
      }}
    >
      {label}
    </button>
  );
}
function SegControl({ th, options, value, onChange, style }) {
  return (
    <div style={{ display: "flex", gap: 8, ...style }}>
      {options.map(([id, label]) => (
        <button
          key={id}
          className="btn t"
          onClick={() => onChange(id)}
          style={{
            flex: 1,
            padding: "12px 0",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            background: value === id ? th.text : th.card,
            color: value === id ? th.bg : th.sub,
            border: `1px solid ${value === id ? th.text : th.border}`,
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
function SearchBar({ th, value, onChange, style }) {
  return (
    <div style={{ position: "relative", ...style }}>
      <div
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Icon name="search" size={17} color={th.sub} />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher..."
        style={{ ...inputStyle(th), paddingLeft: 44 }}
      />
    </div>
  );
}
function EmptyState({ th, title, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "52px 0" }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: th.sub,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      {sub && (
        <div style={{ fontSize: 14, color: th.sub, opacity: 0.6 }}>{sub}</div>
      )}
    </div>
  );
}
function inputStyle(th) {
  return {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: `1px solid ${th.border}`,
    fontSize: 16,
    background: th.card2,
    color: th.text,
    display: "block",
  };
}
function BudgetSheet({ th, budget, onSave }) {
  const [m, setM] = useState(budget?.mensuel || 800);
  const [d, setD] = useState(budget?.depense || 0);
  return (
    <>
      <SheetTitle th={th}>Budget mensuel</SheetTitle>
      <FLabel th={th}>Budget (CHF)</FLabel>
      <input
        type="number"
        value={m}
        onChange={(e) => setM(parseFloat(e.target.value) || 0)}
        style={{ ...inputStyle(th), marginBottom: 16 }}
      />
      <FLabel th={th}>Dépenses actuelles (CHF)</FLabel>
      <input
        type="number"
        value={d}
        onChange={(e) => setD(parseFloat(e.target.value) || 0)}
        style={{ ...inputStyle(th), marginBottom: 20 }}
      />
      <PrimaryBtn th={th} label="Enregistrer" onClick={() => onSave(m, d)} />
      {budget?.historique?.length > 0 && (
        <>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: th.sub,
              marginTop: 24,
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Historique
          </div>
          {[...(budget.historique || [])].reverse().map((h, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "11px 0",
                borderBottom: `1px solid ${th.border}`,
              }}
            >
              <span style={{ fontSize: 15, color: th.text, fontWeight: 500 }}>
                {MOIS_LONG[h.mois]} {h.annee}
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: th.accent }}>
                {(h.depense || 0).toFixed(2)} CHF
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
}
