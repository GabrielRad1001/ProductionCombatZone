import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock, Shield } from 'lucide-react';
import { mockData } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img
            src="https://images.unsplash.com/photo-1550275994-cdc89cd1948f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzfGVufDB8fHx8MTc2ODMxMTk1OHww&ixlib=rb-4.1.0&q=85"
            alt="Combat Zone Moisei Arena"
            className="hero-image" />

          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">{mockData.hero.title}</h1>
          <p className="hero-subtitle">{mockData.hero.subtitle}</p>
          <p className="hero-description">{mockData.hero.description}</p>
          <div className="hero-buttons">
            <Link to="/rezervari">
              <Button className="btn-primary">REZERVĂ ACUM</Button>
            </Link>
            <Link to="/tarife">
              <Button className="btn-secondary">VEZI TARIFE</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3 className="feature-title">Siguranță Maximă</h3>
              <p className="feature-description">Echipament profesional și instructori experimentați pentru o experiență sigură</p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3 className="feature-title">Pentru Toate Vârstele</h3>
              <p className="feature-description">Distracție garantată pentru copii, adolescenți și adulți</p>
            </div>
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h3 className="feature-title">Program Flexibil</h3>
              <p className="feature-description">Deschis zilnic (10:00 - 22:00) cu opțiuni de rezervare la orice oră</p>
            </div>
            <div className="feature-card">
              <Star className="feature-icon" />
              <h3 className="feature-title">Tehnologie Avansată</h3>
              <p className="feature-description">Echipament high-tech și arenă exterioară strategic și bine aranjată</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="pricing-preview-section">
        <div className="container">
          <h2 className="section-title">TARIFELE NOASTRE</h2>
            <p className="section-subtitle">Alege pachetul potrivit pentru tine</p>
            <p className="payment-warning">
             ⚠️ Rezervările se vor confirma doar după achitarea avansului de 50% din totalul rezervării</p>
        <div className="pricing-grid">
            {mockData.pricing.map((pkg) =>
            <Card key={pkg.id} className={`pricing-card ${pkg.popular ? 'popular' : ''}`} style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                {pkg.popular && <div className="popular-badge">CEL MAI POPULAR</div>}
                <CardHeader>
                  <CardTitle className="pricing-card-title !font-semibold !text-center">{pkg.name}</CardTitle>
                  <div className="pricing-card-price">
                    {pkg.price.includes('RON') ?
                  <>
                        <span style={{ fontSize: '3rem' }}>{pkg.price.split('RON')[0]}RON</span>
                        {pkg.price.includes('/') && <span style={{ fontSize: '1.25rem', fontWeight: '500', marginLeft: '0' }}>{pkg.price.split('RON')[1]}</span>}
                      </> :

                  <span style={{ fontSize: '2rem' }}>{pkg.price}</span>
                  }
                  </div>
                  {pkg.duration && <CardDescription className="pricing-card-duration">{pkg.duration}</CardDescription>}
                </CardHeader>
                <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <ul className="pricing-features">
                    {pkg.features.map((feature, idx) =>
                  <li key={idx} className="pricing-feature-item">{feature}</li>
                  )}
                  </ul>
                  <Link to={`/rezervari?pachet=${encodeURIComponent(pkg.name)}`}>
                    <Button className="btn-primary full-width">REZERVĂ</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="gallery-preview-section">
        <div className="container">
          <h2 className="section-title">COLECȚIE FOTO</h2>
          <p className="section-subtitle">Capturile noastre cele mai bune momente</p>
          <div className="gallery-grid">
            {mockData.gallery.slice(0, 4).map((image) =>
            <div key={image.id} className="gallery-item">
                <img src={image.url} alt={image.title} className="gallery-image" />
                <div className="gallery-overlay">
                  <h4 className="gallery-title">{image.title}</h4>
                  <p className="gallery-description">{image.description}</p>
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <Link to="/colectie-foto">
              <Button className="btn-secondary">VEZI TOATE FOTOGRAFIILE</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">CE SPUN CLIENȚII NOȘTRI</h2>
          <p className="section-subtitle">Experiențe reale de la jucătorii noștri</p>
          <div className="testimonials-grid">
            {mockData.testimonials.map((testimonial) =>
            <Card key={testimonial.id} className="testimonial-card">
                <CardContent className="testimonial-content">
                  <div className="testimonial-stars">
                    {[...Array(testimonial.rating)].map((_, i) =>
                  <Star key={i} className="star-icon filled" />
                  )}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <p className="author-name">{testimonial.name}</p>
                    <p className="author-date">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">GATA SĂ ÎNCEPI AVENTURA?</h2>
          <p className="cta-subtitle">Rezervă-ți locul acum și trăiește experiența laser tag!</p>
          <Link to="/rezervari">
            <Button className="btn-primary large">REZERVĂ ACUM</Button>
          </Link>
        </div>
      </section>
    </div>);

};

export default Home;