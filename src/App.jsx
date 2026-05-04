import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Accueil from './Accueil'
import Pokedex from './Pokedex'
import Contact from './Contact'
import Paiement from './Paiement'
import Utilisateurs from './Utilisateurs'
import Inscription from './Inscription'
import Connexion from './Connexion'
import Profil from './Profil'
import PaiementStripe from './PaiementStripe'

function Navigation() {
  const [connecte, setConnecte] = useState(!!localStorage.getItem('token'))
  const navigate = useNavigate()

  // Écoute les changements de connexion
  useEffect(() => {
    const verifier = () => setConnecte(!!localStorage.getItem('token'))
    window.addEventListener('storage', verifier)
    window.addEventListener('authChange', verifier)
    return () => {
      window.removeEventListener('storage', verifier)
      window.removeEventListener('authChange', verifier)
    }
  }, [])

  function seDeconnecter() {
    localStorage.removeItem('token')
    localStorage.removeItem('utilisateur')
    setConnecte(false)
    navigate('/')
  }

  const linkStyle = {
    color: 'white', textDecoration: 'none',
    fontFamily: 'Arial', fontWeight: 'bold'
  }

  return (
    <nav style={{
      background: '#185FA5',
      padding: '16px 24px',
      display: 'flex',
      gap: '24px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <Link to="/" style={linkStyle}>🏠 Accueil</Link>
      <Link to="/pokedex" style={linkStyle}>🎮 Pokédex</Link>
      <Link to="/contact" style={linkStyle}>📧 Contact</Link>
      <Link to="/paiement" style={linkStyle}>💳 Paiement</Link>

      {/* Visible uniquement si connecté */}
      {connecte && (
        <>
          <Link to="/utilisateurs" style={linkStyle}>👤 Utilisateurs</Link>
          <Link to="/profil" style={linkStyle}>👤 Profil</Link>
          <button
            onClick={seDeconnecter}
            style={{
              background: '#E24B4A', color: 'white',
              border: 'none', padding: '8px 16px',
              borderRadius: '8px', cursor: 'pointer',
              fontFamily: 'Arial', fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Se déconnecter 🔓
          </button>
        </>
      )}

      {/* Visible uniquement si NON connecté */}
      {!connecte && (
        <>
          <Link to="/inscription" style={linkStyle}>📝 Inscription</Link>
          <Link to="/connexion" style={linkStyle}>🔑 Connexion</Link>
        </>
      )}

      <Link to="/paiement-stripe" style={linkStyle}>
  💳 Paiement Stripe
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
        <Route path="/utilisateurs" element={<Utilisateurs />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/paiement-stripe" element={<PaiementStripe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App