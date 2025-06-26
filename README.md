## 🛠️ Teknologi yang Digunakan

- **Frontend**: React + Tailwind CSS
- **Backend**: Firebase Authentication & Firestore
- **Icon**: Lucide React Icons

## 🚀 Instalasi Lokal

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/username/sea-catering-adminhttps://github.com/SyaefulBachtiar/Tugas-Software-Engineering-Academy-COMPFEST-17.git
   cd Tugas-Software-Engineering-Academy-COMPFEST-17
   
2. Install dependencies
   npm install

3. Atur Firebase config
   Buat file .env.local dan masukkan konfigurasi Firebase:
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_project.appspot.com
   VITE_MESSAGING_SENDER_ID=your_sender_id
   VITE_APP_ID=your_app_id
   
5. Jalankan secara lokal
   npm run dev

6. Firebase Security Rules (Contoh)
   rules_version = '2';
   service cloud.firestore {
   match /databases/{database}/documents {
    
    match /subscriptions/{docId} {
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow read: if request.auth != null && (
        request.auth.token.role == 'admin' || resource.data.userId == request.auth.uid
      );
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
   }

   Link Deploymetn:
    https://tugas-software-engineering-academy.vercel.app/
   
