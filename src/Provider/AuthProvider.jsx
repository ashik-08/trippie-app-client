import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  //   onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user] = useState(null);
  const [loading, setLoading] = useState(true);

  // create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const updateUserProfile = (name, mobile) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      phoneNumber: mobile,
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
  const logOut = async () => {
    // const loggedInUser = { email: user?.email };
    setLoading(true);
    // await revokeToken(loggedInUser);
    return signOut(auth);
  };

  // observe auth state change
  //   useEffect(() => {
  //     const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //       const loggedInUser = { email: currentUser?.email };
  //       setUser(currentUser);
  //       setLoading(false);
  //       // if user exists then issue a token
  //       if (currentUser) {
  //         await issueToken(loggedInUser);
  //       }
  //     });
  //     return () => {
  //       unSubscribe();
  //     };
  //   }, []);

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
