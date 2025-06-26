// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheet/LandingPage.css';
// --- THIS IS THE CORRECTED IMPORT LINE ---
import { FiFeather, FiLock, FiShare2, FiZap, FiAward, FiGithub, FiLinkedin, FiGrid, FiTarget, FiClipboard, FiTrello } from 'react-icons/fi';

// --- Developer Data (Easily Editable) ---
const developers = [
  { name: 'Rohith syam Livingston D', role: '[Lead] Full-Stack & Backend Devops', github: 'https://github.com/rohith7livingston/', linkedin: 'https://www.linkedin.com/in/rohith-livingston/' },
  { name: 'Fareed Shaik', role: 'Frontend & UI/UX Specialist', github: '#', linkedin: '#' },
  { name: 'PadalaDevisrisairam', role: 'Database & API Architect', github: 'https://github.com/PadalaDevisrisairam', linkedin: '#' },
  { name: 'NIKHILESWAR', role: 'orcehstrator & Real-time Specialist', github: 'https://github.com/NIKHILESWAR369', linkedin: 'https://www.linkedin.com/in/nikhileswar-relangi-b3b725280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-container">
          <Link to="/" className="logo">Note-it.up</Link>
          <nav className="landing-nav">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary">Get Started Free</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* --- HERO SECTION: Focus on the Product --- */}
        <section className="hero-section">
          <div className="hero-badge">
            <FiAward className="hero-badge-icon" />
            <span>24-Hour Hackathon Project</span>
          </div>
          <div className="landing-container">
            <h1 className="hero-title">Where Great Ideas Take Shape.</h1>
            <p className="hero-subtitle">
              Note-it.up is a lightning-fast, collaborative, and AI-powered notes platform designed for modern teams and thinkers.
              Capture your thoughts, bring your team together, and find clarity instantly.
            </p>
            <Link to="/register" className="btn btn-primary hero-cta">Start Noting Now</Link>
            <div className="hero-image-wrapper">
              <img src="./interface.png" alt="Notes application interface" className="hero-image" />
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="features-section">
          <div className="landing-container">
            <div className="section-heading">
              <h2>Built for Flow, Designed for Focus</h2>
              <p>Powerful features that feel intuitive and get out of your way.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <FiFeather className="feature-icon" />
                <h3>Distraction-Free Editor</h3>
                <p>A beautiful, minimalist writing space that helps you concentrate on what truly matters: your ideas.</p>
              </div>
              <div className="feature-card">
                <FiShare2 className="feature-icon" />
                <h3>Live Collaboration</h3>
                <p>Work together in real-time. See every cursor and edit as it happens, creating a true single source of truth for your team.</p>
              </div>
              <div className="feature-card">
                <FiZap className="feature-icon" />
                <h3>Instant AI Summaries</h3>
                <p>Transform long documents into concise, key takeaways with one click. Perfect for quick reviews and understanding core concepts.</p>
              </div>
              <div className="feature-card">
                <FiLock className="feature-icon" />
                <h3>Private & Secure</h3>
                <p>With end-to-end authentication and a secure architecture, your notes are for your eyes only. Your privacy is our priority.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- HACKATHON STORY SECTION --- */}
        <section className="hackathon-section">
          <div className="landing-container">
            <div className="hackathon-content">
              <div className="hackathon-icon-wrapper">
                <FiAward />
              </div>
              <h2>The 24-Hour Challenge</h2>
              <h3>From Concept to Code: A Hackathon Story</h3>
              <p>
                Note-it.up is more than just an app; it's a testament to what's possible with intense focus, teamwork, and a powerful tech stack. This entire platform was ideated, designed, and deployed by a team of four developers during a 24-hour hackathon, showcasing our ability to deliver high-quality, functional software under pressure.
              </p>
            </div>
          </div>
        </section>
        <section className="team-section">
          <div className="landing-container">
            <div className="section-heading">
              <h2>Meet the Developers</h2>
              <p>The team that brought Note-it.up to life in a day.</p>
            </div>
            <div className="team-grid">
              {developers.map((dev, index) => (
                <div key={index} className="developer-card">
                  <div className="dev-avatar">{dev.name.charAt(0)}</div>
                  <h3>{dev.name}</h3>
                  <p>{dev.role}</p>
                  <div className="dev-socials">
                    <a href={dev.github} target="_blank" rel="noopener noreferrer" title="GitHub"><FiGithub /></a>
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FiLinkedin /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* --- OUR PROCESS SECTION --- */}
        <section className="process-section">
          <div className="landing-container">
            <div className="section-heading">
              <h2>Our Development Process</h2>
              <p>Structure and strategy were key to our 24-hour success.</p>
            </div>
            <div className="process-grid">
              <div className="process-card">
                <FiClipboard className="process-icon" />
                <h4>1. Planning & Design (SDLC Phase 1 & 2)</h4>
                <p>We began by outlining core features, defining the database schema, and wireframing the user interface. This initial planning was crucial for a clear and unified direction.</p>
              </div>
              <div className="process-card">
                <FiGrid className="process-icon" />
                <h4>2. Divide & Conquer (SDLC Phase 3)</h4>
                <p>We split the project into four key modules: Backend API, Frontend UI, User Authentication, and Real-time Sockets. Each developer took ownership of a module, enabling parallel development.</p>
              </div>
              <div className="process-card">
                <FiTrello className="process-icon" />
                <h4>3. Integration & Testing (SDLC Phase 4)</h4>
                <p>As modules were completed, we merged them into the main branch. Continuous integration and  testing allowed us to identify and fix bugs quickly, ensuring the components worked together seamlessly.</p>
              </div>
              <div className="process-card">
                <FiTarget className="process-icon" />
                <h4>4. Deployment & Finalization (SDLC Phase 5)</h4>
                <p>In the final hours, our focus shifted to deploying the application and polishing the user experience. This allowed us to build a complete, working product within the 24-hour timeframe.</p>
              </div>
            </div>
          </div>
        </section>


        {/* --- MEET THE TEAM SECTION --- */}

      </main>

      <footer className="landing-footer">
        <div className="landing-container">
          <p>Note-it.up © 2024. A Landmark of our 24-Hour Hackathon.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;