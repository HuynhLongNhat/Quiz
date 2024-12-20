// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store, { persistor } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import "nprogress/nprogress.css";
import { PersistGate } from "redux-persist/integration/react";
import "./utils/i18n";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </StrictMode>,
);
