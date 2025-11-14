import { useState } from 'react';
import CustomCursor from './components/layout/CustomCursor';
import ThemeToggle from './components/layout/ThemeToggle';
import ScrollProgress from './components/layout/ScrollProgress';
import SoundToggle from './components/layout/SoundToggle';
import Loader from './components/layout/Loader';
import TopNav from './components/layout/TopNav';
import GuitarStringsNav from './components/layout/GuitarStringsNav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero/Hero';
import About from './components/sections/About/About';
import Education from './components/sections/Education/Education';
import Projects from './components/sections/Projects/Projects';
import Contact from './components/sections/Contact/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <CustomCursor />
      <ScrollProgress />
      <ThemeToggle />
      <SoundToggle />
      <TopNav />
      <GuitarStringsNav />

      <main>
        <Hero />
        <About />
        <Education />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
