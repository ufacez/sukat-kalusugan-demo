import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const COLORS = {
  bg: "#f5f7f3",
  panel: "#ffffff",
  panelSoft: "#f1f6f1",
  text: "#163227",
  muted: "#6b7d73",
  line: "#dbe6dd",
  green: "#1a8f68",
  greenSoft: "#e6f4ef",
  amber: "#f5a623",
  amberSoft: "#fff4df",
  red: "#dc4c4c",
  redSoft: "#ffe9e9",
  blue: "#2d7ff9",
  blueSoft: "#e6f0ff",
  teal: "#11756b",
  tealSoft: "#e3f6f4",
};

const CHILDREN = [
  {
    id: 1,
    name: "Maria Santos",
    ageMonths: 26,
    sex: "Female",
    barangay: "Bagong Silang",
    parent: "Ana Santos",
    status: "Normal",
    weight: 11.8,
    height: 85.2,
    bmi: 16.3,
    lastCheckIn: "Today, 8:20 AM",
    note: "Active, improving appetite, due for next measurement in 2 weeks.",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    ageMonths: 20,
    sex: "Male",
    barangay: "Poblacion",
    parent: "Rosa Dela Cruz",
    status: "Underweight",
    weight: 8.2,
    height: 76.1,
    bmi: 14.2,
    lastCheckIn: "Yesterday, 3:10 PM",
    note: "Needs calorie-dense meals and close follow-up.",
  },
  {
    id: 3,
    name: "Lucia Reyes",
    ageMonths: 29,
    sex: "Female",
    barangay: "San Jose",
    parent: "Carla Reyes",
    status: "Stunted",
    weight: 10.2,
    height: 78.3,
    bmi: 16.7,
    lastCheckIn: "2 days ago",
    note: "Monitor height trend and schedule nutrition counseling.",
  },
  {
    id: 4,
    name: "Miguel Torres",
    ageMonths: 11,
    sex: "Male",
    barangay: "Bagong Silang",
    parent: "Pedro Torres",
    status: "Normal",
    weight: 9.1,
    height: 72.4,
    bmi: 17.3,
    lastCheckIn: "This morning",
    note: "Within expected range for age, keep monthly tracking.",
  },
  {
    id: 5,
    name: "Sofia Garcia",
    ageMonths: 28,
    sex: "Female",
    barangay: "Sta. Cruz",
    parent: "Lena Garcia",
    status: "Severely Underweight",
    weight: 7.9,
    height: 80.0,
    bmi: 12.4,
    lastCheckIn: "3 days ago",
    note: "High-priority follow-up and supplementary feeding support.",
  },
  {
    id: 6,
    name: "Carlos Lim",
    ageMonths: 16,
    sex: "Male",
    barangay: "Poblacion",
    parent: "Mei Lim",
    status: "Wasted",
    weight: 7.1,
    height: 72.5,
    bmi: 13.5,
    lastCheckIn: "4 days ago",
    note: "Track weekly weight gain and hydration closely.",
  },
];

