🚗 Proje Adı: FleetFlow – Akıllı Araç ve Servis Operasyonları Portalı
🔍 Proje Genel Bakış
![image](https://github.com/user-attachments/assets/97e4d440-7924-4048-b635-3a5672ee77e5)

FleetFlow, büyük ve orta ölçekli organizasyonların karmaşık araç envanterlerini ve bakım iş akışlarını yönetmek için tasarlanmış modern, AI destekli bir araç yönetimi ve servis koordinasyon platformudur. Araç takibi, servis randevu planlaması ve gerçek zamanlı operasyonel analizleri sorunsuz bir şekilde sunar. Tüm bu özellikler, ölçeklenebilir bir mikroservis mimarisiyle inşa edilmiştir.

FleetFlow, güçlü bir backend mühendisliği (.NET Core, RabbitMQ, Redis, SQL Server) ile kullanıcı dostu ve responsive (duyarlı) panolar sunarak operasyonel kontrol ve performans görünürlüğü sağlar.

🎯 Ana Hedefler
Araç veri yönetimini ve servis planlamasını kolaylaştırmak

Modern .NET mimarisi ile yüksek performanslı backend operasyonu sağlamak

Gerçek zamanlı operasyonel analizler sunarak karar alma süreçlerini hızlandırmak

Güvenli REST API’leri ve konteyner tabanlı mikroservislerle entegrasyona uygun altyapı sunmak

🧩 Ana Özellikler
✅ Araç Yönetimi
Araçları kaydetme, güncelleme ve arşivleme

Marka, model yılı ve durum gibi kriterlere göre gelişmiş filtreleme

VIN, model ve müşteri verisi ile küresel arama

🛠️ Servis Planlama ve Takip
Servis randevusu oluşturma, güncelleme ve izleme

Gerçek zamanlı durum güncellemeleri

Yeni veya tamamlanmış görevler için toast (pop-up) bildirimleri

📈 Analitik ve Görselleştirme
Son 30 gün içinde tamamlanan servisleri gösteren interaktif çizgi grafiği

Servis türü dağılımını gösteren pasta grafiği

KPI kartları: Toplam Araç Sayısı, Bekleyen Randevular, Geçmiş Servisler

📤 Raporlama Araçları
Verileri CSV veya PDF formatında dışa aktarabilme

Aylık rapor oluşturma butonu ve e-posta bildirimleri

🧪 Teknolojik Altyapı
Katman	Teknoloji
Backend	.NET Core 6+, Entity Framework Core
İletişim	RabbitMQ (asenkron olay yönetimi), Redis (önbellek)
Veritabanı	Microsoft SQL Server
API'ler	RESTful API, Swagger/OpenAPI ile dökümantasyon
Konteynerleştirme	Docker, Kubernetes üzerinde dağıtım
Monitoring & Güvenlik	Azure Application Insights, Grafana
Kimlik Doğrulama ve Yetkilendirme	Token tabanlı erişim kontrolü (JWT)
CI/CD	GitHub Actions veya Azure DevOps pipeline'ları
Bulut Altyapısı	Azure Key Vault, API Management (APIM)

🖥️ Kullanıcı Arayüzü Özellikleri
Karanlık/Aydınlık Mod Geçişi

Tam Duyarlı Tasarım: Masaüstü, tablet ve mobil cihazlarda uyumlu

Kolay Kullanılabilir Yan Menü: İkonlar ve etiketlerle bölümler

Geliştirilmiş Tipografi ve Boşluklar: Okunabilirliği artırmak için

Hover Efektleri: Etkileşimli öğeler için görsel geri bildirim

🔄 Mikroservis Mimarisi
Fleet Servisi – Araçlarla ilgili tüm operasyonları ve envanteri yönetir

Scheduler Servisi – Randevu oluşturma, ilerleme takibi ve bildirimleri yönetir
Her iki servis de tam anlamıyla konteynerleştirilmiş olup Kubernetes üzerinde dağıtılmaktadır.

📦 Teslimat Özeti
Mikroservisler ile yapılandırılmış tam kaynak kodu

API dökümantasyonu (Swagger/OpenAPI)

Birim ve entegrasyon testleri (%80 ve üzeri test kapsamı)

CI/CD pipeline'ları için yapılandırmalar

README ve kurulum talimatları

İzleme kurulumu ve Grafana panoları

