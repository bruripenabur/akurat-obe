import React, { useState } from 'react';
import { Prodi } from '../types';
import { GraduationCap, ChevronDown, User, ShieldCheck, Sparkles, Building2, Search, Check, Cloud, LogOut } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase';

interface NavbarProps {
  prodiList: Prodi[];
  activeProdi: Prodi;
  setActiveProdi: (p: Prodi) => void;
  tahunKurikulum: string;
  setTahunKurikulum: (t: string) => void;
  userRole: string;
  setUserRole: (role: string) => void;
  onOpenLanding: () => void;
  onOpenLogin: () => void;
  currentUser: any;
  onAuthStateChangedUser: (user: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  prodiList,
  activeProdi,
  setActiveProdi,
  tahunKurikulum,
  setTahunKurikulum,
  userRole,
  setUserRole,
  onOpenLanding,
  onOpenLogin,
  currentUser,
  onAuthStateChangedUser,
}) => {
  const [showProdiModal, setShowProdiModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProdi = prodiList.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fakultas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.kode.includes(searchTerm)
  );

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onAuthStateChangedUser(result.user);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onAuthStateChangedUser(null);
      onOpenLogin();
    } catch (err) {
      onAuthStateChangedUser(null);
      onOpenLogin();
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white shadow-lg sticky top-0 z-40 border-b border-blue-700/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onOpenLanding}>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md p-1 border-2 border-yellow-200 overflow-hidden">
              <img src="/public/assets/aistudio/logo-unpatti-satuta-trans_3a9e0d9e.png" alt="Logo Unpatti" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wide text-lg bg-gradient-to-r from-white via-emerald-100 to-yellow-300 bg-clip-text text-transparent">
                  AKURAT - OBE
                </span>
                <span className="px-2 py-0.5 text-xs bg-emerald-600/80 text-yellow-300 font-semibold rounded-full border border-yellow-400/40">
                  Firestore Real-time
                </span>
              </div>
              <p className="text-xs text-emerald-200">Universitas Pattimura (117 Prodi Terintegrasi)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Prodi Selector Button */}
            <button
              onClick={() => setShowProdiModal(true)}
              className="flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-700/80 border border-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium transition shadow-inner"
            >
              <Building2 className="w-4 h-4 text-yellow-400" />
              <div className="text-left max-w-[180px] md:max-w-[240px] truncate">
                <span className="font-bold">{activeProdi.nama}</span>
                <span className="text-emerald-300 block text-[10px]">{activeProdi.fakultas} ({activeProdi.jenjang})</span>
              </div>
              <ChevronDown className="w-4 h-4 text-emerald-300" />
            </button>

            {/* Tahun Kurikulum */}
            <select
              value={tahunKurikulum}
              onChange={(e) => setTahunKurikulum(e.target.value)}
              aria-label="Tahun Kurikulum"
              className="bg-emerald-950/80 border border-emerald-600 text-white text-xs rounded-xl px-2.5 py-1.5 font-medium focus:outline-hidden"
            >
              <option value="2026">Kurikulum 2026</option>
              <option value="2025">Kurikulum 2025</option>
            </select>

            {/* Login / Auth Button */}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-blue-200 hidden md:inline font-medium">{currentUser.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-blue-950 px-4 py-1.5 rounded-xl text-xs font-bold transition shadow-md"
                >
                  <span>Keluar</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-blue-950 px-4 py-1.5 rounded-xl text-xs font-bold transition shadow-md"
              >
                <span>Masuk</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Modal 117 Prodi Selection */}
      {showProdiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-emerald-100 flex flex-col max-h-[85vh]">
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Pilih Konteks Program Studi (117 Prodi Unpatti)</h3>
                <p className="text-xs text-emerald-200">Sinkronisasi real-time via Firestore untuk UPPS dan Program Studi.</p>
              </div>
              <button onClick={() => setShowProdiModal(false)} className="text-white/80 hover:text-white p-1 rounded-lg">
                ✕
              </button>
            </div>

            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama prodi, fakultas, atau kode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
              {filteredProdi.map((p) => {
                const isSelected = p.kode === activeProdi.kode;
                return (
                  <div
                    key={p.kode}
                    onClick={() => {
                      setActiveProdi(p);
                      setShowProdiModal(false);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-emerald-400 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                          {p.kode}
                        </span>
                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-md">
                          {p.jenjang}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mt-1.5">{p.nama}</h4>
                      <p className="text-xs text-emerald-700 font-medium mt-0.5">{p.fakultas}</p>
                      <p className="text-[11px] text-gray-500 mt-1">Kaprodi: {p.kaprodi}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center text-xs text-gray-600">
              <span>Total 117 Program Studi Universitas Pattimura</span>
              <button
                onClick={() => setShowProdiModal(false)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl font-medium hover:bg-emerald-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