const GROWTH_HISTORY = {
  1: [
    { label: "Jan", weight: 10.9, height: 81.6 },
    { label: "Feb", weight: 11.1, height: 82.1 },
    { label: "Mar", weight: 11.4, height: 83.0 },
    { label: "Apr", weight: 11.6, height: 84.0 },
    { label: "May", weight: 11.8, height: 85.2 },
  ],
  2: [
    { label: "Jan", weight: 7.6, height: 74.0 },
    { label: "Feb", weight: 7.7, height: 74.5 },
    { label: "Mar", weight: 7.9, height: 75.1 },
    { label: "Apr", weight: 8.0, height: 75.6 },
    { label: "May", weight: 8.2, height: 76.1 },
  ],
  3: [
    { label: "Jan", weight: 9.6, height: 76.7 },
    { label: "Feb", weight: 9.7, height: 77.0 },
    { label: "Mar", weight: 9.8, height: 77.4 },
    { label: "Apr", weight: 10.0, height: 77.8 },
    { label: "May", weight: 10.2, height: 78.3 },
  ],
  4: [
    { label: "Jan", weight: 8.4, height: 69.8 },
    { label: "Feb", weight: 8.6, height: 70.8 },
    { label: "Mar", weight: 8.8, height: 71.4 },
    { label: "Apr", weight: 8.9, height: 71.9 },
    { label: "May", weight: 9.1, height: 72.4 },
  ],
  5: [
    { label: "Jan", weight: 7.0, height: 78.8 },
    { label: "Feb", weight: 7.1, height: 79.0 },
    { label: "Mar", weight: 7.2, height: 79.4 },
    { label: "Apr", weight: 7.4, height: 79.7 },
    { label: "May", weight: 7.9, height: 80.0 },
  ],
  6: [
    { label: "Jan", weight: 6.6, height: 71.0 },
    { label: "Feb", weight: 6.7, height: 71.4 },
    { label: "Mar", weight: 6.9, height: 71.8 },
    { label: "Apr", weight: 7.0, height: 72.1 },
    { label: "May", weight: 7.1, height: 72.5 },
  ],
};

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Maria Santos is ready for her next nutrition check-in.",
    detail: "Follow-up reminder set for Friday at 9:00 AM.",
    tone: "info",
    time: "12 min ago",
  },
  {
    id: 2,
    title: "Juan Dela Cruz received an underweight result.",
    detail: "Parent coaching note and meal plan suggestions are available.",
    tone: "warning",
    time: "42 min ago",
  },
  {
    id: 3,
    title: "Growth history updated for Sofia Garcia.",
    detail: "Severe underweight case flagged for barangay nurse review.",
    tone: "danger",
    time: "2 hrs ago",
  },
  {
    id: 4,
    title: "Monthly summary report is ready to view.",
    detail: "Six parent profiles now have the latest nutrition result.",
    tone: "success",
    time: "Today",
  },
];

const RESULTS = [
  {
    id: 1,
    status: "Normal",
    summary: "Growth is on track.",
    action:
      "Continue balanced meals, regular activity, and monthly monitoring.",
  },
  {
    id: 2,
    status: "Underweight",
    summary: "Needs nutrition support.",
    action: "Encourage 3 meals, 2 snacks, and a follow-up in 7 days.",
  },
  {
    id: 3,
    status: "Stunted",
    summary: "Height trend needs attention.",
    action: "Prioritize protein-rich foods and repeat assessment next visit.",
  },
  {
    id: 5,
    status: "Severely Underweight",
    summary: "High-risk case flagged.",
    action: "Book immediate counseling and supplementary feeding support.",
  },
  {
    id: 6,
    status: "Wasted",
    summary: "Weight-for-height is below target.",
    action: "Monitor weekly and record intake, hydration, and symptoms.",
  },
];

const TABS = [
  { key: "home", label: "Home" },
  { key: "children", label: "Children" },
  { key: "history", label: "History" },
  { key: "notifications", label: "Alerts" },
  { key: "results", label: "Results" },
];

export default function App() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [screen, setScreen] = useState("tabs");
  const [selectedChildId, setSelectedChildId] = useState(CHILDREN[0].id);
  const [search, setSearch] = useState("");

  const selectedChild = useMemo(
    () => CHILDREN.find((child) => child.id === selectedChildId) ?? CHILDREN[0],
    [selectedChildId],
  );

  const childResults = useMemo(
    () =>
      RESULTS.map((result) => ({
        ...result,
        child: CHILDREN.find((child) => child.id === result.id),
      })).filter((item) => item.child),
    [],
  );

  const filteredChildren = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return CHILDREN;
    }

    return CHILDREN.filter((child) => {
      const haystack = [child.name, child.parent, child.barangay, child.status]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [search]);

  const currentHistory = GROWTH_HISTORY[selectedChild.id] ?? [];

  const goToProfile = (childId) => {
    setSelectedChildId(childId);
    setScreen("profile");
  };

  const handleLogin = () => {
    setSession({
      parentName: "Parent Demo Account",
      barangay: "Sukat Kalusugan Community",
    });
  };

  if (!session) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      {screen === "profile" ? (
        <ChildProfileScreen
          child={selectedChild}
          history={currentHistory}
          onBack={() => setScreen("tabs")}
          onOpenHistory={() => {
            setActiveTab("history");
            setScreen("tabs");
          }}
          onOpenResults={() => {
            setActiveTab("results");
            setScreen("tabs");
          }}
        />
      ) : (
        <View style={styles.appShell}>
          <View style={styles.topGlow} />
          <Header session={session} activeTab={activeTab} />
          <View style={styles.contentWrap}>
            {activeTab === "home" && (
              <DashboardScreen
                children={CHILDREN}
                onOpenChildren={() => setActiveTab("children")}
                onOpenNotifications={() => setActiveTab("notifications")}
                onOpenResults={() => setActiveTab("results")}
                onOpenProfile={goToProfile}
              />
            )}

            {activeTab === "children" && (
              <ChildrenScreen
                search={search}
                setSearch={setSearch}
                children={filteredChildren}
                onOpenProfile={goToProfile}
              />
            )}

            {activeTab === "history" && (
              <GrowthHistoryScreen
                child={selectedChild}
                history={currentHistory}
                children={CHILDREN}
                onSelectChild={setSelectedChildId}
                onOpenProfile={goToProfile}
              />
            )}

            {activeTab === "notifications" && <NotificationsScreen />}

            {activeTab === "results" && (
              <ResultsScreen
                results={childResults}
                onOpenProfile={goToProfile}
              />
            )}
          </View>
          <BottomTabs activeTab={activeTab} onChangeTab={setActiveTab} />
        </View>
      )}
    </SafeAreaView>
  );
}

