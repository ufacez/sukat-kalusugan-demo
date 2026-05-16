import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// ─── Design Tokens (App.jsx Colors + SukatKalusugan Layout) ──────────────────
const COLORS = {
  primary: "#0B6E4F",
  primaryDark: "#083F2E",
  primaryLight: "#E6F4EF",
  accent: "#F5A623",
  accentLight: "#FFF8EC",
  danger: "#E03131",
  dangerLight: "#FFF0F0",
  info: "#1971C2",
  infoLight: "#E7F5FF",
  purple: "#7048E8",
  purpleLight: "#F3F0FF",
  bg: "#F5F7F6",
  card: "#FFFFFF",
  border: "#E2E8E5",
  text: "#1A2B25",
  muted: "#6D867C",
  dark: "#0D2B20",
};

const NUTRITIONIST_TABS = [
  { id: "dashboard", label: "Home", icon: "🏠" },
  { id: "children", label: "Children", icon: "👥" },
  { id: "measurements", label: "Measurements", icon: "📊" },
  { id: "specialists", label: "Staff", icon: "💚" },
  { id: "reports", label: "Reports", icon: "📈" },
];

const PARENT_TABS = [
  { id: "dashboard", label: "Home", icon: "🏠" },
  { id: "child", label: "My Child", icon: "👧" },
  { id: "growth", label: "Growth", icon: "📈" },
  { id: "tips", label: "Tips", icon: "💡" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const INITIAL_PARENTS = [
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

const INITIAL_CHILDREN = [
  {
    id: 1,
    firstName: "Maria",
    lastName: "Santos",
    birthdate: "2022-03-15",
    sex: "Female",
    ageMonths: 26,
    barangay: "Bagong Silang",
    address: "123 Rizal St.",
    parentId: 1,
    status: "Normal",
  },
  {
    id: 2,
    firstName: "Juan",
    lastName: "Dela Cruz",
    birthdate: "2022-09-20",
    sex: "Male",
    ageMonths: 20,
    barangay: "Poblacion",
    address: "45 Mabini Ave.",
    parentId: 2,
    status: "Underweight",
  },
  {
    id: 3,
    firstName: "Lucia",
    lastName: "Reyes",
    birthdate: "2021-12-01",
    sex: "Female",
    ageMonths: 29,
    barangay: "San Jose",
    address: "78 Luna St.",
    parentId: 3,
    status: "Stunted",
  },
  {
    id: 4,
    firstName: "Miguel",
    lastName: "Torres",
    birthdate: "2023-06-10",
    sex: "Male",
    ageMonths: 11,
    barangay: "Bagong Silang",
    address: "9 Bonifacio Rd.",
    parentId: 4,
    status: "Normal",
  },
  {
    id: 5,
    firstName: "Sofia",
    lastName: "Garcia",
    birthdate: "2022-01-05",
    sex: "Female",
    ageMonths: 28,
    barangay: "Sta. Cruz",
    address: "32 Aguinaldo St.",
    parentId: 5,
    status: "Severely Underweight",
  },
  {
    id: 6,
    firstName: "Carlos",
    lastName: "Lim",
    birthdate: "2023-01-22",
    sex: "Male",
    ageMonths: 16,
    barangay: "Poblacion",
    address: "55 Del Pilar St.",
    parentId: 2,
    status: "Wasted",
  },
  {
    id: 7,
    firstName: "Isabella",
    lastName: "Ramos",
    birthdate: "2022-07-30",
    sex: "Female",
    ageMonths: 22,
    barangay: "San Jose",
    address: "101 Burgos Ave.",
    parentId: 3,
    status: "Normal",
  },
  {
    id: 8,
    firstName: "Andres",
    lastName: "Cruz",
    birthdate: "2021-05-14",
    sex: "Male",
    ageMonths: 36,
    barangay: "Sta. Cruz",
    address: "22 Rizal Blvd.",
    parentId: 4,
    status: "Overweight",
  },
];

const INITIAL_MEASUREMENTS = [
  {
    id: 1,
    childId: 1,
    childName: "Maria Santos",
    measurementDate: "2024-05-10",
    sourceType: "Kiosk",
    heightCm: 85.2,
    weightKg: 11.8,
    ageMonths: 26,
    waz: 0.4,
    haz: 0.2,
    whz: 0.5,
    status: "Normal",
  },
  {
    id: 2,
    childId: 2,
    childName: "Juan Dela Cruz",
    measurementDate: "2024-05-09",
    sourceType: "Mobile",
    heightCm: 76.1,
    weightKg: 8.2,
    ageMonths: 20,
    waz: -2.1,
    haz: -1.3,
    whz: -1.8,
    status: "Underweight",
  },
  {
    id: 3,
    childId: 3,
    childName: "Lucia Reyes",
    measurementDate: "2024-05-08",
    sourceType: "Manual",
    heightCm: 78.3,
    weightKg: 10.2,
    ageMonths: 29,
    waz: -1.2,
    haz: -2.4,
    whz: -0.6,
    status: "Stunted",
  },
  {
    id: 4,
    childId: 4,
    childName: "Miguel Torres",
    measurementDate: "2024-05-07",
    sourceType: "Kiosk",
    heightCm: 71.5,
    weightKg: 8.6,
    ageMonths: 11,
    waz: -0.7,
    haz: 0.1,
    whz: -0.3,
    status: "Normal",
  },
  {
    id: 5,
    childId: 5,
    childName: "Sofia Garcia",
    measurementDate: "2024-05-06",
    sourceType: "Manual",
    heightCm: 80.0,
    weightKg: 7.9,
    ageMonths: 28,
    waz: -3.2,
    haz: -1.5,
    whz: -3.1,
    status: "Severely Underweight",
  },
  {
    id: 6,
    childId: 6,
    childName: "Carlos Lim",
    measurementDate: "2024-05-05",
    sourceType: "Kiosk",
    heightCm: 72.5,
    weightKg: 7.1,
    ageMonths: 16,
    waz: -1.8,
    haz: -1.0,
    whz: -2.2,
    status: "Wasted",
  },
];

const INITIAL_NUTRITIONISTS = [
  {
    id: 1,
    name: "Dr. Maria Santos",
    email: "maria.santos@health.gov",
    phone: "09171234560",
    role: "Registered Dietitian",
    barangay: "Bagong Silang",
    license: "RDN-2020-001",
    status: "Active",
  },
  {
    id: 2,
    name: "Nurse Cynthia Reyes",
    email: "cynthia.reyes@health.gov",
    phone: "09281234561",
    role: "Nurse",
    barangay: "Poblacion",
    license: "PN-2019-045",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Jose Garcia",
    email: "jose.garcia@health.gov",
    phone: "09391234562",
    role: "Physician",
    barangay: "San Jose",
    license: "MD-2018-023",
    status: "Active",
  },
];

const INITIAL_TIPS = [
  "Serve iron-rich meals twice a week to support healthy development.",
  "Track height and weight every month so trends are easy to spot.",
  "Encourage water intake before snacks to reduce empty calories.",
  "Bring the child to the next weigh-in even when they feel healthy.",
];

// ─── Helper Functions ──────────────────────────────────────────────────────────
function getChildName(child) {
  return `${child.firstName} ${child.lastName}`;
}

function getParentName(parents, parentId) {
  return parents.find((p) => p.id === parentId)?.name ?? "Unassigned";
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function computeWHO({ weightKg, heightCm, ageMonths }) {
  const wazMedian = 9.5 + ageMonths * 0.15;
  const hazMedian = 65 + ageMonths * 0.9;
  const whzMedian = 10.5 + (heightCm - 65) * 0.09;
  const waz = Number(((weightKg - wazMedian) / 1.2).toFixed(2));
  const haz = Number(((heightCm - hazMedian) / 3.2).toFixed(2));
  const whz = Number(((weightKg - whzMedian) / 1.1).toFixed(2));

  let status = "Normal";
  if (waz < -3 || whz < -3) status = "Severely Underweight";
  else if (waz < -2) status = "Underweight";
  else if (haz < -2) status = "Stunted";
  else if (whz < -2) status = "Wasted";
  else if (whz > 2) status = "Overweight";

  return { waz, haz, whz, status };
}

function getStatusTheme(status) {
  const themes = {
    Normal: {
      bg: COLORS.primaryLight,
      fg: COLORS.primary,
      dot: COLORS.primary,
    },
    Underweight: { bg: COLORS.accentLight, fg: "#B66B00", dot: COLORS.accent },
    "Severely Underweight": {
      bg: COLORS.dangerLight,
      fg: COLORS.danger,
      dot: COLORS.danger,
    },
    Stunted: { bg: COLORS.purpleLight, fg: COLORS.purple, dot: COLORS.purple },
    Wasted: { bg: COLORS.infoLight, fg: COLORS.info, dot: COLORS.info },
    Overweight: { bg: "#FFF0D5", fg: "#B56A00", dot: COLORS.accent },
  };
  return (
    themes[status] || { bg: "#EEF3F0", fg: COLORS.muted, dot: COLORS.muted }
  );
}

// ─── UI Components ────────────────────────────────────────────────────────────
function StatCard({ title, value, hint, tone = "Normal" }) {
  const theme = getStatusTheme(tone);
  return (
    <View style={[styles.statCard, { backgroundColor: theme.bg }]}>
      <Text style={[styles.statValue, { color: theme.fg }]}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statHint}>{hint}</Text>
    </View>
  );
}

function Badge({ children, status }) {
  const theme = getStatusTheme(status);
  return (
    <View style={[styles.badge, { backgroundColor: theme.bg }]}>
      <View style={[styles.badgeDot, { backgroundColor: theme.dot }]} />
      <Text style={[styles.badgeText, { color: theme.fg }]}>{children}</Text>
    </View>
  );
}

function ScreenTitle({ title, subtitle }) {
  return (
    <View>
      <Text style={styles.screenTitle}>{title}</Text>
      {subtitle ? <Text style={styles.screenSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

function Field({ label, required, children }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>
        {label}
        {required ? <Text style={{ color: COLORS.danger }}> *</Text> : null}
      </Text>
      {children}
    </View>
  );
}

function Input({ value, onChangeText, placeholder, keyboardType, multiline }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.muted}
      keyboardType={keyboardType}
      multiline={multiline}
      style={[styles.input, multiline && styles.inputMultiline]}
    />
  );
}

function ChoiceGroup({ value, options, onChange }) {
  return (
    <View style={styles.choiceGroup}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.choice, selected && styles.choiceSelected]}
          >
            <Text
              style={[styles.choiceText, selected && styles.choiceTextSelected]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [role, setRole] = useState("nutritionist");
  const [name, setName] = useState("Dr. Maria Santos");
  const [email, setEmail] = useState("maria.santos@health.gov");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role === "nutritionist") {
      setName("Dr. Maria Santos");
      setEmail("maria.santos@health.gov");
    } else {
      setName("Ana Santos");
      setEmail("ana.santos@email.com");
    }
  }, [role]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin({ role, name, email, parentId: role === "parent" ? 1 : null });
      setLoading(false);
    }, 650);
  };

  return (
    <SafeAreaView style={styles.loginSafeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.dark} />
      <View style={styles.loginBackgroundTop} />
      <View style={styles.loginBackgroundBottom} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.loginRoot}
      >
        <ScrollView contentContainerStyle={styles.loginScroll}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>💚</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>SukatKalusugan</Text>
              <Text style={styles.brandSubtitle}>Child Health Monitoring</Text>
            </View>
          </View>

          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>
              Child nutrition monitoring made simple
            </Text>
            <Text style={styles.heroText}>
              Track growth, nutrition, and health records all in one place with
              local data storage.
            </Text>

            <View style={styles.roleSwitch}>
              <Pressable
                onPress={() => setRole("nutritionist")}
                style={[
                  styles.roleButton,
                  role === "nutritionist" && styles.roleButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    role === "nutritionist" && styles.roleButtonTextActive,
                  ]}
                >
                  Nutritionist
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setRole("parent")}
                style={[
                  styles.roleButton,
                  role === "parent" && styles.roleButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    role === "parent" && styles.roleButtonTextActive,
                  ]}
                >
                  Parent
                </Text>
              </Pressable>
            </View>

            <Field label="Display name">
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Your name"
              />
            </Field>

            <Field label="Email address">
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="name@email.com"
              />
            </Field>

            <Pressable onPress={handleLogin} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                {loading
                  ? "Signing in..."
                  : `Continue as ${role === "nutritionist" ? "Nutritionist" : "Parent"}`}
              </Text>
            </Pressable>

            <View style={styles.demoBox}>
              <Text style={styles.demoLabel}>Demo Access</Text>
              <Text style={styles.demoText}>
                Nutritionist: maria.santos@health.gov{"\n"}Parent:
                ana.santos@email.com
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Nutritionist Dashboard ───────────────────────────────────────────────────
function NutritionistDashboard({
  children,
  measurements,
  parents,
  nutritionists,
}) {
  const normalCount = children.filter(
    (child) => child.status === "Normal",
  ).length;
  const alertCount = children.length - normalCount;
  const recentMeasurements = measurements.slice(0, 3);

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle title="👋 Welcome" subtitle="Nutritionist Dashboard" />

      <Card>
        <View style={styles.heroStats}>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{children.length}</Text>
            <Text style={styles.heroStatLabel}>Children</Text>
          </View>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{measurements.length}</Text>
            <Text style={styles.heroStatLabel}>Records</Text>
          </View>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{alertCount}</Text>
            <Text style={styles.heroStatLabel}>At Risk</Text>
          </View>
        </View>
      </Card>

      <View style={styles.statsGrid}>
        <StatCard
          title="Children"
          value={String(children.length)}
          hint="registered"
          tone="Normal"
        />
        <StatCard
          title="Parents"
          value={String(parents.length)}
          hint="linked"
          tone="Wasted"
        />
        <StatCard
          title="Staff"
          value={String(nutritionists.length)}
          hint="active"
          tone="Wasted"
        />
      </View>

      <Card>
        <ScreenTitle
          title="⚠️ Attention Queue"
          subtitle="Children needing follow-up"
        />
        {children
          .filter((child) => child.status !== "Normal")
          .map((child) => (
            <View key={child.id} style={styles.listRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{getChildName(child)}</Text>
                <Text style={styles.listMeta}>
                  {child.barangay} • {child.ageMonths} months
                </Text>
              </View>
              <Badge status={child.status}>{child.status}</Badge>
            </View>
          ))}
        {children.filter((child) => child.status !== "Normal").length === 0 ? (
          <Text style={styles.emptyText}>
            No children need immediate attention
          </Text>
        ) : null}
      </Card>

      <Card>
        <ScreenTitle
          title="📊 Recent Measurements"
          subtitle="Latest saved entries"
        />
        {recentMeasurements.map((measurement) => (
          <View key={measurement.id} style={styles.listRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.listTitle}>{measurement.childName}</Text>
              <Text style={styles.listMeta}>
                {formatDate(measurement.measurementDate)} •{" "}
                {measurement.sourceType}
              </Text>
            </View>
            <Badge status={measurement.status}>{measurement.status}</Badge>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

// ─── Children Screen ───────────────────────────────────────────────────────────
function ChildrenScreen({ children, parents, onSaveChild, onDeleteChild }) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    sex: "Female",
    ageMonths: "",
    barangay: "",
    address: "",
    parentId: parents[0]?.id ?? null,
  });

  const filteredChildren = children.filter((child) => {
    const haystack =
      `${child.firstName} ${child.lastName} ${child.barangay}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  const resetForm = () => {
    setEditingId(null);
    setForm({
      firstName: "",
      lastName: "",
      birthdate: "",
      sex: "Female",
      ageMonths: "",
      barangay: "",
      address: "",
      parentId: parents[0]?.id ?? null,
    });
  };

  const handleSubmit = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.birthdate ||
      !form.parentId
    ) {
      Alert.alert("Missing data", "Please complete the required fields.");
      return;
    }

    const payload = {
      ...form,
      ageMonths: Number(form.ageMonths || 0),
      parentId: Number(form.parentId),
    };
    onSaveChild(editingId, payload);
    resetForm();
  };

  const editChild = (child) => {
    setEditingId(child.id);
    setForm({
      firstName: child.firstName,
      lastName: child.lastName,
      birthdate: child.birthdate,
      sex: child.sex,
      ageMonths: String(child.ageMonths ?? ""),
      barangay: child.barangay,
      address: child.address,
      parentId: child.parentId,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle
        title="👧 Children"
        subtitle="Add, review, and update profiles"
      />

      <Field label="Search children">
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or barangay"
        />
      </Field>

      <Card>
        <Text style={styles.formTitle}>
          {editingId ? "Edit child profile" : "Add new child"}
        </Text>

        <View style={styles.twoColumn}>
          <View style={styles.columnHalf}>
            <Field label="First name" required>
              <Input
                value={form.firstName}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, firstName: value }))
                }
                placeholder="Maria"
              />
            </Field>
          </View>
          <View style={styles.columnHalf}>
            <Field label="Last name" required>
              <Input
                value={form.lastName}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, lastName: value }))
                }
                placeholder="Santos"
              />
            </Field>
          </View>
        </View>

        <View style={styles.twoColumn}>
          <View style={styles.columnHalf}>
            <Field label="Birthdate" required>
              <Input
                value={form.birthdate}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, birthdate: value }))
                }
                placeholder="2022-03-15"
              />
            </Field>
          </View>
          <View style={styles.columnHalf}>
            <Field label="Age in months">
              <Input
                value={String(form.ageMonths)}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, ageMonths: value }))
                }
                placeholder="26"
                keyboardType="numeric"
              />
            </Field>
          </View>
        </View>

        <Field label="Sex">
          <ChoiceGroup
            value={form.sex}
            onChange={(value) => setForm((prev) => ({ ...prev, sex: value }))}
            options={[
              { label: "Female", value: "Female" },
              { label: "Male", value: "Male" },
            ]}
          />
        </Field>

        <Field label="Parent">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalChoiceWrap}
          >
            {parents.map((parent) => {
              const selected = parent.id === form.parentId;
              return (
                <Pressable
                  key={parent.id}
                  onPress={() =>
                    setForm((prev) => ({ ...prev, parentId: parent.id }))
                  }
                  style={[
                    styles.parentChip,
                    selected && styles.parentChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.parentChipText,
                      selected && styles.parentChipTextSelected,
                    ]}
                  >
                    {parent.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Field>

        <Field label="Barangay">
          <Input
            value={form.barangay}
            onChangeText={(value) =>
              setForm((prev) => ({ ...prev, barangay: value }))
            }
            placeholder="Bagong Silang"
          />
        </Field>

        <Field label="Address">
          <Input
            value={form.address}
            onChangeText={(value) =>
              setForm((prev) => ({ ...prev, address: value }))
            }
            placeholder="House number and street"
          />
        </Field>

        <View style={styles.formActionRow}>
          <Pressable onPress={handleSubmit} style={styles.primaryButtonSmall}>
            <Text style={styles.primaryButtonText}>
              {editingId ? "Update child" : "Save child"}
            </Text>
          </Pressable>
          <Pressable onPress={resetForm} style={styles.secondaryButtonSmall}>
            <Text style={styles.secondaryButtonText}>Clear</Text>
          </Pressable>
        </View>
      </Card>

      <Card>
        <ScreenTitle title="📋 Child Records" subtitle="Tap to manage" />
        {filteredChildren.map((child) => (
          <View key={child.id} style={styles.listRowVertical}>
            <View style={styles.listHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{getChildName(child)}</Text>
                <Text style={styles.listMeta}>
                  {getParentName(parents, child.parentId)} • {child.barangay}
                </Text>
              </View>
              <Badge status={child.status}>{child.status}</Badge>
            </View>
            <View style={styles.inlineMetaRow}>
              <Text style={styles.inlineMeta}>{child.sex}</Text>
              <Text style={styles.inlineMeta}>{child.ageMonths} months</Text>
              <Text style={styles.inlineMeta}>
                {formatDate(child.birthdate)}
              </Text>
            </View>
            <View style={styles.formActionRow}>
              <Pressable
                onPress={() => editChild(child)}
                style={styles.secondaryButtonSmall}
              >
                <Text style={styles.secondaryButtonText}>Edit</Text>
              </Pressable>
              <Pressable
                onPress={() => onDeleteChild(child)}
                style={[styles.secondaryButtonSmall, styles.dangerButtonSmall]}
              >
                <Text
                  style={[styles.secondaryButtonText, { color: COLORS.danger }]}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

// ─── Measurements Screen ──────────────────────────────────────────────────────
function MeasurementsScreen({
  children,
  measurements,
  onSaveMeasurement,
  onDeleteMeasurement,
}) {
  const [childId, setChildId] = useState(children[0]?.id ?? null);
  const [sourceType, setSourceType] = useState("Kiosk");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [measurementDate, setMeasurementDate] = useState(
    new Date().toISOString().slice(0, 10),
  );

  useEffect(() => {
    if (!childId && children[0]?.id) {
      setChildId(children[0].id);
    }
  }, [children, childId]);

  const submitMeasurement = () => {
    const selectedChild = children.find((child) => child.id === childId);
    const numericHeight = Number(heightCm);
    const numericWeight = Number(weightKg);

    if (
      !selectedChild ||
      !numericHeight ||
      !numericWeight ||
      !measurementDate
    ) {
      Alert.alert(
        "Missing data",
        "Choose a child and enter height, weight, and date.",
      );
      return;
    }

    const computed = computeWHO({
      weightKg: numericWeight,
      heightCm: numericHeight,
      ageMonths: selectedChild.ageMonths,
    });

    onSaveMeasurement({
      childId: selectedChild.id,
      childName: getChildName(selectedChild),
      measurementDate,
      sourceType,
      heightCm: numericHeight,
      weightKg: numericWeight,
      ageMonths: selectedChild.ageMonths,
      waz: computed.waz,
      haz: computed.haz,
      whz: computed.whz,
      status: computed.status,
    });

    setHeightCm("");
    setWeightKg("");
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle
        title="📊 Measurements"
        subtitle="Record anthropometric entries"
      />

      <Card>
        <Text style={styles.formTitle}>Add measurement</Text>

        <Field label="Child" required>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalChoiceWrap}
          >
            {children.map((child) => {
              const selected = child.id === childId;
              return (
                <Pressable
                  key={child.id}
                  onPress={() => setChildId(child.id)}
                  style={[
                    styles.parentChip,
                    selected && styles.parentChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.parentChipText,
                      selected && styles.parentChipTextSelected,
                    ]}
                  >
                    {getChildName(child)}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Field>

        <Field label="Source">
          <ChoiceGroup
            value={sourceType}
            onChange={setSourceType}
            options={[
              { label: "Kiosk", value: "Kiosk" },
              { label: "Mobile", value: "Mobile" },
              { label: "Manual", value: "Manual" },
            ]}
          />
        </Field>

        <View style={styles.twoColumn}>
          <View style={styles.columnHalf}>
            <Field label="Height cm" required>
              <Input
                value={heightCm}
                onChangeText={setHeightCm}
                placeholder="85.2"
                keyboardType="numeric"
              />
            </Field>
          </View>
          <View style={styles.columnHalf}>
            <Field label="Weight kg" required>
              <Input
                value={weightKg}
                onChangeText={setWeightKg}
                placeholder="11.8"
                keyboardType="numeric"
              />
            </Field>
          </View>
        </View>

        <Field label="Measurement date" required>
          <Input
            value={measurementDate}
            onChangeText={setMeasurementDate}
            placeholder="2024-05-10"
          />
        </Field>

        <Pressable onPress={submitMeasurement} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Save measurement</Text>
        </Pressable>
      </Card>

      <Card>
        <ScreenTitle title="📋 Recent Entries" subtitle="Saved measurements" />
        {measurements.map((measurement) => (
          <View key={measurement.id} style={styles.listRowVertical}>
            <View style={styles.listHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{measurement.childName}</Text>
                <Text style={styles.listMeta}>
                  {formatDate(measurement.measurementDate)} •{" "}
                  {measurement.sourceType}
                </Text>
              </View>
              <Badge status={measurement.status}>{measurement.status}</Badge>
            </View>
            <View style={styles.inlineMetaRow}>
              <Text style={styles.inlineMeta}>
                {measurement.heightCm.toFixed(1)} cm
              </Text>
              <Text style={styles.inlineMeta}>
                {measurement.weightKg.toFixed(1)} kg
              </Text>
              <Text style={styles.inlineMeta}>WAZ {measurement.waz}</Text>
            </View>
            <Pressable
              onPress={() => onDeleteMeasurement(measurement)}
              style={[
                styles.secondaryButtonSmall,
                styles.dangerButtonSmall,
                { alignSelf: "flex-start" },
              ]}
            >
              <Text
                style={[styles.secondaryButtonText, { color: COLORS.danger }]}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

// ─── Specialists/Staff Screen ─────────────────────────────────────────────────
function SpecialistsScreen({ parents, children, nutritionists }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle title="👩‍⚕️ Health Workers" subtitle="Staff directory" />

      <Card>
        <Text style={styles.formTitle}>Nutritionists & Medical Staff</Text>
        {nutritionists.map((n) => (
          <View key={n.id} style={styles.listRowVertical}>
            <Text style={styles.listTitle}>{n.name}</Text>
            <Text style={styles.listMeta}>{n.role}</Text>
            <Text style={styles.listMeta}>
              {n.barangay} • {n.license}
            </Text>
            <Badge status={n.status}>{n.status}</Badge>
          </View>
        ))}
      </Card>

      <Card>
        <Text style={styles.formTitle}>Parents/Guardians</Text>
        {parents.map((parent) => {
          const linkedChildren = children.filter(
            (child) => child.parentId === parent.id,
          );
          return (
            <View key={parent.id} style={styles.listRowVertical}>
              <Text style={styles.listTitle}>{parent.name}</Text>
              <Text style={styles.listMeta}>{parent.email}</Text>
              <Text style={styles.inlineMeta}>
                {linkedChildren.length} child(ren)
              </Text>
              <Badge status={parent.status}>{parent.status}</Badge>
              {linkedChildren.map((child) => (
                <Text key={child.id} style={styles.childLinkText}>
                  • {getChildName(child)} ({child.status})
                </Text>
              ))}
            </View>
          );
        })}
      </Card>
    </ScrollView>
  );
}

// ─── Reports Screen ───────────────────────────────────────────────────────────
function ReportsScreen({ children, measurements }) {
  const counts = useMemo(() => {
    return measurements.reduce((result, measurement) => {
      result[measurement.status] = (result[measurement.status] || 0) + 1;
      return result;
    }, {});
  }, [measurements]);

  const chartRows = [
    "Normal",
    "Underweight",
    "Stunted",
    "Wasted",
    "Overweight",
    "Severely Underweight",
  ].map((status) => ({ status, count: counts[status] || 0 }));
  const maxCount = Math.max(...chartRows.map((row) => row.count), 1);

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle title="📈 Reports" subtitle="Growth and nutrition status" />

      <View style={styles.statsGrid}>
        <StatCard
          title="All children"
          value={String(children.length)}
          hint="Profiles"
          tone="Normal"
        />
        <StatCard
          title="Measurements"
          value={String(measurements.length)}
          hint="Records"
          tone="Wasted"
        />
        <StatCard
          title="Healthy"
          value={String(counts.Normal || 0)}
          hint="Normal status"
          tone="Normal"
        />
        <StatCard
          title="Alerts"
          value={String(measurements.length - (counts.Normal || 0))}
          hint="Review needed"
          tone="Underweight"
        />
      </View>

      <Card>
        <ScreenTitle
          title="📊 Status Distribution"
          subtitle="Relative counts"
        />
        {chartRows.map((row) => (
          <View key={row.status} style={styles.chartRow}>
            <Text style={styles.chartLabel}>{row.status}</Text>
            <View style={styles.chartTrack}>
              <View
                style={[
                  styles.chartFill,
                  { width: `${(row.count / maxCount) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.chartValue}>{row.count}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

// ─── Parent Screens ───────────────────────────────────────────────────────────
function TipsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle title="💡 Nutrition Tips" subtitle="Health reminders" />
      <Card>
        {INITIAL_TIPS.map((tip, index) => (
          <View key={tip} style={styles.tipRow}>
            <View style={styles.tipNumber}>
              <Text style={styles.tipNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

function ParentDashboard({ child, latestMeasurement, history }) {
  if (!child) {
    return (
      <ScrollView contentContainerStyle={styles.screenContent}>
        <ScreenTitle
          title="👋 Parent Home"
          subtitle="No child profile linked"
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle title="👋 Parent Home" subtitle="Your child's health" />

      <Card>
        <View style={styles.childHero}>
          <Text style={styles.childHeroName}>{getChildName(child)}</Text>
          <Text style={styles.childHeroMeta}>
            {child.sex} • {child.ageMonths} months • {child.barangay}
          </Text>
          <Badge status={child.status}>{child.status}</Badge>
        </View>
      </Card>

      {latestMeasurement ? (
        <View style={styles.statsGrid}>
          <StatCard
            title="Height"
            value={`${latestMeasurement.heightCm.toFixed(1)} cm`}
            hint="Latest"
            tone="Normal"
          />
          <StatCard
            title="Weight"
            value={`${latestMeasurement.weightKg.toFixed(1)} kg`}
            hint="Latest"
            tone="Wasted"
          />
          <StatCard
            title="WAZ"
            value={String(latestMeasurement.waz)}
            hint="Weight for age"
            tone="Stunted"
          />
          <StatCard
            title="Status"
            value={latestMeasurement.status}
            hint={latestMeasurement.sourceType}
            tone={latestMeasurement.status}
          />
        </View>
      ) : null}

      <Card>
        <ScreenTitle title="📊 Recent History" subtitle="Latest records" />
        {history.slice(0, 3).map((measurement) => (
          <View key={measurement.id} style={styles.listRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.listTitle}>
                {formatDate(measurement.measurementDate)}
              </Text>
              <Text style={styles.listMeta}>
                {measurement.heightCm.toFixed(1)} cm •{" "}
                {measurement.weightKg.toFixed(1)} kg
              </Text>
            </View>
            <Badge status={measurement.status}>{measurement.status}</Badge>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

function ParentChildScreen({ child, latestMeasurement }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle title="👧 My Child" subtitle="Profile details" />
      {child ? (
        <Card>
          <Text style={styles.childDetailName}>{getChildName(child)}</Text>
          <Text style={styles.childDetailMeta}>
            {child.birthdate} • {child.sex}
          </Text>
          <Text style={styles.childDetailMeta}>{child.address}</Text>
          <View style={styles.inlineMetaRow}>
            <Text style={styles.inlineMeta}>{child.barangay}</Text>
            <Text style={styles.inlineMeta}>{child.ageMonths} months</Text>
            <Text style={styles.inlineMeta}>
              {latestMeasurement
                ? `Last: ${latestMeasurement.status}`
                : "No measurement yet"}
            </Text>
          </View>
        </Card>
      ) : null}
    </ScrollView>
  );
}

function ParentGrowthScreen({ history }) {
  const points = history.slice(0, 6).reverse();
  const maxWeight = Math.max(...points.map((item) => item.weightKg), 1);

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle title="📈 Growth" subtitle="Weight trend" />
      <Card>
        {points.length === 0 ? (
          <Text style={styles.emptyText}>No growth history available yet.</Text>
        ) : (
          points.map((point) => (
            <View key={point.id} style={styles.chartRow}>
              <Text style={styles.chartLabel}>
                {new Date(point.measurementDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              <View style={styles.chartTrack}>
                <View
                  style={[
                    styles.chartFill,
                    { width: `${(point.weightKg / maxWeight) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.chartValue}>{point.weightKg.toFixed(1)}</Text>
            </View>
          ))
        )}
      </Card>
    </ScrollView>
  );
}

function SettingsScreen({ user, onLogout, role }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <ScreenTitle title="⚙️ Settings" subtitle="Account and preferences" />
      <Card>
        <Text style={styles.settingsName}>{user.name}</Text>
        <Text style={styles.settingsMeta}>{user.email}</Text>
        <Text style={styles.settingsMeta}>
          Role: {role === "nutritionist" ? "Nutritionist" : "Parent"}
        </Text>
        <Pressable
          onPress={onLogout}
          style={[styles.primaryButton, { marginTop: 16 }]}
        >
          <Text style={styles.primaryButtonText}>Sign out</Text>
        </Pressable>
      </Card>
    </ScrollView>
  );
}

function TabBar({ tabs, activeTab, onChange }) {
  return (
    <View style={styles.tabBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBarContent}
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeTab;
          return (
            <Pressable
              key={tab.id}
              onPress={() => onChange(tab.id)}
              style={[styles.tabButton, selected && styles.tabButtonActive]}
            >
              <Text style={[styles.tabButtonEmoji]}>{tab.icon}</Text>
              <Text
                style={[
                  styles.tabButtonText,
                  selected && styles.tabButtonTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ─── Main App Component ───────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [parents, setParents] = useState(INITIAL_PARENTS);
  const [children, setChildren] = useState(INITIAL_CHILDREN);
  const [measurements, setMeasurements] = useState(INITIAL_MEASUREMENTS);
  const [nutritionists] = useState(INITIAL_NUTRITIONISTS);

  useEffect(() => {
    if (!user) return;
    const tabs = user.role === "nutritionist" ? NUTRITIONIST_TABS : PARENT_TABS;
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0].id);
    }
  }, [user, activeTab]);

  const tabs = user?.role === "nutritionist" ? NUTRITIONIST_TABS : PARENT_TABS;

  const currentParent = useMemo(() => {
    if (!user || user.role !== "parent") return null;
    return (
      parents.find((parent) => parent.id === user.parentId) ??
      parents[0] ??
      null
    );
  }, [parents, user]);

  const parentChild = useMemo(() => {
    if (!currentParent) return null;
    return (
      children.find((child) => child.parentId === currentParent.id) ?? null
    );
  }, [children, currentParent]);

  const parentHistory = useMemo(() => {
    if (!parentChild) return [];
    return measurements.filter(
      (measurement) => measurement.childId === parentChild.id,
    );
  }, [measurements, parentChild]);

  const latestParentMeasurement = parentHistory[0] ?? null;

  const handleSaveChild = (editingId, payload) => {
    if (editingId) {
      setChildren((current) =>
        current.map((child) =>
          child.id === editingId ? { ...child, ...payload } : child,
        ),
      );
      return;
    }
    const nextId = Math.max(...children.map((child) => child.id), 0) + 1;
    setChildren((current) => [
      ...current,
      { id: nextId, ...payload, status: "Normal" },
    ]);
  };

  const handleDeleteChild = (child) => {
    Alert.alert(
      "Delete child",
      `Remove ${getChildName(child)} and all measurements?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setChildren((current) =>
              current.filter((item) => item.id !== child.id),
            );
            setMeasurements((current) =>
              current.filter((item) => item.childId !== child.id),
            );
          },
        },
      ],
    );
  };

  const handleSaveMeasurement = (measurement) => {
    const nextId = Math.max(...measurements.map((item) => item.id), 0) + 1;
    setMeasurements((current) => [{ ...measurement, id: nextId }, ...current]);
    setChildren((current) =>
      current.map((child) =>
        child.id === measurement.childId
          ? { ...child, status: measurement.status }
          : child,
      ),
    );
  };

  const handleDeleteMeasurement = (measurement) => {
    Alert.alert(
      "Delete measurement",
      `Delete the record for ${measurement.childName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMeasurements((current) =>
              current.filter((item) => item.id !== measurement.id),
            );
          },
        },
      ],
    );
  };

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  const renderScreen = () => {
    if (user.role === "nutritionist") {
      switch (activeTab) {
        case "dashboard":
          return (
            <NutritionistDashboard
              children={children}
              measurements={measurements}
              parents={parents}
              nutritionists={nutritionists}
            />
          );
        case "children":
          return (
            <ChildrenScreen
              children={children}
              parents={parents}
              onSaveChild={handleSaveChild}
              onDeleteChild={handleDeleteChild}
            />
          );
        case "measurements":
          return (
            <MeasurementsScreen
              children={children}
              measurements={measurements}
              onSaveMeasurement={handleSaveMeasurement}
              onDeleteMeasurement={handleDeleteMeasurement}
            />
          );
        case "specialists":
          return (
            <SpecialistsScreen
              parents={parents}
              children={children}
              nutritionists={nutritionists}
            />
          );
        case "reports":
          return (
            <ReportsScreen children={children} measurements={measurements} />
          );
        default:
          return (
            <NutritionistDashboard
              children={children}
              measurements={measurements}
              parents={parents}
              nutritionists={nutritionists}
            />
          );
      }
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <ParentDashboard
            child={parentChild}
            latestMeasurement={latestParentMeasurement}
            history={parentHistory}
          />
        );
      case "child":
        return (
          <ParentChildScreen
            child={parentChild}
            latestMeasurement={latestParentMeasurement}
          />
        );
      case "growth":
        return <ParentGrowthScreen history={parentHistory} />;
      case "tips":
        return <TipsScreen />;
      case "settings":
        return (
          <SettingsScreen
            user={user}
            role={user.role}
            onLogout={() => setUser(null)}
          />
        );
      default:
        return (
          <ParentDashboard
            child={parentChild}
            latestMeasurement={latestParentMeasurement}
            history={parentHistory}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.appRoot}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.dark} />
      <View style={styles.appHeader}>
        <View>
          <Text style={styles.appHeaderTitle}>💚 SukatKalusugan</Text>
          <Text style={styles.appHeaderSubtitle}>
            {user.role === "nutritionist"
              ? "Nutritionist workspace"
              : "Parent workspace"}
          </Text>
        </View>
      </View>

      {renderScreen()}

      <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appRoot: { flex: 1, backgroundColor: COLORS.bg },
  appHeader: {
    backgroundColor: COLORS.dark,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
  },
  appHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  appHeaderSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 2,
  },
  screenContent: { padding: 16, paddingBottom: 32, gap: 14 },
  screenTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  screenSubtitle: { color: COLORS.muted, fontSize: 13, lineHeight: 18 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  statCard: {
    width: "48%",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: { fontSize: 24, fontWeight: "800", marginBottom: 6 },
  statTitle: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
  statHint: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 12,
  },
  heroCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 20,
    padding: 18,
    gap: 14,
  },
  heroStats: { flexDirection: "row", justifyContent: "space-around", gap: 12 },
  heroStatItem: { alignItems: "center" },
  heroStatValue: { color: COLORS.primary, fontSize: 22, fontWeight: "800" },
  heroStatLabel: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontSize: 11, fontWeight: "800" },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(221,231,225,0.65)",
  },
  listRowVertical: {
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(221,231,225,0.65)",
  },
  listHeaderRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  listTitle: { color: COLORS.text, fontSize: 15, fontWeight: "800" },
  listMeta: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
  emptyText: { color: COLORS.muted, fontSize: 13, paddingVertical: 6 },
  fieldWrap: { gap: 6 },
  fieldLabel: { color: COLORS.muted, fontSize: 12, fontWeight: "700" },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.text,
    fontSize: 14,
  },
  inputMultiline: { minHeight: 92, textAlignVertical: "top" },
  choiceGroup: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  choice: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  choiceSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  choiceText: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
  choiceTextSelected: { color: "#FFFFFF" },
  formTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  twoColumn: { flexDirection: "row", gap: 12 },
  columnHalf: { flex: 1 },
  horizontalChoiceWrap: { gap: 10, paddingRight: 4 },
  parentChip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  parentChipSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  parentChipText: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
  parentChipTextSelected: { color: COLORS.primary },
  formActionRow: { flexDirection: "row", gap: 10, marginTop: 6 },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonSmall: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  secondaryButtonSmall: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dangerButtonSmall: { borderColor: COLORS.danger },
  secondaryButtonText: { color: COLORS.text, fontSize: 14, fontWeight: "800" },
  childLinkText: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
  inlineMetaRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  inlineMeta: {
    color: COLORS.muted,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F4F7F5",
  },
  chartRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  chartLabel: {
    width: 128,
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
  },
  chartTrack: {
    flex: 1,
    height: 12,
    borderRadius: 999,
    backgroundColor: "#EAF0ED",
    overflow: "hidden",
  },
  chartFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },
  chartValue: {
    width: 28,
    textAlign: "right",
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  tipRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  tipNumberText: { color: COLORS.primary, fontSize: 12, fontWeight: "800" },
  tipText: { flex: 1, color: COLORS.text, fontSize: 13, lineHeight: 19 },
  childHero: { gap: 8 },
  childHeroName: { color: COLORS.text, fontSize: 20, fontWeight: "800" },
  childHeroMeta: { color: COLORS.muted, fontSize: 13 },
  childDetailName: { color: COLORS.text, fontSize: 20, fontWeight: "800" },
  childDetailMeta: { color: COLORS.muted, fontSize: 13, marginTop: 3 },
  settingsName: { color: COLORS.text, fontSize: 18, fontWeight: "800" },
  settingsMeta: { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.card,
    paddingVertical: 10,
  },
  tabBarContent: { paddingHorizontal: 12, gap: 10 },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#F3F7F4",
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabButtonEmoji: { fontSize: 18, marginBottom: 2 },
  tabButtonText: { color: COLORS.text, fontSize: 10, fontWeight: "700" },
  tabButtonTextActive: { color: "#FFFFFF" },
  loginSafeArea: { flex: 1, backgroundColor: COLORS.dark },
  loginBackgroundTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  loginBackgroundBottom: {
    position: "absolute",
    left: -90,
    bottom: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  loginRoot: { flex: 1 },
  loginScroll: {
    padding: 18,
    paddingBottom: 28,
    gap: 16,
    justifyContent: "center",
    flexGrow: 1,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  brandMarkText: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  brandTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  brandSubtitle: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    marginTop: 2,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
  },
  heroText: { color: COLORS.muted, fontSize: 14, lineHeight: 21 },
  roleSwitch: { flexDirection: "row", gap: 10 },
  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  roleButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  roleButtonText: { color: COLORS.text, fontSize: 13, fontWeight: "800" },
  roleButtonTextActive: { color: COLORS.primary },
  demoBox: {
    borderRadius: 16,
    backgroundColor: "#F4F7F5",
    padding: 14,
    gap: 6,
  },
  demoLabel: { color: COLORS.text, fontSize: 12, fontWeight: "800" },
  demoText: { color: COLORS.muted, fontSize: 12, lineHeight: 18 },
});
