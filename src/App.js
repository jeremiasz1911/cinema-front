import LoginModal from './components/LoginModal';
import Sidebar from './components/Sidebar';
import { VFXProvider } from 'react-vfx';
import './App.css';

function App() {
  return (
    <VFXProvider>
      <LoginModal/>
      <Sidebar/>
    </VFXProvider>
  );
}

export default App;
