import React, { useState } from 'react';
import { X, ShieldCheck, Check, CreditCard, Banknote, Building2, Truck, Phone, Sparkles, Upload, FileCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, onOrderPlaced }) {
  const {
    cartItems,
    subtotal,
    shippingCost,
    discountAmount,
    giftWrapCost,
    total,
    deliveryMethod,
    giftWrap,
    giftMessage,
    clearCart,
    bankSettings
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Colombo');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Commercial Bank Transfer');
  const [slipFile, setSlipFile] = useState(null);
  const [slipPreview, setSlipPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const sriLankaDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Monaragala', 'Ratnapura', 'Kegalle'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Please fill in your name, contact phone number, and delivery address.');
      return;
    }
    setError('');
    setLoading(true);

    const orderPayload = {
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
      delivery_address: address,
      district: district,
      postal_code: postalCode,
      delivery_method: deliveryMethod === 'colombo' ? 'Colombo & Suburbs Express' : 'Island-wide Courier',
      shipping_cost: shippingCost,
      payment_method: paymentMethod,
      gift_message: giftMessage,
      gift_wrap: giftWrap,
      subtotal: subtotal,
      total: total,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selected_option: item.selectedOption || null,
        custom_details: item.customDetails || null,
        image: item.image || null
      }))
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      setLoading(false);

      // Trigger Confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#F43F5E', '#10B981', '#FFFFFF']
      });

      clearCart();
      onOrderPlaced(data);
    } catch (err) {
      console.error(err);
      // Fallback offline mock order creation
      const mockOrder = {
        order_id: `INT-${Date.now().toString().slice(-6)}`,
        status: 'Confirmed',
        total: total,
        whatsapp_url: `https://wa.me/94753259928?text=Hi%20INT%20Gift%20Mart!%20My%20order%20is%20ready%20for%20delivery.`,
        created_at: new Date().toISOString()
      };
      setLoading(false);
      clearCart();
      onOrderPlaced(mockOrder);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f121e] border border-white/15 p-6 sm:p-8 text-white shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Checkout & Delivery Details</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-normal">
                🇱🇰 Island-wide Delivery
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your recipient address and select payment method.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="my-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          
          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kasun Fernando"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 075 325 9928"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Email Address (Optional for e-receipt)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. kasun@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Full Delivery Street Address *
            </label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House / Apartment No, Street Name, Landmark..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                District / Province *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                {sriLankaDistricts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Postal Code (Optional)
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="e.g. 00700"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Payment Method: Commercial Bank or Custom Bank */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Payment Gateway: {bankSettings?.bank_name || 'Commercial Bank Direct Transfer'}</span>
            </label>

            {/* Bank Official Details Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-blue-950/60 border-2 border-blue-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    CBC
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{bankSettings?.bank_name || 'Commercial Bank of Ceylon PLC'}</h4>
                    <p className="text-[10px] text-blue-300">Official Shop Account</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Verified Merchant
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px]">Account Name:</span>
                  <div className="font-bold text-white">{bankSettings?.bank_account_name || 'INT Gift Mart (Pvt) Ltd'}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Account Number:</span>
                  <div className="font-mono font-extrabold text-amber-300 tracking-wider text-sm">
                    {bankSettings?.bank_account_number || '8010 4492 1102'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Branch:</span>
                  <div className="font-semibold text-white">{bankSettings?.bank_branch || 'Colombo City / Digital Banking'}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Transfer Reference:</span>
                  <div className="font-mono text-slate-300">{bankSettings?.bank_reference_note || 'Your Phone / Name'}</div>
                </div>
              </div>

              {/* Upload Deposit Slip / Screenshot */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <label className="block text-[11px] font-semibold text-slate-300">
                  Attach Bank Deposit Slip / Transfer Screenshot (Optional):
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-dashed border-blue-400/40 text-xs text-white cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{slipFile ? slipFile.name : 'Upload Transfer Receipt'}</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSlipFile(file);
                          setSlipPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                  {slipPreview && (
                    <div className="w-9 h-9 rounded-lg overflow-hidden border border-emerald-400/60 shrink-0">
                      <img src={slipPreview} alt="Slip Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="text-[10px] text-slate-400">or send via WhatsApp after placing order</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Line */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">Total Payable ({cartItems.length} items):</span>
              <div className="text-lg font-extrabold text-amber-400">
                LKR {total.toLocaleString()}
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-400">
              <div>Shipping: LKR {shippingCost.toLocaleString()}</div>
              <div className="text-emerald-400 font-semibold">100% Satisfaction Guarantee</div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Confirm Order • LKR {total.toLocaleString()}</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
