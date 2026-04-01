# Anurag Mishra Portfolio

This is a professional portfolio website for Anurag Mishra, showcasing his skills, projects, and contact information.

## Features

- Responsive design for all devices
- Dark/Light mode theme
- Interactive UI with animations using Framer Motion
- Project showcase with detailed information
- Skills section with progress bars
- Contact form with email functionality
- Resume download functionality
- Profile image with modern styling

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## How the Contact Form Works

The contact form uses **EmailJS** for dynamic, real-time message sending directly from the client side:

1. When a user fills out the contact form and clicks "Send Message", the form is validated instantly.
2. The data is parsed and securely sent via EmailJS using React asynchronous requests.
3. The user gets instant visual feedback (Loading spinner -> Success Message Panel).
4. The message correctly bypasses email clients and is delivered directly to `itsanuragmishra99@gmail.com` with Reply-To headers matching the sender's input.

This ensures a seamless, professional experience without forcing visitors to open their personal email clients.

## Technologies Used

- React
- SCSS
- Framer Motion
- React Router DOM
- React Icons

## Deployment

The site can be deployed on platforms like Netlify, Vercel, or GitHub Pages.

## Project Structure

```
src/
├── assets/
│   ├── images/
│   └── styles/
│       ├── global.scss
│       └── variables.scss
├── components/
│   ├── layout/
│   │   ├── Footer.js
│   │   ├── Layout.js
│   │   └── Navbar.js
│   └── UI/
│       ├── About.js
│       ├── Contact.js
│       ├── Hero.js
│       ├── Projects.js
│       ├── Skills.js
│       └── Certifications.js
├── contexts/
│   └── ThemeContext.js
├── pages/
│   ├── AboutPage.js
│   ├── ContactPage.js
│   ├── HomePage.js
│   ├── ProjectsPage.js
│   └── SkillsPage.js
├── App.js
└── index.js
```

## Customization

### Changing Colors

The color scheme can be customized by editing the `src/assets/styles/variables.scss` file. Update the primary, secondary, and accent color values to match your desired palette.

### Adding Projects

To add new projects, update the projects array in the `src/components/UI/Projects.js` file with your project details.

### Updating Content

Most content can be updated by modifying the component files in the `src/components/UI/` directory. Resume data is contained within these components.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from various modern portfolio websites
- Icons provided by [React Icons](https://react-icons.github.io/react-icons/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## Contact

Anurag Mishra - [itsanuragmishra99@gmail.com](mailto:itsanuragmishra99@gmail.com)
