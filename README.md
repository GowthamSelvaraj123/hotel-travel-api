  <h1>🌍 Hotel Travel API</h1>
  <p>A RESTful API for hotel travel booking built with <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong>.</p>

  <h2>🔧 Features</h2>
  <ul>
    <li>User Authentication (Register, Login, Logout)</li>
    <li>Password Reset via Email (using Nodemailer)</li>
    <li>CRUD Operations for Hotels</li>
    <li>Travel Plan and Booking Management</li>
    <li>JWT Token Authentication</li>
  </ul>

  <h2>🗃️ Folder Structure</h2>
  <pre>
project/
│
├── controllers/
│   ├── auth.controller.js
│   ├── hotel.controller.js
│   └── ...
│
├── models/
│   ├── User.model.js
│   ├── Hotel.model.js
│   └── ...
│
├── routes/
│   ├── auth.routes.js
│   ├── hotel.routes.js
│   └── ...
│
├── utils/
│   └── sendEmail.js
│
├── config/
│   └── db.js
│
├── app.js or server.js
└── .env
  </pre>

  <h2>📦 Installation</h2>
  <pre><code>
git clone https://github.com/yourusername/hotel-travel-api.git
cd hotel-travel-api
npm install
  </code></pre>

  <h2>🧪 Environment Variables (.env)</h2>
  <pre><code>
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
SMTP_EMAIL=youremail@gmail.com
SMTP_PASSWORD=your_email_app_password
CLIENT_URL=http://localhost:3000
  </code></pre>

  <h2>🚀 Running the App</h2>
  <pre><code>
npm run dev
  </code></pre>

  <h2>📬 API Endpoints</h2>

  <h3>Auth</h3>
  <ul>
    <li><code>POST /api/auth/register</code> – Register new user</li>
    <li><code>POST /api/auth/login</code> – Login user</li>
    <li><code>POST /api/auth/logout</code> – Logout user</li>
    <li><code>POST /api/auth/forgot-password</code> – Send reset email</li>
    <li><code>POST /api/auth/reset-password/:token</code> – Reset password</li>
  </ul>

  <h3>Hotels</h3>
  <ul>
    <li><code>GET /api/hotels</code> – Get all hotels</li>
    <li><code>GET /api/hotels/:id</code> – Get hotel by ID</li>
    <li><code>POST /api/hotels</code> – Create hotel</li>
    <li><code>PUT /api/hotels/:id</code> – Update hotel</li>
    <li><code>DELETE /api/hotels/:id</code> – Delete hotel</li>
  </ul>

  <h2>👨‍💻 Developer</h2>
  <p>Developed by <strong>Gowtham S</strong></p>