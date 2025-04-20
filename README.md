# QuantumRig UI

This project is the frontend user interface for QuantumRig, an e-commerce platform specializing in high-end computer peripherals and systems.

## Features

*   **Product Carousel:** Browse featured products with smooth animations and touch/swipe navigation.
*   **Category Filters:** Quickly filter products by category (Keyboards, Mice, Monitors, PCs).
*   **Responsive Design:** Adapts to various screen sizes, from mobile to desktop.
*   **Detailed Product View:** Displays product information including name, category, description, price, model number, and availability status.
*   **Modern UI:** Built with Tailwind CSS for a sleek and modern aesthetic.
*   **Warranty Information:** Provides access to warranty and service details (accessible via the `/warranty` route).

## Tech Stack

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** Adds static typing to JavaScript for improved developer experience and code quality.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Lucide React:** Feather icons library for React.
*   **React Router DOM:** For handling navigation within the application.

## Project Structure

```
/
├── public/
│   ├── productImages/  # Product images (inferred from imports)
│   ├── warrantyCards/  # Warranty card assets (Assumed location)
│   └── ...
├── src/
│   ├── components/     # Reusable UI components (Assumed)
│   ├── pages/          # Page components (e.g., Home.tsx)
│   ├── styles/         # Global styles or CSS modules (Assumed)
│   ├── App.tsx         # Main application component (Assumed)
│   └── index.tsx       # Entry point (Assumed)
├── .gitignore
├── package.json
├── README.md       <- You are here
└── tsconfig.json   # TypeScript configuration
```

*(Note: Some directories like `components` and `styles` are assumed standard locations. Product images are located in `public/productImages` and are essential for the product display features.)*

## Asset Management (Product Images)

This project contains numerous high-resolution product images located in the `public/productImages/` directory. To efficiently manage these large files within the Git repository, **Git Large File Storage (LFS)** should be used.

If you haven't already, ensure Git LFS is installed (`brew install git-lfs` or download from [git-lfs.github.com](https://git-lfs.github.com/)) and initialized for the repository:

```bash
git lfs install
# Track image file types (adjust pattern if necessary)
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.jpeg"
# Ensure .gitattributes is added and committed
git add .gitattributes
git commit -m "Configure Git LFS for image assets"
```

When cloning the repository, ensure Git LFS pulls the actual image files:

```bash
git clone <your-repository-url>
# If LFS files weren't pulled automatically:
# cd QuantumRigUI
# git lfs pull
```

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd QuantumRigUI
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

```bash
npm start
# or
yarn start
```

This will typically start the development server on `http://localhost:3000` or another port specified by your setup (e.g., Vite might use `http://localhost:5173`).

## Available Scripts

In the project directory, you can run:

*   `npm start` / `yarn start`: Runs the app in development mode.
*   `npm run build` / `yarn build`: Builds the app for production to the `build` folder.
*   `npm test` / `yarn test`: Launches the test runner in interactive watch mode (if configured).
*   `npm run eject` / `yarn eject`: (If using Create React App) Removes the single build dependency from your project.

*(Note: Available scripts might differ based on whether the project was set up with Create React App, Vite, or another toolchain.)*

## Contributing

Contributions are welcome! Please follow standard practices like creating feature branches and submitting pull requests.
