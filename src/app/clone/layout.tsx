export default function CloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "fixed", top: 0, left: 0 }}>
      {children}
    </div>
  );
}
