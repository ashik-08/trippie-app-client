import { Helmet } from "react-helmet-async";
import ContactSection from "../../components/Contact/ContactSection";
import Banner from "../../components/Shared/Banner/Banner";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Trippie - Contact</title>
      </Helmet>
      <Banner
        hero="bg-contact"
        title="Get in Touch"
        boldTitle="with us"
        para="We're here to make your travel experiences memorable and hassle-free. Reach out for inquiries, support, or customized travel solutions tailored to your needs."
      />
      <ContactSection />
    </>
  );
};

export default ContactPage;
