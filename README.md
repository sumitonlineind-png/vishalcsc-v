# Vishal CSC Centre – Website + Customer App + Admin App

Teen hisse, ek hi folder (Vercel par seedha chalta hai, build ki zaroorat nahi):
- `/`        Simple website (SEO ke saath)
- `/app/`    Customer app (phone par install hota hai) – service chuno, order karo, order track karo
- `/admin/`  Admin app (Vishal ke liye, noindex) – orders, services & rates, breaking news, updates (photos), dukaan open/band

## Live karne ke kaam
1. **Domain badlo:** `index.html`, `app/index.html`, `sitemap.xml`, `robots.txt` mein `https://YOUR-DOMAIN.com`
   ko asli domain se Find & Replace karo.
2. **Firebase Authentication** (Console > Authentication > Sign-in method):
   - **Email/Password** chalu karo, aur ek admin user banao (Users tab).
   - **Anonymous** chalu karo (customer app ke orders ke liye zaroori hai).
   - Settings > User actions mein "sign-up" band kar do.
3. **Firestore Database** banao. Rules tab mein `firestore.rules` ka poora text paste karo, `YOUR_ADMIN_EMAIL`
   ki jagah admin ka email likho, Publish karo. (Bina iske orders aur admin kaam nahi karenge.)
4. **Authorized domains:** Authentication > Settings mein apna Vercel/asli domain jodo.
5. **Vercel:** folder GitHub par daalo > Vercel mein Import (Framework: Other) > Deploy.
6. **Pehli baar:** `/admin/` kholo > login > Services > "14 default services daalo". Ab rates aur nayi services wahin se.

## Admin app install
Phone par `/admin/` kholo > browser menu > "Add to Home screen / Install app".
Customers ke liye `/app/` par "Install app" button aata hai.

## Security notes
- Customer orders sirf apne device ke anonymous ID se dikhte hain; admin ko sab dikhte hain.
- Orders mein sirf naam, mobile aur chhota detail jata hai. Aadhaar/documents app mein upload nahi hote (privacy).
- Admin login: 5 galat koshish par 1 minute lock, 30 minute idle par auto logout.
- Firebase ki apiKey public hoti hai; asli suraksha Auth + Firestore rules hai.
- Spam rokne ke liye Firebase App Check (reCAPTCHA) baad mein chalu karna behtar hai.
- Push notification (naye order par phone alert) abhi nahi hai; admin app khula ho to count dikhta hai.
