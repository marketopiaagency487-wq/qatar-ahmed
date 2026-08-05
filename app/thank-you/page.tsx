import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "تم استلام تسجيلك — علم الروم",
  robots: { index: false, follow: false },
};

const PHONE_INTL = "+201011240910";
const PHONE_DISPLAY = "01011240910";
const WA_NUMBER = "201011240910";
const WA_MSG = "مرحباً، سجّلت للتو في قائمة علم الروم وأرغب في مزيد من التفاصيل";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

export default function ThankYou() {
  return (
    <main className="thanks">
      {/* ─── Google Ads: Contact / Form conversion (page-view) ─── */}
      <Script id="gads-form-conversion" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', {
            'send_to': 'AW-18355644870/0EADCMjN2twcEMbT07BE',
            'value': 1.0,
            'currency': 'EGP'
          });
        `}
      </Script>
      <div className="thanks-card">
        <div className="thanks-icon">✓</div>
        <h1>تم تسجيلك في القائمة المبكرة</h1>
        <p>
          شكراً لاهتمامك بمشروع علم الروم. فور إعلان الديار القطرية عن الأسعار
          وأنظمة السداد، فريقنا هيتواصل معك مباشرة — إنت دلوقتي من أوائل من سيعرفون.
        </p>
        <p style={{ fontSize: 14, opacity: 0.75 }}>
          محتاج إجابة أسرع؟ كلمنا واتساب أو اتصل على {PHONE_DISPLAY}
        </p>
        <div className="hero-ctas">
          <a className="btn-gold" href={WA_URL} target="_blank" rel="noopener">كمّل على واتساب</a>
          <a className="btn-line" href={`tel:${PHONE_INTL}`}>اتصل بنا</a>
        </div>
        <p style={{ marginTop: 28, fontSize: 13 }}>
          <a href="/" style={{ color: "var(--turq)", textDecoration: "underline" }}>← الرجوع للصفحة الرئيسية</a>
        </p>
      </div>
    </main>
  );
}
