# Angular E‑Commerce

An Angular-based e-commerce application. Includes core e-commerce functionalities such as product listing, cart, and checkout (simulation).

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Technologies](#technologies)  
- [Installation & Running](#installation--running)  
- [Project Structure](#project-structure)  
- [Configuration & Environment](#configuration--environment)  
- [Usage](#usage)  
- [Testing](#testing)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Project Overview

The goal of this project is to develop a modern, component-based, responsive e-commerce application using Angular.  
It includes modules such as product listing, product details, cart functionality, and checkout (simulation).

---

## Features

- Product listing & filtering  
- Product detail page  
- Shopping cart (add, remove, calculate totals)  
- Checkout / Payment step (simulation)  
- Responsive design  
- Local JSON (`db.json`) as mock data  
- Error logging (`error.log`)  
- Nx monorepo / modular architecture  

---

## Technologies

- Angular  
- TypeScript  
- HTML5 & CSS3  
- Responsive design (Bootstrap / flex / grid)  
- JSON server / mock data  
- Nx workspace (apps / libs structure)  

---

## Installation & Running

Follow these steps to run the project locally:

```bash
# clone the repo
git clone https://github.com/salihyildiz08/angular-e-commerce.git
cd angular-e-commerce

# install dependencies
npm install

# run mock API (if JSON server is used)
npx json-server --watch db.json --port 3000

# start Angular app
npm start
# or
ng serve --open
```

By default, the app runs at `http://localhost:4200`.

---

## Project Structure

```
angular-e-commerce/
├── apps/
│   ├── …          # main application
│   └── …  
├── library/
│   └── shared/    # reusable modules, services, models
├── db.json         # mock data source
├── error.log       # error log file
├── nx.json
├── package.json
├── tsconfig.base.json
└── …
```

**apps/** folder contains Angular applications.  
**library/shared/** folder contains shared modules, services, and models.

---

## Configuration & Environment

Different environments (development, production) are supported using environment files.  
In `environment.ts` and `environment.prod.ts`, you can define API URLs, debug options, etc.

Example:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

For production, set `production: true` and provide a real API endpoint.

---

## Usage

1. Products are listed on the homepage.  
2. You can filter / search products (if implemented).  
3. Navigate to a product detail page and add items to the cart.  
4. Manage your cart (increase, decrease, remove items).  
5. Go through the checkout process (simulation).  
6. The app is responsive and works on mobile and desktop devices.

---

## Testing

For unit / integration testing (if Jasmine / Karma or other frameworks are included):

```bash
npm test
```

For linting and building:

```bash
npm run lint
npm run build
```

---

## Contributing

Contributions are welcome!

1. Fork the repository  
2. Create a new branch (`feature/your-feature`)  
3. Commit and push your changes  
4. Open a pull request  

Please follow coding standards, add comments, and include tests where possible.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
