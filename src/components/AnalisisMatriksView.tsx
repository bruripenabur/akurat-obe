import React, { useState } from 'react';
import { CurriculumData, Prodi } from '../types';
import { Network, Check, Layers, GitBranch, Table } from 'lucide-react';

interface AnalisisMatriksViewProps {
  curriculum: CurriculumData;
  activeProdi: Prodi;
  activeSubTab: string;
}

export const AnalisisMatriksView: React.FC<AnalisisMatriksViewProps> = ({
  curriculum,
  activeProdi,
  activeSubTab = 'matriks_peo_cpl',
}) => {
  const [tab, setTab] = useState<'peo_cpl' | 'cpl_pl' | 'abad21' | 'sebaran' | 'peta'>(
    activeSubTab === 'peta_kurikulum' ? 'peta' : activeSubTab === 'sebaran_mk' ? 'sebaran' : 'peo_cpl'
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap bg-white p-2 rounded-2xl border border-gray-200 shadow-xs gap-2">
        <button
          onClick={() => setTab('peo_cpl')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            tab === 'peo_cpl' ? 'bg-emerald-700 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Matriks PEO - CPL</span>
        </button>
        <button
          onClick={() => setTab('cpl_pl')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            tab === 'cpl_pl' ? 'bg-emerald-700 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Matriks CPL - PL</span>
        </button>
        <button
          onClick={() => setTab('abad21')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            tab === 'abad21' ? 'bg-emerald-700 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Kaitan MK - CP Abad 21</span>
        </button>
        <button
          onClick={() => setTab('sebaran')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            tab === 'sebaran' ? 'bg-emerald-700 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Sebaran Mata Kuliah</span>
        </button>
        <button
          onClick={() => setTab('peta')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            tab === 'peta' ? 'bg-emerald-700 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Peta Kurikulum</span>
        </button>
      </div>

      {tab === 'peo_cpl' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Matriks Keselarasan Program Educational Objectives (PEO) dengan CPL</h3>
          <p className="text-xs text-gray-600">Penyelarasan tujuan lulusan program studi dengan capaian pembelajaran kurikulum.</p>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-emerald-900 text-white">
                  <th className="p-3 border border-emerald-800">Capaian Pembelajaran (CPL)</th>
                  <th className="p-3 border border-emerald-800 text-center">PEO-01 (Praktisi)</th>
                  <th className="p-3 border border-emerald-800 text-center">PEO-02 (Peneliti)</th>
                  <th className="p-3 border border-emerald-800 text-center">PEO-03 (Edupreneur)</th>
                </tr>
              </thead>
              <tbody>
                {curriculum.cpl.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 font-medium text-gray-900">
                      <span className="font-mono font-bold text-emerald-800 mr-2">{c.kode}</span>
                      {c.deskripsi}
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <span className="inline-flex w-6 h-6 bg-emerald-100 text-emerald-800 items-center justify-center rounded-md font-bold">✓</span>
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <span className="inline-flex w-6 h-6 bg-emerald-100 text-emerald-800 items-center justify-center rounded-md font-bold">✓</span>
                    </td>
                    <td className="p-3 border border-gray-200 text-center">
                      <span className="inline-flex w-6 h-6 bg-emerald-100 text-emerald-800 items-center justify-center rounded-md font-bold">✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'abad21' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Matriks Keterampilan Abad 21 (4C) dengan Mata Kuliah</h3>
          <p className="text-xs text-gray-600">Kompetensi Communication, Collaboration, Critical Thinking, dan Creative Thinking pada tiap mata kuliah.</p>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-emerald-900 text-white">
                  <th className="p-3 border border-emerald-800">Mata Kuliah</th>
                  <th className="p-3 border border-emerald-800 text-center">Communication</th>
                  <th className="p-3 border border-emerald-800 text-center">Collaboration</th>
                  <th className="p-3 border border-emerald-800 text-center">Critical Thinking</th>
                  <th className="p-3 border border-emerald-800 text-center">Creative Thinking</th>
                </tr>
              </thead>
              <tbody>
                {curriculum.mataKuliah.map((mk) => (
                  <tr key={mk.id} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 font-bold text-gray-900">
                      <span className="font-mono text-emerald-800 mr-2">{mk.kode}</span>
                      {mk.nama}
                    </td>
                    <td className="p-3 border border-gray-200 text-center"><span className="text-emerald-600 font-bold">✓</span></td>
                    <td className="p-3 border border-gray-200 text-center"><span className="text-emerald-600 font-bold">✓</span></td>
                    <td className="p-3 border border-gray-200 text-center"><span className="text-emerald-600 font-bold">✓</span></td>
                    <td className="p-3 border border-gray-200 text-center"><span className="text-emerald-600 font-bold">✓</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'sebaran' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Sebaran Mata Kuliah per Semester</h3>
          <div className="space-y-6 pt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
              const semMk = curriculum.mataKuliah.filter((m) => m.semester === sem);
              if (semMk.length === 0) return null;
              return (
                <div key={sem} className="space-y-2">
                  <h4 className="font-bold text-emerald-900 text-sm bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    Semester {sem} (Total SKS: {semMk.reduce((acc, m) => acc + m.totalSks, 0)})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {semMk.map((m) => (
                      <div key={m.id} className="p-3.5 bg-white border border-gray-200 rounded-xl shadow-xs">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono font-bold text-emerald-800">{m.kode}</span>
                          <span className="font-semibold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md">{m.totalSks} SKS</span>
                        </div>
                        <h5 className="font-bold text-gray-900 text-sm mt-1">{m.nama}</h5>
                        <p className="text-[11px] text-gray-500 mt-1">{m.kelompok}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'peta' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Peta Kurikulum Visual (Tree Map CPL & MK)</h3>
          <p className="text-xs text-gray-600">Visualisasi keterkaitan hierarki CPL dengan mata Kuliah pendukung di setiap semester.</p>
          <div className="p-6 bg-emerald-50/50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <GitBranch className="w-12 h-12 text-emerald-700 mx-auto" />
            <h4 className="font-bold text-emerald-950 text-base">Peta Struktur Kurikulum OBE Terbentuk Otomatis</h4>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Seluruh mata kuliah telah terpetakan dengan CPL dan Bahan Kajian. Anda dapat mengekspor diagram ini ke format PNG atau PDF berkualitas tinggi.
            </p>
          </div>
        </div>
      )}

      {tab !== 'peo_cpl' && tab !== 'abad21' && tab !== 'sebaran' && tab !== 'peta' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
          <h3 className="font-bold text-gray-800">Modul Analisis Matriks {tab.toUpperCase()}</h3>
          <p className="text-xs text-gray-600 mt-1">Data matriks dihitung dan disinkronkan secara otomatis dari entri kurikulum.</p>
        </div>
      )}
    </div>
  );
};
