import LegalPage from "@/app/components/legal/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Information"
      title="Terms and Conditions"
      intro="These terms describe the conditions for using the Cyber Torque website and the information presented across our vehicle collection."
      sections={[
        { title: "Website use", body: "You may use this website for personal, non-commercial browsing and enquiries. Please do not misuse the website, interfere with its operation, or access it using unauthorized methods." },
        { title: "Vehicle information", body: "Vehicle specifications, availability, images, and pricing are provided for guidance and may change without notice. Final details are confirmed directly with Cyber Torque." },
        { title: "Enquiries", body: "Submitting an enquiry does not create a purchase agreement. Any sale or service is subject to separate written terms agreed with Cyber Torque." },
      ]}
    />
  );
}
