import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import './App.css';

// Importing images for skills
import figmaImage from './assets/react.svg';
import adobeXdImage from './assets/Unknown.png';
import cssImage from './assets/htmlicon.webp';
import htmlImage from './assets/css3-512.webp';
import javascriptImage from './assets/figmaicon.png';
import reactImage from './assets/adobeicon.png';
import headerImage from './assets/astrid5.png';

// Importing videos and images for projects
import nipponVideo from './assets/nippon skærmoptagelse.mov';
import stenoVideo from './assets/steno.mov';
import immense1 from './assets/immense1.png';
import immense2 from './assets/immense2.png';
import immense3 from './assets/immense3.png';
import immenseVideo from './assets/immense.mov'; 
import linkedinLogo from './assets/linkedin-logo.webp'; 

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [slideIndices, setSlideIndices] = useState({});

  useEffect(() => {
    gsap.fromTo(".combined-section", 
      { opacity: 0, y: 100 }, 
      {
        opacity: 1, y: -50, duration: 0.4, 
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".combined-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Skills data with image paths
  const skills = [
    { id: 1, name: "React", image: figmaImage },
    { id: 2, name: "Javascript", image: adobeXdImage },
    { id: 3, name: "HTML", image: cssImage },
    { id: 4, name: "CSS", image: htmlImage },
    { id: 5, name: "Figma", image: javascriptImage },
    { id: 6, name: "AdobeXD", image: reactImage }
  ];

  // Projects data with media paths

    const projects = [
      {
        id: 1,
        name: "Nippon Måltidskasser",
        category: "Frontend",
        description: `During my second semester, I collaborated with a team to develop a digital platform for Nippon’s meal box service. The project aimed to create a seamless, user-friendly experience for customers to subscribe, customize, and order Japanese-inspired meal boxes.
        
        My Role & Contributions:
        I led UX research, conducting user interviews and creating personas to identify user pain points. Using the Double Diamond framework, I designed wireframes and interactive prototypes in Figma, followed by extensive user testing to optimize the user journey. On the frontend, I built dynamic JavaScript components for meal customization, implemented responsive design, and ensured smooth interactions across devices.
        
        Key Takeaways:
        This project deepened my expertise in UX research, wireframing, and frontend development. I improved my skills in JavaScript, HTML, and CSS while also integrating SEO strategies to enhance the platform's visibility. Collaborating in an agile environment with tools like Trello helped me further develop my ability to work efficiently under deadlines.`,
        media: [nipponVideo]
      },
      { id: 2, name: "Stenomuseumet", 
      category: "UX/UI", 
      description: 'Our team developed an interactive web app for Steno Museum’s “Kære krop, svære krop” exhibit, focusing on body image and self-acceptance. The goal was to create an immersive experience using storytelling, video, and interactive infographics. My Role & Contributions: I led the UX/UI design, creating wireframes and prototypes in Figma. I implemented interactive elements using JavaScript and CSS to ensure a seamless user experience. The design featured responsive layouts, dynamic animations, and multimedia integration to engage users across devices. What I Learned: This project strengthened my UX research and frontend skills, especially in JavaScript, HTML, and CSS. I gained experience designing user-centered interfaces and working with multimedia content, all while collaborating in an agile team environment.', media: [stenoVideo] },
      { id: 3, name: "Immense Festival", category: "Design", description: "I volunteered at Immense Festival, where I helped produce video content and created mockups for their website. I worked closely with the team, gaining valuable insights into design and frontend practices while applying my skills to enhance their online presence. My Role & Contributions: I collaborated on the website's design, creating visual mockups in Figma and assisting with the frontend development. I focused on improving the user interface, ensuring responsive design, and integrating multimedia elements like videos to create an engaging experience for festival visitors. What I Learned: This project allowed me to refine my UX and frontend development skills, working with real-world design challenges. I improved my ability to combine creativity with technical skills, focusing on responsive layouts, video integration, and collaborating with a team to deliver a cohesive digital product.", media: [immenseVideo, immense1, immense2, immense3] }
    ];
  

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredProjects = selectedFilter === "All"
    ? projects
    : projects.filter(project => project.category === selectedFilter);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const showSlide = (index, mediaLength, projectId) => {
    setSlideIndices((prevState) => ({
      ...prevState,
      [projectId]: (index + mediaLength) % mediaLength, 
    }));
  };

  return (
    <div id="main-container">
      {/* Header Section */}
      <header className="header-section" style={{ backgroundImage: `url(${headerImage})` }}>
        <nav className="navbar">
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#about">About Me</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-content">
          <h1>
            <span className="word">Hello,</span> 
            <span className="word">I'm</span> 
            <span className="word">Astrid.</span>
          </h1>
          <p>Welcome to my portfolio.</p>
          <a href="https://www.linkedin.com/in/astrid-lauritzen-8069aa279/" target="_blank" rel="noopener noreferrer">
  <img src={linkedinLogo} alt="LinkedIn" className="linkedin-logo" />
</a>
        </div>
      </header>
  
      {/* Combined Section for Skills, Filter, Projects, About, and Contact */}
      <section className="combined-section">
        {/* Skills Section */}
        <div id="skills" className="skills-section">
          <h2>My Skills</h2>
          <div className="skills-grid">
            {skills.map(skill => (
              <div key={skill.id} className="skill-item">
                <img src={skill.image} alt={skill.name} className="skill-image" />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <h2>My Projects</h2>
          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className={`project-item ${index % 2 === 0 ? 'left-align' : 'right-align'}`}>
                <div className="project-image">
                  <div className="slideshow-container">
                    {project.media[slideIndices[project.id] || 0].includes(".mov") || project.media[slideIndices[project.id] || 0].includes(".mp4") ? (
                      <video width="450" height="500" controls>
                        <source src={project.media[slideIndices[project.id] || 0]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={project.media[slideIndices[project.id] || 0]} alt={project.name} className="slide-image" />
                    )}
                    {project.media.length > 1 && (
                      <>
                        <button className="prev" onClick={() => showSlide((slideIndices[project.id] || 0) - 1, project.media.length, project.id)}>&#10094;</button>
                        <button className="next" onClick={() => showSlide((slideIndices[project.id] || 0) + 1, project.media.length, project.id)}>&#10095;</button>
                      </>
                    )}
                  </div>
                </div>
                <div className="project-description">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h2>About Me</h2>
              <p>Hi! I'm Astrid Lauritzen, a 22-year-old currently studying Multimedia Design, with a particular focus on frontend development. I love working on projects that combine creativity with technical skills—building intuitive user experiences and clean, functional designs is my passion. Whether it's through coding or designing, I always strive to create solutions that are not only visually appealing but also meaningful and user-friendly.

Right now, I'm exploring new ways to expand my skillset in frontend development and UX, particularly in HTML, CSS, JavaScript, and prototyping tools like Figma. I’m passionate about responsive design and always keep the user in mind when developing interfaces that work across devices. I believe in the importance of good communication and collaboration, and I love working in teams where creativity and innovation thrive.

Outside of work, I’m always looking for inspiration, whether it’s through design, art, or simply spending time exploring new ideas. I like to think of myself as someone who doesn’t just follow trends but also tries to set them, always seeking out new challenges and learning experiences.

If you’re looking for a frontend/UX intern who’s eager to learn, grow, and make a positive impact, I’d love to hear from you!.</p>
            </div>
            <div className="about-image">
              <img src="src/assets/astrid2.png" alt="Astrid" />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <h2>Contact</h2>
          <p>If you’d like to reach out to me, feel free to contact me via email:</p>
    <div className="contact-email-wrapper">
      <a href="mailto:astridhejselau@gmail.com" className="contact-email">astridhejselau@gmail.com</a>
      </div>
        </section>
      </section>

      {/* Scroll to Top Button */}
      {isVisible && ( 
        <button className="scroll-to-top" onClick={scrollToTop}>
          &#8679;
        </button>
      )}
    </div>
  );
}

export default App;
