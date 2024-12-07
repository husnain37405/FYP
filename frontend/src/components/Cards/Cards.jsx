// import React from 'react';
// import './Cards.css';  

// const Cards = () => {
//   return (
//     <section className="cards-section">
//       <h4 className="cards-label">Mission</h4>
//       <h2 className="main-title">4 Key Initiatives to Empower <br /> Our Community</h2>
//       <div className="mission-cards-wrapper">
//         <div className="mission-card">
//           <figure>
//             <div className="img-container">
//               <img src="src/assets/images/1st-card.jpg" alt="Description" />
//               <div className="number-circle top-right">01</div>
//             </div>
//             <figcaption className="card-content">
//               <h2>Youth and Family Support</h2>
//               <p>Contribute to our ongoing campaigns and help us provide essential services to those in need.
//                 Every donation counts.</p>
//             </figcaption>
//           </figure>
//         </div>
//         <div className="mission-card">
//           <figure>
//             <div className="img-container">
//               <img src="src/assets/images/2nd-card.jpg" alt="Description" />
//               <div className="number-circle bottom-right">02</div>
//             </div>
//             <figcaption className="card-content">
//               <h2>Mental Health Support</h2>
//               <p>Offering mental health counseling services to help individuals manage stress and improve their
//                 well-being.</p>
//             </figcaption>
//           </figure>
//         </div>
//         <div className="mission-card">
//           <figure>
//             <div className="img-container">
//               <img src="src/assets/images/3rd-card.jpeg" alt="Description" />
//               <div className="number-circle top-right">03</div>
//             </div>
//             <figcaption className="card-content">
//               <h2>Emergency Relief Efforts</h2>
//               <p>Learn about our emergency assistance programs designed to provide quick support during crises.</p>
//             </figcaption>
//           </figure>
//         </div>
//         <div className="mission-card">
//           <figure>
//             <div className="img-container">
//               <img src="src/assets/images/4th-card.jpg" alt="Description" />
//               <div className="number-circle bottom-right">04</div>
//             </div>
//             <figcaption className="card-content">
//               <h2>Community Outreach Programs</h2>
//               <p>Engage with our community outreach initiatives aimed at raising awareness and providing support
//                 to local communities.</p>
//             </figcaption>
//           </figure>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cards;


import React from 'react';
import './Cards.css';

const Cards = () => {
  return (
    <section className="cards-section">
      <h4 className="cards-label">Mission</h4>
      <h2 className="main-title">4 Key Initiatives to Empower <br /> Our Community</h2>
      <div className="mission-cards-wrapper">
        {[
          {
            imgSrc: "src/assets/images/1st-card.jpg",
            title: "Youth and Family Support",
            description:
              "Contribute to our ongoing campaigns and help us provide essential services to those in need. Every donation counts.",
            number: "01",
          },
          {
            imgSrc: "src/assets/images/2nd-card.jpg",
            title: "Mental Health Support",
            description:
              "Offering mental health counseling services to help individuals manage stress and improve their well-being.",
            number: "02",
          },
          {
            imgSrc: "src/assets/images/3rd-card.jpeg",
            title: "Emergency Relief Efforts",
            description:
              "Learn about our emergency assistance programs designed to provide quick support during crises.",
            number: "03",
          },
          {
            imgSrc: "src/assets/images/4th-card.jpg",
            title: "Community Outreach Programs",
            description:
              "Engage with our community outreach initiatives aimed at raising awareness and providing support to local communities.",
            number: "04",
          },
        ].map((card, index) => (
          <div className="mission-card" key={index}>
            <div className="img-container">
              <img src={card.imgSrc} alt={card.title} />
              <div className={`number-circle ${index % 2 === 0 ? "top-right" : "bottom-right"}`}>
                {card.number}
              </div>
            </div>
            <figcaption className="card-content">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </figcaption>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
