import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Qualifications from "./components/sections/Qualifications";
import Programs from "./components/sections/Programs";
import Testimonials from "./components/sections/Testimonials";
import Faq from "./components/sections/FAQ";
import CTA from "./components/sections/CTA";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Qualifications />
        <Programs />
        <Testimonials />
        <Faq />
        <CTA />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;
