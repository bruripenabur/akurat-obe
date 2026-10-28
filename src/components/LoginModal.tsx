import React, { useState } from 'react';
import { User, Key, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { auth, googleProvider, signInWithPopup } from '../firebase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (username === 'akuratobe' && password === '12345') {
        setTimeout(() => {
          onLoginSuccess({ displayName: 'Dr. Bruri Melky Laimeherwa, M.Si.', email: 'bruripenabur@gmail.com' });
          setLoading(false);
          onClose();
        }, 500);
      } else if (!username || !password) {
        setError('Silakan masukkan Akun Pengguna dan Kata Sandi.');
        setLoading(false);
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        onLoginSuccess(result.user);
        setLoading(false);
        onClose();
      }
    } catch (err: any) {
      if (username === 'akuratobe' && password === '12345') {
        onLoginSuccess({ displayName: 'Dr. Bruri Melky Laimeherwa, M.Si.', email: 'bruripenabur@gmail.com' });
        setLoading(false);
        onClose();
      } else {
        setError('Akun atau Kata Sandi salah. Gunakan akuratobe / 12345.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-gray-100">
        
        {/* Left Side: Unpatti Building Background with Overlay */}
        <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-[580px] flex flex-col justify-end p-8 overflow-hidden">
          <img
            src="/public/assets/aistudio/Unpatti-Unggul-Berssinar_0415d6d9.jpg"
            alt="Gedung Universitas Pattimura"
            className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-lime-400 rounded-full"></div>
              <span className="text-lime-300 font-bold text-xs tracking-widest uppercase">SELAMAT DATANG</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-white leading-snug">
              Aplikasi Kurikulum Berbasis OBE
            </h2>
            <p className="text-xl font-bold text-yellow-300">
              Universitas Pattimura
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-white">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold hidden">
              ✕
            </button>
          </div>

          <div className="space-y-6 my-auto">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto bg-white rounded-2xl p-2 shadow-md border border-gray-100 flex items-center justify-center">
                <img
                  src="/public/assets/aistudio/logo-unpatti-satuta-trans_3a9e0d9e.png"
                  alt="Logo Unpatti"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-700">Silakan Login</h3>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-cyan-500">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  placeholder="Masukkan Akun Pengguna"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border-b border-gray-300 focus:border-cyan-500 focus:outline-hidden text-sm text-gray-800 placeholder-gray-400 font-medium"
                />
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-3 text-cyan-500">
                  <Key className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-gray-50/50 border-b border-gray-300 focus:border-cyan-500 focus:outline-hidden text-sm text-gray-800 placeholder-gray-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <span>{loading ? 'Memproses...' : 'Masuk Aplikasi'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-between items-center text-xs">
            <a href="#lupa" onClick={(e) => { e.preventDefault(); alert('Silakan hubungi Unit TIK / Akademik Universitas Pattimura untuk reset password.'); }} className="text-cyan-600 hover:underline font-medium">
              Lupa Password?
            </a>
            <span className="text-gray-400">AKURAT-OBE v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
