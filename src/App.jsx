import {Routes, Route} from 'react-router-dom';
import Homepage from './homepage/Homepage';
import CryptoInfo from './crypto_detail/CryptoInfo';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="crypto/:id" element={<CryptoInfo/>} />
      </Routes>
  )
}

export default App
