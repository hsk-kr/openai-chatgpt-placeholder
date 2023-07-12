import { GlobalContextProvider } from './contexts/globalContext';
import Main from './pages/Main';

function App() {
  return (
    <GlobalContextProvider>
      <Main />
    </GlobalContextProvider>
  );
}

export default App;
