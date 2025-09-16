// src/features/products/ProductsTest.js
import React, { useState } from 'react';
import { 
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRelatedProductsQuery,
  useGetSimilarProductsQuery,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useGetDealsProductsQuery,
  useAddNewReviewMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation
} from './productsSlice';

// ProductCard component to ensure consistent rendering with proper keys
const ProductCard = ({ 
  product, 
  isSelected, 
  onSelect, 
  onWishlistToggle 
}) => {
  return (
    <div 
      style={{ 
        padding: '15px', 
        border: '1px solid #ddd', 
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#f0f8ff' : 'white'
      }}
      onClick={() => onSelect(product.id)}
    >
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name}
          style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
          loading="lazy"
          onError={(e) => e.target.style.display = 'none'}
        />
      )}
      <h4 style={{ margin: '0 0 10px 0' }}>{product.name}</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {product.special_price && product.special_price < product.price ? (
            <>
              <span style={{ textDecoration: 'line-through', color: 'black', marginRight: '5px' }}>
                ${product.price?.toFixed(2)}
              </span>
              <span style={{ color: 'black', fontWeight: 'bold' }}>
                ${product.special_price?.toFixed(2)}
              </span>
            </>
          ) : (
            <span>${product.price?.toFixed(2)}</span>
          )}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(product.id, product.in_wishlist);
          }}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            color: product.in_wishlist ? '#e91e63' : '#ccc',
            fontSize: '1.2em'
          }}
        >
          {product.in_wishlist ? '❤️' : '🤍'}
        </button>
      </div>
      {product.rating && (
        <div style={{ marginTop: '5px' }}>
          <span style={{ color: '#ffc107' }}>
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
          </span>
          <span style={{ fontSize: '0.9em', color: '#666', marginLeft: '5px' }}>
            ({product.review_count || 0})
          </span>
        </div>
      )}
      <div style={{ 
        color: product.in_stock ? '#4caf50' : '#f44336',
        marginTop: '5px',
        fontSize: '0.9em'
      }}>
        {product.in_stock ? 'In Stock' : 'Out of Stock'}
      </div>
    </div>
  );
};

