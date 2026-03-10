const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');
const year = document.querySelector('#current-year');
const revealItems = document.querySelectorAll('.reveal');
const prayerList = document.querySelector('#prayer-list');
const prayerEmpty = document.querySelector('#prayer-empty');
const eventList = document.querySelector('#event-list');
const eventEmpty = document.querySelector('#event-empty');
const communityForm = document.querySelector('#community-form');
const communityFeedback = document.querySelector('#community-feedback');
const statTotalMembers = document.querySelector('#stat-total-members');
const statApprovedMembers = document.querySelector('#stat-approved-members');
const statPendingMembers = document.querySelector('#stat-pending-members');
const languageSelect = document.querySelector('#language-select');
let currentLanguage = 'en';

const translations = {
  en: {
    topbarOfficial: 'Official public website for Budapest Medhane Alem Church',
    brandName: 'Budapest Medhane Alem Church',
    brandSubtitle: 'Ethiopian Orthodox Tewahido Church',
    navAbout: 'About',
    navIdentity: 'Identity',
    navWorship: 'Worship',
    navPrayers: 'Prayers',
    navCommunity: 'Community',
    navMinistries: 'Ministries',
    ministriesTag: 'Sacraments and ministries',
    ministriesTitle: 'Core areas of church service reflected from the reference structure',
    ministryBaptismTitle: 'Baptism',
    ministryBaptismDesc: 'Welcoming the faithful into the sacramental life of the church through holy baptism.',
    ministryGuidanceTitle: 'Spiritual Guidance',
    ministryGuidanceDesc: 'Prayer, counsel, and instruction that strengthen Christian life and discipleship.',
    ministryMatrimonyTitle: 'Holy Matrimony',
    ministryMatrimonyDesc: 'Marriage honored as a sacred covenant within the life and teaching of the church.',
    ministryCommunionTitle: 'Holy Communion',
    ministryCommunionDesc: 'The central mystery of communion within the worship life of the faithful community.',
    ministryMemorialTitle: 'Memorial Prayer',
    ministryMemorialDesc: 'Prayerful remembrance for the departed and support for families in times of loss.',
    navGallery: 'Gallery',
    navContact: 'Contact',
    navAdmin: 'Admin',
    languageLabel: 'Language',
    heroEyebrow: 'Budapest parish under the Germany and surrounding areas diocese',
    heroLead: 'A professional public-facing church website presenting the identity, worship life, community mission, and parish address of the Budapest Medhane Alem Church.',
    heroAddressBtn: 'View Official Address',
    heroPrayerBtn: 'Prayer Board',
    heroExploreBtn: 'Explore Church Life',
    aboutTag: 'About the parish',
    aboutTitle: 'A church home rooted in prayer, sacramental life, and service',
    aboutIntro1: 'The Budapest Medhane Alem Church serves Ethiopian Orthodox faithful and all visitors seeking worship, spiritual guidance, and community life in Budapest. The site is designed to present the church clearly and professionally for public reference and institutional verification.',
    aboutIntro2: 'Inspired by established Ethiopian Orthodox church presentation standards, this website brings together ecclesiastical identity, multilingual naming, church life, location details, and a dignified visual character appropriate for an official parish presence.',
    aboutFeature1Title: 'Liturgical life',
    aboutFeature1Desc: 'Regular prayer, divine liturgy, feast observances, and sacramental ministry.',
    aboutFeature2Title: 'Pastoral care',
    aboutFeature2Desc: 'Guidance for families, children, youth, and the wider community.',
    aboutFeature3Title: 'Public clarity',
    aboutFeature3Desc: 'Official church naming and Budapest address displayed in a structured form.',
    identityTag: 'Official identity',
    identityTitle: 'Clear church presentation for public and administrative reference',
    verificationTag: 'Verification note',
    verificationTitle: 'Official address and public identity are presented consistently on this website.',
    verificationDesc: 'This section is intended to make the church easy to identify for visitors, institutions, and verification processes requiring the official church name, physical address, and public presence in Budapest.',
    worshipTag: 'Worship life',
    worshipTitle: 'Prayer, liturgy, feast observance, and fellowship',
    worshipCard1Title: 'Sunday Divine Liturgy',
    worshipCard1Desc: 'The parish gathers for worship centered on prayer, sacred readings, liturgical chant, and the life-giving tradition of the Ethiopian Orthodox Tewahido Church.',
    worshipCard2Title: 'Feast Day Observances',
    worshipCard2Desc: 'Major feasts and commemorations are observed with reverence, bringing the faithful together in prayer and celebration throughout the year.',
    worshipCard3Title: 'Children and Community',
    worshipCard3Desc: 'The church supports spiritual formation, intergenerational belonging, and a stable community environment for families and youth.',
    worshipCard4Title: 'Pastoral Guidance',
    worshipCard4Desc: 'Members of the parish can seek spiritual support, guidance, and community connection through the ministry of the church.',
    prayerTag: 'Prayer board',
    prayerTitle: 'Admin-managed prayer schedule and announcements',
    prayerDesc: 'Prayer items published by the church administrator appear here with their scheduled time and can be shared across social media platforms.',
    prayerEmpty: 'No prayers have been published yet.',
    eventsTag: 'Church events',
    eventsTitle: 'Upcoming events published by the administrator',
    eventsDesc: 'The church administrator can publish event time, date, location, supporting documents, and other details here.',
    eventsEmpty: 'No events have been published yet.',
    eventLocationLabel: 'Location',
    eventOpenDocument: 'Open document',
    eventOpenLink: 'Open link',
    communityTag: 'Community registration',
    communityTitle: 'Register for the church community',
    communityIntro: 'Visitors and community members can request registration here. Requests stay pending until the administrator reviews and accepts them.',
    communityBenefit1Title: 'Admin approval flow',
    communityBenefit1Desc: 'Each registration is reviewed before approval.',
    communityBenefit2Title: 'Community visibility',
    communityBenefit2Desc: 'The administrator can monitor who has joined and who is still pending.',
    communityBenefit3Title: 'Responsible communication',
    communityBenefit3Desc: 'Prayer updates can be published and shared from the official site.',
    fieldFullName: 'Full name',
    fieldEmail: 'Email address',
    fieldPhone: 'Phone number',
    fieldCity: 'City',
    fieldMessage: 'Message',
    fieldSubject: 'Subject',
    communitySubmit: 'Register for approval',
    galleryTag: 'Church image gallery',
    galleryTitle: 'A visual presentation of faith, dignity, and parish identity',
    galleryImg1Alt: 'Portrait image used in the church website design',
    galleryImg1Caption: 'Sacred visual identity for the Budapest Medhane Alem Church',
    galleryImg2Alt: 'Secondary church-related image used in the website',
    galleryImg2Caption: 'Supporting parish image for the official public website',
    identityParishLabel: 'Parish address',
    identityAffiliationLabel: 'Ecclesiastical affiliation',
    identityDioceseValue: 'Under Germany and Surrounding Areas Diocese',
    identityPurposeLabel: 'Public website purpose',
    identityPurposeValue: 'Representation, information, verification',
    contactAddressLabel: 'Official address',
    contactJurisdictionLabel: 'Jurisdiction',
    contactDioceseValue: 'Germany and Surrounding Areas Diocese',
    contactPublicUseLabel: 'Public use',
    contactPublicUseValue: 'Church information, identity, and verification',
    contactTag: 'Contact and location',
    mapsBtn: 'Open in Maps',
    backTopBtn: 'Back to Top',
    inquiryTag: 'Inquiry form',
    inquiryTitle: 'Website inquiry and verification request',
    inquiryDesc: 'Use this form layout as a front-end contact point for church administration. It can be connected later to the official parish email or backend service.',
    sendInquiryBtn: 'Send inquiry',
    footerAddress: 'Address',
    footerPurpose: 'Website purpose',
    footerAdmin: 'Administration',
    footerAdminLink: 'Open the protected admin dashboard',
    placeholderName: 'Your name',
    placeholderFullName: 'Your full name',
    placeholderPhone: 'Phone number',
    placeholderCity: 'Budapest or your city',
    placeholderJoinMessage: 'Tell the church administration how you would like to join',
    placeholderSubject: 'Verification or church inquiry',
    placeholderMessage: 'Write your message here',
    share: 'Share',
    shareCopied: 'Copied',
    shareFacebook: 'Facebook',
    shareTelegram: 'Telegram',
    shareWhatsApp: 'WhatsApp',
    registrationSubmitting: 'Submitting registration...',
    registrationSuccess: 'Registration received and awaiting admin approval.',
    registrationFailed: 'Registration failed.',
    inquiryThanksPrefix: 'Thank you',
    inquiryThanksSuffix: 'The inquiry form is visible on the site and can be connected to the official church email workflow.',
    loadPrayersFailed: 'Unable to load prayers.',
  },
  hu: {
    topbarOfficial: 'Budapest Medhane Alem templom hivatalos nyilvanos weboldala',
    brandName: 'Budapest Medhane Alem Templom',
    brandSubtitle: 'Etióp Ortodox Tewahedo Egyház',
    navAbout: 'Rólunk',
    navIdentity: 'Egyházi azonosítás',
    navWorship: 'Istentisztelet',
    navPrayers: 'Imák',
    navCommunity: 'Közösség',
    navMinistries: 'Szolgálatok',
    ministriesTag: 'Szentségek és szolgálatok',
    ministriesTitle: 'Az egyházi szolgálat fő területei a referencia szerkezet alapján',
    ministryBaptismTitle: 'Keresztség',
    ministryBaptismDesc: 'A hívek befogadása az egyház szentségi életébe a szent keresztség által.',
    ministryGuidanceTitle: 'Lelki útmutatás',
    ministryGuidanceDesc: 'Imádság, tanácsadás és tanítás, amely erősíti a keresztény életet és tanítványságot.',
    ministryMatrimonyTitle: 'Szent házasság',
    ministryMatrimonyDesc: 'A házasság szent szövetségként tisztelt az egyház életében és tanításában.',
    ministryCommunionTitle: 'Szent áldozás',
    ministryCommunionDesc: 'Az áldozás központi misztériuma a hívő közösség istentiszteleti életében.',
    ministryMemorialTitle: 'Emlékező ima',
    ministryMemorialDesc: 'Imádságos megemlékezés az elhunytakról és támogatás a gyászoló családoknak.',
    navGallery: 'Galéria',
    navContact: 'Kapcsolat',
    navAdmin: 'Admin',
    languageLabel: 'Nyelv',
    heroEyebrow: 'Budapesti egyházközség a németországi és környező területek egyházmegyéje alatt',
    heroLead: 'Professzionális egyházi weboldal, amely bemutatja az egyház hivatalos azonosítását, istentiszteleti életét, közösségi küldetését és budapesti címét.',
    heroAddressBtn: 'Hivatalos cím megtekintése',
    heroPrayerBtn: 'Imahirdetőtábla',
    heroExploreBtn: 'Egyházi élet felfedezése',
    aboutTag: 'Az egyházközségről',
    aboutTitle: 'Imádságban, szentségi életben és szolgálatban gyökerező közösség',
    aboutIntro1: 'A Budapesti Medhane Alem Templom az etióp ortodox híveket és minden látogatót szolgál, akik istentiszteletet, lelki útmutatást és közösségi életet keresnek Budapesten. Az oldal célja, hogy a templomot világosan és hivatalos módon mutassa be nyilvános tájékoztatás és intézményi hitelesítés céljából.',
    aboutIntro2: 'A kialakult etióp ortodox templomi megjelenítési normák ihletésére ez a weboldal egyesíti az egyházi identitást, a többnyelvű megnevezést, a templomi életet, a helyszín adatait és a hivatalos plébániai jelenléthez illő méltóságteljes vizuális karaktert.',
    aboutFeature1Title: 'Liturgikus élet',
    aboutFeature1Desc: 'Rendszeres ima, isteni liturgia, ünnepi megemlékezések és szentségi szolgálat.',
    aboutFeature2Title: 'Lelkipásztori gondozás',
    aboutFeature2Desc: 'Útmutatás családoknak, gyermekeknek, fiataloknak és a tágabb közösségnek.',
    aboutFeature3Title: 'Nyilvános egyértelműség',
    aboutFeature3Desc: 'A templom hivatalos neve és budapesti címe rendezett formában jelenik meg.',
    identityTag: 'Hivatalos azonosítás',
    identityTitle: 'Egyértelmű egyházi bemutatás nyilvános és adminisztratív célra',
    verificationTag: 'Ellenőrzési megjegyzés',
    verificationTitle: 'A hivatalos cím és a nyilvános egyházi identitás ezen a weboldalon egységesen jelenik meg.',
    verificationDesc: 'Ez a szakasz azt szolgálja, hogy a templom könnyen azonosítható legyen a látogatók, intézmények és azon ellenőrzési folyamatok számára, amelyekhez szükség van a hivatalos egyházi névre, a fizikai címre és a budapesti nyilvános jelenlétre.',
    worshipTag: 'Istentiszteleti élet',
    worshipTitle: 'Imádság, liturgia, ünnepek és közösség',
    worshipCard1Title: 'Vasárnapi Szent Liturgia',
    worshipCard1Desc: 'A gyülekezet olyan istentiszteletre gyűlik össze, amelynek középpontjában az ima, a szent olvasmányok, a liturgikus ének és az Etióp Ortodox Tewahido Egyház éltető hagyománya áll.',
    worshipCard2Title: 'Ünnepnapi megemlékezések',
    worshipCard2Desc: 'A főbb ünnepeket és megemlékezéseket tisztelettel tartjuk meg, egész évben imában és ünneplésben egyesítve a híveket.',
    worshipCard3Title: 'Gyermekek és közösség',
    worshipCard3Desc: 'A templom támogatja a lelki formálódást, a nemzedékek közötti összetartozást és a családok, valamint a fiatalok stabil közösségi környezetét.',
    worshipCard4Title: 'Lelkipásztori útmutatás',
    worshipCard4Desc: 'Az egyházközség tagjai lelki támogatást, útmutatást és közösségi kapcsolódást kereshetnek a templom szolgálatán keresztül.',
    prayerTag: 'Imahirdetőtábla',
    prayerTitle: 'Admin által kezelt imaidőpontok és bejelentések',
    prayerDesc: 'Az adminisztrátor által közzétett imaalkalmak itt jelennek meg, és közösségi médiában is megoszthatók.',
    prayerEmpty: 'Jelenleg nincs közzétett imaalkalom.',
    eventsTag: 'Egyházi események',
    eventsTitle: 'Az adminisztrátor által közzétett közelgő események',
    eventsDesc: 'Az egyházi adminisztrátor itt teheti közzé az esemény időpontját, dátumát, helyszínét, kapcsolódó dokumentumait és egyéb részleteit.',
    eventsEmpty: 'Jelenleg nincs közzétett esemény.',
    eventLocationLabel: 'Helyszín',
    eventOpenDocument: 'Dokumentum megnyitása',
    eventOpenLink: 'Hivatkozás megnyitása',
    communityTag: 'Közösségi regisztráció',
    communityTitle: 'Regisztráció az egyházi közösségbe',
    communityIntro: 'Látogatók és közösségi tagok itt kérhetnek regisztrációt. A kérések mindaddig függőben maradnak, amíg az adminisztrátor átvizsgálja és elfogadja azokat.',
    communityBenefit1Title: 'Adminisztrátori jóváhagyási folyamat',
    communityBenefit1Desc: 'Minden regisztrációt átvizsgálnak a jóváhagyás előtt.',
    communityBenefit2Title: 'Közösségi átláthatóság',
    communityBenefit2Desc: 'Az adminisztrátor nyomon követheti, ki csatlakozott és ki van még függőben.',
    communityBenefit3Title: 'Felelős kommunikáció',
    communityBenefit3Desc: 'Az imaközlemények közzétehetők és megoszthatók a hivatalos weboldalról.',
    fieldFullName: 'Teljes név',
    fieldEmail: 'Email cím',
    fieldPhone: 'Telefonszám',
    fieldCity: 'Város',
    fieldMessage: 'Üzenet',
    fieldSubject: 'Tárgy',
    communitySubmit: 'Regisztráció jóváhagyásra',
    galleryTag: 'Egyházi képgaléria',
    galleryTitle: 'A hit, méltóság és plébániai identitás vizuális bemutatása',
    galleryImg1Alt: 'Portré kép a templomi webdesignhoz',
    galleryImg1Caption: 'A Budapesti Medhane Alem Egyház szakrális vizuális identitása',
    galleryImg2Alt: 'Másodlagos templomi kép a weboldalhoz',
    galleryImg2Caption: 'Plébánia kép a hivatalos nyilvános weboldalhoz',
    identityParishLabel: 'Egyházközség címe',
    identityAffiliationLabel: 'Egyházi hovatartozás',
    identityDioceseValue: 'A Németországi és Környező Területek Egyházmegye alatt',
    identityPurposeLabel: 'Nyilvános weboldal célja',
    identityPurposeValue: 'Képviselet, tájékoztatás, hitelesítés',
    contactAddressLabel: 'Hivatalos cím',
    contactJurisdictionLabel: 'Joghatóság',
    contactDioceseValue: 'Németországi és Környező Területek Egyházmegyéje',
    contactPublicUseLabel: 'Nyilvános használat',
    contactPublicUseValue: 'Egyházi információ, identitás és ellenőrzés',
    contactTag: 'Kapcsolat és helyszín',
    mapsBtn: 'Megnyitás térképen',
    backTopBtn: 'Vissza az elejére',
    inquiryTag: 'Kapcsolati űrlap',
    inquiryTitle: 'Weboldal megkeresés és ellenőrzési kérés',
    inquiryDesc: 'Ez az űrlap elrendezés front-end kapcsolati pontként szolgál az egyházi adminisztráció számára. Később összekapcsolható a hivatalos plébániai e-maillel vagy háttérrendszerrel.',
    sendInquiryBtn: 'Üzenet küldése',
    footerAddress: 'Cím',
    footerPurpose: 'Weboldal célja',
    footerAdmin: 'Adminisztráció',
    footerAdminLink: 'Védett admin felület megnyitása',
    placeholderName: 'Az Ön neve',
    placeholderFullName: 'Teljes név',
    placeholderPhone: 'Telefonszám',
    placeholderCity: 'Budapest vagy az Ön városa',
    placeholderJoinMessage: 'Írja meg, hogyan szeretne csatlakozni a közösséghez',
    placeholderSubject: 'Ellenőrzési vagy egyházi megkeresés',
    placeholderMessage: 'Írja ide az üzenetét',
    share: 'Megosztás',
    shareCopied: 'Másolva',
    shareFacebook: 'Facebook',
    shareTelegram: 'Telegram',
    shareWhatsApp: 'WhatsApp',
    registrationSubmitting: 'Regisztráció küldése...',
    registrationSuccess: 'A regisztráció megérkezett és admin jóváhagyásra vár.',
    registrationFailed: 'A regisztráció sikertelen.',
    inquiryThanksPrefix: 'Köszönjük',
    inquiryThanksSuffix: 'Az űrlap látható az oldalon, és később összeköthető a hivatalos egyházi e-mail folyamattal.',
    loadPrayersFailed: 'Az imák betöltése nem sikerült.',
  },
  am: {
    topbarOfficial: 'የቡዳፔስት መድኃኔዓለም ቤተክርስቲያን ይፋዊ ድረ-ገጽ',
    brandName: 'የቡዳፔስት መድኃኔዓለም ቤተክርስቲያን',
    brandSubtitle: 'የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን',
    navAbout: 'ስለ እኛ',
    navIdentity: 'መለያ',
    navWorship: 'አምልኮ',
    navPrayers: 'ጸሎቶች',
    navCommunity: 'ማህበረሰብ',
    navMinistries: 'አገልግሎቶች',
    ministriesTag: 'ምስጢራት እና አገልግሎቶች',
    ministriesTitle: 'ከማጣቀሻ መዋቅር የተወሰዱ ዋና ዋና የቤተክርስቲያን አገልግሎት መስኮች',
    ministryBaptismTitle: 'ጥምቀት',
    ministryBaptismDesc: 'በቅዱስ ጥምቀት አማካይነት ምዕመናንን ወደ ቤተክርስቲያን ምስጢራዊ ሕይወት መቀበል።',
    ministryGuidanceTitle: 'መንፈሳዊ መምሪያ',
    ministryGuidanceDesc: 'የክርስቲያናዊ ሕይወትና ደቀ መዝሙርነትን የሚያጠናክር ጸሎት፣ ምክር እና ትምህርት።',
    ministryMatrimonyTitle: 'ቅዱስ ተክሊል',
    ministryMatrimonyDesc: 'ትዳር በቤተክርስቲያን ሕይወትና ትምህርት ውስጥ እንደ ቅዱስ ቃል ኪዳን የሚከበር ነው።',
    ministryCommunionTitle: 'ቅዱስ ቁርባን',
    ministryCommunionDesc: 'በምዕመናን የአምልኮ ሕይወት ውስጥ የማዕከላዊ ምስጢር የሆነ ቁርባን።',
    ministryMemorialTitle: 'ጸሎተ ፍትሐት',
    ministryMemorialDesc: 'ለአረፉት ሰዎች የሚደረግ የመታሰቢያ ጸሎት እና ለቤተሰቦች ድጋፍ።',
    navGallery: 'ፎቶ ማዕከል',
    navContact: 'አድራሻ',
    navAdmin: 'አድሚን',
    languageLabel: 'ቋንቋ',
    heroEyebrow: 'በጀርመንና አካባቢው ሀገረ ስብከት ስር ያለ የቡዳፔስት ደብር',
    heroLead: 'ይህ ድረ-ገጽ የቤተክርስቲያኑን ይፋዊ መለያ፣ የአምልኮ ህይወት፣ የማህበረሰብ ተልዕኮ እና አድራሻ በባለሙያ መልኩ ያቀርባል።',
    heroAddressBtn: 'ይፋዊ አድራሻ ይመልከቱ',
    heroPrayerBtn: 'የጸሎት ሰሌዳ',
    heroExploreBtn: 'የቤተክርስቲያን ሕይወት ይመልከቱ',
    aboutTag: 'ስለ ደብሩ',
    aboutTitle: 'በጸሎት፣ በምስጢራት እና በአገልግሎት የተመሰረተ ቤተክርስቲያን',
    aboutIntro1: 'የቡዳፔስት መድኃኔ ዓለም ቤተክርስቲያን በቡዳፔስት ውስጥ አምልኮ፣ መንፈሳዊ መሪነት እና የማህበረሰብ ሕይወት ለሚፈልጉ የኢትዮጵያ ኦርቶዶክስ ምእመናንን እና ሁሉንም ጎብኚዎች ታገለግላለች። ይህ ድረ-ገጽ ቤተክርስቲያኑን ለሕዝብ ማጣቀሻ እና ለተቋማዊ ማረጋገጫ ግልጽና በሙያዊ መልኩ ለማቅረብ ተዘጋጅቷል።',
    aboutIntro2: 'በተመሰረቱ የኢትዮጵያ ኦርቶዶክስ ቤተክርስቲያን አቀራረብ መመዘኛዎች ተነስቶ ይህ ድረ-ገጽ የቤተክርስቲያን መለያን፣ ባለብዙ ቋንቋ ስያሜን፣ የቤተክርስቲያን ሕይወትን፣ የአድራሻ ዝርዝሮችን እና ለይፋዊ ደብር ተገኝነት የሚመጥን ክብር ያለውን ምስላዊ ባህሪ በአንድ ላይ ያቀርባል።',
    aboutFeature1Title: 'የሊቱርጂ ሕይወት',
    aboutFeature1Desc: 'መደበኛ ጸሎት፣ መለኮታዊ ቅዳሴ፣ የበዓል አከባበር እና የምስጢራት አገልግሎት።',
    aboutFeature2Title: 'የእረኝነት እንክብካቤ',
    aboutFeature2Desc: 'ለቤተሰቦች፣ ለሕፃናት፣ ለወጣቶች እና ለሰፊው ማህበረሰብ መመሪያ።',
    aboutFeature3Title: 'ይፋዊ ግልጽነት',
    aboutFeature3Desc: 'የቤተክርስቲያኑ ይፋዊ ስያሜ እና የቡዳፔስት አድራሻ በተደራጀ መልኩ ቀርቧል።',
    identityTag: 'ይፋዊ መለያ',
    identityTitle: 'ለህዝብና ለአስተዳደር ግልጽ የቤተክርስቲያን መግለጫ',
    verificationTag: 'የማረጋገጫ ማስታወሻ',
    verificationTitle: 'ይፋዊ አድራሻው እና ሕዝባዊ መለያው በዚህ ድረ-ገጽ ላይ በተመሳሳይ መልኩ ቀርበዋል።',
    verificationDesc: 'ይህ ክፍል ቤተክርስቲያኑ ለጎብኚዎች፣ ለተቋማት እና የቤተክርስቲያኑን ይፋዊ ስም፣ አካላዊ አድራሻ እና በቡዳፔስት ያለውን ሕዝባዊ ተገኝነት የሚፈልጉ የማረጋገጫ ሂደቶች በቀላሉ እንዲለዩት የተዘጋጀ ነው።',
    worshipTag: 'የአምልኮ ሕይወት',
    worshipTitle: 'ጸሎት፣ ቅዳሴ፣ በዓላት እና ህብረት',
    worshipCard1Title: 'የእሁድ መለኮታዊ ቅዳሴ',
    worshipCard1Desc: 'ደብሩ በጸሎት፣ በቅዱሳን ንባቦች፣ በሊቱርጂ ዝማሬ እና ሕይወት በሚሰጠው የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ባህል ላይ ያተኮረ አምልኮ ለማካሄድ ይሰበሰባል።',
    worshipCard2Title: 'የበዓል ቀን አከባበር',
    worshipCard2Desc: 'ታላላቅ በዓላትና መታሰቢያዎች በክብር ይከበራሉ፣ ይህም ምእመናንን በዓመቱ ሁሉ በጸሎትና በደስታ ያንድ ላይ ያመጣል።',
    worshipCard3Title: 'ሕፃናት እና ማህበረሰብ',
    worshipCard3Desc: 'ቤተክርስቲያኑ መንፈሳዊ እድገትን፣ በትውልዶች መካከል ያለ ትስስርን እና ለቤተሰቦች እና ለወጣቶች የተረጋጋ የማህበረሰብ አካባቢን ይደግፋል።',
    worshipCard4Title: 'የእረኝነት መመሪያ',
    worshipCard4Desc: 'የደብሩ አባላት በቤተክርስቲያኑ አገልግሎት አማካኝነት መንፈሳዊ ድጋፍ፣ መመሪያ እና የማህበረሰብ ግንኙነት ሊፈልጉ ይችላሉ።',
    prayerTag: 'የጸሎት ሰሌዳ',
    prayerTitle: 'በአድሚን የሚታተም የጸሎት መርሃ ግብር እና ማስታወቂያ',
    prayerDesc: 'በአስተዳዳሪ የሚታተሙ የጸሎት መረጃዎች ከጊዜያቸው ጋር እዚህ ይታያሉ እና ወደ ማህበራዊ ሚዲያ ማጋራት ይቻላል።',
    prayerEmpty: 'እስካሁን የታተመ ጸሎት የለም።',
    eventsTag: 'የቤተክርስቲያን ክስተቶች',
    eventsTitle: 'በአስተዳዳሪው የሚታተሙ መጪ ክስተቶች',
    eventsDesc: 'አስተዳዳሪው የክስተቱን ሰዓት፣ ቀን፣ ቦታ፣ ተያያዥ ሰነዶች እና ሌሎች ዝርዝሮች እዚህ ሊያትም ይችላል።',
    eventsEmpty: 'እስካሁን የታተመ ክስተት የለም።',
    eventLocationLabel: 'ቦታ',
    eventOpenDocument: 'ሰነድ ክፈት',
    eventOpenLink: 'አገናኝ ክፈት',
    communityTag: 'የማህበረሰብ ምዝገባ',
    communityTitle: 'ወደ ቤተክርስቲያን ማህበረሰብ ይመዝገቡ',
    communityIntro: 'ጎብኚዎች እና የማህበረሰቡ አባላት እዚህ ምዝገባ መጠየቅ ይችላሉ። ጥያቄዎቹ አስተዳዳሪው እስኪመረምር እና እስኪቀበሉ ድረስ በመጠባበቂያ ላይ ይቆያሉ።',
    communityBenefit1Title: 'የአስተዳዳሪ ማጽደቅ ሂደት',
    communityBenefit1Desc: 'እያንዳንዱ ምዝገባ ከማጽደቁ በፊት ይገመገማል።',
    communityBenefit2Title: 'የማህበረሰብ ታይነት',
    communityBenefit2Desc: 'አስተዳዳሪው የተቀላቀሉትን እና አሁንም በመጠባበቂያ ላይ ያሉትን መከታተል ይችላሉ።',
    communityBenefit3Title: 'ኃላፊነት ያለው ግንኙነት',
    communityBenefit3Desc: 'የጸሎት ዝማኔዎች ከይፋው ድረ-ገጽ ታትሞ ሊጋሩ ይችላሉ።',
    fieldFullName: 'ሙሉ ስም',
    fieldEmail: 'ኢሜይል',
    fieldPhone: 'ስልክ ቁጥር',
    fieldCity: 'ከተማ',
    fieldMessage: 'መልእክት',
    fieldSubject: 'ርዕስ',
    communitySubmit: 'ለማጽደቅ ይመዝገቡ',
    galleryTag: 'የቤተክርስቲያን ፎቶ ማዕከል',
    galleryTitle: 'የእምነት፣ ክብር እና የሰበካ ማንነት ምስላዊ ትርዒት',
    galleryImg1Alt: 'በቤተክርስቲያን ድር-ገጽ ንድፍ ውስጥ ጥቅም ላይ የዋለ የምስል ፎቶ',
    galleryImg1Caption: 'ለቡዳፔስት መድኃኔ ዓለም ቤተክርስቲያን ቅዱስ የምስል ማንነት',
    galleryImg2Alt: 'ለድር-ገጹ ጥቅም ላይ የዋለ ሁለተኛ የቤተክርስቲያን ምስል',
    galleryImg2Caption: 'ለይፋዊው ድር-ገጽ የሰበካ ምስል',
    identityParishLabel: 'የሰበካ አድራሻ',
    identityAffiliationLabel: 'የቤተ ክርስቲያን ግንኙነት',
    identityDioceseValue: 'በጀርመንና አካባቢው ሀገረ ስብከት ሥር',
    identityPurposeLabel: 'የይፋ ድር-ገጽ ዓላማ',
    identityPurposeValue: 'ውክልና፣ መረጃ እና ማረጋገጫ',
    contactAddressLabel: 'ይፋዊ አድራሻ',
    contactJurisdictionLabel: 'የሥልጣን ክልል',
    contactDioceseValue: 'የጀርመንና አካባቢው ሀገረ ስብከት',
    contactPublicUseLabel: 'ለሕዝብ አገልግሎት',
    contactPublicUseValue: 'የቤተ ክርስቲያን መረጃ፣ ማንነት እና ማረጋገጫ',
    contactTag: 'አድራሻ እና መገኛ',
    mapsBtn: 'በካርታ ይክፈቱ',
    backTopBtn: 'ወደ ላይ ተመለስ',
    inquiryTag: 'የጥያቄ ቅጽ',
    inquiryTitle: 'የድረ-ገጽ ጥያቄ እና ማረጋገጫ ጥያቄ',
    inquiryDesc: 'ይህን የቅጽ አቀማመጥ ለቤተክርስቲያን አስተዳደር የፊት-መጨረሻ የመገናኛ ነጥብ እንዲሆን ይጠቀሙበት። በኋላ ከይፋዊ የደብር ኢሜይል ወይም ከባክኤንድ አገልግሎት ጋር ሊገናኝ ይችላል።',
    sendInquiryBtn: 'መልእክት ላክ',
    footerAddress: 'አድራሻ',
    footerPurpose: 'የድረ-ገጹ ዓላማ',
    footerAdmin: 'አስተዳደር',
    footerAdminLink: 'የተጠበቀ የአድሚን መድረክ ክፈት',
    placeholderName: 'ስምዎን ያስገቡ',
    placeholderFullName: 'ሙሉ ስም',
    placeholderPhone: 'ስልክ ቁጥር',
    placeholderCity: 'ቡዳፔስት ወይም ከተማዎ',
    placeholderJoinMessage: 'እንዴት መቀላቀል እንደሚፈልጉ ይጻፉ',
    placeholderSubject: 'የማረጋገጫ ወይም የቤተክርስቲያን ጥያቄ',
    placeholderMessage: 'መልእክትዎን እዚህ ይጻፉ',
    share: 'አጋራ',
    shareCopied: 'ተቀድቷል',
    shareFacebook: 'ፌስቡክ',
    shareTelegram: 'ቴሌግራም',
    shareWhatsApp: 'ዋትስአፕ',
    registrationSubmitting: 'ምዝገባ በመላክ ላይ...',
    registrationSuccess: 'ምዝገባው ተቀባይነት አግኝቶ የአድሚን ማጽደቅ ይጠብቃል።',
    registrationFailed: 'ምዝገባ አልተሳካም።',
    inquiryThanksPrefix: 'እናመሰግናለን',
    inquiryThanksSuffix: 'ይህ ቅጽ በድረ-ገጹ ላይ አለ እና ከይፋዊ ኢሜይል ስርዓት ጋር ሊገናኝ ይችላል።',
    loadPrayersFailed: 'ጸሎቶችን መጫን አልተቻለም።',
  },
};

