import './App.scss';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
