import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const STORAGE_KEY = "dripup_design_lab_config";
const PANEL_TABS = ["Component", "Typography", "Colors", "Layout", "Motion", "Content", "Assets", "Responsive"];
const FONT_BODY = '"Inter", sans-serif';
const FONT_HEADING = '"EB Garamond", Georgia, serif';
const INK = "#111318";
const INK_SOFT = "#252832";
const SURFACE_TEXT = "#F7F9FF";
const OUTLINE = "rgba(214,224,242,0.78)";

const DESIGN_LAB_COMPONENTS = [
  {
    id: "navbar",
    label: "Navbar",
    description: "Homepage top navigation and CTA actions.",
    controls: {
      Component: [
        { key: "logoText", label: "Logo text", type: "text", defaultValue: "Drip Up" },
      ],
      Typography: [
        { key: "fontSize", label: "Nav text size", type: "range", min: 11, max: 18, step: 1, unit: "px", defaultValue: 15 },
        { key: "logoLetterSpacing", label: "Logo tracking", type: "range", min: 0.05, max: 0.28, step: 0.01, unit: "em", defaultValue: 0.15 },
      ],
      Colors: [
        { key: "ink", label: "Ink", type: "color", defaultValue: INK },
        { key: "inkSoft", label: "Ink hover", type: "color", defaultValue: INK_SOFT },
        { key: "buttonText", label: "Button text", type: "color", defaultValue: SURFACE_TEXT },
        { key: "backgroundAlpha", label: "Glass opacity", type: "range", min: 0, max: 0.28, step: 0.01, defaultValue: 0.06 },
      ],
      Layout: [
        { key: "height", label: "Nav height", type: "range", min: 52, max: 86, step: 1, unit: "px", defaultValue: 64 },
        { key: "paddingX", label: "Side padding", type: "range", min: 16, max: 72, step: 2, unit: "px", defaultValue: 40 },
        { key: "gap", label: "Action gap", type: "range", min: 8, max: 28, step: 1, unit: "px", defaultValue: 16 },
        { key: "buttonHeight", label: "Button height", type: "range", min: 30, max: 48, step: 1, unit: "px", defaultValue: 36 },
      ],
      Motion: [
        { key: "hoverWidthAsk", label: "Ask hover width", type: "range", min: 150, max: 280, step: 2, unit: "px", defaultValue: 220 },
        { key: "hoverWidthEarly", label: "Early hover width", type: "range", min: 150, max: 280, step: 2, unit: "px", defaultValue: 200 },
      ],
      Content: [
        { key: "askShortLabel", label: "Ask short label", type: "text", defaultValue: "Ask" },
        { key: "askFullLabel", label: "Ask full label", type: "text", defaultValue: "Ask Drip Up what it can do" },
        { key: "earlyShortLabel", label: "Early short label", type: "text", defaultValue: "Early access" },
        { key: "earlyFullLabel", label: "Early full label", type: "text", defaultValue: "Get my early access" },
      ],
    },
  },
  {
    id: "backNavbar",
    label: "Back Navbar",
    description: "Back navigation used on inner pages.",
    controls: {
      Component: [
        { key: "logoText", label: "Logo text", type: "text", defaultValue: "Drip Up" },
      ],
      Typography: [
        { key: "fontSize", label: "Back text size", type: "range", min: 11, max: 18, step: 1, unit: "px", defaultValue: 15 },
      ],
      Colors: [
        { key: "ink", label: "Ink", type: "color", defaultValue: INK },
        { key: "inkSoft", label: "Ink hover", type: "color", defaultValue: INK_SOFT },
        { key: "buttonText", label: "Button text", type: "color", defaultValue: SURFACE_TEXT },
      ],
      Layout: [
        { key: "height", label: "Nav height", type: "range", min: 52, max: 86, step: 1, unit: "px", defaultValue: 64 },
        { key: "paddingX", label: "Side padding", type: "range", min: 16, max: 72, step: 2, unit: "px", defaultValue: 40 },
        { key: "buttonWidth", label: "Back button width", type: "range", min: 80, max: 150, step: 2, unit: "px", defaultValue: 92 },
      ],
      Content: [
        { key: "backLabel", label: "Back label", type: "text", defaultValue: "<- Back" },
      ],
    },
  },
  {
    id: "hero",
    label: "Hero",
    description: "First viewport command scene.",
    controls: {
      Typography: [
        { key: "headingFontSize", label: "Heading scale", type: "text", defaultValue: "clamp(2rem, 4vw, 3.5rem)" },
        { key: "headingLineHeight", label: "Heading line height", type: "range", min: 0.9, max: 1.4, step: 0.01, defaultValue: 1.15 },
      ],
      Colors: [
        { key: "ink", label: "Heading ink", type: "color", defaultValue: INK },
        { key: "panelTint", label: "Panel tint", type: "text", defaultValue: "rgba(238, 243, 255, 0.64)" },
        { key: "overlayOpacity", label: "Image overlay", type: "range", min: 0, max: 0.48, step: 0.01, defaultValue: 0.18 },
      ],
      Layout: [
        { key: "headingTop", label: "Heading top", type: "range", min: 10, max: 36, step: 1, unit: "vh", defaultValue: 22 },
        { key: "panelTop", label: "Panel top", type: "range", min: 24, max: 52, step: 1, unit: "vh", defaultValue: 36 },
        { key: "panelMaxWidth", label: "Panel max width", type: "range", min: 680, max: 1120, step: 10, unit: "px", defaultValue: 860 },
        { key: "panelRadius", label: "Panel radius", type: "range", min: 0, max: 32, step: 1, unit: "px", defaultValue: 20 },
      ],
      Motion: [
        { key: "wordSwapDelay", label: "Word hold", type: "range", min: 0.8, max: 4, step: 0.1, unit: "s", defaultValue: 1.8 },
      ],
      Content: [
        { key: "line1", label: "Heading line 1 words", type: "text", defaultValue: "Grow & manage your" },
        { key: "line2", label: "Heading line 2", type: "text", defaultValue: "simply by chatting" },
        { key: "inputPlaceholder", label: "Hero input placeholder", type: "text", defaultValue: "Tell me what...." },
      ],
      Assets: [
        { key: "imageOpacity", label: "Background image opacity", type: "range", min: 0.4, max: 1, step: 0.01, defaultValue: 1 },
      ],
    },
  },
  {
    id: "heroCanvas",
    label: "Hero WebGL",
    description: "Dissolve transition canvas.",
    controls: {
      Colors: [
        { key: "colorStart", label: "Dissolve start", type: "color", defaultValue: "#F0F4FF" },
        { key: "colorEnd", label: "Dissolve end", type: "color", defaultValue: "#FAFAFA" },
      ],
      Motion: [
        { key: "spread", label: "Noise spread", type: "range", min: 0, max: 1.2, step: 0.05, defaultValue: 0.5 },
        { key: "speed", label: "Scroll speed", type: "range", min: 0.3, max: 1.4, step: 0.05, defaultValue: 0.8 },
      ],
    },
  },
  {
    id: "stickyCards",
    label: "Sticky Cards",
    description: "Stacking card story and final CTA.",
    controls: {
      Typography: [
        { key: "cardHeadingSize", label: "Card heading size", type: "text", defaultValue: "clamp(32px, 3.2vw, 52px)" },
        { key: "ctaHeadingSize", label: "CTA heading size", type: "text", defaultValue: "clamp(2rem, 4vw, 3.5rem)" },
      ],
      Colors: [
        { key: "card1Bg", label: "Create card", type: "color", defaultValue: "#D8E2FF" },
        { key: "card2Bg", label: "Expand card", type: "color", defaultValue: "#BDF0DC" },
        { key: "card3Bg", label: "Control card", type: "color", defaultValue: "#FFE066" },
        { key: "card4Bg", label: "Grow card", type: "color", defaultValue: "#FFB090" },
        { key: "finalBg", label: "Final card", type: "color", defaultValue: "#111318" },
      ],
      Layout: [
        { key: "cardRadius", label: "Desktop card radius", type: "range", min: 0, max: 32, step: 1, unit: "px", defaultValue: 16 },
        { key: "desktopWidth", label: "Desktop card width", type: "range", min: 48, max: 86, step: 1, unit: "vw", defaultValue: 65 },
        { key: "desktopHeight", label: "Desktop card height", type: "range", min: 44, max: 78, step: 1, unit: "vh", defaultValue: 60 },
        { key: "cardGap", label: "Card content gap", type: "range", min: 12, max: 64, step: 2, unit: "px", defaultValue: 40 },
      ],
      Motion: [
        { key: "desktopStackDistance", label: "Desktop stack distance", type: "range", min: 1.5, max: 3.5, step: 0.1, unit: "vh", defaultValue: 2.5 },
        { key: "desktopExpandDistance", label: "Desktop expand distance", type: "range", min: 0.3, max: 1.2, step: 0.05, unit: "vh", defaultValue: 0.6 },
        { key: "imageStartScale", label: "Final image start scale", type: "range", min: 1, max: 1.5, step: 0.01, defaultValue: 1.2 },
      ],
      Content: [
        { key: "badgeText", label: "Final badge", type: "text", defaultValue: "Free for 1 month" },
        { key: "ctaLine1", label: "CTA line 1", type: "text", defaultValue: "Tell Drip Up what to do" },
        { key: "ctaLine2", label: "CTA line 2", type: "text", defaultValue: "and it manages the rest" },
        { key: "ctaButton", label: "CTA button", type: "text", defaultValue: "Get my early access" },
      ],
      Assets: [
        { key: "finalImageOpacity", label: "Final image opacity", type: "range", min: 0.4, max: 1, step: 0.01, defaultValue: 1 },
      ],
    },
  },
  {
    id: "faq",
    label: "FAQ",
    description: "Accordion and bottom question CTAs.",
    controls: {
      Typography: [
        { key: "headingSize", label: "Heading size", type: "text", defaultValue: "clamp(2.4rem, 5vw, 4rem)" },
        { key: "questionSize", label: "Question size", type: "text", defaultValue: "clamp(1rem, 2vw, 1.18rem)" },
      ],
      Colors: [
        { key: "background", label: "Section background", type: "text", defaultValue: "linear-gradient(to right, #F0F4FF, #FAFAFA)" },
        { key: "ink", label: "Ink", type: "color", defaultValue: INK },
        { key: "muted", label: "Answer text", type: "color", defaultValue: "#4F5B6B" },
      ],
      Layout: [
        { key: "topPadding", label: "Top padding", type: "range", min: 72, max: 200, step: 4, unit: "px", defaultValue: 128 },
        { key: "rowPadding", label: "Row padding", type: "range", min: 14, max: 38, step: 1, unit: "px", defaultValue: 24 },
      ],
      Content: [
        { key: "heading", label: "FAQ heading", type: "text", defaultValue: "Your questions, answered." },
        { key: "moreHeading", label: "Bottom heading", type: "text", defaultValue: "Got more questions?" },
        { key: "askButton", label: "Ask button", type: "text", defaultValue: "Ask Drip Up what it can do" },
        { key: "founderButton", label: "Founder button", type: "text", defaultValue: "Contact the founder" },
      ],
    },
  },
  {
    id: "ask",
    label: "Ask Page",
    description: "Chat page surface and input dock.",
    controls: {
      Typography: [
        { key: "aiSize", label: "AI text size", type: "range", min: 14, max: 24, step: 1, unit: "px", defaultValue: 18 },
        { key: "userSize", label: "User text size", type: "range", min: 12, max: 19, step: 1, unit: "px", defaultValue: 15 },
      ],
      Colors: [
        { key: "pageBg", label: "Page background", type: "text", defaultValue: "linear-gradient(to right, #F0F4FF, #FAFAFA)" },
        { key: "userBubble", label: "User bubble", type: "color", defaultValue: INK },
        { key: "inputBorder", label: "Input border", type: "text", defaultValue: "rgba(205, 218, 240, 0.95)" },
      ],
      Layout: [
        { key: "columnWidth", label: "Chat max width", type: "range", min: 520, max: 860, step: 10, unit: "px", defaultValue: 680 },
        { key: "inputHeight", label: "Input height", type: "range", min: 48, max: 76, step: 1, unit: "px", defaultValue: 60 },
      ],
      Content: [
        { key: "openingMessage", label: "Opening message", type: "textarea", defaultValue: "Hey, glad you're here. We're building a way for D2C sellers to manage their entire store simply by chatting, no dashboards, no tools, just conversations. What would you like to know about what I can do?" },
        { key: "placeholder", label: "Input placeholder", type: "text", defaultValue: "tell me ..." },
        { key: "earlyLabel", label: "Early action label", type: "text", defaultValue: "Get my early access" },
        { key: "founderLabel", label: "Founder action label", type: "text", defaultValue: "Contact the founder" },
      ],
    },
  },
  {
    id: "demo",
    label: "Early Access",
    description: "Early access form and flip state.",
    controls: {
      Typography: [
        { key: "headingSize", label: "Heading size", type: "text", defaultValue: "clamp(2rem, 4vw, 3.5rem)" },
        { key: "successSize", label: "Success size", type: "text", defaultValue: "clamp(2.35rem, 5.8vw, 3.9rem)" },
      ],
      Colors: [
        { key: "panelBg", label: "Panel background", type: "text", defaultValue: "linear-gradient(to right, rgba(240, 244, 255, 0.97), rgba(250, 250, 250, 0.97))" },
        { key: "buttonBg", label: "Button background", type: "color", defaultValue: INK },
      ],
      Layout: [
        { key: "panelWidth", label: "Panel width", type: "range", min: 380, max: 620, step: 10, unit: "px", defaultValue: 480 },
        { key: "panelRadius", label: "Panel radius", type: "range", min: 0, max: 32, step: 1, unit: "px", defaultValue: 20 },
      ],
      Content: [
        { key: "headingBefore", label: "Heading regular", type: "text", defaultValue: "Built just for " },
        { key: "headingItalic", label: "Heading italic", type: "text", defaultValue: "your brand" },
        { key: "subtext", label: "Subtext", type: "text", defaultValue: "Get access to Drip Up early" },
        { key: "button", label: "Button", type: "text", defaultValue: "Get my early access" },
        { key: "success", label: "Success message", type: "text", defaultValue: "Perfect, we will reach out to you soon !!!" },
      ],
      Assets: [
        { key: "imageOpacity", label: "Background image opacity", type: "range", min: 0.4, max: 1, step: 0.01, defaultValue: 1 },
        { key: "imagePosition", label: "Image position", type: "text", defaultValue: "center bottom" },
      ],
    },
  },
  {
    id: "founder",
    label: "Founder Contact",
    description: "Direct contact page cards.",
    controls: {
      Typography: [
        { key: "headingSize", label: "Heading size", type: "text", defaultValue: "clamp(2rem, 4vw, 3.5rem)" },
      ],
      Colors: [
        { key: "pageBg", label: "Page background", type: "text", defaultValue: "linear-gradient(to right, #F0F4FF, #FAFAFA)" },
        { key: "cardBg", label: "Card background", type: "text", defaultValue: "linear-gradient(to right, rgba(240, 244, 255, 0.94), rgba(250, 250, 250, 0.96))" },
      ],
      Layout: [
        { key: "cardRadius", label: "Card radius", type: "range", min: 0, max: 32, step: 1, unit: "px", defaultValue: 18 },
        { key: "cardGap", label: "Card gap", type: "range", min: 8, max: 32, step: 1, unit: "px", defaultValue: 16 },
      ],
      Content: [
        { key: "headingBefore", label: "Heading regular", type: "text", defaultValue: "I'd love to hear " },
        { key: "headingItalic", label: "Heading italic", type: "text", defaultValue: "from you!" },
        { key: "whatsappLabel", label: "WhatsApp label", type: "text", defaultValue: "WhatsApp" },
        { key: "linkedinLabel", label: "LinkedIn label", type: "text", defaultValue: "LinkedIn" },
        { key: "phoneLabel", label: "Phone label", type: "text", defaultValue: "Phone" },
        { key: "emailLabel", label: "Email label", type: "text", defaultValue: "Email" },
      ],
    },
  },
];

