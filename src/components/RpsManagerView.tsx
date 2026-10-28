import React, { useState } from 'react';
import { CurriculumData, Prodi } from '../types';
import { FileText, Sparkles, Printer, CheckCircle, Plus } from 'lucide-react';

interface RpsManagerViewProps {
  curriculum: CurriculumData;
  setCurriculum: React.Dispatch<React.SetStateAction<CurriculumData>>;
  activeProdi: Prodi;
}

export const RpsManagerView: React.FC<RpsManagerViewProps> = ({ curriculum, setCurriculum, activeProdi }) => {
  const [selectedMkKode, setSelectedMkKode] = useState(curriculum.mataKuliah[0]?.kode || 'PRD101');
  const [successMsg, setSuccessMsg] = useState('');

  const currentRps = curriculum.rpsList.find((r) => r.mkKode === selectedMkKode) || {
    mkKode: selectedMkKode,
    dosenPengembang: activeProdi.kaprodi,
    koordinatorRmk: 'Tim Kurikulum Prodi',
    ketuaProdi: activeProdi.kaprodi,
    pustakaUtama: ['Pustaka Referensi Utama Prodi'],
    pustakaPendukung: ['Referensi Jurnal Nasional/Internasional'],
    pertemuan: [
      { minggu: 1, kemampuanAkhir: 'Memahami konsep dasar.', bahanKajian: 'Pengantar', metodePembelajaran: 'Discovery Learning', estimasiWaktu: '3x50 Menit', pengalamanBelajar: 'Diskusi', penilaian: 'Kuis' },
      { minggu: 8, kemampuanAkhir: 'Ujian Tengah Semester', bahanKajian: 'Evaluasi 1-7', metodePembelajaran: 'Ujian', estimasiWaktu: '2 Jam', pengalamanBelajar: 'Tes', penilaian: 'UTS (30%)' },
      { minggu: 16, kemampuanAkhir: 'Ujian Akhir Semester', bahanKajian: 'Evaluasi 9-15', metodePembelajaran: 'Ujian', estimasiWaktu: '2 Jam', pengalamanBelajar: 'Tes', penilaian: 'UAS (40%)' }
    ]
  };

  const handleAddMeeting = () => {
    const nextMinggu = currentRps.pertemuan.length + 1;
    const updatedPertemuan = [
      ...currentRps.pertemuan,
      { minggu: nextMinggu, kemampuanAkhir: 'Kemampuan akhir pertemuan baru', bahanKajian: 'Topik Materi', metodePembelajaran: 'Small Group Discussion', estimasiWaktu: '3x50 Menit', pengalamanBelajar: 'Diskusi & Praktik', penilaian: 'Tugas' }
    ];
    const updatedRpsList = curriculum.rpsList.map(r => r.mkKode === selectedMkKode ? { ...r, pertemuan: updatedPertemuan } : r);
    if (!curriculum.rpsList.some(r => r.mkKode === selectedMkKode)) {
      updatedRpsList.push({ ...currentRps, pertemuan: updatedPertemuan });
    }
    setCurriculum({ ...curriculum, rpsList: updatedRpsList });
    setSuccessMsg('Pertemuan RPS berhasil ditambahkan.');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Manajemen Rencana Pembelajaran Semester (RPS)</h3>
          <p className="text-xs text-gray-600">Pilih mata kuliah untuk menyusun rancangan 16 pertemuan sesuai Standar OBE.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedMkKode}
            onChange={(e) => setSelectedMkKode(e.target.value)}
            aria-label="Pilih Mata Kuliah untuk RPS"
            className="p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-hidden"
          >
            {curriculum.mataKuliah.map((mk) => (
              <option key={mk.id} value={mk.kode}>
                {mk.kode} - {mk.nama} (Sem {mk.semester})
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSuccessMsg('RPS berhasil disimpan dan disinkronkan ke dokumen kurikulum.');
              setTimeout(() => setSuccessMsg(''), 2500);
            }}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Simpan RPS</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium">
          {successMsg}
        </div>
      )}

      {/* RPS Details */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Dosen Pengembang RPS</label>
            <input
              type="text"
              value={currentRps.dosenPengembang}
              readOnly
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Koordinator RMK</label>
            <input
              type="text"
              value={currentRps.koordinatorRmk}
              readOnly
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Ketua Program Studi</label>
            <input
              type="text"
              value={currentRps.ketuaProdi}
              readOnly
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-900 text-sm">Rancangan Pertemuan Pembelajaran (1 - 16)</h4>
            <button
              onClick={handleAddMeeting}
              className="px-3 py-1.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Pertemuan</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-emerald-900 text-white">
                  <th className="p-2.5 border text-center w-16">Mg</th>
                  <th className="p-2.5 border">Kemampuan Akhir (Sub-CPMK)</th>
                  <th className="p-2.5 border">Bahan Kajian / Materi</th>
                  <th className="p-2.5 border">Metode Pembelajaran</th>
                  <th className="p-2.5 border">Estimasi Waktu</th>
                  <th className="p-2.5 border">Penilaian</th>
                </tr>
              </thead>
              <tbody>
                {currentRps.pertemuan.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2.5 border text-center font-bold font-mono">{p.minggu}</td>
                    <td className="p-2.5 border font-medium text-gray-900">{p.kemampuanAkhir}</td>
                    <td className="p-2.5 border text-gray-700">{p.bahanKajian}</td>
                    <td className="p-2.5 border text-gray-700">{p.metodePembelajaran}</td>
                    <td className="p-2.5 border text-gray-600">{p.estimasiWaktu}</td>
                    <td className="p-2.5 border font-medium text-emerald-800">{p.penilaian}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
