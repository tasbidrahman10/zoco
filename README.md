# 🛍️ ZOCO - Premium E-Commerce Platform

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue?style=for-the-badge&logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**"Wear your desired attire"**

A modern, full-stack e-commerce platform built for clothing brands with a comprehensive admin panel, real-time inventory management, and seamless user experience.

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

---

## 📸 Screenshots

### Customer Interface
![Homepage](https://via.placeholder.com/800x400/ff6b9d/ffffff?text=Homepage+Screenshot)
*Smooth, responsive homepage with featured products*

![Product Detail](https://via.placeholder.com/800x400/c2ffc7/000000?text=Product+Detail+Page)
*Detailed product view with image gallery and size selection*

### Admin Panel
![Admin Dashboard](https://via.placeholder.com/800x400/a8e6cf/000000?text=Admin+Dashboard)
*Comprehensive analytics dashboard with sales insights*

![Product Management](https://via.placeholder.com/800x400/ffd3b6/000000?text=Product+Management)
*Intuitive product management with drag-and-drop image upload*

---

## ✨ Features

### 🛒 **Customer Features**
- **Modern Shopping Experience**
  - Responsive design for mobile, tablet, and desktop
  - Advanced product filtering (category, price range, size)
  - Dynamic search with real-time results
  - Product sorting (price, newest, popularity)
  
- **Seamless Cart & Checkout**
  - Persistent cart across sessions
  - Real-time price calculations
  - Guest checkout option
  - Order tracking dashboard

- **User Authentication**
  - Email/password authentication
  - Google OAuth integration
  - User dashboard with order history
  - Profile and address management

### 🎛️ **Admin Panel**
- **Product Management**
  - Add, edit, and delete products
  - Multi-image upload with Cloudinary integration
  - Size and inventory management by variant
  - Category and tag organization
  - Featured and trending product toggles

- **Order Management**
  - View all orders with filtering options
  - Update order status (Pending → Processing → Shipped → Delivered)
  - Order details with customer information
  - Tracking number assignment

- **Content Management**
  - Update website logo and branding
  - Manage product categories
  - Banner and homepage content control
  - Dynamic text and image editing

- **Analytics Dashboard**
  - Real-time sales tracking
  - Revenue analytics
  - Order statistics
  - Low stock alerts
  - Top-selling products insights

### 🔧 **Technical Features**
- Server-side rendering (SSR) with Next.js
- Type-safe database operations with Prisma
- JWT-based authentication
- Image optimization and CDN delivery
- SEO optimized with metadata
- Responsive animations with Framer Motion
- Form validation with Zod
- Toast notifications for user feedback

---

## 🚀 Tech Stack

### **Frontend**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui, Radix UI
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod

### **Backend**
- **API:** Next.js API Routes
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Image Storage:** Cloudinary

### **DevOps**
- **Hosting:** Vercel
- **Database Hosting:** Supabase
- **Version Control:** Git & GitHub

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database (or Supabase account)
- Cloudinary account
- Google Cloud Console project (for OAuth)

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/zoco-ecommerce.git
cd zoco-ecommerce
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/zoco_db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**How to get these credentials:**
- **DATABASE_URL:** [Supabase Setup Guide](https://supabase.com/docs/guides/database)
- **Google OAuth:** [Google Cloud Console](https://console.cloud.google.com/)
- **Cloudinary:** [Cloudinary Dashboard](https://cloudinary.com/console)
- **NEXTAUTH_SECRET:** Run `openssl rand -base64 32`

### 4. Setup the database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with sample data (optional)
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
zoco-ecommerce/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (shop)/                   # Public shopping routes
│   │   ├── page.tsx              # Homepage
│   │   ├── shop/                 # Products listing
│   │   ├── product/[slug]/       # Product detail
│   │   ├── cart/                 # Shopping cart
│   │   └── checkout/             # Checkout flow
│   ├── dashboard/                # Customer dashboard
│   ├── admin/                    # Admin panel
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── products/             # Product management
│   │   ├── orders/               # Order management
│   │   └── categories/           # Category management
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth config
│   │   ├── products/             # Product CRUD
│   │   ├── orders/               # Order CRUD
│   │   └── upload/               # Image upload
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Shadcn UI components
│   ├── layout/                   # Layout components
│   ├── shop/                     # Shopping components
│   ├── admin/                    # Admin components
│   └── forms/                    # Form components
├── lib/                          # Utility functions
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # NextAuth config
│   ├── utils.ts                  # Helper functions
│   └── validations.ts            # Zod schemas
├── store/                        # State management
│   └── cart.ts                   # Cart store (Zustand)
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed script
├── public/                       # Static files
├── types/                        # TypeScript types
└── package.json
```

---

## 🔐 Authentication Setup

### Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Configure OAuth consent screen
5. Create OAuth 2.0 credentials
6. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```

### Default Admin Account

After seeding the database, use these credentials:
- **Email:** admin@zoco.com
- **Password:** admin123

**⚠️ Change these immediately in production!**

---

## 🗄️ Database Schema

### Core Models

**User**
- Authentication and profile information
- Role-based access control (ADMIN, CUSTOMER)
- Relationship with orders and addresses

**Product**
- Complete product information
- Multi-image support
- Size and inventory management
- Category and tag organization

**Order**
- Order details and items
- Status tracking
- Shipping and billing information
- Payment status

**Category**
- Product categorization
- Hierarchical structure support

View complete schema: [prisma/schema.prisma](prisma/schema.prisma)

---

## 🌐 API Routes

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/[id]` | Get single product |
| GET | `/api/categories` | Get all categories |

### Protected Endpoints (Customer)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get user orders |
| PUT | `/api/user/profile` | Update profile |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create product |
| PUT | `/api/products/[id]` | Update product |
| DELETE | `/api/products/[id]` | Delete product |
| PUT | `/api/orders/[id]` | Update order status |

All admin endpoints require authentication with `role: ADMIN`.

---

## 🎨 Customization

### Changing Theme Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: oklch(0.6209 0.1801 348.1385);
  --secondary: oklch(0.8095 0.0694 198.1863);
  /* ... other colors */
}
```

### Adding New Product Categories

1. Use the admin panel UI, or
2. Directly add to database:
```typescript
await prisma.category.create({
  data: {
    name: "New Category",
    slug: "new-category",
    description: "Category description"
  }
})
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

**Important:** Update these environment variables for production:
```env
NEXTAUTH_URL="https://your-domain.com"
```

### Update Google OAuth

Add production redirect URI in Google Cloud Console:
```
https://your-domain.com/api/auth/callback/google
```

### Database Migration

Run Prisma migrations on production:
```bash
npx prisma migrate deploy
```

---

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **SEO Score:** 100

Optimizations:
- Image optimization with next/image
- Code splitting and lazy loading
- Server-side rendering
- CDN delivery via Cloudinary

---

## 🛡️ Security

- Password hashing with bcrypt
- JWT-based authentication
- CSRF protection (NextAuth)
- SQL injection prevention (Prisma)
- XSS protection
- Environment variable security
- Rate limiting (recommended for production)

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run linting
npm run lint
```

---

## 📝 Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| DATABASE_URL | PostgreSQL connection string | Yes | postgresql://... |
| NEXTAUTH_SECRET | Secret for JWT encryption | Yes | random-string |
| NEXTAUTH_URL | Application URL | Yes | http://localhost:3000 |
| GOOGLE_CLIENT_ID | Google OAuth client ID | Yes | 123456789-abc...apps.googleusercontent.com |
| GOOGLE_CLIENT_SECRET | Google OAuth secret | Yes | GOCSPX-abc123... |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Yes | your-cloud-name |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes | 123456789012345 |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Yes | abc123def456... |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow TypeScript strict mode
- Use ESLint and Prettier
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 🐛 Known Issues

- Payment gateway integration pending
- Email notifications not implemented yet
- Mobile app version in development

See [Issues](https://github.com/yourusername/zoco-ecommerce/issues) for a full list.

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)

---

## 🗺️ Roadmap

- [ ] Payment gateway integration (Stripe, SSLCommerz)
- [ ] Email notifications (order confirmations, shipping updates)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced inventory management
- [ ] Multi-currency support
- [ ] Mobile application (React Native)
- [ ] AI-powered product recommendations
- [ ] Live chat support
- [ ] Abandoned cart recovery

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Tasbid Ahmed**

- LinkedIn: [LinkedIn](https://www.linkedin.com/in/tasbid-a-rahman-/)
- GitHub: [@tasbidrahman10](https://github.com/tasbidrahman10)
- Email: tasbidrahman555@gmail.com


---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting
- [Shadcn](https://twitter.com/shadcn) for the beautiful UI components
- All open-source contributors

---

## 💼 Hire Me

Looking for a developer for your next project? I specialize in:
- **Full-stack Web Development** (Next.js, React, Node.js)
- **E-commerce Solutions** (Custom platforms, Shopify)
- **AI Automation** (Workflow automation, business process optimization)
- **Database Design** (PostgreSQL, MongoDB)

📧 **Available for freelance work and collaborations!**

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Tasbid Ahmed

</div>
