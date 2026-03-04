import React, { useEffect } from 'react';
import { Users, Target, Award, MapPin } from 'lucide-react';
import { mockData } from '../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">DESPRE NOI</h1>
          <p className="page-subtitle">Povestea Combat Zone Moisei și echipa noastră</p>
        </div>
      </section>

      {/* History Section */}
      <section className="content-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-icon-wrapper">
              <Target className="content-icon" />
            </div>
            <div className="content-text">
              <h2 className="content-title">Istoria Noastră</h2>
              <p className="content-description">{mockData.about.history}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="content-section alt">
        <div className="container">
          <div className="content-grid reverse">
            <div className="content-text">
              <h2 className="content-title">Misiunea Noastră</h2>
              <p className="content-description">{mockData.about.mission}</p>
            </div>
            <div className="content-icon-wrapper">
              <Award className="content-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <Users className="section-icon" />
            <h2 className="section-title">ECHIPA NOASTRĂ</h2>
            <p className="section-subtitle">Profesioniștii care fac experiența ta specială</p>
          </div>
          <div className="team-grid">
            {mockData.about.team.map((member, index) => (
              <Card key={index} className="team-card">
                <CardHeader>
                  <div className="team-avatar">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <CardTitle className="team-name">{member.name}</CardTitle>
                  <p className="team-role">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="team-description">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section">
        <div className="container">
          <div className="section-header">
            <MapPin className="section-icon" />
            <h2 className="section-title">FACILITĂȚILE NOASTRE</h2>
            <p className="section-subtitle">Tot ce avem pentru experiența ta perfectă</p>
          </div>
          <div className="facilities-grid">
            {mockData.about.facilities.map((facility, index) => (
              <Card key={index} className="facility-card">
                <CardContent className="facility-content">
                  <div className="facility-number">{index + 1}</div>
                  <p className="facility-text">{facility}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