function t(key) {
  return translations[currentLanguage]?.[key] || translations.en[key] || key;
}

const localizedPrayerTranslations = {
  'Sunday Morning Prayer': {
    hu: 'Vasárnap reggeli ima',
    am: 'የእሁድ ጠዋት ጸሎት',
  },
  'Weekly Prayer': {
    hu: 'Heti ima',
    am: 'ሳምንታዊ ጸሎት',
  },
  'Every Sunday, 6:00 - 10:30': {
    hu: 'Minden vasárnap, 6:00 - 10:30',
    am: 'በየእሁዱ 6:00 - 10:30',
  },
  'A regular parish prayer gathering centered on liturgy, sacred readings, and community worship.': {
    hu: 'Rendszeres plébániai imagyűlés, amely a liturgiára, a szent olvasmányokra és a közösségi istentiszteletre épül.',
    am: 'በሊቱርጂ፣ በቅዱሳን ንባቦች እና በማህበረሰብ አምልኮ ላይ የተመሰረተ መደበኛ የደብር የጸሎት ስብሰባ።',
  },
  'Monthly Community Prayer': {
    hu: 'Havi közösségi ima',
    am: 'ወርሃዊ የማህበረሰብ ጸሎት',
  },
  Community: {
    hu: 'Közösség',
    am: 'ማህበረሰብ',
  },
  'Monthly feast and community schedule': {
    hu: 'Havi ünnepi és közösségi programrend',
    am: 'ወርሃዊ የበዓል እና የማህበረሰብ መርሃ ግብር',
  },
  'Prayer and fellowship for the faithful community and families connected to the Budapest parish.': {
    hu: 'Ima és közösség a hívőknek és a budapesti egyházközséghez kapcsolódó családoknak.',
    am: 'ከቡዳፔስት ደብር ጋር ለተያያዙ ምእመናን እና ቤተሰቦች ጸሎትና ህብረት።',
  },
};

