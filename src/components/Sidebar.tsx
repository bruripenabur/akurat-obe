import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Network,
  Calculator,
  Printer,
  Wrench,
  ChevronRight,
  GraduationCap,
  Layers,
  Scale,
  Compass,
  Activity,
  Building,
  Users,
  Settings,
  Key,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeProdiName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, activeProdiName }) => {
  const menuGroups = [
    {
      title: 'UTAMA & ANALITIK',
      items: [
        { id: 'dashboard', label: 'Infografis & Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'IDENTITAS & LANDASAN',
      items: [
        { id: 'identitas_prodi', label: 'Identitas Prodi & Dokumen', icon: BookOpen },
        { id: 'landasan_kurikulum', label: 'Landasan Kurikulum & Istilah', icon: Scale },
        { id: 'vmt_upps', label: 'VMT UPPS & Program Studi', icon: Compass },
      ],
    },
    {
      title: 'ENTRI KOMPONEN KURIKULUM',
      items: [
        { id: 'profil_lulusan', label: 'Profil Lulusan (PO)', icon: GraduationCap },
        { id: 'cpl_rumusan', label: 'Capaian Pembelajaran (CPL)', icon: Layers },
        { id: 'bahan_kajian', label: 'Bahan Kajian & Deskripsi', icon: BookOpen },
        { id: 'pembentukan_mk', label: 'Mata Kuliah & Bobot SKS', icon: FileText },
      ],
    },
    {
      title: 'ANALISIS & MATRIKS',
      items: [
        { id: 'matriks_peo_cpl', label: 'Matriks PEO - CPL', icon: Network },
        { id: 'matriks_cpl_pl', label: 'Matriks CPL - PL', icon: Network },
        { id: 'matriks_bk_cpl', label: 'Matriks Bahan Kajian - CPL', icon: Network },
        { id: 'matriks_abad21', label: 'Kaitan MK - CP Abad 21', icon: Network },
        { id: 'pemetaan_mk_bk', label: 'Pemetaan MK - Bahan Kajian', icon: Network },
        { id: 'pemetaan_mk_cpl', label: 'Pemetaan MK - CPL', icon: Network },
        { id: 'organisasi_mk', label: 'Organisasi & Sebaran MK', icon: Layers },
        { id: 'peta_kurikulum', label: 'Peta Kurikulum (Tree Map)', icon: Network },
        { id: 'mbkm_kesetaraan', label: 'Pengakuan MBKM & Kesetaraan', icon: FileText },
      ],
    },
    {
      title: 'PENGUKURAN & EVALUASI',
      items: [
        { id: 'rubrik_rumus', label: 'Rubrik & Rumus Pengukuran', icon: Calculator },
        { id: 'pengukuran_cpmk', label: 'Pengukuran CPMK', icon: Calculator },
        { id: 'pengukuran_cpl', label: 'Pengukuran CPL (Agregat)', icon: Calculator },
      ],
    },
    {
      title: 'MANAJEMEN RPS & DOKUMEN',
      items: [
        { id: 'manajemen_rps', label: 'Manajemen RPS (16 Pertemuan)', icon: FileText },
        { id: 'preview_ekspor', label: 'Preview & Ekspor Dokumen OBE', icon: Printer },
      ],
    },
    {
      title: 'UTILITAS',
      items: [
        { id: 'utilitas_app', label: 'Utilitas Aplikasi', icon: Settings },
        { id: 'utilitas_api', label: 'Instalasi API Key AI', icon: Key },
        { id: 'log_aktivitas', label: 'Log Aktivitas', icon: Activity },
        { id: 'manajemen_institusi', label: 'Manajemen Institusi', icon: Building },
        { id: 'manajemen_akun', label: 'Manajemen Akun', icon: Users },
      ],
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto h-[calc(100vh-65px)] sticky top-[65px]">
      <div className="p-4 bg-emerald-50/70 border-b border-emerald-100">
        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Program Studi Aktif:</span>
        <p className="font-bold text-emerald-950 text-sm truncate mt-0.5">{activeProdiName}</p>
      </div>

      <nav className="p-3 space-y-6 flex-1">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-3 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              {group.title}
            </h3>
            <div className="space-y-0.5 mt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-md'
                        : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-yellow-300' : 'text-emerald-600'}`} />
                      <span className="text-left leading-snug">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-yellow-300" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};
