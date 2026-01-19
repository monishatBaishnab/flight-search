# Flight Search

A modern, high-performance flight search engine built with **React 19**, **Vite**, and **Redux Toolkit**. Experience seamless trip planning with real-time data, advanced filtering, and intuitive price visualizations.

## ✨ Features

- **🚀 Real-time Search**: Instant airport and city search with intelligent debounced autocomplete.
- **📊 Interactive Price Analysis**: Visual price comparison charts using **Recharts** to find the best deals at a glance.
- **🔍 Advanced Filtering**: Precise controls for price range, stops, preferred airlines, flight duration, and departure/arrival times.
- **⚡ Smart Sorting**: Quick sorting by "Best Value" (calculated via a custom weighted algorithm), "Cheapest", and "Fastest".
- **💎 Premium UX**: Sleek, responsive design built with **Tailwind CSS v4** and **Radix UI** primitives.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **🎨 Dynamic Theming**: Branded with a professional **Cornflower Blue** design system.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/monishatBaishnab/flight-search.git
   cd flight-search
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your Amadeus API credentials:

   ```env
   VITE_API_URL="https://test.api.amadeus.com"
   VITE_CLIENT_ID="your_amadeus_client_id"
   VITE_CLIENT_SECRET="your_amadeus_client_secret"
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application:**
   Navigate to `http://localhost:5173` in your browser.

## 📁 Project Structure

```bash
src/
├── components/       # Reusable UI and Page-specific components
│   ├── flight/       # Flight cards, filters, charts, search form
│   └── ui/           # Primitive UI components (buttons, inputs, etc.)
├── hooks/            # Custom React hooks (debounce, etc.)
├── pages/            # Main layout and page views (Home)
├── redux/            # RTK Query API, Store, and Slice definitions
├── utils/            # Helper functions and formatting utilities
└── assets/           # Global styles and static assets
```

## 📜 Available Scripts

- `npm run dev` - Starts the development server with HMR.
- `npm run build` - Compiles the application for production.
- `npm run lint` - Runs ESLint to check for code quality issues.
- `npm run preview` - Locally previews the production build.


Built with ❤️ by [Monishat Baishnab](https://github.com/monishatBaishnab)
