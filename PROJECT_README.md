# BookStore Demo System - Yazılım Mühendisliği Projesi

## Proje Gereksinekleri

### 1. Kimlik Doğrulama (Authentication)

- ✅ Login ile kullanıcı giriş sistemi
- ✅ İki tür kullanıcı: **Müşteri** ve **Admin**
- ✅ Rol tabanlı erişim kontrolü (Role-Based Access Control)

### 2. Müşteri Özellikleri

- ✅ Kitapları görüntüleyebilir (başlık, yazar, resim, fiyat)
- ✅ Sepete kitap ekleyebilir
- ✅ Sepetten kitap çıkarabilir
- ✅ Satın alma işlemi yapabilir
- ❌ **Kitap düzenleyemez** (Sil/Edit butonları görünmez)

### 3. Admin Özellikleri

- ✅ Kitapları görüntüleyebilir
- ✅ Yeni kitap ekleyebilir
- ✅ Kitapları düzenleyebilir (Düzenle)
- ✅ Kitapları silebilir (Sil)
- ✅ Sistem resetle

### 4. Veri Yapısı

Her kitapta:

- 📖 Kitap İsmi
- ✍️ Yazar Bilgisi
- 🖼️ Resim (public/images/ klasöründe)
- 💰 Fiyat (TL)
- 📊 Satış Sayısı (Admin panelinde)

### 5. Reset Işlevi

- ✅ Reset butonuna basıldığında tüm tablolar temizlenir
- ✅ Sistem önceden tanımlı **10 kitap** yükler
- ✅ Yeni eklenen kitaplar silinir
- ✅ Satış verileri sıfırlanır

## Proje Mimarisi

```
bookstore-demo-system/
├── backend/
│   ├── index.js                 (Express sunucu)
│   ├── config/
│   │   └── db.js               (PostgreSQL bağlantısı)
│   ├── controllers/
│   │   ├── authController.js   (Login/Register)
│   │   ├── bookController.js   (Kitap yönetimi)
│   │   └── resetController.js  (Reset işlemi)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── resetRoutes.js
│   └── services/
│       └── bookService.js      (Veritabanı işlemleri)
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── CustomerHome.jsx     (Müşteri sayfası)
    │   │   └── AdminDashboard.jsx   (Admin sayfası)
    │   ├── components/
    │   │   ├── BookCard.jsx         (Admin kitap kartı - edit/sil var)
    │   │   ├── BookList.jsx         (Kitap listesi - adminYalnız)
    │   │   ├── LoginForm.jsx        (Giriş ekranı)
    │   │   └── AddBookForm.jsx      (Yeni kitap ekleme - admin)
    │   ├── services/
    │   │   ├── bookService.js       (API çağrıları)
    │   │   ├── authService.js       (Login)
    │   │   └── checkoutService.js   (Satın alma)
    │   └── App.jsx                  (Ana uygulama)
    └── public/
        └── images/                  (Kitap resimleri: img1.png - img10.png)
```

## Kullanıcı Akışı

### Müşteri Akışı

1. LoginForm'a email ve şifre girer
2. Giriş başarılı → CustomerHome sayfasına gider
3. Kitapları resim, yazar, fiyat ile görür
4. Sepete kitap ekler
5. Sepeti görüntüleyip satın alır

### Admin Akışı

1. LoginForm'a email ve şifre girer
2. Giriş başarılı → AdminDashboard sayfasına gider
3. Kitap listesini görür (Edit/Sil butonları var)
4. Yeni kitap ekleyebilir
5. Var olan kitapları düzenleyebilir
6. Kitapları silebilir
7. "Sistemi Resetle" butonuyla reset işlemi yapabilir

## Reset İşleminin Ayrıntıları

Reset butonuna basıldığında:

1. **Tüm satış verileri silinir** (sales tablosu)
2. **Tüm kitaplar silinir** (books tablosu)
3. **Önceden tanımlı 10 kitap yeniden yüklenir**:
   - Aşk-ı Memnu (Halit Refig) - 185 TL
   - Sefiller (Victor Hugo) - 210 TL
   - 1984 (George Orwell) - 250 TL
   - Dönüşüm (Franz Kafka) - 220 TL
   - Suç ve Ceza (Fyodor Dostoyevski) - 210 TL
   - Mekanik Portakal (Anthony Burgess) - 230 TL
   - Çavdar Tarlasında Çocuklar (J.D. Salinger) - 240 TL
   - İstanbul Hatıraları (Ahmet Ümit) - 300 TL
   - Beyaz Zambaklar Ülkesinde (Grigory Petrov) - 220 TL
   - Simyacı (Paulo Coelho) - 180 TL

4. **Yeni eklenen kitaplar tamamen silinir**

## Test Kullanıcıları

```
Admin:
Email: admin@bookstore.com
Şifre: admin123

Müşteri:
Email: customer@bookstore.com
Şifre: customer123
```

## Teknolojiler

**Backend:**

- Node.js + Express.js
- PostgreSQL (Veritabanı)
- CORS (Frontend-Backend iletişimi)

**Frontend:**

- React.js
- Vite (Build tool)
- CSS (Styling)

## Kurulum ve Çalıştırma

### Backend

```bash
cd backend
npm install
node index.js
```

Server: http://localhost:5000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Server: http://localhost:5173

## Önemli Notlar

- Müşteri ve Admin ayrı sayfalar kullanır
- Müşteri kitapları düzenleyemez (Güvenlik)
- Reset işlemi projede tanımlı yapıyı bozmuyor, sadece veri sıfırlanır
- Resimler frontend'in public klasöründen yüklenir
