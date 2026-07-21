import Navbar from "../components/layout/Navbar";

function LandingLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {children}
      </main>
    </>
  );
}

export default LandingLayout;