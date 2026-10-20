window.MENU_CATEGORIES = [
  {
    id: "kanjeng", name: "Menu Kanjeng", shortName: "Kanjeng", description: "Nasi box pilihan dengan sajian komplet.", image: "hidangan.svg", unit: "box", minOrder: 20, minLabel: "Min. 20 box", group: "rice",
    options: { kind: "kanjeng", values: ["Risol Sayur", "Kroket", "Lemper Ayam", "Kue Pepe", "Buah Segar", "Pudding Regular"] },
    items: [
      ["Kanjeng 1",36000,"Nasi Putih, Ayam Seset Pedas, Orek Tempe Kering, Mie Goreng, Buncis Teri Medan, Sambal Bawang, Kerupuk Udang"],
      ["Kanjeng 2",37000,"Nasi Putih, Ayam Rendang, Orek Tempe Kering, Telur Rawis, Tumis Buncis Jagung Manis, Sambal Bajak, Kerupuk Udang"],
      ["Kanjeng 3",40000,"Nasi Putih, Dori Asam Manis, Telur Gulai, Kering Kentang Madu, Buncis Garlic, Sambal Bawang, Kerupuk Udang"],
      ["Kanjeng 4",42000,"Nasi Putih, Cumi Goreng Tepung, Telur Puyuh Balado, Kering Kentang Madu, Cameo Garlic, Sambal Bawang, Kerupuk Udang"],
      ["Kanjeng 5",46000,"Nasi Putih, Udang Tempura, Ayam Rica (Fillet), Kering Kentang Madu, Cameo Garlic, Sambal Bajak, Kerupuk Udang"],
      ["Kanjeng 6",46000,"Nasi Putih, Empal Suwir Manis, Ayam Seset Pedas, Kering Kentang Madu, Cameo Garlic, Sambal Bawang, Kerupuk Udang"],
      ["Kanjeng 7",45000,"Nasi Putih, Ayam Saus Lemon, Udang Saus Padang, Mapo Tahu, Buncis Ebi, Sambal Nusantara, Kerupuk Udang"],
      ["Kanjeng 8",46000,"Nasi Putih, Sapi Lada Hitam, Ayam Cabai Garam, Kering Kentang Madu, Buncis Teri Medan, Sambal Bawang, Kerupuk Udang"],
      ["Kanjeng 9",48000,"Nasi Putih, Bola Ayam Saus Oriental, Dendang Balado Basah, Telur Rawis, Brokoli Garlic, Sambal Szechuan, Kerupuk Udang"],
      ["Kanjeng 10",47000,"Nasi Putih, Udang Gandum, Ayam Saus Lemon, Kering Kentang Madu, Brokoli Garlic, Sambal Szechuan, Kerupuk Udang"]
    ].map(([name, price, description]) => ({ name, price, description, image: "hidangan.svg" }))
  },
  {
    id: "harmoni", name: "Menu Harmoni", shortName: "Harmoni", description: "Paduan lauk rumahan untuk santap bersama.", image: "hidangan.svg", unit: "box", minOrder: 20, minLabel: "Min. 20 box", group: "rice",
    items: [
      { name: "Harmoni 1", price: 30000, description: "Nasi Putih, Ayam Goreng Tepung, Telur Gulai, Tumis Buncis Jagung Manis, Sambal Bajak, Kerupuk Udang" },
      { name: "Harmoni 2", price: 32000, description: "Nasi Putih, Dori Asam Manis, Telur Rawis, Tumis Buncis Jagung Manis, Sambal Bajak, Kerupuk Udang" }
    ]
  },
  {
    id: "ningrat", name: "Menu Ningrat", shortName: "Ningrat", description: "Hidangan istimewa dengan pilihan lauk dan buah.", image: "hidangan.svg", unit: "box", minOrder: 20, minLabel: "Min. 20 box", group: "rice",
    options: { kind: "ningrat" },
    items: [
      { name: "Ningrat 1", price: 70000, description: "Nasi Putih, pilihan Udang, Bakso Sarang Burung, Kering Kentang Madu, Brokoli Garlic, Tahu Isi Udang, Sambal Nusantara, pilihan Buah, Pudding, Aqua 330 ml, Kerupuk Udang" },
      { name: "Ningrat 2", price: 70000, description: "Nasi Putih, Dori Saus Mangga, Sapi Lada Hitam, Kering Kentang Madu, Brokoli Garlic, Tahu Isi Udang, Sambal Nusantara, pilihan Buah, Pudding, Aqua 330 ml, Kerupuk Udang" }
    ]
  },
  {
    id: "nusantara", name: "Menu Nusantara", shortName: "Nusantara", description: "Cita rasa berbagai daerah dalam satu kotak.", image: "hidangan.svg", unit: "box", minOrder: 20, minLabel: "Min. 20 box", group: "rice", options: { kind: "packaging" },
    items: [
      { name: "Nasi Bali", price: 40000, description: "Nasi Daun Jeruk, Sate Lilit Bali, Ayam Suwir Bumbu Bali, Jukut Bejek, Telur Bumbu Bali, Sambal Nusantara, Kerupuk Udang" },
      { name: "Nasi Bogana", price: 39000, description: "Nasi Gurih, Ayam Opor Suwir, Sambal Goreng Buncis Kentang, Orek Tempe Kering, Telur Pindang, Serundeng Kelapa, Sambal Nusantara, Kerupuk Udang" },
      { name: "Nasi Kuning Manado", price: 39000, description: "Nasi Kuning, Ikan Cakalang Manado, Orek Tempe Kering, Soun Goreng, Telur Balado, Sambal Nusantara, Kerupuk Udang" },
      { name: "Rendang Sapi", price: 45000, description: "Nasi Putih, Rendang Sapi, Telur Gulai, Kering Kentang Madu, Tumis Daun Singkong, Sambal Nusantara, Kerupuk Udang" }
    ]
  },
  {
    id: "kuning-uduk", name: "Nasi Kuning & Nasi Uduk", shortName: "Kuning & Uduk", description: "Paket klasik untuk acara dan perayaan.", image: "hidangan.svg", unit: "box", minOrder: 20, minLabel: "Min. 20 box", group: "rice", options: { kind: "packaging" },
    items: [
      { name: "Nasi Kuning - Paket Ayam", price: 39000, description: "Nasi Kuning, Ayam Goreng Kelapa, Sambal Goreng Buncis Kentang, Telur Balado, Orek Tempe Kering, Sambal Bajak, Kerupuk Udang" },
      { name: "Nasi Kuning - Paket Empal", price: 45000, description: "Nasi Kuning, Empal Suwir Manis, Sambal Goreng Buncis Kentang, Telur Balado, Orek Tempe Kering, Sambal Bajak, Kerupuk Udang" },
      { name: "Nasi Kuning - Premium", price: 48000, description: "Nasi Kuning, Ayam Goreng Kelapa, Empal Suwir Manis, Telur Balado, Orek Tempe Kering, Sambal Bajak, Kerupuk Udang" },
      { name: "Nasi Uduk - Paket Ayam", price: 39000, description: "Nasi Gurih, Ayam Goreng Lengkuas, Perkedel Kentang Jagung, Telur Rawis, Orek Tempe Kering, Bihun Goreng, Sambal Kacang, Kerupuk Udang" },
      { name: "Nasi Uduk - Paket Empal", price: 45000, description: "Nasi Gurih, Empal Suwir Manis, Perkedel Kentang Jagung, Telur Rawis, Orek Tempe Kering, Bihun Goreng, Sambal Kacang, Kerupuk Udang" },
      { name: "Nasi Uduk - Premium", price: 48000, description: "Nasi Gurih, Ayam Goreng Lengkuas, Empal Suwir Manis, Telur Rawis, Orek Tempe Kering, Bihun Goreng, Sambal Kacang, Kerupuk Udang" }
    ]
  },
  {
    id: "tumpeng", name: "Nasi Tumpeng", shortName: "Tumpeng", description: "Nasi Kuning, Udang Goreng, Empal Suwir Manis, Ayam Goreng Kelapa, Sambal Goreng Ati, Kentang Tempe Goreng Madu, Telur Balado, Perkedel, Telur Rawis, dan Sambal.", image: "tumpeng.svg", unit: "paket", minOrder: 20, minLabel: "Min. 20 porsi", group: "tumpeng",
    items: [
      { name: "Nasi Tumpeng - 20 porsi", price: 1100000, portions: 20, description: "Paket tumpeng lengkap untuk 20 porsi." },
      { name: "Nasi Tumpeng - 30 porsi", price: 1500000, portions: 30, description: "Paket tumpeng lengkap untuk 30 porsi." },
      { name: "Nasi Tumpeng - 40 porsi", price: 1800000, portions: 40, description: "Paket tumpeng lengkap untuk 40 porsi." },
      { name: "Nasi Tumpeng - 50 porsi", price: 2000000, portions: 50, description: "Paket tumpeng lengkap untuk 50 porsi." }
    ]
  },
  {
    id: "tampah", name: "Tampah", shortName: "Tampah", description: "Hidangan tradisional untuk acara bersama.", image: "tampah.svg", unit: "tampah", minOrder: 1, minLabel: "Pesan min. H-3", leadTime: 3,
    items: [
      { name: "Tampah Jajanan Pasar", price: 590000, description: "65 kue pasar, 11 jenis: Pastel 7 pcs, Risol 7 pcs, Kroket 7 pcs, Sosis Solo 10 pcs, Kue Pepe Coklat dan Hijau 10 pcs, Nagasari Pisang Coklat 5 pcs, Bugis Mandi 6 pcs, Talam Ubi dan Talas 8 pcs, Cente Manis 5 pcs.", leadTime: 3 },
      { name: "Tampah Gorengan", price: 350000, description: "60 gorengan, 5 jenis: Tempe Kriuk 10 pcs, Tahu Isi 15 pcs, Bakwan Sayur 10 pcs, Pisang Goreng 15 pcs, Singkong Goreng 10 pcs, dan Saus Kacang.", leadTime: 3 },
      { name: "Tampah Rebusan", price: 320000, description: "Pisang Tanduk, Ubi Ungu, Kacang Tanah Rebus, Jagung Manis, Kedelai Jepang, Kelapa Parut dan Gula Pasir.", leadTime: 3 }
    ]
  },
  {
    id: "snack", name: "Snack Box", shortName: "Snack", description: "Racik 1-4 snack dan maksimal 1 minuman untuk setiap box.", image: "snack.svg", unit: "box", minOrder: 30, minLabel: "Min. 30 box", group: "snack", options: { kind: "snack" },
    items: [
      { name: "Risol Mayo", price: 10000, type: "snack", description: "Snack asin." }, { name: "Risol Sayur", price: 8000, type: "snack", description: "Snack asin." },
      { name: "Kroket", price: 8000, type: "snack", description: "Snack asin." }, { name: "Rogut Segitiga", price: 8000, type: "snack", description: "Snack asin." },
      { name: "Sosis Solo", price: 8000, type: "snack", description: "Snack asin. Pesan min. H-2.", leadTime: 2 }, { name: "Pastel", price: 8000, type: "snack", description: "Snack asin. Pesan min. H-2.", leadTime: 2 },
      { name: "Lemper Ayam", price: 8000, type: "snack", description: "Snack asin." }, { name: "Arem-Arem Ayam", price: 8000, type: "snack", description: "Snack asin." },
      { name: "Kue Pepe", price: 8000, type: "snack", description: "Snack manis." }, { name: "Kue Roll Bolu", price: 8000, type: "snack", description: "Snack manis." },
      { name: "Kue Roll Lapis", price: 8000, type: "snack", description: "Snack manis." }, { name: "Muffin Chocolate", price: 7500, type: "snack", description: "Snack manis." },
      { name: "Bolu Kukus", price: 9000, type: "snack", description: "Snack manis." }, { name: "Kue Talam (Ubi / Talas / Aren)", price: 8000, type: "snack", description: "Snack manis." },
      { name: "Cente Manis", price: 8000, type: "snack", description: "Snack manis." }, { name: "Kue Bugis Mandi", price: 8000, type: "snack", description: "Snack manis." },
      { name: "Nagasari Pisang Coklat", price: 8000, type: "snack", description: "Snack manis." }, { name: "Kue Sus", price: 8000, type: "snack", description: "Snack manis." }
    ]
  },
  {
    id: "pudding", name: "Pudding Nusantara", shortName: "Pudding", description: "Pudding lembut untuk pelengkap acara.", image: "snack.svg", unit: "cup", minOrder: 30, minLabel: "Min. 30 cup", leadTime: 3,
    items: ["Pudding Kopi Tiramisu", "Pudding Lumpur Surga", "Pudding Ubi Ungu", "Pudding Jagung Manis", "Pudding Lumut Gula Aren", "Pudding Cente Manis"].map(name => ({ name, price: 10000, description: "Pudding Nusantara, harga per cup.", leadTime: 3 }))
  },
  {
    id: "roti", name: "Roti", shortName: "Roti", description: "Roti pilihan untuk jeda yang menyenangkan.", image: "snack.svg", unit: "pcs", minOrder: 30, minLabel: "Min. 30 pcs", leadTime: 3,
    items: [
      { name: "Roti Coklat", price: 11000 }, { name: "Roti Keju Susu", price: 11000 }, { name: "Roti Abon Mini", price: 8000 },
      { name: "Roti Daging Sapi", price: 12500 }, { name: "Roti Keju Sosis", price: 12500 }, { name: "Roti Smeer Meses", price: 9000 }
    ].map(item => ({ ...item, description: "Roti, harga per pcs.", leadTime: 3 }))
  },
  {
    id: "minuman", name: "Minuman Nusantara", shortName: "Minuman", description: "Minuman segar dan hangat untuk menemani hidangan.", image: "minuman.svg", unit: "gelas", minOrder: 1,
    items: [
      { name: "Teh Lemon", price: 12000 }, { name: "Teh Sereh", price: 12000 }, { name: "Jeruk Manis", price: 12000 },
      { name: "Wedang Uwuh", price: 15000 }, { name: "Timun Selasih", price: 15000 }
    ].map(item => ({ ...item, description: "Minuman Nusantara." }))
  },
  {
    id: "addon", name: "Add On", shortName: "Add On", description: "Tambahan kecil untuk melengkapi pesanan.", image: "minuman.svg", unit: "pcs", minOrder: 1,
    items: [
      { name: "Vit Gelas", price: 1500 }, { name: "Aqua Gelas", price: 2000 }, { name: "Cleo 220 ml", price: 2000 }, { name: "Aqua Botol 330 ml", price: 4000 },
      { name: "Susu Ultra 200 ml", price: 7000 }, { name: "Bear Brand", price: 12000 }, { name: "UC1000", price: 10000 }, { name: "Teh Kotak", price: 6000 },
      { name: "Pudding Regular (Coklat / Stroberi / Mangga)", price: 5000 }, { name: "Buah Segar", price: 5000 }, { name: "Nata De Coco Lychee Cup", price: 5000 }, { name: "Ganti Nasi (Kuning / Daun Jeruk)", price: 2000 }
    ].map(item => ({ ...item, description: "Tambahan menu, harga per pcs." }))
  }
];

window.SNACK_DRINKS = ["Tanpa minuman", "Teh Kotak", "Cleo 220 ml", "Aqua Gelas", "Aqua Botol 330 ml"];
window.PACKAGING_OPTIONS = [
  { name: "Tanpa besek", price: 0 },
  { name: "Besek Mika", price: 5000 },
  { name: "Besek Daun", price: 7000 }
];