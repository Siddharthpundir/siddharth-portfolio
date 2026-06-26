export default function Loading() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div 
        role="status"
        aria-label="Loading"
        style={{ 
          width: "48px", 
          height: "48px", 
          border: "4px solid var(--line)", 
          borderTopColor: "var(--violet)", 
          borderRadius: "50%", 
          animation: "spin 1s linear infinite" 
        }} 
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
