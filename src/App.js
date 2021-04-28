import { useState } from 'react';
import LoginModal from './components/LoginModal';
import { VFXProvider } from 'react-vfx';
import './App.css';
import Dashboard from './views/Dashboard';

function App() {

  const [logged, setLoggedStatus] = useState(true);

  return (
    <>
      {
        logged ?  
        (
          <Dashboard/>
        )
        :
        (
        <VFXProvider>
          <LoginModal/>
        </VFXProvider>
        )
      }
    </>
  );
}

export default App;
