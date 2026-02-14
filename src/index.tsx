// =================================================================
// BALIK.LAGI - Main Application
// =================================================================

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Bindings } from './types';

// Import routes
import auth from './routes/auth';
import bookings from './routes/bookings';
import services from './routes/services';
import capsters from './routes/capsters';
import branches from './routes/branches';

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for API routes
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Serve static files from public/static directory
app.use('/static/*', serveStatic({ root: './public' }));

// API Routes
app.route('/api/auth', auth);
app.route('/api/bookings', bookings);
app.route('/api/services', services);
app.route('/api/capsters', capsters);
app.route('/api/branches', branches);

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Dashboard Routes - Fixed for Cloudflare Workers
// NOTE: Cloudflare Pages automatically strips .html extension for clean URLs
// Redirect to paths without .html extension
app.get('/dashboard/customer', (c) => {
  return c.redirect('/static/dashboard-customer');
});

app.get('/dashboard/capster', (c) => {
  return c.redirect('/static/dashboard-capster');
});

app.get('/dashboard/admin', (c) => {
  return c.redirect('/static/dashboard-admin');
});

// Home page - ULTRA-SOPHISTICATED UI
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="id" class="dark">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GILANG BARBER - Professional Barbershop Booking</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <script>
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Inter', 'system-ui', 'sans-serif'],
                            serif: ['Playfair Display', 'serif']
                        },
                        colors: {
                            primary: '#B8860B',
                            secondary: '#8B4513',
                            gold: '#D4AF37',
                            dark: {
                                50: '#f8fafc',
                                800: '#1c1917',
                                900: '#0f0f0f',
                                950: '#0a0a0a'
                            }
                        }
                    }
                }
            }
        </script>
        <style>
            .gradient-text {
                background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .glassmorphism {
                background: rgba(15, 15, 15, 0.85);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(212, 175, 55, 0.2);
            }
            .bento-card {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .bento-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 20px 25px -5px rgba(212, 175, 55, 0.3);
                border-color: rgba(212, 175, 55, 0.5);
            }
            .vintage-border {
                border: 2px solid #D4AF37;
                box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.1);
            }
            body {
                background: linear-gradient(to bottom, #0a0a0a 0%, #1c1917 100%);
            }
        </style>
    </head>
    <body class="text-gray-100">
        <!-- Navigation - Vintage Glassmorphism Style -->
        <header class="fixed top-0 left-0 right-0 z-50 glassmorphism">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-20">
                    <div class="flex items-center space-x-4">
                        <div class="w-14 h-14 bg-gradient-to-br from-gold to-primary rounded-full flex items-center justify-center shadow-lg shadow-gold/50 border-2 border-gold/30">
                            <i class="fas fa-scissors text-dark-900 text-xl"></i>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold font-serif gradient-text">GILANG BARBER</h1>
                            <p class="text-xs text-gold tracking-wider">CLASSIC STYLE · MODERN SERVICE</p>
                        </div>
                    </div>
                    <nav class="hidden md:flex items-center space-x-8">
                        <a href="#services" class="text-gray-300 hover:text-gold transition text-sm font-medium tracking-wide">LAYANAN</a>
                        <a href="#about" class="text-gray-300 hover:text-gold transition text-sm font-medium tracking-wide">TENTANG</a>
                        <a href="/login" class="text-gray-300 hover:text-gold transition text-sm font-medium tracking-wide">MASUK</a>
                        <a href="/register" class="px-8 py-3 bg-gradient-to-r from-gold to-primary text-dark-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-gold/50 transition-all tracking-wide">BOOKING</a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Hero Section - Classic Barbershop Elegance -->
        <section class="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen flex items-center">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-5">
                <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212, 175, 55, 0.5) 35px, rgba(212, 175, 55, 0.5) 70px);"></div>
            </div>
            
            <div class="max-w-7xl mx-auto relative w-full">
                <div class="text-center">
                    <!-- Vintage Badge -->
                    <div class="inline-flex items-center px-6 py-3 rounded-full vintage-border mb-8 bg-dark-900/50">
                        <i class="fas fa-award text-gold mr-3 text-lg"></i>
                        <span class="text-sm text-gold font-semibold tracking-widest">PREMIUM BARBERSHOP SEJAK 2020</span>
                    </div>
                    
                    <!-- Main Heading -->
                    <h1 class="text-7xl md:text-8xl lg:text-9xl font-serif font-bold mb-8 tracking-tight">
                        <span class="gradient-text">GILANG</span><br/>
                        <span class="text-white">BARBER</span>
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
                        Pengalaman Cukur Rambut Premium dengan Sentuhan Klasik
                    </p>
                    
                    <p class="text-lg text-gold mb-12 font-serif italic">
                        "Dimana Tradisi Bertemu dengan Inovasi"
                    </p>
                    
                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="/register" class="group relative px-10 py-5 bg-gradient-to-r from-gold to-primary text-dark-900 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/50 tracking-wider">
                            <span class="relative z-10 flex items-center text-lg">
                                <i class="fas fa-calendar-check mr-3"></i>
                                BOOKING SEKARANG
                            </span>
                        </a>
                        <a href="/login" class="px-10 py-5 border-2 border-gold text-gold rounded-xl font-bold hover:bg-gold/10 transition-all tracking-wider">
                            <i class="fas fa-sign-in-alt mr-3"></i>
                            LOGIN
                        </a>
                    </div>
                    
                    <!-- Trust Indicators -->
                    <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div class="flex flex-col items-center space-y-3 p-6 rounded-xl glassmorphism">
                            <i class="fas fa-star text-gold text-3xl"></i>
                            <span class="text-2xl font-bold text-white">500+</span>
                            <span class="text-sm text-gray-400 tracking-wide">Pelanggan Setia</span>
                        </div>
                        <div class="flex flex-col items-center space-y-3 p-6 rounded-xl glassmorphism">
                            <i class="fas fa-users text-gold text-3xl"></i>
                            <span class="text-2xl font-bold text-white">10+</span>
                            <span class="text-sm text-gray-400 tracking-wide">Capster Profesional</span>
                        </div>
                        <div class="flex flex-col items-center space-y-3 p-6 rounded-xl glassmorphism">
                            <i class="fas fa-clock text-gold text-3xl"></i>
                            <span class="text-2xl font-bold text-white">5 Tahun</span>
                            <span class="text-sm text-gray-400 tracking-wide">Pengalaman</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section - Bento Grid Layout -->
        <section id="features" class="py-24 px-4 bg-dark-950\">
            <div class="max-w-7xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <span class="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-4\">FEATURES</span>
                    <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white\">Everything you need,<br/>nothing you don't</h2>
                    <p class="text-xl text-gray-400 max-w-2xl mx-auto\">Powerful features that scale with your business</p>
                </div>

                <!-- Bento Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Large Feature Card -->
                    <div class="lg:col-span-2 lg:row-span-2 bento-card bg-gradient-to-br from-dark-900 to-dark-800 p-8 rounded-2xl border border-gray-800 hover:border-gold/30">
                        <div class="flex items-start justify-between mb-6">
                            <div class="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center">
                                <i class="fas fa-calendar-check text-gold text-2xl"></i>
                            </div>
                            <span class="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full font-semibold">MOST POPULAR</span>
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-3">Intelligent Booking System</h3>
                        <p class="text-gray-400 mb-6 text-lg">
                            Seamless appointment scheduling with real-time availability. Customers choose their preferred capster, time, and service in seconds.
                        </p>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="flex items-center space-x-2 text-sm text-gray-300">
                                <i class="fas fa-check text-gold"></i>
                                <span>Real-time sync</span>
                            </div>
                            <div class="flex items-center space-x-2 text-sm text-gray-300">
                                <i class="fas fa-check text-gold"></i>
                                <span>Auto-confirmation</span>
                            </div>
                            <div class="flex items-center space-x-2 text-sm text-gray-300">
                                <i class="fas fa-check text-gold"></i>
                                <span>WhatsApp reminders</span>
                            </div>
                            <div class="flex items-center space-x-2 text-sm text-gray-300">
                                <i class="fas fa-check text-gold"></i>
                                <span>No-show protection</span>
                            </div>
                        </div>
                    </div>

                    <!-- Feature Card 1 -->
                    <div class="bento-card bg-gradient-to-br from-dark-900 to-dark-800 p-6 rounded-2xl border border-gray-800 hover:border-gold/30">
                        <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                            <i class="fas fa-gift text-orange-500 text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Loyalty Program</h3>
                        <p class="text-gray-400 text-sm">
                            Automatic rewards system that keeps customers coming back
                        </p>
                    </div>

                    <!-- Feature Card 2 -->
                    <div class="bento-card bg-gradient-to-br from-dark-900 to-dark-800 p-6 rounded-2xl border border-gray-800 hover:border-gold/30">
                        <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                            <i class="fas fa-chart-line text-blue-500 text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Analytics Dashboard</h3>
                        <p class="text-gray-400 text-sm">
                            Real-time insights into your business performance
                        </p>
                    </div>

                    <!-- Feature Card 3 -->
                    <div class="bento-card bg-gradient-to-br from-dark-900 to-dark-800 p-6 rounded-2xl border border-gray-800 hover:border-gold/30">
                        <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                            <i class="fas fa-users text-green-500 text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Customer Profiles</h3>
                        <p class="text-gray-400 text-sm">
                            Track preferences and history for personalized service
                        </p>
                    </div>

                    <!-- Feature Card 4 -->
                    <div class="lg:col-span-2 bento-card bg-gradient-to-br from-dark-900 to-dark-800 p-6 rounded-2xl border border-gray-800 hover:border-gold/30">
                        <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                            <i class="fas fa-mobile-alt text-purple-500 text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Mobile-First Experience</h3>
                        <p class="text-gray-400 text-sm">
                            Optimized for mobile devices. Your customers book on the go, anywhere, anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-amber-600 text-white">
            <div class="container mx-auto px-4 text-center">
                <h3 class="text-3xl font-bold mb-4">Siap Untuk Pengalaman Berbeda?</h3>
                <p class="text-xl mb-8">Daftar sekarang dan nikmati kemudahan booking barbershop</p>
                <a href="/register" class="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
                    Mulai Sekarang
                </a>
            </div>
        </section>

        <!-- Footer - Ultra Sophisticated Design -->
        <footer class="bg-dark-950 border-t border-gray-800 pt-16 pb-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Main Footer Content -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    <!-- Brand Section -->
                    <div class="lg:col-span-2">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center">
                                <i class="fas fa-cut text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white">BALIK.LAGI</h3>
                                <p class="text-xs text-gray-400">Enterprise Grade</p>
                            </div>
                        </div>
                        <p class="text-gray-400 text-sm mb-6 max-w-xs">
                            Platform booking barbershop paling canggih di Indonesia. Seamless, elegant, powerful.
                        </p>
                        <!-- Social Media -->
                        <div class="flex space-x-3">
                            <a href="#" class="w-10 h-10 bg-dark-900 hover:bg-gold/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-gold transition-all">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-dark-900 hover:bg-gold/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-gold transition-all">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-dark-900 hover:bg-gold/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-gold transition-all">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="w-10 h-10 bg-dark-900 hover:bg-gold/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-gold transition-all">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Product Links -->
                    <div>
                        <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
                        <ul class="space-y-3">
                            <li><a href="#features" class="text-gray-400 hover:text-gold transition text-sm">Features</a></li>
                            <li><a href="#pricing" class="text-gray-400 hover:text-gold transition text-sm">Pricing</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">API</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Integrations</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Changelog</a></li>
                        </ul>
                    </div>

                    <!-- Company Links -->
                    <div>
                        <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">About Us</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Careers</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Blog</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Press Kit</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Contact</a></li>
                        </ul>
                    </div>

                    <!-- Support Links -->
                    <div>
                        <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Help Center</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Documentation</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Community</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Status</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-gold transition text-sm">Contact Support</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-gray-800 pt-8">
                    <!-- Bottom Footer -->
                    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <!-- Copyright -->
                        <div class="text-gray-400 text-sm">
                            <p>&copy; 2026 <span class="text-white font-semibold">BALIK.LAGI</span>. All rights reserved.</p>
                            <p class="text-xs mt-1">Made with <i class="fas fa-heart text-red-500"></i> for Indonesian Barbershops</p>
                        </div>

                        <!-- Legal Links -->
                        <div class="flex space-x-6 text-sm">
                            <a href="#" class="text-gray-400 hover:text-white transition">Privacy Policy</a>
                            <a href="#" class="text-gray-400 hover:text-white transition">Terms of Service</a>
                            <a href="#" class="text-gray-400 hover:text-white transition">Cookie Policy</a>
                        </div>

                        <!-- Language Selector -->
                        <div class="flex items-center space-x-2">
                            <button class="px-4 py-2 bg-dark-900 hover:bg-dark-800 text-gray-300 rounded-lg text-sm transition-all flex items-center space-x-2">
                                <i class="fas fa-globe"></i>
                                <span>Bahasa Indonesia</span>
                                <i class="fas fa-chevron-down text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    </body>
    </html>
  `);
});

// Login page - Ultra Sophisticated Design
app.get('/login', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="id" class="dark">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login - GILANG BARBER</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <script>
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Inter', 'system-ui', 'sans-serif'],
                            serif: ['Playfair Display', 'serif']
                        },
                        colors: {
                            primary: '#B8860B',
                            gold: '#D4AF37',
                            dark: {
                                800: '#1c1917',
                                900: '#0f0f0f',
                                950: '#0a0a0a'
                            }
                        }
                    }
                }
            }
        </script>
        <style>
            .gradient-text {
                background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .glassmorphism {
                background: rgba(15, 15, 15, 0.85);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(212, 175, 55, 0.2);
            }
            .animated-input {
                position: relative;
            }
            .animated-input input:focus + label,
            .animated-input input:not(:placeholder-shown) + label {
                transform: translateY(-1.5rem) scale(0.85);
                color: #D4AF37;
            }
            .animated-input label {
                position: absolute;
                left: 1rem;
                top: 1rem;
                transition: all 0.2s ease;
                pointer-events: none;
                color: #9ca3af;
            }
            .vintage-border {
                border: 2px solid #D4AF37;
                box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.1);
            }
            body {
                background: linear-gradient(to bottom, #0a0a0a 0%, #1c1917 100%);
            }
        </style>
    </head>
    <body class="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212, 175, 55, 0.5) 35px, rgba(212, 175, 55, 0.5) 70px);"></div>
        </div>
        
        <!-- Login Card -->
        <div class="relative w-full max-w-md">
            <!-- Back to Home Button -->
            <div class="mb-6">
                <a href="/" class="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>
                    <span class="text-sm">Kembali ke Home</span>
                </a>
            </div>

            <!-- Card -->
            <div class="glassmorphism vintage-border rounded-2xl p-10 shadow-2xl">
                <!-- Logo & Title -->
                <div class="text-center mb-10">
                    <div class="w-20 h-20 bg-gradient-to-br from-gold to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/50 border-2 border-gold/30">
                        <i class="fas fa-scissors text-dark-900 text-3xl"></i>
                    </div>
                    <h2 class="text-4xl font-serif font-bold mb-3">
                        <span class="gradient-text">Selamat Datang</span>
                    </h2>
                    <p class="text-gray-400 text-sm tracking-wider">Masuk ke akun GILANG BARBER Anda</p>
                </div>

                <!-- Login Form -->
                <form id="loginForm" class="space-y-6">
                    <!-- Email Field with Animated Label -->
                    <div class="animated-input">
                        <input 
                            type="email" 
                            name="email" 
                            required
                            placeholder=" "
                            class="w-full px-4 py-4 bg-dark-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-white transition-all"
                        >
                        <label class="text-sm font-medium">Email Address</label>
                    </div>

                    <!-- Password Field with Animated Label -->
                    <div class="animated-input">
                        <input 
                            type="password" 
                            name="password" 
                            required
                            placeholder=" "
                            class="w-full px-4 py-4 bg-dark-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-white transition-all"
                        >
                        <label class="text-sm font-medium">Password</label>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between text-sm">
                        <label class="flex items-center text-gray-400 cursor-pointer hover:text-white transition">
                            <input type="checkbox" class="w-4 h-4 rounded border-gray-700 bg-dark-900 text-gold focus:ring-2 focus:ring-gold mr-2">
                            <span>Remember me</span>
                        </label>
                        <a href="#" class="text-gold hover:text-gold transition font-medium">Lupa password?</a>
                    </div>

                    <!-- Error Message -->
                    <div id="error" class="hidden bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm"></div>

                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        class="group relative w-full py-4 bg-gradient-to-r from-gold to-primary text-dark-900 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gold/50 tracking-wider text-lg"
                    >
                        <span class="relative z-10 flex items-center justify-center">
                            <i class="fas fa-sign-in-alt mr-2"></i>
                            MASUK
                        </span>
                    </button>
                </form>

                <!-- Divider -->
                <div class="my-8 flex items-center">
                    <div class="flex-1 border-t border-gold/20"></div>
                    <span class="px-4 text-gray-500 text-sm tracking-wider">ATAU</span>
                    <div class="flex-1 border-t border-gold/20"></div>
                </div>

                <!-- Register Link -->
                <p class="text-center text-gray-400">
                    Belum punya akun? 
                    <a href="/register" class="text-gold hover:text-gold font-bold transition ml-1 tracking-wide">Daftar sekarang</a>
                </p>
            </div>

            <!-- Trust Badge -->
            <div class="mt-6 text-center">
                <div class="inline-flex items-center space-x-2 text-xs text-gray-500">
                    <i class="fas fa-shield-alt text-gold"></i>
                    <span class="tracking-wider">Dilindungi dengan keamanan tingkat enterprise</span>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            document.getElementById('loginForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                    email: formData.get('email'),
                    password: formData.get('password')
                };

                // Show loading state
                const submitButton = e.target.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
                submitButton.disabled = true;

                try {
                    const response = await axios.post('/api/auth/login', data);
                    
                    if (response.data.success) {
                        // FIX: Use redirectTo from backend response (1 Account = 1 Role = 1 Dashboard)
                        const redirectUrl = response.data.redirectTo || '/dashboard/customer';
                        
                        // Show success message
                        submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Success! Redirecting...';
                        submitButton.classList.add('bg-green-600');
                        
                        // Redirect after short delay
                        setTimeout(() => {
                            window.location.href = redirectUrl;
                        }, 500);
                    }
                } catch (error) {
                    const errorDiv = document.getElementById('error');
                    errorDiv.textContent = error.response?.data?.error || 'Login failed. Please try again.';
                    errorDiv.classList.remove('hidden');
                    
                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // Hide error after 5 seconds
                    setTimeout(() => {
                        errorDiv.classList.add('hidden');
                    }, 5000);
                }
            });
        </script>
    </body>
    </html>
  `);
});

