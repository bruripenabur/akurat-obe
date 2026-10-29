import React, { useState, useEffect } from 'react';
import { CurriculumData, Prodi } from '../types';
import { Sparkles, Plus, Trash2, Edit3, GraduationCap, Award, BookOpen, Layers } from 'lucide-react';
import { AiAssistantModal } from './AiAssistantModal';

interface EntriKomponenViewProps {
  curriculum: CurriculumData;
  setCurriculum: React.Dispatch<React.SetStateAction<CurriculumData>>;
  activeProdi: Prodi;
  activeSubTab: string;
}

export const EntriKomponenView: React.FC<EntriKomponenViewProps> = ({
  curriculum,
  setCurriculum,
  activeProdi,
  activeSubTab = 'profil_lulusan',
}) => {
  const [tab, setTab] = useState<string>(
    activeSubTab === 'cpl_rumusan' ? 'cpl' : activeSubTab === 'bahan_kajian' ? 'bk' : activeSubTab === 'pembentukan_mk' ? 'mk' : 'po'
  );

  useEffect(() => {
    if (activeSubTab === 'cpl_rumusan') setTab('cpl');
    else if (activeSubTab === 'bahan_kajian') setTab('bk');
    else if (activeSubTab === 'pembentukan_mk') setTab('mk');
    else if (activeSubTab === 'profil_lulusan') setTab('po');
  }, [activeSubTab]);

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiActionType, setAiActionType] = useState<'po' | 'cpl' | 'bk' | 'mk'>('po');

  // New item states
  const [newPo, setNewPo] = useState({ profil: '', deskripsi: '', profesi: '' });
  const [newCpl, setNewCpl] = useState({ domain: 'Pengetahuan' as const, deskripsi: '' });
  const [newBk, setNewBk] = useState({ nama: '', deskripsi: '' });
  const [newMk, setNewMk] = useState({ nama: '', kelompok: 'Wajib Prodi' as const, semester: 1, sksTeori: 2, sksPraktik: 1, deskripsi: '' });

  const handleAddPo = () => {
    if (!newPo.profil) return;
    const newItem = {
      id: `PL-0${curriculum.profilLulusan.length + 1}`,
      kode: `PL-0${curriculum.profilLulusan.length + 1}`,
      ...newPo,
    };
    setCurriculum({
      ...curriculum,
      profilLulusan: [...curriculum.profilLulusan, newItem],
    });
    setNewPo({ profil: '', deskripsi: '', profesi: '' });
  };

  const handleAddMk = () => {
    if (!newMk.nama) return;
    const totalSks = Number(newMk.sksTeori) + Number(newMk.sksPraktik);
    const newMkuliah = {
      id: `MK-${Date.now()}`,
      kode: `UNP${Math.floor(100 + Math.random() * 900)}`,
      ...newMk,
      totalSks,
      cpmkIds: ['CPMK-1'],
    };
    setCurriculum({
      ...curriculum,
      mataKuliah: [...curriculum.mataKuliah, newMkuliah],
    });
    setNewMk({ nama: '', kelompok: 'Wajib Prodi', semester: 1, sksTeori: 2, sksPraktik: 1, deskripsi: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-white p-2 rounded-2xl border border-gray-200 shadow-xs gap-2">
        <button
          onClick={() => setTab('po')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            tab === 'po' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Profil Lulusan (PO)</span>
        </button>
        <button
          onClick={() => setTab('cpl')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            tab === 'cpl' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Rumusan CPL (PLO)</span>
        </button>
        <button
          onClick={() => setTab('bk')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            tab === 'bk' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bahan Kajian (BK)</span>
        </button>
        <button
          onClick={() => setTab('mk')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            tab === 'mk' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Mata Kuliah & SKS</span>
        </button>
      </div>

      {tab === 'po' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-gray-900">Tambah Profil Lulusan (PO)</h3>
              <button
                onClick={() => {
                  setAiActionType('po');
                  setAiPrompt(`Berikan 3 opsi Profil Lulusan (PO) beserta deskripsi dan okupasi profesi untuk Program Studi ${activeProdi.nama} Universitas Pattimura.`);
                  setAiModalOpen(true);
                }}
                className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Generate dengan AI</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Nama Profil Lulusan (Cth: Praktisi Ahli)"
                value={newPo.profil}
                onChange={(e) => setNewPo({ ...newPo, profil: e.target.value })}
                className="p-3 border border-gray-300 rounded-xl text-sm"
              />
              <input
                type="text"
                placeholder="Okupasi / Profesi (Cth: Konsultan, Peneliti)"
                value={newPo.profesi}
                onChange={(e) => setNewPo({ ...newPo, profesi: e.target.value })}
                className="p-3 border border-gray-300 rounded-xl text-sm"
              />
              <input
                type="text"
                placeholder="Deskripsi Singkat"
                value={newPo.deskripsi}
                onChange={(e) => setNewPo({ ...newPo, deskripsi: e.target.value })}
                className="p-3 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <button
              onClick={handleAddPo}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Profil Lulusan</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white text-xs">
                  <th className="p-3.5">Kode</th>
                  <th className="p-3.5">Profil Lulusan</th>
                  <th className="p-3.5">Deskripsi</th>
                  <th className="p-3.5">Okupasi / Profesi</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs">
                {curriculum.profilLulusan.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3.5 font-mono font-bold text-blue-800">{item.kode}</td>
                    <td className="p-3.5 font-bold text-gray-900">{item.profil}</td>
                    <td className="p-3.5 text-gray-600">{item.deskripsi}</td>
                    <td className="p-3.5 text-gray-800 font-medium">{item.profesi}</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() =>
                          setCurriculum({
                            ...curriculum,
                            profilLulusan: curriculum.profilLulusan.filter((p) => p.id !== item.id),
                          })
                        }
                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'cpl' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Capaian Pembelajaran Lulusan (CPL)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border">Kode</th>
                  <th className="p-3 border">Domain</th>
                  <th className="p-3 border">Deskripsi CPL</th>
                </tr>
              </thead>
              <tbody>
                {curriculum.cpl.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-3 border font-mono font-bold text-blue-800">{c.kode}</td>
                    <td className="p-3 border font-bold text-gray-700">{c.domain}</td>
                    <td className="p-3 border text-gray-800">{c.deskripsi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'bk' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Bahan Kajian & Deskripsinya</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border">Kode</th>
                  <th className="p-3 border">Nama Bahan Kajian</th>
                  <th className="p-3 border">Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {curriculum.bahanKajian.map((bk) => (
                  <tr key={bk.id} className="hover:bg-gray-50">
                    <td className="p-3 border font-mono font-bold text-blue-800">{bk.kode}</td>
                    <td className="p-3 border font-bold text-gray-900">{bk.nama}</td>
                    <td className="p-3 border text-gray-700">{bk.deskripsi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'mk' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b pb-3">Entri Mata Kuliah & Bobot SKS</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Nama Mata Kuliah"
                value={newMk.nama}
                onChange={(e) => setNewMk({ ...newMk, nama: e.target.value })}
                className="p-3 border border-gray-300 rounded-xl text-sm md:col-span-2"
              />
              <select
                value={newMk.kelompok}
                onChange={(e) => setNewMk({ ...newMk, kelompok: e.target.value as any })}
                aria-label="Kelompok Mata Kuliah"
                className="p-3 border border-gray-300 rounded-xl text-sm bg-white"
              >
                <option value="Wajib Universitas">Wajib Universitas</option>
                <option value="Wajib Prodi">Wajib Prodi</option>
                <option value="Pilihan">Pilihan</option>
                <option value="MBKM">MBKM</option>
              </select>
              <select
                value={newMk.semester}
                onChange={(e) => setNewMk({ ...newMk, semester: Number(e.target.value) })}
                aria-label="Semester"
                className="p-3 border border-gray-300 rounded-xl text-sm bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="SKS Teori"
                value={newMk.sksTeori}
                onChange={(e) => setNewMk({ ...newMk, sksTeori: Number(e.target.value) })}
                className="p-3 border border-gray-300 rounded-xl text-sm"
              />
              <input
                type="number"
                placeholder="SKS Praktik"
                value={newMk.sksPraktik}
                onChange={(e) => setNewMk({ ...newMk, sksPraktik: Number(e.target.value) })}
                className="p-3 border border-gray-300 rounded-xl text-sm"
              />
              <input
                type="text"
                placeholder="Deskripsi Singkat"
                value={newMk.deskripsi}
                onChange={(e) => setNewMk({ ...newMk, deskripsi: e.target.value })}
                className="p-3 border border-gray-300 rounded-xl text-sm md:col-span-2"
              />
            </div>
            <button
              onClick={handleAddMk}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan Mata Kuliah Baru</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white text-xs">
                  <th className="p-3.5">Kode</th>
                  <th className="p-3.5">Nama Mata Kuliah</th>
                  <th className="p-3.5">Kelompok</th>
                  <th className="p-3.5 text-center">Sem</th>
                  <th className="p-3.5 text-center">Teori</th>
                  <th className="p-3.5 text-center">Praktik</th>
                  <th className="p-3.5 text-center">Total SKS</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs">
                {curriculum.mataKuliah.map((mk) => (
                  <tr key={mk.id} className="hover:bg-gray-50">
                    <td className="p-3.5 font-mono font-bold text-blue-800">{mk.kode}</td>
                    <td className="p-3.5 font-bold text-gray-900">{mk.nama}</td>
                    <td className="p-3.5 text-gray-700">{mk.kelompok}</td>
                    <td className="p-3.5 text-center font-bold">{mk.semester}</td>
                    <td className="p-3.5 text-center">{mk.sksTeori}</td>
                    <td className="p-3.5 text-center">{mk.sksPraktik}</td>
                    <td className="p-3.5 text-center font-bold text-blue-700">{mk.totalSks}</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() =>
                          setCurriculum({
                            ...curriculum,
                            mataKuliah: curriculum.mataKuliah.filter((m) => m.id !== mk.id),
                          })
                        }
                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        title="AI Copilot Entri Komponen"
        defaultPrompt={aiPrompt}
        onApply={(text) => {
          console.log('AI Generated:', text);
        }}
      />
    </div>
  );
};
