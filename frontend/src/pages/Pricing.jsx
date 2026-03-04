import React, { useEffect } from 'react';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockData } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pricing-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">TARIFE</h1>
            <p className="page-subtitle">Pachete flexibile pentru fiecare tip de jucător</p>
            <p className="payment-warning">
              ⚠️ Rezervările se vor confirma doar după achitarea avansului de 50% din totalul rezervării</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-main-section">
        <div className="container">
          <div className="pricing-grid-full">
            {mockData.pricing.map((pkg) => (
              <Card key={pkg.id} className={`pricing-card-full ${pkg.popular ? 'popular-full' : ''}`} style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                {pkg.popular && (
                  <div className="popular-ribbon">
                    <Star className="ribbon-icon" />
                    <span>CEL MAI POPULAR</span>
                  </div>
                )}
                <CardHeader className="pricing-header">
                  <CardTitle className="pricing-title-full">{pkg.name}</CardTitle>
                  <div className="pricing-price-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0' }}>
                      {pkg.price.includes('RON') ? (
                        <>
                          <span className="pricing-price-full" style={{ fontSize: '3.5rem' }}>{pkg.price.split('RON')[0]}RON</span>
                          {pkg.price.includes('/') && <span style={{ fontSize: '1.25rem', fontWeight: '500', marginLeft: '0', color: '#FFFFFF' }}>{pkg.price.split('RON')[1]}</span>}
                        </>
                      ) : (
                        <span className="pricing-price-full" style={{ fontSize: '2rem' }}>{pkg.price}</span>
                      )}
                    </div>
                    <CardDescription className="pricing-desc">
                      {pkg.id === 3 ? 'Joc intens toata ziua' : '90 minute de joc intens'}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pricing-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <ul className="pricing-features-full">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="pricing-feature-full">
                        <Check className="check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/rezervari?pachet=${encodeURIComponent(pkg.name)}`}>
                    <Button className={pkg.popular ? 'btn-primary full-width' : 'btn-secondary full-width'}>
                      REZERVĂ ACUM
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            <Card className="info-card">
              <CardContent className="info-content">
                <h3 className="info-title">Reduceri Speciale</h3>
                <p className="info-text">
                  Pentru evenimente private oferim reduceri. 
                  Contactează-ne pentru oferte personalizate!
                </p>
              </CardContent>
            </Card>
            <Card className="info-card">
              <CardContent className="info-content">
                <h3 className="info-title">Ce este inclus</h3>
                <p className="info-text">
                  Toate rezervările includ echipament complet, instructaj de siguranță, 
                  și acces la facilitățile noastre moderne.
                </p>
              </CardContent>
            </Card>
            <Card className="info-card">
              <CardContent className="info-content">
                <h3 className="info-title">Metode de plată</h3>
                <p className="info-text">
                  Acceptăm plata cu numerar și card bancar la locație. 
                  Rezervarea se poate face online sau telefonic.
                  Avans perceput pentru fiecare rezervare - minim 50%.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
