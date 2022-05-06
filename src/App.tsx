import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon/:name' element={<PokemonDetails />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
