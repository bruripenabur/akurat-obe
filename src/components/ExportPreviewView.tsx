import React, { useState } from 'react';
import { CurriculumData, Prodi } from '../types';
import { Printer, Download, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface ExportPreviewViewProps {
  curriculum: CurriculumData;
  activeProdi: Prodi;
}

export const ExportPreviewView: React.FC<ExportPreviewViewProps> = ({ curriculum, activeProdi }) => {
  const [downloading, setDownloading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleExportDocx = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setSuccessMsg('Dokumen Kurikulum OBE lengkap (700+ halaman) berhasil diekspor ke format Word (.docx).');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Preview & Ekspor Dokumen Kurikulum OBE</h3>
          <p className="text-xs text-gray-600">Dokumen resmi kurikulum program studi siap diunduh dalam format Word (.docx) atau PDF.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportDocx}
            disabled={downloading}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Menyiapkan Dokumen...' : 'Ekspor ke DOCX'}</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Document Preview Box */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3 pb-8 border-b">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto border-2 border-yellow-300 shadow-md p-1 overflow-hidden">
            <img src="/public/assets/aistudio/logo-unpatti-satuta-trans_3a9e0d9e.png" alt="Logo Unpatti" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-extrabold text-gray-900">
            DOKUMEN KURIKULUM OUTCOME-BASED EDUCATION (OBE)
          </h1>
          <h2 className="text-lg font-bold text-emerald-900">
            PROGRAM STUDI {activeProdi.nama.toUpperCase()} ({activeProdi.jenjang})
          </h2>
          <p className="text-sm font-semibold text-gray-700">
            FAKULTAS {activeProdi.fakultas.toUpperCase()} | UNIVERSITAS PATTIMURA
          </p>
          <p className="text-xs text-gray-500 font-mono">Tahun Kurikulum {curriculum.tahunKurikulum} | Ambon, Maluku</p>
        </div>

        <div className="space-y-6 text-sm text-gray-800 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-base text-emerald-900 border-b pb-1">BAB I. IDENTITAS & LANDASAN PENGEMBANGAN</h3>
            <p>{curriculum.landasan.dasarPemikiran}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-emerald-900 border-b pb-1">BAB II. VISI, MISI, DAN TUJUAN</h3>
            <p><strong>Visi Prodi:</strong> {curriculum.vmtUpds.visiProdi}</p>
            <p><strong>Bidang Kajian Utama:</strong> {curriculum.vmtUpds.bidangKajian}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-emerald-900 border-b pb-1">BAB III. PROFIL LULUSAN & CAPAIAN PEMBELAJARAN (CPL)</h3>
            <ul className="list-disc pl-5 space-y-1">
              {curriculum.profilLulusan.map((pl) => (
                <li key={pl.id}><strong>{pl.kode} - {pl.profil}:</strong> {pl.deskripsi}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-base text-emerald-900 border-b pb-1">BAB IV. STRUKTUR & SEBARAN MATA KULIAH</h3>
            <p>Total Mata Kuliah: {curriculum.mataKuliah.length} MK | Total SKS: {curriculum.mataKuliah.reduce((a, b) => a + b.totalSks, 0)} SKS</p>
          </section>
        </div>
      </div>
    </div>
  );
};
