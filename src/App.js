import Hero from './components/Hero';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import NavigationBar from './components/Navbar'; // From previous step
import CareerTimeline from './components/CareerTimeline';

function App() {
  return (
    <div>
      <NavigationBar />
      <Hero />
      <Summary />
      <Skills />
      <CareerTimeline />
      <Experience />
      <Certifications />
      <Education />
      <Recognition />
      <Contact />
    </div>
  );
}

export default App;
