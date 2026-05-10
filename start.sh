#!/bin/bash
# Web Search Professionals - AI Marketing Agent Startup Script

echo "🚀 Starting AI Marketing Agent..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from: https://nodejs.org"
    exit 1
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current: $(node -v)"
    exit 1
fi

# Install deps if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Starting dashboard on http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""
npm run dev
