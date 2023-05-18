import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { DramaticStore } from "./store/store";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAt4by5eSGjrfY2rogAFifA2bLoiWkCfdo",
  authDomain: "dramatica-178fd.firebaseapp.com",
  projectId: "dramatica-178fd",
  storageBucket: "dramatica-178fd.appspot.com",
  messagingSenderId: "851393104347",
  appId: "1:851393104347:web:b629237d9c63ea9a137ffe",
};

export const DramaticaApp = initializeApp(firebaseConfig);

export const authG = getAuth(DramaticaApp);
export const googleAuth = new GoogleAuthProvider();
export const DramaticaDB = getFirestore(DramaticaApp);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={DramaticStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
