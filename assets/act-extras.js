// Auto-Connect Teranga — aides partagées (accueil, fiches véhicules) :
// statut (disponible / réservé / vendu), badges « Nouveau » et « À la une »,
// prix indicatif en euros, tri des annonces et compteurs de visites / clics WhatsApp.
(function(global){
  'use strict';

  // Parité fixe FCFA / euro (zone CFA) : 1 € = 655,957 FCFA.
  var EUR_RATE = 655.957;

  function lang(){
    return (global.I18N && global.I18N.getLang && global.I18N.getLang()) || 'fr';
  }

  var TXT = {
    fr: { reserve: 'Réservé', vendu: 'Vendu', loue: 'Loué', nouveau: 'Nouveau', une: 'À la une', indispo: 'Indisponible' },
    en: { reserve: 'Reserved', vendu: 'Sold', loue: 'Rented', nouveau: 'New', une: 'Featured', indispo: 'Unavailable' }
  };
  function tx(key){ return (TXT[lang()] || TXT.fr)[key]; }

  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }

  // ---------- statut ----------
  function status(v){
    return (v && (v.status === 'reserve' || v.status === 'vendu')) ? v.status : 'disponible';
  }
  function isUnavailable(v){ return status(v) === 'vendu'; }
  function statusLabel(v){
    var s = status(v);
    if(s === 'reserve') return tx('reserve');
    if(s === 'vendu') return v.mode === 'location' ? tx('loue') : tx('vendu');
    return '';
  }

  // ---------- nouveau / à la une ----------
  function isNew(v){ return !!(v && v.newUntil && Number(v.newUntil) > Date.now()); }
  function isFeatured(v){ return !!(v && v.featured === true); }

  function flagsHtml(v){
    var out = '';
    var label = statusLabel(v);
    if(label) out += '<span class="act-flag act-flag-' + status(v) + '">' + esc(label) + '</span>';
    if(isFeatured(v) && !isUnavailable(v)) out += '<span class="act-flag act-flag-une">★ ' + esc(tx('une')) + '</span>';
    if(isNew(v) && !isUnavailable(v)) out += '<span class="act-flag act-flag-new">' + esc(tx('nouveau')) + '</span>';
    return out;
  }

  // ---------- prix en euros ----------
  function fcfaAmount(v){
    if(!v || !v.price) return null;
    var n = parseFloat(String(v.price).replace(/\s/g, '').replace(',', '.'));
    if(isNaN(n)) return null;
    var u = String(v.unit || '').toLowerCase();
    if(/^m\s*fcfa|million/.test(u)) return n * 1e6;
    if(/fcfa|cfa|xof/.test(u)) return n;
    return null;
  }
  function eurText(v){
    var amount = fcfaAmount(v);
    if(amount === null || amount <= 0) return '';
    var eur = amount / EUR_RATE;
    eur = eur >= 1000 ? Math.round(eur / 50) * 50 : Math.round(eur);
    var u = String(v.unit || '');
    var suffix = u.indexOf('/') !== -1 ? ' ' + u.slice(u.indexOf('/')).trim() : '';
    if(lang() === 'en') return '≈ €' + eur.toLocaleString('en-US') + suffix;
    return '≈ ' + eur.toLocaleString('fr-FR') + ' €' + suffix;
  }

  // ---------- tri : à la une, disponibles, réservés, vendus ; récents d'abord ----------
  function ts(v){
    var c = v && v.createdAt;
    if(c && typeof c.toMillis === 'function') return c.toMillis();
    if(typeof c === 'number') return c;
    return 0;
  }
  function rank(v){
    var s = status(v);
    if(s === 'vendu') return 3;
    if(s === 'reserve') return 2;
    return isFeatured(v) ? 0 : 1;
  }
  function sortVehicles(list){
    return list.map(function(v, i){ return { v: v, i: i }; }).sort(function(a, b){
      var d = rank(a.v) - rank(b.v);
      if(d) return d;
      d = ts(b.v) - ts(a.v);
      return d || (a.i - b.i);
    }).map(function(x){ return x.v; });
  }

  // ---------- compteurs (visites, clics WhatsApp) ----------
  function track(slug, field){
    if(!slug) return;
    try { if(global.localStorage.getItem('act_admin') === '1') return; } catch(e){}
    if(field === 'views'){
      try {
        var k = 'act_v_' + slug;
        if(global.sessionStorage.getItem(k)) return;
        global.sessionStorage.setItem(k, '1');
      } catch(e){}
    }
    function go(){
      try {
        var FB = global.ACT_FB;
        var o = {}; o[field] = FB.increment(1);
        FB.setDoc(FB.doc(FB.db, 'stats', slug), o, { merge: true }).catch(function(){});
      } catch(e){}
    }
    if(global.ACT_FB) go();
    else global.addEventListener('act-firebase-ready', go, { once: true });
  }

  // ---------- style ----------
  var css = '' +
    '.act-flags{position:absolute; top:.8rem; right:.8rem; display:flex; flex-direction:column; align-items:flex-end; gap:.35rem; z-index:2; pointer-events:none;}' +
    '.vp-flags{display:flex; flex-wrap:wrap; gap:.4rem; margin:.5rem 0 0;}' +
    '.vp-flags:empty{display:none;}' +
    '.act-flag{font-family:var(--font-mono,monospace); font-size:.64rem; letter-spacing:.08em; text-transform:uppercase; font-weight:700; padding:.35em .7em; border-radius:999px; line-height:1.2; white-space:nowrap;}' +
    '.act-flag-new{background:#e8f4ee; color:#14513f;}' +
    '.act-flag-une{background:#1b1f24; color:#e7ac46; border:1px solid #e7ac46;}' +
    '.act-flag-reserve{background:#c98b24; color:#1a1204;}' +
    '.act-flag-vendu{background:#b3453d; color:#fff;}' +
    '.vcard.is-sold .vgallery-track img, .vcard.is-sold .vcard-art svg{filter:grayscale(1) brightness(.7);}' +
    '.vcard.is-sold .vcard-price{opacity:.55;}' +
    '.act-eur{display:block; font-family:var(--font-body,inherit); font-size:.74rem; font-weight:500; color:var(--muted-2,#9aa7b4); letter-spacing:.02em; margin-top:.15rem;}' +
    '.vp-price .act-eur{font-size:.85rem;}' +
    '.vp-contact-off{opacity:.55; cursor:not-allowed;}';
  try {
    var st = document.createElement('style');
    st.setAttribute('data-act-extras', '');
    st.textContent = css;
    document.head.appendChild(st);
  } catch(e){}

  global.ACT_EXTRAS = {
    EUR_RATE: EUR_RATE, esc: esc, status: status, isUnavailable: isUnavailable, statusLabel: statusLabel,
    isNew: isNew, isFeatured: isFeatured, flagsHtml: flagsHtml, eurText: eurText,
    sortVehicles: sortVehicles, track: track, tx: tx
  };
})(window);
