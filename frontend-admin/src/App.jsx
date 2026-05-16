import { useState, useEffect, useRef } from "react";

// ─── Design tokens ───────────────────────────────────────────────────────────
const LIGHT_THEME = {
  primary: "#0B6E4F",
  primaryLight: "#E6F4EF",
  primaryMid: "#1A8F68",
  accent: "#F5A623",
  accentLight: "#FFF8EC",
  danger: "#E03131",
  dangerLight: "#FFF0F0",
  warn: "#E67E22",
  warnLight: "#FFF4E5",
  info: "#1971C2",
  infoLight: "#E7F5FF",
  purple: "#7048E8",
  purpleLight: "#F3F0FF",
  bg: "#F5F7F6",
  card: "#FFFFFF",
  border: "#E2E8E5",
  text: "#1A2B25",
  textMuted: "#6B8C7D",
  textLight: "#9BB5AC",
  sidebar: "#0D2B20",
  sidebarHover: "#163D2E",
  sidebarActive: "#1A8F68",
};

const DARK_THEME = {
  primary: "#34C38F",
  primaryLight: "#17352B",
  primaryMid: "#2BC88A",
  accent: "#F5A623",
  accentLight: "#4A3613",
  danger: "#FF6B6B",
  dangerLight: "#3B1A1A",
  warn: "#F2A65A",
  warnLight: "#3B2A12",
  info: "#5AA9FF",
  infoLight: "#112D46",
  purple: "#9B7BFF",
  purpleLight: "#241A46",
  bg: "#0C1411",
  card: "#121D19",
  border: "#23342E",
  text: "#EEF4F1",
  textMuted: "#9AB1A8",
  textLight: "#748A82",
  sidebar: "#0D2B20",
  sidebarHover: "#163D2E",
  sidebarActive: "#2BC88A",
};

const C = { ...LIGHT_THEME };

const PAGE_HEADER_STYLE = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  marginBottom: 16,
  flexWrap: "wrap",
};

const PAGE_TITLE_STYLE = {
  fontSize: 22,
  fontWeight: 800,
  color: C.text,
  margin: 0,
};

const PAGE_SUBTITLE_STYLE = {
  color: C.textMuted,
  fontSize: 13,
  margin: "6px 0 0",
  lineHeight: 1.6,
};

const PAGE_SURFACE_STYLE = {
  background: C.card,
  borderRadius: 18,
  border: `1px solid ${C.border}`,
  boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
};

const PAGE_PRIMARY_BUTTON_STYLE = {
  background: C.primary,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "10px 20px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
};

function PageHeader({ title, subtitle, action, secondaryAction }) {
  return (
    <div style={PAGE_HEADER_STYLE}>
      <div style={{ minWidth: 0 }}>
        <h1 style={PAGE_TITLE_STYLE}>{title}</h1>
        {subtitle ? <p style={PAGE_SUBTITLE_STYLE}>{subtitle}</p> : null}
      </div>
      {(action || secondaryAction) && (
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {secondaryAction}
          {action}
        </div>
      )}
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({
    email: "admin@sukat.ph",
    password: "admin123",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (form.email && form.password)
        onLogin({ name: "Admin User", role: "admin", email: form.email });
      else {
        setError("Please enter your credentials.");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0D2B20 0%,#0B4A34 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI',sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 900,
          minHeight: 520,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "linear-gradient(160deg,#0B6E4F 0%,#0D4A32 100%)",
            padding: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 48,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                ⚕
              </div>
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 18,
                    letterSpacing: 0.5,
                  }}
                >
                  SukatKalusugan
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 10,
                    letterSpacing: 2,
                  }}
                >
                  HEALTH MONITORING SYSTEM
                </div>
              </div>
            </div>
            <h2
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: 800,
                lineHeight: 1.3,
                margin: "0 0 12px",
              }}
            >
              Monitoring Child Growth with WHO Standards
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              A kiosk-based anthropometric system for children aged 0–59 months,
              using eOPT+ framework and WHO growth standards.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["WHO Standards", "eOPT+ Ready", "IoT Kiosk", "Mobile App"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 11,
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            width: 380,
            background: "#fff",
            padding: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: C.text,
              margin: "0 0 4px",
            }}
          >
            Welcome back
          </h2>
          <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 32px" }}>
            Sign in to your account to continue
          </p>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: C.textMuted,
                marginBottom: 6,
              }}
            >
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  email: event.target.value,
                }))
              }
              style={{ ...inputStyle }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: C.textMuted,
                marginBottom: 6,
              }}
            >
              PASSWORD
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  password: event.target.value,
                }))
              }
              onKeyDown={(event) => event.key === "Enter" && handleLogin()}
              style={{ ...inputStyle }}
            />
          </div>
          {error && (
            <div
              style={{
                background: C.dangerLight,
                color: C.danger,
                fontSize: 12,
                padding: "8px 12px",
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              background: loading ? C.primaryLight : C.primary,
              color: loading ? C.primary : "#fff",
              border: "none",
              borderRadius: 10,
              padding: "13px 0",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
          <div
            style={{
              marginTop: 24,
              padding: 14,
              background: C.bg,
              borderRadius: 10,
              fontSize: 11,
              color: C.textMuted,
            }}
          >
            <strong>Demo credentials</strong>
            <br />
            Email: admin@sukat.ph | Password: admin123
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Initial Mock Data ────────────────────────────────────────────────────────
const INIT_CHILDREN = [
  {
    id: 1,
    child_code: "CHD-0001",
    first_name: "Maria",
    last_name: "Santos",
    birthdate: "2022-03-15",
    sex: "Female",
    age_months: 26,
    barangay: "Bagong Silang",
    address: "123 Rizal St.",
    parent: "Ana Santos",
    status: "Normal",
  },
  {
    id: 2,
    child_code: "CHD-0002",
    first_name: "Juan",
    last_name: "Dela Cruz",
    birthdate: "2022-09-20",
    sex: "Male",
    age_months: 20,
    barangay: "Poblacion",
    address: "45 Mabini Ave.",
    parent: "Rosa Dela Cruz",
    status: "Underweight",
  },
  {
    id: 3,
    child_code: "CHD-0003",
    first_name: "Lucia",
    last_name: "Reyes",
    birthdate: "2021-12-01",
    sex: "Female",
    age_months: 29,
    barangay: "San Jose",
    address: "78 Luna St.",
    parent: "Carla Reyes",
    status: "Stunted",
  },
  {
    id: 4,
    child_code: "CHD-0004",
    first_name: "Miguel",
    last_name: "Torres",
    birthdate: "2023-06-10",
    sex: "Male",
    age_months: 11,
    barangay: "Bagong Silang",
    address: "9 Bonifacio Rd.",
    parent: "Pedro Torres",
    status: "Normal",
  },
  {
    id: 5,
    child_code: "CHD-0005",
    first_name: "Sofia",
    last_name: "Garcia",
    birthdate: "2022-01-05",
    sex: "Female",
    age_months: 28,
    barangay: "Sta. Cruz",
    address: "32 Aguinaldo St.",
    parent: "Lena Garcia",
    status: "Severely Underweight",
  },
  {
    id: 6,
    child_code: "CHD-0006",
    first_name: "Carlos",
    last_name: "Lim",
    birthdate: "2023-01-22",
    sex: "Male",
    age_months: 16,
    barangay: "Poblacion",
    address: "55 Del Pilar St.",
    parent: "Mei Lim",
    status: "Wasted",
  },
  {
    id: 7,
    child_code: "CHD-0007",
    first_name: "Isabella",
    last_name: "Ramos",
    birthdate: "2022-07-30",
    sex: "Female",
    age_months: 22,
    barangay: "San Jose",
    address: "101 Burgos Ave.",
    parent: "Gloria Ramos",
    status: "Normal",
  },
  {
    id: 8,
    child_code: "CHD-0008",
    first_name: "Andres",
    last_name: "Cruz",
    birthdate: "2021-05-14",
    sex: "Male",
    age_months: 36,
    barangay: "Sta. Cruz",
    address: "22 Rizal Blvd.",
    parent: "Nena Cruz",
    status: "Overweight",
  },
];
const INIT_MEASUREMENTS = [
  {
    id: 1,
    child_id: 1,
    child: "Maria Santos",
    height_cm: 85.2,
    weight_kg: 11.8,
    age_months: 26,
    measurement_date: "2024-05-10",
    source_type: "kiosk",
    nutritional_status: "Normal",
    waz: 0.4,
    haz: 0.2,
    whz: 0.5,
  },
  {
    id: 2,
    child_id: 2,
    child: "Juan Dela Cruz",
    height_cm: 76.1,
    weight_kg: 8.2,
    age_months: 20,
    measurement_date: "2024-05-09",
    source_type: "mobile",
    nutritional_status: "Underweight",
    waz: -2.1,
    haz: -1.3,
    whz: -1.8,
  },
  {
    id: 3,
    child_id: 3,
    child: "Lucia Reyes",
    height_cm: 78.3,
    weight_kg: 10.2,
    age_months: 29,
    measurement_date: "2024-05-08",
    source_type: "kiosk",
    nutritional_status: "Stunted",
    waz: -1.2,
    haz: -2.4,
    whz: -0.6,
  },
  {
    id: 4,
    child_id: 5,
    child: "Sofia Garcia",
    height_cm: 80.0,
    weight_kg: 7.9,
    age_months: 28,
    measurement_date: "2024-05-07",
    source_type: "manual",
    nutritional_status: "Severely Underweight",
    waz: -3.2,
    haz: -1.5,
    whz: -3.1,
  },
  {
    id: 5,
    child_id: 6,
    child: "Carlos Lim",
    height_cm: 72.5,
    weight_kg: 7.1,
    age_months: 16,
    measurement_date: "2024-05-06",
    source_type: "kiosk",
    nutritional_status: "Wasted",
    waz: -1.8,
    haz: -1.0,
    whz: -2.2,
  },
  {
    id: 6,
    child_id: 8,
    child: "Andres Cruz",
    height_cm: 92.0,
    weight_kg: 16.5,
    age_months: 36,
    measurement_date: "2024-05-05",
    source_type: "mobile",
    nutritional_status: "Overweight",
    waz: 2.2,
    haz: 0.8,
    whz: 2.5,
  },
];
const INIT_PARENTS = [
  {
    id: 1,
    name: "Ana Santos",
    email: "ana.santos@email.com",
    phone: "09171234567",
    children: 1,
    status: "Active",
  },
  {
    id: 2,
    name: "Rosa Dela Cruz",
    email: "rosa.dc@email.com",
    phone: "09281234567",
    children: 1,
    status: "Active",
  },
  {
    id: 3,
    name: "Carla Reyes",
    email: "carla.reyes@email.com",
    phone: "09391234567",
    children: 1,
    status: "Active",
  },
  {
    id: 4,
    name: "Pedro Torres",
    email: "pedro.torres@email.com",
    phone: "09451234567",
    children: 1,
    status: "Active",
  },
  {
    id: 5,
    name: "Lena Garcia",
    email: "lena.garcia@email.com",
    phone: "09561234567",
    children: 1,
    status: "Inactive",
  },
];
const INIT_NUTRITIONISTS = [
  {
    id: 1,
    name: "Dr. Maria Santos",
    email: "maria.santos@health.gov",
    phone: "09171234560",
    role: "Registered Dietitian Nutritionist (RDN)",
    barangay: "Bagong Silang",
    license_number: "RDN-2020-001",
    status: "Active",
  },
  {
    id: 2,
    name: "Nurse Cynthia Reyes",
    email: "cynthia.reyes@health.gov",
    phone: "09281234561",
    role: "Nurse",
    barangay: "Poblacion",
    license_number: "PN-2019-045",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Jose Garcia",
    email: "jose.garcia@health.gov",
    phone: "09391234562",
    role: "Physician/Doctor",
    barangay: "San Jose",
    license_number: "MD-2018-023",
    status: "Active",
  },
  {
    id: 4,
    name: "Aida Cruz",
    email: "aida.cruz@health.gov",
    phone: "09451234563",
    role: "Barangay Health Scholar (BHS)",
    barangay: "Sta. Cruz",
    license_number: "BHS-2022-089",
    status: "Active",
  },
  {
    id: 5,
    name: "Robert Lim",
    email: "robert.lim@health.gov",
    phone: "09561234564",
    role: "Health Educator",
    barangay: "Bagong Silang",
    license_number: "HE-2021-056",
    status: "Inactive",
  },
];

// ─── WHO Z-Score computation ──────────────────────────────────────────────────
function computeWHO({ weight_kg, height_cm, age_months }) {
  const wazRef = { median: 9.5 + age_months * 0.15, sd: 1.2 };
  const hazRef = { median: 65 + age_months * 0.9, sd: 3.2 };
  const whzRef = { median: 10.5 + (height_cm - 65) * 0.09, sd: 1.1 };
  const waz = ((weight_kg - wazRef.median) / wazRef.sd).toFixed(2);
  const haz = ((height_cm - hazRef.median) / hazRef.sd).toFixed(2);
  const whz = ((weight_kg - whzRef.median) / whzRef.sd).toFixed(2);
  let status = "Normal";
  if (parseFloat(waz) < -3 || parseFloat(whz) < -3)
    status = "Severely Underweight";
  else if (parseFloat(waz) < -2) status = "Underweight";
  else if (parseFloat(haz) < -2) status = "Stunted";
  else if (parseFloat(whz) < -2) status = "Wasted";
  else if (parseFloat(whz) > 2) status = "Overweight";
  return {
    waz: parseFloat(waz),
    haz: parseFloat(haz),
    whz: parseFloat(whz),
    status,
  };
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  });
  const bg =
    type === "success" ? C.primaryMid : type === "danger" ? C.danger : C.warn;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        background: bg,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        minWidth: 240,
      }}
    >
      <Icon
        name={type === "success" ? "checkCircle" : "alertTriangle"}
        size={16}
        color="#fff"
      />
      {msg}
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({ msg, onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,30,20,0.5)",
        zIndex: 5000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: C.card,
          borderRadius: 16,
          padding: 28,
          width: 340,
          boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          border: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: C.dangerLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="alertTriangle" size={18} color={C.danger} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>
            Confirm Delete
          </div>
        </div>
        <p
          style={{
            fontSize: 13,
            color: C.textMuted,
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {msg}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: C.bg,
              color: C.textMuted,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "none",
              background: C.danger,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor", style = {} }) => {
  const icons = {
    dashboard: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    children: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    measurements: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h4M3 15h4M9 3v4M15 3v4M21 9h-4M21 15h-4M9 21v-4M15 21v-4" />
      </svg>
    ),
    parents: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    reports: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    kiosk: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    settings: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    moon: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
      </svg>
    ),
    sun: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M6.34 17.66l-1.41 1.41" />
        <path d="M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    bell: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    logout: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    heart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    activity: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    alertTriangle: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    alertCircle: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    trendingDown: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
    trendingUp: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    zap: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    checkCircle: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    check: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    arrowRight: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    mail: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    phone: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    baby: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M12 11c-4.42 0-8 2.69-8 6v1h16v-1c0-3.31-3.58-6-8-6z" />
      </svg>
    ),
    barChart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    lineChart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    refreshCw: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    save: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    ),
    search: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    childFemale: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M12 12v8" />
        <path d="M9 18h6" />
      </svg>
    ),
    childMale: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M8 20l4-8 4 8" />
        <path d="M9 16h6" />
      </svg>
    ),
    playCircle: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    info: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    plus: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    eye: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    edit: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    trash: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
    x: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    ruler: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
      </svg>
    ),
    scale: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M12 3v2" />
        <path d="M3 12h2" />
        <path d="M19 12h2" />
        <path d="M12 17l-5 2V12a5 5 0 0 1 10 0v7l-5-2z" />
      </svg>
    ),
    wifi: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
    scan: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <line x1="7" y1="12" x2="17" y2="12" />
      </svg>
    ),
  };
  return icons[name] || null;
};

