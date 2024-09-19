import './Shop.css';
import { useState, useEffect } from 'react';

const products = [
  {
    id: 1,
    title: 'Vanilla Ice Cream ',
    price: '$10.00',
    rating: 5,
    image: '/shop/Product-1.jpg',
  },
  {
    id: 2,
    title: 'Italian Bread ',
    price: '$15.00',
    rating: 5,
    image: '/shop/Product-4.jpg',
  },
  {
    id: 3,
    title: 'Quality Ice Cream ',
    price: '$15.00',
    rating: 5,
    image: '/shop/Product-3.jpg',
  },
  {
    id: 4,
    title: 'Cone Ice Cream ',
    price: '$15.00',
    rating: 5,
    image: '/shop/Product-2.jpg',
  },
];

const duplicateProducts = [...products, ...products, ...products]; // Duplicate items for smooth scrolling

function Shop() {
  const [currentIndex, setCurrentIndex] = useState(products.length);
  const intervalTime = 5000; // Auto-scroll interval time in milliseconds

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : duplicateProducts.length / 3 - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < duplicateProducts.length - 1 ? prevIndex + 1 : products.length
    );
  };

  useEffect(() => {
    // Auto-scroll logic
    const autoScroll = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < duplicateProducts.length - 1 ? prevIndex + 1 : products.length
      );
    }, intervalTime);

    // Cleanup interval on component unmount
    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="shop-container">
      <div className='shop-text'>
        <p className='para-shop'>OUR SHOP</p>
        <div className="heading-container">
          <h1 className='heading-shop'>Our all Delicious <br /> Products.</h1>
        </div>
      </div>

      <div className="carousel-container">
        <button className="carousel-button prev" onClick={handlePrev}>‹</button>
        <div className="product-carousel" style={{ transform: `translateX(-${currentIndex * 250}px)` }}>
          {duplicateProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-price">{product.price}</div>
              <img src={product.image} alt={product.title} className="product-image" />
              <h2 className='product-title'>{product.title}</h2>
              <p className="product-rating">
                {'★'.repeat(product.rating)}
                {'☆'.repeat(5 - product.rating)}
              </p>
              <button className="add-to-cart-button"><span>Add to Cart</span></button>
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={handleNext}>›</button>
      </div>
    </div>
  );
}

export default Shop;
