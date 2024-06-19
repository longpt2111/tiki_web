import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./routes";

const App = () => {
  const count = useRef(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
      count.current += 1;
    };
    const end = () => {
      count.current -= 1;
      if (count.current === 0) {
        setLoading(false);
      }
    };

    window.addEventListener("handleStartLoading", start);
    window.addEventListener("handleEndLoading", end);

    return () => {
      window.removeEventListener("handleStartLoading", start);
      window.removeEventListener("handleEndLoading", end);
    };
  }, []);

  const RoutesComponent = () => {
    return useRoutes(routes);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <Router>
        <RoutesComponent />
      </Router>
    </>
  );
};

export default App;