function buildDefaults() {
  return DESIGN_LAB_COMPONENTS.reduce((acc, component) => {
    acc[component.id] = {};
    Object.values(component.controls).flat().forEach((control) => {
      acc[component.id][control.key] = control.defaultValue;
    });
    return acc;
  }, {});
}

const DEFAULT_CONFIG = buildDefaults();
const DesignLabContext = createContext({
  enabled: false,
  config: DEFAULT_CONFIG,
  getValue: (_componentId, _key, fallback) => fallback,
  setValue: () => {},
  resetComponent: () => {},
  resetAll: () => {},
});

function isDev() {
  return process.env.NODE_ENV === "development";
}

function mergeConfig(storedConfig) {
  if (!storedConfig || typeof storedConfig !== "object") return DEFAULT_CONFIG;
  const nextConfig = { ...DEFAULT_CONFIG };
  Object.keys(DEFAULT_CONFIG).forEach((componentId) => {
    nextConfig[componentId] = {
      ...DEFAULT_CONFIG[componentId],
      ...(storedConfig[componentId] || {}),
    };
  });
  return nextConfig;
}

function readStoredConfig() {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    return mergeConfig(JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)));
  } catch {
    return DEFAULT_CONFIG;
  }
}

function writeStoredConfig(config) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Design experiments are optional; ignore storage failures.
  }
}

