import React, { useState, useEffect } from 'react';
import { CurriculumData, Prodi } from '../types';
import { Calculator, Award, CheckCircle2 } from 'lucide-react';

interface PengukuranViewProps {
  curriculum: CurriculumData;
  activeProdi: Prodi;
  activeSubTab: string;
}

export const PengukuranView: React.FC<PengukuranViewProps> = ({
  curriculum,
  activeProdi,
  activeSubTab = 'rubrik_rumus',
}) => {
  const [tab, setTab] = useState<string>(
    activeSubTab === 'pengukuran_cpmk' ? 'cpmk' : activeSubTab === 'pengukuran_cpl' ? 'cpl' : 'rumus'
  );

  useEffect(() => {
    if (activeSubTab === 'pengukuran_cpmk') setTab('cpmk');
    else if (activeSubTab === 'pengukuran_cpl') setTab('cpl');
    else if (activeSubTab === 'rubrik_rumus') setTab('rumus');
  }, [activeSubTab]);

  return (
    <div className="space-y-6">
      <div className="flex bg-white p-2 rounded-2xl border border-gray-200 shadow-xs gap-2">
        <button
          onClick={() => setTab('rumus')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            tab === 'rumus' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Rubrik & Rumus Pengukuran</span>
        </button>
        <button
          onClick={() => setTab('cpmk')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            tab === 'cpmk' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Pengukuran CPMK</span>
        </button>
        <button
          onClick={() => setTab('cpl')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            tab === 'cpl' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Pengukuran CPL (Agregat)</span>
        </button>
      </div>

      {tab === 'rumus' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-gray-950 border-b pb-3">Rubrik & Rumus Pengukuran CPMK / CPL</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-3">
              <h4 className="font-bold text-blue-950 text-sm">Persamaan (1) - Kalkulasi Nilai CPMK</h4>
              <p className="text-xs text-gray-700 font-mono bg-white p-3 rounded-xl border border-blue-300">
                CPMKₖ = Σ (Aᵢ × Wᵢ) / 100
              </p>
              <p className="text-xs text-gray-600">
                Dimana Aᵢ adalah nilai skor asesmen komponen ke-i dan Wᵢ adalah bobot persentase asesmen (tugas, kuis, UTS, UAS).
              </p>
            </div>

            <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-3">
              <h4 className="font-bold text-blue-950 text-sm">Persamaan (2) - Kalkulasi CPL Individu</h4>
              <p className="text-xs text-gray-700 font-mono bg-white p-3 rounded-xl border border-blue-300">
                CPLⱼ = Σ (CPMKₖᵣ × SKSₘₖ) / Σ SKSₘₖ
              </p>
              <p className="text-xs text-gray-600">
                Agregasi nilai CPMK dari seluruh mata kuliah yang mendukung CPLⱼ dengan pembobotan SKS mata kuliah.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3">Tabel Kriteria Kualitatif Baku (Skala 0-100)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200 text-xs">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="p-3 border">Tingkat</th>
                    <th className="p-3 border">Rentang Nilai</th>
                    <th className="p-3 border">Deskripsi Capaian</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50"><td className="p-3 border font-bold text-blue-800">Unggul</td><td className="p-3 border font-mono">86 - 100</td><td className="p-3 border text-gray-600">Penguasaan kompetensi sangat kuat, mampu bernalar, dan menganalisis secara mandiri.</td></tr>
                  <tr className="hover:bg-gray-50"><td className="p-3 border font-bold text-blue-800">Baik Sekali</td><td className="p-3 border font-mono">76 - 85</td><td className="p-3 border text-gray-600">Pemahaman mendalam, menyelesaikan tugas kompleks dengan bimbingan minimal.</td></tr>
                  <tr className="hover:bg-gray-50"><td className="p-3 border font-bold text-blue-800">Baik</td><td className="p-3 border font-mono">66 - 75</td><td className="p-3 border text-gray-600">Pemahaman memadai, menyelesaikan tugas rutin secara mandiri.</td></tr>
                  <tr className="hover:bg-gray-50"><td className="p-3 border font-bold text-yellow-700">Cukup</td><td className="p-3 border font-mono">56 - 65</td><td className="p-3 border text-gray-600">Pemahaman dasar terpenuhi, memerlukan pendampingan intesif.</td></tr>
                  <tr className="hover:bg-gray-50"><td className="p-3 border font-bold text-red-600">Kurang / Gagal</td><td className="p-3 border font-mono">0 - 55</td><td className="p-3 border text-gray-600">Belum memenuhi kriteria minimum capaian kompetensi.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab !== 'rumus' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-2">
          <h3 className="font-bold text-gray-800 text-base">Modul Pengukuran {tab.toUpperCase()}</h3>
          <p className="text-xs text-gray-600">Rekapitulasi hasil asesmen mahasiswa terintegrasi dengan basis data program studi.</p>
        </div>
      )}
    </div>
  );
};
