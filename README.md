# Your Brand 

This is a complete, clean-code Next.js rewrite of the original website template, using standard React components, Tailwind CSS, and Framer Motion for premium animations. All original branding, logos, and assets have been replaced with neutral, easy-to-edit placeholders.

## Folder Structure

- `/app`: Contains Next.js routes, layouts, and global styles.
- `/components`: Contains all modular React components (Navbar, Hero, Marquee, Stats, PortfolioCarousel, BlogSection, ContactForm, Footer).
- `/public/videos`: Add your background `.mp4` files here.
- `/public/images`: Add your blog or portfolio `.jpg`/`.png` files here.
- `/public/assets`: Add fonts or specific icon files here.

## How to Customize

1. **Brand Name**: Search globally for `Your Brand` or `YOUR BRAND` to replace the text with your actual brand name.
2. **Contact Details**: Update the phone numbers (`+91 63649 26959`) and emails (`service@yourbrand.com`) in `ContactForm.jsx` and `Footer.jsx`.
3. **Hero Video**: Add a video to `/public/videos/hero-bg.mp4` and uncomment the `<source>` tag in `components/Hero.jsx`.
4. **Portfolio Videos**: Add your reel videos to `/public/videos/work-1.mp4` etc. and uncomment the `<video>` tag in `components/PortfolioCarousel.jsx`.
5. **Blog Images**: Add images to `/public/images/blog-1.jpg` and uncomment the `<img src=...>` tags in `components/BlogSection.jsx`.

## Running the Project Locally

Because the Next.js setup has been fully scaffolded, you just need to install the dependencies and run the development server.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Code Quality

- **No Framer-generated Mess**: This site was built by hand without relying on export tools that create hashed class names.
- **Framer Motion**: We use `framer-motion` purely as an animation library (which is the industry standard for React animations), making the entry and scroll animations smooth and performant.
- **Tailwind CSS**: The styling uses standard Tailwind classes, meaning you can easily edit the spacing, colors, and layout right inside the components.