const statusColor = (s) => {
  return (
    {
      Normal: C.primary,
      Underweight: C.warn,
      "Severely Underweight": C.danger,
      Stunted: C.purple,
      Wasted: C.info,
      Overweight: C.accent,
    }[s] || C.textMuted
  );
};
const statusBg = (s) => {
  return (
    {
      Normal: C.primaryLight,
      Underweight: C.warnLight,
      "Severely Underweight": C.dangerLight,
      Stunted: C.purpleLight,
      Wasted: C.infoLight,
      Overweight: C.accentLight,
    }[s] || "#f5f5f5"
  );
};

const StatusBadge = ({ status }) => (
  <span
    style={{
      background: statusBg(status),
      color: statusColor(status),
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 10px",
      borderRadius: 20,
      display: "inline-block",
      letterSpacing: 0.3,
      whiteSpace: "nowrap",
    }}
  >
    {status}
  </span>
);

const sourceIconName = (s) =>
  ({ kiosk: "scan", mobile: "phone", manual: "activity" })[s] || "activity";
const SourceIcon = ({ type, size = 12 }) => (
  <Icon name={sourceIconName(type)} size={size} color="currentColor" />
);

// ─── Modal Shell ──────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, width = 540 }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,30,20,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.card,
          borderRadius: 20,
          border: `1px solid ${C.border}`,
          width: "100%",
          maxWidth: width,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 24px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: C.bg,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>
            {title}
          </div>
          <button
            onClick={onClose}
            style={{
              background: C.border,
              border: "none",
              borderRadius: 8,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Icon name="x" size={15} color={C.textMuted} />
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────
function Field({ label, children, required }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 600,
          color: C.textMuted,
          marginBottom: 5,
          letterSpacing: 0.4,
        }}
      >
        {label}
        {required && <span style={{ color: C.danger, marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}
const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  fontSize: 13,
  color: C.text,
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};
const selectStyle = { ...inputStyle, cursor: "pointer" };

// ─── Add/Edit Child Modal ─────────────────────────────────────────────────────
function ChildModal({ child, parents, onSave, onClose }) {
  const isEdit = !!child;
  const [form, setForm] = useState(
    child || {
      first_name: "",
      last_name: "",
      birthdate: "",
      sex: "Male",
      barangay: "",
      address: "",
      parent: "",
      age_months: "",
    },
  );
  const [err, setErr] = useState("");
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleSave = () => {
    if (
      !form.first_name ||
      !form.last_name ||
      !form.birthdate ||
      !form.parent
    ) {
      setErr("Please fill all required fields.");
      return;
    }
    onSave(form);
  };
  return (
    <Modal
      title={isEdit ? "Edit Child Profile" : "Add New Child"}
      onClose={onClose}
    >
      <div style={{ padding: 24 }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          <Field label="First Name" required>
            <input
              style={inputStyle}
              value={form.first_name}
              onChange={(e) => set("first_name", e.target.value)}
              placeholder="e.g. Maria"
            />
          </Field>
          <Field label="Last Name" required>
            <input
              style={inputStyle}
              value={form.last_name}
              onChange={(e) => set("last_name", e.target.value)}
              placeholder="e.g. Santos"
            />
          </Field>
          <Field label="Birthdate" required>
            <input
              type="date"
              style={inputStyle}
              value={form.birthdate}
              onChange={(e) => set("birthdate", e.target.value)}
            />
          </Field>
          <Field label="Age (months)">
            <input
              type="number"
              style={inputStyle}
              value={form.age_months}
              onChange={(e) => set("age_months", e.target.value)}
              placeholder="e.g. 24"
            />
          </Field>
          <Field label="Sex">
            <select
              style={selectStyle}
              value={form.sex}
              onChange={(e) => set("sex", e.target.value)}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </Field>
          <Field label="Barangay">
            <input
              style={inputStyle}
              value={form.barangay}
              onChange={(e) => set("barangay", e.target.value)}
              placeholder="e.g. Poblacion"
            />
          </Field>
          <Field label="Parent/Guardian" required>
            <select
              style={selectStyle}
              value={form.parent}
              onChange={(e) => set("parent", e.target.value)}
            >
              <option value="">-- Select Parent --</option>
              {parents.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Initial Status">
            <select
              style={selectStyle}
              value={form.status || "Normal"}
              onChange={(e) => set("status", e.target.value)}
            >
              {[
                "Normal",
                "Underweight",
                "Severely Underweight",
                "Stunted",
                "Wasted",
                "Overweight",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Address">
          <input
            style={inputStyle}
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="e.g. 123 Rizal St."
          />
        </Field>
        {err && (
          <div
            style={{
              color: C.danger,
              fontSize: 12,
              marginBottom: 10,
              background: C.dangerLight,
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            {err}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 6,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: C.bg,
              color: C.textMuted,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: "none",
              background: C.primary,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {isEdit ? "Save Changes" : "Add Child"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Add/Edit Nutritionist Modal ──────────────────────────────────────────────
function NutritionistModal({ nutritionist, onSave, onClose }) {
  const isEdit = !!nutritionist;
  const [form, setForm] = useState(
    nutritionist || {
      name: "",
      email: "",
      phone: "",
      role: "Registered Dietitian Nutritionist (RDN)",
      barangay: "",
      license_number: "",
      status: "Active",
    },
  );
  const [err, setErr] = useState("");
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleSave = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.role ||
      !form.barangay
    ) {
      setErr("Please fill all required fields.");
      return;
    }
    onSave(form);
  };
  const roles = [
    "Registered Dietitian Nutritionist (RDN)",
    "Nurse",
    "Physician/Doctor",
    "Barangay Health Scholar (BHS)",
    "Health Educator",
    "Midwife",
  ];
  return (
    <Modal
      title={isEdit ? "Edit Nutritionist" : "Add New Nutritionist"}
      onClose={onClose}
      width={520}
    >
      <div style={{ padding: 24 }}>
        <Field label="Full Name" required>
          <input
            style={inputStyle}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Dr. Maria Santos"
          />
        </Field>
        <Field label="Email Address" required>
          <input
            type="email"
            style={inputStyle}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="e.g. maria@health.gov"
          />
        </Field>
        <Field label="Phone Number" required>
          <input
            style={inputStyle}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="e.g. 09171234567"
          />
        </Field>
        <Field label="Professional Role" required>
          <select
            style={selectStyle}
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Assigned Barangay" required>
          <input
            style={inputStyle}
            value={form.barangay}
            onChange={(e) => set("barangay", e.target.value)}
            placeholder="e.g. Bagong Silang"
          />
        </Field>
        <Field label="License/ID Number">
          <input
            style={inputStyle}
            value={form.license_number}
            onChange={(e) => set("license_number", e.target.value)}
            placeholder="e.g. RDN-2020-001"
          />
        </Field>
        <Field label="Status">
          <select
            style={selectStyle}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </Field>
        {err && (
          <div
            style={{
              color: C.danger,
              fontSize: 12,
              marginBottom: 10,
              background: C.dangerLight,
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            {err}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 6,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: C.bg,
              color: C.textMuted,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: "none",
              background: C.primary,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {isEdit ? "Save Changes" : "Add Nutritionist"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Add/Edit Parent Modal ────────────────────────────────────────────────────
function ParentModal({ parent, onSave, onClose }) {
  const isEdit = !!parent;
  const [form, setForm] = useState(
    parent || { name: "", email: "", phone: "", status: "Active" },
  );
  const [err, setErr] = useState("");
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleSave = () => {
    if (!form.name || !form.email || !form.phone) {
      setErr("Please fill all required fields.");
      return;
    }
    onSave(form);
  };
  return (
    <Modal
      title={isEdit ? "Edit Parent" : "Add New Parent"}
      onClose={onClose}
      width={480}
    >
      <div style={{ padding: 24 }}>
        <Field label="Full Name" required>
          <input
            style={inputStyle}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Ana Santos"
          />
        </Field>
        <Field label="Email Address" required>
          <input
            type="email"
            style={inputStyle}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="e.g. ana@email.com"
          />
        </Field>
        <Field label="Phone Number" required>
          <input
            style={inputStyle}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="e.g. 09171234567"
          />
        </Field>
        <Field label="Status">
          <select
            style={selectStyle}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </Field>
        {err && (
          <div
            style={{
              color: C.danger,
              fontSize: 12,
              marginBottom: 10,
              background: C.dangerLight,
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            {err}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 6,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: C.bg,
              color: C.textMuted,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: "none",
              background: C.primary,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {isEdit ? "Save Changes" : "Add Parent"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Add Measurement Modal ────────────────────────────────────────────────────
function MeasurementModal({ children, onSave, onClose }) {
  const [form, setForm] = useState({
    child_id: "",
    height_cm: "",
    weight_kg: "",
    measurement_date: new Date().toISOString().split("T")[0],
    source_type: "manual",
  });
  const [err, setErr] = useState("");
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleSave = () => {
    if (!form.child_id || !form.height_cm || !form.weight_kg) {
      setErr("Please fill all required fields.");
      return;
    }
    const child = children.find((c) => c.id === parseInt(form.child_id));
    const computed = computeWHO({
      weight_kg: parseFloat(form.weight_kg),
      height_cm: parseFloat(form.height_cm),
      age_months: child.age_months,
    });
    onSave({
      ...form,
      child: `${child.first_name} ${child.last_name}`,
      age_months: child.age_months,
      ...computed,
      nutritional_status: computed.status,
    });
  };
  return (
    <Modal title="Add Measurement Record" onClose={onClose} width={520}>
      <div style={{ padding: 24 }}>
        <Field label="Child" required>
          <select
            style={selectStyle}
            value={form.child_id}
            onChange={(e) => set("child_id", e.target.value)}
          >
            <option value="">-- Select Child --</option>
            {children.map((c) => (
              <option key={c.id} value={c.id}>
                {c.first_name} {c.last_name} ({c.age_months} mo)
              </option>
            ))}
          </select>
        </Field>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          <Field label="Height (cm)" required>
            <input
              type="number"
              step="0.1"
              style={inputStyle}
              value={form.height_cm}
              onChange={(e) => set("height_cm", e.target.value)}
              placeholder="e.g. 82.5"
            />
          </Field>
          <Field label="Weight (kg)" required>
            <input
              type="number"
              step="0.1"
              style={inputStyle}
              value={form.weight_kg}
              onChange={(e) => set("weight_kg", e.target.value)}
              placeholder="e.g. 10.8"
            />
          </Field>
          <Field label="Measurement Date">
            <input
              type="date"
              style={inputStyle}
              value={form.measurement_date}
              onChange={(e) => set("measurement_date", e.target.value)}
            />
          </Field>
          <Field label="Source">
            <select
              style={selectStyle}
              value={form.source_type}
              onChange={(e) => set("source_type", e.target.value)}
            >
              <option value="kiosk">Kiosk</option>
              <option value="mobile">Mobile</option>
              <option value="manual">Manual</option>
            </select>
          </Field>
        </div>
        {form.child_id &&
          form.height_cm &&
          form.weight_kg &&
          (() => {
            const child = children.find(
              (c) => c.id === parseInt(form.child_id),
            );
            if (!child) return null;
            const r = computeWHO({
              weight_kg: parseFloat(form.weight_kg),
              height_cm: parseFloat(form.height_cm),
              age_months: child.age_months,
            });
            return (
              <div
                style={{
                  background: statusBg(r.status),
                  border: `1px solid ${statusColor(r.status)}30`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  marginTop: 4,
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <StatusBadge status={r.status} />
                <span style={{ fontSize: 12, color: C.textMuted }}>
                  WAZ: {r.waz > 0 ? "+" : ""}
                  {r.waz} · HAZ: {r.haz > 0 ? "+" : ""}
                  {r.haz} · WHZ: {r.whz > 0 ? "+" : ""}
                  {r.whz}
                </span>
              </div>
            );
          })()}
        {err && (
          <div
            style={{
              color: C.danger,
              fontSize: 12,
              marginTop: 10,
              background: C.dangerLight,
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            {err}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 14,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: C.bg,
              color: C.textMuted,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: "none",
              background: C.primary,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add Record
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Z-Score Gauge ────────────────────────────────────────────────────────────
function ZScoreGauge({ label, value, color }) {
  const pct = Math.min(Math.max((value + 4) / 8, 0), 1);
  const angle = pct * 180 - 90;
  const r = 38,
    cx = 50,
    cy = 50;
  const rad = (a) => (a * Math.PI) / 180;
  const nx = cx + r * Math.cos(rad(angle - 90));
  const ny = cy + r * Math.sin(rad(angle - 90));
  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <svg width={100} height={60} viewBox="0 0 100 60">
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={C.border}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${nx} ${ny}`}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <circle cx={nx} cy={ny} r={4} fill={color} />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize={14}
          fontWeight={600}
          fill={color}
        >
          {value > 0 ? `+${value}` : value}
        </text>
      </svg>
      <div style={{ fontSize: 10, color: C.textMuted, marginTop: -4 }}>
        {label}
      </div>
    </div>
  );
}

// ─── AI Chatbot ───────────────────────────────────────────────────────────────
function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hello! I'm your SukatKalusugan AI Assistant. I can help you with child health insights, growth tracking, and nutrition recommendations.",
    },
  ]);
  const [input, setInput] = useState("");
  const sampleResponses = {
    growth:
      "Based on the data, children with normal nutritional status are growing at expected rates. Those marked as underweight should focus on calorie-dense meals and frequent check-ins.",
    nutrition:
      "Nutritional recommendations include: ensure 3 meals and 2-3 snacks daily, include protein sources, iron-rich foods, and calcium for bone development.",
    measurements:
      "Recent measurements show 6 children tracked. The dashboard displays trends over the past 5 months with improvements in normal-status children.",
    default:
      "Thank you for your question. This is a demo chatbot. For detailed assistance, please consult the admin or health worker on duty.",
  };
  const handleSend = () => {
    if (!input.trim()) return;
    const il = input.toLowerCase();
    let resp = sampleResponses.default;
    if (il.includes("growth")) resp = sampleResponses.growth;
    else if (
      il.includes("nutrition") ||
      il.includes("diet") ||
      il.includes("meal")
    )
      resp = sampleResponses.nutrition;
    else if (il.includes("measurement")) resp = sampleResponses.measurements;
    setMessages((p) => [
      ...p,
      { id: p.length + 1, role: "user", text: input },
      { id: p.length + 2, role: "assistant", text: resp },
    ]);
    setInput("");
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        fontFamily: "'Segoe UI',system-ui,sans-serif",
      }}
    >
      {isOpen && (
        <div
          style={{
            width: 380,
            height: 520,
            background: "#fff",
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            marginBottom: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg,${C.primary} 0%,${C.primaryMid} 100%)`,
              color: "#fff",
              padding: "16px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>
                Health Assistant
              </div>
              <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>
                Powered by AI
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: 6,
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Icon name="x" size={14} color="#fff" />
            </button>
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: "#fafafa",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "10px 14px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 4px 16px 16px"
                        : "4px 16px 16px 16px",
                    background:
                      msg.role === "user" ? C.primary : C.primaryLight,
                    color: msg.role === "user" ? "#fff" : C.text,
                    fontSize: 13,
                    lineHeight: 1.4,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "12px 14px",
              borderTop: `1px solid ${C.border}`,
              display: "flex",
              gap: 8,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about growth, nutrition..."
              style={{
                flex: 1,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 12,
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: C.primary,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Icon name="arrowRight" size={14} color="#fff" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: `linear-gradient(135deg,${C.primary} 0%,${C.primaryMid} 100%)`,
          border: "none",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(11,110,79,0.3)",
        }}
      >
        <Icon name="zap" size={24} color="#fff" />
      </button>
    </div>
  );
}

// ─── Kiosk View ───────────────────────────────────────────────────────────────
function KioskView({ children, onBack, onSaveMeasurement, theme }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [step, setStep] = useState(0);
  const [selectedChild, setSelectedChild] = useState(null);
  const [form, setForm] = useState({ height_cm: "", weight_kg: "" });
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [sensorStage, setSensorStage] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const timerRef = useRef();
  const sensorStages = [
    { label: "Initializing sensors...", iconName: "scan" },
    { label: "Connecting to TF-Luna LiDAR...", iconName: "wifi" },
    { label: "Measuring height via LiDAR...", iconName: "ruler" },
    { label: "Reading load cell weight sensor...", iconName: "scale" },
    { label: "Processing anthropometric data...", iconName: "activity" },
    { label: "Computing WHO Z-Scores...", iconName: "barChart" },
    { label: "Saving to database...", iconName: "save" },
    { label: "Complete!", iconName: "checkCircle" },
  ];
  const kioskColors =
    theme === "dark"
      ? {
          bg: "linear-gradient(135deg,#0D2B20 0%,#0B3D2A 50%,#0D2B20 100%)",
          text: "#fff",
          textSoft: "rgba(255,255,255,0.7)",
          textMuted: "rgba(255,255,255,0.5)",
          textWeak: "rgba(255,255,255,0.4)",
          textFaint: "rgba(255,255,255,0.2)",
          shellAccent: C.primaryMid,
          shellAccentSoft: "rgba(26,143,104,0.2)",
          borderSoft: "rgba(255,255,255,0.08)",
          borderSoftAlt: "rgba(255,255,255,0.12)",
          panel: "rgba(255,255,255,0.04)",
          panelAlt: "rgba(255,255,255,0.05)",
          inputBg: "rgba(255,255,255,0.06)",
          inputBorder: "rgba(255,255,255,0.12)",
          buttonSoft: "rgba(255,255,255,0.06)",
          buttonSoftBorder: "rgba(255,255,255,0.1)",
          chipBg: "rgba(26,143,104,0.15)",
          chipBorder: "rgba(26,143,104,0.3)",
          chipText: C.primaryMid,
          cardBorder: "rgba(255,255,255,0.08)",
        }
      : {
          bg: "linear-gradient(135deg,#F7FBF9 0%,#EEF5F1 50%,#F8FAF9 100%)",
          text: C.text,
          textSoft: C.textMuted,
          textMuted: C.textMuted,
          textWeak: C.textLight,
          textFaint: "rgba(26,43,37,0.22)",
          shellAccent: C.primaryMid,
          shellAccentSoft: C.primaryLight,
          borderSoft: "rgba(11,110,79,0.12)",
          borderSoftAlt: "rgba(11,110,79,0.18)",
          panel: "rgba(255,255,255,0.92)",
          panelAlt: "rgba(255,255,255,0.96)",
          inputBg: "#fff",
          inputBorder: "rgba(11,110,79,0.16)",
          buttonSoft: "rgba(11,110,79,0.08)",
          buttonSoftBorder: "rgba(11,110,79,0.16)",
          chipBg: C.primaryLight,
          chipBorder: "rgba(26,143,104,0.18)",
          chipText: C.primaryMid,
          cardBorder: C.border,
        };
  const startMeasurement = () => {
    if (!form.height_cm || !form.weight_kg) return;
    setStep(2);
    setProgress(0);
    setSensorStage(0);
    let p = 0,
      s = 0;
    timerRef.current = setInterval(() => {
      p += 100 / 35;
      s = Math.floor((p / 100) * sensorStages.length);
      setProgress(Math.min(p, 100));
      setSensorStage(Math.min(s, sensorStages.length - 1));
      if (p >= 100) {
        clearInterval(timerRef.current);
        const r = computeWHO({
          weight_kg: parseFloat(form.weight_kg),
          height_cm: parseFloat(form.height_cm),
          age_months: selectedChild.age_months,
        });
        setResult(r);
        setTimeout(() => setStep(3), 400);
      }
    }, 100);
  };
  useEffect(() => () => clearInterval(timerRef.current), []);
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: kioskColors.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI',sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: `1px solid ${kioskColors.borderSoft}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: kioskColors.shellAccent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="heart" size={18} color="#fff" />
          </div>
          <div>
            <div
              style={{ color: kioskColors.text, fontWeight: 700, fontSize: 15 }}
            >
              SukatKalusugan
            </div>
            <div
              style={{
                color: kioskColors.textMuted,
                fontSize: 10,
                letterSpacing: 1,
              }}
            >
              ANTHROPOMETRIC KIOSK v1.0
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {["TF Luna LiDAR", "Load Cell", "WiFi"].map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 10,
                  color: kioskColors.chipText,
                  background: kioskColors.chipBg,
                  padding: "2px 6px",
                  borderRadius: 4,
                  border: `1px solid ${kioskColors.chipBorder}`,
                }}
              >
                ● {s}
              </span>
            ))}
          </div>
          <button
            onClick={onBack}
            style={{
              background: kioskColors.buttonSoft,
              color: kioskColors.textSoft,
              border: `1px solid ${kioskColors.buttonSoftBorder}`,
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            ← Exit Kiosk
          </button>
        </div>
      </div>
      {!showWelcome && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
            padding: "20px 0 0",
          }}
        >
          {["Select Child", "Enter Data", "Processing", "Results"].map(
            (s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        step > i
                          ? C.primaryMid
                          : step === i
                            ? kioskColors.shellAccentSoft
                            : kioskColors.panelAlt,
                      border: `2px solid ${step >= i ? kioskColors.shellAccent : kioskColors.borderSoftAlt}`,
                      color:
                        step >= i ? kioskColors.text : kioskColors.textFaint,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {step > i ? (
                      <Icon name="check" size={14} color="#fff" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div
                    style={{
                      color:
                        step === i
                          ? kioskColors.shellAccent
                          : kioskColors.textFaint,
                      fontSize: 10,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s}
                  </div>
                </div>
                {i < 3 && (
                  <div
                    style={{
                      width: 60,
                      height: 2,
                      background:
                        step > i
                          ? kioskColors.shellAccent
                          : kioskColors.borderSoft,
                      margin: "0 4px 16px",
                    }}
                  />
                )}
              </div>
            ),
          )}
        </div>
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        {showWelcome && (
          <div
            style={{
              width: "100%",
              maxWidth: 600,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: kioskColors.shellAccentSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 32,
              }}
            >
              <Icon name="heart" size={70} color={C.primaryMid} />
            </div>
            <div
              style={{
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  fontSize: 42,
                  fontWeight: 600,
                  color: kioskColors.textSoft,
                }}
              >
                Sukat
              </span>
              <span
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  color: kioskColors.shellAccent,
                }}
              >
                Kalusugan
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                color: kioskColors.textMuted,
                marginBottom: 28,
              }}
            >
              Anthropometric Kiosk
            </div>
            <p
              style={{
                color: kioskColors.textWeak,
                fontSize: 13,
                marginBottom: 32,
                lineHeight: 1.6,
                maxWidth: 420,
              }}
            >
              Making health accessible to every child
            </p>
            <div
              style={{
                marginBottom: 24,
                display: "flex",
                flexDirection: "column",
                gap: 30,
              }}
            >
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: kioskColors.text,
                  letterSpacing: -1,
                }}
              >
                {currentTime.toLocaleTimeString("en-PH", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </div>
              <div style={{ fontSize: 13, color: kioskColors.textMuted }}>
                {currentTime.toLocaleDateString("en-PH", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              style={{
                background: C.danger,
                color: kioskColors.text,
                border: "none",
                borderRadius: 12,
                padding: "16px 48px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                minWidth: 240,
              }}
            >
              Touch to Start
            </button>
          </div>
        )}
        {!showWelcome && step === 0 && (
          <div style={{ width: "100%", maxWidth: 700 }}>
            <h2
              style={{
                color: kioskColors.text,
                textAlign: "center",
                fontSize: 20,
                marginBottom: 6,
              }}
            >
              Select Child Profile
            </h2>
            <p
              style={{
                color: kioskColors.textWeak,
                textAlign: "center",
                fontSize: 13,
                marginBottom: 24,
              }}
            >
              Select from registered children
            </p>
            <div
              style={{
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon name="search" size={16} color={kioskColors.textWeak} />
              <input
                type="text"
                placeholder="Search by child name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: kioskColors.inputBg,
                  border: `1px solid ${kioskColors.inputBorder}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  color: kioskColors.text,
                  fontSize: 14,
                  outline: "none",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: kioskColors.buttonSoft,
                    border: "none",
                    borderRadius: 8,
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Icon name="x" size={14} color={kioskColors.textMuted} />
                </button>
              )}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                gap: 12,
              }}
            >
              {children
                .filter(
                  (c) =>
                    searchQuery === "" ||
                    `${c.first_name} ${c.last_name}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                )
                .slice(searchQuery === "" ? -3 : 0)
                .map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedChild(c);
                      setStep(1);
                    }}
                    style={{
                      background: kioskColors.panelAlt,
                      border: `1px solid ${kioskColors.cardBorder}`,
                      borderRadius: 12,
                      padding: 16,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background:
                          c.sex === "Female"
                            ? "rgba(240,98,146,0.2)"
                            : "rgba(30,136,229,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                      }}
                    >
                      <Icon
                        name={c.sex === "Female" ? "childFemale" : "childMale"}
                        size={20}
                        color={c.sex === "Female" ? "#F06292" : "#42A5F5"}
                      />
                    </div>
                    <div
                      style={{
                        color: kioskColors.text,
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {c.first_name} {c.last_name}
                    </div>
                    <div
                      style={{
                        color: kioskColors.textMuted,
                        fontSize: 11,
                        marginTop: 2,
                      }}
                    >
                      {c.age_months} months · {c.sex}
                    </div>
                    <div
                      style={{
                        color: kioskColors.textMuted,
                        fontSize: 10,
                        marginTop: 2,
                      }}
                    >
                      {c.child_code}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {!showWelcome && step === 1 && selectedChild && (
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              background: kioskColors.panel,
              borderRadius: 20,
              border: `1px solid ${kioskColors.cardBorder}`,
              padding: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: kioskColors.shellAccentSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name={
                    selectedChild.sex === "Female" ? "childFemale" : "childMale"
                  }
                  size={22}
                  color={selectedChild.sex === "Female" ? "#F06292" : "#42A5F5"}
                />
              </div>
              <div>
                <div
                  style={{
                    color: kioskColors.text,
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  {selectedChild.first_name} {selectedChild.last_name}
                </div>
                <div style={{ color: kioskColors.textMuted, fontSize: 12 }}>
                  {selectedChild.child_code} · {selectedChild.age_months} months
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {[
                {
                  label: "Height (cm)",
                  key: "height_cm",
                  placeholder: "e.g. 82.5",
                },
                {
                  label: "Weight (kg)",
                  key: "weight_kg",
                  placeholder: "e.g. 10.8",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    style={{
                      display: "block",
                      color: kioskColors.textMuted,
                      fontSize: 11,
                      marginBottom: 6,
                      letterSpacing: 0.5,
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      background: kioskColors.inputBg,
                      border: `1px solid ${kioskColors.inputBorder}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                      color: kioskColors.text,
                      fontSize: 16,
                      fontWeight: 600,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={startMeasurement}
              disabled={!form.height_cm || !form.weight_kg}
              style={{
                width: "100%",
                background:
                  form.height_cm && form.weight_kg
                    ? C.primaryMid
                    : kioskColors.panelAlt,
                color: kioskColors.text,
                border: "none",
                borderRadius: 12,
                padding: "14px 0",
                fontSize: 15,
                fontWeight: 700,
                cursor:
                  form.height_cm && form.weight_kg ? "pointer" : "not-allowed",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                <Icon name="scan" size={16} color={kioskColors.text} /> START
                MEASUREMENT
              </span>
            </button>
          </div>
        )}
        {!showWelcome && step === 2 && (
          <div style={{ textAlign: "center", width: "100%", maxWidth: 420 }}>
            <div
              style={{
                position: "relative",
                width: 140,
                height: 140,
                margin: "0 auto 28px",
              }}
            >
              <svg
                width={140}
                height={140}
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <circle
                  cx={70}
                  cy={70}
                  r={60}
                  fill="none"
                  stroke={kioskColors.borderSoft}
                  strokeWidth={6}
                />
                <circle
                  cx={70}
                  cy={70}
                  r={60}
                  fill="none"
                  stroke={C.primaryMid}
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
                  transform="rotate(-90 70 70)"
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name={sensorStages[sensorStage]?.iconName || "activity"}
                  size={28}
                  color={kioskColors.shellAccent}
                />
                <div
                  style={{
                    color: kioskColors.text,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            <div
              style={{
                color: kioskColors.shellAccent,
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {sensorStages[sensorStage]?.label}
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {sensorStages.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 11,
                    color:
                      i <= sensorStage
                        ? kioskColors.textSoft
                        : kioskColors.textFaint,
                  }}
                >
                  <span>
                    {i < sensorStage ? (
                      <Icon
                        name="check"
                        size={12}
                        color={kioskColors.shellAccent}
                      />
                    ) : i === sensorStage ? (
                      <Icon name="playCircle" size={12} color={C.accent} />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          border: `1px solid ${kioskColors.borderSoftAlt}`,
                        }}
                      />
                    )}
                  </span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        )}
        {!showWelcome && step === 3 && result && selectedChild && (
          <div style={{ width: "100%", maxWidth: 560 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>
                {result.status === "Normal" ? (
                  <Icon name="checkCircle" size={48} color={C.primary} />
                ) : (
                  <Icon name="alertCircle" size={48} color={C.danger} />
                )}
              </div>
              <h2 style={{ color: kioskColors.text, fontSize: 22, margin: 0 }}>
                Measurement Complete
              </h2>
              <p style={{ color: kioskColors.textWeak, fontSize: 13 }}>
                {selectedChild.first_name} {selectedChild.last_name} ·{" "}
                {selectedChild.age_months} months
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16,
              }}
            >
              {[
                ["HEIGHT", form.height_cm, "cm"],
                ["WEIGHT", form.weight_kg, "kg"],
              ].map(([l, v, u]) => (
                <div
                  key={l}
                  style={{
                    background: kioskColors.panel,
                    borderRadius: 12,
                    padding: 16,
                    border: `1px solid ${kioskColors.cardBorder}`,
                  }}
                >
                  <div
                    style={{
                      color: kioskColors.textMuted,
                      fontSize: 10,
                      letterSpacing: 1,
                    }}
                  >
                    {l}
                  </div>
                  <div
                    style={{
                      color: kioskColors.text,
                      fontSize: 28,
                      fontWeight: 700,
                    }}
                  >
                    {v}
                    <span style={{ fontSize: 14, marginLeft: 2 }}>{u}</span>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: kioskColors.panel,
                borderRadius: 16,
                padding: 20,
                border: `1px solid ${statusColor(result.status)}40`,
                marginBottom: 16,
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
                <div style={{ color: kioskColors.textMuted, fontSize: 12 }}>
                  NUTRITIONAL STATUS
                </div>
                <div
                  style={{
                    background: statusBg(result.status),
                    color: statusColor(result.status),
                    padding: "4px 14px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {result.status}
                </div>
              </div>
              <div style={{ display: "flex", gap: 0 }}>
                {[
                  { label: "Weight-for-Age", val: result.waz, color: C.accent },
                  { label: "Height-for-Age", val: result.haz, color: C.info },
                  {
                    label: "Weight-for-Height",
                    val: result.whz,
                    color: C.primaryMid,
                  },
                ].map((z) => (
                  <div
                    key={z.label}
                    style={{ flex: 1, textAlign: "center", padding: "8px 0" }}
                  >
                    <div
                      style={{ color: z.color, fontSize: 20, fontWeight: 700 }}
                    >
                      {z.val > 0 ? `+${z.val}` : z.val}
                    </div>
                    <div
                      style={{
                        color: kioskColors.textMuted,
                        fontSize: 9,
                        marginTop: 2,
                      }}
                    >
                      {z.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => {
                  onSaveMeasurement({
                    child_id: selectedChild.id,
                    child: `${selectedChild.first_name} ${selectedChild.last_name}`,
                    height_cm: parseFloat(form.height_cm),
                    weight_kg: parseFloat(form.weight_kg),
                    age_months: selectedChild.age_months,
                    measurement_date: new Date().toISOString().split("T")[0],
                    source_type: "kiosk",
                    nutritional_status: result.status,
                    waz: result.waz,
                    haz: result.haz,
                    whz: result.whz,
                  });
                  setStep(0);
                  setSelectedChild(null);
                  setForm({ height_cm: "", weight_kg: "" });
                  setResult(null);
                }}
                style={{
                  flex: 1,
                  background: C.primaryMid,
                  color: kioskColors.text,
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 0",
                  fontSize: 14,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Save & New Measurement
              </button>
              <button
                onClick={onBack}
                style={{
                  flex: 1,
                  background: kioskColors.buttonSoft,
                  color: kioskColors.text,
                  border: `1px solid ${kioskColors.buttonSoftBorder}`,
                  borderRadius: 10,
                  padding: "12px 0",
                  fontSize: 14,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard (VitalHealth-style layout) ─────────────────────────────────────
function Dashboard({ children, measurements, parents, nutritionists }) {
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [chartView, setChartView] = useState("monthly");
  const [tableTab, setTableTab] = useState("today");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const EVENTS = {
    5: [{ type: "timbang", label: "Oplan Timbang – Bagong Silang" }],
    12: [{ type: "meeting", label: "Health Worker Team Meeting" }],
    15: [{ type: "timbang", label: "Oplan Timbang – Poblacion" }],
    20: [{ type: "outreach", label: "Nutrition Outreach – San Jose" }],
    22: [{ type: "timbang", label: "Oplan Timbang – Sta. Cruz" }],
    28: [{ type: "meeting", label: "Monthly Review Meeting" }],
    30: [{ type: "outreach", label: "Nutrition Counseling Session" }],
  };
  const EVENT_COLORS = { timbang: C.danger, meeting: C.info, outreach: C.warn };

  const CHART_DATA = {
    monthly: {
      labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"],
      normal: [42, 45, 47, 50, 53, 55],
      risk: [25, 23, 19, 14, 10, 8],
    },
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      normal: [5, 6, 4, 7, 6, 3, 5],
      risk: [3, 2, 3, 1, 2, 1, 2],
    },
    today: {
      labels: [
        "10am",
        "11am",
        "12pm",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "6pm",
        "7pm",
      ],
      normal: [3, 4, 5, 6, 5, 4, 6, 7, 5, 4],
      risk: [2, 1, 2, 1, 2, 3, 1, 2, 1, 2],
    },
  };

  const statusCounts = children.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});
  const atRisk =
    (statusCounts["Underweight"] || 0) +
    (statusCounts["Severely Underweight"] || 0) +
    (statusCounts["Stunted"] || 0) +
    (statusCounts["Wasted"] || 0);

  const statCards = [
    {
      label: "Children",
      value: children.length,
      delta: "+15.9%",
      desc: "Total registered children",
      icon: "children",
      color: C.primary,
      bg: C.primaryLight,
    },
    {
      label: "Nutritionists",
      value: nutritionists.length,
      delta: "+15.9%",
      desc: "Active health workers",
      icon: "activity",
      color: C.purple,
      bg: C.purpleLight,
    },
    {
      label: "Parents",
      value: parents.length,
      delta: "+15.9%",
      desc: "Registered guardians",
      icon: "parents",
      color: C.info,
      bg: C.infoLight,
    },
    {
      label: "Measurements",
      value: measurements.length,
      delta: `${statusCounts["Normal"] || 0} Normal`,
      desc: `${atRisk} need attention`,
      icon: "measurements",
      color: C.warn,
      bg: C.warnLight,
    },
  ];

  // Chart.js init
  useEffect(() => {
    const d = CHART_DATA[chartView];
    if (chartInstance.current) {
      chartInstance.current.data.labels = d.labels;
      chartInstance.current.data.datasets[0].data = d.normal;
      chartInstance.current.data.datasets[1].data = d.risk;
      chartInstance.current.update();
      return;
    }
    const init = () => {
      if (!window.Chart || !chartRef.current) return;
      chartInstance.current = new window.Chart(chartRef.current, {
        type: "line",
        data: {
          labels: d.labels,
          datasets: [
            {
              label: "Normal",
              data: d.normal,
              borderColor: C.primaryMid,
              backgroundColor: C.primaryMid + "14",
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: C.primaryMid,
              borderWidth: 2,
              fill: true,
            },
            {
              label: "At Risk",
              data: d.risk,
              borderColor: "#D4637A",
              backgroundColor: "#D4637A0A",
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "#D4637A",
              borderWidth: 2,
              fill: true,
              borderDash: [5, 3],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: {
              grid: { color: "rgba(0,0,0,0.05)" },
              ticks: { font: { size: 10 } },
              beginAtZero: true,
            },
          },
        },
      });
    };
    if (window.Chart) {
      init();
    } else {
      const existing = document.querySelector('script[data-chartjs="1"]');
      if (!existing) {
        const s = document.createElement("script");
        s.src =
          "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
        s.setAttribute("data-chartjs", "1");
        s.onload = init;
        document.head.appendChild(s);
      } else {
        existing.addEventListener("load", init);
        if (window.Chart) init();
      }
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  });

  useEffect(() => {
    if (!chartInstance.current) return;
    const d = CHART_DATA[chartView];
    chartInstance.current.data.labels = d.labels;
    chartInstance.current.data.datasets[0].data = d.normal;
    chartInstance.current.data.datasets[1].data = d.risk;
    chartInstance.current.update();
  });

  // Calendar
  function renderCalendar() {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const totalDays = new Date(calYear, calMonth + 1, 0).getDate();
    const prevTotal = new Date(calYear, calMonth, 0).getDate();
    const today = new Date();
    const isCurrentMonth =
      today.getFullYear() === calYear && today.getMonth() === calMonth;
    const cells = [];
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div
          key={`p${i}`}
          style={{
            fontSize: 11,
            padding: "5px 0",
            textAlign: "center",
            color: C.textLight,
          }}
        >
          {prevTotal - firstDay + 1 + i}
        </div>,
      );
    }
    for (let d = 1; d <= totalDays; d++) {
      const ev = EVENTS[d];
      const isToday = isCurrentMonth && d === today.getDate();
      cells.push(
        <div
          key={d}
          title={ev ? ev.map((e) => e.label).join(", ") : ""}
          style={{
            fontSize: 11,
            textAlign: "center",
            position: "relative",
            cursor: ev ? "pointer" : "default",
            borderRadius: isToday ? "50%" : 6,
            width: isToday ? 26 : "auto",
            height: isToday ? 26 : 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: isToday ? "auto" : "1px 0",
            background: isToday ? C.primary : "transparent",
            color: isToday ? "#fff" : ev ? C.text : C.textMuted,
            fontWeight: isToday ? 700 : ev ? 600 : 400,
          }}
        >
          {d}
          {ev && (
            <span
              style={{
                position: "absolute",
                bottom: 1,
                left: "50%",
                transform: "translateX(-50%)",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: EVENT_COLORS[ev[0].type],
              }}
            />
          )}
        </div>,
      );
    }
    return cells;
  }

  const tableChildren =
    tableTab === "today"
      ? children.slice(0, 4)
      : tableTab === "weekly"
        ? children.slice(0, 6)
        : children;

  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>
          Good morning, Admin!
        </h1>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "3px 0 0" }}>
          Here's a summary of child health monitoring —{" "}
          {new Date().toLocaleDateString("en-PH", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 18,
        }}
      >
        {statCards.map((s, i) => (
          <div
            key={s.label}
            style={{
              background: i === 1 ? C.primaryMid : C.card,
              borderRadius: 14,
              padding: "16px 18px",
              border: `1px solid ${i === 1 ? C.primaryMid : C.border}`,
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: i === 1 ? "rgba(255,255,255,0.2)" : s.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name={s.icon}
                    size={14}
                    color={i === 1 ? "#fff" : s.color}
                  />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: i === 1 ? "rgba(255,255,255,0.85)" : C.textMuted,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </span>
              </div>
              <span
                style={{
                  fontSize: 18,
                  color: i === 1 ? "rgba(255,255,255,0.4)" : C.textLight,
                  letterSpacing: 2,
                  cursor: "pointer",
                }}
              >
                ···
              </span>
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: i === 1 ? "#fff" : s.color,
                marginBottom: 3,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 11,
                color: i === 1 ? "rgba(255,255,255,0.7)" : C.primary,
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              ↑ {s.delta}
            </div>
            <div
              style={{
                fontSize: 10,
                color: i === 1 ? "rgba(255,255,255,0.55)" : C.textMuted,
                lineHeight: 1.4,
              }}
            >
              {s.desc}
            </div>
            <svg
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                opacity: i === 1 ? 0.18 : 0.06,
              }}
              width={80}
              height={40}
              viewBox="0 0 80 40"
            >
              <polyline
                points="0,35 15,25 30,30 45,15 60,20 80,5"
                fill="none"
                stroke={i === 1 ? "#fff" : s.color}
                strokeWidth={2}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* ── Middle Row: Chart + Calendar ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 288px",
          gap: 14,
          marginBottom: 16,
        }}
      >
        {/* Chart */}
        <div
          style={{
            background: C.card,
            borderRadius: 14,
            border: `1px solid ${C.border}`,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>
                Patient Overview
              </div>
              <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>
                Growth & nutritional status trends
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  ["On Time", C.primaryMid],
                  ["On Late", "#D4637A"],
                ].map(([lbl, col]) => (
                  <span
                    key={lbl}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      color: C.textMuted,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: col,
                        display: "inline-block",
                      }}
                    />
                    {lbl}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {["today", "weekly", "monthly"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setChartView(t)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      cursor: "pointer",
                      fontWeight: chartView === t ? 600 : 400,
                      border: `1px solid ${chartView === t ? C.primary : C.border}`,
                      background: chartView === t ? C.primaryLight : C.card,
                      color: chartView === t ? C.primary : C.textMuted,
                    }}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", height: 180 }}>
            <canvas ref={chartRef} />
          </div>
        </div>

        {/* Calendar */}
        <div
          style={{
            background: C.card,
            borderRadius: 14,
            border: `1px solid ${C.border}`,
            padding: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>
              Calendar
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <button
                onClick={() => {
                  let m = calMonth - 1,
                    y = calYear;
                  if (m < 0) {
                    m = 11;
                    y--;
                  }
                  setCalMonth(m);
                  setCalYear(y);
                }}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: `1px solid ${C.border}`,
                  background: C.bg,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: C.textMuted,
                }}
              >
                ‹
              </button>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.text,
                  minWidth: 90,
                  textAlign: "center",
                }}
              >
                {MONTHS[calMonth]} {calYear}
              </span>
              <button
                onClick={() => {
                  let m = calMonth + 1,
                    y = calYear;
                  if (m > 11) {
                    m = 0;
                    y++;
                  }
                  setCalMonth(m);
                  setCalYear(y);
                }}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: `1px solid ${C.border}`,
                  background: C.bg,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: C.textMuted,
                }}
              >
                ›
              </button>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              gap: 1,
              marginBottom: 3,
            }}
          >
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  color: C.textMuted,
                  fontWeight: 600,
                  padding: "3px 0",
                }}
              >
                {d}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              gap: 1,
            }}
          >
            {renderCalendar()}
          </div>
          <div
            style={{
              marginTop: 10,
              borderTop: `1px solid ${C.border}`,
              paddingTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[
              { color: C.danger, label: "Oplan Timbang" },
              { color: C.info, label: "Team Meeting" },
              { color: C.warn, label: "Outreach" },
            ].map((leg) => (
              <div
                key={leg.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 10,
                  color: C.textMuted,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: leg.color,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {leg.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Patient Table ── */}
      <div
        style={{
          background: C.card,
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>
              Patient Overview
            </div>
            <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>
              Latest registered children and their health status
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["today", "weekly", "monthly", "yearly"].map((t) => (
              <button
                key={t}
                onClick={() => setTableTab(t)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  fontSize: 11,
                  cursor: "pointer",
                  fontWeight: tableTab === t ? 600 : 400,
                  border: `1px solid ${tableTab === t ? C.primary : C.border}`,
                  background: tableTab === t ? C.primaryLight : C.card,
                  color: tableTab === t ? C.primary : C.textMuted,
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {[
                "No",
                "Name",
                "Age (months)",
                "Date of Birth",
                "Status",
                "Email address",
                "Phone",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "9px 14px",
                    fontSize: 11,
                    color: C.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${C.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h === "" ? null : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableChildren.map((c, i) => (
              <tr
                key={c.id}
                style={{
                  borderBottom:
                    i < tableChildren.length - 1
                      ? `1px solid ${C.border}`
                      : "none",
                }}
              >
                <td
                  style={{
                    padding: "px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: c.sex === "Female" ? "#FCE4EC" : "#E3F2FD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: c.sex === "Female" ? "#F06292" : "#42A5F5",
                        flexShrink: 0,
                      }}
                    >
                      {(c.first_name[0] + c.last_name[0]).toUpperCase()}
                    </div>
                    <div>
                      <div
                        style={{ fontSize: 12, fontWeight: 600, color: C.text }}
                      >
                        {c.first_name} {c.last_name}
                      </div>
                      <div style={{ fontSize: 10, color: C.textMuted }}>
                        {c.barangay}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "10px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                  }}
                >
                  {c.age_months}
                </td>
                <td
                  style={{
                    padding: "10px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.birthdate}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <StatusBadge status={c.status} />
                </td>
                <td
                  style={{
                    padding: "10px 14px",
                    fontSize: 11,
                    color: C.textMuted,
                  }}
                >
                  {(c.parent || "parent").toLowerCase().replace(/\s+/g, ".")}
                  @email.com
                </td>
                <td
                  style={{
                    padding: "10px 14px",
                    fontSize: 11,
                    color: C.textMuted,
                  }}
                >
                  (316) 555-0116
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button
                      style={{
                        background: C.infoLight,
                        color: C.info,
                        border: "none",
                        borderRadius: 7,
                        padding: "5px 8px",
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="edit" size={12} color={C.info} />
                    </button>
                    <button
                      style={{
                        background: C.dangerLight,
                        color: C.danger,
                        border: "none",
                        borderRadius: 7,
                        padding: "5px 8px",
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="trash" size={12} color={C.danger} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Children List ────────────────────────────────────────────────────────────
function ChildrenList({ children, onViewChild, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const statuses = [
    "All",
    "Normal",
    "Underweight",
    "Severely Underweight",
    "Stunted",
    "Wasted",
    "Overweight",
  ];
  const filtered = children.filter(
    (c) =>
      (filter === "All" || c.status === filter) &&
      `${c.first_name} ${c.last_name} ${c.child_code}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <div>
      <PageHeader
        title="Child Profiles"
        subtitle={`${children.length} registered children`}
        action={
          <button onClick={onAdd} style={PAGE_PRIMARY_BUTTON_STYLE}>
            <Icon name="plus" size={14} color="#fff" /> Add Child
          </button>
        }
      />
      <div
        style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}
      >
        <input
          placeholder="Search children..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            padding: "9px 14px",
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            fontSize: 13,
            outline: "none",
            background: C.card,
          }}
        />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                border: `1px solid ${filter === s ? statusColor(s) : C.border}`,
                background: filter === s ? statusBg(s) : C.card,
                color: filter === s ? statusColor(s) : C.textMuted,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          background: C.card,
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {[
                "Code",
                "Name",
                "Age",
                "Sex",
                "Barangay",
                "Parent",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 14px",
                    fontSize: 11,
                    color: C.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr
                key={c.id}
                style={{
                  borderBottom:
                    i < filtered.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                    fontFamily: "monospace",
                  }}
                >
                  {c.child_code}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: c.sex === "Female" ? "#FCE4EC" : "#E3F2FD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        name={c.sex === "Female" ? "childFemale" : "childMale"}
                        size={20}
                        color={c.sex === "Female" ? "#F06292" : "#42A5F5"}
                      />
                    </div>
                    <div>
                      <div
                        style={{ fontSize: 13, fontWeight: 600, color: C.text }}
                      >
                        {c.first_name} {c.last_name}
                      </div>
                      <div style={{ fontSize: 10, color: C.textMuted }}>
                        {c.birthdate}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {c.age_months} mo
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {c.sex}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                  }}
                >
                  {c.barangay}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                  }}
                >
                  {c.parent}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <StatusBadge status={c.status} />
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => onViewChild(c)}
                      style={{
                        background: C.primaryLight,
                        color: C.primary,
                        border: "none",
                        borderRadius: 7,
                        padding: "5px 10px",
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(c)}
                      style={{
                        background: C.infoLight,
                        color: C.info,
                        border: "none",
                        borderRadius: 7,
                        padding: "5px 8px",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="edit" size={12} color={C.info} />
                    </button>
                    <button
                      onClick={() => onDelete(c)}
                      style={{
                        background: C.dangerLight,
                        color: C.danger,
                        border: "none",
                        borderRadius: 7,
                        padding: "5px 8px",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="trash" size={12} color={C.danger} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    padding: 32,
                    textAlign: "center",
                    color: C.textMuted,
                    fontSize: 13,
                  }}
                >
                  No children found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Child Detail ─────────────────────────────────────────────────────────────
function ChildDetail({ child, measurements, onBack }) {
  const childMeasurements = measurements.filter((m) => m.child_id === child.id);
  const latest = childMeasurements[0];
  return (
    <div>
      <PageHeader
        title={`${child.first_name} ${child.last_name}`}
        subtitle={`${child.child_code} • ${child.barangay} • ${child.age_months} months`}
        action={
          <button
            onClick={onBack}
            style={{
              background: C.bg,
              color: C.text,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back to Children
          </button>
        }
      />
      <div
        style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}
      >
        <div
          style={{
            background: C.card,
            borderRadius: 18,
            border: `1px solid ${C.border}`,
            padding: 24,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: child.sex === "Female" ? "#FCE4EC" : "#E3F2FD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}
            >
              <Icon
                name={child.sex === "Female" ? "childFemale" : "childMale"}
                size={36}
                color={child.sex === "Female" ? "#F06292" : "#42A5F5"}
              />
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: C.text,
              }}
            >
              {child.first_name} {child.last_name}
            </h2>
            <div
              style={{ color: C.textMuted, fontSize: 12, margin: "4px 0 10px" }}
            >
              {child.child_code}
            </div>
            {latest && <StatusBadge status={latest.nutritional_status} />}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            {[
              ["Birthdate", child.birthdate],
              ["Age", `${child.age_months} months`],
              ["Sex", child.sex],
              ["Barangay", child.barangay],
              ["Parent/Guardian", child.parent],
              ["Address", child.address],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <span style={{ fontSize: 12, color: C.textMuted }}>{k}</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: C.text,
                    textAlign: "right",
                    maxWidth: "55%",
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {latest && (
            <div
              style={{
                background: C.card,
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: C.text,
                  marginBottom: 4,
                }}
              >
                Latest WHO Growth Results
              </div>
              <div
                style={{ color: C.textMuted, fontSize: 11, marginBottom: 16 }}
              >
                Measured on {latest.measurement_date}
              </div>
              <div style={{ display: "flex", gap: 0 }}>
                <ZScoreGauge
                  label="Weight-for-Age"
                  value={latest.waz}
                  color={C.accent}
                />
                <ZScoreGauge
                  label="Height-for-Age"
                  value={latest.haz}
                  color={C.info}
                />
                <ZScoreGauge
                  label="Weight-for-Height"
                  value={latest.whz}
                  color={C.primaryMid}
                />
              </div>
              <div
                style={{
                  marginTop: 12,
                  background: statusBg(latest.nutritional_status),
                  border: `1px solid ${statusColor(latest.nutritional_status)}30`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: statusColor(latest.nutritional_status),
                    fontWeight: 600,
                  }}
                >
                  Nutritional Status: {latest.nutritional_status}
                </span>
                <span style={{ fontSize: 11, color: C.textMuted }}>
                  Height: {latest.height_cm}cm | Weight: {latest.weight_kg}kg
                </span>
              </div>
            </div>
          )}
          <div
            style={{
              background: C.card,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 20,
              flex: 1,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: C.text,
                marginBottom: 14,
              }}
            >
              Measurement History
            </div>
            {childMeasurements.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: C.textMuted,
                  fontSize: 13,
                  padding: 20,
                }}
              >
                No measurements recorded
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {[
                      "Date",
                      "Height",
                      "Weight",
                      "Age",
                      "WAZ",
                      "HAZ",
                      "WHZ",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "6px 10px",
                          fontSize: 11,
                          color: C.textMuted,
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {childMeasurements.map((m) => (
                    <tr
                      key={m.id}
                      style={{ borderBottom: `1px solid ${C.border}` }}
                    >
                      <td style={{ padding: "8px 10px", fontSize: 12 }}>
                        {m.measurement_date}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.textMuted,
                        }}
                      >
                        {m.height_cm}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.textMuted,
                        }}
                      >
                        {m.weight_kg}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.textMuted,
                        }}
                      >
                        {m.age_months}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.accent,
                        }}
                      >
                        {m.waz > 0 ? "+" : ""}
                        {m.waz}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.info,
                        }}
                      >
                        {m.haz > 0 ? "+" : ""}
                        {m.haz}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.primaryMid,
                        }}
                      >
                        {m.whz > 0 ? "+" : ""}
                        {m.whz}
                      </td>
                      <td style={{ padding: "8px 10px" }}>
                        <StatusBadge status={m.nutritional_status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Measurements Page ────────────────────────────────────────────────────────
function MeasurementsPage({ measurements, onAdd, onDelete }) {
  return (
    <div>
      <PageHeader
        title="Anthropometric Records"
        subtitle={`${measurements.length} measurements recorded`}
        action={
          <button onClick={onAdd} style={PAGE_PRIMARY_BUTTON_STYLE}>
            <Icon name="plus" size={14} color="#fff" /> Add Record
          </button>
        }
      />
      <div
        style={{
          ...PAGE_SURFACE_STYLE,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {[
                "#",
                "Child",
                "Height (cm)",
                "Weight (kg)",
                "Age (mo)",
                "WAZ",
                "HAZ",
                "WHZ",
                "Date",
                "Source",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 14px",
                    fontSize: 11,
                    color: C.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${C.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {measurements.map((m) => (
              <tr key={m.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                  }}
                >
                  {m.id}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.text,
                  }}
                >
                  {m.child}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {m.height_cm}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {m.weight_kg}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {m.age_months}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      m.waz < -2 ? C.danger : m.waz > 2 ? C.warn : C.primary,
                  }}
                >
                  {m.waz > 0 ? "+" : ""}
                  {m.waz}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: m.haz < -2 ? C.danger : C.info,
                  }}
                >
                  {m.haz > 0 ? "+" : ""}
                  {m.haz}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      m.whz < -2 ? C.danger : m.whz > 2 ? C.warn : C.primaryMid,
                  }}
                >
                  {m.whz > 0 ? "+" : ""}
                  {m.whz}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.measurement_date}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <span
                    style={{
                      background: C.bg,
                      padding: "2px 8px",
                      borderRadius: 6,
                      fontSize: 11,
                      color: C.textMuted,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        verticalAlign: "middle",
                      }}
                    >
                      <SourceIcon type={m.source_type} size={11} />{" "}
                      {m.source_type}
                    </span>
                  </span>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <StatusBadge status={m.nutritional_status} />
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <button
                    onClick={() => onDelete(m)}
                    style={{
                      background: C.dangerLight,
                      color: C.danger,
                      border: "none",
                      borderRadius: 7,
                      padding: "5px 8px",
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="trash" size={12} color={C.danger} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Parents Page ─────────────────────────────────────────────────────────────
function ParentsPage({
  parents,
  children,
  measurements,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [selectedParent, setSelectedParent] = useState(null);
  const childrenByParent = children.reduce((acc, c) => {
    if (!acc[c.parent]) acc[c.parent] = [];
    acc[c.parent].push(c);
    return acc;
  }, {});
  return (
    <div>
      <PageHeader
        title="Parent Accounts"
        subtitle={`${parents.length} registered parents`}
        action={
          <button onClick={onAdd} style={PAGE_PRIMARY_BUTTON_STYLE}>
            <Icon name="plus" size={14} color="#fff" /> Add Parent
          </button>
        }
      />
      {selectedParent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,30,20,0.55)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={() => setSelectedParent(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: C.card,
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              width: "100%",
              maxWidth: 640,
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: C.bg,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: C.primaryLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 15,
                    color: C.primary,
                  }}
                >
                  {selectedParent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>
                    {selectedParent.name}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>
                    {(childrenByParent[selectedParent.name] || []).length}{" "}
                    registered child(ren)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedParent(null)}
                style={{
                  background: C.border,
                  border: "none",
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Icon name="x" size={16} color={C.textMuted} />
              </button>
            </div>
            <div style={{ overflowY: "auto", padding: 24 }}>
              {(childrenByParent[selectedParent.name] || []).map((child) => {
                const latest = measurements.find(
                  (m) => m.child_id === child.id,
                );
                return (
                  <div
                    key={child.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      alignItems: "center",
                      gap: 16,
                      background: C.bg,
                      borderRadius: 12,
                      padding: "14px 16px",
                      border: `1px solid ${C.border}`,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background:
                          child.sex === "Female" ? "#FCE4EC" : "#E3F2FD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        name={
                          child.sex === "Female" ? "childFemale" : "childMale"
                        }
                        size={22}
                        color={child.sex === "Female" ? "#F06292" : "#42A5F5"}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: C.text,
                          marginBottom: 2,
                        }}
                      >
                        {child.first_name} {child.last_name}
                      </div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>
                        {child.child_code} · {child.age_months} months ·{" "}
                        {child.barangay}
                      </div>
                      {latest && (
                        <div
                          style={{
                            fontSize: 11,
                            color: C.textMuted,
                            marginTop: 2,
                          }}
                        >
                          Last measured: {latest.measurement_date} —{" "}
                          {latest.height_cm}cm / {latest.weight_kg}kg
                        </div>
                      )}
                    </div>
                    <StatusBadge status={child.status} />
                  </div>
                );
              })}
              {(childrenByParent[selectedParent.name] || []).length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    color: C.textMuted,
                    fontSize: 13,
                    padding: "32px 0",
                  }}
                >
                  No children registered.
                </div>
              )}
            </div>
            <div
              style={{
                padding: "14px 24px",
                borderTop: `1px solid ${C.border}`,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setSelectedParent(null)}
                style={{
                  background: C.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "9px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 14,
        }}
      >
        {parents.map((p) => {
          const pChildren = childrenByParent[p.name] || [];
          return (
            <div
              key={p.id}
              style={{
                background: C.card,
                borderRadius: 14,
                border: `1px solid ${C.border}`,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: C.primaryLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 16,
                    color: C.primary,
                  }}
                >
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>
                    {p.name}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 10,
                      background:
                        p.status === "Active" ? C.primaryLight : "#f5f5f5",
                      color: p.status === "Active" ? C.primary : C.textMuted,
                      fontWeight: 600,
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderTop: `1px solid ${C.border}`,
                  paddingTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {[
                  ["mail", p.email],
                  ["phone", p.phone],
                  ["baby", `${pChildren.length} child(ren)`],
                ].map(([icon, val]) => (
                  <div
                    key={val}
                    style={{
                      fontSize: 12,
                      color: C.textMuted,
                      display: "flex",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <Icon name={icon} size={13} color={C.textMuted} />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
                <button
                  onClick={() => setSelectedParent(p)}
                  style={{
                    flex: 1,
                    background: C.primaryLight,
                    color: C.primary,
                    border: `1px solid ${C.primary}22`,
                    borderRadius: 8,
                    padding: "8px 0",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="eye" size={13} color={C.primary} /> Children (
                    {pChildren.length})
                  </span>
                </button>
                <button
                  onClick={() => onEdit(p)}
                  style={{
                    background: C.infoLight,
                    color: C.info,
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 10px",
                    cursor: "pointer",
                  }}
                >
                  <Icon name="edit" size={13} color={C.info} />
                </button>
                <button
                  onClick={() => onDelete(p)}
                  style={{
                    background: C.dangerLight,
                    color: C.danger,
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 10px",
                    cursor: "pointer",
                  }}
                >
                  <Icon name="trash" size={13} color={C.danger} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Nutritionists Page ───────────────────────────────────────────────────────
function NutritionistsPage({ nutritionists, onAdd, onEdit, onDelete }) {
  return (
    <div>
      <PageHeader
        title="Nutritionists & Health Workers"
        subtitle={`${nutritionists.length} registered professionals`}
        action={
          <button onClick={onAdd} style={PAGE_PRIMARY_BUTTON_STYLE}>
            <Icon name="plus" size={14} color="#fff" /> Add Nutritionist
          </button>
        }
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: 14,
        }}
      >
        {nutritionists.map((n) => (
          <div
            key={n.id}
            style={{
              background: C.card,
              borderRadius: 14,
              border: `1px solid ${C.border}`,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: C.info,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                {n.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>
                  {n.name}
                </div>
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 8px",
                    borderRadius: 6,
                    background:
                      n.status === "Active" ? C.primaryLight : "#f5f5f5",
                    color: n.status === "Active" ? C.primary : C.textMuted,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  {n.status}
                </span>
              </div>
            </div>
            <div
              style={{
                background: "#f9faf8",
                borderRadius: 10,
                padding: 12,
                marginBottom: 12,
                fontSize: 12,
                fontWeight: 600,
                color: C.primary,
              }}
            >
              {n.role}
            </div>
            <div
              style={{
                borderTop: `1px solid ${C.border}`,
                paddingTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {[
                ["mail", n.email],
                ["phone", n.phone],
              ].map(([icon, val]) => (
                <div
                  key={val}
                  style={{
                    fontSize: 11,
                    color: C.textMuted,
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon name={icon} size={13} color={C.textMuted} />
                  <span>{val}</span>
                </div>
              ))}
              {n.license_number && (
                <div
                  style={{
                    fontSize: 10,
                    color: C.textMuted,
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    paddingTop: 6,
                    borderTop: `1px solid ${C.border}`,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    ID: {n.license_number}
                  </span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
              <button
                onClick={() => onEdit(n)}
                style={{
                  flex: 1,
                  background: C.infoLight,
                  color: C.info,
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 0",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <Icon name="edit" size={13} color={C.info} /> Edit
              </button>
              <button
                onClick={() => onDelete(n)}
                style={{
                  background: C.dangerLight,
                  color: C.danger,
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 10px",
                  cursor: "pointer",
                }}
              >
                <Icon name="trash" size={13} color={C.danger} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Reports Page ─────────────────────────────────────────────────────────────
const REPORT_RANGE_OPTIONS = [
  { id: "12m", label: "12 Months", months: 12 },
  { id: "6m", label: "6 Months", months: 6 },
  { id: "30d", label: "30 Days", months: 2 },
  { id: "7d", label: "7 Days", months: 1 },
];

const REPORT_STATUS_META = {
  Normal: { label: "Normal", color: C.primary, tint: C.primaryLight },
  Underweight: { label: "Underweight", color: C.warn, tint: C.warnLight },
  Stunted: { label: "Stunted", color: C.info, tint: C.infoLight },
  Wasted: { label: "Wasted", color: C.danger, tint: C.dangerLight },
  "Severely Underweight": {
    label: "Severely Underweight",
    color: C.danger,
    tint: C.dangerLight,
  },
  Overweight: { label: "Overweight", color: C.purple, tint: C.purpleLight },
};

const REPORT_SEVERITY_ORDER = {
  "Severely Underweight": 4,
  Wasted: 3,
  Stunted: 2,
  Underweight: 1,
  Overweight: 1,
  Normal: 0,
};

const REPORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseReportDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatReportMonth(date) {
  return `${REPORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function formatReportMonthShort(date) {
  return REPORT_MONTHS[date.getMonth()];
}

function getReportRangeAnchor(measurements) {
  const dates = measurements
    .map((measurement) => parseReportDate(measurement.measurement_date))
    .filter(Boolean)
    .map((date) => date.getTime());
  return dates.length ? new Date(Math.max(...dates)) : new Date();
}

function buildReportBuckets(measurements, monthsToShow) {
  const anchor = getReportRangeAnchor(measurements);
  const firstMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const buckets = [];

  for (let offset = monthsToShow - 1; offset >= 0; offset -= 1) {
    const bucketDate = new Date(
      firstMonth.getFullYear(),
      firstMonth.getMonth() - offset,
      1,
    );
    buckets.push({
      key: `${bucketDate.getFullYear()}-${String(bucketDate.getMonth() + 1).padStart(2, "0")}`,
      label: formatReportMonthShort(bucketDate),
      fullLabel: formatReportMonth(bucketDate),
      total: 0,
      normal: 0,
      risk: 0,
      severe: 0,
    });
  }

  const bucketMap = new Map(buckets.map((bucket) => [bucket.key, bucket]));

  measurements.forEach((measurement) => {
    const date = parseReportDate(measurement.measurement_date);
    if (!date) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const bucket = bucketMap.get(key);
    if (!bucket) return;

    const status = measurement.nutritional_status || "Normal";
    bucket.total += 1;
    if (status === "Normal") {
      bucket.normal += 1;
    } else {
      bucket.risk += 1;
      if (status === "Severely Underweight" || status === "Wasted") {
        bucket.severe += 1;
      }
    }
  });

  return buckets;
}

function buildSmoothPath(points) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const controlX = (previous.x + current.x) / 2;
    path += ` Q ${controlX} ${previous.y} ${current.x} ${current.y}`;
  }
  return path;
}

function ChartPanel({ data, accent = C.primary, riskAccent = C.danger }) {
  const width = 760;
  const height = 320;
  const padding = { top: 34, right: 22, bottom: 42, left: 28 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const values = data.map((item) => item.value);
  const maxValue = Math.max(1, ...values);
  const minValue = 0;
  const step = data.length > 1 ? innerWidth / (data.length - 1) : innerWidth;
  const points = data.map((item, index) => ({
    x: padding.left + index * step,
    y:
      padding.top +
      innerHeight -
      ((item.value - minValue) / (maxValue - minValue)) * innerHeight,
  }));
  const linePath = buildSmoothPath(points);
  const fillPath = `${linePath} L ${padding.left + innerWidth} ${padding.top + innerHeight} L ${padding.left} ${padding.top + innerHeight} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      role="img"
      aria-label="Monthly malnutrition trend chart"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="report-grid-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={C.border} stopOpacity="0.6" />
          <stop offset="100%" stopColor={C.border} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="report-accent-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.32" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {[0, 1, 2, 3].map((tick) => {
        const y = padding.top + (innerHeight / 3) * tick;
        return (
          <line
            key={tick}
            x1={padding.left}
            x2={padding.left + innerWidth}
            y1={y}
            y2={y}
            stroke="url(#report-grid-fade)"
            strokeWidth="1"
          />
        );
      })}

      <path d={fillPath} fill="url(#report-accent-fill)" />
      <path
        d={linePath}
        fill="none"
        stroke={accent}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={buildSmoothPath(
          data.map((item, index) => ({
            ...points[index],
            y:
              padding.top +
              innerHeight -
              ((item.secondaryValue - minValue) / (maxValue - minValue)) *
                innerHeight,
          })),
        )}
        fill="none"
        stroke={riskAccent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />

      {points.map((point, index) => {
        const item = data[index];
        return (
          <g key={item.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6.5"
              fill={accent}
              stroke={C.card}
              strokeWidth="3"
            />
            <circle cx={point.x} cy={point.y} r="2" fill="#fff" />
            {item.secondaryValue > 0 && (
              <circle
                cx={point.x}
                cy={
                  padding.top +
                  innerHeight -
                  ((item.secondaryValue - minValue) / (maxValue - minValue)) *
                    innerHeight
                }
                r="5.5"
                fill={riskAccent}
                stroke={C.card}
                strokeWidth="2.5"
              />
            )}
          </g>
        );
      })}

      {data.map((item, index) => (
        <text
          key={`${item.label}-x`}
          x={points[index].x}
          y={height - 18}
          textAnchor="middle"
          fontSize="11"
          fill={C.textMuted}
        >
          {item.label}
        </text>
      ))}
    </svg>
  );
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function ReportsPage({ children, measurements, parents, nutritionists }) {
  const [rangeId, setRangeId] = useState("12m");
  const selectedRange =
    REPORT_RANGE_OPTIONS.find((option) => option.id === rangeId) ||
    REPORT_RANGE_OPTIONS[0];
  const monthBuckets = buildReportBuckets(measurements, selectedRange.months);
  const totalMeasurements = monthBuckets.reduce(
    (sum, bucket) => sum + bucket.total,
    0,
  );
  const totalNormal = monthBuckets.reduce(
    (sum, bucket) => sum + bucket.normal,
    0,
  );
  const totalRisk = monthBuckets.reduce((sum, bucket) => sum + bucket.risk, 0);
  const totalSevere = monthBuckets.reduce(
    (sum, bucket) => sum + bucket.severe,
    0,
  );
  const chartData = monthBuckets.map((bucket) => ({
    label: bucket.label,
    value: bucket.risk,
    secondaryValue: bucket.normal,
    fullLabel: bucket.fullLabel,
    total: bucket.total,
  }));

  const statusCounts = children.reduce((accumulator, child) => {
    accumulator[child.status] = (accumulator[child.status] || 0) + 1;
    return accumulator;
  }, {});

  const atRiskStatuses = [
    "Underweight",
    "Severely Underweight",
    "Stunted",
    "Wasted",
  ];
  const atRiskChildren = children.filter((child) =>
    atRiskStatuses.includes(child.status),
  );
  const normalChildren = children.filter((child) => child.status === "Normal");
  const latestMeasurementByChild = measurements.reduce(
    (accumulator, measurement) => {
      const current = accumulator[measurement.child_id];
      if (!current)
        return { ...accumulator, [measurement.child_id]: measurement };
      const currentDate = parseReportDate(current.measurement_date);
      const nextDate = parseReportDate(measurement.measurement_date);
      if (!currentDate || !nextDate || nextDate >= currentDate) {
        return { ...accumulator, [measurement.child_id]: measurement };
      }
      return accumulator;
    },
    {},
  );

  const reportCards = [
    {
      label: "Children monitored",
      value: children.length,
      delta: `${normalChildren.length} normal`,
      icon: "children",
      color: C.primary,
      bg: C.primaryLight,
      note: `${atRiskChildren.length} need follow-up`,
    },
    {
      label: "At-risk cases",
      value: totalRisk,
      delta: totalRisk > totalNormal ? "Priority review" : "Stable trend",
      icon: "alertTriangle",
      color: C.danger,
      bg: C.dangerLight,
      note: `${totalSevere} severe cases in range`,
    },
    {
      label: "Measurements",
      value: totalMeasurements,
      delta: `${selectedRange.label} window`,
      icon: "measurements",
      color: C.info,
      bg: C.infoLight,
      note: `${nutritionists.length} nutritionists active`,
    },
    {
      label: "Recovery rate",
      value: `${Math.round((totalNormal / Math.max(1, totalMeasurements)) * 100)}%`,
      delta: "Normal growth share",
      icon: "checkCircle",
      color: C.primaryMid,
      bg: C.primaryLight,
      note: `${parents.length} guardians connected`,
    },
  ];

  const trendChange =
    monthBuckets.length > 1
      ? monthBuckets[monthBuckets.length - 1].risk - monthBuckets[0].risk
      : monthBuckets[0]?.risk || 0;
  const trendDirection = trendChange >= 0 ? "up" : "down";
  const trendLabel =
    trendChange === 0
      ? "flat"
      : `${trendChange > 0 ? "+" : ""}${trendChange} from start of period`;

  const topPriorityChildren = atRiskChildren
    .map((child) => ({
      ...child,
      latestMeasurement: latestMeasurementByChild[child.id],
    }))
    .sort((left, right) => {
      const leftSeverity = REPORT_SEVERITY_ORDER[left.status] || 0;
      const rightSeverity = REPORT_SEVERITY_ORDER[right.status] || 0;
      if (rightSeverity !== leftSeverity) return rightSeverity - leftSeverity;

      const leftDate = parseReportDate(
        left.latestMeasurement?.measurement_date,
      );
      const rightDate = parseReportDate(
        right.latestMeasurement?.measurement_date,
      );
      return (rightDate?.getTime() || 0) - (leftDate?.getTime() || 0);
    })
    .slice(0, 4);

  const highestMonth = monthBuckets.reduce(
    (best, bucket) => (bucket.risk > (best?.risk || -1) ? bucket : best),
    monthBuckets[0],
  );

  const exportCsv = () => {
    const rows = [
      ["Month", "Total Measurements", "Normal", "At Risk", "Severe Cases"],
      ...monthBuckets.map((bucket) => [
        bucket.fullLabel,
        bucket.total,
        bucket.normal,
        bucket.risk,
        bucket.severe,
      ]),
      [],
      ["Summary", "Value"],
      ["Children Monitored", children.length],
      ["At-Risk Children", atRiskChildren.length],
      ["Total Measurements", totalMeasurements],
      ["Normal Measurements", totalNormal],
      ["At-Risk Measurements", totalRisk],
      ["Severe Cases", totalSevere],
    ];

    const csvContent = rows
      .map((row) => row.map((cell) => escapeCsvValue(cell)).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `malnutrition-report-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        color: C.text,
      }}
    >
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 24,
          padding: "20px 22px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                borderRadius: 999,
                background: C.primaryLight,
                color: C.primaryMid,
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              <Icon name="lineChart" size={14} color={C.primaryMid} />
              Monthly malnutrition trend
            </div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                margin: 0,
                color: C.text,
              }}
            >
              Reports & Analytics
            </h1>
            <p
              style={{
                color: C.textMuted,
                fontSize: 13,
                margin: "6px 0 0",
                maxWidth: 720,
                lineHeight: 1.6,
              }}
            >
              Monitor monthly malnutrition trends, review at-risk cases, and
              export a clean report for staff and partners.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                borderRadius: 14,
                background: C.card,
                border: `1px solid ${C.border}`,
                minHeight: 42,
              }}
            >
              <div style={{ fontSize: 12, color: C.textMuted }}>
                Latest month in view
                <div style={{ color: C.text, fontWeight: 700 }}>
                  {highestMonth?.fullLabel || "No data"}
                </div>
              </div>
            </div>

            <button
              type="button"
              style={{
                background: C.card,
                color: C.text,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: "11px 14px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Export CSV
            </button>
            <button
              type="button"
              style={{
                background: C.primaryMid,
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "11px 14px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Generate report
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 14,
        }}
      >
        {reportCards.map((card) => (
          <div
            key={card.label}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              padding: 18,
              boxShadow: "0 12px 30px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${card.bg}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={card.icon} size={18} color={card.color} />
              </div>
              <span
                style={{ fontSize: 11, color: C.textLight, fontWeight: 700 }}
              >
                {card.delta}
              </span>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: C.textMuted }}>
              {card.label}
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 28,
                fontWeight: 800,
                color: C.text,
              }}
            >
              {card.value}
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: C.textMuted }}>
              {card.note}
            </div>
            <div
              style={{
                marginTop: 14,
                height: 42,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${card.bg} 0%, transparent 100%)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.7,
                }}
              >
                <div
                  style={{
                    width: "78%",
                    height: 16,
                    borderRadius: 999,
                    background: `linear-gradient(90deg, transparent 0%, ${card.color}55 45%, ${card.color} 100%)`,
                    clipPath:
                      card.label === "At-risk cases"
                        ? "polygon(0% 70%, 14% 42%, 26% 54%, 40% 18%, 54% 30%, 70% 6%, 86% 18%, 100% 0%, 100% 100%, 0% 100%)"
                        : "polygon(0% 60%, 15% 55%, 30% 62%, 44% 40%, 58% 48%, 74% 20%, 88% 35%, 100% 22%, 100% 100%, 0% 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(320px, 1fr)",
          gap: 16,
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 24,
            padding: 20,
            boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>
                Malnutrition trend per month
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: C.textMuted,
                  lineHeight: 1.6,
                }}
              >
                Compare at-risk cases and normal growth across the selected
                period.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {REPORT_RANGE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRangeId(option.id)}
                  style={{
                    border: "none",
                    borderRadius: 999,
                    padding: "8px 14px",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 700,
                    background: rangeId === option.id ? C.infoLight : C.bg,
                    color: rangeId === option.id ? C.info : C.textMuted,
                  }}
                >
                  {option.label}
                </button>
              ))}
              <button
                type="button"
                onClick={exportCsv}
                style={{
                  borderRadius: 999,
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  background: C.primaryLight,
                  color: C.primary,
                  border: `1px solid ${C.primaryLight}`,
                }}
              >
                Export CSV
              </button>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              height: 360,
              borderRadius: 22,
              background: `linear-gradient(180deg, ${C.bg} 0%, ${C.card} 100%)`,
              border: `1px solid ${C.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 18,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(14px)",
                  border: `1px solid ${C.border}`,
                }}
              >
                <div style={{ fontSize: 11, color: C.textMuted }}>
                  Total measurements
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>
                  {totalMeasurements}
                </div>
              </div>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(14px)",
                  border: `1px solid ${C.border}`,
                }}
              >
                <div style={{ fontSize: 11, color: C.textMuted }}>
                  Children at risk
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.danger }}>
                  {totalRisk}
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", inset: 0, paddingTop: 18 }}>
              <ChartPanel
                data={chartData}
                accent={C.primaryMid}
                riskAccent={C.purple}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {[
              {
                label: "Trend delta",
                value: trendLabel,
                icon: trendDirection === "up" ? "trendingUp" : "trendingDown",
                color: trendDirection === "up" ? C.danger : C.primary,
              },
              {
                label: "Normal share",
                value: `${Math.round((totalNormal / Math.max(1, totalMeasurements)) * 100)}%`,
                icon: "checkCircle",
                color: C.primaryMid,
              },
              {
                label: "Severe cases",
                value: totalSevere,
                icon: "alertTriangle",
                color: C.danger,
              },
            ].map((summary) => (
              <div
                key={summary.label}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  border: `1px solid ${C.border}`,
                  background: C.bg,
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: `${summary.color}16`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={summary.icon} size={18} color={summary.color} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>
                    {summary.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>
                    {summary.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 24,
              padding: 20,
              boxShadow: "0 14px 38px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: C.text,
                marginBottom: 14,
              }}
            >
              Status breakdown
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {Object.entries(REPORT_STATUS_META).map(([status, meta]) => {
                const count = statusCounts[status] || 0;
                const share = children.length
                  ? Math.round((count / children.length) * 100)
                  : 0;
                return (
                  <div key={status} style={{ display: "grid", gap: 6 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 10,
                        fontSize: 12,
                      }}
                    >
                      <span style={{ color: C.text }}>{meta.label}</span>
                      <span style={{ color: C.textMuted }}>
                        {count} children
                      </span>
                    </div>
                    <div
                      style={{
                        height: 10,
                        borderRadius: 999,
                        background: C.bg,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.max(6, share)}%`,
                          height: "100%",
                          borderRadius: 999,
                          background: `linear-gradient(90deg, ${meta.color} 0%, ${meta.tint} 100%)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 24,
              padding: 20,
              boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: C.text,
                marginBottom: 14,
              }}
            >
              Priority follow-up
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {topPriorityChildren.length ? (
                topPriorityChildren.map((child) => {
                  const meta =
                    REPORT_STATUS_META[child.status] ||
                    REPORT_STATUS_META.Underweight;
                  return (
                    <div
                      key={child.id}
                      style={{
                        padding: 14,
                        borderRadius: 18,
                        background: C.bg,
                        border: `1px solid ${C.border}`,
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: C.text,
                          }}
                        >
                          {child.first_name} {child.last_name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: C.textMuted,
                            marginTop: 3,
                          }}
                        >
                          {child.barangay} • Parent: {child.parent}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: C.textLight,
                            marginTop: 4,
                          }}
                        >
                          {child.latestMeasurement?.measurement_date ||
                            "not available"}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "7px 10px",
                          borderRadius: 999,
                          background: `${meta.tint}`,
                          color: meta.color,
                          fontSize: 11,
                          fontWeight: 800,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {child.status}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ fontSize: 12, color: C.textMuted }}>
                  No priority cases in the selected period.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────
function SettingsPage() {
  const [settings, setSettings] = useState([
    {
      key: "who_reference_year",
      value: "2006",
      desc: "WHO Child Growth Standards reference year",
    },
    {
      key: "kiosk_timeout_seconds",
      value: "120",
      desc: "Kiosk session timeout in seconds",
    },
    {
      key: "eopt_sync_url",
      value: "https://eopt.doh.gov.ph/api",
      desc: "eOPT+ national sync endpoint",
    },
    {
      key: "alert_threshold_waz",
      value: "-2.0",
      desc: "Alert threshold for Weight-for-Age Z-score",
    },
    {
      key: "barangay_name",
      value: "Bagong Silang, Caloocan City",
      desc: "Health center barangay name",
    },
    {
      key: "auto_notify_parents",
      value: "true",
      desc: "Automatically notify parents on new results",
    },
  ]);
  const [saved, setSaved] = useState(null);

  return (
    <div>
      <PageHeader
        title="System Settings"
        subtitle="Configure system parameters and integrations"
      />
      <div style={{ ...PAGE_SURFACE_STYLE, overflow: "hidden" }}>
        {settings.map((setting, index) => (
          <div
            key={setting.key}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr 160px",
              gap: 16,
              alignItems: "center",
              padding: "16px 20px",
              borderBottom:
                index < settings.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: C.primary,
                  marginBottom: 2,
                }}
              >
                {setting.key}
              </div>
              <div style={{ fontSize: 11, color: C.textMuted }}>
                {setting.desc}
              </div>
            </div>
            <input
              value={setting.value}
              onChange={(event) =>
                setSettings((previous) =>
                  previous.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, value: event.target.value }
                      : item,
                  ),
                )
              }
              style={{ ...inputStyle }}
            />
            <button
              onClick={() => setSaved(setting.key)}
              style={{
                background: C.primaryLight,
                color: C.primary,
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                justifyContent: "center",
              }}
            >
              {saved === setting.key ? (
                <>
                  <Icon name="check" size={12} color={C.primary} /> Saved!
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Nav Items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", iconName: "dashboard" },
  { id: "children", label: "Children", iconName: "children" },
  { id: "measurements", label: "Measurements", iconName: "measurements" },
  { id: "parents", label: "Parents", iconName: "parents" },
  { id: "nutritionists", label: "Nutritionists", iconName: "activity" },
  { id: "reports", label: "Reports", iconName: "reports" },
  { id: "kiosk", label: "Kiosk Interface", iconName: "kiosk" },
  { id: "settings", label: "Settings", iconName: "settings" },
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [selectedChild, setSelectedChild] = useState(null);
  const [kioskMode, setKioskMode] = useState(false);
  const [notifications] = useState(3);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage?.getItem("sk-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      ? "dark"
      : "light";
  });

  const activeTheme = theme === "dark" ? DARK_THEME : LIGHT_THEME;
  Object.assign(C, activeTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage?.setItem("sk-theme", theme);
    }
    if (typeof document !== "undefined") {
      document.body.style.background = activeTheme.bg;
      document.body.style.color = activeTheme.text;
    }
  }, [theme, activeTheme.bg, activeTheme.text]);

  const [childrenData, setChildrenData] = useState(INIT_CHILDREN);
  const [measurementsData, setMeasurementsData] = useState(INIT_MEASUREMENTS);
  const [parentsData, setParentsData] = useState(INIT_PARENTS);
  const [nutritionistsData, setNutritionistsData] =
    useState(INIT_NUTRITIONISTS);

  const [childModal, setChildModal] = useState(null);
  const [parentModal, setParentModal] = useState(null);
  const [nutritionistModal, setNutritionistModal] = useState(null);
  const [measureModal, setMeasureModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  // CRUD
  const handleAddChild = (form) => {
    const newId = Math.max(...childrenData.map((c) => c.id), 0) + 1;
    const newCode = `CHD-${String(newId).padStart(4, "0")}`;
    setChildrenData((prev) => [
      ...prev,
      {
        ...form,
        id: newId,
        child_code: newCode,
        status: form.status || "Normal",
      },
    ]);
    setChildModal(null);
    showToast(`${form.first_name} ${form.last_name} added successfully`);
  };
  const handleEditChild = (form) => {
    setChildrenData((prev) =>
      prev.map((c) => (c.id === form.id ? { ...c, ...form } : c)),
    );
    setChildModal(null);
    showToast("Child profile updated");
  };
  const handleDeleteChild = () => {
    const c = confirmDelete.item;
    setChildrenData((prev) => prev.filter((x) => x.id !== c.id));
    setMeasurementsData((prev) => prev.filter((m) => m.child_id !== c.id));
    setConfirmDelete(null);
    showToast(`${c.first_name} ${c.last_name} deleted`, "danger");
  };

  const handleAddParent = (form) => {
    const newId = Math.max(...parentsData.map((p) => p.id), 0) + 1;
    setParentsData((prev) => [...prev, { ...form, id: newId, children: 0 }]);
    setParentModal(null);
    showToast(`${form.name} added as parent`);
  };
  const handleEditParent = (form) => {
    setParentsData((prev) =>
      prev.map((p) => (p.id === form.id ? { ...p, ...form } : p)),
    );
    setParentModal(null);
    showToast("Parent account updated");
  };
  const handleDeleteParent = () => {
    const p = confirmDelete.item;
    setParentsData((prev) => prev.filter((x) => x.id !== p.id));
    setConfirmDelete(null);
    showToast(`${p.name} removed`, "danger");
  };

  const handleAddNutritionist = (form) => {
    const newId = Math.max(...nutritionistsData.map((n) => n.id), 0) + 1;
    setNutritionistsData((prev) => [...prev, { ...form, id: newId }]);
    setNutritionistModal(null);
    showToast(`${form.name} added as nutritionist`);
  };
  const handleEditNutritionist = (form) => {
    setNutritionistsData((prev) =>
      prev.map((n) => (n.id === form.id ? { ...n, ...form } : n)),
    );
    setNutritionistModal(null);
    showToast("Nutritionist profile updated");
  };
  const handleDeleteNutritionist = () => {
    const n = confirmDelete.item;
    setNutritionistsData((prev) => prev.filter((x) => x.id !== n.id));
    setConfirmDelete(null);
    showToast(`${n.name} removed`, "danger");
  };

  const handleAddMeasurement = (form) => {
    const newId = Math.max(...measurementsData.map((m) => m.id), 0) + 1;
    setMeasurementsData((prev) => [...prev, { ...form, id: newId }]);
    const child = childrenData.find((c) => c.id === parseInt(form.child_id));
    if (child)
      setChildrenData((prev) =>
        prev.map((c) =>
          c.id === child.id ? { ...c, status: form.nutritional_status } : c,
        ),
      );
    setMeasureModal(false);
    showToast(`Measurement added for ${form.child}`);
  };
  const handleDeleteMeasurement = () => {
    const m = confirmDelete.item;
    setMeasurementsData((prev) => prev.filter((x) => x.id !== m.id));
    setConfirmDelete(null);
    showToast("Measurement record deleted", "danger");
  };

  const handleKioskSave = (data) => {
    const newId = Math.max(...measurementsData.map((m) => m.id), 0) + 1;
    setMeasurementsData((prev) => [...prev, { ...data, id: newId }]);
    const child = childrenData.find((c) => c.id === data.child_id);
    if (child)
      setChildrenData((prev) =>
        prev.map((c) =>
          c.id === child.id ? { ...c, status: data.nutritional_status } : c,
        ),
      );
  };

  if (!user) return <LoginPage onLogin={setUser} />;
  if (kioskMode)
    return (
      <KioskView
        children={childrenData}
        theme={theme}
        onBack={() => setKioskMode(false)}
        onSaveMeasurement={handleKioskSave}
      />
    );

  const handleNav = (id) => {
    if (id === "kiosk") {
      setKioskMode(true);
      return;
    }
    setPage(id);
    setSelectedChild(null);
  };

  const renderPage = () => {
    if (page === "children" && selectedChild)
      return (
        <ChildDetail
          child={selectedChild}
          measurements={measurementsData}
          onBack={() => setSelectedChild(null)}
        />
      );
    switch (page) {
      case "dashboard":
        return (
          <Dashboard
            children={childrenData}
            measurements={measurementsData}
            parents={parentsData}
            nutritionists={nutritionistsData}
          />
        );
      case "children":
        return (
          <ChildrenList
            children={childrenData}
            parents={parentsData}
            onViewChild={(c) => setSelectedChild(c)}
            onAdd={() => setChildModal("add")}
            onEdit={(c) => setChildModal(c)}
            onDelete={(c) => setConfirmDelete({ type: "child", item: c })}
          />
        );
      case "measurements":
        return (
          <MeasurementsPage
            measurements={measurementsData}
            children={childrenData}
            onAdd={() => setMeasureModal(true)}
            onDelete={(m) => setConfirmDelete({ type: "measurement", item: m })}
          />
        );
      case "parents":
        return (
          <ParentsPage
            parents={parentsData}
            children={childrenData}
            measurements={measurementsData}
            onAdd={() => setParentModal("add")}
            onEdit={(p) => setParentModal(p)}
            onDelete={(p) => setConfirmDelete({ type: "parent", item: p })}
          />
        );
      case "nutritionists":
        return (
          <NutritionistsPage
            nutritionists={nutritionistsData}
            onAdd={() => setNutritionistModal("add")}
            onEdit={(n) => setNutritionistModal(n)}
            onDelete={(n) =>
              setConfirmDelete({ type: "nutritionist", item: n })
            }
          />
        );
      case "reports":
        return (
          <ReportsPage
            children={childrenData}
            measurements={measurementsData}
            parents={parentsData}
            nutritionists={nutritionistsData}
          />
        );
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <Dashboard
            children={childrenData}
            measurements={measurementsData}
            parents={parentsData}
            nutritionists={nutritionistsData}
          />
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Segoe UI',system-ui,sans-serif",
        background: C.bg,
      }}
    >
      {/* Modals */}
      {childModal && (
        <ChildModal
          child={childModal === "add" ? null : childModal}
          parents={parentsData}
          onSave={childModal === "add" ? handleAddChild : handleEditChild}
          onClose={() => setChildModal(null)}
        />
      )}
      {parentModal && (
        <ParentModal
          parent={parentModal === "add" ? null : parentModal}
          onSave={parentModal === "add" ? handleAddParent : handleEditParent}
          onClose={() => setParentModal(null)}
        />
      )}
      {nutritionistModal && (
        <NutritionistModal
          nutritionist={nutritionistModal === "add" ? null : nutritionistModal}
          onSave={
            nutritionistModal === "add"
              ? handleAddNutritionist
              : handleEditNutritionist
          }
          onClose={() => setNutritionistModal(null)}
        />
      )}
      {measureModal && (
        <MeasurementModal
          children={childrenData}
          onSave={handleAddMeasurement}
          onClose={() => setMeasureModal(false)}
        />
      )}
      {confirmDelete && (
        <ConfirmDialog
          msg={`Are you sure you want to delete ${confirmDelete.type === "child" ? `${confirmDelete.item.first_name} ${confirmDelete.item.last_name}` : confirmDelete.type === "parent" ? confirmDelete.item.name : confirmDelete.type === "nutritionist" ? confirmDelete.item.name : "this measurement record"}? This cannot be undone.`}
          onConfirm={
            confirmDelete.type === "child"
              ? handleDeleteChild
              : confirmDelete.type === "parent"
                ? handleDeleteParent
                : confirmDelete.type === "nutritionist"
                  ? handleDeleteNutritionist
                  : handleDeleteMeasurement
          }
          onCancel={() => setConfirmDelete(null)}
        />
      )}
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          width: 220,
          background: C.sidebar,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div
          style={{
            padding: "18px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: C.primaryMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="heart" size={16} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  lineHeight: 1.2,
                }}
              >
                SukatKalusugan
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 9,
                  letterSpacing: 1,
                  marginTop: 2,
                }}
              >
                ADMIN PANEL
              </div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "8px 10px 4px", overflowY: "auto" }}>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: 1.5,
              padding: "8px 8px 6px",
              fontWeight: 600,
            }}
          >
            MAIN MENU
          </div>
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => handleNav(n.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 12px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer",
                marginBottom: 2,
                textAlign: "left",
                transition: "all 0.15s",
                background:
                  page === n.id ? "rgba(26,143,104,0.22)" : "transparent",
                color: page === n.id ? "#2BC88A" : "rgba(255,255,255,0.55)",
                borderLeft:
                  page === n.id ? `2px solid #2BC88A` : "3px solid transparent",
              }}
            >
              <span
                style={{
                  width: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name={n.iconName}
                  size={15}
                  color={page === n.id ? "#2BC88A" : "rgba(255,255,255,0.55)"}
                />
              </span>
              <span
                style={{ fontSize: 12, fontWeight: page === n.id ? 600 : 400 }}
              >
                {n.label}
              </span>
              {n.id === "kiosk" && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 8,
                    background: C.primaryMid,
                    color: "#fff",
                    padding: "1px 5px",
                    borderRadius: 4,
                    lineHeight: 1.2,
                  }}
                >
                  LIVE
                </span>
              )}
            </button>
          ))}
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: 1.5,
              padding: "10px 8px 6px",
              fontWeight: 600,
            }}
          >
            OTHERS
          </div>
          <button
            onClick={() => setUser(null)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 12px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              marginBottom: 2,
              textAlign: "left",
              background: "transparent",
              color: "#E03131",
            }}
            title="Sign out"
          >
            <span
              style={{
                width: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="logout" size={14} color="#E03131" />
            </span>
            <span style={{ fontSize: 12, fontWeight: 500 }}>Log Out</span>
          </button>
        </nav>
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: C.primaryMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.name}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 10,
                  textTransform: "capitalize",
                }}
              >
                {user.role}
              </div>
            </div>
            <button
              onClick={() => setUser(null)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.3)",
                cursor: "pointer",
                padding: 4,
              }}
              title="Sign out"
            >
              <Icon name="logout" size={13} color="rgba(255,255,255,0.5)" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <div
          style={{
            background: C.card,
            borderBottom: `1px solid ${C.border}`,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
              Good morning, {user?.name?.split(" ")?.[0] || "Admin"}!
            </div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>
              SukatKalusugan ·{" "}
              {new Date().toLocaleDateString("en-PH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                border: `1px solid ${C.border}`,
                background: C.bg,
                color: C.textMuted,
                borderRadius: 999,
                padding: "7px 11px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
              }}
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to night mode"
              }
            >
              <Icon
                name={theme === "dark" ? "moon" : "sun"}
                size={15}
                color={C.textMuted}
              />
              <span>{theme === "dark" ? "Light mode" : "Night mode"}</span>
            </button>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Icon name="bell" size={18} color={C.textMuted} />
              {notifications > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -4,
                    background: C.danger,
                    color: "#fff",
                    borderRadius: "50%",
                    width: 14,
                    height: 14,
                    fontSize: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {notifications}
                </span>
              )}
            </div>
            <div style={{ cursor: "pointer" }}>
              <Icon name="mail" size={18} color={C.textMuted} />
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: C.primaryMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div style={{ cursor: "pointer" }}>
              <Icon name="settings" size={18} color={C.textMuted} />
            </div>
          </div>
        </div>
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {renderPage()}
        </div>
      </div>

      <AIChatbot />
    </div>
  );
}