function LoginScreen({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.loginScroll}>
        <View style={styles.loginHero}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>SK</Text>
          </View>
          <Text style={styles.loginTitle}>Parent Mobile Demo</Text>
          <Text style={styles.loginSubtitle}>
            Track child growth, view nutrition results, and receive follow-up
            alerts in one mobile dashboard.
          </Text>
        </View>

        <Card style={styles.loginCard}>
          <Field
            label="Parent ID"
            placeholder="Enter parent username"
            value={credentials.username}
            onChangeText={(value) =>
              setCredentials((current) => ({ ...current, username: value }))
            }
          />
          <Field
            label="PIN"
            placeholder="Enter secure PIN"
            secureTextEntry
            value={credentials.password}
            onChangeText={(value) =>
              setCredentials((current) => ({ ...current, password: value }))
            }
          />

          <Pressable style={styles.primaryButton} onPress={onLogin}>
            <Text style={styles.primaryButtonText}>Sign in</Text>
          </Pressable>

          <View style={styles.helperBlock}>
            <Text style={styles.helperLabel}>Demo access</Text>
            <Text style={styles.helperText}>
              Use the mobile prototype to present the parent flow on a phone.
            </Text>
          </View>

          <View style={styles.demoRow}>
            <DemoChip label="Username: parent_demo" />
            <DemoChip label="PIN: 1234" />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function Header({ session, activeTab }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerEyebrow}>Sukat Kalusugan</Text>
        <Text style={styles.headerTitle}>{screenTitle(activeTab)}</Text>
      </View>
      <View style={styles.headerAvatar}>
        <Text style={styles.headerAvatarText}>
          {session.parentName.slice(0, 1)}
        </Text>
      </View>
    </View>
  );
}

function DashboardScreen({
  children,
  onOpenChildren,
  onOpenNotifications,
  onOpenResults,
  onOpenProfile,
}) {
  const alerts = children.filter((child) => child.status !== "Normal").length;
  const followUps = children.filter((child) =>
    child.lastCheckIn.includes("Today"),
  ).length;
  const normalCount = children.filter(
    (child) => child.status === "Normal",
  ).length;

  return (
    <ScrollView
      contentContainerStyle={styles.screenScroll}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.heroCard}>
        <Text style={styles.heroLabel}>Welcome back</Text>
        <Text style={styles.heroTitle}>Parent progress at a glance</Text>
        <Text style={styles.heroText}>
          Review each child’s nutrition status, latest check-in, and next
          recommended action.
        </Text>

        <View style={styles.heroStatsRow}>
          <StatBlock value={children.length} label="Children" tone="green" />
          <StatBlock value={alerts} label="Alerts" tone="amber" />
          <StatBlock value={normalCount} label="Normal" tone="blue" />
        </View>
      </Card>

      <View style={styles.quickGrid}>
        <QuickAction label="Child list" tone="green" onPress={onOpenChildren} />
        <QuickAction
          label="Alerts"
          tone="amber"
          onPress={onOpenNotifications}
        />
        <QuickAction label="Results" tone="teal" onPress={onOpenResults} />
        <QuickAction
          label="Top child"
          tone="blue"
          onPress={() => onOpenProfile(1)}
        />
      </View>

      <SectionTitle
        title="Recent child updates"
        subtitle={`${followUps} check-ins happened today`}
      />
      {children.slice(0, 3).map((child) => (
        <ChildPreview
          key={child.id}
          child={child}
          onPress={() => onOpenProfile(child.id)}
        />
      ))}

      <SectionTitle
        title="What to do next"
        subtitle="Suggested tasks for the demo"
      />
      <Card style={styles.taskCard}>
        <TaskRow
          title="Review underweight children"
          detail="Focus on meal plan guidance and repeat check-ins."
        />
        <TaskRow
          title="Open nutrition results"
          detail="Show the latest classification per child."
        />
        <TaskRow
          title="Send reminder notifications"
          detail="Demonstrate alert delivery to parents."
        />
      </Card>
    </ScrollView>
  );
}

