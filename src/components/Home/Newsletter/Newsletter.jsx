import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    e.target.reset();
  };

  return (
    <section className="mt-24 md:mt-32 lg:mt-36 xl:mt-40 bg-gray-100 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-dark">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-dark/80">
              Stay updated with the latest travel tips, destination guides and
              exclusive offers. Join our community of travel enthusiasts today!
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex max-w-md gap-x-4"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-dark shadow-sm ring-1 ring-inset ring-primary-base/60 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-primary-base px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Subscribe
              </button>
            </form>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md p-2 ring-1 ring-primary-300 hover:bg-primary-base transition-colors">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-dark"
                />
              </div>
              <dt className="mt-4 font-semibold text-dark/90">
                Weekly articles
              </dt>
              <dd className="mt-2 text-base/7 text-dark/70">
                Get the latest insights and tips on travel destinations,
                planning and more delivered to your inbox every week.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md p-2 ring-1 ring-primary-300 hover:bg-primary-base transition-colors">
                <HandRaisedIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-dark"
                />
              </div>
              <dt className="mt-4 font-semibold text-dark/90">No spam</dt>
              <dd className="mt-2 text-base/7 text-dark/70">
                We respect your privacy. No spam, only valuable travel content
                and updates.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
