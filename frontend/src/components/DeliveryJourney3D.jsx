import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Truck,
  Gift,
  Star,
  Sparkles,
  Heart,
  CheckCircle2,
  RotateCcw,
  Package,
  MapPin,
  Smile,
  Smartphone,
  ChevronDown,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DeliveryJourney3D({ onOrderNow }) {
  // Stages:
  // 1: Courier arrives at front door & rings doorbell
  // 2: 3D Door swings open & customer receives parcel
  // 3: Parcel unboxing with ribbon pull, golden-pink glowing lid & surprise reaction
  // 4: Customer takes out smartphone & gives 5-star rating
  const [currentStage, setCurrentStage] = useState(1);
  const [doorOpen, setDoorOpen] = useState(false);
  const [bellRung, setBellRung] = useState(false);
  const [isRibbonPulled, setIsRibbonPulled] = useState(false);
  const [rating, setRating] = useState(5);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [isChimeMuted, setIsChimeMuted] = useState(false);

  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);

  // Play realistic two-tone chime via Web Audio API
  const playDoorbellChime = () => {
    if (isChimeMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Ding (Higher pitch E5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.8);

      // Dong (Lower pitch C5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(523.25, now + 0.35);
      gain2.gain.setValueAtTime(0.35, now + 0.35);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.35);
      osc2.stop(now + 1.4);
    } catch (e) {}
  };

  // Ring Bell Action
  const handleRingBell = () => {
    setBellRung(true);
    playDoorbellChime();

    // Trigger door opening and move to stage 2 after ding-dong
    setTimeout(() => {
      setDoorOpen(true);
      setCurrentStage(2);
    }, 1100);
  };

  // Pull Ribbon Action
  const handlePullRibbon = () => {
    setIsRibbonPulled(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#F59E0B', '#EC4899', '#F43F5E', '#3B82F6', '#FFFFFF']
    });
    setTimeout(() => {
      setCurrentStage(4);
    }, 1800);
  };

  // Submit Rating on Phone
  const handleGiveRating = (stars) => {
    setRating(stars);
    setRatingSubmitted(true);
    confetti({
      particleCount: 110,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#FBBF24', '#EC4899', '#F43F5E']
    });
  };

  // Smooth wheel scroll progression
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 850) return;

    if (e.deltaY > 35) {
      // Scroll Down
      if (currentStage === 1 && !bellRung) {
        lastScrollTime.current = now;
        handleRingBell();
      } else if (currentStage === 2) {
        lastScrollTime.current = now;
        setCurrentStage(3);
      } else if (currentStage === 3 && !isRibbonPulled) {
        lastScrollTime.current = now;
        handlePullRibbon();
      }
    } else if (e.deltaY < -35) {
      // Scroll Up
      if (currentStage > 1) {
        lastScrollTime.current = now;
        setCurrentStage(prev => Math.max(1, prev - 1));
      }
    }
  };

  const handleReset = () => {
    setCurrentStage(1);
    setDoorOpen(false);
    setBellRung(false);
    setIsRibbonPulled(false);
    setRating(5);
    setRatingSubmitted(false);
  };

  return (
    <section
      id="delivery-journey"
      ref={containerRef}
      onWheel={handleWheel}
      className="py-20 relative overflow-hidden bg-gradient-to-b from-[#08090f] via-[#0b132b] to-[#08090f] text-slate-100"
    >
      {/* Background Radial Glow in Brand Colors: Midnight Blue & Golden-Pink */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-blue-600/15 via-pink-500/15 to-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-blue-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Scroll & Interactive 3D Delivery Story</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Doorstep Surprise Journey
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Ring the doorbell, watch the door swing open in 3D, unbox the golden-pink gift parcel, and experience the priceless reaction!
          </p>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-400/90 font-medium pt-1">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            <span>Scroll down or click the buttons below to progress each scene</span>
          </div>
        </div>

        {/* 4-Step Interactive Progress Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto mb-8">
          {[
            { stage: 1, label: '1. Ring Doorbell 🔔', icon: Bell },
            { stage: 2, label: '2. Door Opens in 3D 🚪', icon: Package },
            { stage: 3, label: '3. Parcel Unboxing 🎁', icon: Gift },
            { stage: 4, label: '4. Phone 5★ Rating 📱', icon: Smartphone }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentStage === item.stage;
            const isCompleted = currentStage > item.stage;
            return (
              <button
                key={item.stage}
                onClick={() => {
                  setCurrentStage(item.stage);
                  if (item.stage >= 2) setDoorOpen(true);
                  if (item.stage >= 3) setIsRibbonPulled(true);
                }}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white border-amber-300 shadow-lg shadow-rose-500/25 scale-[1.03]'
                    : isCompleted
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Motion Stage Arena */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#0f1424]/95 via-[#0b1020]/95 to-[#090d1a]/95 border border-amber-500/30 shadow-2xl backdrop-blur-2xl min-h-[500px] flex flex-col justify-between overflow-hidden">
          
          {/* Top Status & Audio indicator */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Scene {currentStage} of 4: {
                currentStage === 1 ? 'Courier At Recipient Front Door' :
                currentStage === 2 ? '3D Door Opens & Parcel Handover' :
                currentStage === 3 ? 'Ribbon Pull & Magical Unboxing' :
                'Smartphone 5-Star Rating Celebration'
              }</span>
            </div>

            <button
              onClick={() => setIsChimeMuted(!isChimeMuted)}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10"
              title="Toggle Doorbell Sound Chime"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isChimeMuted ? 'text-slate-600' : 'text-amber-400'}`} />
              <span>{isChimeMuted ? 'Muted' : 'Chime Sound Active'}</span>
            </button>
          </div>

          {/* ================= SCENE 1: COURIER ARRIVAL & DOORBELL ================= */}
          {currentStage === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6 animate-in fade-in zoom-in duration-300">
              
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                  Step 1: Express Islandwide Arrival
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  The Courier Man Has Arrived At The Doorstep! 🚚🚪
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Standing outside holding the sealed luxury INT Gift Mart parcel. Click the glowing doorbell below or scroll down to ring!
                </p>
              </div>

              {/* Porch Visual with Courier & Door */}
              <div className="relative w-full max-w-lg h-56 rounded-2xl bg-gradient-to-b from-[#13192e] to-[#0a0d18] border border-amber-500/30 overflow-hidden flex items-center justify-around p-4 shadow-xl">
                
                {/* Courier Man with Parcel */}
                <div className="flex flex-col items-center space-y-2 z-10 animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <div className="relative p-3.5 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 text-white shadow-xl shadow-blue-500/20 flex flex-col items-center">
                    <span className="text-2xl">👨‍✈️📦</span>
                    <span className="text-[10px] font-mono font-bold text-amber-200 mt-1">INT Courier</span>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] text-amber-300 font-medium">
                    Priority Delivery
                  </div>
                </div>

                {/* Animated Sound Wave Rings if bell clicked */}
                {bellRung && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-24 h-24 rounded-full border-4 border-amber-400/80 animate-ping" />
                    <div className="px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm shadow-2xl animate-bounce">
                      🔔 DING DONG! 🔔
                    </div>
                  </div>
                )}

                {/* Closed Wooden Front Door with Brass Bell */}
                <div className="relative w-36 h-48 rounded-t-2xl bg-gradient-to-b from-[#3a2012] via-[#2a160c] to-[#1a0e08] border-4 border-[#523019] shadow-2xl flex flex-col items-center justify-center p-2">
                  <div className="absolute top-2 px-2 py-0.5 rounded bg-black/50 text-[9px] font-serif text-amber-300/80">
                    RESIDENCE
                  </div>
                  
                  {/* Door Knocker / Bell Button */}
                  <button
                    onClick={handleRingBell}
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all ${
                      bellRung
                        ? 'bg-amber-400 text-slate-950 scale-125 shadow-amber-400/50'
                        : 'bg-gradient-to-tr from-amber-400 to-rose-400 text-slate-950 hover:scale-110 animate-pulse'
                    }`}
                    title="Click To Ring Doorbell"
                  >
                    <Bell className="w-6 h-6 animate-swing" />
                  </button>
                  <span className="text-[9px] font-bold text-amber-300 mt-1 uppercase tracking-wider">
                    {bellRung ? 'Chiming...' : 'Ring Bell'}
                  </span>

                  {/* Brass Door Knob */}
                  <div className="absolute right-3 top-1/2 w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md border border-amber-200" />
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={handleRingBell}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-white font-extrabold text-sm shadow-xl shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Bell className="w-4 h-4 animate-bounce" />
                <span>Click Doorbell or Scroll Down To Ring! 🔔</span>
              </button>

            </div>
          )}

          {/* ================= SCENE 2: 3D DOOR OPENS & HANDOVER ================= */}
          {currentStage === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6 animate-in fade-in zoom-in duration-300">
              
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-extrabold tracking-widest text-rose-400">
                  Step 2: 3D Doorway Handover
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  The Door Swings Open in 3D! 🚪✨
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  The recipient answers the chime with excitement and receives the signature sealed INT Gift Mart parcel.
                </p>
              </div>

              {/* 3D Door Open Arena with Perspective */}
              <div
                className="relative w-full max-w-lg h-60 rounded-2xl bg-[#090c16] border border-amber-500/30 overflow-hidden flex items-center justify-center p-4 shadow-2xl"
                style={{ perspective: '1000px' }}
              >
                {/* Warm Golden Interior Light pouring out */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-rose-500/25 animate-pulse" />

                {/* Recipient inside the home */}
                <div className="relative z-10 flex flex-col items-center mr-8 space-y-1">
                  <div className="text-4xl animate-bounce">🥰💖</div>
                  <div className="p-2 rounded-xl bg-slate-900/90 border border-amber-400/40 text-left space-y-0.5 shadow-xl max-w-[200px]">
                    <span className="text-[10px] text-amber-300 font-bold block">Recipient:</span>
                    <p className="text-[11px] text-white italic leading-tight">
                      "A gift for me?! Look at that golden silk ribbon!"
                    </p>
                  </div>
                </div>

                {/* 3D Door Swing on Hinge */}
                <div className="relative w-36 h-48 border-2 border-amber-500/40 rounded-t-xl bg-black/60 flex items-center justify-center overflow-visible">
                  {/* Swinging Door Panel */}
                  <div
                    className="absolute inset-0 rounded-t-xl bg-gradient-to-r from-[#42220f] to-[#251206] border-2 border-[#66381a] shadow-2xl transition-transform duration-1000 flex items-center justify-between p-2"
                    style={{
                      transformOrigin: 'left center',
                      transform: 'rotateY(-78deg)'
                    }}
                  >
                    <div className="w-1.5 h-8 bg-amber-400 rounded-full" />
                    <span className="text-lg">🚪</span>
                  </div>

                  {/* Parcel in Hand */}
                  <div className="relative z-20 px-3 py-2 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 font-black text-xs shadow-2xl flex items-center gap-2 animate-pulse">
                    <Package className="w-5 h-5 text-slate-950" />
                    <div className="text-left text-[10px] leading-tight">
                      <span className="block font-bold">INT Gift Box</span>
                      <span className="text-white">Sealed & Safe</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => setCurrentStage(3)}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                <span>Take Parcel Inside & Start Unboxing! 🎁</span>
              </button>

            </div>
          )}

          {/* ================= SCENE 3: 3D UNBOXING & SURPRISE ================= */}
          {currentStage === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6 animate-in fade-in zoom-in duration-300">
              
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                  Step 3: The Magical Unboxing
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Pull Golden Ribbon to Reveal The Surprise! 🎀✨
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Click the button below or scroll to untie the silk ribbon, pop open the box lid, and reveal the handcrafted gifts!
                </p>
              </div>

              {/* 3D Box Container with Golden-Pink Light Rays */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Radiant Glow Beam */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-pink-500/30 to-blue-500/30 rounded-full blur-2xl animate-pulse" />

                {/* 3D Gift Box */}
                <div className={`relative w-52 h-52 rounded-3xl bg-gradient-to-br from-[#121626] to-[#080a12] border-2 border-amber-400 p-4 shadow-2xl flex flex-col items-center justify-center transition-all duration-700 ${
                  isRibbonPulled ? 'scale-110 border-rose-400 shadow-rose-500/50' : 'animate-float'
                }`}>
                  
                  {!isRibbonPulled ? (
                    <>
                      {/* Ribbon Cross */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 shadow-lg" />
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 bg-gradient-to-b from-amber-400 via-rose-500 to-pink-500 shadow-lg" />
                      
                      {/* Bow Center */}
                      <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-300 to-rose-400 flex items-center justify-center shadow-xl text-slate-950 font-black text-sm">
                        🎀
                      </div>
                      <span className="relative z-10 mt-3 text-[10px] font-bold text-amber-300 tracking-wider uppercase">
                        INT Gift Box
                      </span>
                    </>
                  ) : (
                    /* Revealed Gift Inside with Glowing Spotify Plaque + Roses */
                    <div className="space-y-2 animate-in fade-in zoom-in duration-500 text-center">
                      <div className="text-5xl animate-bounce">🌹✨💖</div>
                      <div className="text-xs font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-pink-300">
                        Custom Spotify Acrylic Plaque & Roses!
                      </div>
                      <p className="text-[10px] text-amber-200 font-serif italic">
                        "Playing Our Favorite Song: Until I Found You"
                      </p>
                      <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold inline-block border border-emerald-500/30">
                        100% Astonished Reaction!
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {!isRibbonPulled ? (
                <button
                  onClick={handlePullRibbon}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pull Ribbon & Open Surprise Box! 🎁 (or scroll)</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStage(4)}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Take Out Phone & Give 5-Star Rating ⭐</span>
                </button>
              )}

            </div>
          )}

          {/* ================= SCENE 4: PHONE 5-STAR RATING ================= */}
          {currentStage === 4 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-6 animate-in fade-in zoom-in duration-300">
              
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                  Step 4: Customer Holds Up Phone & Rates
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  "I Love It! Giving INT Gift Mart 5 Stars!" ⭐⭐⭐⭐⭐
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Overjoyed with emotion, the customer pulls out their smartphone and leaves an ecstatic 5-star rating!
                </p>
              </div>

              {/* 3D Smartphone Holding Screen Frame */}
              <div className="relative w-full max-w-sm rounded-[36px] p-3.5 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-4 border-slate-700 shadow-2xl shadow-blue-500/20 text-left space-y-3">
                
                {/* Phone Speaker Notch & Camera */}
                <div className="w-20 h-3 bg-black rounded-full mx-auto" />

                {/* OLED Phone Screen */}
                <div className="rounded-2xl p-4 bg-[#080b14] border border-white/10 space-y-3">
                  
                  {/* Shop Header on Phone */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#0b132b] p-0.5 border border-amber-400/40">
                        <img src="/images/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <span className="text-xs font-bold text-white">INT Gift Mart Review</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">
                      Verified Delivery
                    </span>
                  </div>

                  {/* Customer Review Quote */}
                  <p className="text-xs text-slate-200 italic leading-relaxed">
                    "The unboxing made me cry happy tears! The scannable Spotify plaque and rose arrangement were pure magic. 100/10 recommend INT Gift Mart!"
                  </p>

                  {/* 5-Star Interactive Rating Widget */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <span className="text-[11px] font-bold text-amber-300 block">
                      {ratingSubmitted ? '⭐ 5-Star Rating Submitted!' : 'Tap the stars to give 5 stars:'}
                    </span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleGiveRating(s)}
                          className="p-1 hover:scale-125 transition-transform cursor-pointer"
                          title={`${s} Stars`}
                        >
                          <Star className={`w-6 h-6 ${s <= rating ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Phone Submit Button */}
                  <button
                    onClick={() => handleGiveRating(5)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
                  >
                    {ratingSubmitted ? '✓ Review Published on INT Gift Mart!' : 'Submit 5-Star Rating ⭐'}
                  </button>

                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href="#catalog"
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-extrabold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>Send a Surprise Gift Like This Today 🎁</span>
                </a>

                <button
                  onClick={handleReset}
                  className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Story</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
