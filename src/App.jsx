import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Accueil from './Accueil'
import Pokedex from './Pokedex'
import Contact from './Contact'
import Paiement from './Paiement'




function Navigation() {
  return (
    <nav style={{
      background: '#185FA5',
      padding: '16px 24px',
      display: 'flex',
      gap: '24px',
      alignItems: 'center'
    }}>
      <Link to="/" style={{
        color: 'white', textDecoration: 'none',
        fontFamily: 'Arial', fontWeight: 'bold'
      }}>
        🏠 Accueil
      </Link>
      <Link to="/pokedex" style={{
        color: 'white', textDecoration: 'none',
        fontFamily: 'Arial', fontWeight: 'bold'
      }}>
        🎮 Pokédex
      </Link>
      <Link to="/contact" style={{
        color: 'white', textDecoration: 'none',
        fontFamily: 'Arial', fontWeight: 'bold'
      }}>
        📧 Contact
      </Link>



<Link to="/paiement" style={{
  color: 'white', textDecoration: 'none',
  fontFamily: 'Arial', fontWeight: 'bold'
}}>
  💳 Paiement
</Link>
    </nav>




  )
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/paiement" element={<Paiement />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App