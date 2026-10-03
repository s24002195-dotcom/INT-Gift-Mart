import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('int_gift_mart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('islandwide');
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('int_gift_mart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [shopLogo, setShopLogo] = useState(() => {
    try {
      const saved = localStorage.getItem('int_gift_mart_logo_v2');
      if (saved) return saved;
      return '/images/logo.jpg?v=3';
    } catch (e) {
      return '/images/logo.jpg?v=3';
    }
  });

  const updateShopLogo = (newLogoUrl) => {
    setShopLogo(newLogoUrl);
    try {
      localStorage.setItem('int_gift_mart_logo_v2', newLogoUrl);
    } catch (e) {}
  };

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('int_gift_mart_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [bankSettings, setBankSettings] = useState({
    bank_name: 'Commercial Bank of Ceylon PLC',
    bank_account_name: 'INT Gift Mart (Pvt) Ltd',
    bank_account_number: '8010 4492 1102',
    bank_branch: 'Colombo City / Digital Banking',
    bank_reference_note: 'Your Phone Number / Name',
    shop_phone: '+94 75 325 9928'
  });

  const loadBankSettings = async () => {
    try {
      const res = await fetch('/api/settings/bank');
      if (res.ok) {
        const data = await res.json();
        setBankSettings(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadBankSettings();
  }, []);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('int_gift_mart_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('int_gift_mart_user');
      }
    } catch (e) {}
  }, [currentUser]);


  useEffect(() => {
    try {
      localStorage.setItem('int_gift_mart_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('int_gift_mart_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const addToCart = (product, quantity = 1, selectedOption = null, customDetails = null) => {
    setCartItems(prev => {
      // Find if same item with same option and custom details exists
      const itemKey = `${product.id}-${selectedOption || ''}-${JSON.stringify(customDetails || {})}`;
      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const itemPrice = selectedOption && product.options?.find(o => o.label === selectedOption)?.price 
          ? product.options.find(o => o.label === selectedOption).price 
          : product.price;

        return [
          ...prev,
          {
            ...product,
            itemKey,
            price: itemPrice,
            quantity,
            selectedOption,
            customDetails
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.itemKey === itemKey) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    setGiftMessage('');
    setCouponCode('');
    setDiscountPercent(0);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'INTMAGIC15') {
      setDiscountPercent(15);
      setCouponCode(clean);
      return { success: true, message: '🎉 Coupon Applied: 15% OFF your entire order!' };
    } else if (clean === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponCode(clean);
      return { success: true, message: '🎉 Coupon Applied: 10% Welcome Discount!' };
    } else if (clean === 'FREESHIP') {
      setDiscountPercent(0);
      setCouponCode(clean);
      return { success: true, message: '🚚 Coupon Applied: FREE Islandwide Delivery!' };
    } else {
      return { success: false, message: '❌ Invalid coupon code. Try INTMAGIC15!' };
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const shippingCost = couponCode === 'FREESHIP' ? 0 : 
    deliveryMethod === 'colombo' ? 350 :
    deliveryMethod === 'islandwide' ? 550 :
    deliveryMethod === 'express' ? 950 : 550;

  const discountAmount = (subtotal * discountPercent) / 100;
  const giftWrapCost = giftWrap ? 350 : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + giftWrapCost);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      shippingCost,
      discountAmount,
      discountPercent,
      giftWrapCost,
      total,
      totalItemsCount,
      deliveryMethod,
      setDeliveryMethod,
      giftWrap,
      setGiftWrap,
      giftMessage,
      setGiftMessage,
      couponCode,
      applyCoupon,
      wishlist,
      toggleWishlist,
      shopLogo,
      updateShopLogo,
      currentUser,
      setCurrentUser,
      bankSettings,
      setBankSettings,
      loadBankSettings
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
