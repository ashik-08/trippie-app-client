import Container from "../Shared/Container/Container";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactSection = () => {
  return (
    // <!-- ====== Contact Start ====== -->
    <section className="relative py-20 md:py-[120px]">
      <div className="absolute left-0 top-0 -z-[1] h-full w-full dark:bg-dark"></div>
      <div className="absolute left-0 top-0 -z-[1] h-1/2 w-full bg-[#E9F9FF] dark:bg-dark-700 lg:h-[45%] xl:h-1/2"></div>
      <Container>
        <div className="-mx-2 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="ud-contact-content-wrapper">
              <div className="ud-contact-title mb-12 lg:mb-[150px]">
                <span className="mb-6 block text-base font-medium text-dark dark:text-white">
                  CONTACT US
                </span>
                <h2 className="max-w-[300px] text-[35px] font-semibold leading-[1.14] text-dark dark:text-white">
                  Let&apos;s talk about your problem.
                </h2>
              </div>
              <ContactInfo />
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
    // <!-- ====== Contact End ====== -->
  );
};

export default ContactSection;
