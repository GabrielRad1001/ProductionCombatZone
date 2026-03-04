// Mock data pentru LaserTag Moisei

export const mockData = {
  hero: {
    title: "Combat Zone Moisei",
    subtitle: "Experimentează adrenalina jocului futuristic de laser tag",
    description: "Alătură-te unei aventuri captivante în arena noastră exterioară. Jocuri intense, echipament de ultimă generație și distracție garantată pentru toate vârstele."
  },
  
  about: {
    history: "Combat Zone Moisei a fost înființată în 2026 cu scopul de a oferi o experiență unică de divertisment în regiunea Maramureșului istoric. În acest an, am devenit destinația preferată pentru petreceri, team building-uri și sesiuni de joc pline de adrenalină.",
    mission: "Misiunea noastră este să oferim fiecărui jucător o experiență de neuitat, combinând tehnologia modernă cu atmosfera captivantă a jocului de laser tag. Creăm momente de bucurie și competiție sănătoasă într-un mediu sigur și profesional.",
    team: [
      { name: "Romeo Chiriac", role: "Fondator & Manager", description: "Pasionat de tehnologie și gaming" },
      { name: "Raluca Chiriac", role: "Co-Fondator & Organizator", description: "Expertă în organizarea evenimentelor" },
      { name: "Ioan Ivașcu", role: "Instructor & Administrator", description: "Ghidul tău în arena futuristă" },
      { name: "Maria Ivașcu", role: "Instructor & Hostess", description: "Ghidul tău în arena futuristă" }
    ],
    facilities: [
      "Arenă exterioară de 2500mp cu obstacole strategice",
      "Echipament profesional cu senzori de ultimă generație",
      "Sistem de scor în timp real",
      "Zone de odihnă climatizate",
      "Sistem audio surround pentru atmosferă intensă",
      "Iluminare și efecte speciale",
      "Vestiare moderne și zonă interioară de luat masa"
    ]
  },
  
  rules: [
    {
      title: "Echipament și Pregătire",
      rules: [
        "Purtați echipamentul de protecție furnizat pe toată durata jocului",
        "Verificați că vesta și arma sunt corect poziționate înainte de start",
        "Ascultați cu atenție briefing-ul instructorului",
        "Păstrați echipamentul în stare bună - nu-l aruncați sau loviți"
      ]
    },
    {
      title: "Conduită în Arenă",
      rules: [
        "Nu alergați - deplasarea se face în ritm alert dar controlat",
        "Nu împingeți și nu atingeți fizic adversarii",
        "Nu acoperiți senzorii vestei cu mâinile sau alte obiecte",
        "Respectați limitele marcate ale arenei",
        "În caz de urgență, ridicați ambele mâini și strigați 'STOP'"
      ]
    },
    {
      title: "Regulile Jocului",
      rules: [
        "Scopul este să acumulați cât mai multe puncte lovind senzorii adversarilor",
        "Când sunteți lovit, vesta se dezactivează timp de 5 secunde",
        "Nu blocați pasajele sau intrările strategice",
        "Jucați fair-play - competiția este distracția, nu conflictul",
        "Respectați semnalele sonore de start și final ale jocului"
      ]
    },
    {
      title: "Restricții și Siguranță",
      rules: [
        "Vârsta minimă: 8 ani (cu supraveghere adult pentru 8-12 ani)",
        "Nu este permis accesul cu alimente, băuturi sau obiecte personale în arenă",
        "Nu sunt permise telefoane mobile în timpul jocului",
        "Persoanele cu probleme medicale (cardiace, epilepsie) trebuie să anunțe personalul",
        "Îmbrăcăminte recomandată: haine comode și încălțăminte sport"
      ]
    }
  ],
  
  pricing: [
    {
      id: 1,
      name: "Pachet simplu",
      price: "125 RON/persoană",
      duration: "",
      features: [
        "Acces la arenă pentru 6-12 persoane",
        "Echipament complet inclus",
        "Organizare pe echipe",
        "Rezerve de apă la discreție",
        "Scor individual afișat",
        "3 sesiuni de joc (3 runde/30 minute)"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Pachet full packed",
      price: "175 RON/persoană",
      duration: "",
      features: [
        "Acces pentru 6-12 persoane",
        "Echipament complet inclus",
        "Organizare pe echipe",
        "O rezervă de pizza sau crispy pentru fiecare",
        "Apă sau sucuri la discreție",
        "3 sesiuni de joc (3 runde/30 minute)"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Evenimente Private",
      price: "Ofertă la cerere",
      features: [
        "Arenă exclusivă pentru grupul tău",
        "Până la 12 persoane",
        "Instructor dedicat",
        "Turneu personalizat",
        "Sesiuni de joc, cât te țin picioarele",
        "Zonă privată de odihnă",
        "Pachete refresh incluse"
      ],
      popular: false
    }
  ],
  
  gallery: [
    {
      id: 1,
      url: "https://placehold.co/280x187",
      title: "Jucători în acțiune",
      description: "Echipament profesional de laser tag"
    },
    {
      id: 2,
      url: "https://placehold.co/280x187",
      title: "Arena noastră",
      description: "Spațiu modern și bine echipat"
    },
    {
      id: 3,
      url: "https://placehold.co/280x187",
      title: "Acțiune de echipă",
      description: "Distracție garantată pentru toate vârstele"
    },
    {
      id: 4,
      url: "https://placehold.co/280x187",
      title: "Echipament high-tech",
      description: "Tehnologie de ultimă generație"
    },
    {
      id: 5,
      url: "https://placehold.co/280x187",
      title: "Atmosferă neon",
      description: "Experiență futuristică unică"
    }
  ],
  
  testimonials: [
    {
      id: 1,
      name: "Gabriel S.R.",
      rating: 5,
      text: "Experiență extraordinară! Arena este modernă, personalul prietenos și jocul extrem de captivant. Am venit cu prietenii și ne-am distrat de minune. Cu siguranță vom reveni!",
      date: "10 aprilie 2026"
    },
    {
      id: 2,
      name: "Ana-Maria Gheorghe",
      rating: 5,
      text: "Am organizat aici petrecerea de ziua fiului meu și a fost perfect! Copiii s-au distrat enorm, instructorii au fost foarte atenți și profesioniști. Recomand cu încredere!",
      date: "01 ianuarie 2026"
    },
    {
      id: 3,
      name: "Cristian Moldovan",
      rating: 5,
      text: "Cel mai tare team building pe care l-am avut vreodată! Echipamentul este top, arena e bine gândită cu multe ascunzișuri. Atmosphere cu lumini neon e super cool. 10/10!",
      date: "01 ianuarie 2026"
    }
  ],
  
  contact: {
    phone: "+40 765 351 019",
    email: "contact@combatzonemoisei.ro",
    whatsapp: "+40 765 351 019",
    address: "Str. Izvorul Dragoș nr. 671E, Moisei, Maramureș",
    schedule: {
      weekdays: "10:00 - 22:00",
      weekend: "10:00 - 22:00"
    },
    socialMedia: {
      facebook: "https://www.facebook.com/combat.zone.moisei",
      instagram: "https://www.instagram.com/combat.zone.moisei/",
      tiktok: "https://www.tiktok.com/@combat_zone_moisei"
    }
  }
};
