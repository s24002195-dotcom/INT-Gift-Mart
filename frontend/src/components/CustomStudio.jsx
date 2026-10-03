import React, { useState } from 'react';
import { Music, QrCode, Sparkles, Upload, Play, Heart, Check, Plus, Image as ImageIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export default function CustomStudio({ onCustomOrderAdded }) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('spotify'); // 'spotify' | 'voice_qr' | 'bouquet'

  // Spotify State
  const [spotifySong, setSpotifySong] = useState('Perfect');
  const [spotifyArtist, setSpotifyArtist] = useState('Ed Sheeran');
  const [spotifyNote, setSpotifyNote] = useState('Happy 2nd Anniversary, My Love ❤️');
  const [spotifySize, setSpotifySize] = useState('A4'); // 'A4' (LKR 2,000) or '6x8' (LKR 1,200)
  const [spotifyImage, setSpotifyImage] = useState('/images/hero.jpg');

  // QR State
  const [qrTitle, setQrTitle] = useState('Listen to Our Song');
  const [qrSubtitle, setQrSubtitle] = useState('Scan to play our voice message 💖');
  const [qrLink, setQrLink] = useState('https://youtu.be/2Vv-BfVoq4g');
  const [qrSize, setQrSize] = useState('A4'); // '6x8' (LKR 1,300), 'A4' (LKR 2,100), 'A3' (LKR 2,900)

  // Bouquet State
  const [bouquetType, setBouquetType] = useState('Velvet Red Roses');
  const [addChocolates, setAddChocolates] = useState('kitkat'); // 'none' | 'kitkat' | 'dairymilk' | 'kinderjoy'
  const [addTeddy, setAddTeddy] = useState(true);
  const [ribbonColor, setRibbonColor] = useState('Golden Champagne');
  const [cardMessage, setCardMessage] = useState('Forever and always, with all my love.');

  // Handle image upload simulation
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSpotifyImage(url);
    }
  };

  // Add customized Spotify item to cart
  const handleAddSpotifyToCart = () => {
    const price = spotifySize === 'A4' ? 2000.0 : 1200.0;
    const item = {
      id: `custom-spotify-${spotifySize.toLowerCase()}`,
      name: `Custom Spotify Song Frame (${spotifySize})`,
      category: 'spotify_qr',
      category_name: 'Spotify & Voice QR Frames',
      price: price,
      original_price: price + 600,
      image: spotifyImage,
      description: `Personalized with song "${spotifySong}" by ${spotifyArtist}. Dedication: "${spotifyNote}"`,
      badge: 'Custom Studio'
    };

    addToCart(item, 1, `Size: ${spotifySize}`, {
      Song: spotifySong,
      Artist: spotifyArtist,
      Dedication: spotifyNote,
      Size: spotifySize
    });

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  // Add Voice QR item to cart
  const handleAddQrToCart = () => {
    const price = qrSize === 'A3' ? 2900.0 : qrSize === 'A4' ? 2100.0 : 1300.0;
    const item = {
      id: `custom-voice-qr-${qrSize.toLowerCase()}`,
      name: `Custom VoiceQR Memory Frame (${qrSize})`,
      category: 'spotify_qr',
      category_name: 'Spotify & Voice QR Frames',
      price: price,
      original_price: price + 700,
      image: '/products/crop_3_6.jpg',
      description: `Custom QR linking to: ${qrLink}. Engraving: "${qrTitle}"`,
      badge: 'VoiceQR Studio'
    };

    addToCart(item, 1, `Size: ${qrSize}`, {
      Title: qrTitle,
      Subtitle: qrSubtitle,
      AudioLink: qrLink,
      Size: qrSize
    });

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  // Add Bouquet Customization to cart
  const handleAddBouquetToCart = () => {
    let basePrice = bouquetType.includes('Lamborghini') ? 9000 : 3800;
    let extra = 0;
    if (addChocolates === 'kitkat') extra += 1200;
    if (addChocolates === 'dairymilk') extra += 1100;
    if (addChocolates === 'kinderjoy') extra += 1400;
    if (addTeddy) extra += 1000;

    const totalPrice = basePrice + extra;

    const item = {
      id: 'custom-bouquet-curated',
      name: `Custom Handcrafted Bouquet (${bouquetType})`,
      category: 'bouquets',
      category_name: 'Bouquets & Flowers',
      price: totalPrice,
      original_price: totalPrice + 1200,
      image: '/products/crop_1_5.jpg',
      description: `Custom bouquet with ribbon color: ${ribbonColor}. Chocolates: ${addChocolates}. Teddy: ${addTeddy ? 'Yes' : 'No'}`,
      badge: 'Custom Bouquet'
    };

    addToCart(item, 1, bouquetType, {
      Chocolates: addChocolates,
      TeddyAddon: addTeddy ? 'Yes' : 'No',
      Ribbon: ribbonColor,
      GiftCardMessage: cardMessage
    });

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  return (
    <section id="studio" className="py-20 relative bg-gradient-to-b from-[#08090f] via-[#0d101a] to-[#08090f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Custom Design Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Design Your Personalized Gift Live
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Watch your creation come alive in real-time before placing your order. We handcraft each piece to exact perfection.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('spotify')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === 'spotify'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>Spotify Music Frame</span>
            </button>
            <button
              onClick={() => setActiveTab('voice_qr')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === 'voice_qr'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>VoiceQR Audio Frame</span>
            </button>
            <button
              onClick={() => setActiveTab('bouquet')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === 'bouquet'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Bouquet Add-On Builder</span>
            </button>
          </div>
        </div>

        {/* Studio Content Container */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#121522]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          
          {/* 1. SPOTIFY FRAME STUDIO */}
          {activeTab === 'spotify' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Controls Column */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>Personalized Spotify Song Frame</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-normal">
                      Scannable in Spotify App
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Frame your couple anthem or favourite melody. Scan the custom code to stream the tune directly!
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Song Title:</label>
                    <input
                      type="text"
                      value={spotifySong}
                      onChange={(e) => setSpotifySong(e.target.value)}
                      placeholder="e.g. Perfect / Until I Found You"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Artist Name:</label>
                    <input
                      type="text"
                      value={spotifyArtist}
                      onChange={(e) => setSpotifyArtist(e.target.value)}
                      placeholder="e.g. Ed Sheeran"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Personal Dedication / Note:</label>
                    <input
                      type="text"
                      value={spotifyNote}
                      onChange={(e) => setSpotifyNote(e.target.value)}
                      placeholder="e.g. Happy 1st Anniversary, baby ❤️"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Frame Size:</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSpotifySize('A4')}
                          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                            spotifySize === 'A4'
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-white/5 border-white/10 text-slate-400'
                          }`}
                        >
                          A4 Frame (LKR 2,000)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSpotifySize('6x8')}
                          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                            spotifySize === '6x8'
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-white/5 border-white/10 text-slate-400'
                          }`}
                        >
                          6x8 Desk (LKR 1,200)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Upload Custom Photo:</label>
                      <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-slate-300 hover:text-white text-xs cursor-pointer transition-all">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Select Photo</span>
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div>
                    <span className="text-xs text-slate-400">Total Price:</span>
                    <div className="text-xl font-extrabold text-amber-400">
                      LKR {spotifySize === 'A4' ? '2,000.00' : '1,200.00'}
                    </div>
                  </div>
                  <button
                    onClick={handleAddSpotifyToCart}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Customized Plaque to Cart</span>
                  </button>
                </div>
              </div>

              {/* Live Interactive Preview Column */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-sm rounded-2xl p-4 bg-[#0a0c14] border-2 border-amber-500/30 shadow-2xl shadow-amber-500/20 backdrop-blur-2xl">
                  {/* Photo Section */}
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 border border-white/10 relative">
                    <img
                      src={spotifyImage}
                      alt="Custom Memory"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] text-amber-300 font-mono">
                      INT Gift Mart Studio
                    </div>
                  </div>

                  {/* Song Details */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {spotifySong || 'Song Title'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {spotifyArtist || 'Artist Name'}
                      </p>
                    </div>
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                  </div>

                  {/* Scrubber playback bar */}
                  <div className="mt-3 space-y-1">
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-amber-400 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>1:24</span>
                      <span>3:42</span>
                    </div>
                  </div>

                  {/* Simulated Spotify Wave Soundcode */}
                  <div className="mt-4 py-2 px-3 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-black font-extrabold">
                        ●
                      </div>
                      <div className="flex items-center gap-1">
                        {[16, 24, 12, 28, 20, 32, 18, 26, 14, 30, 22, 10, 25, 18, 30, 16, 22, 14].map((h, i) => (
                          <span
                            key={i}
                            className="w-0.5 bg-amber-400 rounded-full"
                            style={{ height: `${h * 0.7}px` }}
                          />
                        ))}
                      </div>
                    </div>
                    <Play className="w-3.5 h-3.5 text-white fill-white" />
                  </div>

                  {/* Bottom dedication note */}
                  <div className="mt-3 text-center">
                    <p className="text-xs text-amber-300/90 font-serif italic">
                      "{spotifyNote}"
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 2. VOICE QR FRAME STUDIO */}
          {activeTab === 'voice_qr' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>VoiceQR Memory Audio Frame</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-normal">
                      Scan with any Phone Camera
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    "Let Your Voice Speak" — link an emotional voice memo, wedding video, or secret YouTube message directly to the physical frame!
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Engraved Frame Title:</label>
                    <input
                      type="text"
                      value={qrTitle}
                      onChange={(e) => setQrTitle(e.target.value)}
                      placeholder="e.g. Listen to Our Song / Message for You"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Audio / Video / Voice Note URL:</label>
                    <input
                      type="text"
                      value={qrLink}
                      onChange={(e) => setQrLink(e.target.value)}
                      placeholder="e.g. YouTube link, Google Drive audio, Cloud link"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Subtitle / Sub-text:</label>
                    <input
                      type="text"
                      value={qrSubtitle}
                      onChange={(e) => setQrSubtitle(e.target.value)}
                      placeholder="e.g. Point camera to scan and listen 🎧"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Size Selection:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setQrSize('6x8')}
                        className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all ${
                          qrSize === '6x8'
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        6x8 (LKR 1,300)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQrSize('A4')}
                        className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all ${
                          qrSize === 'A4'
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        A4 (LKR 2,100)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQrSize('A3')}
                        className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all ${
                          qrSize === 'A3'
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        A3 (LKR 2,900)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div>
                    <span className="text-xs text-slate-400">Total Price:</span>
                    <div className="text-xl font-extrabold text-amber-400">
                      LKR {qrSize === 'A3' ? '2,900.00' : qrSize === 'A4' ? '2,100.00' : '1,300.00'}
                    </div>
                  </div>
                  <button
                    onClick={handleAddQrToCart}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add VoiceQR Frame to Cart</span>
                  </button>
                </div>
              </div>

              {/* QR Preview Frame */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl p-5 bg-[#0a0c14] border-2 border-amber-500/30 shadow-2xl text-center">
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <h4 className="text-base font-bold text-white tracking-wide">
                      {qrTitle}
                    </h4>
                    <p className="text-xs text-amber-400 mt-1">
                      {qrSubtitle}
                    </p>

                    {/* QR Code Graphic Box */}
                    <div className="my-5 p-4 rounded-2xl bg-white mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-lg">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrLink || 'https://intgiftmart.lk')}&color=10-12-19`}
                        alt="Voice QR Code"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="text-[11px] text-slate-400 border-t border-white/10 pt-3 flex items-center justify-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>INT Gift Mart VoiceQR Verified Technology</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* 3. BOUQUET ADD-ON BUILDER */}
          {activeTab === 'bouquet' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>Artisan Bouquet Customizer</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-normal">
                      Korean Gift Wrapping
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your base floral design, attach mouthwatering branded chocolates, plush teddy, and a handwritten card.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Select Floral Base:</label>
                    <select
                      value={bouquetType}
                      onChange={(e) => setBouquetType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value="Velvet Red Roses">Crimson Velvet Everlasting Roses (LKR 2,800)</option>
                      <option value="Luminous Butterfly Bouquet">Luminous Butterfly Fairy Light Bouquet (LKR 2,800)</option>
                      <option value="Diecast Car Bouquet">Diecast Car Model Bouquet (LKR 4,000)</option>
                      <option value="Lamborghini Luxury Bouquet">Lamborghini Luxury Collector Bouquet (LKR 9,000)</option>
                      <option value="Traditional Silk Bangles Bouquet">Traditional Silk Bangles Bouquet (LKR 5,800)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Chocolate Add-Ons:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'none', label: 'No Chocolates', extra: '+ LKR 0' },
                        { id: 'kitkat', label: 'KitKat x4', extra: '+ LKR 1,200' },
                        { id: 'dairymilk', label: 'Dairy Milk x3', extra: '+ LKR 1,100' },
                        { id: 'kinderjoy', label: 'Kinder Joy x2', extra: '+ LKR 1,400' }
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setAddChocolates(c.id)}
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                            addChocolates === c.id
                              ? 'bg-rose-500/20 border-rose-400 text-white'
                              : 'bg-white/5 border-white/10 text-slate-400'
                          }`}
                        >
                          <div className="font-bold">{c.label}</div>
                          <div className="text-[10px] text-amber-300 mt-0.5">{c.extra}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Plush Teddy Add-on:</label>
                      <button
                        type="button"
                        onClick={() => setAddTeddy(!addTeddy)}
                        className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                          addTeddy
                            ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        <span>🧸 Add Soft Mini Teddy (+ LKR 1,000)</span>
                        {addTeddy && <Check className="w-4 h-4 text-rose-400" />}
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Ribbon Silk Color:</label>
                      <select
                        value={ribbonColor}
                        onChange={(e) => setRibbonColor(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="Golden Champagne">Golden Champagne</option>
                        <option value="Royal Velvet Navy">Royal Velvet Navy</option>
                        <option value="Crimson Rose">Crimson Rose</option>
                        <option value="Emerald Green">Emerald Green</option>
                        <option value="Soft Blush Pink">Soft Blush Pink</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Complimentary Gift Card Message:</label>
                    <textarea
                      rows={2}
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      placeholder="Write your sweet love note or birthday wish..."
                      className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div>
                    <span className="text-xs text-slate-400">Custom Bouquet Total:</span>
                    <div className="text-xl font-extrabold text-amber-400">
                      LKR {(
                        (bouquetType.includes('Lamborghini') ? 9000 : 3800) +
                        (addChocolates === 'kitkat' ? 1200 : addChocolates === 'dairymilk' ? 1100 : addChocolates === 'kinderjoy' ? 1400 : 0) +
                        (addTeddy ? 1000 : 0)
                      ).toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={handleAddBouquetToCart}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Customized Bouquet to Cart</span>
                  </button>
                </div>
              </div>

              {/* Bouquet Preview Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl p-4 bg-[#0a0c14] border border-amber-500/30 shadow-2xl">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 relative">
                    <img
                      src="/products/crop_1_5.jpg"
                      alt="Bouquet Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      Custom Craft
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Floral Base:</span>
                      <span className="font-semibold text-white">{bouquetType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Chocolates:</span>
                      <span className="font-semibold text-amber-300">{addChocolates.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Teddy Bear:</span>
                      <span className="font-semibold text-rose-300">{addTeddy ? 'Included (+ LKR 1,000)' : 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ribbon:</span>
                      <span className="font-semibold text-white">{ribbonColor}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 text-[11px] text-amber-300/90 font-serif italic text-center">
                      Card Note: "{cardMessage}"
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
