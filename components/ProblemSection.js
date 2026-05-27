export default function ProblemSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#F5F0E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "128px 40px",
        marginTop: "-40vh",
      }}
    >
      {/* Gradient top — fades from transparent into cream, masks the hard section boundary */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, width: "100%", height: "80px",
        background: "linear-gradient(to bottom, transparent, #F5F0E8)",
        pointerEvents: "none",
        zIndex: 1,
      }} />
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontStyle: "normal",
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 500,
            lineHeight: 1.1,
            color: "#1C1C1A",
          }}
        >
          We handle the boring work,
        </h2>
        <h2
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontStyle: "normal",
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 500,
            lineHeight: 1.1,
            color: "#1C1C1A",
            marginTop: 8,
          }}
        >
          so you can focus on growing
        </h2>
      </div>
    </section>
  );
}
