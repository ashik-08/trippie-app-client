import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import { revokeToken } from "../api/user-api";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: "https://img.icons8.com/ios-filled/50/user-male-circle.png",
    });
  };

  // login with email & password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // logout user
  const logOut = useCallback(async () => {
    const loggedInUser = { email: user?.email };
    setLoading(true);
    await revokeToken(loggedInUser);
    return signOut(auth);
  }, [user]);

  // observe auth state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // Check cookies on component mount
  useEffect(() => {
    const checkCookies = () => {
      if (!Cookies.get("refreshToken") && user) {
        logOut();
      }
    };
    // Delay the initial check to allow time for the token to be set
    const initialCheckTimeout = setTimeout(checkCookies, 5000);
    const handleStorageChange = () => {
      checkCookies();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearTimeout(initialCheckTimeout);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [user, logOut]);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
