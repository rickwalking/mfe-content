import { createGenerateClassName, StylesProvider } from "@material-ui/core/styles";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Router, Switch } from "react-router-dom";

import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));
const DasboardApp = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: 'container',
});

const history = createBrowserHistory();

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DasboardApp />
              </Route>
              <Route path="/" component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
}

export default App;
