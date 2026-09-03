import LegalPage from "@/app/components/legal/LegalPage";

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Information"
      title="Cookie Policy"
      intro="Cyber Torque uses cookies and similar technologies to keep the website reliable, understand visits, and improve your experience."
      sections={[
        { title: "Essential cookies", body: "These cookies support core site functions such as navigation, security, and remembering temporary preferences. They cannot be disabled through our site controls." },
        { title: "Analytics", body: "Analytics cookies help us understand which pages are useful and where the experience can be improved. We only use this information in aggregated form." },
        { title: "Your choices", body: "You can manage or remove cookies through your browser settings. Disabling some cookies may affect how parts of the website work." },
      ]}
    />
  );
}
