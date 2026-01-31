#!/bin/bash

# ============================================================================
# Setup Script for Test200126
# Platform: Linux/macOS
# ============================================================================

set -e  # Exit on error

echo "=============================================="
echo "  Test200126 - Setup"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ============================================================================
# 1. Check Prerequisites
# ============================================================================

echo "📋 Checking prerequisites..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js >= 22.x from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22.x ]; then
    echo -e "${YELLOW}⚠️  Node.js version is $NODE_VERSION, recommended >= 22.x${NC}"
else
    echo -e "${GREEN}✓${NC} Node.js $(node -v) detected"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} npm $(npm -v) detected"

# Check Git
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}⚠️  Git is not installed${NC}"
    echo "Git is recommended for version control"
else
    echo -e "${GREEN}✓${NC} Git $(git --version | cut -d' ' -f3) detected"
fi

echo ""

# ============================================================================
# 2. Install Dependencies
# ============================================================================

echo "📦 Installing project dependencies..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed successfully"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo ""

# ============================================================================
# 3. Install Playwright Browsers
# ============================================================================

echo "🌐 Installing Playwright browsers..."
echo ""

npx playwright install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Playwright browsers installed successfully"
else
    echo -e "${RED}❌ Failed to install browsers${NC}"
    exit 1
fi

echo ""

# ============================================================================
# 4. Setup Environment Variables
# ============================================================================

echo "⚙️  Setting up environment variables..."
echo ""

if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓${NC} .env file created from .env.example"
    echo -e "${YELLOW}⚠️  Please edit .env file with your actual credentials${NC}"
else
    echo -e "${YELLOW}ℹ${NC}  .env file already exists, skipping..."
fi

echo ""

# ============================================================================
# 5. Initialize Git Repository (if not exists)
# ============================================================================

if command -v git &> /dev/null; then
    if [ ! -d .git ]; then
        echo "📝 Initializing Git repository..."
        git init
        echo -e "${GREEN}✓${NC} Git repository initialized"
        echo ""
    fi
fi

# ============================================================================
# 6. Summary
# ============================================================================

echo "=============================================="
echo "  ✅ Setup Complete!"
echo "=============================================="
echo ""
echo "Next steps:"
echo ""
echo "  1. Edit .env file with your test credentials"
echo "     ${YELLOW}nano .env${NC}"
echo ""
echo "  2. Run tests:"
echo "     ${GREEN}npm test${NC}                 # Run all tests"
echo "     ${GREEN}npm run test:headed${NC}      # Run with visible browser"
echo "     ${GREEN}npm run test:ui${NC}          # Run with UI mode"
echo ""
echo "  3. View test reports:"
echo "     ${GREEN}npm run test:report${NC}      # Show HTML report"
echo ""
echo "For more information, see README.md"
echo ""
