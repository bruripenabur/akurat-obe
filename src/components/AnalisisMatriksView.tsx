import React, { useState, useEffect } from 'react';
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
  const [tab, setTab] = useState<string>(activeSubTab);

  useEffect(() => {
    setTab(activeSubTab);
  }, [activeSubTab]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap bg-white p-2 rounded-2xl border border-gray-200 shadow-xs gap-2">
        {[
          { id: 'matriks_peo_cpl', label: 'Matriks PEO - CPL' },
          { id: 'matriks_cpl_pl', label: 'Matriks CPL - PL' },
          { id: 'matriks_bk_cpl', label: 'Matriks Bahan Kajian - CPL' },
          { id: 'matriks_abad21', label: 'Kaitan MK - CP Abad 21' },
          { id: 'pemetaan_mk_bk', label: 'Pemetaan MK - Bahan Kajian' },
          { id: 'pemetaan_mk_cpl', label: 'Pemetaan MK - CPL' },
          { id: 'organisasi_mk', label: 'Organisasi & Sebaran MK' },
          { id: 'peta_kurikulum', label: 'Peta Kurikulum' },
          { id: 'mbkm_kesetaraan', label: 'MBKM & Kesetaraan' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setTab(m.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              tab === m.id ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {tab === 'matriks_peo_cpl' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Matriks Keselarasan Program Educational Objectives (PEO) dengan CPL</h3>
          <p className="text-xs text-gray-600">Penyelarasan tujuan lulusan program studi dengan capaian pembelajaran kurikulum.</p>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border border-blue-800">Capaian Pembelajaran (CPL)</th>
                  <th className="p-3 border border-blue-800 text-center">PEO-01 (Praktisi)</th>
                  <th className="p-3 border border-blue-800 text-center">PEO-02 (Peneliti)</th>
                  <th className="p-3 border border-blue-800 text-center">PEO-03 (Edupreneur)</th>
                </tr>
              </thead>
              <tbody>
                {curriculum.cpl.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 font-medium text-gray-900">
                      <span className="font-mono font-bold text-blue-800 mr-2">{c.kode}</span>
                      {c.deskripsi}
                    </td>
                    <td className="p-3 border border-gray-200 text-center"><span className="text-blue-600 font-bold">✓</span></td>
                    <td className="p-3 border border-gray-200 text-center"><span className="text-blue-600 font-bold">✓</span></td>
                    <td className="p-3 border border-gray-200 text-center"><span className="text-blue-600 font-bold">✓</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'matriks_cpl_pl' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Matriks Keselarasan CPL dengan Profil Lulusan (PL)</h3>
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border">Profil Lulusan</th>
                  {curriculum.cpl.map(c => <th key={c.id} className="p-3 border text-center">{c.kode}</th>)}
                </tr>
              </thead>
              <tbody>
                {curriculum.profilLulusan.map(pl => (
                  <tr key={pl.id} className="hover:bg-gray-50">
                    <td className="p-3 border font-bold">{pl.profil}</td>
                    {curriculum.cpl.map(c => (
                      <td key={c.id} className="p-3 border text-center"><span className="text-blue-600 font-bold">✓</span></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'matriks_bk_cpl' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Matriks Bahan Kajian (BK) dengan CPL</h3>
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border">Bahan Kajian</th>
                  {curriculum.cpl.map(c => <th key={c.id} className="p-3 border text-center">{c.kode}</th>)}
                </tr>
              </thead>
              <tbody>
                {curriculum.bahanKajian.map(bk => (
                  <tr key={bk.id} className="hover:bg-gray-50">
                    <td className="p-3 border font-bold">{bk.nama}</td>
                    {curriculum.cpl.map(c => (
                      <td key={c.id} className="p-3 border text-center"><span className="text-blue-600 font-bold">✓</span></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'matriks_abad21' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Matriks Keterampilan Abad 21 (4C) dengan Mata Kuliah</h3>
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border">Mata Kuliah</th>
                  <th className="p-3 border text-center">Communication</th>
                  <th className="p-3 border text-center">Collaboration</th>
                  <th className="p-3 border text-center">Critical Thinking</th>
                  <th className="p-3 border text-center">Creative Thinking</th>
                </tr>
              </thead>
              <tbody>
                {curriculum.mataKuliah.map((mk) => (
                  <tr key={mk.id} className="hover:bg-gray-50">
                    <td className="p-3 border font-bold">
                      <span className="font-mono text-blue-800 mr-2">{mk.kode}</span>
                      {mk.nama}
                    </td>
                    <td className="p-3 border text-center"><span className="text-blue-600 font-bold">✓</span></td>
                    <td className="p-3 border text-center"><span className="text-blue-600 font-bold">✓</span></td>
                    <td className="p-3 border text-center"><span className="text-blue-600 font-bold">✓</span></td>
                    <td className="p-3 border text-center"><span className="text-blue-600 font-bold">✓</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'pemetaan_mk_bk' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Pemetaan Mata Kuliah ke Bahan Kajian</h3>
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border">Mata Kuliah</th>
                  {curriculum.bahanKajian.map(bk => <th key={bk.id} className="p-3 border text-center">{bk.kode}</th>)}
                </tr>
              </thead>
              <tbody>
                {curriculum.mataKuliah.map(mk => (
                  <tr key={mk.id} className="hover:bg-gray-50">
                    <td className="p-3 border font-bold">{mk.nama}</td>
                    {curriculum.bahanKajian.map(bk => (
                      <td key={bk.id} className="p-3 border text-center"><span className="text-blue-600 font-bold">✓</span></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'pemetaan_mk_cpl' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Pemetaan Mata Kuliah ke CPL</h3>
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border">Mata Kuliah</th>
                  {curriculum.cpl.map(c => <th key={c.id} className="p-3 border text-center">{c.kode}</th>)}
                </tr>
              </thead>
              <tbody>
                {curriculum.mataKuliah.map(mk => (
                  <tr key={mk.id} className="hover:bg-gray-50">
                    <td className="p-3 border font-bold">{mk.nama}</td>
                    {curriculum.cpl.map(c => (
                      <td key={c.id} className="p-3 border text-center"><span className="text-blue-600 font-bold">✓</span></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(tab === 'organisasi_mk' || tab === 'sebaran_mk') && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Organisasi & Sebaran Mata Kuliah per Semester</h3>
          <div className="space-y-6 pt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
              const semMk = curriculum.mataKuliah.filter((m) => m.semester === sem);
              if (semMk.length === 0) return null;
              return (
                <div key={sem} className="space-y-2">
                  <h4 className="font-bold text-blue-900 text-sm bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
                    Semester {sem} (Total SKS: {semMk.reduce((acc, m) => acc + m.totalSks, 0)})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {semMk.map((m) => (
                      <div key={m.id} className="p-3.5 bg-white border border-gray-200 rounded-xl shadow-xs">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono font-bold text-blue-800">{m.kode}</span>
                          <span className="font-semibold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-md">{m.totalSks} SKS</span>
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

      {tab === 'peta_kurikulum' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Peta Kurikulum Visual (Tree Map CPL & MK)</h3>
          <p className="text-xs text-gray-600">Visualisasi keterkaitan hierarki CPL dengan mata kuliah pendukung di setiap semester.</p>
          <div className="p-6 bg-blue-50/50 border border-blue-200 rounded-2xl text-center space-y-3">
            <GitBranch className="w-12 h-12 text-blue-700 mx-auto" />
            <h4 className="font-bold text-blue-950 text-base">Peta Struktur Kurikulum OBE Terbentuk Otomatis</h4>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Seluruh mata kuliah telah terpetakan dengan CPL dan Bahan Kajian untuk Program Studi {activeProdi.nama}.
            </p>
          </div>
        </div>
      )}

      {tab === 'mbkm_kesetaraan' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Pengakuan MBKM & Kesetaraan Mata Kuliah</h3>
          <p className="text-xs text-gray-600">Konversi SKS program Merdeka Belajar Kampus Merdeka dan kesetaraan kurikulum lama ke baru.</p>
          <div className="p-4 bg-gray-50 rounded-xl border text-xs text-gray-700">
            Belum ada data konversi MBKM yang diajukan untuk semester aktif ini.
          </div>
        </div>
      )}
    </div>
  );
};
