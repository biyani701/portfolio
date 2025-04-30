const skillSections = {
    "Tools": ["Jira (10+ yrs)", "Confluence (5+ yrs)", "MS Project (13+ yrs)"],
    "Programming": ["Python (5+ yrs)", "SQL (9+ yrs)", "Unix C/C++ (12+ yrs)"],
    "Databases": ["Oracle (9+ yrs)", "PostgreSQL (3+ yrs)", "MS SQL (4+ yrs)"],
    "Data Visualization": ["Plotly (5+ yrs)"],
    "Domain Knowledge": ["Credit Card & Payments", "Market Reference Data"]
  };
  
  const Skills = () => (
    <section id="skills" className="py-5">
      <div className="container">
        <h2 className="mb-4">Technical Skills</h2>
        <div className="row">
          {Object.entries(skillSections).map(([category, skills]) => (
            <div key={category} className="col-md-4 mb-3">
              <h5>{category}</h5>
              <ul className="list-unstyled">
                {skills.map(skill => (
                  <li key={skill}>• {skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
  export default Skills;
  