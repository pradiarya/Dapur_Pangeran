# Dapur Pangeran

Katalog demo statis dengan pemesanan melalui WhatsApp. Buka `index.html` langsung di browser; tidak membutuhkan backend, database, atau proses build.

## Konfigurasi

- **Nomor WhatsApp:** ubah `WHATSAPP_NUMBER` di bagian atas `app.js` menjadi nomor internasional tanpa `+` atau spasi, misalnya `6281234567890`.
- **Menu dan harga:** edit data di `menu.js`. Setiap kategori memuat daftar item, harga, satuan, minimum order, dan waktu pemesanan jika berlaku.
- **Foto:** ganti ilustrasi pada `assets/img/` dengan foto milik usaha, lalu sesuaikan properti `image` di `menu.js`. Gunakan format WebP/JPG yang dikompresi dan pertahankan teks alternatif pada kartu.
- **Logo:** letakkan file logo asli di `assets/img/logo.png`. File logo tidak tersedia pada workspace saat proyek demo ini dibuat; header dan footer memakai fallback teks sampai file tersebut ditambahkan. `ornamen.svg` sementara dipakai sebagai favicon dan gambar Open Graph.
- **Kredit:** ganti `[NAMA SAYA]` di bagian footer `index.html`.

## Menjalankan dan deploy

Buka `index.html` untuk menjalankan secara lokal. Untuk deploy, unggah folder proyek ini sebagai static site di Netlify atau Vercel; tidak ada build command maupun direktori output khusus. Pastikan `index.html`, `menu.js`, `app.js`, `styles.css`, dan folder `assets/` berada di root publik.

Halaman menyertakan `noindex, nofollow` karena merupakan desain demo. Hapus atau ubah meta robots hanya bila pemilik proyek meminta situs dipublikasikan secara resmi.