function localizePrayerField(value) {
  const normalizedValue = String(value ?? '');
  return localizedPrayerTranslations[normalizedValue]?.[currentLanguage] || normalizedValue;
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', 'true');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    return document.execCommand('copy');
  } finally {
    document.body.removeChild(textArea);
  }
}

async function sharePrayer(button) {
  const title = button.getAttribute('data-share-native') || 'Budapest Medhane Alem Church';
  const text = button.getAttribute('data-share-text') || '';
  const sharePayload = {
    title,
    text,
    url: window.location.href,
  };
  const clipboardText = `${title}\n${text}\n${window.location.href}`;

  if (navigator.share) {
    try {
      await navigator.share(sharePayload);
      return;
    } catch {
    }
  }

  const copied = await copyTextToClipboard(clipboardText);
  if (!copied) {
    return;
  }

  button.textContent = t('shareCopied');
  window.setTimeout(() => {
    button.textContent = t('share');
  }, 1800);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (!key) {
      return;
    }
    node.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = node.getAttribute('data-i18n-placeholder');
    if (!key) {
      return;
    }
    node.setAttribute('placeholder', t(key));
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((node) => {
    const key = node.getAttribute('data-i18n-alt');
    if (!key) {
      return;
    }
    node.setAttribute('alt', t(key));
  });

  document.documentElement.lang = currentLanguage === 'am' ? 'am' : currentLanguage;
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (form && feedback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');

    feedback.textContent = `${t('inquiryThanksPrefix')}, ${name}. ${t('inquiryThanksSuffix')}`;
    form.reset();
  });
}

