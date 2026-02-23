// Self-contained translations — no external dependencies
// Each key maps to translations for all supported languages

export type Locale =
    | "en" | "es" | "fr" | "de" | "hi" | "ar" | "pt" | "ru"
    | "ja" | "ko" | "zh" | "tr" | "it" | "id" | "vi" | "th"
    | "nl" | "pl" | "cs" | "ro" | "sv" | "sk" | "ms" | "fa";

export const locales: { code: Locale; name: string }[] = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "cs", name: "Čeština" },
    { code: "de", name: "Deutsch" },
    { code: "es", name: "Español" },
    { code: "fa", name: "فارسی" },
    { code: "fr", name: "Français" },
    { code: "hi", name: "हिन्दी" },
    { code: "id", name: "Bahasa Indonesia" },
    { code: "it", name: "Italiano" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "ms", name: "Bahasa Melayu" },
    { code: "nl", name: "Nederlands" },
    { code: "pl", name: "Polski" },
    { code: "pt", name: "Português" },
    { code: "ro", name: "Română" },
    { code: "ru", name: "Русский" },
    { code: "sk", name: "Slovenčina" },
    { code: "sv", name: "Svenska" },
    { code: "th", name: "ไทย" },
    { code: "tr", name: "Türkçe" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "zh", name: "中文" },
];

type TranslationDict = Record<string, Record<Locale, string>>;

