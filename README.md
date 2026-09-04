# Lootrushs

Company website for **Lootrushs**, a Web3 development company, at [lootrushs.com](https://lootrushs.com).

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin and Firebase settings live in `lib/server-config.ts` (server-only). Fill in the Firebase fields from the Firebase Console service-account JSON.

Hiring backend:

- `lib/backend` — Firestore applications + resume files
- `POST /api/apply` — public apply
- `GET /api/admin/applications` — list (admin session)
- `GET /api/admin/applications/[id]` — one record
- `GET /api/admin/resume/[id]` — download CV
- Firestore rules in `firebase/` deny all browser access; the Admin SDK bypasses them.

## Applications

- Firestore collection `applications`
- Firestore collection `resume_files` (CV bytes)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

### Firebase setup (free Spark plan is enough)

1. Open [Firebase Console](https://console.firebase.google.com) and create a project.
2. Build → **Firestore Database** → Create database → start in **production** mode. Use `firebase/firestore.rules`.
3. Project settings → **Service accounts** → Generate new private key and paste it into `lib/server-config.ts`.

Keep Firestore closed to the public. The website writes with the Admin SDK.

You do **not** need Firebase Storage.

## Deploy to lootrushs.com

1. Push this project to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Point the `lootrushs.com` domain at the deployment.

If the GitHub repo is public, anyone can read `lib/server-config.ts`. Use a private repo.
