import React, { useState, useEffect } from 'react';
import { Prodi, CurriculumData } from './types';
import { loadProdiList, getDefaultCurriculumData } from './data/prodiParser';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingHero } from './components/LandingHero';
import { DashboardView } from './components/DashboardView';
import { IdentitasLandasanView } from './components/IdentitasLandasanView';
import { EntriKomponenView } from './components/EntriKomponenView';
import { AnalisisMatriksView } from './components/AnalisisMatriksView';
import { PengukuranView } from './components/PengukuranView';
import { RpsManagerView } from './components/RpsManagerView';
import { ExportPreviewView } from './components/ExportPreviewView';
import { UtilitasView } from './components/UtilitasView';
import { LoginModal } from './components/LoginModal';
import { Loader2, Cloud, CheckCircle2 } from 'lucide-react';
import { db, auth, doc, setDoc, onSnapshot } from './firebase';

export default function App() {
  const [prodiList, setProdiList] = useState<Prodi[]>([]);
  const [activeProdi, setActiveProdi] = useState<Prodi>({
    kode: '62201',
    nama: 'S1 Akuntansi',
    fakultas: 'FEB',
    jenjang: 'S1',
    kaprodi: 'Kaprodi S1 Akuntansi',
  });
  const [curriculum, setCurriculum] = useState<CurriculumData>(getDefaultCurriculumData(activeProdi));
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [tahunKurikulum, setTahunKurikulum] = useState<string>('2026');
  const [userRole, setUserRole] = useState<string>('Super Admin');
  const [showLanding, setShowLanding] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [syncStatus, setSyncStatus] = useState<string>('Tersinkronisasi Real-time via Firestore');

  useEffect(() => {
    loadProdiList().then((list) => {
      setProdiList(list);
      if (list.length > 0) {
        const defaultP = list.find((p) => p.kode === '62201') || list[0];
        setActiveProdi(defaultP);
      }
      setLoading(false);
    });

    const unsubscribeAuth = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  // Real-time Firestore Sync for activeProdi curriculum
  useEffect(() => {
    if (!activeProdi.kode) return;
    const docRef = doc(db, 'curriculums', activeProdi.kode);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap: any) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as CurriculumData;
          setCurriculum(data);
          setSyncStatus('Sinkronisasi Real-time Aktif (Firestore)');
        } else {
          const defaultData = getDefaultCurriculumData(activeProdi);
          setDoc(docRef, defaultData).catch((err: any) => console.error('Error saving initial doc:', err));
          setCurriculum(defaultData);
        }
      },
      (error: any) => {
        console.error('Firestore snapshot error:', error);
        setSyncStatus('Mode Offline / Menggunakan Cache Lokal');
      }
    );

    return () => unsubscribe();
  }, [activeProdi.kode]);

  // Save changes to Firestore
  const handleUpdateCurriculum = (newVal: CurriculumData | ((prev: CurriculumData) => CurriculumData)) => {
    setCurriculum((prev) => {
      const updated = typeof newVal === 'function' ? newVal(prev) : newVal;
      const docRef = doc(db, 'curriculums', activeProdi.kode);
      setDoc(docRef, updated, { merge: true }).catch((err: any) => console.error('Firestore save error:', err));
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-400" />
        <p className="text-sm font-medium">Memuat 117 Program Studi Universitas Pattimura & Firestore Database...</p>
      </div>
    );
  }

  if (showLanding) {
    return (
      <>
        <LandingHero
          onEnterDashboard={() => setShowLanding(false)}
          onOpenLogin={() => setShowLoginModal(true)}
          prodiCount={prodiList.length > 0 ? prodiList.length : 117}
        />
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            setShowLanding(false);
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        prodiList={prodiList}
        activeProdi={activeProdi}
        setActiveProdi={setActiveProdi}
        tahunKurikulum={tahunKurikulum}
        setTahunKurikulum={setTahunKurikulum}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenLanding={() => setShowLanding(true)}
        onOpenLogin={() => setShowLoginModal(true)}
        currentUser={currentUser}
        onAuthStateChangedUser={setCurrentUser}
      />

      {/* Firestore Sync Status Bar */}
      <div className="bg-blue-900 text-blue-100 px-4 py-1.5 text-xs flex justify-between items-center border-b border-blue-800">
        <div className="flex items-center gap-2">
          <Cloud className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span>Database Pusat UPPS: <strong className="text-white">Universitas Pattimura</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" />
          <span>{syncStatus}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} activeProdiName={activeProdi.nama} />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'dashboard' && <DashboardView curriculum={curriculum} activeProdi={activeProdi} />}

            {(activeTab === 'identitas_prodi' || activeTab === 'landasan_kurikulum' || activeTab === 'vmt_upps') && (
              <IdentitasLandasanView
                curriculum={curriculum}
                setCurriculum={handleUpdateCurriculum}
                activeProdi={activeProdi}
                activeSubTab={activeTab}
              />
            )}

            {(activeTab === 'profil_lulusan' ||
              activeTab === 'cpl_rumusan' ||
              activeTab === 'bahan_kajian' ||
              activeTab === 'pembentukan_mk') && (
              <EntriKomponenView
                curriculum={curriculum}
                setCurriculum={handleUpdateCurriculum}
                activeProdi={activeProdi}
                activeSubTab={activeTab}
              />
            )}

            {(activeTab.startsWith('matriks_') ||
              activeTab.startsWith('pemetaan_') ||
              activeTab === 'organisasi_mk' ||
              activeTab === 'peta_kurikulum' ||
              activeTab === 'mbkm_kesetaraan') && (
              <AnalisisMatriksView
                curriculum={curriculum}
                activeProdi={activeProdi}
                activeSubTab={activeTab}
              />
            )}

            {(activeTab === 'rubrik_rumus' ||
              activeTab === 'pengukuran_cpmk' ||
              activeTab === 'pengukuran_cpl') && (
              <PengukuranView
                curriculum={curriculum}
                activeProdi={activeProdi}
                activeSubTab={activeTab}
              />
            )}

            {activeTab === 'manajemen_rps' && (
              <RpsManagerView
                curriculum={curriculum}
                setCurriculum={handleUpdateCurriculum}
                activeProdi={activeProdi}
              />
            )}

            {activeTab === 'preview_ekspor' && (
              <ExportPreviewView
                curriculum={curriculum}
                activeProdi={activeProdi}
              />
            )}

            {(activeTab === 'utilitas_app' ||
              activeTab === 'utilitas_api' ||
              activeTab === 'log_aktivitas' ||
              activeTab === 'manajemen_institusi' ||
              activeTab === 'manajemen_akun') && (
              <UtilitasView activeTab={activeTab} setActiveTab={setActiveTab} prodiList={prodiList} />
            )}
          </div>
        </main>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(u) => {
          setCurrentUser(u);
        }}
      />
    </div>
  );
}
