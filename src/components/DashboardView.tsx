import React from 'react';
import { CurriculumData, Prodi } from '../types';
import { GraduationCap, Layers, BookOpen, CheckCircle, Award, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

interface DashboardViewProps {
  curriculum: CurriculumData;
  activeProdi: Prodi;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ curriculum, activeProdi }) => {
  const totalSks = curriculum.mataKuliah.reduce((acc, mk) => acc + mk.totalSks, 0);
  const totalTeori = curriculum.mataKuliah.reduce((acc, mk) => acc + mk.sksTeori, 0);
  const totalPraktik = curriculum.mataKuliah.reduce((acc, mk) => acc + mk.sksPraktik, 0);

  const stats = [
    { label: 'Profil Lulusan (PO)', count: curriculum.profilLulusan.length, icon: GraduationCap, color: 'bg-emerald-500' },
    { label: 'Capaian Pembelajaran (CPL)', count: curriculum.cpl.length, icon: Award, color: 'bg-blue-500' },
    { label: 'Bahan Kajian (BK)', count: curriculum.bahanKajian.length, icon: BookOpen, color: 'bg-amber-500' },
    { label: 'Mata Kuliah', count: curriculum.mataKuliah.length, icon: Layers, color: 'bg-indigo-500' },
    { label: 'Total SKS', count: totalSks, icon: BarChart3, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-semibold px-3 py-1 bg-yellow-400/20 border border-yellow-400 text-yellow-300 rounded-full">
            Kurikulum Tahun {curriculum.tahunKurikulum}
          </span>
          <h2 className="text-2xl font-black mt-2">Dashboard OBE - {activeProdi.nama}</h2>
          <p className="text-sm text-emerald-200 mt-1">
            Fakultas {activeProdi.fakultas} | Universitas Pattimura | Kaprodi: {activeProdi.kaprodi}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-900/80 px-4 py-2.5 rounded-xl border border-emerald-700 text-xs">
          <CheckCircle className="w-5 h-5 text-yellow-400" />
          <div>
            <span className="block font-bold text-white">Status Kurikulum</span>
            <span className="text-emerald-300">Aktif & Terverifikasi SN Dikti</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">{st.label}</span>
                <div className={`w-9 h-9 rounded-xl ${st.color} text-white flex items-center justify-center shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-gray-900 mt-4">{st.count}</div>
            </div>
          );
        })}
      </div>

      {/* Analytics & SKS Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base">Beban Kurikulum & Distribusi SKS per Semester</h3>
            <span className="text-xs text-gray-500">Target: 144 - 146 SKS</span>
          </div>
          <p className="text-xs text-gray-600">
            Analisis beban studi teori dan praktik serta jumlah mata kuliah terdistribusi tiap semester.
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
              const semMk = curriculum.mataKuliah.filter((m) => m.semester === sem);
              const semSks = semMk.reduce((acc, m) => acc + m.totalSks, 0);
              return (
                <div key={sem} className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 text-center">
                  <span className="text-xs font-bold text-emerald-800 block">Sem {sem}</span>
                  <div className="text-xl font-black text-emerald-950 mt-1">{semSks}</div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">{semMk.length} MK</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-base">Komposisi SKS Program Studi</h3>
          <p className="text-xs text-gray-600">Rasio perbandingan teori vs praktik pada seluruh kurikulum program studi.</p>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-800">SKS Teori</span>
                <span>{totalTeori} SKS ({Math.round((totalTeori / (totalSks || 1)) * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${(totalTeori / (totalSks || 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700">SKS Praktik / Lapangan</span>
                <span>{totalPraktik} SKS ({Math.round((totalPraktik / (totalSks || 1)) * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${(totalPraktik / (totalSks || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
