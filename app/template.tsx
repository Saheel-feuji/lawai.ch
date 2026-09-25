/** Re-mounts on every navigation: a dark curtain slides away to reveal the new page. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="page-curtain" />
      {children}
    </>
  );
}
