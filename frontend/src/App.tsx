import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      <Home />
    </>
  );
}

export default App;