function formatValue(control, value) {
  if (control.type === "range" && control.unit) return `${value}${control.unit}`;
  return value;
}

export function DesignLabProvider({ children }) {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isDev()) return;
    setConfig(readStoredConfig());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isDev() || !isReady) return;
    writeStoredConfig(config);
  }, [config, isReady]);

  const value = useMemo(() => {
    function setValue(componentId, key, nextValue) {
      setConfig((currentConfig) => ({
        ...currentConfig,
        [componentId]: {
          ...(currentConfig[componentId] || {}),
          [key]: nextValue,
        },
      }));
    }

    function resetComponent(componentId) {
      setConfig((currentConfig) => ({
        ...currentConfig,
        [componentId]: { ...DEFAULT_CONFIG[componentId] },
      }));
    }

    function resetAll() {
      setConfig(DEFAULT_CONFIG);
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    return {
      enabled: isDev(),
      config,
      getValue(componentId, key, fallback) {
        if (!isDev()) return fallback;
        return config?.[componentId]?.[key] ?? fallback;
      },
      setValue,
      resetComponent,
      resetAll,
    };
  }, [config]);

  if (!isDev()) {
    return <DesignLabContext.Provider value={value}>{children}</DesignLabContext.Provider>;
  }

  return (
    <DesignLabContext.Provider value={value}>
      {children}
      <DesignLabOverlay />
    </DesignLabContext.Provider>
  );
}

