import React, { Suspense } from "react";
import ReactDOM from "react-dom";

// redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ConfigProvider } from "antd";

import * as serviceWorker from "./serviceWorker";
import { renderRoutes } from "./routes";
import Dashboard from "./pages/Dashboard";

// Store, helpers & utils
import store from "./store";

// Style
import "./index.css";

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider>
          <Suspense fallback={<Dashboard />}> {renderRoutes()} </Suspense>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
