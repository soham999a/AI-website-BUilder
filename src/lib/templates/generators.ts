import { Template } from './index'
import { generateRestaurantHTML, generateBlogHTML } from './generators-extended'

export function generateTemplateHTML(template: Template, customPrompt?: string, projectName?: string): string {
  const mockData = template.mockData || {}
  
  switch (template.category) {
    case 'portfolio':
      return generatePortfolioHTML(template, mockData, customPrompt, projectName)
    case 'business':
      return generateBusinessHTML(template, mockData, customPrompt, projectName)
    case 'restaurant':
      return generateRestaurantHTML(template, mockData, customPrompt, projectName)
    case 'blog':
      return generateBlogHTML(template, mockData, customPrompt, projectName)
    case 'ecommerce':
      return generateEcommerceHTML(template, mockData, customPrompt, projectName)
    case 'landing':
      return generateLandingHTML(template, mockData, customPrompt, projectName)
    default:
      return generateGenericHTML(template, mockData, customPrompt, projectName)
  }
}

function generatePortfolioHTML(template: Template, mockData: any, customPrompt?: string, projectName?: string): string {
  const name = projectName || mockData.name || 'John Doe'
  const title = mockData.title || 'Creative Professional'
  const bio = mockData.bio || 'Passionate about creating amazing digital experiences.'
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - ${title}</title>
    <meta name="description" content="${bio}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #667eea;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
            color: #667eea;
        }
        
        .hero {
            padding: 120px 0 80px;
            text-align: center;
            color: white;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            animation: fadeInUp 1s ease;
        }
        
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            animation: fadeInUp 1s ease 0.2s both;
        }
        
        .cta-button {
            display: inline-block;
            padding: 12px 30px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
            animation: fadeInUp 1s ease 0.4s both;
        }
        
        .cta-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        
        .section {
            padding: 80px 0;
            background: white;
        }
        
        .section h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #333;
        }
        
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .project-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .project-image {
            height: 200px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
        }
        
        .project-content {
            padding: 1.5rem;
        }
        
        .project-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .project-tech {
            color: #667eea;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        
        .skill-item {
            text-align: center;
            padding: 2rem 1rem;
            background: #f8f9fa;
            border-radius: 15px;
            transition: transform 0.3s ease;
        }
        
        .skill-item:hover {
            transform: translateY(-5px);
        }
        
        .skill-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 3rem 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .projects-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">${name}</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section id="home" class="hero">
        <div class="container">
            <h1>${name}</h1>
            <p>${title}</p>
            <p>${bio}</p>
            <a href="#projects" class="cta-button">View My Work</a>
        </div>
    </section>

    <section id="projects" class="section">
        <div class="container">
            <h2>Featured Projects</h2>
            <div class="projects-grid">
                ${(mockData.projects || [
                    { name: 'Project One', tech: 'React, Node.js' },
                    { name: 'Project Two', tech: 'Vue.js, Python' },
                    { name: 'Project Three', tech: 'Angular, .NET' }
                ]).map((project: any) => `
                    <div class="project-card">
                        <div class="project-image">
                            📱 ${project.name}
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">${project.name}</h3>
                            <p class="project-tech">${project.tech}</p>
                            <p>A showcase of modern web development techniques and best practices.</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section id="skills" class="section" style="background: #f8f9fa;">
        <div class="container">
            <h2>Skills & Expertise</h2>
            <div class="skills-grid">
                <div class="skill-item">
                    <div class="skill-icon">💻</div>
                    <h3>Frontend Development</h3>
                    <p>React, Vue, Angular</p>
                </div>
                <div class="skill-item">
                    <div class="skill-icon">⚙️</div>
                    <h3>Backend Development</h3>
                    <p>Node.js, Python, PHP</p>
                </div>
                <div class="skill-item">
                    <div class="skill-icon">🎨</div>
                    <h3>UI/UX Design</h3>
                    <p>Figma, Adobe XD</p>
                </div>
                <div class="skill-item">
                    <div class="skill-icon">📱</div>
                    <h3>Mobile Development</h3>
                    <p>React Native, Flutter</p>
                </div>
            </div>
        </div>
    </section>

    <footer id="contact">
        <div class="container">
            <h2>Let's Work Together</h2>
            <p>Ready to bring your ideas to life? Let's connect!</p>
            <p>📧 hello@${name.toLowerCase().replace(' ', '')}.com | 📱 (555) 123-4567</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    </script>
</body>
</html>`
}

function generateBusinessHTML(template: Template, mockData: any, customPrompt?: string, projectName?: string): string {
  const companyName = projectName || mockData.companyName || 'TechCorp Solutions'
  const tagline = mockData.tagline || 'Innovative Solutions for Modern Business'

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${tagline}</title>
    <meta name="description" content="${tagline}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        header {
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: #2d5a27;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: #2d5a27;
        }

        .hero {
            background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%);
            color: white;
            padding: 120px 0 80px;
            text-align: center;
        }

        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: fadeInUp 1s ease;
        }

        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            animation: fadeInUp 1s ease 0.2s both;
        }

        .cta-button {
            display: inline-block;
            padding: 15px 35px;
            background: #fff;
            color: #2d5a27;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            transition: all 0.3s ease;
            animation: fadeInUp 1s ease 0.4s both;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .section {
            padding: 80px 0;
        }

        .section h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #333;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .service-card {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }

        .service-card:hover {
            transform: translateY(-10px);
        }

        .service-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #2d5a27;
        }

        .service-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #333;
        }

        footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 3rem 0;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }

            .nav-links {
                display: none;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">${companyName}</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section id="home" class="hero">
        <div class="container">
            <h1>${companyName}</h1>
            <p>${tagline}</p>
            <a href="#services" class="cta-button">Our Services</a>
        </div>
    </section>

    <section id="services" class="section">
        <div class="container">
            <h2>Our Services</h2>
            <div class="services-grid">
                ${(mockData.services || [
                    { name: 'Consulting', description: 'Strategic business consulting', icon: '💼' },
                    { name: 'Development', description: 'Custom software development', icon: '💻' },
                    { name: 'Support', description: '24/7 technical support', icon: '🛠️' }
                ]).map((service: any) => `
                    <div class="service-card">
                        <div class="service-icon">${service.icon}</div>
                        <h3 class="service-title">${service.name}</h3>
                        <p>${service.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <footer id="contact">
        <div class="container">
            <h2>Get In Touch</h2>
            <p>Ready to transform your business? Contact us today!</p>
            <p>📧 info@${companyName.toLowerCase().replace(/\s+/g, '')}.com | 📱 (555) 123-4567</p>
        </div>
    </footer>

    <script>
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>`
}

function generateEcommerceHTML(template: Template, mockData: any, customPrompt?: string, projectName?: string): string {
  const storeName = projectName || mockData.storeName || 'StyleHub'

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${storeName} - Online Store</title>
    <meta name="description" content="Shop the latest products at ${storeName}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000; }
        nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
        .logo { font-size: 1.8rem; font-weight: 700; color: #ec4899; }
        .nav-links { display: flex; list-style: none; gap: 2rem; }
        .nav-links a { text-decoration: none; color: #333; font-weight: 500; transition: color 0.3s ease; }
        .nav-links a:hover { color: #ec4899; }
        .hero { background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); color: white; padding: 80px 0; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; padding: 3rem 0; }
        .product-card { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
        .product-card:hover { transform: translateY(-5px); }
        .product-image { height: 200px; background: linear-gradient(45deg, #ec4899, #be185d); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; }
        .product-content { padding: 1.5rem; }
        .product-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; }
        .product-price { font-size: 1.3rem; font-weight: 700; color: #ec4899; margin-bottom: 1rem; }
        .add-to-cart { width: 100%; padding: 12px; background: #ec4899; color: white; border: none; border-radius: 5px; font-weight: 600; cursor: pointer; transition: background 0.3s ease; }
        .add-to-cart:hover { background: #be185d; }
        footer { background: #333; color: white; text-align: center; padding: 3rem 0; }
        @media (max-width: 768px) { .hero h1 { font-size: 2rem; } .nav-links { display: none; } }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">${storeName}</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#cart">Cart (0)</a></li>
                    <li><a href="#account">Account</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section id="home" class="hero">
        <div class="container">
            <h1>Welcome to ${storeName}</h1>
            <p>Discover amazing products at unbeatable prices</p>
        </div>
    </section>

    <section id="products" class="container">
        <div class="products-grid">
            ${(mockData.products || [
                { name: 'Wireless Headphones', price: '$99', rating: 4.5 },
                { name: 'Smart Watch', price: '$299', rating: 4.8 },
                { name: 'Laptop Stand', price: '$49', rating: 4.2 },
                { name: 'Bluetooth Speaker', price: '$79', rating: 4.6 }
            ]).map((product: any) => `
                <div class="product-card">
                    <div class="product-image">🛍️</div>
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">${product.price}</div>
                        <button class="add-to-cart" onclick="addToCart('${product.name}')">Add to Cart</button>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2024 ${storeName}. All rights reserved.</p>
        </div>
    </footer>

    <script>
        let cart = [];
        function addToCart(productName) {
            cart.push(productName);
            alert(\`\${productName} added to cart!\`);
            document.querySelector('a[href="#cart"]').textContent = \`Cart (\${cart.length})\`;
        }
    </script>
</body>
</html>`
}

function generateLandingHTML(template: Template, mockData: any, customPrompt?: string, projectName?: string): string {
  const productName = projectName || mockData.productName || 'CloudFlow'
  const tagline = mockData.tagline || 'Streamline your workflow with powerful automation'

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} - ${tagline}</title>
    <meta name="description" content="${tagline}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: fixed; top: 0; width: 100%; z-index: 1000; }
        nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
        .logo { font-size: 1.8rem; font-weight: 700; color: #06b6d4; }
        .cta-nav { padding: 12px 24px; background: #06b6d4; color: white; text-decoration: none; border-radius: 5px; font-weight: 600; }
        .hero { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 120px 0 80px; text-align: center; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.3rem; margin-bottom: 2rem; opacity: 0.9; }
        .cta-button { display: inline-block; padding: 18px 40px; background: white; color: #06b6d4; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 1.1rem; transition: all 0.3s ease; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .features { padding: 80px 0; background: #f8f9fa; }
        .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .feature-card { background: white; padding: 2rem; border-radius: 15px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        .feature-icon { font-size: 3rem; margin-bottom: 1rem; color: #06b6d4; }
        .pricing { padding: 80px 0; }
        .pricing h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 900px; margin: 0 auto; }
        .pricing-card { background: white; padding: 2rem; border-radius: 15px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.1); border: 2px solid transparent; }
        .pricing-card.featured { border-color: #06b6d4; transform: scale(1.05); }
        .price { font-size: 3rem; font-weight: 700; color: #06b6d4; margin: 1rem 0; }
        footer { background: #333; color: white; text-align: center; padding: 3rem 0; }
        @media (max-width: 768px) { .hero h1 { font-size: 2.5rem; } }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">${productName}</div>
                <a href="#pricing" class="cta-nav">Get Started</a>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>${productName}</h1>
            <p>${tagline}</p>
            <a href="#pricing" class="cta-button">Start Free Trial</a>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <h2>Why Choose ${productName}?</h2>
            <div class="features-grid">
                ${(mockData.features || [
                    { name: 'Easy Setup', description: 'Get started in minutes, not hours' },
                    { name: 'Powerful Automation', description: 'Automate complex workflows effortlessly' },
                    { name: '24/7 Support', description: 'Expert help whenever you need it' }
                ]).map((feature: any) => `
                    <div class="feature-card">
                        <div class="feature-icon">⚡</div>
                        <h3>${feature.name}</h3>
                        <p>${feature.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section id="pricing" class="pricing">
        <div class="container">
            <h2>Simple Pricing</h2>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3>Starter</h3>
                    <div class="price">$9<span style="font-size: 1rem;">/month</span></div>
                    <p>Perfect for individuals</p>
                </div>
                <div class="pricing-card featured">
                    <h3>Pro</h3>
                    <div class="price">$29<span style="font-size: 1rem;">/month</span></div>
                    <p>Best for teams</p>
                </div>
                <div class="pricing-card">
                    <h3>Enterprise</h3>
                    <div class="price">$99<span style="font-size: 1rem;">/month</span></div>
                    <p>For large organizations</p>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2024 ${productName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`
}

function generateGenericHTML(template: Template, mockData: any, customPrompt?: string, projectName?: string): string {
  const siteName = projectName || 'My Website'

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteName}</title>
    <meta name="description" content="Welcome to ${siteName}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 1rem 0; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 0; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .section { padding: 60px 0; }
        footer { background: #333; color: white; text-align: center; padding: 3rem 0; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>${siteName}</h1>
        </div>
    </header>
    <section class="hero">
        <div class="container">
            <h1>Welcome to ${siteName}</h1>
            <p>Your amazing website starts here</p>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <h2>About Us</h2>
            <p>This is a beautiful, modern website created with AI technology.</p>
        </div>
    </section>
    <footer>
        <div class="container">
            <p>&copy; 2024 ${siteName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`
}
