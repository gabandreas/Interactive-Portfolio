# Interactive Personal Portfolio

A modern, interactive personal portfolio website built with React.js, Tailwind CSS v4, and Framer Motion. Features a flat design with a custom color palette and engaging animations.

## 🎨 Design Features

- **Color Palette**: Primary dark blue (#154D71) and light yellow (#FFF9AF)
- **Flat Design**: Clean, modern interface without gradients
- **Interactive Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Responsive Design**: Optimized for all device sizes
- **Smooth Scrolling**: Seamless navigation between sections

## 🚀 Sections Included

1. **Hero Section**: Eye-catching introduction with animated background elements
2. **About**: Personal story with animated profile elements
3. **Skills**: Interactive skill cards with animated progress bars
4. **Projects**: Project showcase with hover effects and technology tags
5. **Experience**: Timeline-style professional experience
6. **Hobbies**: Unique section showcasing personal interests and favorites
7. **Contact**: Interactive contact form with social links

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Tailwind CSS v4** - Styling and responsive design
- **Framer Motion** - Animations and transitions
- **Lucide React** - Modern icon library
- **Vite** - Build tool and development server

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd interactive-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🎯 Customization Guide

### Personal Information
Update the following files with your personal information:

- **Hero Section** (`src/components/HeroSection.jsx`):
  - Change name, title, and description
  - Update call-to-action buttons

- **About Section** (`src/components/AboutSection.jsx`):
  - Update personal story and experience
  - Modify achievement badges

- **Contact Section** (`src/components/ContactSection.jsx`):
  - Update contact information (email, phone, location)
  - Add your social media links

### Skills
Edit `src/components/SkillsSection.jsx` to update:
- Skill names and proficiency levels
- Icons for each skill
- Add or remove skills as needed

### Projects
Modify `src/components/ProjectsSection.jsx` to showcase your projects:
- Update project titles, descriptions, and images
- Add your GitHub and live demo links
- Update technology stacks

### Experience
Update `src/components/ExperienceSection.jsx` with your work history:
- Add your job titles, companies, and dates
- Update job descriptions
- Mark current position

### Hobbies
Customize `src/components/HobbiesSection.jsx` to reflect your interests:
- Update hobby categories and descriptions
- Add your favorite items (artists, books, games, etc.)
- Modify icons to match your interests

### Color Scheme
The color palette is defined in `tailwind.config.js`:
- Primary dark: `#154D71`
- Primary light: `#FFF9AF`

To change colors, update the `colors` section in the config file.

### Animations
All animations are handled by Framer Motion. You can:
- Adjust animation durations in component files
- Modify hover effects and transitions
- Add new animations using Framer Motion's API

## 📱 Responsive Design

The portfolio is fully responsive and includes:
- Mobile-first design approach
- Collapsible navigation menu for mobile devices
- Optimized layouts for tablets and desktops
- Touch-friendly interactive elements

## 🎨 Styling

The project uses Tailwind CSS v4 with custom utilities:
- Custom color palette
- Smooth transitions and hover effects
- Glass morphism effects
- Custom scrollbar styling

## 🚀 Deployment

To build for production:
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider submitting a pull request!

---

**Happy coding!** 🎉