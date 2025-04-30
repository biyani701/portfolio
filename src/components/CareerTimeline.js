import React from "react";
import "./CareerTimeline.css";

const careerData = [
  {
    company: "Tata Infotech Ltd.",
    duration: "May 2000 – Oct 2003",
    designation: "Senior Software Engineer",
    logo: "/images/tata-infotech-logo.png"
  },
  {
    company: "Cognizant Technologies",
    duration: "Oct 2003 – Sep 2019",
    designation: "Delivery Lead",
    logo: "/images/cognizant.svg"
  },
  {
    company: "CoreCard Software",
    duration: "Nov 2019 – Present",
    designation: "Principal Project Analyst",
    logo: "/images/corecard.png"
  }
];

const CareerTimeline = () => (
  <section id="timeline" className="py-5 bg-light">
    <div className="container">
      <h2 className="mb-5 text-center">Career Timeline</h2>
      <div className="timeline d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        {careerData.map((item, index) => (
          <div className="timeline-item text-center mb-4 mb-md-0" key={index}>
            <img src={item.logo} alt={`${item.company} logo`} className="timeline-logo mb-2" />
            <h5 className="fw-bold">{item.company}</h5>
            <p className="mb-1"><em>{item.duration}</em></p>
            <p className="text-muted">{item.designation}</p>
            {index !== careerData.length - 1 && (
              <div className="timeline-connector d-none d-md-block" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CareerTimeline;
