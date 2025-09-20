# ShopEase - Modern E-commerce Website

A fully functional, responsive e-commerce website built with HTML, CSS, and JavaScript.

## Features

- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Product Catalog**: 16 sample products across 4 categories (Electronics, Clothing, Home & Garden, Sports)
- **Shopping Cart**: Full cart functionality with add/remove items, quantity controls, and total calculation
- **Product Filtering**: Filter by category and sort by price or name
- **Search Functionality**: Search products by name or category
- **Interactive UI**: Smooth scrolling, hover effects, and loading animations
- **Mobile-Friendly**: Touch gestures and responsive navigation

## How to Use

1. Open `index.html` in your web browser
2. Browse products by scrolling down or clicking category cards
3. Use the search bar to find specific products
4. Filter products using the dropdown menus
5. Add products to cart by clicking "Add to Cart"
6. View your cart by clicking the cart icon in the header
7. Manage cart items (adjust quantities, remove items)
8. Proceed to checkout when ready

## File Structure

```
ecommerce-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox, Grid, animations, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Typography (loaded via CDN)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization

### Adding New Products
Edit the `products` array in `script.js` to add new products:

```javascript
{
    id: 17,
    name: "Your Product Name",
    category: "electronics", // or "clothing", "home", "sports"
    price: 99.99,
    image: "🎮", // Use emoji or replace with actual image URLs
    badge: "new" // "new", "sale", "featured", or ""
}
```

### Styling
Modify `styles.css` to change colors, fonts, or layout. Key CSS variables are defined at the top of the file.

### Functionality
Extend `script.js` to add new features like user accounts, payment processing, or product reviews.

## Future Enhancements

- User authentication and accounts
- Payment gateway integration
- Product reviews and ratings
- Wishlist functionality
- Order history
- Admin panel for product management
- Real product images
- Database integration

## License

This project is open source and available under the MIT License.

---

**ShopEase** - Your trusted online shopping destination! 🛍️
