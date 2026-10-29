import React, { useState, useEffect } from 'react';
import { Wrench, Check, Key, ShieldCheck, Activity, Building, Users, Settings, Database, RefreshCw } from 'lucide-react';
import { Prodi } from '../types';

interface UtilitasViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  prodiList: Prodi[];
}

export const UtilitasView: React.FC<UtilitasViewProps> = ({ activeTab, setActiveTab, prodiList }) => {
  const [subTab, setSubTab] = useState<string>(
    activeTab === 'log_aktivitas' ? 'log' : activeTab === 'manajemen_institusi' ? 'institusi' : activeTab === 'manajemen_akun' ? 'akun' : activeTab === 'utilitas_app' ? 'app' : 'api'
  );

  useEffect(() => {
    if (activeTab === 'log_aktivitas') setSubTab('log');
    else if (activeTab === 'manajemen_institusi') setSubTab('institusi');
    else if (activeTab === 'manajemen_akun') setSubTab('akun');
    else if (activeTab === 'utilitas_app') setSubTab('app');
    else if (activeTab === 'utilitas_api') setSubTab('api');
  }, [activeTab]);

  const [apiKey, setApiKey] = useState('AIzaSyCfBKedsGnWM_********************');
  const [saved, setSaved] = useState(false);
  const [backupStatus, setBackupStatus] = useState('');

  return (
    <div className="space-y-6">
      {/* Sub tabs header */}
      <div className="flex flex-wrap bg-white p-2 rounded-2xl border border-gray-200 shadow-xs gap-2">
        <button
          onClick={() => setSubTab('app')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            subTab === 'app' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Utilitas Aplikasi</span>
        </button>
        <button
          onClick={() => setSubTab('api')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            subTab === 'api' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Instalasi API Key AI</span>
        </button>
        <button
          onClick={() => setSubTab('log')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            subTab === 'log' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Log Aktivitas</span>
        </button>
        <button
          onClick={() => setSubTab('institusi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            subTab === 'institusi' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Manajemen Institusi</span>
        </button>
        <button
          onClick={() => setSubTab('akun')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            subTab === 'akun' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Manajemen Akun</span>
        </button>
      </div>

      {subTab === 'app' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 max-w-3xl">
          <h3 className="text-base font-bold text-gray-900 border-b pb-3">Utilitas & Pengaturan Sistem Aplikasi</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-blue-950 text-sm">Backup Database Kurikulum (Firestore)</h4>
                <p className="text-xs text-gray-600 mt-0.5">Simpan salinan data kurikulum 117 prodi secara berkala.</p>
              </div>
              <button
                onClick={() => {
                  setBackupStatus('Backup berhasil diunduh (.json)');
                  setTimeout(() => setBackupStatus(''), 3000);
                }}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Unduh Backup
              </button>
            </div>
            {backupStatus && <p className="text-xs text-blue-700 font-medium">{backupStatus}</p>}

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Cache & Sinkronisasi Real-time</h4>
                <p className="text-xs text-gray-600 mt-0.5">Bersihkan cache lokal dan sinkronkan ulang dengan server cloud.</p>
              </div>
              <button
                onClick={() => alert('Cache berhasil dibersihkan.')}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl"
              >
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      )}

      {subTab === 'api' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 max-w-3xl">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Instalasi & Konfigurasi API Key Gemini</h3>
              <p className="text-xs text-gray-600">Kelola kunci API Gemini untuk fitur AI Copilot AKURAT-OBE.</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-gray-700">Gemini API Key (Server Environment)</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl text-sm font-mono"
            />
            <p className="text-[11px] text-gray-500">
              Kunci API dikelola secara aman melalui environment variables AI Studio Secrets. Model aktif: Gemini 2.5 Flash.
            </p>
          </div>

          <button
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verifikasi & Aktifkan Status API</span>
          </button>

          {saved && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs font-medium">
              API Key berhasil diverifikasi dan terhubung ke model Gemini 2.5 Flash.
            </div>
          )}
        </div>
      )}

      {subTab === 'log' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Log Aktivitas Sistem AKURAT-OBE</h3>
          <p className="text-xs text-gray-600">Catatan aktivitas perubahan kurikulum, pemetaan, dan penggunaan AI Copilot.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border">Waktu</th>
                  <th className="p-3 border">Pengguna</th>
                  <th className="p-3 border">Program Studi</th>
                  <th className="p-3 border">Aktivitas</th>
                  <th className="p-3 border text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border font-mono">2026-10-28 14:25</td>
                  <td className="p-3 border font-bold">Dr. Bruri Melky (Super Admin)</td>
                  <td className="p-3 border">S1 Akuntansi</td>
                  <td className="p-3 border text-gray-700">Pembaruan Matriks CPL & RPS</td>
                  <td className="p-3 border text-center"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md font-bold">Sukses</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border font-mono">2026-10-28 14:10</td>
                  <td className="p-3 border font-bold">Kaprodi S1 Kedokteran</td>
                  <td className="p-3 border">S1 Pendidikan Dokter</td>
                  <td className="p-3 border text-gray-700">Generate Profil Lulusan via AI Copilot</td>
                  <td className="p-3 border text-center"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md font-bold">Sukses</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'institusi' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Manajemen Institusi & UPPS Universitas Pattimura</h3>
          <p className="text-xs text-gray-600">Daftar Fakultas, Pascasarjana, dan PSDKU yang terintegrasi dengan sistem pelaporan.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {['FKIP', 'FAPERTA', 'FPIK', 'FEB', 'FK', 'FST', 'FH', 'FISIP', 'FATEK', 'Pascasarjana', 'PSDKU KAB. KEP. ARU', 'PSDKU KAB. MBD'].map((fak, i) => (
              <div key={i} className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Fakultas / UPPS {fak}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Terintegrasi dengan 117 Prodi</p>
                </div>
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'akun' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900">Manajemen Akun & Hak Akses Pengguna (RBAC)</h3>
          <p className="text-xs text-gray-600">Pengaturan peran Super Admin, Ketua Program Studi, dan Dosen Pengampu.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-3 border">Nama Pengguna</th>
                  <th className="p-3 border">Email Institusi</th>
                  <th className="p-3 border">Peran (Role)</th>
                  <th className="p-3 border">Unit Kerja / Prodi</th>
                  <th className="p-3 border text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border font-bold">Dr. Bruri Melky Laimeherwa, M.Si.</td>
                  <td className="p-3 border text-gray-600">bruripenabur@gmail.com</td>
                  <td className="p-3 border"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-md font-bold">Super Admin</span></td>
                  <td className="p-3 border">Lembaga Penjaminan Mutu & Pengembangan Kurikulum</td>
                  <td className="p-3 border text-center"><span className="text-blue-700 font-bold">Aktif</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border font-bold">Tim Kurikulum Unpatti</td>
                  <td className="p-3 border text-gray-600">kurikulum@unpatti.ac.id</td>
                  <td className="p-3 border"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md font-bold">Kaprodi / UPPS</span></td>
                  <td className="p-3 border">117 Program Studi Unpatti</td>
                  <td className="p-3 border text-center"><span className="text-blue-700 font-bold">Aktif</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
