import React, { useState, useEffect } from 'react';
import { CurriculumData, Prodi } from '../types';
import { Sparkles, Save, BookOpen, Scale, Compass, Building2 } from 'lucide-react';
import { AiAssistantModal } from './AiAssistantModal';

interface IdentitasLandasanViewProps {
  curriculum: CurriculumData;
  setCurriculum: React.Dispatch<React.SetStateAction<CurriculumData>>;
  activeProdi: Prodi;
  activeSubTab: string;
}

export const IdentitasLandasanView: React.FC<IdentitasLandasanViewProps> = ({
  curriculum,
  setCurriculum,
  activeProdi,
  activeSubTab = 'identitas',
}) => {
  const [tab, setTab] = useState<string>(
    activeSubTab === 'landasan_kurikulum' ? 'landasan' : activeSubTab === 'vmt_upps' ? 'vmt' : 'identitas'
  );

  useEffect(() => {
    if (activeSubTab === 'landasan_kurikulum') setTab('landasan');
    else if (activeSubTab === 'vmt_upps') setTab('vmt');
    else if (activeSubTab === 'identitas_prodi') setTab('identitas');
  }, [activeSubTab]);

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTarget, setAiTarget] = useState<'dasarPemikiran' | 'visiProdi'>('dasarPemikiran');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = () => {
    setSuccessMsg('Perubahan berhasil disimpan ke server kurikulum.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex gap-2">
          <button
            onClick={() => setTab('identitas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              tab === 'identitas' ? 'bg-blue-800 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Identitas Prodi</span>
          </button>
          <button
            onClick={() => setTab('landasan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              tab === 'landasan' ? 'bg-blue-800 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Landasan & Istilah</span>
          </button>
          <button
            onClick={() => setTab('vmt')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              tab === 'vmt' ? 'bg-blue-800 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>VMT UPPS & Prodi</span>
          </button>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium">
          {successMsg}
        </div>
      )}

      {tab === 'identitas' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b pb-3">Identitas Program Studi {activeProdi.nama}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Program Studi</label>
              <input
                type="text"
                value={activeProdi.nama}
                disabled
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-600 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Fakultas / UPPS</label>
              <input
                type="text"
                value={activeProdi.fakultas}
                disabled
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-600 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Jenjang Pendidikan</label>
              <input
                type="text"
                value={activeProdi.jenjang}
                disabled
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-600 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Ketua Program Studi (Kaprodi)</label>
              <input
                type="text"
                value={activeProdi.kaprodi}
                onChange={(e) => {}}
                className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900"
              />
            </div>
          </div>
        </div>
      )}

      {tab === 'landasan' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-gray-900">Dasar Pemikiran Pengembangan Kurikulum OBE</h3>
            <button
              onClick={() => {
                setAiTarget('dasarPemikiran');
                setAiPrompt(`Buatkan narasi dasar pemikiran pengembangan kurikulum berbasis OBE untuk Program Studi ${activeProdi.nama} Fakultas ${activeProdi.fakultas} Universitas Pattimura yang menekankan keunggulan kawasan kepulauan.`);
                setAiModalOpen(true);
              }}
              className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Tanya AI untuk Dasar Pemikiran</span>
            </button>
          </div>

          <textarea
            rows={5}
            value={curriculum.landasan.dasarPemikiran}
            onChange={(e) =>
              setCurriculum({
                ...curriculum,
                landasan: { ...curriculum.landasan, dasarPemikiran: e.target.value },
              })
            }
            className="w-full p-4 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />

          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-2">Landasan Yuridis (Undang-Undang & Permen)</h4>
            <div className="space-y-2">
              {curriculum.landasan.landasanYuridis.map((item, idx) => (
                <div key={idx} className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl text-xs text-gray-800 font-medium flex items-center justify-between">
                  <span>{item}</span>
                  <span className="text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded-md">Aktif</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'vmt' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-gray-900">Visi, Misi, dan Tujuan Program Studi {activeProdi.nama}</h3>
            <button
              onClick={() => {
                setAiTarget('visiProdi');
                setAiPrompt(`Buatkan rumusan Visi dan Misi Program Studi ${activeProdi.nama} Fakultas ${activeProdi.fakultas} Universitas Pattimura yang berfokus pada keunggulan kepulauan.`);
                setAiModalOpen(true);
              }}
              className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Tanya AI VMT</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Visi Program Studi</label>
              <textarea
                rows={2}
                value={curriculum.vmtUpds.visiProdi}
                onChange={(e) =>
                  setCurriculum({
                    ...curriculum,
                    vmtUpds: { ...curriculum.vmtUpds, visiProdi: e.target.value },
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Bidang Kajian Utama / Distingsi</label>
              <input
                type="text"
                value={curriculum.vmtUpds.bidangKajian}
                onChange={(e) =>
                  setCurriculum({
                    ...curriculum,
                    vmtUpds: { ...curriculum.vmtUpds, bidangKajian: e.target.value },
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>
      )}

      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        title="Asistensi VMT & Landasan Kurikulum"
        defaultPrompt={aiPrompt}
        onApply={(generatedText) => {
          if (aiTarget === 'dasarPemikiran') {
            setCurriculum({
              ...curriculum,
              landasan: { ...curriculum.landasan, dasarPemikiran: generatedText },
            });
          } else {
            setCurriculum({
              ...curriculum,
              vmtUpds: { ...curriculum.vmtUpds, visiProdi: generatedText },
            });
          }
        }}
      />
    </div>
  );
};
