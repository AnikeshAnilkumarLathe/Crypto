import {Routes, Route} from 'react-router-dom';
import Homepage from './homepage/Homepage';
import CryptoInfo from './crypto_detail/CryptoInfo';
import WatchList from './WatchList/WatchList';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="crypto/:id" element={<CryptoInfo/>} />
        <Route path="watchList" element={<WatchList/>} />
      </Routes>
  )
}

export default App
