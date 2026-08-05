"use client";

import { useState, useEffect, useRef } from "react";

/* ─── CONFIG ─── */
const PHONE = "01011240910";
const PHONE_DISPLAY = "01011240910";
const PHONE_INTL = "+201011240910";
const WA_NUMBER = "201011240910";
const WA_MSG = "مرحباً، أرغب في التسجيل المبكر لمشروع علم الروم - الديار القطرية";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;
const WEB3_KEY = "2d52cc05-d3fb-4be4-a174-679ad841c562";

/* ─── GOOGLE ADS TRACKING ─── */
const GADS_ID = "AW-18355644870";
const CONV_FORM = `${GADS_ID}/0EADCMjN2twcEMbT07BE`;
const CONV_WHATSAPP = `${GADS_ID}/-D_aCMvN2twcEMbT07BE`;
const CONV_CALL = `${GADS_ID}/M3vZCM7N2twcEMbT07BE`;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function fireConversion(sendTo: string) {
  try {
    window.gtag?.("event", "conversion", {
      send_to: sendTo,
      value: 1.0,
      currency: "EGP",
    });
  } catch {
    /* no-op */
  }
}

/* تحويل الفورم بيتسجل على صفحة /thank-you (page-view conversion)
   عشان ميتحسبش مرتين — الدالة دي متسابة للاستخدامات المستقبلية فقط */
function trackFormLead() {
  // intentionally empty — see app/thank-you/page.tsx
}
function trackWhatsApp() {
  fireConversion(CONV_WHATSAPP);
}
function trackCall() {
  fireConversion(CONV_CALL);
}

const NAV_LINKS = [
  { label: "عن المشروع", href: "#facts" },
  { label: "الماستر بلان", href: "#masterplan" },
  { label: "الوحدات والأسعار", href: "#units" },
  { label: "المطور", href: "#developer" },
  { label: "مقارنة برأس الحكمة", href: "#compare" },
  { label: "الموقع", href: "#location" },
  { label: "الأسئلة الشائعة", href: "#faq" },
  { label: "سجّل اهتمامك", href: "#register" },
];

const MASTERPLAN_ITEMS = [
  { n: "01", label: "ملعب جولف 18 حفرة" },
  { n: "02", label: "مراكز مدينة نابضة بالحياة" },
  { n: "03", label: "لاجون مفتوح على البحر وبرومناد" },
  { n: "04", label: "البوليفارد التجاري" },
  { n: "05", label: "مارينا دولية ومحلية" },
  { n: "06", label: "شاطئ وممشى بطول 7 كم" },
  { n: "07", label: "لاجونات صالحة للسباحة" },
  { n: "08", label: "المنطقة الحرة (Free Zone)" },
  { n: "09", label: "نادي البولو والفروسية" },
  { n: "10", label: "مركز الفعاليات" },
  { n: "11", label: "مركز المعارض والمؤتمرات" },
];

const UNITS = [
  {
    img: "/images/lagoon.jpg",
    title: "شاليهات وشقق اللاجون",
    desc: "وحدات مطلة على لاجونات صالحة للسباحة داخل مجتمعات سكنية هادئة.",
    price: "تبدأ من 15,000,000 جنيه",
    indicative: true,
  },
  {
    img: "/images/beachfront.jpg",
    title: "وحدات البيتش فرونت",
    desc: "على الشريط الشاطئي مباشرة بطول 7.2 كم على البحر المتوسط.",
    price: "سجّل ليصلك سعر هذه الفئة أولاً",
    indicative: false,
  },
  {
    img: "/images/marina.jpg",
    title: "وحدات المارينا",
    desc: "قلب المدينة الاجتماعي — مارينا دولية 370 مرسى بمطاعم وريتيل وبرومناد.",
    price: "سجّل ليصلك سعر هذه الفئة أولاً",
    indicative: false,
  },
  {
    img: "/images/golf.jpg",
    title: "فلل وتاون الجولف",
    desc: "إطلالات مفتوحة على ملعب جولف 18 حفرة بمساحة 980 ألف م².",
    price: "سجّل ليصلك سعر هذه الفئة أولاً",
    indicative: false,
  },
];

