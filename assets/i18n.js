// Auto-Connect Teranga — module de traduction partagé (FR/EN).
// Utilisé par la page d'accueil et par chaque page véhicule individuelle.
(function(global){
  'use strict';

  var STORAGE_KEY = 'act_lang';

  // ---------- Textes d'interface statiques ----------
  var STRINGS = {
    fr: {
      'nav.trajets': 'Trajets & tarifs',
      'nav.vehicules': 'Véhicules',
      'nav.comment': 'Comment ça marche',
      'nav.reserver': 'Réserver',
      'nav.contact': 'Contact',
      'nav.call': 'Appeler',
      'nav.book_whatsapp': 'Réserver sur WhatsApp',
      'nav.menu_open': 'Ouvrir le menu',

      'hero.eyebrow': 'Transfert Dakar • Aéroport AIBD',
      'hero.title_html': 'Votre route vers l’aéroport,<br>réservée en <em>un message</em>.',
      'hero.sub': 'Auto‑Connect Teranga conduit particuliers, familles et professionnels entre Dakar et l’aéroport Blaise Diagne. Chauffeurs ponctuels, véhicules propres, suivi de vol — de jour comme de nuit.',
      'hero.cta_call': 'Appeler : 78 291 07 06',

      'stub.route_k': 'Trajet',
      'stub.avail_k': 'Disponibilité',
      'stub.book_k': 'Réservation',
      'stub.rate_k': 'Tarif',
      'stub.avail_v': '24h/24 · 7j/7',
      'stub.book_v': 'WhatsApp ou appel',
      'stub.rate_v': 'Annoncé avant départ',

      'why.eyebrow': 'Pourquoi Auto‑Connect Teranga',
      'why.title': 'La ponctualité d’un service pro, l’accueil de la Teranga.',
      'why.sub': 'Chaque réservation est confirmée par une personne, pas un formulaire automatique — vous savez toujours qui vous attend.',
      'why.1.title': 'Ponctualité',
      'why.1.text': 'Votre chauffeur arrive à l’heure convenue, vol surveillé pour les retards et avances.',
      'why.2.title': 'Véhicules soignés',
      'why.2.text': 'Climatisation, intérieur propre à chaque trajet, coffre adapté à vos valises.',
      'why.3.title': 'Contact humain',
      'why.3.text': 'Toute réservation se confirme par WhatsApp ou par téléphone, directement avec l’équipe.',
      'why.4.title': 'Accueil personnalisé',
      'why.4.text': 'Votre chauffeur vous attend en salle d’arrivée avec une pancarte à votre nom.',
      'why.5.title': 'Dakar & environs',
      'why.5.text': 'Prise en charge dans tous les quartiers de Dakar, hôtels et résidences.',
      'why.6.title': 'Jour & nuit',
      'why.6.text': 'Vol tôt le matin ou tard le soir : le service reste disponible à toute heure.',

      'teranga.word_html': 'Bienvenue,<br>en paix.',
      'teranga.title': 'La Teranga commence dès votre message.',
      'teranga.p1': 'Au Sénégal, la Teranga — l’hospitalité — se prouve par les gestes : un accueil chaleureux, une parole tenue, un souci sincère du confort de l’autre. C’est cet esprit qu’Auto‑Connect Teranga met dans chaque trajet.',
      'teranga.p2': 'Nous suivons votre vol, nous vous attendons à l’heure, et nous vous accompagnons jusqu’à destination — que vous rentriez chez vous ou que vous découvriez Dakar pour la première fois.',
      'teranga.cta': 'Voir les trajets & véhicules',

      'trajets.eyebrow': 'Trajets & véhicules',
      'trajets.title': 'Un véhicule pour chaque type de trajet.',
      'trajets.sub': 'Tarifs indicatifs — confirmés avec vous par WhatsApp avant chaque réservation.',

      'ticket.aircon': 'Climatisation',
      'ticket.passengers_max': 'passagers max.',
      'ticket.suitcases': 'valises',
      'ticket.unlimited': 'illim.',
      'ticket.note': 'Aller simple, AIBD ⇄ Dakar',
      'ticket.cta': 'Réserver cette offre',

      'ticket1.tag': 'Offre classique',
      'ticket1.title': 'Berline standard',
      'ticket1.desc': 'L’essentiel pour un trajet simple et confortable vers l’aéroport.',
      'ticket1.f2': 'Trajet assuré 24h/24',
      'ticket1.f3': 'Suivi de votre vol',

      'ticket2.tag': 'Offre confort',
      'ticket2.title': 'Berline haut de gamme',
      'ticket2.desc': 'Plus d’espace et de finitions pour voyager sereinement.',
      'ticket2.f2': 'Chargeur USB & eau offerte',
      'ticket2.f3': 'Chauffeur en tenue',

      'ticket3.tag': 'Offre groupe',
      'ticket3.title': 'Van confort',
      'ticket3.desc': 'Idéal pour familles, groupes ou bagages volumineux.',
      'ticket3.f2': 'Grand coffre / bagages volumineux',
      'ticket3.f3': 'Idéal groupes & familles',

      'comment.title': 'Trois étapes, un seul message.',
      'step1.title': 'Envoyez votre demande',
      'step1.text': 'Par WhatsApp ou par appel : date, heure, numéro de vol et nombre de passagers.',
      'step2.title': 'Confirmez la réservation',
      'step2.text': 'Nous validons ensemble le véhicule et le tarif, puis confirmons votre trajet.',
      'step3.title': 'Voyagez sereinement',
      'step3.text': 'Votre chauffeur vous attend à l’heure, pancarte à votre nom en main.',

      'avis.eyebrow': 'Avis clients',
      'avis.title': 'Ce que disent nos clients.',

      'reserver.eyebrow': 'Réservation',
      'reserver.title': 'Envoyer une demande de réservation',
      'reserver.desc': 'Remplissez le formulaire : il ouvre WhatsApp avec votre demande déjà rédigée, prête à envoyer.',
      'reserver.note': 'Aucun paiement n’est demandé sur cette page. La réservation est confirmée directement avec l’équipe, par message ou par appel.',

      'form.name_label': 'Nom complet',
      'form.name_placeholder': 'Votre nom',
      'form.phone_label': 'Téléphone / WhatsApp',
      'form.route_label': 'Trajet',
      'form.route_opt1': 'Aéroport AIBD → Dakar',
      'form.route_opt2': 'Dakar → Aéroport AIBD',
      'form.route_opt3': 'Aller-retour',
      'form.vehicle_label': 'Véhicule souhaité',
      'form.vehicle_opt1': 'Classique',
      'form.vehicle_opt2': 'Confort',
      'form.vehicle_opt3': 'Van confort (groupe)',
      'form.date_label': 'Date',
      'form.time_label': 'Heure',
      'form.flight_label': 'N° de vol (optionnel)',
      'form.pax_label': 'Nombre de passagers',
      'form.msg_label': 'Message (optionnel)',
      'form.msg_placeholder': 'Précisions utiles : adresse exacte, bagages, etc.',
      'form.submit': 'Envoyer la demande via WhatsApp',
      'form.name_key': 'Nom',
      'form.phone_key': 'Téléphone',
      'form.route_key': 'Trajet',
      'form.vehicle_key': 'Véhicule',
      'form.date_key': 'Date',
      'form.time_key': 'Heure',
      'form.flight_key': 'N° de vol',
      'form.pax_key': 'Passagers',
      'form.msg_key': 'Message',
      'form.greeting': 'Bonjour Auto-Connect Teranga, je souhaite réserver un transfert.',

      'payment.eyebrow': 'Paiement',
      'payment.title': 'Modes de paiement acceptés',
      'payment.desc': 'Le mode de paiement est confirmé avec vous au moment de la réservation.',
      'payment.cash': 'Espèces',

      'contact.eyebrow': 'Contact',
      'contact.title': 'Une question ? Écrivez-nous.',
      'contact.whatsapp_small': 'WhatsApp & appels',
      'contact.location': 'Dakar, Sénégal',
      'contact.location_small': 'Service basé à Dakar',
      'contact.email_small': 'Écrivez-nous par e-mail',

      'vehicules.eyebrow': 'Achat & location',
      'vehicules.title': 'Des véhicules à la vente et à la location.',
      'vehicules.sub': 'Un catalogue qui s’enrichit au fil de nos disponibilités — parcourez ce qui est proposé aujourd’hui.',
      'vehicules.catnote': 'Véhicules de notre parc auto, disponibles à la vente ou à la location.',
      'vehicules.search_placeholder': 'Rechercher une marque ou un modèle…',
      'vehicules.empty': 'Aucun véhicule ne correspond à ces critères. Essayez d’élargir votre recherche.',

      'price.toggle': 'Prix',
      'price.all': 'Tous les prix',
      'price.lt5': 'Moins de 5M',
      'price.5to10': '5M – 10M',
      'price.10to20': '10M – 20M',
      'price.gt20': 'Plus de 20M',

      'cat.all': 'Tous',
      'cat.sale': 'À vendre',
      'cat.rent': 'À louer',

      'brand.all_name': 'Toutes marques',
      'brand.count_singular': 'véhicule',
      'brand.count_plural': 'véhicules',

      'footer.rights': 'Tous droits réservés.',
      'wa.aria_label': 'Écrire sur WhatsApp',
      'wa.float_label': 'WhatsApp',

      'lightbox.close': 'Fermer',
      'lightbox.prev': 'Photo précédente',
      'lightbox.next': 'Photo suivante',

      'vp.back': '‹ Retour aux véhicules',
      'vp.contact': 'Contacter',
      'vp.no_price': 'Prix sur demande',
      'vp.loading': 'Chargement des photos…',
      'vp.gallery_prev': 'Précédent',
      'vp.gallery_next': 'Suivant',
      'vp.seats_word': 'places',

      'wa.hero_cta_msg': 'Bonjour Auto-Connect Teranga, je souhaite réserver un transfert.',
      'wa.ticket1_msg': 'Bonjour, je souhaite réserver l’offre Classique.',
      'wa.ticket2_msg': 'Bonjour, je souhaite réserver l’offre Confort.',
      'wa.ticket3_msg': 'Bonjour, je souhaite réserver le Van confort.',
      'wa.card_msg': 'Bonjour Auto-Connect Teranga, le véhicule {name} ({mode}) m’intéresse.'
    },
    en: {
      'nav.trajets': 'Routes & fares',
      'nav.vehicules': 'Vehicles',
      'nav.comment': 'How it works',
      'nav.reserver': 'Book',
      'nav.contact': 'Contact',
      'nav.call': 'Call',
      'nav.book_whatsapp': 'Book on WhatsApp',
      'nav.menu_open': 'Open menu',

      'hero.eyebrow': 'Dakar • AIBD Airport transfer',
      'hero.title_html': 'Your ride to the airport,<br>booked in <em>one message</em>.',
      'hero.sub': 'Auto‑Connect Teranga drives individuals, families and professionals between Dakar and Blaise Diagne Airport. Punctual drivers, clean vehicles, flight tracking — day and night.',
      'hero.cta_call': 'Call: 78 291 07 06',

      'stub.route_k': 'Route',
      'stub.avail_k': 'Availability',
      'stub.book_k': 'Booking',
      'stub.rate_k': 'Rate',
      'stub.avail_v': '24/7',
      'stub.book_v': 'WhatsApp or call',
      'stub.rate_v': 'Announced before departure',

      'why.eyebrow': 'Why Auto‑Connect Teranga',
      'why.title': 'The punctuality of a pro service, the warmth of Teranga hospitality.',
      'why.sub': 'Every booking is confirmed by a real person, not an automatic form — you always know who’s waiting for you.',
      'why.1.title': 'Punctuality',
      'why.1.text': 'Your driver arrives at the agreed time, with your flight tracked for delays or early landings.',
      'why.2.title': 'Well-kept vehicles',
      'why.2.text': 'Air conditioning, a clean interior on every trip, and a trunk sized for your luggage.',
      'why.3.title': 'Human contact',
      'why.3.text': 'Every booking is confirmed by WhatsApp or phone, directly with the team.',
      'why.4.title': 'Personal welcome',
      'why.4.text': 'Your driver waits for you in the arrivals hall with a sign bearing your name.',
      'why.5.title': 'Dakar & surroundings',
      'why.5.text': 'Pickup available in every district of Dakar, at hotels and residences.',
      'why.6.title': 'Day & night',
      'why.6.text': 'Early morning or late-night flight: the service stays available around the clock.',

      'teranga.word_html': 'Welcome,<br>in peace.',
      'teranga.title': 'Teranga begins with your very first message.',
      'teranga.p1': 'In Senegal, Teranga — hospitality — is proven through actions: a warm welcome, a promise kept, genuine care for the other person’s comfort. That is the spirit Auto‑Connect Teranga brings to every trip.',
      'teranga.p2': 'We track your flight, we’re there on time, and we stay with you until you reach your destination — whether you’re coming home or discovering Dakar for the first time.',
      'teranga.cta': 'See routes & vehicles',

      'trajets.eyebrow': 'Routes & vehicles',
      'trajets.title': 'A vehicle for every kind of trip.',
      'trajets.sub': 'Indicative rates — confirmed with you by WhatsApp before every booking.',

      'ticket.aircon': 'Air conditioning',
      'ticket.passengers_max': 'passengers max.',
      'ticket.suitcases': 'bags',
      'ticket.unlimited': 'unlim.',
      'ticket.note': 'One-way, AIBD ⇄ Dakar',
      'ticket.cta': 'Book this offer',

      'ticket1.tag': 'Classic offer',
      'ticket1.title': 'Standard sedan',
      'ticket1.desc': 'The essentials for a simple, comfortable ride to the airport.',
      'ticket1.f2': '24/7 guaranteed service',
      'ticket1.f3': 'Flight tracking',

      'ticket2.tag': 'Comfort offer',
      'ticket2.title': 'Premium sedan',
      'ticket2.desc': 'More space and finish for a relaxed ride.',
      'ticket2.f2': 'USB charger & complimentary water',
      'ticket2.f3': 'Uniformed driver',

      'ticket3.tag': 'Group offer',
      'ticket3.title': 'Comfort van',
      'ticket3.desc': 'Ideal for families, groups, or bulky luggage.',
      'ticket3.f2': 'Large trunk / bulky luggage',
      'ticket3.f3': 'Ideal for groups & families',

      'comment.title': 'Three steps, one message.',
      'step1.title': 'Send your request',
      'step1.text': 'By WhatsApp or phone: date, time, flight number and number of passengers.',
      'step2.title': 'Confirm the booking',
      'step2.text': 'We agree together on the vehicle and rate, then confirm your trip.',
      'step3.title': 'Travel with peace of mind',
      'step3.text': 'Your driver is waiting on time, sign with your name in hand.',

      'avis.eyebrow': 'Customer reviews',
      'avis.title': 'What our clients say.',

      'reserver.eyebrow': 'Booking',
      'reserver.title': 'Send a booking request',
      'reserver.desc': 'Fill in the form: it opens WhatsApp with your request already written, ready to send.',
      'reserver.note': 'No payment is requested on this page. The booking is confirmed directly with the team, by message or by call.',

      'form.name_label': 'Full name',
      'form.name_placeholder': 'Your name',
      'form.phone_label': 'Phone / WhatsApp',
      'form.route_label': 'Route',
      'form.route_opt1': 'AIBD Airport → Dakar',
      'form.route_opt2': 'Dakar → AIBD Airport',
      'form.route_opt3': 'Round trip',
      'form.vehicle_label': 'Preferred vehicle',
      'form.vehicle_opt1': 'Classic',
      'form.vehicle_opt2': 'Comfort',
      'form.vehicle_opt3': 'Comfort van (group)',
      'form.date_label': 'Date',
      'form.time_label': 'Time',
      'form.flight_label': 'Flight number (optional)',
      'form.pax_label': 'Number of passengers',
      'form.msg_label': 'Message (optional)',
      'form.msg_placeholder': 'Useful details: exact address, luggage, etc.',
      'form.submit': 'Send request via WhatsApp',
      'form.name_key': 'Name',
      'form.phone_key': 'Phone',
      'form.route_key': 'Route',
      'form.vehicle_key': 'Vehicle',
      'form.date_key': 'Date',
      'form.time_key': 'Time',
      'form.flight_key': 'Flight no.',
      'form.pax_key': 'Passengers',
      'form.msg_key': 'Message',
      'form.greeting': 'Hello Auto-Connect Teranga, I would like to book a transfer.',

      'payment.eyebrow': 'Payment',
      'payment.title': 'Accepted payment methods',
      'payment.desc': 'The payment method is confirmed with you at the time of booking.',
      'payment.cash': 'Cash',

      'contact.eyebrow': 'Contact',
      'contact.title': 'Have a question? Write to us.',
      'contact.whatsapp_small': 'WhatsApp & calls',
      'contact.location': 'Dakar, Senegal',
      'contact.location_small': 'Service based in Dakar',
      'contact.email_small': 'Email us',

      'vehicules.eyebrow': 'Sale & rental',
      'vehicules.title': 'Vehicles for sale and for rent.',
      'vehicules.sub': 'A catalogue that grows as vehicles become available — browse what’s on offer today.',
      'vehicules.catnote': 'Vehicles from our fleet, available for sale or for rent.',
      'vehicules.search_placeholder': 'Search a brand or model…',
      'vehicules.empty': 'No vehicle matches these criteria. Try widening your search.',

      'price.toggle': 'Price',
      'price.all': 'All prices',
      'price.lt5': 'Under 5M',
      'price.5to10': '5M – 10M',
      'price.10to20': '10M – 20M',
      'price.gt20': 'Over 20M',

      'cat.all': 'All',
      'cat.sale': 'For sale',
      'cat.rent': 'For rent',

      'brand.all_name': 'All brands',
      'brand.count_singular': 'vehicle',
      'brand.count_plural': 'vehicles',

      'footer.rights': 'All rights reserved.',
      'wa.aria_label': 'Message us on WhatsApp',
      'wa.float_label': 'WhatsApp',

      'lightbox.close': 'Close',
      'lightbox.prev': 'Previous photo',
      'lightbox.next': 'Next photo',

      'vp.back': '‹ Back to vehicles',
      'vp.contact': 'Contact',
      'vp.no_price': 'Price on request',
      'vp.loading': 'Loading photos…',
      'vp.gallery_prev': 'Previous',
      'vp.gallery_next': 'Next',
      'vp.seats_word': 'seats',

      'wa.hero_cta_msg': 'Hello Auto-Connect Teranga, I would like to book a transfer.',
      'wa.ticket1_msg': 'Hello, I’d like to book the Classic offer.',
      'wa.ticket2_msg': 'Hello, I’d like to book the Comfort offer.',
      'wa.ticket3_msg': 'Hello, I’d like to book the Comfort van.',
      'wa.card_msg': 'Hello Auto-Connect Teranga, I’m interested in the {name} ({mode}).'
    }
  };

  // ---------- Champs dynamiques du catalogue véhicules ----------
  var GEARBOX = { 'Manuelle': 'Manual', 'Automatique': 'Automatic' };
  var FUEL = { 'Essence': 'Petrol', 'Essence (Hybride)': 'Petrol (Hybrid)', 'Diesel': 'Diesel' };
  var COLOR = {
    'Gris foncé': 'Dark grey', 'Bordeaux': 'Burgundy', 'Noire': 'Black', 'Grise': 'Grey',
    'Gris (toit blanc)': 'Grey (white roof)', 'Blanche': 'White', 'Rouge': 'Red', 'Gris': 'Grey',
    'Bleu foncé': 'Dark blue', 'Bleu': 'Blue', 'Noir': 'Black', 'Blanc': 'White', 'Beige': 'Beige'
  };
  var MODE_LABEL = {
    fr: { vente: 'À vendre', location: 'À louer' },
    en: { vente: 'For sale', location: 'For rent' }
  };
  var MODE_LABEL_LOWER = {
    fr: { vente: 'à vendre', location: 'à louer' },
    en: { vente: 'for sale', location: 'for rent' }
  };

  // Fragments de la colonne "note" (specs libres saisies par le vendeur),
  // découpés sur '·'. Tout fragment absent de ce dictionnaire (kilométrages,
  // sigles) est simplement laissé tel quel en anglais.
  var FEATURES = {
    '3.0L 6cyl 249ch MHEV': '3.0L 6cyl 249hp MHEV',
    '4 cylindres': '4 cylinders',
    '5 places': '5 seats',
    '8 rapports AWD': '8-speed AWD',
    'Alerte angle mort': 'Blind spot warning',
    'Alerte de sortie de voie': 'Lane departure warning',
    'Automatique': 'Automatic',
    'Caméra 360°': '360° camera',
    'Caméra de recul': 'Rearview camera',
    'Caméra de recul avec radars': 'Rearview camera with sensors',
    'Ceintures électriques': 'Power seatbelts',
    'Climatisation automatique': 'Automatic climate control',
    'Climatisation bizone': 'Dual-zone climate control',
    'Climatisé': 'Air conditioned',
    'Coffre automatique': 'Power tailgate',
    'Commandes au volant': 'Steering wheel controls',
    'Cuir': 'Leather',
    'Déjà dédouané': 'Already customs-cleared',
    'Démarrage sans clé': 'Keyless start',
    'Full option': 'Fully loaded',
    'Full options': 'Fully loaded',
    'Grand écran': 'Large screen',
    'Grand écran tactile': 'Large touchscreen',
    'Hybride': 'Hybrid',
    'Intérieur confortable': 'Comfortable interior',
    'Intérieur cuir': 'Leather interior',
    'Intérieur cuir beige': 'Beige leather interior',
    'Jantes aluminium': 'Alloy wheels',
    'Jantes noires': 'Black rims',
    'Location avec chauffeur': 'Rental with driver',
    'Location min. 48h': 'Minimum rental: 48h',
    'Mode Eco': 'Eco mode',
    'Mode Eco/Power': 'Eco/Power mode',
    'Mode Eco/Sport': 'Eco/Sport mode',
    'Modes de conduite': 'Drive modes',
    'Moteur 3.2L': '3.2L engine',
    'Moteur 6 cylindres': '6-cylinder engine',
    'Mutation récente (5 mois)': 'Recently transferred (5 months)',
    'Ouverture et fermeture électrique': 'Power open/close',
    'Phares LED': 'LED headlights',
    'Pivi Pro 13,1"': 'Pivi Pro 13.1"',
    'Radars avant/arrière': 'Front/rear parking sensors',
    'Radars de stationnement': 'Parking sensors',
    'Régulateur de vitesse': 'Cruise control',
    'Rétroviseurs rabattables': 'Folding mirrors',
    'Rétroviseurs électriques': 'Power mirrors',
    'Sièges chauffants et ventilés': 'Heated and ventilated seats',
    'Sièges chauffants électriques': 'Heated power seats',
    'Sièges chauffants/ventilés': 'Heated/ventilated seats',
    'Sièges cuir': 'Leather seats',
    'Sièges électriques': 'Power seats',
    'Sièges électriques chauffants': 'Heated power seats',
    'Toit ouvrant': 'Sunroof',
    'Toit panoramique': 'Panoramic roof',
    'Venant de Corée': 'Imported from Korea',
    'Venant des USA': 'Imported from the USA',
    'Version Chine': 'China version',
    'Version Corée': 'Korea version',
    'Volant multifonctions': 'Multifunction steering wheel',
    'Véhicule venant': 'Imported vehicle',
    'Écran tactile': 'Touchscreen',
    'Écran tactile central': 'Central touchscreen'
  };

  function getLang(){
    try {
      var stored = global.localStorage.getItem(STORAGE_KEY);
      if(stored === 'fr' || stored === 'en') return stored;
    } catch(e){}
    try {
      if(global.navigator && /^en/i.test(global.navigator.language || '')) return 'en';
    } catch(e){}
    return 'fr';
  }

  var currentLang = getLang();
  var listeners = [];

  function setLang(lang){
    if(lang !== 'fr' && lang !== 'en') return;
    currentLang = lang;
    try { global.localStorage.setItem(STORAGE_KEY, lang); } catch(e){}
    document.documentElement.lang = lang;
    applyStatic(document);
    listeners.forEach(function(fn){ try { fn(lang); } catch(e){} });
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function t(key){
    var table = STRINGS[currentLang] || STRINGS.fr;
    if(Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    return (STRINGS.fr[key] !== undefined) ? STRINGS.fr[key] : key;
  }

  function translateGearbox(v){ return currentLang === 'en' ? (GEARBOX[v] || v) : v; }
  function translateFuel(v){ return currentLang === 'en' ? (FUEL[v] || v) : v; }
  function translateColor(v){ return currentLang === 'en' ? (COLOR[v] || v) : v; }
  function modeLabel(mode){ return (MODE_LABEL[currentLang] || MODE_LABEL.fr)[mode] || mode; }
  function modeLabelLower(mode){ return (MODE_LABEL_LOWER[currentLang] || MODE_LABEL_LOWER.fr)[mode] || mode; }

  function translateNote(note){
    if(!note) return note;
    if(currentLang !== 'en') return note;
    return note.split('·').map(function(part){
      var trimmed = part.trim();
      if(!trimmed) return trimmed;
      return FEATURES[trimmed] || trimmed;
    }).join(' · ');
  }

  function cardMsg(name, mode){
    return t('wa.card_msg').replace('{name}', name).replace('{mode}', modeLabelLower(mode));
  }

  function applyStatic(root){
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    root.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key);
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      var key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key));
    });
    root.querySelectorAll('[data-i18n-aria]').forEach(function(el){
      var key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key));
    });
    root.querySelectorAll('[data-wa-key]').forEach(function(el){
      var key = el.getAttribute('data-wa-key');
      var number = el.getAttribute('data-wa-number') || '221782910706';
      el.setAttribute('href', 'https://wa.me/' + number + '?text=' + encodeURIComponent(t(key)));
    });
  }

  function onChange(fn){ listeners.push(fn); }

  function initLangToggle(){
    document.querySelectorAll('.lang-switch').forEach(function(group){
      group.querySelectorAll('.lang-btn').forEach(function(btn){
        var lang = btn.getAttribute('data-lang');
        btn.classList.toggle('active', lang === currentLang);
        btn.setAttribute('aria-pressed', lang === currentLang ? 'true' : 'false');
        btn.addEventListener('click', function(){
          if(lang !== currentLang) setLang(lang);
        });
      });
    });
  }

  document.documentElement.lang = currentLang;

  global.I18N = {
    getLang: function(){ return currentLang; },
    setLang: setLang,
    t: t,
    translateGearbox: translateGearbox,
    translateFuel: translateFuel,
    translateColor: translateColor,
    translateNote: translateNote,
    modeLabel: modeLabel,
    modeLabelLower: modeLabelLower,
    cardMsg: cardMsg,
    applyStatic: applyStatic,
    onChange: onChange,
    initLangToggle: initLangToggle
  };
})(window);
