## Asha Setu

Asha Setu is a full-stack web application that helps entrepreneurs identify eligible government schemes and grants based on their business profile. The initial version focuses on women-led startups in India and uses an in-memory JSON dataset that can be easily adapted to a real database later.

### Tech Stack
- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express.js
- Data: In-memory JSON file (`server/schemes.json`)

### Project Structure
```
pulkit hackathon/
  client/           # React + Tailwind app (Vite)
  server/           # Express API server
  README.md
```

### Features
- Landing page with modern, responsive Tailwind UI
- Guided, step-by-step questionnaire
- Basic validation on each question
- API endpoint `/api/schemes` that:
  - Receives questionnaire answers
  - Scores and ranks schemes using a criterion-based matching algorithm
  - Returns matched criteria and eligibility percentage per scheme
- Results page with clean cards including name, description, eligibility percentage, matched criteria, and apply link

### Getting Started (Local)

Requirements:
- Node.js 18+

1) Install dependencies
```
cd "pulkit hackathon"
cd server && npm install && cd ..
cd client && npm install && cd ..
```

2) Run the backend (Express)
```
cd server
npm run start
# Server runs on http://localhost:5000
```

3) Run the frontend (React + Vite)
```
cd client
npm run dev
# App runs on http://localhost:5173 (or the port Vite shows)
```

The frontend is configured to proxy API calls to `http://localhost:5000` during development.

### Deployment
- Frontend: Build with `npm run build` in `client/` and deploy `client/dist` on Netlify/Vercel.
- Backend: Deploy `server/` on a Node host like Render/Heroku/Railway. Ensure the app listens on `process.env.PORT`.

### API
- `POST /api/schemes`
  - Body:
    ```json
    {
      "gender": "Female",
      "age": 28,
      "state": "Karnataka",
      "sector": "Food Service",
      "businessType": "MSME",
      "yearsInBusiness": 2,
      "loanAmount": 500000
    }
    ```
  - Response: Array of matched schemes sorted by descending eligibility percentage

### Data
Data for women-focused schemes has been summarized into `server/schemes.json` from commonly referenced Indian programs (e.g., Udyogini, Stand-Up India, Mudra, Annapurna, Mahila Udyam Nidhi, Dena Shakti, TREAD). The structure is designed to be easily migrated to a real database later.

### Customize and Extend
- Add more schemes or enrich criteria in `server/schemes.json`
- Expand the questionnaire in `client/src/components/Questionnaire.jsx`
- Replace the in-memory JSON with a DB (MongoDB/Firestore) by substituting the loader in `server/index.js`

### License
MIT


