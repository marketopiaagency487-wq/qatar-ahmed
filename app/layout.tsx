import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://alamelroum-qataridiar.org";

/* ─── Google Ads ─── */
export const GADS_ID = "AW-18372487007";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "علم الروم الديار القطرية | التفاصيل والتسجيل المبكر",
  description:
    "مشروع علم الروم من الديار القطرية شرق مرسى مطروح - مدينة ساحلية متكاملة على 5000 فدان باستثمارات 29.7 مليار دولار. المرحلة الأولى 2026. الأسعار الاسترشادية تبدأ من 15 مليون جنيه. سجّل اهتمامك لتصلك القوائم الرسمية فور الإعلان.",
  keywords:
    "علم الروم,مشروع علم الروم,الديار القطرية,Alam El Roum,Qatari Diar,علم الروم مرسى مطروح,علم الروم الساحل الشمالي,أسعار علم الروم,رأس علم الروم,علم الروم قطر",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "ULkuo_ZDBVIBGAkH9XJ4SM5PBq14QFcLbc-d7EuHulI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "علم الروم - الديار القطرية | مدينة ساحلية عالمية شرق مرسى مطروح",
    description:
      "5000 فدان - استثمارات 29.7 مليار دولار - المرحلة الأولى 2026. الأسعار الاسترشادية تبدأ من 15 مليون جنيه - سجّل مبكراً لتصلك أنظمة السداد فور صدورها.",
    url: "/",
    siteName: "علم الروم - الديار القطرية",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "علم الروم الديار القطرية | التسجيل المبكر",
    description:
      "مدينة ساحلية متكاملة شرق مرسى مطروح على 5000 فدان. سجّل اهتمامك قبل الإطلاق الرسمي.",
  },
};

/* JSON-LD: FAQ Rich Results — نفس أسئلة السكشن حرفياً */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "أين يقع مشروع علم الروم بالظبط؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تقع منطقة علم الروم شرق مدينة مرسى مطروح مباشرة على ساحل البحر المتوسط، وسُميت بهذا الاسم نسبة إلى حصن روماني قديم كان قائماً في المنطقة.",
      },
    },
    {
      "@type": "Question",
      name: "من هي الشركة المطورة لمشروع علم الروم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "المطور هو شركة الديار القطرية، الذراع العقارية لجهاز قطر للاستثمار (الصندوق السيادي القطري)، ولها مشروعات كبرى في أكثر من 20 دولة حول العالم.",
      },
    },
    {
      "@type": "Question",
      name: "كم أسعار الوحدات في علم الروم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "الأسعار الاسترشادية المتداولة قبل الإطلاق تبدأ من نحو 15 مليون جنيه، بينما لم تصدر بعد قوائم الأسعار النهائية وأنظمة السداد الرسمية من المطور. سجّل اهتمامك لتصلك القوائم الرسمية فور صدورها.",
      },
    },
    {
      "@type": "Question",
      name: "متى تبدأ المرحلة الأولى من المشروع؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "أعلنت الديار القطرية أن أعمال المرحلة الأولى من مشروع علم الروم تبدأ خلال عام 2026، على أن يتم تطوير المشروع على مراحل متتالية.",
      },
    },
    {
      "@type": "Question",
      name: "ما حجم الاستثمارات ومساحة المشروع؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تبلغ الاستثمارات المعلنة نحو 29.7 مليار دولار على مساحة حوالي 5000 فدان، لتطوير مدينة ساحلية متكاملة تشمل مكونات سكنية وفندقية وسياحية وخدمية.",
      },
    },
    {
      "@type": "Question",
      name: "ما الفرق بين علم الروم ورأس الحكمة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "كلاهما مشروع مدينة ساحلية متكاملة باستثمارات خليجية ضخمة على الساحل الشمالي الغربي، لكن رأس الحكمة (تطوير مصر وشركاء إماراتيون) في مرحلة أسبق من البيع والتنفيذ، بينما علم الروم من الديار القطرية في مرحلة ما قبل الإطلاق - مما قد يمنح المسجّلين مبكراً أفضلية في الأسعار الافتتاحية.",
      },
    },
    {
      "@type": "Question",
      name: "كيف أحجز أو أسجل اهتمامي في علم الروم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "الحجز الرسمي لم يُفتح بعد. يمكنك تسجيل بياناتك في النموذج بالصفحة وسيتواصل معك فريقنا فور الإعلان عن الأسعار وفتح باب الحجز، دون أي التزام من جانبك.",
      },
    },
  ],
};

/* JSON-LD: المشروع */
const projectJsonLd = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "علم الروم - Alam El Roum",
  description:
    "مشروع مدينة ساحلية متكاملة من الديار القطرية شرق مرسى مطروح على مساحة 5000 فدان باستثمارات 29.7 مليار دولار.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "علم الروم - شرق مرسى مطروح",
    addressRegion: "محافظة مطروح",
    addressCountry: "EG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.36,
    longitude: 27.4,
  },
  url: SITE_URL,
};

/* JSON-LD: منصة التسويق */
const agentJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "منصة معلومات وتسجيل مبكر - مشروع علم الروم",
  telephone: "+201011240910",
  url: SITE_URL,
  areaServed: "Egypt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agentJsonLd) }}
        />
      </head>
      <body>
        {children}

        {/* ─── Google tag (gtag.js) — Google Ads ─── */}
        <Script
          id="gtag-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
