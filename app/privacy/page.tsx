import LegalPage from "@/app/components/legal/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Information"
      title="Privacy Policy"
      intro="We respect your privacy and collect only the information needed to respond to enquiries, maintain the website, and improve our services."
      sections={[
        { title: "Information we collect", body: "When you contact us, we may collect details such as your name, email address, phone number, and message so that our team can respond to your request." },
        { title: "How we use it", body: "We use enquiry information to communicate with you, provide requested vehicle details, and maintain our customer records. We do not sell personal information." },
        { title: "Data requests", body: "For questions about your personal information or to request an update, please contact us through the details on our Contact Us page." },
      ]}
    />
  );
}
