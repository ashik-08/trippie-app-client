import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaCamera, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../api/image-api";
import {
  addTourAgency,
  getTourAgency,
  updateTourAgency,
} from "../../../api/tour-agency-api";
import useAuth from "../../../hooks/useAuth";

const TourAgencyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [initialLogo, setInitialLogo] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    agencyName: "",
    ownerName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    licenseNumber: "",
    website: "",
    description: "",
    socialMedia: "",
  });

  useEffect(() => {
    const fetchTourAgencyData = async () => {
      try {
        const tourAgencyData = await getTourAgency(user?.email);
        if (tourAgencyData) {
          const initialData = {
            id: tourAgencyData._id,
            agencyName: tourAgencyData.agencyName,
            ownerName: tourAgencyData.ownerName,
            email: tourAgencyData.email,
            mobile: tourAgencyData.mobile,
            address: tourAgencyData.address,
            city: tourAgencyData.city,
            licenseNumber: tourAgencyData.licenseNumber,
            website: tourAgencyData.website,
            description: tourAgencyData.description,
            socialMedia: tourAgencyData.socialMedia.join("; "),
          };
          setFormData(initialData);
          setInitialFormData(initialData);
          setLogo(tourAgencyData.logo);
          setInitialLogo(tourAgencyData.logo);
          setIsUpdate(true);
        }
      } catch (error) {
        console.log(error);
        console.log("Tour agency not found, creating new agency profile...");
      }
    };

    if (user?.email) {
      fetchTourAgencyData();
    }
  }, [user?.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleRemoveLogo = () => {
    setLogo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    if (!logo) {
      toast.error("Have to add an agency logo", { id: toastId });
      return;
    }

    // Check if any data has changed
    const isDataChanged =
      JSON.stringify(formData) !== JSON.stringify(initialFormData);
    const isLogoChanged = logo !== initialLogo;

    if (!isDataChanged && !isLogoChanged) {
      toast.error("Please change a field before updating", { id: toastId });
      return;
    }

    // Upload logo to Cloudinary and get its URL
    let logoUrl = logo;
    if (logo && logo !== initialLogo) {
      const formData = new FormData();
      formData.append("file", logo);
      formData.append("upload_preset", "trippie");
      formData.append("folder", "trippie-all-image/tour-agencies");

      try {
        logoUrl = await uploadImage(formData);
      } catch (error) {
        toast.error("Failed to upload logo. Please try again later", {
          id: toastId,
        });
        throw error;
      }
    }

    // Prepare tour agency data to be sent to the server
    const tourAgencyData = {
      ...formData,
      logo: logoUrl,
      socialMedia: formData.socialMedia.split("; "),
      agent: user?.email,
    };

    try {
      if (isUpdate) {
        await updateTourAgency(formData.id, tourAgencyData);
        toast.success("Tour agency profile updated successfully!", {
          id: toastId,
        });
      } else {
        await addTourAgency(tourAgencyData);
        toast.success("Tour agency profile created successfully!", {
          id: toastId,
        });
      }
      navigate("/dashboard/manage-tours");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add tour agency profile", { id: toastId });
    }
  };

  return (
    <>
      <Helmet>
        <title>Trippie - Tour Agency Profile</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">
        Tour Agency Profile
      </h1>
      <div className="bg-white px-5 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 rounded-xl drop-shadow-sm">
        <h2 className="text-center text-outerSpace font-medium text-2xl lg:text-3xl mb-5">
          {isUpdate ? "Update Tour Agency" : "Create Tour Agency"}
        </h2>
        <p className="max-w-5xl mx-auto text-center text-blue-gray-500 md:text-lg">
          Please fill out the form below to create or update your tour agency
          profile. Ensure all fields are filled correctly.
        </p>
        <div className="flex justify-center my-6">
          <div className="relative">
            {logo ? (
              <div className="relative w-24 h-24">
                <img
                  src={
                    typeof logo === "string" ? logo : URL.createObjectURL(logo)
                  }
                  alt="Agency Logo"
                  className="w-full h-full object-cover rounded-full"
                />
                <button
                  type="button"
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  onClick={handleRemoveLogo}
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300">
                <FaCamera className="text-secondary-500 hover:text-secondary-700 transition duration-300 text-3xl" />
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5"
        >
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Agency Name
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="agencyName"
              placeholder="Blue Ocean Tours & Travels"
              value={formData.agencyName}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Owner&apos;s Name
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="ownerName"
              placeholder="Eddie Brock"
              value={formData.ownerName}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">Email</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="email"
              name="email"
              placeholder="blue.ocean@travel.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace text-lg font-medium">Mobile Number</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="tel"
              name="mobile"
              placeholder="01745896541"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Agency Address
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="address"
              placeholder="12/B, 3rd Floor, Ocean View Road"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">City</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="city"
              placeholder="Dhaka"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              License Number
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="licenseNumber"
              placeholder="BDS-75 4785"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Website URL
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="url"
              name="website"
              placeholder="https://blueocean.com"
              value={formData.website}
              onChange={handleInputChange}
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Description of Services
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="description"
              placeholder="Our agency provides the best travel services in the country. We offer a wide range of travel packages for all types of travelers. Contact us for more information."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Social Media Links{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *separate links with a semicolon (;)
              </span>
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="socialMedia"
              placeholder="Facebook: https://facebook.com/blueocean; Twitter: https://twitter.com/blueocean; Instagram: https://instagram.com/blueocean"
              value={formData.socialMedia}
              onChange={handleInputChange}
            />
          </span>
          <span className="mx-auto md:col-span-2 2xl:col-span-4 mt-6">
            <button
              className="bg-primary-base hover:bg-primary-500 transition-colors text-white text-xl font-semibold px-5 py-2.5 rounded-lg"
              type="submit"
            >
              {isUpdate ? "Update Agency" : "Create Agency"}
            </button>
          </span>
        </form>
      </div>
    </>
  );
};

export default TourAgencyProfile;
