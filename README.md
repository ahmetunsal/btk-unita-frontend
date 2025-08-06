# **Üniversite Tercih Asistanı - UNITA**

<img style="width:100%;" src="./public/Whisk_ca2fce7366.jpg" />


## [Demo Linki](https://unita-btk-hackathon.vercel.app/)

## **Ön Bilgilendirme**
Hackaton'da benim seçmiş olduğum konsept Gemini ile eğitim web uygulaması yapmak. Ana amacımız Gemini'yi kullanmak olmasından ötürü
mümkün mertebe jüri üyelerimizi yormayacak bir sistem geliştirmek istedim. Bu yüzden mevcut elimde olan giriş yapma ve kayıt olma gibi 
işlemleri geçiçi olarak devre dışı bıraktım. Sistem şu şekilde işlemekte:

- Kullanıcı anasayfaya gider.
- "Hemen Başla" adlı butona tıklar ve anket sayfasına yönlendirilir.
- İlgili kullanıcıya bir token ataması gerçekleştirilir ve ankete başlanılır.
- Kullanıcı anketi tamamlar ve sistem otomatik olarak ilgili bilgileri öncelikle MongoDB'de kayıtlı olan 2024 AYT başarı sıralamaları ve diğer birkaç veri ile filtreleme yapar.
- Filtrelenmiş bilgiler yapay zekamız Gemini'ye (2.5 flash) gönderilir.
- Gemini'den alınan bilgiler kullanıcıya yeni bir sayfada gösterilir.
- Kullanıcı, URL'yi bir yere not alıp (veya ilgili sayfadaki en altta bulunan paylaş butonuyla paylaşarak) daha sonradan da aynı sonuçlara ulaşabilir.

Yani temel mantığımız session token gibi. Böylece jüri üyelerimiz kullanıcı kaydı (veya kullanıcı girişi) gibi bir durumla uğraşmadan sistemi kolayca test edebilecek.

-----

## **1. Proje Hakkında**

Üniversiteye giriş sınavları (YKS) sonrası, milyonlarca genç arkadaşımız için en kritik ve kafa karıştırıcı süreçlerden biri başlar: **Üniversite tercihi.** Adaylar genellikle puanları ve sıralamaları doğrultusunda tercih yapmaya çalışsa da, kişisel ilgi alanları, yetenekleri, kariyer hedefleri ve hatta şehir/üniversite tercihleri gibi faktörler çoğu zaman göz ardı edilir veya doğru şekilde analiz edilemez. Bu durum, yanlış bölüm seçimlerine, mutsuz öğrencilik hayatlarına ve gelecekte mesleki tatminsizliklere yol açabilmektedir.

**UNITA (Üniversite Tercih Asistanı)** projesi, bu önemli boşluğu doldurmak ve gençlere **kişiselleştirilmiş, bilinçli ve yapay zeka destekli** bir tercih rehberliği sunmak amacıyla ortaya çıkmıştır.

-----

## **2. Amaç ve Vizyon**

**Amacım:** TYT ve AYT'ye girmiş, ancak üniversite tercihi konusunda net bir fikri olmayan genç arkadaşlara yönelik, yapay zeka (Google Gemini) destekli ücretsiz bir tercih asistanı sunmaktır. Bu asistan, sadece puan ve sıralama bazlı değil, aynı zamanda adayın kişisel özelliklerini, ilgi alanlarını ve kariyer beklentilerini de dikkate alarak en uygun şehir, üniversite ve bölüm önerilerini sunacaktır.

**Vizyon:** Geleceğin üniversite öğrencilerine, potansiyellerini en iyi şekilde kullanabilecekleri, mutlu ve başarılı bir akademik ve profesyonel hayata giden yolda rehberlik eden lider yapay zeka tabanlı tercih platformu olmaktır. Her gencin doğru tercihi yapabilmesi için bilgiye kolayca ulaşabilmesini ve kendini keşfetmesini sağlamak.

