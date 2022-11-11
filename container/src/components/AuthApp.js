import React, { useEffect, useRef } from "react";
import { mount } from "auth/AuthApp";
import { useHistory } from "react-router-dom";

function AuthApp({ onSignIn }) {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigation } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathname } = history.location;

        if (pathname === nextPathName) {
          return;
        }

        history.push(nextPathName);
      },
      onSignIn,
    });

    history.listen(onParentNavigation);
  }, []);

  return <div ref={ref} />;
}

export default AuthApp;
