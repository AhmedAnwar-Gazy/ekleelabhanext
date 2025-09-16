// src/features/categories/CategoriesTest.js
import React, { useState } from 'react';
import { 
  useGetCategoryTreeQuery, 
  useGetCategoryByIdQuery,
  useGetProductsByCategoryQuery
} from './categoriesSlice';

const CategoriesTest = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [productsPage, setProductsPage] = useState(1);
  const [productsLimit, setProductsLimit] = useState(10);

  // RTK Query hooks
  const { 
    data: categoryResponse, 
    error: treeError, 
    isLoading: treeLoading 
  } = useGetCategoryTreeQuery();

  const { 
    data: categoryDetails, 
    error: categoryError, 
    isLoading: categoryLoading 
  } = useGetCategoryByIdQuery(selectedCategoryId, {
    skip: !selectedCategoryId
  });

  const { 
    data: categoryProducts, 
    error: productsError, 
    isLoading: productsLoading 
  } = useGetProductsByCategoryQuery({
    id: selectedCategoryId,
    params: { page: productsPage, limit: productsLimit }
  }, {
    skip: !selectedCategoryId
  });

  // Extract categories from response
  const categories = categoryResponse?.tree || [];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setProductsPage(1); // Reset to first page when selecting a new category
  };

  const handlePrevPage = () => {
    if (productsPage > 1) {
      setProductsPage(productsPage - 1);
    }
  };

  const handleNextPage = () => {
    if (categoryProducts && productsPage < categoryProducts.meta.last_page) {
      setProductsPage(productsPage + 1);
    }
  };

  // Handle image errors
  const handleImageError = (e) => {
    e.target.style.display = 'none'; // Hide broken images
  };

  // Recursive component to render category tree
  const CategoryTree = ({ categories, level = 0 }) => {
    if (!categories || categories.length === 0) return null;

    return (
      <ul style={{ 
        paddingLeft: level > 0 ? '20px' : '0', 
        margin: '5px 0',
        listStyle: 'none'
      }}>
        {categories.map(category => (
          <li key={category.id} style={{ marginBottom: '5px' }}>
            <div 
              style={{ 
                padding: '5px 10px', 
                backgroundColor: selectedCategoryId === category.id ? '#e3f2fd' : 'transparent',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name} 
              {category.product_count !== undefined && (
                <span style={{ fontSize: '0.8em', color: '#666', marginLeft: '10px' }}>
                  ({category.product_count} products)
                </span>
              )}
            </div>
            {category.children && category.children.length > 0 && (
              <CategoryTree categories={category.children} level={level + 1} />
            )}
          </li>
        ))}
      </ul>
    );
  };

  if (treeLoading) return <div>Loading category tree...</div>;
  if (treeError) return <div>Error loading category tree: {treeError.message}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '20px' }}>
      {/* Left sidebar - Category tree */}
      <div style={{ flex: '0 0 300px', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
        <h2>Category Tree</h2>
        <CategoryTree categories={categories} />
      </div>

      {/* Right content - Category details and products */}
      <div style={{ flex: '1' }}>
        {!selectedCategoryId ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            Select a category to view details and products
          </div>
        ) : (
          <>
            {/* Category Details */}
            {categoryLoading && <div>Loading category details...</div>}
            {categoryError && <div>Error loading category: {categoryError.message}</div>}
            {categoryDetails && (
              <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <h2>{categoryDetails.category?.name}</h2>
                {categoryDetails.category?.image && (
                  <img 
                    src={categoryDetails.category.image} 
                    alt={categoryDetails.category.name}
                    style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '15px' }}
                    loading="lazy"
                    onError={handleImageError}
                  />
                )}
                <p>{categoryDetails.category?.description}</p>
                
                {/* Breadcrumb */}
                {categoryDetails.category?.breadcrumb && categoryDetails.category.breadcrumb.length > 0 && (
                  <div style={{ marginBottom: '15px', fontSize: '0.9em' }}>
                    <strong>Breadcrumb: </strong>
                    {categoryDetails.category.breadcrumb.map((item, index) => (
                      <span key={item.id}>
                        {index > 0 && ' > '}
                        <span 
                          style={{ cursor: 'pointer', color: '#2196F3' }}
                          onClick={() => handleCategorySelect(item.id)}
                        >
                          {item.name}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Parent category */}
                {categoryDetails.category?.parent && (
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Parent Category: </strong>
                    <span 
                      style={{ cursor: 'pointer', color: '#2196F3' }}
                      onClick={() => handleCategorySelect(categoryDetails.category.parent.id)}
                    >
                      {categoryDetails.category.parent.name}
                    </span>
                  </div>
                )}
                
                {/* Children categories */}
                {categoryDetails.category?.children && categoryDetails.category.children.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Subcategories:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                      {categoryDetails.category.children.map(child => (
                        <div 
                          key={child.id}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '120px'
                          }}
                          onClick={() => handleCategorySelect(child.id)}
                        >
                          <div>{child.name}</div>
                          {child.image && (
                            <img 
                              src={child.image} 
                              alt={child.name}
                              style={{ width: '50px', height: '50px', objectFit: 'contain', marginTop: '5px' }}
                              loading="lazy"
                              onError={handleImageError}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Products in Category */}
            <div>
              <h3>Products in Category</h3>
              
              {/* Pagination controls */}
              {categoryProducts && categoryProducts.meta && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div>
                    <span>Items per page: </span>
                    <select 
                      value={productsLimit} 
                      onChange={(e) => setProductsLimit(parseInt(e.target.value))}
                      style={{ padding: '5px', margin: '0 10px' }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                  
                  <div>
                    <button 
                      onClick={handlePrevPage} 
                      disabled={productsPage === 1}
                      style={{ padding: '5px 10px', marginRight: '10px' }}
                    >
                      Previous
                    </button>
                    <span>Page {productsPage} of {categoryProducts.meta.last_page}</span>
                    <button 
                      onClick={handleNextPage} 
                      disabled={productsPage === categoryProducts.meta.last_page}
                      style={{ padding: '5px 10px', marginLeft: '10px' }}
                    >
                      Next
                    </button>
                  </div>
                  
                  <div>
                    <span>Total: {categoryProducts.meta.total} products</span>
                  </div>
                </div>
              )}
              
              {/* Products list */}
              {productsLoading && <div>Loading products...</div>}
              {productsError && <div>Error loading products: {productsError.message}</div>}
              {categoryProducts && categoryProducts.data && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                  {categoryProducts.data.map(product => (
                    <div 
                      key={product.id} 
                      style={{ 
                        padding: '15px', 
                        border: '1px solid #ddd', 
                        borderRadius: '5px',
                        textAlign: 'center',
                        minHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
                            loading="lazy"
                            onError={handleImageError}
                          />
                        )}
                        <h4>{product.name}</h4>
                      </div>
                      <div>
                        <div style={{ marginBottom: '10px' }}>
                          {product.final_price !== undefined && product.final_price !== product.price ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '5px' }}>
                                ${product.price?.toFixed(2)}
                              </span>
                              <span style={{ color: '#e53935', fontWeight: 'bold' }}>
                                ${product.final_price?.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span>${product.price?.toFixed(2)}</span>
                          )}
                        </div>
                        <div style={{ color: product.in_stock ? '#4caf50' : '#f44336' }}>
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {categoryProducts && categoryProducts.data && categoryProducts.data.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  No products found in this category
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesTest;