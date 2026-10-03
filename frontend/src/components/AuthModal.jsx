import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Lock, Sparkles, CheckCircle2, ArrowRight, UserCheck, ShieldCheck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export default function AuthModal({ isOpen, onClose }) {
  const { currentUser, setCurrentUser } = useCart();
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const handleSendCode = async (e) => {
    if (e) e.preventDefault();
    if (!identifier.trim()) return;

    setLoading(true);
    setFeedback('');
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim() })
      });
      const data = await res.json();
      setLoading(false);
      setStep('otp');
      setResendCooldown(45);
      setFeedback(data.message || `A 4-digit verification code has been dispatched to ${identifier}. Please check your inbox.`);
    } catch (err) {
      setLoading(false);
      setStep('otp');
      setResendCooldown(45);
      setFeedback(`A 4-digit verification code has been dispatched to ${identifier}. Please check your inbox.`);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!otpCode.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim(), code: otpCode.trim() })
      });

      if (!res.ok) {
        throw new Error('Invalid code');
      }

      const data = await res.json();
      setCurrentUser(data.user);
      setLoading(false);

      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EC4899', '#F43F5E', '#10B981']
      });

      setTimeout(() => {
        onClose();
        setStep('input');
        setOtpCode('');
        setIdentifier('');
        setFeedback('');
      }, 1200);

    } catch (err) {
      setLoading(false);
      setFeedback('Incorrect verification code. Please check your inbox and enter the 4 digits.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0f121e] border border-amber-500/30 p-6 sm:p-8 text-white shadow-2xl space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {currentUser ? (
          /* Already Logged In View */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Welcome back, {currentUser.name}!</h3>
              <p className="text-xs text-slate-400 mt-1">{currentUser.identifier}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                Verified Customer Account
              </span>
            </div>

            <div className="pt-4 border-t border-white/10 flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 font-semibold text-xs border border-white/10"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Login / Registration Flow */
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Customer Sign In / Register
              </h3>
              <p className="text-xs text-slate-400">
                Enter your Email address or Sri Lanka Mobile Number to receive a secure 4-digit code.
              </p>
            </div>

            {feedback && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                {feedback}
              </div>
            )}

            {step === 'input' ? (
              <form onSubmit={handleSendCode} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Email Address or Mobile Phone Number:
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. yourname@gmail.com or 075 325 9928"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-white font-bold text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{loading ? 'Sending Code...' : 'Send Verification Code'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Enter 4-Digit Verification Code:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="••••"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-amber-400 text-amber-300 font-mono text-center text-2xl tracking-[0.4em] focus:outline-none"
                    autoFocus
                  />
                  
                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 px-1">
                    <button
                      type="button"
                      disabled={resendCooldown > 0 || loading}
                      onClick={() => handleSendCode()}
                      className="text-amber-400 hover:underline disabled:text-slate-600 disabled:no-underline flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                      <span>{resendCooldown > 0 ? `Resend Code in ${resendCooldown}s` : 'Resend Code'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setStep('input'); setFeedback(''); setOtpCode(''); }}
                      className="text-slate-400 hover:text-white hover:underline"
                    >
                      Change Number/Email
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 font-bold text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{loading ? 'Verifying Code...' : 'Verify & Continue'}</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Passwordless Secure Authentication • INT Gift Mart</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
