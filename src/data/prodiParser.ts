import { Prodi, CurriculumData } from '../types';

export async function loadProdiList(): Promise<Prodi[]> {
  try {
    const response = await fetch('/public/assets/aistudio/daftar_117_Prodi_39fb0aa4.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const prodiList: Prodi[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const parts = line.split(';');
      if (parts.length >= 5) {
        prodiList.push({
          kode: parts[0].trim(),
          nama: parts[1].trim(),
          fakultas: parts[2].trim(),
          jenjang: parts[3].trim(),
          kaprodi: parts[4].trim(),
        });
      }
    }
    return prodiList;
  } catch (err) {
    console.error('Failed to load prodi CSV, using fallback list', err);
    return [
      { kode: '62201', nama: 'S1 Akuntansi', fakultas: 'FEB', jenjang: 'S1', kaprodi: 'Kaprodi S1 Akuntansi' },
      { kode: '11201', nama: 'S1 Pendidikan Dokter', fakultas: 'FK', jenjang: 'S1', kaprodi: 'Kaprodi S1 Pendidikan Dokter' },
      { kode: '74201', nama: 'S1 Ilmu Hukum', fakultas: 'FH', jenjang: 'S1', kaprodi: 'Kaprodi S1 Ilmu Hukum' },
      { kode: '54241', nama: 'S1 Ilmu Kelautan', fakultas: 'FPIK', jenjang: 'S1', kaprodi: 'Kaprodi S1 Ilmu Kelautan' },
      { kode: '22201', nama: 'S1 Teknik Sipil', fakultas: 'FATEK', jenjang: 'S1', kaprodi: 'Kaprodi S1 Teknik Sipil' },
    ];
  }
}

