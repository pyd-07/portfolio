import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import { usePageMeta } from "@/hooks/usePageMeta";

const ContactPage = () => {
  usePageMeta(
    "Contact - Piyush Yadav",
    "Open to backend, automation, and platform engineering roles. Get in touch via email, LinkedIn, or GitHub."
  );

  return (
    <>
      <PageHeader
        kicker="contact"
        title="Let's build something solid."
        intro="Open to backend, automation, and platform engineering roles."
      />
      <Contact showHeader={false} />
    </>
  );
};

export default ContactPage;