export function useDesignLabEnabled() {
  return useContext(DesignLabContext).enabled;
}

export function useDesignLabValue(componentId, key, fallback) {
  return useContext(DesignLabContext).getValue(componentId, key, fallback);
}

function DesignLabOverlay() {
  const router = useRouter();
  const { config, setValue, resetComponent, resetAll } = useContext(DesignLabContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("hero");
  const [activeTab, setActiveTab] = useState("Component");

  const component = DESIGN_LAB_COMPONENTS.find((item) => item.id === activeComponent) || DESIGN_LAB_COMPONENTS[0];
  const controls = component.controls[activeTab] || [];

  useEffect(() => {
    function onKeyDown(event) {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        setIsOpen((current) => !current);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function downloadSnapshot() {
    const snapshot = {
      type: "dripup-design-lab-snapshot",
      note: "Experiment snapshot only. These values are not applied to source code.",
      timestamp: new Date().toISOString(),
      route: router.asPath,
      config,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dripup-design-lab-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open design lab"
        onClick={() => setIsOpen((current) => !current)}
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 10000,
          border: `1px solid ${OUTLINE}`,
          borderRadius: 999,
          background: INK,
          color: SURFACE_TEXT,
          fontFamily: FONT_BODY,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.02em",
          padding: "10px 14px",
          boxShadow: "0 14px 36px rgba(17, 19, 24, 0.22)",
          cursor: "pointer",
        }}
      >
        Design Lab
      </button>

      {isOpen && (
        <aside
          aria-label="Design Lab overlay"
          style={{
            position: "fixed",
            right: 18,
            bottom: 68,
            zIndex: 10000,
            width: "min(420px, calc(100vw - 36px))",
            maxHeight: "min(760px, calc(100vh - 92px))",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 18,
            border: `1px solid ${OUTLINE}`,
            background: "rgba(248, 250, 255, 0.96)",
            color: INK,
            boxShadow: "0 24px 76px rgba(17, 19, 24, 0.24), 0 8px 24px rgba(17, 19, 24, 0.12)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            fontFamily: FONT_BODY,
          }}
        >
          <div style={{ padding: 16, borderBottom: `1px solid ${OUTLINE}`, display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontFamily: FONT_HEADING, fontSize: 28, lineHeight: 1, fontWeight: 500 }}>Design Lab</div>
                <div style={{ marginTop: 5, fontSize: 12, lineHeight: 1.35, color: "#667386" }}>{router.asPath}</div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} style={iconButtonStyle} aria-label="Close design lab">
                x
              </button>
            </div>
            <select
              value={activeComponent}
              onChange={(event) => {
                setActiveComponent(event.target.value);
                setActiveTab("Component");
              }}
              style={fieldStyle}
            >
              {DESIGN_LAB_COMPONENTS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <p style={{ margin: 0, fontSize: 12, color: "#667386", lineHeight: 1.45 }}>{component.description}</p>
          </div>

          <div style={{ display: "flex", gap: 6, padding: "10px 12px", overflowX: "auto", borderBottom: `1px solid ${OUTLINE}` }}>
            {PANEL_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  border: `1px solid ${activeTab === tab ? INK : OUTLINE}`,
                  borderRadius: 999,
                  background: activeTab === tab ? INK : "transparent",
                  color: activeTab === tab ? SURFACE_TEXT : INK,
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "7px 11px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ padding: 16, overflowY: "auto", display: "grid", gap: 14 }}>
            {activeTab === "Responsive" && (
              <div style={noticeStyle}>
                Resize the browser for true responsive testing. Use this tab to store viewport notes in exports.
              </div>
            )}
            {controls.length ? (
              controls.map((control) => (
                <ControlRow
                  key={control.key}
                  componentId={component.id}
                  control={control}
                  value={config?.[component.id]?.[control.key] ?? control.defaultValue}
                  onChange={(nextValue) => setValue(component.id, control.key, nextValue)}
                />
              ))
            ) : (
              <div style={noticeStyle}>No controls are defined for this tab yet.</div>
            )}
          </div>

          <div style={{ padding: 16, borderTop: `1px solid ${OUTLINE}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button type="button" onClick={() => resetComponent(component.id)} style={secondaryButtonStyle}>
              Reset component
            </button>
            <button type="button" onClick={resetAll} style={secondaryButtonStyle}>
              Reset all
            </button>
            <button type="button" onClick={downloadSnapshot} style={{ ...primaryButtonStyle, gridColumn: "1 / -1" }}>
              Download JSON snapshot
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

function ControlRow({ componentId, control, value, onChange }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12, fontWeight: 700, color: INK }}>
        {control.label}
        {control.type === "range" && <span style={{ color: "#667386", fontWeight: 500 }}>{formatValue(control, value)}</span>}
      </span>
      {control.type === "textarea" ? (
        <textarea
          value={value}
          rows={5}
          onChange={(event) => onChange(event.target.value)}
          style={{ ...fieldStyle, resize: "vertical", minHeight: 92 }}
        />
      ) : control.type === "range" ? (
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      ) : (
        <input
          type={control.type === "color" ? "color" : "text"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={control.type === "color" ? colorFieldStyle : fieldStyle}
          data-component={componentId}
        />
      )}
    </label>
  );
}

const fieldStyle = {
  width: "100%",
  border: `1px solid ${OUTLINE}`,
  borderRadius: 10,
  background: "rgba(255,255,255,0.82)",
  padding: "10px 11px",
  fontFamily: FONT_BODY,
  fontSize: 13,
  color: INK,
  outline: "none",
};

const colorFieldStyle = {
  width: "100%",
  height: 42,
  border: `1px solid ${OUTLINE}`,
  borderRadius: 10,
  background: "rgba(255,255,255,0.82)",
  padding: 5,
  cursor: "pointer",
};

const iconButtonStyle = {
  width: 32,
  height: 32,
  border: `1px solid ${OUTLINE}`,
  borderRadius: 999,
  background: "transparent",
  color: INK,
  fontFamily: FONT_BODY,
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  minHeight: 40,
  border: `1px solid ${OUTLINE}`,
  borderRadius: 999,
  background: "transparent",
  color: INK,
  fontFamily: FONT_BODY,
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
};

const primaryButtonStyle = {
  minHeight: 42,
  border: 0,
  borderRadius: 999,
  background: INK,
  color: SURFACE_TEXT,
  fontFamily: FONT_BODY,
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
};

const noticeStyle = {
  border: `1px solid ${OUTLINE}`,
  borderRadius: 12,
  background: "rgba(255,255,255,0.62)",
  padding: 12,
  fontSize: 12,
  lineHeight: 1.45,
  color: "#667386",
};
