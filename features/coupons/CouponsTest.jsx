// src/features/coupons/CouponsTest.js
import React, { useState } from 'react';
import { 
  useValidateCouponQuery,
  useGetActivePromotionsQuery
} from './couponsSlice';

const CouponsTest = () => {
  const [couponCode, setCouponCode] = useState('');
  const [subtotal, setSubtotal] = useState(100);
  const [promotionsPage, setPromotionsPage] = useState(1);
  const [promotionsLimit, setPromotionsLimit] = useState(10);

  // RTK Query hooks
  const {
    data: couponValidation,
    error: couponError,
    isLoading: couponLoading,
    refetch: validateCoupon
  } = useValidateCouponQuery({ code: couponCode, subtotal }, {
    skip: !couponCode
  });

  const {
    data: promotionsResponse,
    error: promotionsError,
    isLoading: promotionsLoading
  } = useGetActivePromotionsQuery({ 
    page: promotionsPage, 
    limit: promotionsLimit 
  });

  const handleCouponValidation = (e) => {
    e.preventDefault();
    if (couponCode) {
      validateCoupon();
    }
  };

  const handlePrevPage = () => {
    if (promotionsPage > 1) {
      setPromotionsPage(promotionsPage - 1);
    }
  };

  const handleNextPage = () => {
    if (promotionsResponse && promotionsPage < promotionsResponse.meta.last_page) {
      setPromotionsPage(promotionsPage + 1);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Coupons Test UI</h1>
      
      {/* Coupon Validation Section */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Validate Coupon</h2>
        <form onSubmit={handleCouponValidation} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div style={{ flex: '1' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Coupon Code:</label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: '1' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Subtotal (SAR):</label>
            <input
              type="number"
              value={subtotal}
              onChange={(e) => setSubtotal(parseFloat(e.target.value))}
              min="0"
              step="0.01"
              style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ alignSelf: 'flex-end' }}>
            <button 
              type="submit" 
              disabled={!couponCode}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: couponCode ? 'pointer' : 'not-allowed',
                opacity: couponCode ? 1 : 0.6
              }}
            >
              Validate
            </button>
          </div>
        </form>

        {/* Validation Result */}
        {couponLoading && <div>Validating coupon...</div>}
        {couponError && (
          <div style={{ padding: '15px', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '4px' }}>
            <h3 style={{ color: 'green', margin: '0 0 10px 0' }}>Error</h3>
            <p style={{ margin: '0' }}>{couponError.data?.message || 'Failed to validate coupon'}</p>
          </div>
        )}
        {couponValidation && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: couponValidation.valid ? '#e8f5e9' : '#fff3e0', 
            border: `1px solid ${couponValidation.valid ? '#4CAF50' : '#ff9800'}`,
            borderRadius: '4px'
          }}>
            <h3 style={{ 
              color: couponValidation.valid ? '#4CAF50' : '#ff9800', 
              margin: '0 0 10px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              {couponValidation.valid ? (
                <>
                  <span style={{ fontSize: '1.2em' }}>✓</span>
                  Coupon Valid
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.2em' }}>⚠</span>
                  Coupon Invalid
                </>
              )}
            </h3>
            
            {couponValidation.valid && couponValidation.coupon && (
              <div>
                <p><strong>Name:</strong> {couponValidation.coupon.name}</p>
                <p><strong>Code:</strong> {couponValidation.coupon.code}</p>
                <p><strong>Type:</strong> {couponValidation.coupon.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}</p>
                <p><strong>Discount:</strong> 
                  {couponValidation.coupon.type === 'percentage' 
                    ? ` ${couponValidation.coupon.discount}%` 
                    : ` SAR ${couponValidation.coupon.discount.toFixed(2)}`
                  }
                </p>
                <p><strong>Applied Discount:</strong> SAR {couponValidation.coupon.applied_discount.toFixed(2)}</p>
                <p><strong>Minimum Order:</strong> SAR {couponValidation.coupon.minimum_order.toFixed(2)}</p>
                <p><strong>Description:</strong> {couponValidation.coupon.description}</p>
              </div>
            )}
            
            {!couponValidation.valid && (
              <p style={{ margin: '0' }}>{couponValidation.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Active Promotions Section */}
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Active Promotions</h2>
        
        {/* Pagination controls */}
        {promotionsResponse && promotionsResponse.meta && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div>
              <span>Items per page: </span>
              <select 
                value={promotionsLimit} 
                onChange={(e) => setPromotionsLimit(parseInt(e.target.value))}
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
                disabled={promotionsPage === 1}
                style={{ padding: '5px 10px', marginRight: '10px' }}
              >
                Previous
              </button>
              <span>Page {promotionsPage} of {promotionsResponse.meta.last_page}</span>
              <button 
                onClick={handleNextPage} 
                disabled={promotionsPage === promotionsResponse.meta.last_page}
                style={{ padding: '5px 10px', marginLeft: '10px' }}
              >
                Next
              </button>
            </div>
            
            <div>
              <span>Total: {promotionsResponse.meta.total} promotions</span>
            </div>
          </div>
        )}
        
        {/* Promotions list */}
        {promotionsLoading && <div>Loading promotions...</div>}
        {promotionsError && (
          <div style={{ padding: '15px', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '4px' }}>
            Error loading promotions: {promotionsError.message}
          </div>
        )}
        {promotionsResponse && promotionsResponse.data && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
            {promotionsResponse.data.map(promo => (
              <div 
                key={promo.id} 
                style={{ 
                  padding: '15px', 
                  border: '1px solid #ddd', 
                  borderRadius: '5px',
                  backgroundColor: 'green'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>{promo.name}</h3>
                <p style={{ margin: '5px 0' }}><strong>Code:</strong> {promo.code}</p>
                <p style={{ margin: '5px 0' }}><strong>Type:</strong> {promo.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}</p>
                <p style={{ margin: '5px 0' }}><strong>Discount:</strong> 
                  {promo.type === 'percentage' 
                    ? ` ${promo.discount}%` 
                    : ` SAR ${promo.discount.toFixed(2)}`
                  }
                </p>
                <p style={{ margin: '5px 0' }}><strong>Minimum Order:</strong> SAR {promo.minimum_order.toFixed(2)}</p>
                <p style={{ margin: '5px 0' }}><strong>Valid From:</strong> {new Date(promo.valid_from).toLocaleDateString()}</p>
                {promo.valid_until && (
                  <p style={{ margin: '5px 0' }}><strong>Valid Until:</strong> {new Date(promo.valid_until).toLocaleDateString()}</p>
                )}
                {promo.uses_remaining !== null && (
                  <p style={{ margin: '5px 0' }}><strong>Uses Remaining:</strong> {promo.uses_remaining}</p>
                )}
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
                  <p style={{ margin: '0', fontSize: '0.9em' }}>
                    Use code <strong>{promo.code}</strong> to get {promo.type === 'percentage' ? `${promo.discount}% off` : `SAR ${promo.discount.toFixed(2)} off`} on orders over SAR {promo.minimum_order.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {promotionsResponse && promotionsResponse.data && promotionsResponse.data.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No active promotions found
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsTest;