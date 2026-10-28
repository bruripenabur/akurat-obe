import React from 'react';
import { GraduationCap, Sparkles, Building2, BookOpen, Network, Printer, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Prodi } from '../types';

interface LandingHeroProps {
  onEnterDashboard: () => void;
  onOpenLogin: () => void;
  prodiCount: number;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onEnterDashboard, onOpenLogin, prodiCount }) => {
  return (
    <div className="min-h-screen relative text-white flex flex-col justify-between overflow-hidden">
      {/* Background Building Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/assets/aistudio/Unpatti-Unggul-Berssinar_0415d6d9.jpg"
          alt="Gedung Universitas Pattimura"
          className="w-full h-full object-cover filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/85 to-gray-950/95"></div>
      </div>

      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-blue-800/60 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-1.5 border-2 border-yellow-300 shadow-2xl overflow-hidden">
            <img
              src="/public/assets/aistudio/logo-unpatti-satuta-trans_3a9e0d9e.png"
              alt="Logo Unpatti"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-blue-100 to-yellow-300 bg-clip-text text-transparent">
              AKURAT - OBE
            </h1>
            <p className="text-xs text-blue-200 font-medium">Universitas Pattimura (Ambon - Maluku)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-sm rounded-xl shadow-lg transition"
          >
            Masuk
          </button>
          <button
            onClick={onEnterDashboard}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <span>Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 relative z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/80 border border-blue-600 rounded-full text-xs font-semibold text-yellow-300 shadow-md">
            <Sparkles className="w-4 h-4" />
            <span>Platform Asistensi Kurikulum Berbasis Outcome-Based Education (OBE) Terintegrasi AI</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Transformasi Digital Kurikulum <span className="text-yellow-400">117 Program Studi</span> Universitas Pattimura
          </h2>

          <p className="text-blue-100 text-base leading-relaxed">
            Sistem terintegrasi untuk perencanaan, pemetaan, implementasi RPS, pengukuran CPL/CPMK, dan pelaporan otomatis kurikulum dari seluruh Fakultas, Pascasarjana, dan PSDKU Universitas Pattimura selaras dengan Standar Nasional Dikti.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-blue-900/70 border border-blue-700/60 rounded-2xl backdrop-blur-xs">
              <div className="text-2xl font-black text-yellow-400">{prodiCount} +</div>
              <div className="text-xs text-blue-200 mt-1">Program Studi Terintegrasi</div>
            </div>
            <div className="p-4 bg-blue-900/70 border border-blue-700/60 rounded-2xl backdrop-blur-xs">
              <div className="text-2xl font-black text-yellow-400">100%</div>
              <div className="text-xs text-blue-200 mt-1">Standar OBE & SN Dikti</div>
            </div>
            <div className="p-4 bg-blue-900/70 border border-blue-700/60 rounded-2xl col-span-2 sm:col-span-1 backdrop-blur-xs">
              <div className="text-2xl font-black text-yellow-400">AI Copilot</div>
              <div className="text-xs text-blue-200 mt-1">Asistensi Pintar Kurikulum</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onOpenLogin}
              className="px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold rounded-xl shadow-xl transition text-base"
            >
              Masuk Aplikasi Sekarang
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-blue-950/70 border border-blue-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-6">
            <h3 className="text-lg font-bold text-yellow-300 flex items-center gap-2 border-b border-blue-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              <span>Modul Unggulan AKURAT-OBE</span>
            </h3>

            <div className="space-y-4 text-sm text-blue-100">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Identitas & Landasan Kurikulum</strong>
                  <span className="text-xs text-blue-300">Dasar pemikiran, yuridis, visi misi UPPS & Prodi, serta kamus istilah OBE.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Matriks & Pemetaan Komprehensif</strong>
                  <span className="text-xs text-blue-300">Keterkaitan PEO-CPL, Bahan Kajian, MK Abad 21, dan Peta Kurikulum visual.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Manajemen RPS Digital & Otomatis</strong>
                  <span className="text-xs text-blue-300">Penyusunan Rencana Pembelajaran Semester 16 pertemuan lengkap dengan rubrik.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Ekspor Dokumen Kurikulum (Word/PDF)</strong>
                  <span className="text-xs text-blue-300">Penyusunan dokumen kurikulum siap unduh secara instan.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-800 text-xs text-blue-300">
              <p className="font-semibold text-white mb-1">Pengembang / Peneliti:</p>
              <p>Dr. Bruri Melky Laimeherwa, M.Si., dan Partners | Universitas Pattimura</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 border-t border-blue-900 py-6 px-6 text-center text-xs text-blue-300 relative z-10">
        <p>© 2026 AKURAT - OBE Universitas Pattimura. Platform Asistensi Kurikulum Berbasis Outcome Based Education.</p>
      </footer>
    </div>
  );
};
