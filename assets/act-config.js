// Auto-Connect Teranga — configuration partagée (Firebase + Cloudinary).
// Ce fichier n'est pas secret : les clés Firebase "apiKey" et la configuration
// Cloudinary "unsigned" sont conçues pour être visibles côté client. La vraie
// protection vient des règles de sécurité Firestore (voir firestore.rules)
// qui limitent l'écriture aux 2 adresses email listées ci-dessous.
window.ACT_CONFIG = {
  firebase: {
    apiKey: "AIzaSyDu9WibmGbZ7i3OtRmnOybeAE3YkXrDvk",
    authDomain: "auto-connect-teranga.firebaseapp.com",
    projectId: "auto-connect-teranga",
    storageBucket: "auto-connect-teranga.firebasestorage.app",
    messagingSenderId: "878397200475",
    appId: "1:878397200475:web:04c1bcd2ad65f12529c77e"
  },
  adminEmails: ["autoconnetteranga@gmail.com", "parksevane@gmail.com"],
  cloudinary: { cloudName: "blfksyz7", uploadPreset: "vehicules" }
};
