import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Calendar, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { mockData } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// Remove trailing slash if exists to prevent double slashes
const API = `${BACKEND_URL.replace(/\/$/, '')}/api`;

const Reservations = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preSelectedPackage = searchParams.get('pachet') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    people: '',
    package: preSelectedPackage,
    message: ''
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch available times when date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailableTimes(formData.date);
    } else {
      setAvailableTimes([]);
    }
  }, [formData.date]);

  const fetchAvailableTimes = async (date) => {
    setLoadingTimes(true);
    try {
      const response = await axios.get(`${API}/reservations/available-times?date=${date}`);
      if (response.data.success) {
        setAvailableTimes(response.data.all_slots || []);
      }
    } catch (error) {
      console.error('Error fetching available times:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca orele disponibile.",
        variant: "destructive"
      });
    } finally {
      setLoadingTimes(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert date format from yyyy-mm-dd to dd/mm/yyyy for display
    if (name === 'date') {
      // Keep it in yyyy-mm-dd format for API calls
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Format date for display (dd/mm/yyyy)
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Parse date from dd/mm/yyyy to yyyy-mm-dd
  const parseDateFromDisplay = (displayStr) => {
    if (!displayStr) return '';
    const [day, month, year] = displayStr.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleWhatsAppReservation = () => {
    const packageText = formData.package ? `Pachet selectat: ${formData.package}%0A` : '';
    const message = `Bună! Aș dori să fac o rezervare:%0A%0A${packageText}Nume: ${formData.name}%0AEmail: ${formData.email}%0ATelefon: ${formData.phone}%0AData: ${formData.date}%0AOra: ${formData.time}%0ANumăr persoane: ${formData.people}%0AMesaj: ${formData.message}`;
    window.open(`https://wa.me/${mockData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    toast({
      title: "Redirecționare către WhatsApp",
      description: "Veți fi redirecționat către WhatsApp pentru a finaliza rezervarea.",
    });
  };

  const handleEmailReservation = () => {
    const packageText = formData.package ? `Pachet selectat: ${formData.package}%0A` : '';
    const subject = 'Rezervare Combat Zone Moisei';
    const body = `Bună!%0A%0AAș dori să fac o rezervare:%0A%0A${packageText}Nume: ${formData.name}%0AEmail: ${formData.email}%0ATelefon: ${formData.phone}%0AData: ${formData.date}%0AOra: ${formData.time}%0ANumăr persoane: ${formData.people}%0AMesaj: ${formData.message}`;
    window.open(`mailto:${mockData.contact.email}?subject=${subject}&body=${body}`, '_blank');
    toast({
      title: "Redirecționare către Email",
      description: "Veți fi redirecționat către aplicația de email pentru a finaliza rezervarea.",
    });
  };

  return (
    <div className="reservations-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <Calendar className="page-icon" style={{ color: '#FFFFFF' }} />
          <h1 className="page-title">REZERVĂRI</h1>
          <p className="page-subtitle">Rezervă-ți locul pentru cea mai tare experiență laser tag</p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="reservation-form-section">
        <div className="container">
          <div className="reservation-grid">
            {/* Form */}
            <Card className="reservation-form-card">
              <CardHeader>
                <CardTitle className="form-card-title">Formular de rezervare</CardTitle>
                <p className="form-card-description">Completează formularul și confirmă rezervarea prin WhatsApp sau Email</p>
              </CardHeader>
              <CardContent>
                <form className="reservation-form">
                  <div className="form-group">
                    <label htmlFor="package" className="form-label">Pachet dorit *</label>
                    <select
                      id="package"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      required
                      className="form-input"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="">Selectează un pachet...</option>
                      {mockData.pricing.map((pkg) => (
                        <option key={pkg.id} value={pkg.name}>
                          {pkg.name} - {pkg.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Nume complet *</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Introdu numele și prenumele tău"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="exemplu@email.ro"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Telefon *</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+40 XXX XXX XXX"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
  <label htmlFor="date" className="form-label">Data dorită * (dd/mm/yyyy)</label>
  <Input
    id="date"
    name="date"
    type="date"
    value={formData.date}
    onChange={handleChange}
    // Această linie blochează tastatura, forțând click-ul pe calendar
    onKeyDown={(e) => e.preventDefault()} 
    required
    className="form-input"
    // Setăm data minimă pe 16 Martie 2026, deoarece tot ce e înainte e blocat
    min="2026-03-16" 
  />
  {formData.date && (
    <small style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px', display: 'block' }}>
      Data selectată: {formatDateForDisplay(formData.date)}
    </small>
  )}
</div>

                    <div className="form-group">
                      <label htmlFor="time" className="form-label">Ora dorită *</label>
                      {formData.date ? (
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="form-input"
                          style={{ cursor: 'pointer' }}
                          disabled={loadingTimes}
                        >
                          <option value="">
                            {loadingTimes ? 'Se încarcă orele...' : 'Selectează ora...'}
                          </option>
                          {availableTimes.map((slot, idx) => (
                            <option 
                              key={idx} 
                              value={slot.time} 
                              disabled={!slot.available}
                              style={{
                                color: slot.available ? 'inherit' : '#ff0000',
                                fontWeight: slot.available ? 'normal' : 'bold'
                              }}
                            >
                              {slot.time} {!slot.available ? ' - OCUPAT' : ''}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          id="time"
                          name="time"
                          type="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="form-input"
                          disabled
                          placeholder="Selectează mai întâi data"
                        />
                      )}
                    </div>
                  </div>

                  <div className="form-group">
  <label htmlFor="people" className="form-label">Număr persoane *</label>
  <select
    id="people"
    name="people"
    value={formData.people}
    onChange={handleChange}
    required
    className="form-input" // Păstrăm clasa pentru design consecvent
    style={{ appearance: 'none' }} // Opțional, pentru a evita stilizarea default a browserului
  >
    <option value="" disabled>Selectează numărul de persoane</option>
    <option value="6">6 persoane</option>
    <option value="7">7 persoane</option>
    <option value="8">8 persoane</option>
    <option value="9">9 persoane</option>
    <option value="10">10 persoane</option>
    <option value="11">11 persoane</option>
    <option value="12">12 persoane</option>
  </select>
</div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Mesaj adițional</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Menționează orice detalii speciale..."
                      rows={4}
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-buttons">
                    <Button
                      type="button"
                      onClick={handleWhatsAppReservation}
                      className="btn-primary full-width"
                    >
                      <MessageCircle className="btn-icon" />
                      REZERVĂ PE WHATSAPP
                    </Button>
                    <Button
                      type="button"
                      onClick={handleEmailReservation}
                      className="btn-secondary full-width"
                    >
                      <Mail className="btn-icon" />
                      REZERVĂ PE EMAIL
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <Card className="contact-info-card">
                <CardHeader>
                  <CardTitle className="contact-card-title">Informații de contact</CardTitle>
                </CardHeader>
                <CardContent className="contact-info-content">
                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <div>
                      <p className="contact-label">Telefon</p>
                      <p className="contact-value">{mockData.contact.phone}</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <div>
                      <p className="contact-label">Email</p>
                      <p className="contact-value">{mockData.contact.email}</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <MapPin className="contact-icon" />
                    <div>
                      <p className="contact-label">Adresă</p>
                      <p className="contact-value">{mockData.contact.address}</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <Clock className="contact-icon" style={{ color: '#FFFFFF' }} />
                    <div>
                      <p className="contact-label">Program</p>
                      <p className="contact-value">
                        Luni-Vineri (10% reducere): {mockData.contact.schedule.weekdays}<br />
                        Sâmbătă-Duminică (tarif întreg): {mockData.contact.schedule.weekend}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="tips-card">
                <CardHeader>
                  <CardTitle className="tips-title">Sfaturi utile</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="tips-list">
                    <li className="tip-item">Rezervările se confirmă în ordinea primirii</li>
                    <li className="tip-item">Recomandam rezervare cu minim 48h înainte</li>
                    <li className="tip-item">Pentru grupuri mari, contactați-ne telefonic</li>
                    <li className="tip-item">Ajungeți cu 15 minute înainte pentru echipare</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservations;
