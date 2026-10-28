export interface Prodi {
  kode: string;
  nama: string;
  fakultas: string;
  jenjang: string;
  kaprodi: string;
}

export interface CurriculumData {
  prodiKode: string;
  tahunKurikulum: string;
  identitas: {
    departemen: string;
    noSkProdi: string;
    tglSkProdi: string;
    pejabat: string;
    tahunMulai: string;
    jumlahSks: number;
    skOperational: number;
  };
  landasan: {
    dasarPemikiran: string;
    landasanYuridis: string[];
    definisiIstilah: { istilah: string; definisi: string }[];
  };
  vmtUpds: {
    visiPt: string;
    misiPt: string[];
    tujuanPt: string[];
    visiProdi: string;
    misiProdi: string[];
    tujuanProdi: string[];
    bidangKajian: string;
  };
  profilLulusan: {
    id: string;
    kode: string;
    profil: string;
    deskripsi: string;
    profesi: string;
  }[];
  cpl: {
    id: string;
    kode: string;
    domain: 'Sikap' | 'Pengetahuan' | 'Keterampilan Umum' | 'Keterampilan Khusus';
    deskripsi: string;
  }[];
  bahanKajian: {
    id: string;
    kode: string;
    nama: string;
    deskripsi: string;
  }[];
  mataKuliah: {
    id: string;
    kode: string;
    nama: string;
    kelompok: 'Wajib Universitas' | 'Wajib Prodi' | 'Pilihan' | 'MBKM';
    semester: number;
    sksTeori: number;
    sksPraktik: number;
    totalSks: number;
    cpmkIds: string[];
    deskripsi: string;
  }[];
  rpsList: {
    mkKode: string;
    dosenPengembang: string;
    koordinatorRmk: string;
    ketuaProdi: string;
    pustakaUtama: string[];
    pustakaPendukung: string[];
    pertemuan: {
      minggu: number;
      kemampuanAkhir: string;
      bahanKajian: string;
      metodePembelajaran: string;
      estimasiWaktu: string;
      pengalamanBelajar: string;
      penilaian: string;
    }[];
  }[];
}
