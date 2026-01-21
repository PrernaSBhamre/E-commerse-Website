const { Product } = require('./schemas/product');
const { Category } = require('./schemas/category');
const { connectDB } = require('./index');
const mongoose = require('mongoose');
require('dotenv').config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing categories and products');

    // Sample categories
    const sampleCategories = [
      {
        name: "Electronics",
        image: "https://via.placeholder.com/300x200?text=Electronics",
        description: "Electronic devices and gadgets"
      },
      {
        name: "Clothing & Accessories",
        image: "https://via.placeholder.com/300x200?text=Clothing",
        description: "Fashion and apparel items"
      },
      {
        name: "Home & Furniture",
        image: "https://via.placeholder.com/300x200?text=Home+Furniture",
        description: "Home decor and furniture"
      },
      {
        name: "Beauty & Health",
        image: "https://via.placeholder.com/300x200?text=Beauty+Health",
        description: "Beauty and health products"
      },
      {
        name: "Sports & Fitness",
        image: "https://via.placeholder.com/300x200?text=Sports+Fitness",
        description: "Sports and fitness equipment"
      },
      {
        name: "Toys & Games",
        image: "https://via.placeholder.com/300x200?text=Toys+Games",
        description: "Toys and games for all ages"
      },
      {
        name: "Pets",
        image: "https://via.placeholder.com/300x200?text=Pets",
        description: "Pet supplies and accessories"
      }
    ];

    // Insert categories
    const categories = await Category.insertMany(sampleCategories);
    console.log(`Inserted ${categories.length} categories`);

    // Create a map of category names to ObjectIds
    const categoryMap = {};
    categories.forEach(category => {
      categoryMap[category.name.toLowerCase()] = category._id;
    });

    // Sample products with comprehensive data for all sections
    const sampleProducts = [
      {
        name: "HAVIT HV-G92 Gamepad",
        description: "High-quality wired gamepad with ergonomic design and responsive buttons for ultimate gaming experience.",
        price: 120,
        category: categoryMap['electronics'],
        images: ["https://globalbrandeshop.com/media/thumbnail/I332WE12NH193.jpg"],
        stock: 50,
        flashSale: {
          isActive: true,
          discountPercentage: 40,
          endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          originalPrice: 200
        },
        salesCount: 250,
        averageRating: 4.5,
        totalReviews: 88,
        discountInfo: {
          isActive: true,
          percentage: 40,
          amount: 80,
          savings: 80,
          endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        name: "AK-900 Wired Keyboard",
        description: "Mechanical keyboard with tactile switches, RGB backlighting, and durable construction.",
        price: 960,
        category: categoryMap['electronics'],
        images: ["https://thumb.photo-ac.com/e6/e63ac6d2504334def6ebce5a248d8d31_t.jpeg"],
        stock: 30,
        flashSale: {
          isActive: true,
          discountPercentage: 35,
          endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          originalPrice: 1476
        },
        salesCount: 180,
        averageRating: 4.2,
        totalReviews: 75,
        discountInfo: {
          isActive: true,
          percentage: 35,
          amount: 516,
          savings: 516,
          endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        name: "IPS LCD Gaming Monitor",
        description: "27-inch IPS gaming monitor with 144Hz refresh rate and 1ms response time for smooth gameplay.",
        price: 370,
        category: categoryMap['electronics'],
        images: ["https://www.asus.com/media/Odin/Websites/global/Tab/20240326013834.jpg"],
        stock: 20,
        flashSale: {
          isActive: true,
          discountPercentage: 30,
          endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
          originalPrice: 529
        },
        salesCount: 320,
        averageRating: 4.8,
        totalReviews: 99,
        discountInfo: {
          isActive: true,
          percentage: 30,
          amount: 159,
          savings: 159,
          endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        name: "S-Series Comfort Chair",
        description: "Ergonomic office chair with lumbar support, adjustable height, and breathable mesh material.",
        price: 375,
        category: categoryMap['home & furniture'],
        images: ["https://m.media-amazon.com/images/I/61bN4YgUQ+L.jpg"],
        stock: 15,
        flashSale: {
          isActive: true,
          discountPercentage: 25,
          endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
          originalPrice: 500
        },
        salesCount: 150,
        averageRating: 4.7,
        totalReviews: 99,
        discountInfo: {
          isActive: true,
          percentage: 25,
          amount: 125,
          savings: 125,
          endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        category: categoryMap['electronics'],
        images: ["https://example.com/headphones.jpg"],
        stock: 50,
        flashSale: {
          isActive: true,
          discountPercentage: 30,
          endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          originalPrice: 199.99
        },
        salesCount: 125,
        averageRating: 4.6,
        totalReviews: 85,
        discountInfo: {
          isActive: true,
          percentage: 30,
          amount: 60,
          savings: 60,
          endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        name: "Smartphone",
        description: "Latest model smartphone with advanced features",
        price: 899.99,
        category: categoryMap['electronics'],
        images: ["https://example.com/smartphone.jpg"],
        stock: 25,
        flashSale: {
          isActive: true,
          discountPercentage: 15,
          endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          originalPrice: 899.99
        },
        salesCount: 89,
        averageRating: 4.4,
        totalReviews: 65,
        discountInfo: {
          isActive: true,
          percentage: 15,
          amount: 135,
          savings: 135,
          endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        name: "Running Shoes",
        description: "Comfortable running shoes for athletes",
        price: 129.99,
        category: categoryMap['sports & fitness'],
        images: ["https://example.com/shoes.jpg"],
        stock: 100,
        flashSale: {
          isActive: false,
          discountPercentage: 0,
          endTime: null,
          originalPrice: 129.99
        },
        salesCount: 210,
        averageRating: 4.3,
        totalReviews: 120,
        discountInfo: {
          isActive: false,
          percentage: 0,
          amount: 0,
          savings: 0,
          endTime: null
        },
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
      },
      {
        name: "Coffee Maker",
        description: "Automatic coffee maker with timer",
        price: 79.99,
        category: categoryMap['home & furniture'],
        images: ["https://example.com/coffeemaker.jpg"],
        stock: 30,
        flashSale: {
          isActive: false,
          discountPercentage: 0,
          endTime: null,
          originalPrice: 79.99
        },
        salesCount: 67,
        averageRating: 4.1,
        totalReviews: 45,
        discountInfo: {
          isActive: false,
          percentage: 0,
          amount: 0,
          savings: 0,
          endTime: null
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago (new arrival)
      },
      {
        name: "Laptop",
        description: "Powerful laptop for work and gaming",
        price: 1299.99,
        category: categoryMap['electronics'],
        images: ["https://example.com/laptop.jpg"],
        stock: 15,
        flashSale: {
          isActive: true,
          discountPercentage: 25,
          endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
          originalPrice: 1299.99
        },
        salesCount: 45,
        averageRating: 4.7,
        totalReviews: 75,
        discountInfo: {
          isActive: true,
          percentage: 25,
          amount: 325,
          savings: 325,
          endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
      },
      {
        name: "Winter Jacket",
        description: "Warm winter jacket for cold weather",
        price: 149.99,
        category: categoryMap['clothing & accessories'],
        images: ["https://example.com/jacket.jpg"],
        stock: 40,
        flashSale: {
          isActive: false,
          discountPercentage: 0,
          endTime: null,
          originalPrice: 149.99
        },
        salesCount: 32,
        averageRating: 4.0,
        totalReviews: 30,
        discountInfo: {
          isActive: false,
          percentage: 0,
          amount: 0,
          savings: 0,
          endTime: null
        },
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
      },
      {
        name: "Desk Lamp",
        description: "LED desk lamp with adjustable brightness",
        price: 39.99,
        category: categoryMap['home & furniture'],
        images: ["https://example.com/lamp.jpg"],
        stock: 75,
        flashSale: {
          isActive: true,
          discountPercentage: 40,
          endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
          originalPrice: 39.99
        },
        salesCount: 89,
        averageRating: 4.5,
        totalReviews: 55,
        discountInfo: {
          isActive: true,
          percentage: 40,
          amount: 16,
          savings: 16,
          endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with great sound quality",
        price: 89.99,
        category: categoryMap['electronics'],
        images: ["https://example.com/speaker.jpg"],
        stock: 60,
        flashSale: {
          isActive: false,
          discountPercentage: 0,
          endTime: null,
          originalPrice: 89.99
        },
        salesCount: 156,
        averageRating: 4.2,
        totalReviews: 95,
        discountInfo: {
          isActive: false,
          percentage: 0,
          amount: 0,
          savings: 0,
          endTime: null
        },
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) // 25 days ago
      },
      {
        name: "Smart Watch",
        description: "Feature-rich smartwatch with health monitoring",
        price: 299.99,
        category: categoryMap['electronics'],
        images: ["https://example.com/watch.jpg"],
        stock: 35,
        flashSale: {
          isActive: true,
          discountPercentage: 20,
          endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
          originalPrice: 299.99
        },
        salesCount: 78,
        averageRating: 4.6,
        totalReviews: 70,
        discountInfo: {
          isActive: true,
          percentage: 20,
          amount: 60,
          savings: 60,
          endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) // 12 days ago
      },
      {
        name: "Gaming Mouse",
        description: "High-precision gaming mouse with RGB lighting",
        price: 59.99,
        category: categoryMap['electronics'],
        images: ["https://example.com/mouse.jpg"],
        stock: 80,
        flashSale: {
          isActive: false,
          discountPercentage: 0,
          endTime: null,
          originalPrice: 59.99
        },
        salesCount: 92,
        averageRating: 4.4,
        totalReviews: 60,
        discountInfo: {
          isActive: false,
          percentage: 0,
          amount: 0,
          savings: 0,
          endTime: null
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago (new arrival)
      },
      {
        name: "Breed Dry Dog Food",
        description: "Premium dry dog food for healthy nutrition",
        price: 100,
        category: categoryMap['pets'],
        images: ["https://m.media-amazon.com/images/I/81+mXyq4+jL._AC_SX679_.jpg"],
        stock: 45,
        flashSale: {
          isActive: false,
          discountPercentage: 0,
          endTime: null,
          originalPrice: 100
        },
        salesCount: 120,
        averageRating: 4.1,
        totalReviews: 35,
        discountInfo: {
          isActive: false,
          percentage: 0,
          amount: 0,
          savings: 0,
          endTime: null
        },
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) // 8 days ago
      },
      {
        name: "CANON EOS DSLR Camera",
        description: "Professional DSLR camera for photography enthusiasts",
        price: 360,
        category: categoryMap['electronics'],
        images: ["https://m.media-amazon.com/images/I/71EWRyqzw0L._AC_SX679_.jpg"],
        stock: 12,
        flashSale: {
          isActive: true,
          discountPercentage: 22,
          endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
          originalPrice: 360
        },
        salesCount: 65,
        averageRating: 4.8,
        totalReviews: 95,
        discountInfo: {
          isActive: true,
          percentage: 22,
          amount: 79,
          savings: 79,
          endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
      },
      {
        name: "ASUS FHD Gaming Laptop",
        description: "High-performance gaming laptop with dedicated graphics",
        price: 700,
        category: categoryMap['electronics'],
        images: ["https://m.media-amazon.com/images/I/81w+-iM3B0L._AC_SX679_.jpg"],
        stock: 8,
        flashSale: {
          isActive: true,
          discountPercentage: 18,
          endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
          originalPrice: 700
        },
        salesCount: 150,
        averageRating: 4.7,
        totalReviews: 125,
        discountInfo: {
          isActive: true,
          percentage: 18,
          amount: 126,
          savings: 126,
          endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
      },
      {
        name: "Curology Product Set",
        description: "Complete skincare product set for daily care",
        price: 500,
        category: categoryMap['beauty & health'],
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"],
        stock: 25,
        flashSale: {
          isActive: true,
          discountPercentage: 15,
          endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
          originalPrice: 500
        },
        salesCount: 95,
        averageRating: 4.5,
        totalReviews: 85,
        discountInfo: {
          isActive: true,
          percentage: 15,
          amount: 75,
          savings: 75,
          endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        name: "Kids Electric Car",
        description: "Safe electric car for kids with remote control",
        price: 960,
        category: categoryMap['toys & games'],
        images: ["https://m.media-amazon.com/images/I/61kMLykR7IL._AC_SX679_.jpg"],
        stock: 5,
        flashSale: {
          isActive: true,
          discountPercentage: 25,
          endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          originalPrice: 960
        },
        salesCount: 40,
        averageRating: 4.9,
        totalReviews: 50,
        discountInfo: {
          isActive: true,
          percentage: 25,
          amount: 240,
          savings: 240,
          endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago (new arrival)
      },
      {
        name: "Jr. Zoom Soccer Cleats",
        description: "High-quality soccer cleats for junior players",
        price: 1160,
        category: categoryMap['sports & fitness'],
        images: ["https://m.media-amazon.com/images/I/51+P9Cg+jUL._AC_SY675_.jpg"],
        stock: 18,
        flashSale: {
          isActive: false,
          discountPercentage: 0,
          endTime: null,
          originalPrice: 1160
        },
        salesCount: 35,
        averageRating: 4.3,
        totalReviews: 25,
        discountInfo: {
          isActive: false,
          percentage: 0,
          amount: 0,
          savings: 0,
          endTime: null
        },
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) // 9 days ago
      },
      {
        name: "GP11 Shooter USB Gamepad",
        description: "Ergonomic USB gamepad with responsive controls",
        price: 660,
        category: categoryMap['electronics'],
        images: ["https://m.media-amazon.com/images/I/61s+I6X6KqL._AC_SX679_.jpg"],
        stock: 22,
        flashSale: {
          isActive: false,
          discountPercentage: 0,
          endTime: null,
          originalPrice: 660
        },
        salesCount: 75,
        averageRating: 4.4,
        totalReviews: 65,
        discountInfo: {
          isActive: false,
          percentage: 0,
          amount: 0,
          savings: 0,
          endTime: null
        },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        name: "Quilted Satin Jacket",
        description: "Stylish quilted satin jacket for casual wear",
        price: 660,
        category: categoryMap['clothing & accessories'],
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"],
        stock: 15,
        flashSale: {
          isActive: false,
          discountPercentage: 0,
          endTime: null,
          originalPrice: 660
        },
        salesCount: 55,
        averageRating: 4.2,
        totalReviews: 40,
        discountInfo: {
          isActive: false,
          percentage: 0,
          amount: 0,
          savings: 0,
          endTime: null
        },
        createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000) // 11 days ago
      },
      {
        name: "PlayStation 5",
        description: "Next-generation gaming console with ultra-high speed SSD",
        price: 499.99,
        category: categoryMap['electronics'],
        images: ["https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"],
        stock: 10,
        flashSale: {
          isActive: true,
          discountPercentage: 12,
          endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
          originalPrice: 499.99
        },
        salesCount: 200,
        averageRating: 4.9,
        totalReviews: 150,
        discountInfo: {
          isActive: true,
          percentage: 12,
          amount: 60,
          savings: 60,
          endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago (new arrival)
      },
      {
        name: "Women's Collections",
        description: "Featured woman collections that give you another vibe",
        price: 129.99,
        category: categoryMap['clothing & accessories'],
        images: ["https://images.unsplash.com/photo-1520170350707-b21e56ca9805?q=80&w=2073&auto=format&fit=crop"],
        stock: 35,
        flashSale: {
          isActive: true,
          discountPercentage: 20,
          endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
          originalPrice: 129.99
        },
        salesCount: 180,
        averageRating: 4.6,
        totalReviews: 90,
        discountInfo: {
          isActive: true,
          percentage: 20,
          amount: 26,
          savings: 26,
          endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        name: "Wireless Speakers",
        description: "Amazon wireless speakers with premium sound quality",
        price: 79.99,
        category: categoryMap['electronics'],
        images: ["https://m.media-amazon.com/images/I/71u79k3hXIL._AC_SX679_.jpg"],
        stock: 40,
        flashSale: {
          isActive: true,
          discountPercentage: 25,
          endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
          originalPrice: 79.99
        },
        salesCount: 165,
        averageRating: 4.3,
        totalReviews: 75,
        discountInfo: {
          isActive: true,
          percentage: 25,
          amount: 20,
          savings: 20,
          endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        name: "Gucci Intense Oud Perfume",
        description: "Luxury perfume with intense oud fragrance",
        price: 199.99,
        category: categoryMap['beauty & health'],
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"],
        stock: 25,
        flashSale: {
          isActive: true,
          discountPercentage: 30,
          endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
          originalPrice: 199.99
        },
        salesCount: 95,
        averageRating: 4.7,
        totalReviews: 65,
        discountInfo: {
          isActive: true,
          percentage: 30,
          amount: 60,
          savings: 60,
          endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
        },
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
      }
    ];

    // Insert the sample products
    await Product.insertMany(sampleProducts);
    console.log(`Successfully inserted ${sampleProducts.length} products`);

    // Log final statistics
    const totalCategories = await Category.countDocuments();
    const totalProducts = await Product.countDocuments();
    console.log(`Final counts - Categories: ${totalCategories}, Products: ${totalProducts}`);

    // Count flash sales
    const flashSalesCount = await Product.countDocuments({ 'flashSale.isActive': true });
    console.log(`Products on flash sale: ${flashSalesCount}`);

    // Count best sellers
    const bestSellers = await Product.find().sort({ salesCount: -1 }).limit(5);
    console.log('Top 5 best sellers:');
    bestSellers.forEach(product => {
      console.log(`  - ${product.name}: ${product.salesCount} sales`);
    });

    // Count new arrivals
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(5);
    console.log('Top 5 new arrivals:');
    newArrivals.forEach(product => {
      console.log(`  - ${product.name}: Added on ${product.createdAt.toDateString()}`);
    });

    console.log('Database seeding completed successfully!');

    // Close connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;