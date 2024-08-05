import './App.css';
import RoutingPage from './routes/RoutingPage';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from 'react';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);


  

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowModal(true); // Show the modal
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);





  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
        setShowModal(false); // Hide the modal
      });
    }
  };

  const handleDismissClick = () => {
    setDeferredPrompt(null);
    setShowModal(false); // Hide the modal
  };


  return (
    <div className="App">
      <ToastContainer limit={2} />
      <RoutingPage />


      {showModal && (
        <div className="pwa-modal">
          <div className="pwa-modal-content">
            <h2>Add to Home Screen</h2>
            <p>Would you like to add Active Farmers Cooperative app to your home screen for easier access?</p>
            <button onClick={handleInstallClick}>Yes</button>
            <button onClick={handleDismissClick}>No</button>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default App;