// Register page - Ultra Sophisticated Design
app.get('/register', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="id" class="dark">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Daftar - GILANG BARBER</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <script>
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Inter', 'system-ui', 'sans-serif'],
                            serif: ['Playfair Display', 'serif']
                        },
                        colors: {
                            primary: '#B8860B',
                            gold: '#D4AF37',
                            dark: {
                                800: '#1c1917',
                                900: '#0f0f0f',
                                950: '#0a0a0a'
                            }
                        }
                    }
                }
            }
        </script>
        <style>
            .gradient-text {
                background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .glassmorphism {
                background: rgba(15, 15, 15, 0.85);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(212, 175, 55, 0.2);
            }
            .vintage-border {
                border: 2px solid #D4AF37;
                box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.1);
            }
            body {
                background: linear-gradient(to bottom, #0a0a0a 0%, #1c1917 100%);
            }
        </style>
    </head>
    <body class="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212, 175, 55, 0.5) 35px, rgba(212, 175, 55, 0.5) 70px);"></div>
        </div>
        
        <!-- Register Card -->
        <div class="relative w-full max-w-2xl">
            <!-- Back to Home Button -->
            <div class="mb-6">
                <a href="/" class="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i>
                    <span class="text-sm">Kembali ke Home</span>
                </a>
            </div>

            <!-- Card -->
            <div class="glassmorphism vintage-border rounded-2xl p-8 shadow-2xl">
                <!-- Logo & Title -->
                <div class="text-center mb-8">
                    <div class="w-20 h-20 bg-gradient-to-br from-gold to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/50 border-2 border-gold/30">
                        <i class="fas fa-user-plus text-dark-900 text-3xl"></i>
                    </div>
                    <h2 class="text-4xl font-serif font-bold mb-3">
                        <span class="gradient-text">Bergabung Sekarang</span>
                    </h2>
                    <p class="text-gray-400 tracking-wider">Buat akun GILANG BARBER baru</p>
                </div>

                <!-- Register Form -->
                <form id="registerForm" class="space-y-5">
                    <!-- Two Columns Layout -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <!-- Role Select -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-user-tag mr-2 text-gold"></i>Role
                            </label>
                            <select name="role" required
                                    class="w-full px-4 py-3 bg-dark-900 border border-gold/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-white transition-all">
                                <option value="">Pilih Role</option>
                                <option value="customer">Customer</option>
                                <option value="capster">Capster</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <!-- Access Key -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-key mr-2 text-gold"></i>Access Key
                            </label>
                            <input type="text" name="access_key" required
                                   class="w-full px-4 py-3 bg-dark-900 border border-gold/30 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-white transition-all"
                                   placeholder="CUSTOMER_XXXXX">
                        </div>

                        <!-- Full Name -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-user mr-2 text-gold"></i>Nama Lengkap
                            </label>
                            <input type="text" name="customer_name" required
                                   class="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-white transition-all"
                                   placeholder="John Doe">
                        </div>

                        <!-- Phone Number -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-phone mr-2 text-gold"></i>Nomor HP
                            </label>
                            <input type="tel" name="customer_phone"
                                   class="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-white transition-all"
                                   placeholder="+628123456789">
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-envelope mr-2 text-gold"></i>Email
                            </label>
                            <input type="email" name="email" required
                                   class="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-white transition-all"
                                   placeholder="email@example.com">
                        </div>

                        <!-- Password -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                <i class="fas fa-lock mr-2 text-gold"></i>Password
                            </label>
                            <input type="password" name="password" required
                                   class="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent text-white transition-all"
                                   placeholder="Minimal 6 karakter">
                        </div>
                    </div>

                    <!-- Terms & Conditions -->
                    <div class="flex items-start space-x-2">
                        <input type="checkbox" required class="w-5 h-5 mt-1 rounded border-gray-700 bg-dark-900 text-gold focus:ring-2 focus:ring-gold">
                        <label class="text-sm text-gray-400">
                            Saya setuju dengan <a href="#" class="text-gold hover:text-primary transition">Terms of Service</a> 
                            dan <a href="#" class="text-gold hover:text-primary transition">Privacy Policy</a>
                        </label>
                    </div>

                    <!-- Error Message -->
                    <div id="error" class="hidden bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm"></div>

                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        class="group relative w-full py-4 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50"
                    >
                        <span class="relative z-10 flex items-center justify-center">
                            <i class="fas fa-user-plus mr-2"></i>
                            Buat Akun
                        </span>
                        <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                </form>

                <!-- Login Link -->
                <p class="text-center mt-8 text-gray-400">
                    Sudah punya akun? 
                    <a href="/login" class="text-gold hover:text-primary font-semibold transition ml-1">Login sekarang</a>
                </p>
            </div>

            <!-- Trust Badge -->
            <div class="mt-6 text-center">
                <div class="inline-flex items-center space-x-2 text-xs text-gray-500">
                    <i class="fas fa-shield-alt text-gold"></i>
                    <span>Your information is protected with enterprise-grade security</span>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            document.getElementById('registerForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                    email: formData.get('email'),
                    password: formData.get('password'),
                    role: formData.get('role'),
                    access_key: formData.get('access_key'),
                    customer_name: formData.get('customer_name'),
                    customer_phone: formData.get('customer_phone')
                };

                // Show loading state
                const submitButton = e.target.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating account...';
                submitButton.disabled = true;

                try {
                    const response = await axios.post('/api/auth/register', data);
                    
                    if (response.data.success) {
                        // Show success message
                        submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Success! Redirecting to login...';
                        submitButton.classList.add('bg-green-600');
                        
                        // Redirect after short delay
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 1500);
                    }
                } catch (error) {
                    const errorDiv = document.getElementById('error');
                    errorDiv.textContent = error.response?.data?.error || 'Registration failed. Please try again.';
                    errorDiv.classList.remove('hidden');
                    
                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // Hide error after 5 seconds
                    setTimeout(() => {
                        errorDiv.classList.add('hidden');
                    }, 5000);
                }
            });
        </script>
    </body>
    </html>
  `);
});

export default app;