-----

## **3. Tech Stack**

Proje henüz ön aşamada olmasından ötürü geçici teknolojiler kullanılmıştır:

  * **Yapay Zeka Modeli:** Google Gemini (Ana öneri motoru)
  * **Ön Uç (Frontend):** Next.js (React tabanlı, sunucu tarafı renderlama ve performans için)
  * **Veritabanı:** MongoDB
  * **Veri Toplama:** Web Scraping (Node.js tabanlı kütüphanelerle: Cheerio, Puppeteer vb. - Üniversite taban puanları, başarı sıralamaları, kontenjanlar gibi YÖK ve ÖSYM kaynaklı güncel veriler için)
  * **Dağıtım (Deployment):** Vercel

-----

## **4. Özellikler**

UNITA, öğrencilere kapsamlı bir tercih deneyimi sunmak için aşağıdaki özelliklere sahiptir ve geliştirilecektir:

### **(+) Mevcut Özellikler:**

  * **Kişiselleştirilmiş Anket:** Öğrencinin ilgi alanları, kişilik özellikleri, ders başarıları, şehir ve üniversite tercihleri gibi demografik ve kişisel bilgileri toplayan kısa ve etkili çoktan seçmeli/evet-hayır anket soruları.
  * **Gemini Destekli Tercih Önerileri:** Anket sonuçları ve öğrencinin YKS puan/sıralama verileri doğrultusunda, **Google Gemini** tarafından oluşturulan, kişiye özel şehir, üniversite ve bölüm önerileri. Bu öneriler, öğrencinin profilindeki anahtar kelimelerle, veri tabanındaki üniversite ve bölüm tanımları arasında **kişilik-iş alanı korelasyonu** kurularak sunulur.
  * **Güncel Üniversite Verileri:** Web scraping ile toplanmış, 2022, 2023 ve 2024 yıllarına ait güncel üniversite taban puanları, başarı sıralamaları ve kontenjan bilgileri (SAY, SÖZ, EA, DİL puan türlerine göre).

### **(-) Gelecekte Eklenecek Özellikler:**

  * **Kullanıcı Kaydı:** Basit ve hızlı kayıt süreci ile kullanıcı profili oluşturma.
  * **İstihdam ve Atama Verileri:** Önerilen bölümlerin mezuniyet sonrası genel istihdam oranları, kendi alanında iş bulma yüzdeleri ve özellikle kamuda atanma potansiyeli (KPSS taban puanları, atama sayıları gibi) hakkında detaylı bilgiler.
  * **Meslek Tanımları ve İş Gücü Piyasası Entegrasyonu:** İŞKUR verileri ve meslek kodları ile entegrasyon sağlayarak, öğrencilere önerilen bölümlerle ilgili potansiyel meslek tanımları ve iş gücü piyasasındaki güncel durum hakkında bilgi sunma.
  * **Kariyer Yolu Simülasyonları:** Seçilen bölümlerin potansiyel kariyer patikalarını ve gelişim alanlarını gösteren görselleştirmeler.
  * **Mentörlük ve Rehberlik Modülü:** Alanında uzman kişilerden veya üniversite öğrencilerden canlı sohbet/danışmanlık imkanı.
  * **Tercih Listesi Oluşturma ve Yönetme:** Öğrencilerin beğendikleri bölümleri favorilerine ekleyerek kendi tercih listelerini oluşturup düzenleyebilmeleri.
  * **Mobil Uygulama:** Platformun mobil cihazlardan da erişilebilir olması.
  * **İlgili Üniversite/Bölüm Hakkında Sohbet:** İlgili üniversite ve bölüm hakkında **Gemini** ile sohbet edilebilmesi.

-----

## **7. İletişim**

Sorularınız ve önerileriniz için contact.unsalahmet@gmail.com adresinden benimle iletişime geçebilirsiniz.
