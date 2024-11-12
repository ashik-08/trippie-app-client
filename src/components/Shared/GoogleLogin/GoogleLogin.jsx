import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser } from "../../../api/user-api";
import useAuth from "../../../hooks/useAuth";

const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // google sign in
  const googleSignIn = () => {
    const toastId = toast.loading("Logging In...");

    signInWithGoogle()
      .then(async (result) => {
        // add new user to the database
        const userData = {
          email: result.user?.email,
          name: result.user?.displayName,
          mobile: result.user?.phoneNumber ?? "null",
          photo:
            result.user?.photoURL ??
            "https://img.icons8.com/ios-filled/50/user-male-circle.png",
          createdAt: result.user?.metadata?.creationTime,
          lastSignInTime: result?.user?.metadata?.lastSignInTime,
          role: "user",
        };

        try {
          const response = await addUser(userData);
          if (response?.status === 201 || response?.status === 200) {
            toast.success("Logged In Successfully", { id: toastId });
            navigate(from, { replace: true });
          }
        } catch (error) {
          if (error.response?.status === 409) {
            toast.error("User already exists", { id: toastId });
          } else {
            toast.error("Internal Server Error", {
              id: toastId,
            });
          }
        }
      })
      .catch((error) => {
        if (
          error.message ===
          "Firebase: Error (auth/account-exists-with-different-credential)."
        ) {
          toast.error("Account exists with different credential", {
            id: toastId,
          });
        } else {
          toast.error("Something went wrong!", { id: toastId });
        }
      });
  };

  return googleSignIn;
};

export default GoogleLogin;
