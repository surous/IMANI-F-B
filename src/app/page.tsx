// src/app/page.tsx
export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: '#2e8b57' }}>🌱 Imani Backend is Running!</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>
        Your Next.js + Prisma + Cardano backend is live on port 3000.
      </p>
      <p style={{ marginTop: '30px', color: '#555' }}>
        Test API routes using REST Client or Postman:
      </p>
      <ul style={{ marginTop: '10px', textAlign: 'left', display: 'inline-block' }}>
        <li>POST /api/auth/login</li>
        <li>GET /api/practices</li>
        <li>POST /api/attestations</li>
        <li>GET /api/reputation</li>
      </ul>
    </div>
  );
}