// MiniProductCard for sidebar sections
const MiniProductCard = ({ product, onSelect }) => {
  return (
    <div 
      style={{ 
        padding: '10px', 
        border: '1px solid #eee', 
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
      onClick={() => onSelect(product.id)}
    >
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name}
          style={{ width: '50px', height: '50px', objectFit: 'contain' }}
          loading="lazy"
          onError={(e) => e.target.style.display = 'none'}
        />
      )}
      <div>
        <div style={{ fontSize: '0.9em' }}>{product.name}</div>
        <div style={{ fontSize: '0.8em', fontWeight: 'bold' }}>
          {product.special_price && product.special_price < product.price ? (
            <>
              <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '5px' }}>
                ${product.price?.toFixed(2)}
              </span>
              <span style={{ color: '#e53935' }}>
                ${product.special_price?.toFixed(2)}
              </span>
            </>
          ) : (
            <span>${product.price?.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductsTest = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    min_price: '',
    max_price: '',
    sort: 'newest',
    page: 1,
    limit: 12,
    brand: ''
  });
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    text: '',
    productId: null
  });

  // RTK Query hooks
  const {
    data: productsResponse,
    error: productsError,
    isLoading: productsLoading,
    refetch: refetchProducts
  } = useGetProductsQuery(searchFilters);

  const {
    data: productDetails,
    error: productError,
    isLoading: productLoading
  } = useGetProductByIdQuery(selectedProductId, {
    skip: !selectedProductId
  });

  const {
    data: relatedProducts,
    isLoading: relatedLoading
  } = useGetRelatedProductsQuery(selectedProductId, {
    skip: !selectedProductId
  });

  const {
    data: similarProducts,
    isLoading: similarLoading
  } = useGetSimilarProductsQuery(selectedProductId, {
    skip: !selectedProductId
  });

  const {
    data: topProducts,
    isLoading: topLoading
  } = useGetTopProductsQuery({ limit: 5 });

  const {
    data: newProducts,
    isLoading: newLoading
  } = useGetNewProductsQuery({ limit: 5 });

  const {
    data: dealsProducts,
    isLoading: dealsLoading
  } = useGetDealsProductsQuery({ limit: 5 });

  // Mutations
  const [addReview] = useAddNewReviewMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setSearchFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
    setReviewForm(prev => ({ ...prev, productId }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.productId || !reviewForm.text) return;
    
    try {
      await addReview({
        productId: reviewForm.productId,
        review: {
          rating: reviewForm.rating,
          text: reviewForm.text
        }
      }).unwrap();
      
      // Reset form
      setReviewForm({
        rating: 5,
        text: '',
        productId: reviewForm.productId
      });
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const handleWishlistToggle = async (productId, isInWishlist) => {
    try {
      if (isInWishlist) {
        await removeFromWishlist(productId).unwrap();
      } else {
        await addToWishlist({ productId }).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Products Test UI</h1>
      
      {/* Filters Section */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Product Filters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
            <input
              type="text"
              name="category"
              value={searchFilters.category}
              onChange={handleFilterChange}
              placeholder="Category ID"
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Min Price:</label>
            <input
              type="number"
              name="min_price"
              value={searchFilters.min_price}
              onChange={handleFilterChange}
              placeholder="Min price"
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Max Price:</label>
            <input
              type="number"
              name="max_price"
              value={searchFilters.max_price}
              onChange={handleFilterChange}
              placeholder="Max price"
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Sort By:</label>
            <select
              name="sort"
              value={searchFilters.sort}
              onChange={handleFilterChange}
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Brand:</label>
            <input
              type="text"
              name="brand"
              value={searchFilters.brand}
              onChange={handleFilterChange}
              placeholder="Brand"
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Items per page:</label>
            <select
              name="limit"
              value={searchFilters.limit}
              onChange={handleFilterChange}
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
            </select>
          </div>
        </div>
        <button 
          onClick={refetchProducts}
          style={{ 
            marginTop: '15px', 
            padding: '10px 15px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Apply Filters
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px' ,color: '#888'}}>
        {/* Main Products List */}
        <div style={{ flex: '2' }}>
          <h2>Products List</h2>
          
          {/* Pagination controls */}
          {productsResponse && productsResponse.pagination && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <span>Page {productsResponse.pagination.current_page} of {productsResponse.pagination.last_page}</span>
              </div>
              
              <div>
                <button 
                  onClick={() => handlePageChange(productsResponse.pagination.current_page - 1)}
                  disabled={productsResponse.pagination.current_page === 1}
                  style={{ padding: '5px 10px', marginRight: '10px' }}
                >
                  Previous
                </button>
                <button 
                  onClick={() => handlePageChange(productsResponse.pagination.current_page + 1)}
                  disabled={productsResponse.pagination.current_page === productsResponse.pagination.last_page}
                  style={{ padding: '5px 10px' }}
                >
                  Next
                </button>
              </div>
              
              <div>
                <span>Total: {productsResponse.pagination.total} products</span>
              </div>
            </div>
          )}
          
          {/* Products grid */}
          {productsLoading && <div>Loading products...</div>}
          {productsError && (
            <div style={{ padding: '15px', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '4px' }}>
              Error loading products: {productsError.message}
            </div>
          )}
          {productsResponse && productsResponse.ids && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              {productsResponse.ids.map(id => (
                <ProductCard
              
                  key={id}
                  product={productsResponse.entities[id]}
                  isSelected={selectedProductId === id}
                  onSelect={handleProductSelect}
                  onWishlistToggle={handleWishlistToggle}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar with product details and special sections */}
        <div style={{ flex: '1' }}>
          {/* Product Details */}
          {selectedProductId && (
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h2>Product Details</h2>
              {productLoading && <div>Loading product details...</div>}
              {productError && (
                <div style={{ padding: '10px', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '4px' }}>
                  Error loading product: {productError.message}
                </div>
              )}
              {productDetails && (
                <div>
                  {productDetails.image && (
                    <img 
                      src={productDetails.image} 
                      alt={productDetails.name}
                      style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginBottom: '10px' }}
                      loading="lazy"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <h3>{productDetails.name}</h3>
                  <p>{productDetails.description}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      {productDetails.special_price && productDetails.special_price < productDetails.price ? (
                        <>
                          <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '5px' }}>
                            ${productDetails.price?.toFixed(2)}
                          </span>
                          <span style={{ color: 'black', fontWeight: 'bold' }}>
                            ${productDetails.special_price?.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span>${productDetails.price?.toFixed(2)}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => handleWishlistToggle(productDetails.id, productDetails.in_wishlist)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        color: productDetails.in_wishlist ? '#e91e63' : '#ccc',
                        fontSize: '1.5em'
                      }}
                    >
                      {productDetails.in_wishlist ? '❤️' : '🤍'}
                    </button>
                  </div>
                  
                  {productDetails.rating && (
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#ffc107' }}>
                        {'★'.repeat(Math.round(productDetails.rating))}
                        {'☆'.repeat(5 - Math.round(productDetails.rating))}
                      </span>
                      <span style={{ fontSize: '0.9em', color: '#666', marginLeft: '5px' }}>
                        ({productDetails.review_count || 0} reviews)
                      </span>
                    </div>
                  )}
                  
                  <div style={{ 
                    color: productDetails.in_stock ? '#4caf50' : '#f44336',
                    marginBottom: '10px'
                  }}>
                    {productDetails.in_stock ? 'In Stock' : 'Out of Stock'}
                  </div>
                  
                  {/* Add Review Form */}
                  <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
                    <h4>Add Review</h4>
                    <form onSubmit={handleReviewSubmit}>
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Rating:</label>
                        <select
                          value={reviewForm.rating}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                          style={{ padding: '5px', width: '100%' }}
                        >
                          <option value="1">1 Star</option>
                          <option value="2">2 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="5">5 Stars</option>
                        </select>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Review:</label>
                        <textarea
                          value={reviewForm.text}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, text: e.target.value }))}
                          placeholder="Write your review here..."
                          style={{ padding: '5px', width: '100%', minHeight: '60px' }}
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={!reviewForm.text}
                        style={{ 
                          padding: '8px 15px', 
                          backgroundColor: '#4CAF50', 
                          color: 'black', 
                          border: 'none', 
                          borderRadius: '4px',
                          cursor: reviewForm.text ? 'pointer' : 'not-allowed',
                          opacity: reviewForm.text ? 1 : 0.6
                        }}
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                  
                  {/* Related Products */}
                  {relatedProducts && relatedProducts.ids && relatedProducts.ids.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      <h4>Related Products</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                        {relatedProducts.ids.slice(0, 4).map(id => (
                          <MiniProductCard
                            key={id}
                            product={relatedProducts.entities[id]}
                            onSelect={handleProductSelect}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Similar Products */}
                  {similarProducts && similarProducts.ids && similarProducts.ids.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      <h4>Similar Products</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                        {similarProducts.ids.slice(0, 4).map(id => (
                          <MiniProductCard
                            key={id}
                            product={similarProducts.entities[id]}
                            onSelect={handleProductSelect}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Top Products */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>Top Selling Products</h3>
            {topLoading && <div>Loading top products...</div>}
            {topProducts && topProducts.ids && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {topProducts.ids.slice(0, 3).map(id => (
                  <MiniProductCard
                    key={id}
                    product={topProducts.entities[id]}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* New Products */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>New Arrivals</h3>
            {newLoading && <div>Loading new products...</div>}
            {newProducts && newProducts.ids && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {newProducts.ids.slice(0, 3).map(id => (
                  <MiniProductCard
                    key={id}
                    product={newProducts.entities[id]}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Deals */}
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h3>Special Deals</h3>
            {dealsLoading && <div>Loading deals...</div>}
            {dealsProducts && dealsProducts.ids && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {dealsProducts.ids.slice(0, 3).map(id => (
                  <MiniProductCard
                    key={id}
                    product={dealsProducts.entities[id]}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTest;