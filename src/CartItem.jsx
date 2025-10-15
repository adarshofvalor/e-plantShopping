import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items || []);
  const dispatch = useDispatch();

  // Helper to convert "$12" or "12" to number safely
  const parseCost = (costStr) => {
    if (typeof costStr === 'number') return costStr;
    // remove any non numeric characters except dot and minus
    const num = parseFloat(String(costStr).replace(/[^0-9.-]+/g, ''));
    return Number.isNaN(num) ? 0 : num;
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseCost(item.cost);
      const qty = item.quantity || 1;
      return sum + price * qty;
    }, 0);
    // Return as string with 2 decimals (but keep numeric semantics if needed)
    return total.toFixed(2);
  };

  // Continue shopping button handler (calls parent callback)
  const handleContinueShopping = (e) => {
    e && e.preventDefault && e.preventDefault();
    if (onContinueShopping) onContinueShopping();
  };

  // Increment an item's quantity
  const handleIncrement = (item) => {
    const newQty = (item.quantity || 1) + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQty }));
  };

  // Decrement an item's quantity, or remove if it would go to 0
  const handleDecrement = (item) => {
    const currentQty = item.quantity || 1;
    if (currentQty > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: currentQty - 1 }));
    } else {
      // if quantity would drop to 0, remove the item
      dispatch(removeItem(item.name));
    }
  };

  // Remove (delete) item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate the subtotal cost for a single item (price * qty)
  const calculateTotalCost = (item) => {
    const price = parseCost(item.cost);
    const qty = item.quantity || 1;
    return (price * qty).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.length === 0 ? (
          <p style={{ color: 'black' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit: ${parseCost(item.cost).toFixed(2)}</div>

                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity || 1}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>

                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
        {/* You could display additional summary info here */}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => { e.preventDefault(); alert('Functionality to be added for future reference'); }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
