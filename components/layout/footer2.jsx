import { Logo, LogoImage, LogoText } from "@/components/logo";

const Footer2 = ({
  logo = {
    src: "/akalaabha_woutbg.png", // أيقونة مؤقتة لعطر
    alt: "Aklil Abha",
    title: "اكليل أبها",
    url: "#",
  },

  menuItems = [
    {
      title: "تسوق",
      links: [
        { text: "عطور نسائية", url: "#" },
        { text: "عطور رجالية", url: "#" },
        { text: "عطور فاخرة", url: "#" },
        { text: "الأكثر مبيعًا", url: "#" },
        { text: "العروض", url: "#" },
      ],
    },
    {
      title: "الشركة",
      links: [
        { text: "من نحن", url: "/privacy" },
        { text: "فريق العمل", url: "#" },
        { text: "المدونة", url: "#" },
        { text: "الوظائف", url: "#" },
        { text: "تواصل معنا", url: "#" },
      ],
    },
    {
      title: "المساعدة",
      links: [
        { text: "الأسئلة الشائعة", url: "#" },
        { text: "خدمة العملاء", url: "#" },
        { text: "طرق الدفع", url: "#" },
        { text: "التوصيل والشحن", url: "#" },
        { text: "سياسة الإرجاع", url: "/PrivacyPage" },
      ],
    },
    {
      title: "تابعنا",
      links: [
        { text: "Instagram", url: "#" },
        { text: "Snapchat", url: "#" },
        { text: "TikTok", url: "#" },
        { text: "X (Twitter)", url: "#" },
      ],
    },
  ],

  copyright = "© 2025 اكليل أبها. جميع الحقوق محفوظة.",

  bottomLinks = [
    { text: "الشروط والأحكام", url: "#" },
    { text: "سياسة الخصوصية", url: "#" },
  ],
}) => {
  return (
    <section className="p-16 bg-black border-t">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start mt-30 ">
                <Logo url={logo.url}>
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-100 w-100 "
                  />
                </Logo>
              </div>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-lg text-white ">
                  {section.title}
                </h3>
                <ul className="text-white space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-neutral-400 font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-12 flex flex-col justify-between gap-4 border-t pt-6 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
