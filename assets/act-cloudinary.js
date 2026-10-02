// Auto-Connect Teranga — upload de photos/vidéos vers Cloudinary (preset "unsigned")
// + petit utilitaire pour générer des miniatures à la volée via l'URL Cloudinary.
(function(global){
  'use strict';

  function cldThumb(url, width){
    if(!url || url.indexOf('/upload/') === -1) return url;
    return url.replace('/upload/', '/upload/w_' + width + ',c_limit,q_auto,f_auto/');
  }

  function cldUpload(file, onProgress){
    var cfg = global.ACT_CONFIG.cloudinary;
    var resourceType = (file.type && file.type.indexOf('video') === 0) ? 'video' : 'image';
    var fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', cfg.uploadPreset);

    return new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.cloudinary.com/v1_1/' + cfg.cloudName + '/' + resourceType + '/upload');
      xhr.upload.onprogress = function(e){
        if(onProgress && e.lengthComputable) onProgress(e.loaded / e.total);
      };
      xhr.onload = function(){
        try {
          var data = JSON.parse(xhr.responseText);
          if(xhr.status >= 200 && xhr.status < 300 && data.secure_url){
            resolve({ url: data.secure_url, resourceType: resourceType });
          } else {
            reject(new Error((data && data.error && data.error.message) || ('HTTP ' + xhr.status)));
          }
        } catch(err){ reject(err); }
      };
      xhr.onerror = function(){ reject(new Error('Erreur réseau pendant l\'upload')); };
      xhr.send(fd);
    });
  }

  // Upload à partir d'une image/vidéo déjà en base64 (utilisé par migrate.html,
  // qui réutilise les photos existantes sans passer par un <input type=file>).
  function cldUploadBase64(dataUri, resourceType){
    resourceType = resourceType || (dataUri.indexOf('data:video') === 0 ? 'video' : 'image');
    var cfg = global.ACT_CONFIG.cloudinary;
    var fd = new FormData();
    fd.append('file', dataUri);
    fd.append('upload_preset', cfg.uploadPreset);
    return fetch('https://api.cloudinary.com/v1_1/' + cfg.cloudName + '/' + resourceType + '/upload', {
      method: 'POST', body: fd
    }).then(function(r){
      return r.json().then(function(data){
        if(!r.ok || !data.secure_url){
          throw new Error((data && data.error && data.error.message) || ('HTTP ' + r.status));
        }
        return data.secure_url;
      });
    });
  }

  global.ACT_cldThumb = cldThumb;
  global.ACT_cldUpload = cldUpload;
  global.ACT_cldUploadBase64 = cldUploadBase64;
})(window);
