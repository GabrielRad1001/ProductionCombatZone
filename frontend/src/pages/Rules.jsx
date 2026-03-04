import React, { useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { mockData } from '../mock';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Card, CardContent } from '../components/ui/card';

const Rules = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rules-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <Shield className="page-icon" />
          <h1 className="page-title">REGULAMENT</h1>
          <p className="page-subtitle">Reguli importante pentru o experiență sigură și distractivă</p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="notice-section">
        <div className="container">
          <Card className="notice-card">
            <CardContent className="notice-content">
              <AlertTriangle className="notice-icon" />
              <div className="notice-text">
                <h3 className="notice-title">Atenție!</h3>
                <p className="notice-description">
                  Vă rugăm să citiți cu atenție regulamentul înainte de a participa la joc. 
                  Respectarea acestor reguli asigură siguranța și distracția tuturor participanților.
                  Când ajungeți la arenă, veți primi un formular pe care îl veți completa, confirmând că ați înțeles și citit regulamentul.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rules Accordion */}
      <section className="rules-section">
        <div className="container">
          <Accordion type="single" collapsible className="rules-accordion">
            {mockData.rules.map((category, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="accordion-item">
                <AccordionTrigger className="accordion-trigger">
                  <div className="trigger-content">
                    <CheckCircle className="trigger-icon" />
                    <span className="trigger-text">{category.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="accordion-content">
                  <ul className="rules-list">
                    {category.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="rule-item">
                        <span className="rule-bullet"></span>
                        <span className="rule-text">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Safety Footer */}
      <section className="safety-footer">
        <div className="container">
          <Card className="safety-card">
            <CardContent className="safety-content">
              <Shield className="safety-icon" />
              <div className="safety-text">
                <h3 className="safety-title">Siguranța ta este prioritatea noastră</h3>
                <p className="safety-description">
                  Personalul nostru este instruit să asigure respectarea tuturor regulilor de siguranță. 
                  În cazul în care aveți întrebări sau nelămuriri, nu ezitați să contactați un instructor.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Rules;