function ChildrenScreen({ search, setSearch, children, onOpenProfile }) {
  return (
    <ScrollView
      contentContainerStyle={styles.screenScroll}
      showsVerticalScrollIndicator={false}
    >
      <Field
        label="Search"
        placeholder="Search child, parent, barangay, or status"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.listMetaRow}>
        <Text style={styles.listMetaText}>
          {children.length} children found
        </Text>
        <Text style={styles.listMetaText}>Tap a card to view profile</Text>
      </View>
      {children.map((child) => (
        <ChildPreview
          key={child.id}
          child={child}
          onPress={() => onOpenProfile(child.id)}
        />
      ))}
    </ScrollView>
  );
}

function ChildProfileScreen({
  child,
  history,
  onBack,
  onOpenHistory,
  onOpenResults,
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.profileScroll}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to app</Text>
      </Pressable>

      <Card style={styles.profileHero}>
        <View style={styles.profileTopRow}>
          <View>
            <Text style={styles.profileName}>{child.name}</Text>
            <Text style={styles.profileMeta}>
              {child.sex} · {child.ageMonths} months · {child.barangay}
            </Text>
          </View>
          <StatusBadge status={child.status} />
        </View>
        <Text style={styles.profileNote}>{child.note}</Text>

        <View style={styles.profileStatsGrid}>
          <SmallMetric label="Weight" value={`${child.weight} kg`} />
          <SmallMetric label="Height" value={`${child.height} cm`} />
          <SmallMetric label="BMI" value={String(child.bmi)} />
          <SmallMetric label="Last check-in" value={child.lastCheckIn} />
        </View>
      </Card>

      <View style={styles.actionStrip}>
        <Pressable style={styles.secondaryButton} onPress={onOpenHistory}>
          <Text style={styles.secondaryButtonText}>Growth history</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onOpenResults}>
          <Text style={styles.secondaryButtonText}>Nutrition result</Text>
        </Pressable>
      </View>

      <SectionTitle
        title="Current details"
        subtitle="Guardian and monitoring information"
      />
      <Card style={styles.detailCard}>
        <DetailRow label="Parent" value={child.parent} />
        <DetailRow label="Barangay" value={child.barangay} />
        <DetailRow label="Status" value={child.status} />
      </Card>

      <SectionTitle
        title="Growth history snapshot"
        subtitle="Latest five measurements"
      />
      <Card style={styles.historyCard}>
        {history.map((point) => (
          <HistoryRow key={point.label} point={point} />
        ))}
      </Card>
    </ScrollView>
  );
}

