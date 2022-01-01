import React, { Suspense } from "react";
import ReactDOM from "react-dom";

// redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ConfigProvider } from "antd";

import * as serviceWorker from "./serviceWorker";
import { renderRoutes } from "./routes";

// Helpers
// import { getSessionToken } from './Shared/helpers';

// Store, helpers & utils
import store from "./store";
// Style
import "./index.css";
import LandingPage from "./components/LandingPage";

// Load API request driver with session token stored in local storage
// if (getSessionToken()) {
//   axios.defaults.headers.common.Authorization = `Bearer ${getSessionToken()}`;
// }

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider>
          <Suspense fallback={<LandingPage />}> {renderRoutes()} </Suspense>{" "}
        </ConfigProvider>{" "}
      </PersistGate>{" "}
    </Provider>{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
