import React, { useEffect, useState } from 'react';
import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi';
import './Services.css';

const Services = () => {
  // const [projects, setProjects] = useState([]); // State to hold projects
  const { data: projects = [], isLoading: projectsLoading } = useGetAllProjectsQuery();
  const Projects = projects.filter(project => !project.isDefault && project.status === 'Active');
  useEffect(() => {
    // Scroll effect code 
    const mainContainer = document.querySelector('.services-container');
    const backgroundImage = document.querySelector('.background-image');

    function handleScroll() {
      const containerTop = mainContainer.getBoundingClientRect().top;
      const containerHeight = mainContainer.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;

      if (containerTop <= windowHeight && containerTop + containerHeight >= 0) {
        const scrollPercentage = Math.min(Math.max((windowHeight - containerTop) / windowHeight, 0), 1);
        gsap.to(backgroundImage, {
          width: `${80 + scrollPercentage * 20}%`, // Expands from 80% to 100%
          ease: 'power2.out',
        });
      } else if (containerTop > windowHeight) {
        gsap.to(backgroundImage, {
          width: '80%',
          ease: 'power2.out',
        });
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="services-container">
      <img src="src/assets/images/services-bg.png" alt="img" className="background-image" />
      <div className="inner-wrapper-services">
        <div className="heading-wrapper-services">
          <h4 className="tagline">Our Projects</h4>
          <h2>Enhancing Lives Through <br />Our Projects.</h2>
        </div>
        <div className="inner-container-services">
          {Projects.map((project) => (
            <div key={project._id} className="service-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {/* <p>{project.status}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
