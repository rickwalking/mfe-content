import React, { useEffect, useRef } from "react";
import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";

function MarketingApp() {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigation } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathname } = history.location;

        if (pathname === nextPathName) {
          return;
        }

        history.push(nextPathName);
      },
    });

    history.listen(onParentNavigation);
  }, []);

  return <div ref={ref} />;
}

export default MarketingApp;