revealItems.forEach((item) => item.classList.add('is-visible'));

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderPrayerCard(prayer) {
  const localizedPrayer = {
    ...prayer,
    title: localizePrayerField(prayer.title),
    category: localizePrayerField(prayer.category),
    scheduledFor: localizePrayerField(prayer.scheduledFor),
    content: localizePrayerField(prayer.content),
  };
  const shareText = encodeURIComponent(`${localizedPrayer.title} - ${localizedPrayer.scheduledFor}\n\n${localizedPrayer.content}`);
  const shareUrl = encodeURIComponent(window.location.origin + window.location.pathname + '#prayers');

  return `
    <article class="prayer-card reveal is-visible">
      <div class="prayer-card__top">
        <span class="info-card__label">${escapeHtml(localizedPrayer.category)}</span>
        <strong>${escapeHtml(localizedPrayer.scheduledFor)}</strong>
      </div>
      <h3>${escapeHtml(localizedPrayer.title)}</h3>
      <p>${escapeHtml(localizedPrayer.content)}</p>
      <div class="share-actions">
        <button class="share-button" type="button" data-share-native="${escapeHtml(localizedPrayer.title)}" data-share-text="${escapeHtml(localizedPrayer.content)}">${escapeHtml(t('share'))}</button>
        <a class="share-link" href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noreferrer">${escapeHtml(t('shareFacebook'))}</a>
        <a class="share-link" href="https://t.me/share/url?url=${shareUrl}&text=${shareText}" target="_blank" rel="noreferrer">${escapeHtml(t('shareTelegram'))}</a>
        <a class="share-link" href="https://wa.me/?text=${shareText}%20${shareUrl}" target="_blank" rel="noreferrer">${escapeHtml(t('shareWhatsApp'))}</a>
        <a class="share-link" href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noreferrer">X</a>
      </div>
    </article>
  `;
}