function GrowthHistoryScreen({
  child,
  history,
  children,
  onSelectChild,
  onOpenProfile,
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.screenScroll}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle
        title="Growth history"
        subtitle="Compare weight and height trends over time"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.childPickerRow}
      >
        {children.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.childPicker,
              item.id === child.id && styles.childPickerActive,
            ]}
            onPress={() => onSelectChild(item.id)}
          >
            <Text
              style={[
                styles.childPickerText,
                item.id === child.id && styles.childPickerTextActive,
              ]}
            >
              {item.name.split(" ")[0]}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Card style={styles.historySummaryCard}>
        <Text style={styles.historySummaryTitle}>{child.name}</Text>
        <Text style={styles.historySummaryText}>
          {child.status} trend with a recorded weight of {child.weight} kg and
          height of {child.height} cm.
        </Text>
        {history.map((point) => (
          <TrendRow key={point.label} point={point} />
        ))}
      </Card>

      <SectionTitle
        title="Open profile"
        subtitle="Jump to the full child record"
      />
      <Pressable
        style={styles.primaryButton}
        onPress={() => onOpenProfile(child.id)}
      >
        <Text style={styles.primaryButtonText}>
          View {child.name.split(" ")[0]}'s profile
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function NotificationsScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.screenScroll}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle
        title="Notifications"
        subtitle="Alerts the parent can receive on mobile"
      />
      {NOTIFICATIONS.map((item) => (
        <NotificationCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

function ResultsScreen({ results, onOpenProfile }) {
  return (
    <ScrollView
      contentContainerStyle={styles.screenScroll}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle
        title="Nutritional status results"
        subtitle="Classification and next action per child"
      />
      {results.map((item) => (
        <Pressable
          key={item.id}
          style={styles.resultCard}
          onPress={() => onOpenProfile(item.id)}
        >
          <View style={styles.resultCardHeader}>
            <Text style={styles.resultName}>{item.child.name}</Text>
            <StatusBadge status={item.status} />
          </View>
          <Text style={styles.resultSummary}>{item.summary}</Text>
          <Text style={styles.resultAction}>{item.action}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function BottomTabs({ activeTab, onChangeTab }) {
  return (
    <View style={styles.bottomTabs}>
      {TABS.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onChangeTab(tab.key)}
          >
            <View style={[styles.tabDot, active && styles.tabDotActive]} />
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function Field({ label, ...props }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor="#8ca094"
        style={styles.fieldInput}
        {...props}
      />
    </View>
  );
}

function DemoChip({ label }) {
  return (
    <View style={styles.demoChip}>
      <Text style={styles.demoChipText}>{label}</Text>
    </View>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <View style={styles.sectionTitleWrap}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

function QuickAction({ label, tone, onPress }) {
  return (
    <Pressable
      style={[styles.quickAction, styles[`${tone}Action`]]}
      onPress={onPress}
    >
      <Text style={styles.quickActionLabel}>{label}</Text>
    </Pressable>
  );
}

function StatBlock({ value, label, tone }) {
  return (
    <View style={[styles.statBlock, styles[`${tone}Stat`]]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function StatusBadge({ status }) {
  const tone = toneForStatus(status);
  return (
    <View style={[styles.statusBadge, styles[`${tone}Badge`]]}>
      <Text style={[styles.statusBadgeText, styles[`${tone}BadgeText`]]}>
        {status}
      </Text>
    </View>
  );
}

function ChildPreview({ child, onPress }) {
  return (
    <Pressable style={styles.childCard} onPress={onPress}>
      <View style={styles.childCardTopRow}>
        <View>
          <Text style={styles.childName}>{child.name}</Text>
          <Text style={styles.childMeta}>
            {child.ageMonths} months · {child.parent}
          </Text>
        </View>
        <StatusBadge status={child.status} />
      </View>

      <Text style={styles.childBody}>{child.note}</Text>

      <View style={styles.childMetaRow}>
        <MetaPill label={child.barangay} tone="green" />
        <MetaPill label={`${child.weight} kg`} tone="blue" />
        <MetaPill label={child.lastCheckIn} tone="amber" />
      </View>
    </Pressable>
  );
}

function MetaPill({ label, tone }) {
  return (
    <View style={[styles.metaPill, styles[`${tone}Pill`]]}>
      <Text style={styles.metaPillText}>{label}</Text>
    </View>
  );
}

function SmallMetric({ label, value }) {
  return (
    <View style={styles.smallMetric}>
      <Text style={styles.smallMetricLabel}>{label}</Text>
      <Text style={styles.smallMetricValue}>{value}</Text>
    </View>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function HistoryRow({ point }) {
  return (
    <View style={styles.historyRow}>
      <Text style={styles.historyLabel}>{point.label}</Text>
      <View style={styles.historyRowValueGroup}>
        <Text style={styles.historyValue}>{point.weight} kg</Text>
        <Text style={styles.historyValueSoft}>{point.height} cm</Text>
      </View>
    </View>
  );
}

function TrendRow({ point }) {
  const weightWidth = Math.min(100, Math.max(22, (point.weight / 12) * 100));
  const heightWidth = Math.min(100, Math.max(22, (point.height / 90) * 100));

  return (
    <View style={styles.trendRow}>
      <Text style={styles.trendLabel}>{point.label}</Text>
      <View style={styles.trendBars}>
        <View style={styles.trendBarTrack}>
          <View style={[styles.trendBarFill, { width: `${weightWidth}%` }]} />
        </View>
        <View style={styles.trendBarTrackSoft}>
          <View
            style={[styles.trendBarFillSoft, { width: `${heightWidth}%` }]}
          />
        </View>
      </View>
      <Text style={styles.trendValue}>
        {point.weight} kg / {point.height} cm
      </Text>
    </View>
  );
}

function NotificationCard({ item }) {
  return (
    <View style={styles.notificationCard}>
      <View style={styles.notificationHeader}>
        <StatusBadge status={notificationLabel(item.tone)} />
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDetail}>{item.detail}</Text>
    </View>
  );
}

function TaskRow({ title, detail }) {
  return (
    <View style={styles.taskRow}>
      <View style={styles.taskDot} />
      <View style={styles.taskCopy}>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskDetail}>{detail}</Text>
      </View>
    </View>
  );
}

function toneForStatus(status) {
  switch (status) {
    case "Normal":
      return "green";
    case "Underweight":
      return "amber";
    case "Stunted":
      return "blue";
    case "Wasted":
      return "teal";
    case "Severely Underweight":
      return "red";
    default:
      return "green";
  }
}

function notificationLabel(tone) {
  switch (tone) {
    case "warning":
      return "Underweight";
    case "danger":
      return "Severely Underweight";
    case "success":
      return "Normal";
    default:
      return "Info";
  }
}

function screenTitle(tab) {
  switch (tab) {
    case "children":
      return "Child List";
    case "history":
      return "Growth History";
    case "notifications":
      return "Notifications";
    case "results":
      return "Nutrition Results";
    default:
      return "Dashboard";
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  appShell: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  topGlow: {
    position: "absolute",
    top: -90,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.greenSoft,
    opacity: 0.75,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerEyebrow: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 2,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.green,
  },
  headerAvatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  contentWrap: {
    flex: 1,
  },
  screenScroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  loginScroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
    justifyContent: "center",
  },
  loginHero: {
    marginBottom: 18,
  },
  brandBadge: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  brandBadgeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "900",
  },
  loginTitle: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.muted,
  },
  loginCard: {
    padding: 18,
    gap: 12,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "700",
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panelSoft,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
  },
  primaryButton: {
    backgroundColor: COLORS.green,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },
  helperBlock: {
    marginTop: 2,
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.greenSoft,
  },
  helperLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.green,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  helperText: {
    color: COLORS.text,
    lineHeight: 20,
  },
  demoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  demoChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS.panelSoft,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  demoChipText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "700",
  },
  card: {
    backgroundColor: COLORS.panel,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.line,
    shadowColor: "#113526",
    shadowOpacity: 0.08,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
  },
  heroCard: {
    padding: 20,
    marginBottom: 16,
  },
  heroLabel: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
  },
  heroText: {
    marginTop: 10,
    color: COLORS.muted,
    lineHeight: 22,
  },
  heroStatsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  statBlock: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
  },
  greenStat: { backgroundColor: COLORS.greenSoft },
  amberStat: { backgroundColor: COLORS.amberSoft },
  blueStat: { backgroundColor: COLORS.blueSoft },
  tealStat: { backgroundColor: COLORS.tealSoft },
  statValue: {
    color: COLORS.text,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "900",
  },
  statLabel: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  quickAction: {
    width: "48%",
    minHeight: 78,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  greenAction: { backgroundColor: COLORS.greenSoft },
  amberAction: { backgroundColor: COLORS.amberSoft },
  tealAction: { backgroundColor: COLORS.tealSoft },
  blueAction: { backgroundColor: COLORS.blueSoft },
  quickActionLabel: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  sectionTitleWrap: {
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  childCard: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
  },
  childCardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10,
  },
  childName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },
  childMeta: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 13,
  },
  childBody: {
    color: COLORS.text,
    lineHeight: 21,
    marginBottom: 12,
  },
  childMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metaPill: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
  },
  greenPill: { backgroundColor: COLORS.greenSoft },
  bluePill: { backgroundColor: COLORS.blueSoft },
  amberPill: { backgroundColor: COLORS.amberSoft },
  tealPill: { backgroundColor: COLORS.tealSoft },
  metaPillText: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
  },
  greenBadge: { backgroundColor: COLORS.greenSoft },
  amberBadge: { backgroundColor: COLORS.amberSoft },
  blueBadge: { backgroundColor: COLORS.blueSoft },
  tealBadge: { backgroundColor: COLORS.tealSoft },
  redBadge: { backgroundColor: COLORS.redSoft },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
  greenBadgeText: { color: COLORS.green },
  amberBadgeText: { color: COLORS.amber },
  blueBadgeText: { color: COLORS.blue },
  tealBadgeText: { color: COLORS.teal },
  redBadgeText: { color: COLORS.red },
  listMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  listMetaText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  profileScroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  backButtonText: {
    color: COLORS.green,
    fontSize: 15,
    fontWeight: "800",
  },
  profileHero: {
    padding: 18,
  },
  profileTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 12,
  },
  profileName: {
    color: COLORS.text,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "900",
  },
  profileMeta: {
    marginTop: 6,
    color: COLORS.muted,
    fontSize: 13,
  },
  profileNote: {
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  profileStatsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  smallMetric: {
    flexGrow: 1,
    minWidth: "47%",
    backgroundColor: COLORS.panelSoft,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  smallMetricLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.muted,
    marginBottom: 6,
  },
  smallMetricValue: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },
  actionStrip: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.panel,
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontWeight: "800",
  },
  detailCard: {
    padding: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  detailLabel: {
    color: COLORS.muted,
    fontWeight: "700",
  },
  detailValue: {
    color: COLORS.text,
    fontWeight: "800",
    maxWidth: "56%",
    textAlign: "right",
  },
  historyCard: {
    padding: 4,
    overflow: "hidden",
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  historyLabel: {
    color: COLORS.text,
    fontWeight: "800",
    minWidth: 36,
  },
  historyRowValueGroup: {
    flexDirection: "row",
    gap: 10,
  },
  historyValue: {
    color: COLORS.green,
    fontWeight: "800",
  },
  historyValueSoft: {
    color: COLORS.muted,
    fontWeight: "700",
  },
  childPickerRow: {
    marginBottom: 14,
  },
  childPicker: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginRight: 10,
  },
  childPickerActive: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  childPickerText: {
    color: COLORS.text,
    fontWeight: "800",
  },
  childPickerTextActive: {
    color: "white",
  },
  historySummaryCard: {
    padding: 16,
    marginBottom: 12,
  },
  historySummaryTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 6,
  },
  historySummaryText: {
    color: COLORS.muted,
    lineHeight: 22,
    marginBottom: 8,
  },
  trendRow: {
    marginTop: 10,
  },
  trendLabel: {
    color: COLORS.text,
    fontWeight: "800",
    marginBottom: 6,
  },
  trendBars: {
    gap: 8,
  },
  trendBarTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.greenSoft,
    overflow: "hidden",
  },
  trendBarTrackSoft: {
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.blueSoft,
    overflow: "hidden",
  },
  trendBarFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.green,
  },
  trendBarFillSoft: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.blue,
  },
  trendValue: {
    marginTop: 6,
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  notificationCard: {
    backgroundColor: COLORS.panel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 16,
    marginBottom: 12,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  notificationTime: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  notificationTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22,
    marginBottom: 6,
  },
  notificationDetail: {
    color: COLORS.muted,
    lineHeight: 21,
  },
  resultCard: {
    backgroundColor: COLORS.panel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 16,
    marginBottom: 12,
  },
  resultCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10,
  },
  resultName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    flexShrink: 1,
  },
  resultSummary: {
    color: COLORS.text,
    fontWeight: "800",
    marginBottom: 6,
  },
  resultAction: {
    color: COLORS.muted,
    lineHeight: 21,
  },
  taskCard: {
    padding: 16,
    gap: 14,
  },
  taskRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  taskDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.green,
    marginTop: 5,
  },
  taskCopy: {
    flex: 1,
  },
  taskTitle: {
    color: COLORS.text,
    fontWeight: "900",
    marginBottom: 4,
  },
  taskDetail: {
    color: COLORS.muted,
    lineHeight: 20,
  },
  bottomTabs: {
    backgroundColor: COLORS.panel,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: Platform.select({ ios: 22, android: 12 }),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  tabDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.line,
  },
  tabDotActive: {
    backgroundColor: COLORS.green,
    transform: [{ scale: 1.2 }],
  },
  tabLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
  },
  tabLabelActive: {
    color: COLORS.text,
  },
});
