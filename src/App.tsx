import ErrorBoundary from "./components/ErrorBoundary";
import Main from "./pages/Main";

const App = () => (
  <ErrorBoundary>
    <Main />
  </ErrorBoundary>
);

export default App;