const t: TranslationDict = {
    // ─── Navbar ───
    "nav.about": {
        en: "About", es: "Acerca de", fr: "À propos", de: "Über uns", hi: "हमारे बारे में", ar: "حول", pt: "Sobre", ru: "О нас",
        ja: "概要", ko: "소개", zh: "关于", tr: "Hakkında", it: "Info", id: "Tentang", vi: "Giới thiệu", th: "เกี่ยวกับ",
        nl: "Over", pl: "O nas", cs: "O nás", ro: "Despre", sv: "Om", sk: "O nás", ms: "Tentang", fa: "درباره",
    },
    "nav.features": {
        en: "Features", es: "Funciones", fr: "Fonctionnalités", de: "Funktionen", hi: "विशेषताएँ", ar: "الميزات", pt: "Recursos", ru: "Функции",
        ja: "機能", ko: "기능", zh: "功能", tr: "Özellikler", it: "Funzionalità", id: "Fitur", vi: "Tính năng", th: "คุณสมบัติ",
        nl: "Functies", pl: "Funkcje", cs: "Funkce", ro: "Funcții", sv: "Funktioner", sk: "Funkcie", ms: "Ciri-ciri", fa: "ویژگی‌ها",
    },
    "nav.contact": {
        en: "Contact", es: "Contacto", fr: "Contact", de: "Kontakt", hi: "संपर्क", ar: "اتصل بنا", pt: "Contato", ru: "Контакты",
        ja: "お問い合わせ", ko: "연락처", zh: "联系", tr: "İletişim", it: "Contatti", id: "Kontak", vi: "Liên hệ", th: "ติดต่อ",
        nl: "Contact", pl: "Kontakt", cs: "Kontakt", ro: "Contact", sv: "Kontakt", sk: "Kontakt", ms: "Hubungi", fa: "تماس",
    },

    // ─── Hero ───
    "hero.badge": {
        en: "100% Free & Secure", es: "100% Gratis y Seguro", fr: "100% Gratuit et Sécurisé", de: "100% Kostenlos & Sicher", hi: "100% मुफ्त और सुरक्षित", ar: "مجاني وآمن 100%", pt: "100% Grátis e Seguro", ru: "100% Бесплатно и Безопасно",
        ja: "100%無料＆安全", ko: "100% 무료 & 안전", zh: "100%免费且安全", tr: "100% Ücretsiz ve Güvenli", it: "100% Gratuito e Sicuro", id: "100% Gratis & Aman", vi: "100% Miễn phí & An toàn", th: "ฟรี 100% & ปลอดภัย",
        nl: "100% Gratis & Veilig", pl: "100% Darmowe i Bezpieczne", cs: "100% Zdarma a Bezpečně", ro: "100% Gratuit și Sigur", sv: "100% Gratis & Säkert", sk: "100% Zadarmo a Bezpečne", ms: "100% Percuma & Selamat", fa: "۱۰۰٪ رایگان و امن",
    },
    "hero.title1": {
        en: "Download Videos from", es: "Descarga Videos de", fr: "Téléchargez des Vidéos des", de: "Videos herunterladen von", hi: "वीडियो डाउनलोड करें", ar: "تحميل الفيديوهات من", pt: "Baixe Vídeos de", ru: "Скачать Видео из",
        ja: "動画をダウンロード", ko: "비디오 다운로드", zh: "下载视频", tr: "Videoları İndir", it: "Scarica Video da", id: "Unduh Video dari", vi: "Tải Video từ", th: "ดาวน์โหลดวิดีโอจาก",
        nl: "Download Video's van", pl: "Pobierz Filmy z", cs: "Stahujte Videa z", ro: "Descărcați Videoclipuri de pe", sv: "Ladda ner Videor från", sk: "Stiahnite Videá z", ms: "Muat turun Video dari", fa: "دانلود ویدیو از",
    },
    "hero.title2": {
        en: "Social Media", es: "Redes Sociales", fr: "Réseaux Sociaux", de: "Sozialen Medien", hi: "सोशल मीडिया", ar: "وسائل التواصل الاجتماعي", pt: "Redes Sociais", ru: "Соцсетей",
        ja: "ソーシャルメディア", ko: "소셜 미디어", zh: "社交媒体", tr: "Sosyal Medya", it: "Social Media", id: "Media Sosial", vi: "Mạng Xã Hội", th: "โซเชียลมีเดีย",
        nl: "Sociale Media", pl: "Mediów Społecznościowych", cs: "Sociálních Médií", ro: "Rețele Sociale", sv: "Sociala Medier", sk: "Sociálnych Médií", ms: "Media Sosial", fa: "شبکه‌های اجتماعی",
    },
    "hero.title3": {
        en: "Instantly", es: "Al Instante", fr: "Instantanément", de: "Sofort", hi: "तुरंत", ar: "فوراً", pt: "Instantaneamente", ru: "Мгновенно",
        ja: "一瞬で", ko: "즉시", zh: "立即", tr: "Anında", it: "Istantaneamente", id: "Seketika", vi: "Tức Thì", th: "ทันที",
        nl: "Direct", pl: "Natychmiastowo", cs: "Okamžitě", ro: "Instant", sv: "Direkt", sk: "Okamžite", ms: "Serta-merta", fa: "فوری",
    },
    "hero.subtitle": {
        en: "Save videos, reels, and photos from Instagram, Facebook, TikTok, YouTube, and X without watermarks.",
        es: "Guarda videos, reels y fotos de Instagram, Facebook, TikTok, YouTube y X sin marcas de agua.",
        fr: "Sauvegardez vidéos, reels et photos d'Instagram, Facebook, TikTok, YouTube et X sans filigrane.",
        de: "Speichern Sie Videos, Reels und Fotos von Instagram, Facebook, TikTok, YouTube und X ohne Wasserzeichen.",
        hi: "Instagram, Facebook, TikTok, YouTube और X से वीडियो, रील और फोटो बिना वॉटरमार्क के डाउनलोड करें।",
        ar: "احفظ الفيديوهات والريلز والصور من إنستغرام وفيسبوك وتيك توك ويوتيوب و X بدون علامة مائية.",
        pt: "Salve vídeos, reels e fotos do Instagram, Facebook, TikTok, YouTube e X sem marca d'água.",
        ru: "Сохраняйте видео, рилсы и фото из Instagram, Facebook, TikTok, YouTube и X без водяных знаков.",
        ja: "Instagram、Facebook、TikTok、YouTube、Xから動画・リール・写真をウォーターマークなしで保存。",
        ko: "Instagram, Facebook, TikTok, YouTube, X에서 워터마크 없이 비디오, 릴, 사진을 저장하세요.",
        zh: "从Instagram、Facebook、TikTok、YouTube和X保存视频、Reels和照片，无水印。",
        tr: "Instagram, Facebook, TikTok, YouTube ve X'ten videoları, reelleri ve fotoğrafları filigranlı olmadan kaydedin.",
        it: "Salva video, reel e foto da Instagram, Facebook, TikTok, YouTube e X senza filigrana.",
        id: "Simpan video, reel, dan foto dari Instagram, Facebook, TikTok, YouTube, dan X tanpa watermark.",
        vi: "Lưu video, reels và ảnh từ Instagram, Facebook, TikTok, YouTube và X không có watermark.",
        th: "บันทึกวิดีโอ, รีล และรูปภาพจาก Instagram, Facebook, TikTok, YouTube และ X โดยไม่มีลายน้ำ",
        nl: "Bewaar video's, reels en foto's van Instagram, Facebook, TikTok, YouTube en X zonder watermerk.",
        pl: "Zapisuj filmy, reelsy i zdjęcia z Instagrama, Facebooka, TikToka, YouTube'a i X bez znaku wodnego.",
        cs: "Ukládejte videa, reels a fotky z Instagramu, Facebooku, TikToku, YouTube a X bez vodoznaku.",
        ro: "Salvați videoclipuri, reels și fotografii de pe Instagram, Facebook, TikTok, YouTube și X fără filigran.",
        sv: "Spara videor, reels och foton från Instagram, Facebook, TikTok, YouTube och X utan vattenstämpel.",
        sk: "Uložte videá, reels a fotky z Instagramu, Facebooku, TikToku, YouTube a X bez vodoznaku.",
        ms: "Simpan video, reel dan foto dari Instagram, Facebook, TikTok, YouTube dan X tanpa tera air.",
        fa: "ویدیو، ریلز و عکس‌ها را از اینستاگرام، فیسبوک، تیک‌تاک، یوتیوب و X بدون واترمارک ذخیره کنید.",
    },
    "hero.paste": {
        en: "Paste {platform} URL here...", es: "Pega la URL de {platform} aquí...", fr: "Collez l'URL {platform} ici...", de: "{platform}-URL hier einfügen...", hi: "{platform} URL यहाँ पेस्ट करें...", ar: "...الصق رابط {platform} هنا", pt: "Cole a URL do {platform} aqui...", ru: "Вставьте URL {platform} сюда...",
        ja: "{platform}のURLをここに貼り付け...", ko: "{platform} URL을 여기에 붙여넣기...", zh: "在此粘贴{platform}链接...", tr: "{platform} URL'sini buraya yapıştırın...", it: "Incolla URL di {platform} qui...", id: "Tempel URL {platform} di sini...", vi: "Dán URL {platform} vào đây...", th: "วาง URL {platform} ที่นี่...",
        nl: "Plak {platform} URL hier...", pl: "Wklej URL {platform} tutaj...", cs: "Vložte URL {platform} sem...", ro: "Lipește URL {platform} aici...", sv: "Klistra in {platform}-URL här...", sk: "Vložte URL {platform} sem...", ms: "Tampal URL {platform} di sini...", fa: "...لینک {platform} را اینجا بچسبانید",
    },
    "hero.download": {
        en: "Download", es: "Descargar", fr: "Télécharger", de: "Herunterladen", hi: "डाउनलोड", ar: "تحميل", pt: "Baixar", ru: "Скачать",
        ja: "ダウンロード", ko: "다운로드", zh: "下载", tr: "İndir", it: "Scarica", id: "Unduh", vi: "Tải xuống", th: "ดาวน์โหลด",
        nl: "Downloaden", pl: "Pobierz", cs: "Stáhnout", ro: "Descarcă", sv: "Ladda ner", sk: "Stiahnuť", ms: "Muat turun", fa: "دانلود",
    },

    // ─── Features ───
    "features.heading": {
        en: "Why Choose", es: "¿Por qué elegir", fr: "Pourquoi choisir", de: "Warum", hi: "क्यों चुनें", ar: "لماذا", pt: "Por que escolher", ru: "Почему",
        ja: "なぜ", ko: "왜", zh: "为什么选择", tr: "Neden", it: "Perché scegliere", id: "Mengapa memilih", vi: "Vì sao chọn", th: "ทำไมต้องเลือก",
        nl: "Waarom", pl: "Dlaczego", cs: "Proč", ro: "De ce", sv: "Varför", sk: "Prečo", ms: "Kenapa pilih", fa: "چرا",
    },
    "features.fast.title": {
        en: "Lightning Fast", es: "Ultrarrápido", fr: "Ultra Rapide", de: "Blitzschnell", hi: "बिजली की तेज़ी", ar: "سرعة البرق", pt: "Ultra Rápido", ru: "Молниеносно",
        ja: "超高速", ko: "번개처럼 빠른", zh: "闪电般快速", tr: "Yıldırım Hızında", it: "Velocissimo", id: "Sangat Cepat", vi: "Cực Nhanh", th: "เร็วสายฟ้า",
        nl: "Razendsnel", pl: "Błyskawicznie", cs: "Bleskově", ro: "Rapid ca Fulgerul", sv: "Blixtsnabbt", sk: "Bleskovo", ms: "Sepantas Kilat", fa: "فوق‌العاده سریع",
    },
    "features.fast.desc": {
        en: "Our advanced servers ensure you get your downloads in seconds, not minutes.",
        es: "Nuestros servidores avanzados aseguran que obtengas tus descargas en segundos.",
        fr: "Nos serveurs avancés garantissent vos téléchargements en quelques secondes.",
        de: "Unsere Server liefern Ihre Downloads in Sekunden, nicht Minuten.",
        hi: "हमारे उन्नत सर्वर सेकंडों में डाउनलोड सुनिश्चित करते हैं।",
        ar: "خوادمنا المتقدمة تضمن حصولك على تنزيلاتك في ثوانٍ.",
        pt: "Nossos servidores avançados garantem downloads em segundos.", ru: "Наши серверы обеспечивают загрузку за секунды.",
        ja: "高性能サーバーで数秒でダウンロード完了。", ko: "고급 서버로 몇 초 만에 다운로드됩니다.", zh: "先进服务器确保秒级下载。", tr: "Gelişmiş sunucularımız saniyeler içinde indirir.", it: "I nostri server avanzati garantiscono download in pochi secondi.", id: "Server canggih kami memastikan unduhan dalam hitungan detik.", vi: "Máy chủ tiên tiến đảm bảo tải xuống trong vài giây.", th: "เซิร์ฟเวอร์ขั้นสูงรับประกันการดาวน์โหลดในไม่กี่วินาที",
        nl: "Onze geavanceerde servers zorgen voor downloads in seconden.", pl: "Nasze serwery zapewniają pobieranie w sekundach.", cs: "Naše servery zajistí stahování během sekund.", ro: "Serverele noastre avansate asigură descărcări în câteva secunde.", sv: "Våra servrar säkerställer nedladdningar på sekunder.", sk: "Naše servery zaistia sťahovanie za sekundy.", ms: "Pelayan canggih kami memastikan muat turun dalam beberapa saat.", fa: "سرورهای پیشرفته ما دانلود در چند ثانیه را تضمین می‌کنند.",
    },
    "features.secure.title": {
        en: "100% Secure", es: "100% Seguro", fr: "100% Sécurisé", de: "100% Sicher", hi: "100% सुरक्षित", ar: "آمن 100%", pt: "100% Seguro", ru: "100% Безопасно",
        ja: "100%安全", ko: "100% 안전", zh: "100%安全", tr: "100% Güvenli", it: "100% Sicuro", id: "100% Aman", vi: "100% An toàn", th: "ปลอดภัย 100%",
        nl: "100% Veilig", pl: "100% Bezpieczne", cs: "100% Bezpečné", ro: "100% Sigur", sv: "100% Säkert", sk: "100% Bezpečné", ms: "100% Selamat", fa: "۱۰۰٪ امن",
    },
    "features.secure.desc": {
        en: "No malware, no tracking. Your downloads are private and safe.",
        es: "Sin malware, sin rastreo. Tus descargas son privadas y seguras.",
        fr: "Pas de malware, pas de suivi. Vos téléchargements sont privés et sûrs.",
        de: "Keine Malware, kein Tracking. Ihre Downloads sind privat und sicher.",
        hi: "कोई मैलवेयर नहीं, कोई ट्रैकिंग नहीं। आपके डाउनलोड निजी और सुरक्षित हैं।",
        ar: "لا برمجيات خبيثة ولا تتبع. تنزيلاتك خاصة وآمنة.",
        pt: "Sem malware, sem rastreamento. Seus downloads são privados e seguros.", ru: "Без вирусов, без слежки. Ваши загрузки приватны и безопасны.",
        ja: "マルウェアなし、トラッキングなし。", ko: "악성코드 없음, 추적 없음. 다운로드는 안전합니다.", zh: "无恶意软件，无跟踪。下载安全私密。", tr: "Kötü amaçlı yazılım yok, izleme yok.", it: "Nessun malware, nessun tracciamento.", id: "Tanpa malware, tanpa pelacakan.", vi: "Không malware, không theo dõi.", th: "ไม่มีมัลแวร์ ไม่มีการติดตาม",
        nl: "Geen malware, geen tracking.", pl: "Bez malware, bez śledzenia.", cs: "Bez malwaru, bez sledování.", ro: "Fără malware, fără urmărire.", sv: "Ingen skadlig kod, ingen spårning.", sk: "Bez malvéru, bez sledovania.", ms: "Tiada perisian hasad, tiada penjejakan.", fa: "بدون بدافزار، بدون ردیابی.",
    },
    "features.quality.title": {
        en: "High Quality", es: "Alta Calidad", fr: "Haute Qualité", de: "Hohe Qualität", hi: "उच्च गुणवत्ता", ar: "جودة عالية", pt: "Alta Qualidade", ru: "Высокое Качество",
        ja: "高画質", ko: "고화질", zh: "高质量", tr: "Yüksek Kalite", it: "Alta Qualità", id: "Kualitas Tinggi", vi: "Chất Lượng Cao", th: "คุณภาพสูง",
        nl: "Hoge Kwaliteit", pl: "Wysoka Jakość", cs: "Vysoká Kvalita", ro: "Calitate Înaltă", sv: "Hög Kvalitet", sk: "Vysoká Kvalita", ms: "Kualiti Tinggi", fa: "کیفیت بالا",
    },
    "features.quality.desc": {
        en: "Download videos in their original HD resolution (1080p, 4K) when available.",
        es: "Descarga videos en resolución HD original (1080p, 4K) cuando esté disponible.",
        fr: "Téléchargez des vidéos en résolution HD originale (1080p, 4K).",
        de: "Laden Sie Videos in Original-HD-Auflösung (1080p, 4K) herunter.",
        hi: "उपलब्ध होने पर मूल HD रिज़ॉल्यूशन (1080p, 4K) में वीडियो डाउनलोड करें।",
        ar: "حمّل الفيديوهات بدقة HD الأصلية (1080p, 4K).",
        pt: "Baixe vídeos na resolução HD original (1080p, 4K).", ru: "Скачивайте видео в оригинальном HD (1080p, 4K).",
        ja: "オリジナルHD解像度(1080p, 4K)でダウンロード。", ko: "원본 HD 해상도(1080p, 4K)로 다운로드.", zh: "以原始高清分辨率(1080p, 4K)下载视频。", tr: "Videoları orijinal HD çözünürlükte (1080p, 4K) indirin.", it: "Scarica video in risoluzione HD originale (1080p, 4K).", id: "Unduh video dalam resolusi HD asli (1080p, 4K).", vi: "Tải video ở độ phân giải HD gốc (1080p, 4K).", th: "ดาวน์โหลดวิดีโอในความละเอียด HD ดั้งเดิม (1080p, 4K)",
        nl: "Download video's in originele HD-resolutie (1080p, 4K).", pl: "Pobieraj filmy w oryginalnej rozdzielczości HD (1080p, 4K).", cs: "Stahujte videa v originálním rozlišení HD (1080p, 4K).", ro: "Descărcați videoclipuri în rezoluție HD originală (1080p, 4K).", sv: "Ladda ner videor i original HD-upplösning (1080p, 4K).", sk: "Stiahnite videá v pôvodnom HD rozlíšení (1080p, 4K).", ms: "Muat turun video dalam resolusi HD asal (1080p, 4K).", fa: "ویدیوها را با کیفیت اصلی HD (1080p, 4K) دانلود کنید.",
    },
    "features.mobile.title": {
        en: "Mobile Friendly", es: "Compatible con Móvil", fr: "Compatible Mobile", de: "Mobilfreundlich", hi: "मोबाइल फ्रेंडली", ar: "متوافق مع الجوال", pt: "Compatível com Celular", ru: "Мобильная версия",
        ja: "モバイル対応", ko: "모바일 친화적", zh: "移动端友好", tr: "Mobil Uyumlu", it: "Compatibile Mobile", id: "Ramah Seluler", vi: "Thân Thiện Di Động", th: "รองรับมือถือ",
        nl: "Mobielvriendelijk", pl: "Przyjazny dla Urządzeń Mobilnych", cs: "Přizpůsobeno Mobilům", ro: "Compatibil cu Mobilul", sv: "Mobilvänlig", sk: "Prispôsobené Mobilom", ms: "Mesra Mudah Alih", fa: "سازگار با موبایل",
    },
    "features.mobile.desc": {
        en: "Works perfectly on iPhone, Android, tablets, and desktop computers.",
        es: "Funciona perfectamente en iPhone, Android, tablets y computadoras.",
        fr: "Fonctionne parfaitement sur iPhone, Android, tablettes et ordinateurs.",
        de: "Funktioniert perfekt auf iPhone, Android, Tablets und Desktop-Computern.",
        hi: "iPhone, Android, टैबलेट और डेस्कटॉप कंप्यूटर पर पूरी तरह काम करता है।",
        ar: "يعمل بشكل مثالي على آيفون وأندرويد والأجهزة اللوحية وأجهزة الكمبيوتر.",
        pt: "Funciona perfeitamente em iPhone, Android, tablets e computadores.", ru: "Отлично работает на iPhone, Android, планшетах и ПК.",
        ja: "iPhone、Android、タブレット、PCで完璧に動作。", ko: "iPhone, Android, 태블릿, 데스크톱에서 완벽하게 작동.", zh: "在iPhone、Android、平板和电脑上完美运行。", tr: "iPhone, Android, tablet ve bilgisayarlarda mükemmel çalışır.", it: "Funziona perfettamente su iPhone, Android, tablet e computer.", id: "Bekerja sempurna di iPhone, Android, tablet, dan komputer.", vi: "Hoạt động hoàn hảo trên iPhone, Android, máy tính bảng và máy tính.", th: "ทำงานได้อย่างสมบูรณ์บน iPhone, Android, แท็บเล็ต และคอมพิวเตอร์",
        nl: "Werkt perfect op iPhone, Android, tablets en desktopcomputers.", pl: "Działa idealnie na iPhone, Androidzie, tabletach i komputerach.", cs: "Funguje dokonale na iPhonu, Androidu, tabletech i počítačích.", ro: "Funcționează perfect pe iPhone, Android, tablete și computere.", sv: "Fungerar perfekt på iPhone, Android, surfplattor och datorer.", sk: "Funguje perfektne na iPhone, Androide, tabletoch a počítačoch.", ms: "Berfungsi sempurna di iPhone, Android, tablet dan komputer.", fa: "در آیفون، اندروید، تبلت و کامپیوتر عالی کار می‌کند.",
    },

    // ─── Footer ───
    "footer.tagline": {
        en: "Free online video downloader for Instagram, TikTok, Facebook, YouTube & X. Save reels, videos, and photos in HD.",
        es: "Descargador de videos en línea gratuito para Instagram, TikTok, Facebook, YouTube y X.",
        fr: "Téléchargeur de vidéos en ligne gratuit pour Instagram, TikTok, Facebook, YouTube et X.",
        de: "Kostenloser Online-Video-Downloader für Instagram, TikTok, Facebook, YouTube & X.",
        hi: "Instagram, TikTok, Facebook, YouTube और X के लिए मुफ्त ऑनलाइन वीडियो डाउनलोडर।",
        ar: "أداة تحميل فيديو مجانية لإنستغرام وتيك توك وفيسبوك ويوتيوب و X.",
        pt: "Baixador de vídeos online gratuito para Instagram, TikTok, Facebook, YouTube e X.",
        ru: "Бесплатный онлайн-загрузчик видео для Instagram, TikTok, Facebook, YouTube и X.",
        ja: "Instagram、TikTok、Facebook、YouTube、X用の無料動画ダウンローダー。",
        ko: "Instagram, TikTok, Facebook, YouTube, X용 무료 온라인 비디오 다운로더.",
        zh: "免费在线视频下载器，支持Instagram、TikTok、Facebook、YouTube和X。",
        tr: "Instagram, TikTok, Facebook, YouTube ve X için ücretsiz video indirici.",
        it: "Downloader video online gratuito per Instagram, TikTok, Facebook, YouTube e X.",
        id: "Pengunduh video online gratis untuk Instagram, TikTok, Facebook, YouTube & X.",
        vi: "Trình tải video trực tuyến miễn phí cho Instagram, TikTok, Facebook, YouTube & X.",
        th: "ตัวดาวน์โหลดวิดีโอออนไลน์ฟรีสำหรับ Instagram, TikTok, Facebook, YouTube และ X",
        nl: "Gratis online videodownloader voor Instagram, TikTok, Facebook, YouTube & X.",
        pl: "Darmowy pobieracz wideo online dla Instagram, TikTok, Facebook, YouTube i X.",
        cs: "Bezplatný online stahovač videí pro Instagram, TikTok, Facebook, YouTube a X.",
        ro: "Descărcător video online gratuit pentru Instagram, TikTok, Facebook, YouTube și X.",
        sv: "Gratis nedladdare för Instagram, TikTok, Facebook, YouTube & X-videor.",
        sk: "Bezplatný online sťahovač videí pre Instagram, TikTok, Facebook, YouTube a X.",
        ms: "Pemuat turun video dalam talian percuma untuk Instagram, TikTok, Facebook, YouTube & X.",
        fa: "دانلودر رایگان ویدیو آنلاین برای اینستاگرام، تیک‌تاک، فیسبوک، یوتیوب و X.",
    },
    "footer.legal": {
        en: "Legal", es: "Legal", fr: "Légal", de: "Rechtliches", hi: "कानूनी", ar: "قانوني", pt: "Legal", ru: "Правовая информация",
        ja: "法的情報", ko: "법적 고지", zh: "法律", tr: "Yasal", it: "Legale", id: "Hukum", vi: "Pháp lý", th: "กฎหมาย",
        nl: "Juridisch", pl: "Prawne", cs: "Právní", ro: "Legal", sv: "Juridiskt", sk: "Právne", ms: "Undang-undang", fa: "قانونی",
    },
    "footer.privacy": {
        en: "Privacy Policy", es: "Política de Privacidad", fr: "Politique de Confidentialité", de: "Datenschutz", hi: "गोपनीयता नीति", ar: "سياسة الخصوصية", pt: "Política de Privacidade", ru: "Политика конфиденциальности",
        ja: "プライバシーポリシー", ko: "개인정보 처리방침", zh: "隐私政策", tr: "Gizlilik Politikası", it: "Informativa sulla Privacy", id: "Kebijakan Privasi", vi: "Chính sách Bảo mật", th: "นโยบายความเป็นส่วนตัว",
        nl: "Privacybeleid", pl: "Polityka Prywatności", cs: "Zásady Ochrany Soukromí", ro: "Politica de Confidențialitate", sv: "Integritetspolicy", sk: "Zásady Ochrany Súkromia", ms: "Dasar Privasi", fa: "سیاست حفظ حریم خصوصی",
    },
    "footer.terms": {
        en: "Terms of Service", es: "Términos de Servicio", fr: "Conditions d'Utilisation", de: "Nutzungsbedingungen", hi: "सेवा की शर्तें", ar: "شروط الخدمة", pt: "Termos de Serviço", ru: "Условия использования",
        ja: "利用規約", ko: "서비스 약관", zh: "服务条款", tr: "Kullanım Koşulları", it: "Termini di Servizio", id: "Ketentuan Layanan", vi: "Điều khoản Dịch vụ", th: "ข้อกำหนดการให้บริการ",
        nl: "Servicevoorwaarden", pl: "Regulamin", cs: "Podmínky Služby", ro: "Termeni și Condiții", sv: "Användarvillkor", sk: "Podmienky Služby", ms: "Terma Perkhidmatan", fa: "شرایط خدمات",
    },
    "footer.downloaders": {
        en: "Downloaders", es: "Descargadores", fr: "Téléchargeurs", de: "Downloader", hi: "डाउनलोडर", ar: "أدوات التحميل", pt: "Baixadores", ru: "Загрузчики",
        ja: "ダウンローダー", ko: "다운로더", zh: "下载器", tr: "İndiriciler", it: "Downloader", id: "Pengunduh", vi: "Trình tải xuống", th: "ตัวดาวน์โหลด",
        nl: "Downloaders", pl: "Pobieranie", cs: "Stahovače", ro: "Descărcătoare", sv: "Nedladdare", sk: "Sťahovače", ms: "Pemuat turun", fa: "دانلودرها",
    },
    "footer.guides": {
        en: "Guides", es: "Guías", fr: "Guides", de: "Anleitungen", hi: "गाइड", ar: "أدلة", pt: "Guias", ru: "Руководства",
        ja: "ガイド", ko: "가이드", zh: "指南", tr: "Rehberler", it: "Guide", id: "Panduan", vi: "Hướng dẫn", th: "คู่มือ",
        nl: "Gidsen", pl: "Poradniki", cs: "Návody", ro: "Ghiduri", sv: "Guider", sk: "Návody", ms: "Panduan", fa: "راهنماها",
    },
    "footer.support": {
        en: "Support", es: "Soporte", fr: "Support", de: "Hilfe", hi: "सहायता", ar: "الدعم", pt: "Suporte", ru: "Поддержка",
        ja: "サポート", ko: "지원", zh: "支持", tr: "Destek", it: "Supporto", id: "Dukungan", vi: "Hỗ trợ", th: "สนับสนุน",
        nl: "Ondersteuning", pl: "Wsparcie", cs: "Podpora", ro: "Suport", sv: "Support", sk: "Podpora", ms: "Sokongan", fa: "پشتیبانی",
    },
    "footer.copyright": {
        en: "All rights reserved.", es: "Todos los derechos reservados.", fr: "Tous droits réservés.", de: "Alle Rechte vorbehalten.", hi: "सर्वाधिकार सुरक्षित।", ar: "جميع الحقوق محفوظة.", pt: "Todos os direitos reservados.", ru: "Все права защищены.",
        ja: "全著作権所有。", ko: "모든 권리 보유.", zh: "版权所有。", tr: "Tüm hakları saklıdır.", it: "Tutti i diritti riservati.", id: "Hak cipta dilindungi.", vi: "Mọi quyền được bảo lưu.", th: "สงวนลิขสิทธิ์",
        nl: "Alle rechten voorbehouden.", pl: "Wszelkie prawa zastrzeżone.", cs: "Všechna práva vyhrazena.", ro: "Toate drepturile rezervate.", sv: "Alla rättigheter förbehållna.", sk: "Všetky práva vyhradené.", ms: "Hak cipta terpelihara.", fa: "تمامی حقوق محفوظ است.",
    },
};

export function getTranslation(key: string, locale: Locale): string {
    const entry = t[key];
    if (!entry) return key;
    return entry[locale] || entry.en || key;
}

export default t;
