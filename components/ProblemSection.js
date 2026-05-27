export default function ProblemSection() {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F5F0E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "128px 40px",
      }}
    >
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
