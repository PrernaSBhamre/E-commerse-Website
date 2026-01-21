# Backend Setup and Seeding Guide

## Database Seeding

This project includes comprehensive seed data to initialize your database with realistic product information for all sections of the e-commerce website.

### Seed Scripts

There are two seed scripts available:

1. **Basic seeding** - Only creates categories and products:
   ```bash
   npm run seed
   ```

2. **Full seeding** - Creates categories, products, and runs additional initialization:
   ```bash
   npm run seed-all
   ```

### Data Structure

The seed data includes:

- **7 Categories**: Electronics, Clothing & Accessories, Home & Furniture, Beauty & Health, Sports & Fitness, Toys & Games, Pets
- **25+ Products**: Comprehensive product data with:
  - Realistic pricing and inventory
  - Flash sale configurations
  - Sales count for best-selling calculations
  - Average ratings and review counts
  - Proper categorization
  - Creation dates for new arrivals
  - Discount information

### Product Features Included

Each product has detailed information for all sections of the e-commerce site:

- **Flash Sales**: Products with active/inactive flash sales for the FlashSales component
- **Best Sellers**: Products with high sales counts for the BestSelling component  
- **New Arrivals**: Products with recent creation dates for the NewArrival component
- **General Products**: Complete product catalog for the ExploreProducts component

### Running the Seeding Process

1. Ensure your MongoDB is running and connection string is configured in `.env`
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Run the seed script: `npm run seed` or `npm run seed-all`
5. The script will:
   - Clear existing data
   - Create categories
   - Create products with all necessary data
   - Show statistics about the created data

### Product Schema Compatibility

The seed data is structured to match your product schema with all required fields:
- `name`, `description`, `price`, `category`, `images`, `stock`
- `flashSale` with `isActive`, `discountPercentage`, `endTime`, `originalPrice`
- `salesCount` for best-selling calculations
- `averageRating`, `totalReviews` for reviews
- `discountInfo` with detailed discount data
- `createdAt` for new arrivals

The seeded data ensures that all components of your e-commerce site (FlashSales, BestSelling, NewArrival, ExploreProducts) will have relevant data to display.