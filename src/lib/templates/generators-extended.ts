import { Template } from './index'

export function generateRestaurantHTML(template: Template, mockData: any, customPrompt?: string, projectName?: string): string {
  const restaurantName = projectName || mockData.restaurantName || 'Bella Vista'
  const cuisine = mockData.cuisine || 'Fine Dining Restaurant'
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${restaurantName} - ${cuisine}</title>
    <meta name="description" content="Experience exceptional ${cuisine.toLowerCase()} at ${restaurantName}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Playfair Display', Georgia, serif;
            line-height: 1.6;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: rgba(0, 0, 0, 0.9);
            color: white;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            backdrop-filter: blur(10px);
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }
        
        .logo {
            font-size: 2rem;
            font-weight: 700;
            color: #d4af37;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .nav-links a {
            text-decoration: none;
            color: white;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
            color: #d4af37;
        }
        
        .hero {
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23d4af37" width="1200" height="600"/><circle fill="%23fff" opacity="0.1" cx="200" cy="150" r="100"/><circle fill="%23fff" opacity="0.1" cx="800" cy="300" r="150"/></svg>');
            background-size: cover;
            background-position: center;
            color: white;
            padding: 120px 0 80px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
        
        .hero-content h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            animation: fadeInUp 1s ease;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .hero-content p {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            animation: fadeInUp 1s ease 0.2s both;
        }
        
        .cta-button {
            display: inline-block;
            padding: 15px 35px;
            background: #d4af37;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            transition: all 0.3s ease;
            animation: fadeInUp 1s ease 0.4s both;
        }
        
        .cta-button:hover {
            background: #b8941f;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        
        .section {
            padding: 80px 0;
        }
        
        .section h2 {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 3rem;
            color: #333;
        }
        
        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .menu-item {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-left: 4px solid #d4af37;
            transition: transform 0.3s ease;
        }
        
        .menu-item:hover {
            transform: translateY(-5px);
        }
        
        .menu-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .menu-item-name {
            font-size: 1.3rem;
            font-weight: 600;
            color: #333;
        }
        
        .menu-item-price {
            font-size: 1.2rem;
            font-weight: 700;
            color: #d4af37;
        }
        
        .menu-item-description {
            color: #666;
            font-style: italic;
        }
        
        .reservation-section {
            background: #f8f9fa;
        }
        
        .reservation-form {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 3rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #d4af37;
        }
        
        .submit-btn {
            width: 100%;
            padding: 15px;
            background: #d4af37;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .submit-btn:hover {
            background: #b8941f;
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
            .hero-content h1 {
                font-size: 2.5rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .menu-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">${restaurantName}</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#menu">Menu</a></li>
                    <li><a href="#reservations">Reservations</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section id="home" class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>${restaurantName}</h1>
                <p>${cuisine}</p>
                <p>Experience culinary excellence in an elegant atmosphere</p>
                <a href="#reservations" class="cta-button">Make a Reservation</a>
            </div>
        </div>
    </section>

    <section id="menu" class="section">
        <div class="container">
            <h2>Our Menu</h2>
            <div class="menu-grid">
                ${(mockData.menuItems || [
                    { name: 'Grilled Salmon', price: '$28', description: 'Fresh Atlantic salmon with seasonal vegetables' },
                    { name: 'Beef Tenderloin', price: '$35', description: 'Prime cut with truffle sauce and roasted potatoes' },
                    { name: 'Vegetarian Risotto', price: '$22', description: 'Creamy arborio rice with wild mushrooms' },
                    { name: 'Chocolate Soufflé', price: '$14', description: 'Decadent chocolate dessert with vanilla ice cream' }
                ]).map((item: any) => `
                    <div class="menu-item">
                        <div class="menu-item-header">
                            <span class="menu-item-name">${item.name}</span>
                            <span class="menu-item-price">${item.price}</span>
                        </div>
                        <p class="menu-item-description">${item.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section id="reservations" class="section reservation-section">
        <div class="container">
            <h2>Make a Reservation</h2>
            <form class="reservation-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="time">Time</label>
                    <select id="time" name="time" required>
                        <option value="">Select Time</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="guests">Number of Guests</label>
                    <select id="guests" name="guests" required>
                        <option value="">Select Guests</option>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6+ Guests</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="special">Special Requests</label>
                    <textarea id="special" name="special" rows="3" placeholder="Any special dietary requirements or requests..."></textarea>
                </div>
                <button type="submit" class="submit-btn">Reserve Table</button>
            </form>
        </div>
    </section>

    <footer id="contact">
        <div class="container">
            <h2>Visit Us</h2>
            <p>📍 123 Gourmet Street, Culinary District</p>
            <p>📞 (555) 123-4567 | 📧 reservations@${restaurantName.toLowerCase().replace(/\s+/g, '')}.com</p>
            <p>🕒 Open Tuesday - Sunday, 5:00 PM - 10:00 PM</p>
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

        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        // Handle form submission
        document.querySelector('.reservation-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your reservation request! We will contact you shortly to confirm.');
        });
    </script>
</body>
</html>`
}

export function generateBlogHTML(template: Template, mockData: any, customPrompt?: string, projectName?: string): string {
  const blogName = projectName || mockData.blogName || 'TechInsights'
  const tagline = mockData.tagline || 'Latest trends in technology and development'
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${blogName} - ${tagline}</title>
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
            background: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
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
            color: #6366f1;
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
            color: #6366f1;
        }
        
        .hero {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 80px 0;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
            padding: 3rem 0;
        }
        
        .posts-grid {
            display: grid;
            gap: 2rem;
        }
        
        .post-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        .post-card:hover {
            transform: translateY(-5px);
        }
        
        .post-image {
            height: 200px;
            background: linear-gradient(45deg, #6366f1, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
        }
        
        .post-content {
            padding: 2rem;
        }
        
        .post-meta {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        .post-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #333;
        }
        
        .post-excerpt {
            color: #666;
            margin-bottom: 1rem;
        }
        
        .read-more {
            color: #6366f1;
            text-decoration: none;
            font-weight: 600;
        }
        
        .sidebar {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            height: fit-content;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        
        .sidebar h3 {
            margin-bottom: 1rem;
            color: #333;
        }
        
        .categories {
            list-style: none;
        }
        
        .categories li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }
        
        .categories a {
            text-decoration: none;
            color: #666;
            transition: color 0.3s ease;
        }
        
        .categories a:hover {
            color: #6366f1;
        }
        
        footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 3rem 0;
            margin-top: 3rem;
        }
        
        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
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
                <div class="logo">${blogName}</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#posts">Posts</a></li>
                    <li><a href="#categories">Categories</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section id="home" class="hero">
        <div class="container">
            <h1>${blogName}</h1>
            <p>${tagline}</p>
        </div>
    </section>

    <div class="container">
        <div class="main-content">
            <main id="posts">
                <div class="posts-grid">
                    ${(mockData.posts || [
                        { title: 'Getting Started with React Hooks', date: '2024-01-15', excerpt: 'Learn how to use React Hooks to build better components...' },
                        { title: 'The Future of Web Development', date: '2024-01-10', excerpt: 'Exploring upcoming trends and technologies in web development...' },
                        { title: 'CSS Grid vs Flexbox: When to Use What', date: '2024-01-05', excerpt: 'A comprehensive guide to choosing the right layout method...' }
                    ]).map((post: any) => `
                        <article class="post-card">
                            <div class="post-image">📝</div>
                            <div class="post-content">
                                <div class="post-meta">Published on ${post.date}</div>
                                <h2 class="post-title">${post.title}</h2>
                                <p class="post-excerpt">${post.excerpt}</p>
                                <a href="#" class="read-more">Read More →</a>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </main>

            <aside class="sidebar">
                <h3>Categories</h3>
                <ul class="categories">
                    <li><a href="#">Web Development</a></li>
                    <li><a href="#">JavaScript</a></li>
                    <li><a href="#">React</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">Node.js</a></li>
                    <li><a href="#">Tutorials</a></li>
                </ul>
            </aside>
        </div>
    </div>

    <footer>
        <div class="container">
            <p>&copy; 2024 ${blogName}. All rights reserved.</p>
            <p>📧 contact@${blogName.toLowerCase().replace(/\s+/g, '')}.com</p>
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
