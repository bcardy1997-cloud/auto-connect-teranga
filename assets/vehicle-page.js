// Auto-Connect Teranga — script partagé des pages véhicules individuelles.
// Repose sur les mêmes classes CSS que la page principale (assets/site.css).

var WA_NUMBERS = ['221782910706', '221784294954'];

function openWhatsApp(number, text){
  var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
  var a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ---------- lightbox ----------
var lightbox, lightboxImg, lbPhotos = [], lbIndex = 0;

function updateLightboxImg(){
  lightboxImg.src = lbPhotos[lbIndex];
  lightboxImg.alt = 'Photo ' + (lbIndex + 1) + ' sur ' + lbPhotos.length;
}
function openLightbox(photos, index){
  lbPhotos = photos;
  lbIndex = index || 0;
  updateLightboxImg();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.hidden = true;
  document.body.style.overflow = '';
}
function lbStep(dir){
  if(!lbPhotos.length) return;
  lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length;
  updateLightboxImg();
}

function initLightbox(){
  lightbox = document.getElementById('lightbox');
  lightboxImg = document.getElementById('lightboxImg');
  if(!lightbox) return;
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', function(){ lbStep(-1); });
  document.getElementById('lightboxNext').addEventListener('click', function(){ lbStep(1); });
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function(e){
    if(lightbox.hidden) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') lbStep(-1);
    if(e.key === 'ArrowRight') lbStep(1);
  });
}

// ---------- gallery ----------
var vpGallery, vpThumbs, vpIndex = 0;

function vpGoTo(i, count){
  if(!count) return;
  vpIndex = (i + count) % count;
  var track = vpGallery.querySelector('.vgallery-track');
  if(track) track.scrollTo({ left: track.clientWidth * vpIndex, behavior:'smooth' });
  vpThumbs.querySelectorAll('.vp-thumb').forEach(function(t, ti){ t.classList.toggle('active', ti === vpIndex); });
  var dotEls = vpGallery.querySelectorAll('.vgallery-dots span');
  dotEls.forEach(function(d, i2){ d.classList.toggle('active', i2 === vpIndex); });
}

function renderVehicleGallery(v){
  var photoCount = (v.photos && v.photos.length) ? v.photos.length : 0;
  var videoList = (v.videos && v.videos.length) ? v.videos : (v.video ? [v.video] : []);
  var slideCount = photoCount + videoList.length;
  vpIndex = 0;

  if(!slideCount){
    vpThumbs.innerHTML = '';
    return;
  }

  var imgs = photoCount ? v.photos.map(function(src, pi){
    return '<img src="' + src + '" alt="' + v.name + ' — photo ' + (pi + 1) + '" data-idx="' + pi + '" loading="lazy">';
  }).join('') : '';
  var videoSlides = videoList.map(function(src){
    return '<div class="vvideo-wrap">' +
      '<video src="' + src + '" muted preload="metadata" playsinline controls disablepictureinpicture disableremoteplayback oncontextmenu="return false" aria-label="' + v.name + ' — vidéo"></video>' +
    '</div>';
  }).join('');
  var dots = '';
  for(var di = 0; di < slideCount; di++){ dots += '<span class="' + (di === 0 ? 'active' : '') + '"></span>'; }
  vpGallery.innerHTML =
    '<div class="vgallery-track">' + imgs + videoSlides + '</div>' +
    (slideCount > 1 ? '<button type="button" class="vgallery-btn prev" aria-label="Précédent">&#8249;</button>' +
    '<button type="button" class="vgallery-btn next" aria-label="Suivant">&#8250;</button>' +
    '<div class="vgallery-dots">' + dots + '</div>' : '');

  var track = vpGallery.querySelector('.vgallery-track');
  var prev = vpGallery.querySelector('.vgallery-btn.prev');
  var next = vpGallery.querySelector('.vgallery-btn.next');
  if(prev) prev.addEventListener('click', function(){ vpGoTo(vpIndex - 1, slideCount); });
  if(next) next.addEventListener('click', function(){ vpGoTo(vpIndex + 1, slideCount); });
  var scrollTimer;
  track.addEventListener('scroll', function(){
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function(){
      var idx = Math.round(track.scrollLeft / track.clientWidth);
      vpGoTo(idx, slideCount);
    }, 80);
  });
  track.addEventListener('click', function(e){
    var img = e.target.closest('img');
    if(!img || !v.photos || !v.photos.length) return;
    openLightbox(v.photos, parseInt(img.getAttribute('data-idx'), 10) || 0);
  });

  vpThumbs.innerHTML = '';
  for(var si = 0; si < slideCount; si++){
    var el;
    if(si < photoCount){
      el = document.createElement('img');
      el.className = 'vp-thumb' + (si === 0 ? ' active' : '');
      el.src = v.photos[si];
      el.alt = '';
    } else {
      el = document.createElement('div');
      el.className = 'vp-thumb vp-thumb-video' + (si === 0 ? ' active' : '');
      el.textContent = '▶';
    }
    (function(idx){
      el.addEventListener('click', function(){ vpGoTo(idx, slideCount); });
    })(si);
    vpThumbs.appendChild(el);
  }
}

function loadVehicleMedia(v){
  if(!v.data) return Promise.resolve();
  return fetch(v.data).then(function(r){
    if(!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }).then(function(json){
    v.photos = json.photos || [];
    v.videos = json.videos || [];
  }).catch(function(){
    v.photos = v.thumb ? [v.thumb] : [];
    v.videos = [];
  });
}

function renderVehiclePageMeta(v){
  var badgeClass = v.mode === 'vente' ? 'sale' : 'rent';
  var badgeLabel = v.mode === 'vente' ? 'À vendre' : 'À louer';
  var vpBadge = document.getElementById('vpBadge');
  var vpName = document.getElementById('vpName');
  var vpSpecs = document.getElementById('vpSpecs');
  var vpFeatures = document.getElementById('vpFeatures');
  var vpPrice = document.getElementById('vpPrice');
  var vpContact = document.getElementById('vpContact');

  vpBadge.className = 'vcard-badge vp-badge ' + badgeClass;
  vpBadge.textContent = badgeLabel;
  vpName.textContent = v.name;
  vpSpecs.textContent = v.year + ' · ' + v.gearbox + ' · ' + v.seats + ' places · ' + v.fuel + ' · ' + v.colorName;

  vpFeatures.innerHTML = '';
  if(v.note){
    v.note.split('·').map(function(s){ return s.trim(); }).filter(Boolean).forEach(function(feat){
      var li = document.createElement('li');
      li.textContent = feat;
      vpFeatures.appendChild(li);
    });
  }

  vpPrice.innerHTML = v.price ? (v.price + '<small>' + v.unit + '</small>') : '<small>Prix sur demande</small>';
  var msg = 'Bonjour Auto-Connect Teranga, le véhicule ' + v.name + ' (' + badgeLabel.toLowerCase() + ') m’intéresse.';
  vpContact.onclick = function(){
    var number = WA_NUMBERS[Math.floor(Math.random() * WA_NUMBERS.length)];
    openWhatsApp(number, msg);
  };
}

function initVehiclePage(v){
  vpGallery = document.getElementById('vpGallery');
  vpThumbs = document.getElementById('vpThumbs');

  initLightbox();

  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
    });
  }

  renderVehiclePageMeta(v);
  vpGallery.innerHTML = v.thumb ?
    '<div class="vgallery-track"><img src="' + v.thumb + '" alt="' + v.name + '"></div><div class="vp-loading-badge">Chargement des photos…</div>' : '';

  loadVehicleMedia(v).then(function(){
    renderVehicleGallery(v);
  });
}
