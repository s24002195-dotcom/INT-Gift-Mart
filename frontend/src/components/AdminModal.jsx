import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  KeyRound,
  Building2,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Package,
  ShoppingCart,
  RefreshCw,
  Plus,
  Check,
  MessageCircle,
  Clock,
  Phone,
  Mail,
  AlertCircle,
  LogOut,
  Send,
  Search
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function AdminModal({ isOpen, onClose, onRefreshProducts }) {
  const { bankSettings, setBankSettings, loadBankSettings, shopLogo, updateShopLogo } = useCart();

  // Auth state
  const [isAdminAuthed, setIsAdminAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Tabs: 'orders' | 'products' | 'inquiries' | 'bank_settings' | 'change_password'
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(false);

  // Data states
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [productSearch, setProductSearch] = useState('');

  // Editing Product state
  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState('bouquets');
  const [editImage, setEditImage] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editBadge, setEditBadge] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  // Bank settings form state
  const [bankName, setBankName] = useState('Commercial Bank of Ceylon PLC');
  const [bankAccName, setBankAccName] = useState('INT Gift Mart (Pvt) Ltd');
  const [bankAccNo, setBankAccNo] = useState('8010 4492 1102');
  const [bankBranch, setBankBranch] = useState('Colombo City / Digital Banking');
  const [bankRefNote, setBankRefNote] = useState('Your Phone Number / Name');
  const [shopPhone, setShopPhone] = useState('+94 75 325 9928');
  const [bankSaveMsg, setBankSaveMsg] = useState({ text: '', type: '' });
  const [bankLoading, setBankLoading] = useState(false);

  // Change password form state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState({ text: '', type: '' });
  const [pwdLoading, setPwdLoading] = useState(false);

  // Check stored token on open
  useEffect(() => {
    if (isOpen) {
      const storedToken = sessionStorage.getItem('int_admin_token');
      if (storedToken) {
        setIsAdminAuthed(true);
        loadAdminData();
      } else {
        setIsAdminAuthed(false);
        setPasswordInput('');
        setLoginError('');
      }
    }
  }, [isOpen]);

  // Sync bank settings when loaded
  useEffect(() => {
    if (bankSettings) {
      setBankName(bankSettings.bank_name || 'Commercial Bank of Ceylon PLC');
      setBankAccName(bankSettings.bank_account_name || 'INT Gift Mart (Pvt) Ltd');
      setBankAccNo(bankSettings.bank_account_number || '8010 4492 1102');
      setBankBranch(bankSettings.bank_branch || 'Colombo City / Digital Banking');
      setBankRefNote(bankSettings.bank_reference_note || 'Your Phone Number / Name');
      setShopPhone(bankSettings.shop_phone || '+94 75 325 9928');
    }
  }, [bankSettings]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() })
      });

      if (!res.ok) {
        throw new Error('Invalid administrative password');
      }

      const data = await res.json();
      sessionStorage.setItem('int_admin_token', data.token);
      setIsAdminAuthed(true);
      loadAdminData();
    } catch (err) {
      setLoginError('Access Denied: Incorrect administrative password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('int_admin_token');
    setIsAdminAuthed(false);
    setPasswordInput('');
    setLoginError('');
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, inqRes, prodRes, bankRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/admin/orders'),
        fetch('/api/admin/inquiries'),
        fetch('/api/products'),
        fetch('/api/settings/bank')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (ordersRes.ok) setOrders(await ordersRes.json());
      if (inqRes.ok) setInquiries(await inqRes.json());
      if (prodRes.ok) setProductsList(await prodRes.json());
      if (bankRes.ok) {
        const bData = await bankRes.json();
        setBankSettings(bData);
      }
    } catch (e) {
      console.error('Admin data load failed:', e);
    }
    setLoading(false);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`/api/admin/orders/${orderId}/status?new_status=${encodeURIComponent(newStatus)}`, {
        method: 'PUT'
      });
      loadAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  // Start Editing a Product
  const startEditProduct = (product) => {
    setEditingProduct(product);
    setEditName(product.name || '');
    setEditPrice(product.price || '');
    setEditCategory(product.category || 'bouquets');
    setEditImage(product.image || '');
    setEditDescription(product.description || '');
    setEditBadge(product.badge || 'Popular');
    setEditSuccess('');
  };

  // Upload or replace product photo
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;
      setEditImage(base64Data);

      // Attempt to save to backend /api/upload-image
      try {
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: base64Data, filename: file.name })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            setEditImage(data.url);
          }
        }
      } catch (err) {
        console.error('Image upload fallback to data URL', err);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save product changes (Name, Price, Photo, Description)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    setEditLoading(true);
    setEditSuccess('');

    const categoryNames = {
      bouquets: 'Bouquets & Flowers',
      frames_4d: '4D Light Frames',
      spotify_qr: 'Spotify & QR Frames',
      jhumkas: 'Jhumkas Jewelry Boxes',
      art_drawings: 'Art Portraits',
      hampers: 'Gift Hampers',
      cards_polaroids: 'Cards & Polaroids',
      puzzles: 'Puzzles & Magazines'
    };

    const updatePayload = {
      name: editName.trim(),
      price: parseFloat(editPrice),
      original_price: parseFloat(editPrice) * 1.25,
      category: editCategory,
      category_name: categoryNames[editCategory] || 'Handcrafted Gifts',
      image: editImage,
      description: editDescription.trim(),
      badge: editBadge || 'Popular'
    };

    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });

      if (!res.ok) {
        throw new Error('Failed to update product');
      }

      setEditSuccess('Product photo, name, and price saved successfully!');
      if (onRefreshProducts) onRefreshProducts();
      
      // Update local state list
      setProductsList(prev => prev.map(p => (p.id === editingProduct.id ? { ...p, ...updatePayload } : p)));

      setTimeout(() => {
        setEditingProduct(null);
        setEditSuccess('');
      }, 1200);

    } catch (err) {
      console.error(err);
      // Fallback local update
      setProductsList(prev => prev.map(p => (p.id === editingProduct.id ? { ...p, ...updatePayload } : p)));
      setEditSuccess('Changes updated in store session!');
      setTimeout(() => {
        setEditingProduct(null);
      }, 1200);
    } finally {
      setEditLoading(false);
    }
  };

  // Save Bank Details and Account Number
  const handleSaveBankSettings = async (e) => {
    e.preventDefault();
    setBankLoading(true);
    setBankSaveMsg({ text: '', type: '' });

    const bankPayload = {
      bank_name: bankName.trim(),
      bank_account_name: bankAccName.trim(),
      bank_account_number: bankAccNo.trim(),
      bank_branch: bankBranch.trim(),
      bank_reference_note: bankRefNote.trim(),
      shop_phone: shopPhone.trim()
    };

    try {
      const res = await fetch('/api/settings/bank', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bankPayload)
      });

      if (!res.ok) {
        throw new Error('Failed to update bank details');
      }

      setBankSettings(bankPayload);
      if (loadBankSettings) loadBankSettings();
      setBankSaveMsg({
        text: 'Bank details & Account Number saved! Live store and checkout updated.',
        type: 'success'
      });
    } catch (err) {
      // Fallback update in state
      setBankSettings(bankPayload);
      setBankSaveMsg({
        text: 'Bank details saved to store context.',
        type: 'success'
      });
    } finally {
      setBankLoading(false);
    }
  };

  // Change Admin Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdMsg({ text: '', type: '' });

    if (newPassword.length < 6) {
      setPwdMsg({ text: 'New password must be at least 6 characters.', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdMsg({ text: 'New password and confirmation do not match.', type: 'error' });
      return;
    }

    setPwdLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          old_password: oldPassword.trim(),
          new_password: newPassword.trim()
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Current password is incorrect');
      }

      setPwdMsg({ text: 'Admin password changed successfully! Remember your new credentials.', type: 'success' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPwdMsg({ text: err.message, type: 'error' });
    } finally {
      setPwdLoading(false);
    }
  };

  if (!isOpen) return null;

  const filteredCatalog = productsList.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0f121e] border border-amber-500/40 p-6 sm:p-8 text-white shadow-2xl my-8 max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ---------------- VIEW 1: LOCKED ADMIN LOGIN GATE ---------------- */}
        {!isAdminAuthed ? (
          <div className="py-8 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-amber-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                INT Gift Mart Admin Gate
              </h3>
              <p className="text-xs text-slate-400">
                Restricted portal for store management, catalog editing & bank settings.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4 pt-2">
              <div className="text-left space-y-1">
                <label className="block text-xs font-bold text-slate-300">
                  Enter Admin Security Password:
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                  autoFocus
                />
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Authorized store staff verification only</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loginLoading ? 'Verifying Credentials...' : 'Unlock Admin Dashboard'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* ---------------- VIEW 2: AUTHENTICATED ADMIN DASHBOARD ---------------- */
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>INT Gift Mart Admin Dashboard</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                      Live SQLite
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Edit products, change prices & photos, update bank details & view inquiries
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mr-8">
                <button
                  onClick={handleAdminLogout}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1.5 transition-colors border border-white/10"
                  title="Lock & Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Row */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3.5 shrink-0">
                <div className="p-3 rounded-2xl bg-slate-900 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Revenue</span>
                  <div className="text-sm font-extrabold text-amber-400 font-mono mt-0.5">
                    LKR {stats.total_revenue.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Orders</span>
                  <div className="text-sm font-extrabold text-emerald-400 font-mono mt-0.5">
                    {stats.total_orders.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Catalog Products</span>
                  <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                    {productsList.length} Items (Editable)
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Bank Gateway</span>
                  <div className="text-sm font-extrabold text-blue-400 font-mono mt-0.5 truncate">
                    {bankSettings?.bank_name || 'Commercial Bank'}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-3 mb-4 shrink-0 overflow-x-auto scrollbar-none">
              <button
                onClick={() => { setActiveTab('orders'); setEditingProduct(null); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                Live Orders ({orders.length})
              </button>

              <button
                onClick={() => { setActiveTab('products'); setEditingProduct(null); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'products'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Edit Products & Prices ({productsList.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('bank_settings'); setEditingProduct(null); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'bank_settings'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit Bank Details & Acc No</span>
              </button>

              <button
                onClick={() => { setActiveTab('inquiries'); setEditingProduct(null); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'inquiries'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Customer Inquiries ({inquiries.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('change_password'); setEditingProduct(null); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'change_password'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Change Password</span>
              </button>

              <button
                onClick={loadAdminData}
                className="ml-auto px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1.5 shrink-0"
                title="Refresh Database Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto pr-1">
              
              {/* TAB 1: LIVE ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No live orders yet. Place an order on the store to see it appear here in real-time!
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400 font-semibold">
                            <th className="py-2.5 px-3">Order ID</th>
                            <th className="py-2.5 px-3">Customer</th>
                            <th className="py-2.5 px-3">Phone</th>
                            <th className="py-2.5 px-3">District</th>
                            <th className="py-2.5 px-3">Total (LKR)</th>
                            <th className="py-2.5 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {orders.map((o) => (
                            <tr key={o.order_id} className="hover:bg-white/5">
                              <td className="py-3 px-3 font-mono font-bold text-amber-400">{o.order_id}</td>
                              <td className="py-3 px-3 font-semibold text-white">{o.customer_name}</td>
                              <td className="py-3 px-3 text-slate-300 font-mono">{o.customer_phone}</td>
                              <td className="py-3 px-3 text-slate-300">{o.district}</td>
                              <td className="py-3 px-3 font-mono font-bold text-white">
                                {o.total ? o.total.toLocaleString() : '0.00'}
                              </td>
                              <td className="py-3 px-3">
                                <select
                                  value={o.status}
                                  onChange={(e) => handleUpdateStatus(o.order_id, e.target.value)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/20 text-[11px] text-white focus:outline-none focus:border-amber-400"
                                >
                                  <option value="Pending Confirmation">Pending Confirmation</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="In Production">In Production</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="Delivered">Delivered</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: EDIT PRODUCTS & PHOTOS & PRICES */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  {editingProduct ? (
                    /* Inline Product Edit Form */
                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/40 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Edit className="w-4 h-4 text-amber-400" />
                          <h4 className="text-sm font-bold text-white">
                            Editing Product: <span className="text-amber-400">{editingProduct.name}</span>
                          </h4>
                        </div>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5"
                        >
                          Cancel / Back
                        </button>
                      </div>

                      {editSuccess && (
                        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 border border-emerald-500/30">
                          <Check className="w-4 h-4" />
                          <span>{editSuccess}</span>
                        </div>
                      )}

                      <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                          
                          {/* Photo Editor & Preview */}
                          <div className="md:col-span-4 space-y-2">
                            <label className="block font-bold text-slate-300">Product Photo</label>
                            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/15 aspect-square flex items-center justify-center group">
                              <img
                                src={editImage}
                                alt="Product Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = '/products/crop_1_3.jpg'; }}
                              />
                              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity text-xs font-semibold gap-1">
                                <Upload className="w-6 h-6 text-amber-400" />
                                <span>Change Photo</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handlePhotoUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>

                            <label className="block text-center py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 cursor-pointer font-semibold text-xs transition-colors">
                              <Upload className="w-3.5 h-3.5 inline mr-1.5" />
                              <span>Upload New Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                              />
                            </label>
                            <input
                              type="text"
                              value={editImage}
                              onChange={(e) => setEditImage(e.target.value)}
                              placeholder="Or paste photo URL..."
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-400 text-[11px]"
                            />
                          </div>

                          {/* Name, Price, Category, Details */}
                          <div className="md:col-span-8 space-y-3.5">
                            <div>
                              <label className="block font-bold text-slate-300 mb-1">
                                Product Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block font-bold text-slate-300 mb-1">
                                  Price in LKR *
                                </label>
                                <input
                                  type="number"
                                  required
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-amber-300 font-mono font-bold text-xs focus:outline-none focus:border-amber-400"
                                />
                              </div>

                              <div>
                                <label className="block font-bold text-slate-300 mb-1">
                                  Category
                                </label>
                                <select
                                  value={editCategory}
                                  onChange={(e) => setEditCategory(e.target.value)}
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                                >
                                  <option value="bouquets">Bouquets & Flowers</option>
                                  <option value="frames_4d">4D Light Frames</option>
                                  <option value="spotify_qr">Spotify & QR Frames</option>
                                  <option value="jhumkas">Jhumkas Jewelry Boxes</option>
                                  <option value="art_drawings">Art Portraits</option>
                                  <option value="hampers">Gift Hampers</option>
                                  <option value="cards_polaroids">Cards & Polaroids</option>
                                  <option value="puzzles">Puzzles & Magazines</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block font-bold text-slate-300 mb-1">
                                Badge / Tag (Optional)
                              </label>
                              <input
                                type="text"
                                value={editBadge}
                                onChange={(e) => setEditBadge(e.target.value)}
                                placeholder="e.g. Bestseller, Trending, Popular..."
                                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-300 mb-1">
                                Description
                              </label>
                              <textarea
                                rows={3}
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Handcrafted materials, packaging details..."
                                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={editLoading}
                              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white font-extrabold text-xs shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
                            >
                              {editLoading ? 'Saving Changes...' : 'Save Product & Price Changes'}
                            </button>
                          </div>

                        </div>
                      </form>
                    </div>
                  ) : (
                    /* Products Catalog Table with Edit Buttons */
                    <div className="space-y-3">
                      {/* Search Bar */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                            placeholder="Search product to edit..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <span className="text-xs text-slate-400">
                          Showing <strong className="text-white">{filteredCatalog.length}</strong> items
                        </span>
                      </div>

                      <div className="overflow-x-auto max-h-[500px]">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="sticky top-0 bg-[#0f121e] border-b border-white/10 text-slate-400 font-semibold z-10">
                            <tr>
                              <th className="py-2.5 px-3">Photo</th>
                              <th className="py-2.5 px-3">Product Name</th>
                              <th className="py-2.5 px-3">Category</th>
                              <th className="py-2.5 px-3">Price (LKR)</th>
                              <th className="py-2.5 px-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {filteredCatalog.map((prod) => (
                              <tr key={prod.id} className="hover:bg-white/5">
                                <td className="py-2 px-3">
                                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                                    <img
                                      src={prod.image}
                                      alt={prod.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => { e.target.src = '/products/crop_1_3.jpg'; }}
                                    />
                                  </div>
                                </td>
                                <td className="py-2.5 px-3 font-semibold text-white max-w-[220px] truncate">
                                  {prod.name}
                                </td>
                                <td className="py-2.5 px-3 text-slate-300">
                                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px]">
                                    {prod.category}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 font-mono font-bold text-amber-300">
                                  LKR {prod.price ? prod.price.toLocaleString() : '0'}
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <button
                                    onClick={() => startEditProduct(prod)}
                                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs transition-all inline-flex items-center gap-1"
                                  >
                                    <Edit className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: EDIT BANK DETAILS & ACC NO */}
              {activeTab === 'bank_settings' && (
                <div className="max-w-xl mx-auto py-2 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      <span>Edit Official Bank Account Details</span>
                    </h4>
                    <p className="text-slate-400 text-xs">
                      Update your Sri Lanka bank account details. These will be shown on the Checkout Modal, order receipts, and footer.
                    </p>
                  </div>

                  {bankSaveMsg.text && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        bankSaveMsg.type === 'success'
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
                      }`}
                    >
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{bankSaveMsg.text}</span>
                    </div>
                  )}

                  {/* Official Shop Logo Upload (Admin Exclusive) */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-white text-xs">Official Shop Logo (Admin Only)</h5>
                        <p className="text-[11px] text-slate-400">Regular store visitors cannot modify or upload this logo.</p>
                      </div>
                      <label className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs cursor-pointer hover:scale-105 transition-all shadow-md">
                        <Upload className="w-3.5 h-3.5 inline mr-1" />
                        <span>Upload New Logo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                updateShopLogo(event.target.result);
                                setBankSaveMsg({ text: 'Shop logo updated across all pages!', type: 'success' });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="w-12 h-12 rounded-2xl p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 shadow-md">
                        <div className="w-full h-full rounded-[14px] bg-[#0b132b] flex items-center justify-center overflow-hidden">
                          <img src={shopLogo} alt="Shop Logo" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        <span className="block font-semibold text-white">Brand Palette: Midnight Blue & Golden-Pink Shaded 3D styling</span>
                        <span className="text-slate-400">Click upload above to change the shop logo anytime.</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveBankSettings} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">
                        Bank Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="e.g. Commercial Bank of Ceylon PLC"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          Account Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bankAccName}
                          onChange={(e) => setBankAccName(e.target.value)}
                          placeholder="e.g. INT Gift Mart (Pvt) Ltd"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-amber-300 mb-1">
                          Bank Account Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={bankAccNo}
                          onChange={(e) => setBankAccNo(e.target.value)}
                          placeholder="e.g. 8010 4492 1102"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-amber-400/50 text-amber-300 font-mono font-bold text-sm tracking-wide focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          Branch Name
                        </label>
                        <input
                          type="text"
                          value={bankBranch}
                          onChange={(e) => setBankBranch(e.target.value)}
                          placeholder="e.g. Colombo City / Digital Banking"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          WhatsApp Phone Number
                        </label>
                        <input
                          type="text"
                          value={shopPhone}
                          onChange={(e) => setShopPhone(e.target.value)}
                          placeholder="e.g. +94 75 325 9928"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-emerald-400 font-mono text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">
                        Transfer Reference Instruction
                      </label>
                      <input
                        type="text"
                        value={bankRefNote}
                        onChange={(e) => setBankRefNote(e.target.value)}
                        placeholder="e.g. Your Phone Number / Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Live Preview Card */}
                    <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 space-y-1 text-slate-300">
                      <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Live Checkout Preview</span>
                      <div className="text-white font-bold text-xs">{bankName}</div>
                      <div className="text-amber-300 font-mono font-bold text-xs">Acc: {bankAccNo} • Name: {bankAccName}</div>
                      <div className="text-[11px] text-slate-400">{bankBranch}</div>
                    </div>

                    <button
                      type="submit"
                      disabled={bankLoading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 text-white font-extrabold text-xs shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                      {bankLoading ? 'Saving Bank Settings...' : 'Save Bank Details & Account Number'}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: CUSTOMER INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Customer Custom Order Inquiries</h4>
                      <p className="text-xs text-slate-400">
                        Inquiries submitted via website contact form or custom gift requests.
                      </p>
                    </div>
                    <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                      {inquiries.length} Requests
                    </span>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No customer inquiries received yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3.5">
                      {inquiries.map((inq) => {
                        const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                        const waPhone = cleanPhone.startsWith('94') ? cleanPhone : cleanPhone.startsWith('0') ? `94${cleanPhone.slice(1)}` : `94${cleanPhone}`;
                        const replyMsg = encodeURIComponent(
                          `Hi ${inq.name}! 👋 Thank you for reaching out to INT Gift Mart regarding your custom inquiry for: "${inq.gift_type}". We would love to craft this for your ${inq.occasion}! ✨`
                        );
                        const waLink = `https://wa.me/${waPhone}?text=${replyMsg}`;

                        return (
                          <div
                            key={inq.id}
                            className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-amber-500/30 transition-all space-y-3"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="text-sm font-bold text-white">{inq.name}</h5>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                                    {inq.occasion || 'Special Occasion'}
                                  </span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                                    {inq.budget || 'Custom Budget'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                  <span className="flex items-center gap-1 font-mono text-slate-300">
                                    <Phone className="w-3 h-3 text-emerald-400" />
                                    {inq.phone}
                                  </span>
                                  {inq.email && (
                                    <span className="flex items-center gap-1 text-slate-400">
                                      <Mail className="w-3 h-3" />
                                      {inq.email}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                                    <Clock className="w-3 h-3" />
                                    {new Date(inq.created_at).toLocaleString()}
                                  </span>
                                </div>
                              </div>

                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Reply on WhatsApp</span>
                              </a>
                            </div>

                            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                              <div className="font-semibold text-amber-300">
                                Requested Gift: {inq.gift_type}
                              </div>
                              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                                "{inq.message}"
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: CHANGE ADMIN PASSWORD */}
              {activeTab === 'change_password' && (
                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md mx-auto py-4 text-xs">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      <span>Update Administrator Password</span>
                    </h4>
                    <p className="text-slate-400 text-[11px]">
                      Change your security password stored in the database.
                    </p>
                  </div>

                  {pwdMsg.text && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        pwdMsg.type === 'success'
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {pwdMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>{pwdMsg.text}</span>
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Current Password *</label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">New Password *</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pwdLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {pwdLoading ? 'Updating Password...' : 'Save New Password'}
                  </button>
                </form>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
}
