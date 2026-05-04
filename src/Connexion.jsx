import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Connexion() {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const navigate = useNavigate()

  async function seConnecter() {
    if (!email || !motDePasse) {
      setErreur('Remplis tous les champs !')
      return
    }

    try {
      const res = await fetch('https://mon-backend-iql9.onrender.com/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse })
      })
      const data = await res.json()

      if (res.ok) {
        // Sauvegarder le token dans localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur))
        window.dispatchEvent(new Event('authChange'))
        navigate('/profil')
      } else {
        setErreur(data.erreur)
      }
    } catch (err) {
      setErreur('Erreur de connexion au serveur')
    }
  }

  const styles = {
    page: { minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' },
    card: { background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' },
    titre: { fontSize: '24px', fontWeight: 'bold', color: '#185FA5', marginBottom: '8px', textAlign: 'center' },
    sous: { fontSize: '14px', color: '#888', textAlign: 'center', marginBottom: '24px' },
    label: { fontSize: '13px', fontWeight: 'bold', color: '#444', marginBottom: '6px', display: 'block' },
    input: { width: '100%', padding: '12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', marginBottom: '16px', fontFamily: 'Arial', outline: 'none' },
    btn: { width: '100%', padding: '14px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
    erreur: { background: '#FCEBEB', color: '#E24B4A', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', borderLeft: '4px solid #E24B4A' },
    lien: { textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#888' }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.titre}>Se connecter 🔐</div>
        <div style={styles.sous}>Content de te revoir !</div>

        {erreur && <div style={styles.erreur}>⚠️ {erreur}</div>}

        <label style={styles.label}>Email</label>
        <input style={styles.input} type="email" placeholder="victor@email.com" value={email} onChange={e => setEmail(e.target.value)} />

        <label style={styles.label}>Mot de passe</label>
        <input style={styles.input} type="password" placeholder="••••••••" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />

        <button style={styles.btn} onClick={seConnecter}>
          Se connecter →
        </button>

        <div style={styles.lien}>
          Pas encore de compte ? <a href="/inscription" style={{ color: '#185FA5', fontWeight: 'bold' }}>S'inscrire</a>
        </div>
      </div>
    </div>
  )
}

export default Connexion