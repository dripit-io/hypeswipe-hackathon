# HypeSwipe

HypeSwipe is a web dApp built on the Avalanche C-Chain, allowing users to participate in prediction challenges using $ARENA tokens. Users can connect their wallets, make predictions, and claim rewards based on their performance.

## Features

- **Wallet Connection:** Connect with MetaMask or other EVM-compatible wallets.
- **Prediction Challenges:** Participate in challenges and make predictions on outcomes.
- **Rewards:** Earn and claim $ARENA tokens for correct predictions.
- **Profile:** View your balance, claimable rewards, and challenge history.
- **Modern UI:** Built with React, RainbowKit, and Wagmi for a seamless web3 experience.

## Tech Stack

- **Frontend:** React, TypeScript, RainbowKit, Wagmi, viem, TanStack Query
- **Smart Contracts:** Solidity (Hypeswipe.sol)
- **Blockchain:** Avalanche C-Chain

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Yarn or npm

### Installation

```bash
git clone https://github.com/yourusername/hypeswipe.git
cd hypeswipe
yarn install
# or
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set the following variables:

```
VITE_REOWN_PROJECT_ID=your_rainbowkit_project_id
VITE_ARENA_TOKEN_CONTRACT=0x...   # ARENA token contract address
VITE_HYPESWIPE_CONTRACT=0x...     # Hypeswipe contract address
VITE_ARENA_SALT=your_salt         # For user info API
```

### Running the App

```bash
yarn dev
# or
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Development Notes

- **CORS:** Direct contract calls require a wallet connection. If no wallet is connected, some features may not work due to CORS restrictions on public RPC endpoints.
- **Contracts:** See `contracts/Hypeswipe.sol` for the main contract logic.

## License

MIT