function renderEventCard(eventItem) {
  return `
    <article class="prayer-card reveal is-visible">
      <div class="prayer-card__top">
        <span class="info-card__label">${escapeHtml(eventItem.category)}</span>
        <strong>${escapeHtml(eventItem.eventDate)} ${escapeHtml(eventItem.eventStartTime)}${eventItem.eventEndTime ? ` - ${escapeHtml(eventItem.eventEndTime)}` : ''}</strong>
      </div>
      <h3>${escapeHtml(eventItem.title)}</h3>
      <p>${escapeHtml(eventItem.details)}</p>
      ${eventItem.location ? `<p><strong>${escapeHtml(t('eventLocationLabel'))}:</strong> ${escapeHtml(eventItem.location)}</p>` : ''}
      <div class="share-actions">
        ${eventItem.documentUrl ? `<a class="share-link" href="${escapeHtml(eventItem.documentUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t('eventOpenDocument'))}</a>` : ''}
        ${eventItem.externalLink ? `<a class="share-link" href="${escapeHtml(eventItem.externalLink)}" target="_blank" rel="noreferrer">${escapeHtml(t('eventOpenLink'))}</a>` : ''}
      </div>
    </article>
  `;
}

async function loadPrayers() {
  if (!prayerList || !prayerEmpty) {
    return;
  }

  try {
    const response = await fetch('/api/public/prayers');
    if (!response.ok) {
      throw new Error(t('loadPrayersFailed'));
    }

    const data = await response.json();
    const prayers = Array.isArray(data.prayers) ? data.prayers : [];

    prayerList.innerHTML = prayers.map(renderPrayerCard).join('');
    prayerEmpty.hidden = prayers.length > 0;

    if (statTotalMembers) {
      statTotalMembers.textContent = String(data.stats?.totalMembers ?? 0);
    }

    if (statApprovedMembers) {
      statApprovedMembers.textContent = String(data.stats?.approvedMembers ?? 0);
    }

    if (statPendingMembers) {
      statPendingMembers.textContent = String(data.stats?.pendingMembers ?? 0);
    }

    prayerList.querySelectorAll('[data-share-native]').forEach((button) => {
      button.addEventListener('click', async () => {
        await sharePrayer(button);
      });
    });
  } catch (error) {
    prayerEmpty.hidden = false;
    prayerEmpty.textContent = error instanceof Error ? error.message : t('loadPrayersFailed');
  }
}

async function loadEvents() {
  if (!eventList || !eventEmpty) {
    return;
  }

  try {
    const response = await fetch('/api/public/events');
    if (!response.ok) {
      throw new Error('Unable to load events.');
    }

    const events = await response.json();
    eventList.innerHTML = events.map(renderEventCard).join('');
    eventEmpty.hidden = events.length > 0;
  } catch {
    eventEmpty.hidden = false;
    eventEmpty.textContent = t('eventsEmpty');
  }
}

async function trackVisit() {
  const storageKey = `visit-tracked:${window.location.pathname}`;
  if (sessionStorage.getItem(storageKey)) {
    return;
  }

  try {
    await fetch('/api/public/visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer,
      }),
    });
    sessionStorage.setItem(storageKey, '1');
  } catch {
    return;
  }
}

if (communityForm && communityFeedback) {
  communityForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(communityForm);
    const payload = Object.fromEntries(data.entries());

    communityFeedback.textContent = t('registrationSubmitting');

    try {
      const response = await fetch('/api/public/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Registration failed.');
      }

      communityFeedback.textContent = t('registrationSuccess');
      communityForm.reset();
      loadPrayers();
    } catch (error) {
      communityFeedback.textContent = error instanceof Error ? error.message : t('registrationFailed');
    }
  });
}

if (languageSelect) {
  const storedLanguage = localStorage.getItem('site-language');
  if (storedLanguage && translations[storedLanguage]) {
    currentLanguage = storedLanguage;
  }
  languageSelect.value = currentLanguage;
  languageSelect.addEventListener('change', () => {
    currentLanguage = languageSelect.value;
    localStorage.setItem('site-language', currentLanguage);
    applyTranslations();
    loadPrayers();
    loadEvents();
  });
}

applyTranslations();

trackVisit();
loadPrayers();
loadEvents();