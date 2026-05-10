# Web Search Professionals — AI Marketing Agent
# Rudy McCormick | Fredonia, WI

## Quick Start (Self-Hosted Server)

### Requirements
- Node.js 18+ (install via: https://nodejs.org)
- 512MB+ RAM

### Setup
```bash
unzip marketing-agent-final.zip
cd agent-src
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Production Deployment Options

### Option A: Self-Hosted (Recommended for your own server)

1. Install Node.js 18+ and PM2:
   ```bash
   npm install -g pm2
   ```

2. Install the app:
   ```bash
   cd agent-src
   npm install
   ```

3. Start with PM2 (keeps it running 24/7):
   ```bash
   pm2 start npm --name "marketing-agent" -- run dev
   pm2 save
   pm2 startup
   ```

4. (Optional) Point a domain to port 3000 using Nginx:
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
     }
   }
   ```

5. Add SSL with Let's Encrypt:
   ```bash
   certbot --nginx -d yourdomain.com
   ```

Your dashboard will be at https://yourdomain.com

---

### Option B: Vercel (Easiest — Free)

1. Push the code to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/marketing-agent.git
   git push -u origin main
   ```

2. Go to https://vercel.com → Import Project → Select your repo
3. Click Deploy — done. Free tier handles all Next.js builds natively.
4. You'll get a URL like https://marketing-agent.vercel.app

---

## Your AI Clone Setup
- Voice ID: Voiceac7eb1d11778416265 (cloned from your audio sample)
- Style: Tactical, data-backed, 15+ year authority voice
- Content types: LinkedIn, Email, Instagram, Blog, YouTube

## Connecting Real Apps
In the app, go to Connections page to wire up:
LinkedIn • Gmail • Instagram • YouTube • HubSpot • Facebook