export function getDefaultCurriculumData(prodi: Prodi): CurriculumData {
  return {
    prodiKode: prodi.kode,
    tahunKurikulum: '2026',
    identitas: {
      departemen: `${prodi.fakultas} Universitas Pattimura`,
      noSkProdi: '1518/SK/2017',
      tglSkProdi: '13 Maret 2017',
      pejabat: prodi.kaprodi,
      tahunMulai: '2017',
      jumlahSks: 146,
      skOperational: 145,
    },
    landasan: {
      dasarPemikiran: `Penyusunan kurikulum berbasis Outcome-Based Education (OBE) untuk Program Studi ${prodi.nama} Fakultas ${prodi.fakultas} Universitas Pattimura didasarkan pada komitmen mendalam untuk mengintegrasikan nilai-nilai luhur keunggulan akademik, relevansi keilmuan, dan kontribusi nyata bagi masyarakat Maluku dan Indonesia. Mengingat posisi strategis Universitas Pattimura sebagai pusat pengembangan ilmu pengetahuan di kawasan kepulauan (marine & archipelagic science), kurikulum ini dirancang untuk menjawab tantangan abad 21, era digital, serta kebutuhan industri dan masyarakat global.`,
      landasanYuridis: [
        'UUD Negara Republik Indonesia Tahun 1945',
        'UU No. 20 Tahun 2003 tentang Sistem Pendidikan Nasional',
        'UU No. 12 Tahun 2012 tentang Pendidikan Tinggi',
        'PP No. 4 Tahun 2014 tentang Penyelenggaraan Pendidikan Tinggi dan Pengelolaan Perguruan Tinggi',
        'Perpres No. 8 Tahun 2012 tentang Kerangka Kualifikasi Nasional Indonesia (KKNI)',
        'Permendikbudristek No. 53 Tahun 2023 tentang Penjaminan Mutu Pendidikan Tinggi'
      ],
      definisiIstilah: [
        { istilah: 'Outcome-Based Education (OBE)', definisi: 'Pendekatan perancangan, pelaksanaan, dan evaluasi pendidikan yang berorientasi pada capaian (outcomes) yang harus dikuasai lulusan.' },
        { istilah: 'Capaian Pembelajaran Lulusan (CPL)', definisi: 'Kemampuan yang diperoleh melalui internalisasi sikap, penguasaan pengetahuan, dan keterampilan sesuai dengan jenjang KKNI.' },
        { istilah: 'Merdeka Belajar Kampus Merdeka (MBKM)', definisi: 'Kebijakan pembelajaran yang memberikan hak mahasiswa untuk belajar di luar program studi selama beberapa semester.' }
      ]
    },
    vmtUpds: {
        visiPt: 'Menjadi perguruan tinggi yang unggul dalam pengembangan ilmu pengetahuan berbasis kepulauan (marine & archipelagic sciences) berkarakter kebangsaan.',
        misiPt: [
            'Menyelenggarakan pendidikan tinggi berkualitas tinggi berbasis OBE.',
            'Melaksanakan penelitian inovatif untuk kemandirian masyarakat kepulauan.',
            'Melaksanakan pengabdian kepada masyarakat yang berdaya saing.'
        ],
        tujuanPt: [
            'Menghasilkan lulusan yang bermoral, kompeten, dan siap kerja.',
            'Mengembangkan riset unggulan kawasan kepulauan Maluku.'
        ],
        visiProdi: `Menjadi program studi ${prodi.nama} yang unggul, inovatif, dan berdaya saing internasional dalam bidang ${prodi.nama} berbasis potensi kepulauan pada tahun 2030.`,
        misiProdi: [
            `Menyelenggarakan tridharma perguruan tinggi di bidang ${prodi.nama} yang bermutu tinggi.`,
            'Mengembangkan riset terapan dan kewirausahaan berbasis digital.',
            'Membangun kerjasama strategis dengan industri dan instansi pemerintahan.'
        ],
        tujuanProdi: [
            `Menghasilkan lulusan ${prodi.nama} berakhlak mulia, profesional, dan kompeten.`,
            'Menghasilkan karya ilmiah dan produk inovasi yang bermanfaat bagi masyarakat.'
        ],
        bidangKajian: `Ilmu ${prodi.nama}, Pengelolaan Berbasis Kepulauan, Etika Profesi, dan Teknologi Terapan.`
    },
    profilLulusan: [
      { id: 'PL-01', kode: 'PL-01', profil: `Praktisi / Profesional ${prodi.nama}`, deskripsi: `Lulusan yang mampu merancang, melaksanakan, dan mengevaluasi sistem kerja di bidang ${prodi.nama} secara profesional dan akuntabel.`, profesi: 'Praktisi Ahli, Konsultan, Manajer Operasional' },
      { id: 'PL-02', kode: 'PL-02', profil: `Peneliti / Analis Muda`, deskripsi: 'Lulusan yang mampu menganalisis data, melakukan riset terapan, dan memecahkan kompleksitas permasalahan di masyarakat dan industri.', profesi: 'Peneliti, Analis Data, Asisten Riset' },
      { id: 'PL-03', kode: 'PL-03', profil: 'Edupreneur Berbasis Digital', deskripsi: 'Lulusan yang memiliki jiwa kewirausahaan mandiri dengan pemanfaatan teknologi digital untuk menciptakan lapangan kerja baru.', profesi: 'Edupreneur, Startup Founder, Konsultan Bisnis' }
    ],
    cpl: [
      { id: 'CPL-01', kode: 'CPL-S01', domain: 'Sikap', deskripsi: 'Bertakwa kepada Tuhan Yang Maha Esa, menunjukkan sikap profesional, menjunjung tinggi nilai kemanusiaan dan etika akademis.' },
      { id: 'CPL-02', kode: 'CPL-P01', domain: 'Pengetahuan', deskripsi: `Menguasai konsep teoretis mendalam mengenai bidang ${prodi.nama} dan metodologi pemecahan masalah.` },
      { id: 'CPL-03', kode: 'CPL-KU01', domain: 'Keterampilan Umum', deskripsi: 'Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam kontek pengembangan ilmu pengetahuan.' },
      { id: 'CPL-04', kode: 'CPL-KK01', domain: 'Keterampilan Khusus', deskripsi: `Mampu merumuskan solusi penyelesaian masalah prosedural di bidang ${prodi.nama} dengan memanfaatkan teknologi informasi.` }
    ],
    bahanKajian: [
      { id: 'BK-01', kode: 'BK-01', nama: 'Landasan Teoretis & Konseptual Utama', deskripsi: 'Kajian mendalam mengenai prinsip dasar dan teori fundamental keilmuan.' },
      { id: 'BK-02', kode: 'BK-02', nama: 'Metodologi Analisis & Riset Terapan', deskripsi: 'Kajian tentang metode kuantitatif, kualitatif, dan pengolahan data praktis.' },
      { id: 'BK-03', kode: 'BK-03', nama: 'Teknologi Digital & Otomasi', deskripsi: 'Penerapan perangkat lunak dan sistem digital modern dalam bidang keahlian.' },
      { id: 'BK-04', kode: 'BK-04', nama: 'Etika Profesi & Tata Kelola', deskripsi: 'Standar perilaku profesional, hukum, dan tanggung jawab sosial.' }
    ],
    mataKuliah: [
      { id: 'MK-01', kode: 'UNP101', nama: 'Pendidikan Agama', kelompok: 'Wajib Universitas', semester: 1, sksTeori: 2, sksPraktik: 0, totalSks: 2, cpmkIds: ['CPMK-1'], deskripsi: 'Membentuk mahasiswa berakhlak mulia dan religius.' },
      { id: 'MK-02', kode: 'UNP102', nama: 'Pancasila dan Kewarganegaraan', kelompok: 'Wajib Universitas', semester: 1, sksTeori: 2, sksPraktik: 0, totalSks: 2, cpmkIds: ['CPMK-1'], deskripsi: 'Memperkuat wawasan kebangsaan dan bela negara.' },
      { id: 'MK-03', kode: 'PRD101', nama: `Pengantar Ilmu ${prodi.nama}`, kelompok: 'Wajib Prodi', semester: 1, sksTeori: 3, sksPraktik: 0, totalSks: 3, cpmkIds: ['CPMK-1', 'CPMK-2'], deskripsi: 'Pengenalan ruang lingkup dan dasar keilmuan program studi.' },
      { id: 'MK-04', kode: 'PRD102', nama: 'Metodologi Penelitian & Statistik', kelompok: 'Wajib Prodi', semester: 3, sksTeori: 2, sksPraktik: 1, totalSks: 3, cpmkIds: ['CPMK-2', 'CPMK-3'], deskripsi: 'Pelatihan teknik riset dan analisis data.' },
      { id: 'MK-05', kode: 'PRD201', nama: 'Praktikum Terapan Lapangan', kelompok: 'Wajib Prodi', semester: 5, sksTeori: 0, sksPraktik: 3, totalSks: 3, cpmkIds: ['CPMK-4'], deskripsi: 'Penerapan langsung keilmuan di instansi/masyarakat.' }
    ],
    rpsList: [
      {
        mkKode: 'PRD101',
        dosenPengembang: prodi.kaprodi,
        koordinatorRmk: 'Tim Kurikulum Prodi',
        ketuaProdi: prodi.kaprodi,
        pustakaUtama: ['Resmi, S. (2025). Teori dan Praktik Keilmuan.', 'Mardiasmo. (2024). Akuntansi & Sistem Terapan.'],
        pustakaPendukung: ['Peraturan Menteri Terkait SN Dikti (2023).'],
        pertemuan: [
          { minggu: 1, kemampuanAkhir: 'Memahami konsep dasar dan orientasi keilmuan.', bahanKajian: 'Pengantar & Ruang Lingkup', metodePembelajaran: 'Discovery Learning (DL)', estimasiWaktu: '3x50 Menit', pengalamanBelajar: 'Diskusi interaktif & ringkasan bacaan', penilaian: 'Kuis Partisipasi (10%)' },
          { minggu: 2, kemampuanAkhir: 'Menganalisis prinsip fundamental teori.', bahanKajian: 'Teori Dasar & Regulasi', metodePembelajaran: 'Small Group Discussion (SGD)', estimasiWaktu: '3x50 Menit', pengalamanBelajar: 'Kerja kelompok studi kasus', penilaian: 'Tugas Mandiri (15%)' },
          { minggu: 8, kemampuanAkhir: 'Ujian Tengah Semester (UTS)', bahanKajian: 'Evaluasi Materi Minggu 1-7', metodePembelajaran: 'Ujian Tertulis', estimasiWaktu: '2 Jam', pengalamanBelajar: 'Pengerjaan soal komprehensif', penilaian: 'UTS (30%)' },
          { minggu: 16, kemampuanAkhir: 'Ujian Akhir Semester (UAS)', bahanKajian: 'Evaluasi Komprehensif Akhir', metodePembelajaran: 'Ujian Akhir / Proyek', estimasiWaktu: '2 Jam', pengalamanBelajar: 'Presentasi dan laporan akhir', penilaian: 'UAS (40%)' }
        ]
      }
    ]
  };
}
