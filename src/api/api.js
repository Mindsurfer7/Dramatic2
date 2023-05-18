import axios from "axios";
import { DramaticaDB, authG, googleAuth } from "..";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { doc } from "firebase/firestore";
import { API_Key } from "../components/Home";

export const signInAPI = async () => {
  console.log("log in called");
  return await signInWithPopup(authG, googleAuth).then(() =>
    Promise.resolve({
      status: 200,
      message: "You were logged in",
      profile: authG.currentUser,
    })
  );
};
export const LogOutAPI = async () => {
  console.log("log out called");
  return await signOut(authG).then(() =>
    Promise.resolve({ status: 200, message: "You were logged out" })
  );
};

export const addToFavoritesAPI = async (userID, movieID) => {
  const favoritesDocRef = doc(DramaticaDB, "Favorites", userID);

  const docSnapshot = await getDoc(favoritesDocRef);

  if (docSnapshot.exists()) {
    await updateDoc(favoritesDocRef, {
      movie_ID: arrayUnion(movieID),
    });
    console.log("Document updated");
  } else {
    await setDoc(favoritesDocRef, {
      movie_ID: [movieID],
    });
    console.log("Document created");
  }

  console.log(userID, movieID);
};

export const requestFavoritesAPI = async (userID) => {
  const favoritesDocRef = doc(DramaticaDB, "Favorites", userID);

  try {
    const docSnapshot = await getDoc(favoritesDocRef);

    if (docSnapshot.exists()) {
      const favoritesData = docSnapshot.data();
      const movieIDs = favoritesData.movie_ID || [];

      return movieIDs; //  return { status: 200, movieIDs };
    } else {
      return { status: 404, message: "Favorites document not found." };
    }
  } catch (error) {
    return { status: error.code, message: error.message };
  }
};

export const removeFromFavoritesAPI = async (userID, movieID) => {
  const favoritesDocRef = doc(DramaticaDB, "Favorites", userID);
  const docSnapshot = await getDoc(favoritesDocRef);

  if (docSnapshot.exists()) {
    await updateDoc(favoritesDocRef, {
      movie_ID: arrayRemove(movieID),
    });
    return { status: 200, message: "Movie removed from favorites" };
  } else {
    return { status: 404, message: "Favorites document not found" };
  }

  //console.log(userID, movieID);
};

export const requestTrailerURL = async (ID) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${ID}?api_key=${API_Key}&append_to_response=videos`
    );
    const officialTrailer = response.data.videos.results.find(
      (video) => video.type === "Trailer"
    );

    return officialTrailer.key;
  } catch (error) {
    console.error("Failed to fetch movie data:", error);
  }
};

// const favoritesDoc = doc(DramaticaDB, "Favorites", userID);
// const newData = { movie_ID: [movieID] };
// try {
//   await setDoc(favoritesDoc, newData);
//   return { status: 200, message: "Movie added to favorites." };
// } catch (error) {
//   return { status: error.code, message: error.message };
// }
