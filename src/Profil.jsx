import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profil() {
  const [profil, setProfil] = useState(null)
  const [erreur, setErreur] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/connexion')
      return
    }

    fetch('https://mon-backend-iql9.onrender.com/profil', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.erreur) {
          localStorage.removeItem('token')
          navigate('/connexion')
        } else {
          setProfil(data)
        }
      })
      .catch(() => setErreur('Erreur de connexion au serveur'))
  }, [])

  function seDeconnecter() {
    localStorage.removeItem('token')
    localStorage.removeItem('utilisateur')
    navigate('/connexion')
  }

  const styles = {
    page: { minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' },
    card: { background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', textAlign: 'center' },
    avatar: { width: '80px', height: '80px', borderRadius: '50%', background: '#185FA5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', margin: '0 auto 16px' },
    nom: { fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '4px' },
    email: { fontSize: '14px', color: '#888', marginBottom: '24px' },
    info: { background: '#f5f5f5', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px', textAlign: 'left', fontSize: '14px', color: '#444' },
    btn: { width: '100%', padding: '12px', background: '#E24B4A', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }
  }

  if (erreur) return <div style={{ textAlign: 'center', padding: '40px', color: '#E24B4A' }}>{erreur}</div>
  if (!profil) return <div style={{ textAlign: 'center', padding: '40px' }}>Chargement... ⏳</div>

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.avatar}>{profil.nom[0]}</div>
        <div style={styles.nom}>{profil.nom}</div>
        <div style={styles.email}>{profil.email}</div>

        <div style={styles.info}>
          📅 Membre depuis : {new Date(profil.dateCreation).toLocaleDateString('fr-FR')}
        </div>
        <div style={styles.info}>
          🔐 Compte sécurisé avec JWT
        </div>
        <div style={styles.info}>
          🗄️ Données stockées dans MongoDB Atlas
        </div>

        <button style={styles.btn} onClick={seDeconnecter}>
          Se déconnecter
        </button>
      </div>
    </div>
  )
}

export default Profil