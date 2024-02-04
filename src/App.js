import "./App.css";
import AuthContextProvider from "./Contexts/AuthContext";
import Main from "./Pages/Main";

function App() {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
}

export default App;
