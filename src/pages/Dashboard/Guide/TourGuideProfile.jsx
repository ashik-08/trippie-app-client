import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaCamera, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  addTourGuide,
  getTourGuide,
  updateTourGuide,
} from "../../../api/guide-api";
import { uploadImage } from "../../../api/image-api";
import { getSubscriptionStatus } from "../../../api/subscription-api";
import LoadingSpinner from "../../../components/LoadingState/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const TourGuideProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [initialProfileImage, setInitialProfileImage] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    guideName: "",
    nid: "",
    mobile: "",
    area: "",
    languages: "",
    expertise: "",
    tourSizeLimitations: "",
    paymentMethods: "",
    bio: "",
    description: "",
    experience: "",
    pricing: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchSubscriptionStatusAndGuideData = async () => {
      try {
        const subscriptionResponse = await getSubscriptionStatus(user?.email);
        if (isMounted && subscriptionResponse?.status !== "active") {
          toast.error(
            "Your subscription is inactive. Please subscribe or renew to update your profile."
          );
          navigate("/dashboard/tour-guide-home");
          return;
        }

        const guideData = await getTourGuide(user?.email);
        if (isMounted && guideData) {
          const initialData = {
            id: guideData._id,
            guideName: guideData.guideName,
            nid: guideData.nid,
            mobile: guideData.mobile,
            area: guideData.area.join("; "),
            languages: guideData.languages.join("; "),
            expertise: guideData.expertise.join("; "),
            tourSizeLimitations: guideData.tourSizeLimitations,
            paymentMethods: guideData.paymentMethods.join("; "),
            bio: guideData.bio,
            description: guideData.description,
            experience: guideData.experience,
            pricing: guideData.pricing,
            subscriptionStartDate: subscriptionResponse?.validityStart,
            subscriptionEndDate: subscriptionResponse?.validityEnd,
            subscriptionStatus: subscriptionResponse?.status,
          };
          setFormData(initialData);
          setInitialFormData(initialData);
          setProfileImage(guideData.profileImage);
          setInitialProfileImage(guideData.profileImage);
          setIsUpdate(true);
        }
      } catch (error) {
        console.error(
          "Failed to fetch subscription status or guide data",
          error
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (user?.email) {
      fetchSubscriptionStatusAndGuideData();
    }

    return () => {
      isMounted = false;
    };
  }, [user?.email, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    if (!profileImage) {
      toast.error("Have to add a profile image", { id: toastId });
      return;
    }

    // Check if any data has changed
    const isDataChanged =
      JSON.stringify(formData) !== JSON.stringify(initialFormData);
    const isProfileImageChanged = profileImage !== initialProfileImage;

    if (!isDataChanged && !isProfileImageChanged) {
      toast.error("Please change a field before updating", { id: toastId });
      return;
    }

    // Upload profile image to Cloudinary and get its URL
    let profileImageUrl = profileImage;
    if (profileImage && profileImage !== initialProfileImage) {
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("upload_preset", "trippie");
      formData.append("folder", "trippie-all-image/tour-guides");

      try {
        profileImageUrl = await uploadImage(formData);
      } catch (error) {
        toast.error("Failed to upload profile image. Please try again later", {
          id: toastId,
        });
        throw error;
      }
    }

    // Prepare tour guide data to be sent to the server
    const tourGuideData = {
      ...formData,
      profileImage: profileImageUrl,
      area: formData.area.split("; "),
      languages: formData.languages.split("; "),
      expertise: formData.expertise.split("; "),
      paymentMethods: formData.paymentMethods.split("; "),
      email: user?.email,
    };

    try {
      if (isUpdate) {
        await updateTourGuide(formData.id, tourGuideData);
        toast.success("Tour guide profile updated successfully!", {
          id: toastId,
        });
      } else {
        await addTourGuide(tourGuideData);
        toast.success("Tour guide profile created successfully!", {
          id: toastId,
        });
      }
      navigate("/dashboard/tour-guide-home");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add tour guide profile", { id: toastId });
    }
  };

  return (
    <>
      <Helmet>
        <title>Trippie - Tour Guide Profile</title>
      </Helmet>
      <h1 className="text-2xl lg:text-3xl font-medium mb-8">
        Tour Guide Profile
      </h1>
      <div className="bg-white px-5 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 rounded-xl drop-shadow-sm">
        <h2 className="text-center text-outerSpace font-medium text-2xl lg:text-3xl mb-5">
          {isUpdate ? "Update Tour Guide Profile" : "Create Tour Guide Profile"}
        </h2>
        <p className="max-w-5xl mx-auto text-center text-blue-gray-500 md:text-lg">
          Please fill out the form below to {isUpdate ? "update" : "create"}{" "}
          your tour guide profile. Ensure all fields are filled correctly.
        </p>
        <div className="flex justify-center my-6">
          <div className="relative">
            {profileImage ? (
              <div className="relative w-24 h-24">
                <img
                  src={
                    typeof profileImage === "string"
                      ? profileImage
                      : URL.createObjectURL(profileImage)
                  }
                  alt="Profile Image"
                  className="w-full h-full object-cover rounded-full"
                />
                <button
                  type="button"
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  onClick={handleRemoveProfileImage}
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300">
                <FaCamera className="text-secondary-500 hover:text-secondary-700 transition duration-300 text-3xl" />
                <input
                  type="file"
                  name="profileImage"
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
            <p className="text-outerSpace md:text-lg font-medium">Guide Name</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="guideName"
              placeholder="Tanjir Ahmed"
              value={formData.guideName}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">NID Number</p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="nid"
              placeholder="1234567890"
              value={formData.nid}
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
              Area of Service{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *semicolon separated
              </span>
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="area"
              placeholder="Dhaka; Chittagong; Sylhet"
              value={formData.area}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Languages{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *semicolon separated
              </span>
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="languages"
              placeholder="English; Bengali; Hindi"
              value={formData.languages}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Expertise{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *semicolon separated
              </span>
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="expertise"
              placeholder="Historical Tours; Adventure Tours"
              value={formData.expertise}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Tour Size Limitations
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="number"
              name="tourSizeLimitations"
              placeholder="Maximum group size to guide"
              value={formData.tourSizeLimitations}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Payment Methods{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *semicolon separated
              </span>
            </p>
            <input
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              name="paymentMethods"
              placeholder="List the accepted payment methods..."
              value={formData.paymentMethods}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Introduction/Bio{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *write 3-4 lines
              </span>
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="bio"
              rows={3}
              placeholder="A short and engaging introduction about yourself..."
              value={formData.bio}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Description of Services{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *write 3-4 lines
              </span>
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="description"
              rows={3}
              placeholder="I am an experienced tour guide offering historical and adventure tours. I speak multiple languages and have extensive knowledge of local culture and history."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Experience and Qualifications{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *write 3-4 lines
              </span>
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="experience"
              rows={3}
              placeholder="Briefly outline your tour guiding experience, including the number of years you’ve been guiding, notable tours you’ve led, and any certifications or licenses..."
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="space-y-2 md:col-span-2">
            <p className="text-outerSpace md:text-lg font-medium">
              Pricing Information{" "}
              <span className="text-sm text-gray-600 font-semibold">
                *write 3-4 lines
              </span>
            </p>
            <textarea
              className="w-full p-3 rounded-md bg-gray-100 outline-dotted outline-1 outline-blue-gray-500"
              name="pricing"
              rows={3}
              placeholder="Provide details on your rates for different types of tours, either per hour, per day, or for a specific package..."
              value={formData.pricing}
              onChange={handleInputChange}
              required
            />
          </span>
          <span className="mx-auto md:col-span-2 2xl:col-span-4 mt-6">
            <button
              className="bg-primary-base hover:bg-primary-500 transition-colors text-white text-xl font-semibold px-5 py-2.5 rounded-lg"
              type="submit"
            >
              {isUpdate ? "Update Guide" : "Create Guide"}
            </button>
          </span>
        </form>
      </div>
    </>
  );
};

export default TourGuideProfile;
