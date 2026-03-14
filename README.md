# ZenBlogClient

ZenBlogClient, **ZenBlogServer** ile birlikte çalışan modern bir blog platformunun istemci (frontend) uygulamasıdır. Proje, içerik tüketimi ile yönetim ekranlarını aynı Angular uygulaması içinde sunarak hem ziyaretçi deneyimini hem de panel operasyonlarını tek çatı altında toplar.

## Projenin Amacı

ZenBlogClient’ın temel hedefi, blog ürünlerinde ihtiyaç duyulan iki ana deneyimi tutarlı bir yapıda sağlamaktır:

- **Public taraf:** Ziyaretçilerin blog içeriklerini görüntüleyebildiği, detayları okuyabildiği ve etkileşim kurabildiği sayfalar
- **Admin taraf:** Yetkili kullanıcıların kategori, blog, yorum ve iletişim verilerini yönetebildiği panel ekranları

Bu yaklaşım, backend tarafındaki modüler API yapısıyla uyumlu ve sürdürülebilir bir frontend iskeleti oluşturur.

## Neyi Çözüyor?

ZenBlogClient özellikle aşağıdaki ürün ihtiyaçlarına odaklanır:

- **Blog keşfi:** Ana sayfada içerik listeleri ve güncel yazılar
- **Detay deneyimi:** Yazı bazında içerik, yorum ve alt yorum akışının görüntülenmesi
- **İletişim akışı:** Kullanıcıların mesaj/iletişim formu üzerinden platformla etkileşimi
- **Kimlik doğrulama:** JWT tabanlı oturum yönetimi (login/logout)
- **Panel yönetimi:** Admin alanında içerik ve yardımcı modüllerin CRUD operasyonları

## Öne Çıkan Teknik Özellikler

- **Angular 21 (Standalone + Modüler yapı)**
  - Component-first geliştirme yaklaşımı
  - Routing tabanlı layout ayrımı (main/admin)
- **JWT tabanlı istemci kimlik yönetimi**
  - `@auth0/angular-jwt` ile token çözümleme ve süre kontrolü
  - Route guard ile admin alanı koruması
- **HTTP Interceptor mimarisi**
  - İsteklere merkezi token ekleme yaklaşımı
- **Service katmanı ile API entegrasyonu**
  - Blogs, Categories, Comments, Messages, About, Social ve ContactInfo uçları için ayrık servis yapısı
- **UI ekosistemi**
  - Bootstrap 5, Bootstrap Icons
  - SweetAlert2, Alertify, AOS, Swiper
- **Protocol fallback yaklaşımı (seçili servislerde)**
  - HTTPS endpoint başarısız olduğunda HTTP endpoint’e kontrollü fallback

## Uygulama Mimarisi

`src/app` altında katmanlar sorumluluk bazlı ayrılmıştır:

- **`_main-components`**
  - Public taraftaki sayfalar (home, blog details, about, contact, login)
- **`_admin-components`**
  - Yönetim paneli ekranları (category, blog, comment, contact-info, message, social, about)
- **`_layouts`**
  - Main ve Admin layout bileşenleri
- **`_services`**
  - Her domain için API çağrılarını yöneten servisler
- **`_guards`**
  - Kimlik doğrulama kontrolleri
- **`_interceptors`**
  - Token/HTTP pipeline müdahaleleri
- **`_models`**
  - DTO ve response/result modelleri

Bu organizasyon, feature eklemeyi ve bakım süreçlerini kolaylaştırır.

## Route Yapısı (Yüksek Seviye)

Uygulama iki temel route grubuna ayrılır:

- **Public:**
  - `/` (home)
  - `/login`
  - `/blogdetails/:id`
  - `/about`
  - `/contact`
- **Admin (AuthGuard korumalı):**
  - `/admin/category`
  - `/admin/blog`
  - `/admin/comment`
  - `/admin/contactInfo`
  - `/admin/message`
  - `/admin/social`
  - `/admin/about`

## Gereksinimler

- Node.js (LTS önerilir)
- npm
- Angular CLI (`npm` script’leri üzerinden de çalıştırılabilir)
- Çalışır durumda ZenBlogServer API’si

> Not: Servis URL’leri varsayılan olarak `https://localhost:7000` ve bazı senaryolarda `http://localhost:5000` hedeflerini kullanır.

## Kurulum

```bash
npm install
```

## Geliştirme Ortamında Çalıştırma

```bash
npm start
```
Uygulama varsayılan olarak `http://localhost:4200` adresinde ayağa kalkar.

## Build

```bash
npm run build
```
Derleme çıktısı `dist/` klasörüne üretilir.

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:
## Test

```bash
npm test
```
## Backend Entegrasyonu
Bu client projesi, ZenBlogServer ile birlikte tasarlanmıştır. Auth, blog, kategori, yorum, iletişim ve yönetim modüllerinin tamamı API üzerinden beslenir. Sağlıklı bir local deneyim için server projesinin de eşzamanlı çalıştırılması önerilir.

## Kısa Yol Haritası

- Environment bazlı API URL yönetiminin güçlendirilmesi
- Admin panelinde rol bazlı yetki görünürlüğü
- Daha kapsamlı bir form validasyon ve hata sunum standardı
- Unit/component test kapsamının genişletilmesi
- E2E test altyapısının eklenmesi
---

ZenBlogClient, ZenBlogServer’ın sunduğu temiz ve modüler backend mimarisini, kullanıcı odaklı bir Angular arayüzüyle tamamlayan üretime yakın bir frontend temelidir.