const FAQS = [
  { q: "أين يقع مشروع علم الروم بالظبط؟", a: "تقع منطقة علم الروم شرق مدينة مرسى مطروح مباشرة على ساحل البحر المتوسط، وسُميت بهذا الاسم نسبة إلى حصن روماني قديم كان قائماً في المنطقة." },
  { q: "من هي الشركة المطورة لمشروع علم الروم؟", a: "المطور هو شركة الديار القطرية، الذراع العقارية لجهاز قطر للاستثمار (الصندوق السيادي القطري)، ولها مشروعات كبرى في أكثر من 20 دولة حول العالم." },
  { q: "كم أسعار الوحدات في علم الروم؟", a: "الأسعار الاسترشادية المتداولة قبل الإطلاق تبدأ من نحو 15 مليون جنيه، بينما لم تصدر بعد قوائم الأسعار النهائية وأنظمة السداد الرسمية من المطور. سجّل اهتمامك لتصلك القوائم الرسمية فور صدورها." },
  { q: "متى تبدأ المرحلة الأولى من المشروع؟", a: "أعلنت الديار القطرية أن أعمال المرحلة الأولى من مشروع علم الروم تبدأ خلال عام 2026، على أن يتم تطوير المشروع على مراحل متتالية." },
  { q: "ما حجم الاستثمارات ومساحة المشروع؟", a: "تبلغ الاستثمارات المعلنة نحو 29.7 مليار دولار على مساحة حوالي 5000 فدان، لتطوير مدينة ساحلية متكاملة تشمل مكونات سكنية وفندقية وسياحية وخدمية." },
  { q: "ما الفرق بين علم الروم ورأس الحكمة؟", a: "كلاهما مشروع مدينة ساحلية متكاملة باستثمارات خليجية ضخمة على الساحل الشمالي الغربي، لكن رأس الحكمة في مرحلة أسبق من البيع والتنفيذ، بينما علم الروم في مرحلة ما قبل الإطلاق - مما قد يمنح المسجّلين مبكراً أفضلية في الأسعار الافتتاحية." },
  { q: "كيف أحجز أو أسجل اهتمامي في علم الروم؟", a: "الحجز الرسمي لم يُفتح بعد. يمكنك تسجيل بياناتك في النموذج بالصفحة وسيتواصل معك فريقنا فور الإعلان عن الأسعار وفتح باب الحجز، دون أي التزام من جانبك." },
];

/* Icons */
const PhoneIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const WaIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.83 9.83 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 7 9.9 9.9 0 0 1-9.9 9.87zm8.42-18.29A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.87 11.87 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.4z"/></svg>);
const MenuIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>);
const ChevronDown = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>);

