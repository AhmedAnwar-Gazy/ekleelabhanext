// src/features/cart/CartTest.js
import React, { useState } from 'react';
import { 
  useGetCartQuery, 
  useAddToCartMutation, 
  useUpdateCartItemMutation, 
  useRemoveFromCartMutation, 
  useClearCartMutation,
  selectAllCartItems,
  selectCartTotals
} from './cartSlice';
import { useSelector } from 'react-redux';

const CartTest = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [updateItemId, setUpdateItemId] = useState('');
  const [updateQuantity, setUpdateQuantity] = useState(1);
  const [removeItemId, setRemoveItemId] = useState('');

  // RTK Query hooks
  const { data: cart, error, isLoading, refetch } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  // Selectors
  const cartItems = useSelector(state => selectAllCartItems(state));
  const cartTotals = useSelector(selectCartTotals);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart({ 
        product_id: parseInt(productId), 
        quantity: parseInt(quantity) 
      }).unwrap();
      setProductId('');
      setQuantity(1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleUpdateCartItem = async (e) => {
    e.preventDefault();
    try {
      await updateCartItem({ 
        id: updateItemId, 
        quantity: parseInt(updateQuantity) 
      }).unwrap();
      setUpdateItemId('');
      setUpdateQuantity(1);
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  };

  const handleRemoveFromCart = async (e) => {
    e.preventDefault();
    try {
      await removeFromCart(removeItemId).unwrap();
      setRemoveItemId('');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Shopping Cart Test UI</h1>
      
      {/* Cart Summary */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Cart Summary</h2>
        {cartTotals ? (
          <div>
            <p>Total Items: {cartTotals.totalItems}</p>
            <p>Subtotal: ${cartTotals.subtotal?.toFixed(2)}</p>
            <p>Tax: ${cartTotals.tax?.toFixed(2)}</p>
            <p>Shipping: ${cartTotals.shipping?.toFixed(2)}</p>
            <p><strong>Grand Total: ${cartTotals.totalPrice?.toFixed(2)}</strong></p>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      {/* Add Item to Cart */}
      <form onSubmit={handleAddToCart} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Add Item to Cart</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Product ID:</label>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add to Cart
        </button>
      </form>

      {/* Update Cart Item */}
      <form onSubmit={handleUpdateCartItem} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Update Cart Item</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Cart Item ID:</label>
          <input
            type="text"
            value={updateItemId}
            onChange={(e) => setUpdateItemId(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>New Quantity:</label>
          <input
            type="number"
            value={updateQuantity}
            onChange={(e) => setUpdateQuantity(e.target.value)}
            min="1"
            required
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}>
          Update Item
        </button>
      </form>

      {/* Remove Item from Cart */}
      <form onSubmit={handleRemoveFromCart} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Remove Item from Cart</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Cart Item ID:</label>
          <input
            type="text"
            value={removeItemId}
            onChange={(e) => setRemoveItemId(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
          Remove Item
        </button>
      </form>

      {/* Clear Cart Button */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleClearCart} style={{ padding: '10px 15px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '4px' }}>
          Clear Entire Cart
        </button>
      </div>

      {/* Refresh Cart Button */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={refetch} style={{ padding: '10px 15px', backgroundColor: '#9e9e9e', color: 'white', border: 'none', borderRadius: '4px' }}>
          Refresh Cart
        </button>
      </div>

      {/* Cart Items List */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>Cart Items</h2>
        {cartItems && cartItems.length > 0 ? (
          <div>
            {cartItems.map(item => (
              <div key={item.cart_id || item.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <h3>{item.name || `Product ${item.product_id}`}</h3>
                <p>ID: {item.cart_id || item.id}</p>
                <p>Product ID: {item.product_id}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price?.toFixed(2)}</p>
                <p>Final Price: ${item.final_price?.toFixed(2)}</p>
                <p>Subtotal: ${(item.quantity * (item.final_price || item.price || 0)).toFixed(2)}</p>
                <p>In Stock: {item.in_stock ? 'Yes' : 'No'}</p>
                {item.max_quantity && <p>Max Available: {item.max_quantity}</p>}
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No items in cart</p>
        )}
      </div>

      {/* Raw Cart Data (for debugging) */}
      <details style={{ marginBottom: '20px' }}>
        <summary>Raw Cart Data (Debug)</summary>
        <pre style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px', overflow: 'auto' }}>
          {JSON.stringify(cart, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default CartTest;