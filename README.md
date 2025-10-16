
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/34250a72-21b5-4324-92c9-cb659a9a5799" />

# NoBot - Fair Launch Terminal

**Zero Gas Wars • No MEV • AI-Protected • Powered by Linera**

NoBot is a fair launch platform that eliminates bot manipulation, gas wars, and MEV exploitation using Linera microchains and AI-powered eligibility checks.

![NoBot Terminal](https://via.placeholder.com/1200x600/0a0a00/00ff00?text=NoBot+Terminal)

## ✨ Features

### 🎯 Multi-Factor Eligibility
- Wallet age verification (minimum 30 days)
- Transaction history analysis (minimum 3 transactions)
- Volume requirements (minimum 0.01 ETH)
- AI/MCP behavioral pattern detection

### ⚡ Instant Finality
- Powered by Linera microchains
- Sub-2 second confirmation times (P95)
- No gas wars, predictable fees
- True parallelization

### 🛡️ Fair Queue System
- Time-stamped order preservation
- Equal opportunity for all users
- Nonce-based duplicate prevention
- Real-time queue position tracking

### 📊 Real-Time Dashboard
- Live mint feed with animations
- Supply tracking
- Queue metrics
- Success rate statistics

### 🎨 Retro Terminal UI
- CRT screen aesthetic with scanlines
- Phosphor glow effects
- Pixel-perfect typography
- Smooth animations

## 🏗️ Architecture
```
nobot/
├── contract/          # Linera smart contract (Rust)
├── frontend/          # React + Vite + Tailwind UI
├── ai-agent/          # AI/MCP bot detection
├── docs/              # Documentation
└── scripts/           # Deployment scripts
```

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Wagmi + Viem** - Web3 integration

### Contract
- **Linera SDK 0.15.4** - Microchain framework
- **Rust** - Smart contract language
- **GraphQL** - API layer

### Infrastructure
- **Nginx** - Reverse proxy
- **Systemd** - Process management
- **Ubuntu 24.04** - Server OS

## 📦 Installation

### Prerequisites
```bash
# Node.js 18+
node --version

# Rust + Cargo
rustc --version

# Linera CLI
linera --version
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Contract Deployment
```bash
cd contract
cargo build --release --target wasm32-unknown-unknown
linera project publish-and-create
```

## 🌐 Live Demo

**Production**: [https://nobot.coinsspor.com](https://nobot.coinsspor.com)

## 🗺️ Roadmap

### ✅ Wave 1 (Completed - Oct 14-16, 2024)
- Multi-factor eligibility UI
- AI/MCP bot detection display
- Fair queue interface
- Launch countdown timer
- Real-time metrics dashboard
- Live mint feed
- Retro terminal design
- Web3 wallet integration

### 🚧 Wave 2 (Next)
- Linera GraphQL API integration
- Real Etherscan eligibility checks
- Custom eligibility rules
- Enhanced analytics
- Multiple launch support
- Smart contract deployment

### 📅 Wave 3-4 (Planned)
- Multi-collection management
- Advanced AI detection
- Community governance
- Production security audit
- Mainnet deployment

## 🧪 Current Status

**Wave 1**: Demo UI completed with mock data
- Frontend fully functional
- Wallet connection working (MetaMask)
- Eligibility checks use simulated data
- Backend API integration planned for Wave 2

## 🤝 Contributing

Contributions welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🔗 Links

- **Website**: https://nobot.coinsspor.com
- **Documentation**: [docs/](docs/)
- **Linera**: https://linera.io
- **Twitter**: @NoBot_Protocol

## 👥 Team

Built with ❤️ for the Linera Hackathon

## 🙏 Acknowledgments

- Linera Protocol team for the amazing microchain technology
- The Web3 community for continuous support
- All contributors and testers

---

**⚡ Powered by Linera Microchains**