/* Reusable form fields */
function LeadFields() {
  return (
    <>
      <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <div className="field">
        <label>الاسم *</label>
        <input type="text" name="name" required placeholder="اسمك الكامل" />
      </div>
      <div className="field">
        <label>رقم الموبايل *</label>
        <input type="tel" name="phone" required placeholder="01xxxxxxxxx" dir="ltr" style={{ textAlign: "end" }} />
      </div>
      <div className="field">
        <label>رقم آخر للتواصل (اختياري)</label>
        <input type="tel" name="phone2" placeholder="اختياري" dir="ltr" style={{ textAlign: "end" }} />
      </div>
      <div className="field">
        <label>اهتمامك الأساسي</label>
        <select name="interest" defaultValue="غير محدد">
          <option>غير محدد</option>
          <option>وحدة سكنية / شاليه</option>
          <option>فيلا</option>
          <option>استثمار</option>
          <option>وحدة فندقية</option>
        </select>
      </div>
    </>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "error">("idle");
  const [popupStatus, setPopupStatus] = useState<"idle" | "sending" | "error">("idle");
  const [showPopup, setShowPopup] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const popupFormRef = useRef<HTMLFormElement>(null);
  const popupShownRef = useRef(false);

  useEffect(() => {
    const els = document.querySelectorAll(".animate-in");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    try { if (!localStorage.getItem("cookie_ok")) setShowCookie(true); } catch { setShowCookie(true); }
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (popupShownRef.current) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = (window.scrollY || doc.scrollTop) / (doc.scrollHeight - window.innerHeight);
      if (pct >= 0.55) openPopup();
    };
    const timer = setTimeout(() => openPopup(), 16000);
    window.addEventListener("scroll", onScroll, { passive: true });
    function openPopup() {
      if (popupShownRef.current) return;
      popupShownRef.current = true;
      setShowPopup(true);
      document.body.classList.add("popup-open");
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    }
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  function closePopup() { setShowPopup(false); document.body.classList.remove("popup-open"); }

  async function submitForm(
    ref: React.RefObject<HTMLFormElement | null>,
    setStatus: (s: "idle" | "sending" | "error") => void,
    source: string
  ) {
    if (!ref.current || !ref.current.reportValidity()) return;
    setStatus("sending");
    const fd = new FormData(ref.current);
    const payload: Record<string, string> = { access_key: WEB3_KEY, subject: `تسجيل مبكر - علم الروم (${source})`, from_name: "Alam El Roum Landing" };
    fd.forEach((v, k) => (payload[k] = v.toString()));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        trackFormLead();
        window.location.href = "/thank-you";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <a href="#hero" className="brand">
            <span className="brand-name">علم الروم</span>
            <span className="brand-sub">QATARI DIAR · ALAM EL ROUM</span>
          </a>
          <nav className="nav" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((l) => (<a key={l.href} href={l.href}>{l.label}</a>))}
          </nav>
          <a className="header-cta" href={`tel:${PHONE_INTL}`} onClick={trackCall}><PhoneIcon /> {PHONE_DISPLAY}</a>
          <button className="menu-btn" aria-label="القائمة" onClick={() => setMobileNav(true)}><MenuIcon /></button>
        </div>
      </header>
      {mobileNav && (
        <div className="mobile-nav">
          <button className="mobile-close" aria-label="إغلاق" onClick={() => setMobileNav(false)}>×</button>
          {NAV_LINKS.map((l) => (<a key={l.href} href={l.href} onClick={() => setMobileNav(false)}>{l.label}</a>))}
        </div>
      )}

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="chart-lines" aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 860 }}>
          <p className="hero-coords">31°22′N · 27°24′E — EAST OF MARSA MATRUH</p>
          <h1 className="hero-title">علم الروم — <em>المدينة القادمة</em> على المتوسط</h1>
          <p className="hero-sub">
            مشروع علم الروم من الديار القطرية شرق مرسى مطروح: مدينة ساحلية متكاملة على 5000 فدان
            باستثمارات 29.7 مليار دولار — سجّل مبكراً واحجز مكانك قبل فتح باب الحجز الرسمي.
          </p>
          <div className="hero-status">
            <span className="gold">المرحلة الأولى · 2026</span>
            <span className="gold">الأسعار تبدأ من 15 مليون جنيه*</span>
            <span>التسجيل المبكر متاح الآن</span>
          </div>
          <p className="hero-indicative">* أسعار استرشادية متداولة لحين الإعلان الرسمي من المطور</p>
          <div className="hero-ctas">
            <a className="btn-gold" href="#register">سجّل اهتمامك مجاناً</a>
            <a className="btn-line" href={WA_URL} target="_blank" rel="noopener" onClick={trackWhatsApp}>اسأل على واتساب</a>
          </div>
        </div>
        <div className="hero-waves" aria-hidden="true">
          <svg viewBox="0 0 1440 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64 C240,110 480,20 720,52 C960,84 1200,30 1440,60 L1440,110 L0,110 Z" fill="#efe9dc" opacity="0.35"/>
            <path d="M0,80 C260,40 520,104 780,72 C1040,40 1260,90 1440,70 L1440,110 L0,110 Z" fill="#efe9dc"/>
          </svg>
        </div>
      </section>

      {/* FACTS PANEL — المعلن vs غير المعلن */}
      <section className="section" id="facts" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="facts">
            <div className="facts-col known">
              <h3>✓ المُعلن رسمياً</h3>
              <ul>
                <li>المطور: الديار القطرية — الذراع العقارية لجهاز قطر للاستثمار</li>
                <li>الموقع: منطقة علم الروم شرق مرسى مطروح على البحر المتوسط</li>
                <li>المساحة: نحو 5000 فدان لمدينة ساحلية متكاملة</li>
                <li>الاستثمارات: نحو 29.7 مليار دولار</li>
                <li>بدء المرحلة الأولى: خلال 2026</li>
                <li>المكونات: سكني · فندقي · سياحي · خدمي على مدار العام</li>
              </ul>
            </div>
            <div className="facts-col pending">
              <h3>◌ لم يُعلن رسمياً بعد</h3>
              <ul>
                <li>قوائم الأسعار النهائية وأنظمة السداد التفصيلية (المتداول: تبدأ من 15 مليون جنيه استرشادياً)</li>
                <li>مساحات الوحدات التفصيلية لكل فئة</li>
                <li>أسماء العلامات الفندقية المشغّلة</li>
                <li>موعد فتح باب الحجز الرسمي</li>
              </ul>
            </div>
            <div className="facts-note">
              نلتزم بعرض المعلومات المعلنة فقط من مصادر رسمية — وكل ما لم يُعلن، سيصلك فور صدوره إذا سجّلت اهتمامك.
            </div>
          </div>

          <div className="stats animate-in">
            <div className="stat"><b>5000</b><small>فدان — مساحة المشروع</small></div>
            <div className="stat"><b>$29.7B</b><small>استثمارات معلنة</small></div>
            <div className="stat"><b>7.2 كم</b><small>شاطئ على المتوسط</small></div>
            <div className="stat"><b>22 كم</b><small>لاجون مفتوح على البحر</small></div>
            <div className="stat"><b>370</b><small>مرسى — مارينا دولية</small></div>
            <div className="stat"><b>2026</b><small>بدء المرحلة الأولى</small></div>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="section history" id="history">
        <div className="section-inner">
          <div className="animate-in">
            <span className="eyebrow">المكان قبل المشروع</span>
            <h2 className="section-title">لماذا اسمها &quot;علم الروم&quot;؟</h2>
            <p className="section-desc">
              قبل أن تكون مشروعاً بمليارات الدولارات، كانت علم الروم علامة على خريطة التاريخ.
              المنطقة الواقعة شرق مرسى مطروح أخذت اسمها من حصن روماني قديم أحاط بمدينة
              &quot;بارتيليوم&quot; — الاسم الروماني لمرسى مطروح — وظلت لعقود وجهة هادئة لعشاق
              الصيد والطبيعة البكر بشواطئها الفيروزية.
            </p>
          </div>
          <div className="timeline animate-in" style={{ marginTop: 44 }}>
            <div className="t-item">
              <b>العصر الروماني</b>
              <p>حصن روماني يحرس الساحل الغربي لمصر ويمنح المنطقة اسمها الذي بقي حتى اليوم.</p>
            </div>
            <div className="t-item">
              <b>الحرب العالمية الثانية</b>
              <p>تل سملا الأثري بالمنطقة يلعب دور مركز لوجستي مهم خلال معارك الصحراء الغربية.</p>
            </div>
            <div className="t-item">
              <b>2025 — الاتفاق المصري القطري</b>
              <p>إعلان اتفاق تطوير المنطقة بين الحكومة المصرية والديار القطرية باستثمارات 29.7 مليار دولار.</p>
            </div>
            <div className="t-item">
              <b>2026 — المرحلة الأولى</b>
              <p>بدء أعمال التطوير الفعلية لتحويل علم الروم إلى وجهة ساحلية عالمية تعمل على مدار العام.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MASTERPLAN */}
      <section className="section" id="masterplan" style={{ background: "var(--white)" }}>
        <div className="section-inner">
          <div className="animate-in">
            <span className="eyebrow">A CITY SHAPED BY WATER</span>
            <h2 className="section-title">الماستر بلان — مدينة تشكّلها المياه</h2>
            <p className="section-desc">
              يمتد المخطط العام من البحر المتوسط إلى الداخل: أحياء سكنية، وجهات فندقية،
              مراكز تجارية ومساحات عامة — كلها متصلة بشبكة موحدة من اللاجونات والممرات والحركة الذكية.
            </p>
          </div>
          <div className="mp-wrap animate-in">
            <img src="/images/masterplan.jpg" alt="الماستر بلان لمشروع علم الروم بأرقام المكونات الرئيسية" loading="lazy" />
          </div>
          <div className="mp-legend animate-in">
            {MASTERPLAN_ITEMS.map((m) => (
              <div key={m.n} className="mp-item"><b>{m.n}</b><span>{m.label}</span></div>
            ))}
          </div>
          <div className="mp-gallery animate-in">
            <figure><img src="/images/marina-tower.jpg" alt="واجهة المارينا والبرج الأيقوني في علم الروم" loading="lazy" /><figcaption>المارينا — القلب الاجتماعي للمدينة</figcaption></figure>
            <figure><img src="/images/boulevard.jpg" alt="البوليفارد التجاري والتنقل الذكي داخل علم الروم" loading="lazy" /><figcaption>البوليفارد التجاري والتنقل الذكي</figcaption></figure>
            <figure><img src="/images/town.jpg" alt="مراكز المدينة والساحات العامة في علم الروم" loading="lazy" /><figcaption>مراكز المدينة والساحات العامة</figcaption></figure>
            <figure><img src="/images/events.jpg" alt="مركز الفعاليات الأيقوني في علم الروم" loading="lazy" /><figcaption>مركز الفعاليات الأيقوني</figcaption></figure>
            <figure><img src="/images/expo.jpg" alt="مركز المعارض والمؤتمرات الدولي في علم الروم" loading="lazy" /><figcaption>مركز المعارض والمؤتمرات</figcaption></figure>
            <figure><img src="/images/polo.jpg" alt="نادي البولو والفروسية في علم الروم" loading="lazy" /><figcaption>نادي البولو والفروسية</figcaption></figure>
          </div>
        </div>
      </section>

      {/* UNITS & PRICES */}
      <section className="section" id="units">
        <div className="section-inner">
          <div className="animate-in center">
            <span className="eyebrow">الوحدات والأسعار</span>
            <h2 className="section-title">الأسعار تبدأ من 15 مليون جنيه</h2>
            <p className="section-desc" style={{ margin: "0 auto" }}>
              أسعار استرشادية متداولة قبل الإطلاق الرسمي — أنظمة السداد والقوائم النهائية
              تصلك أولاً بأول عند تسجيل اهتمامك.
            </p>
          </div>
          <div className="units-grid animate-in">
            {UNITS.map((u) => (
              <div key={u.title} className="unit-card">
                <div className="unit-img"><img src={u.img} alt={`${u.title} في مشروع علم الروم`} loading="lazy" /></div>
                <div className="unit-body">
                  <h3>{u.title}</h3>
                  <p>{u.desc}</p>
                  <div className={`unit-price ${u.indicative ? "main" : ""}`}>{u.price}{u.indicative && <small> (استرشادي)</small>}</div>
                  <div className="unit-ctas">
                    <a className="unit-btn gold" href="#register">اطلب سعر هذه الفئة</a>
                    <a className="unit-btn wa" href={WA_URL} target="_blank" rel="noopener" onClick={trackWhatsApp}>واتساب</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="section-desc animate-in" style={{ marginTop: 18, fontSize: 13.5, color: "var(--muted)" }}>
            * جميع الأسعار الواردة استرشادية وقابلة للتغيير، والمرجع النهائي هو قوائم الأسعار الرسمية للمطور عند الإطلاق.
          </p>
        </div>
      </section>

      {/* DEVELOPER */}
      <section className="section" id="developer">
        <div className="section-inner">
          <div className="animate-in">
            <span className="eyebrow">المطور</span>
            <h2 className="section-title">الديار القطرية — تطوير بغطاء سيادي</h2>
            <p className="section-desc">
              الديار القطرية ليست مطوراً تقليدياً — هي الذراع العقارية لجهاز قطر للاستثمار،
              الصندوق السيادي لدولة قطر، بمشروعات كبرى تمتد في أكثر من 20 دولة.
            </p>
          </div>
          <div className="dev-grid">
            <div className="dev-card animate-in">
              <span className="dev-badge">QATARI DIAR · EST. 2005</span>
              <h3 style={{ color: "var(--sea)", fontSize: 22, margin: "10px 0 0" }}>ماذا يعني ذلك للمشتري؟</h3>
              <ul>
                <li>ملاءة مالية سيادية تقلل مخاطر التعثر أو التأخير المزمن في التنفيذ</li>
                <li>خبرة في المدن المتكاملة والمشروعات الفندقية الفاخرة عالمياً</li>
                <li>قدرة تفاوضية عالية لجذب علامات فندقية عالمية للمشروع</li>
                <li>شراكة مباشرة مع الحكومة المصرية في تطوير المنطقة</li>
              </ul>
            </div>
            <div className="animate-in">
              <p className="section-desc" style={{ fontSize: 16 }}>
                دخول مطور بحجم الديار القطرية إلى الساحل الشمالي الغربي — بعد صفقة رأس الحكمة —
                يؤكد تحول المنطقة من مصايف موسمية إلى وجهات عمرانية تعمل على مدار العام.
                وتاريخياً، المراحل الافتتاحية للمشروعات السيادية الكبرى كانت الأفضل سعراً
                لمن سجّل ودخل مبكراً.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="section" id="compare" style={{ background: "var(--white)" }}>
        <div className="section-inner">
          <div className="animate-in">
            <span className="eyebrow">قراءة استثمارية</span>
            <h2 className="section-title">علم الروم أم رأس الحكمة؟</h2>
            <p className="section-desc">
              المقارنة الأكثر بحثاً الآن — وهما فرصتان مختلفتان في المرحلة والطبيعة، لا مشروعان متطابقان.
            </p>
          </div>
          <div className="compare animate-in">
            <table>
              <thead>
                <tr>
                  <th>وجه المقارنة</th>
                  <th>علم الروم</th>
                  <th>رأس الحكمة</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>المطور الرئيسي</td><td>الديار القطرية (قطر)</td><td>مدن القابضة وشركاء (الإمارات)</td></tr>
                <tr><td>الموقع</td><td>شرق مرسى مطروح مباشرة</td><td>الكيلو 200 تقريباً غرب الإسكندرية</td></tr>
                <tr><td>المرحلة الحالية</td><td>ما قبل الإطلاق — الأسعار لم تُعلن</td><td>بيع فعلي في عدة مشروعات</td></tr>
                <tr><td>الفرصة</td><td>دخول مبكر محتمل بأسعار افتتاحية</td><td>مشروعات ملموسة وخيارات متاحة الآن</td></tr>
                <tr><td>القرب من مدينة قائمة</td><td>ملاصقة لمرسى مطروح وخدماتها ومطارها</td><td>تعتمد على بنية تحتية جديدة بالكامل</td></tr>
              </tbody>
            </table>
          </div>
          <p className="section-desc animate-in" style={{ marginTop: 22, fontSize: 14.5 }}>
            الخلاصة: إن كنت تبحث عن وحدة تستلمها قريباً فرأس الحكمة أسبق — أما إن كانت أولويتك
            الدخول المبكر في مشروع سيادي قبل إعلان أسعاره، فعلم الروم هو النافذة المفتوحة الآن.
          </p>
        </div>
      </section>

      {/* LOCATION */}
      <section className="section" id="location">
        <div className="section-inner">
          <div className="animate-in">
            <span className="eyebrow">الموقع</span>
            <h2 className="section-title">شرق مرسى مطروح — على المتوسط مباشرة</h2>
            <p className="section-desc">
              موقع علم الروم يجمع ميزتين نادراً ما تجتمعان في الساحل الغربي: شواطئ بكر بمياه فيروزية،
              وقرب مباشر من مدينة قائمة بخدماتها ومطارها.
            </p>
          </div>
          <div className="loc-img animate-in">
            <img src="/images/location-map.jpg" alt="خريطة موقع علم الروم شرق مرسى مطروح على البحر المتوسط وأزمنة الوصول" loading="lazy" />
          </div>
          <div className="map-wrap animate-in">
            <iframe
              title="خريطة موقع علم الروم شرق مرسى مطروح"
              src="https://maps.google.com/maps?q=31.36,27.40&z=10&hl=ar&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="loc-points animate-in">
            <div className="loc-point"><b>مطار مرسى مطروح</b>على بُعد دقائق — ربط جوي مباشر بالقاهرة ووجهات أخرى</div>
            <div className="loc-point"><b>مدينة مرسى مطروح</b>خدمات ومستشفيات وأسواق قائمة بالفعل — لا انتظار لبنية تحتية</div>
            <div className="loc-point"><b>الطريق الساحلي الدولي</b>اتصال مباشر بمحور الساحل الشمالي حتى الإسكندرية والعلمين</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ background: "var(--white)" }}>
        <div className="section-inner">
          <div className="animate-in center">
            <span className="eyebrow">أسئلة يبحث عنها الجميع</span>
            <h2 className="section-title">الأسئلة الشائعة عن علم الروم</h2>
          </div>
          <div className="faq-list animate-in">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  {f.q} <ChevronDown />
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER */}
      <section className="section lead" id="register">
        <div className="section-inner">
          <div className="lead-grid">
            <div className="lead-copy animate-in">
              <span className="eyebrow">التسجيل المبكر</span>
              <h2 className="section-title">كن أول من يعرف الأسعار</h2>
              <p>
                باب الحجز الرسمي لم يُفتح بعد — وهذه بالتحديد ميزتك. سجّل بياناتك الآن،
                وفور إعلان الأسعار وأنظمة السداد سيتواصل معك فريقنا مباشرة، بلا أي التزام.
              </p>
              <ul className="lead-perks">
                <li>الأسعار الرسمية وأنظمة السداد فور الإعلان</li>
                <li>تنبيه مبكر بموعد فتح باب الحجز</li>
                <li>ملخص لأي تحديثات رسمية عن الماستر بلان والفنادق</li>
                <li>استشارة مجانية للمقارنة مع بدائل الساحل الأخرى</li>
              </ul>
            </div>
            <form
              ref={formRef}
              className="form-card animate-in"
              onSubmit={(e) => { e.preventDefault(); submitForm(formRef, setFormStatus, "الفورم الرئيسي"); }}
            >
              <h3>سجّل اهتمامك — مجاناً</h3>
              <p className="form-note">4 حقول فقط · فريقنا يتواصل معك فور توفر الأسعار</p>
              <LeadFields />
              <button type="submit" className="form-submit" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "جارٍ الإرسال..." : "سجّل اهتمامي الآن"}
              </button>
              {formStatus === "error" && <p className="form-error">حدث خطأ — حاول مرة أخرى أو تواصل واتساب</p>}
              <p className="form-privacy">بياناتك محمية ولن تُشارك مع أي طرف ثالث</p>
            </form>
          </div>
        </div>
      </section>

      {/* DISCLOSURE */}
      <section className="section disclosure">
        <div className="section-inner">
          <p>
            <b>إفصاح:</b> هذه منصة تسويق ومعلومات عقارية مستقلة، ولسنا الموقع الرسمي لشركة الديار القطرية
            ولا نمثلها. جميع المعلومات الواردة مجمّعة من تصريحات وأخبار منشورة علناً، وقابلة للتغيير وفق
            الإعلانات الرسمية للمطور. جميع الأسعار الواردة بالصفحة أسعار استرشادية متداولة قبل الإطلاق،
            والمرجع النهائي هو قوائم الأسعار الرسمية للمطور عند صدورها.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="brand-name">علم الروم · Alam El Roum</span>
        <p style={{ maxWidth: 560, margin: "10px auto" }}>
          مدينة ساحلية متكاملة من الديار القطرية شرق مرسى مطروح — 5000 فدان على البحر المتوسط.
        </p>
        <div className="footer-links">
          <button onClick={() => setShowPrivacy(true)}>سياسة الخصوصية</button>
          <a href={`tel:${PHONE_INTL}`} onClick={trackCall} style={{ color: "var(--turq)" }}>اتصل بنا: {PHONE_DISPLAY}</a>
          <a href={WA_URL} target="_blank" rel="noopener" onClick={trackWhatsApp} style={{ color: "var(--turq)" }}>واتساب</a>
        </div>
        <p>© 2026 · جميع المعلومات وفق ما هو معلن رسمياً — منصة مستقلة غير تابعة للمطور</p>
      </footer>

      {/* FLOATING */}
      <div className="float-wrap">
        <a className="float-btn float-wa" href={WA_URL} target="_blank" rel="noopener" aria-label="تواصل واتساب" onClick={trackWhatsApp}><WaIcon /></a>
        <a className="float-btn float-call" href={`tel:${PHONE_INTL}`} aria-label="اتصل بنا" onClick={trackCall}><PhoneIcon /></a>
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="bottom-bar">
        <a className="bb-call" href={`tel:${PHONE_INTL}`} onClick={trackCall}><PhoneIcon /> اتصال</a>
        <a className="bb-wa" href={WA_URL} target="_blank" rel="noopener" onClick={trackWhatsApp}><WaIcon /> واتساب</a>
        <a className="bb-form" href="#register">سجّل اهتمامك</a>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay" onClick={(e) => e.target === e.currentTarget && closePopup()}>
          <div className="popup" role="dialog" aria-label="التسجيل المبكر">
            <button className="popup-close" aria-label="إغلاق" onClick={closePopup}>×</button>
            <div className="popup-price">الأسعار تبدأ من <b>15,000,000 جنيه</b></div>
            <h2>سجّل قبل فتح باب الحجز الرسمي</h2>
            <p className="form-note">سعر استرشادي قبل الإطلاق — سجّل وخد أفضلية التواصل المبكر بأنظمة السداد فور صدورها</p>
            <form
              ref={popupFormRef}
              onSubmit={(e) => { e.preventDefault(); submitForm(popupFormRef, setPopupStatus, "البوب أب"); }}
            >
              <LeadFields />
              <button type="submit" className="form-submit" disabled={popupStatus === "sending"}>
                {popupStatus === "sending" ? "جارٍ الإرسال..." : "سجّلني في القائمة المبكرة"}
              </button>
              {popupStatus === "error" && <p className="form-error">حدث خطأ — حاول مرة أخرى أو تواصل واتساب</p>}
            </form>
          </div>
        </div>
      )}

      {/* COOKIE */}
      {showCookie && (
        <div className="cookie">
          <span>نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس أداء الصفحة.</span>
          <button onClick={() => { try { localStorage.setItem("cookie_ok", "1"); } catch {} setShowCookie(false); }}>موافق</button>
        </div>
      )}

      {/* PRIVACY MODAL */}
      {showPrivacy && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowPrivacy(false)}>
          <div className="modal" role="dialog" aria-label="سياسة الخصوصية">
            <button className="popup-close" aria-label="إغلاق" onClick={() => setShowPrivacy(false)}>×</button>
            <h2>سياسة الخصوصية</h2>
            <p>نجمع البيانات التي تقدمها طواعية عبر نماذج التسجيل (الاسم ورقم الهاتف واهتمامك) بغرض التواصل معك بخصوص مشروع علم الروم فقط.</p>
            <p>لا نبيع بياناتك ولا نشاركها مع أي طرف ثالث لأغراض تسويقية. تُستخدم أدوات قياس (مثل Google Analytics) لفهم أداء الصفحة بشكل مجمّع دون تحديد هويتك الشخصية.</p>
            <p>يمكنك في أي وقت طلب حذف بياناتك بالتواصل معنا هاتفياً أو عبر واتساب على {PHONE_DISPLAY}.</p>
            <p>هذه منصة مستقلة وليست الموقع الرسمي لشركة الديار القطرية.</p>
          </div>
        </div>
      )}
    </>
  );
}
