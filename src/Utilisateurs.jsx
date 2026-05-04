import { useState, useEffect } from 'react'

function Utilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [chargement, setChargement] = useState(true)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // Récupérer les utilisateurs depuis le serveur
useEffect(() => {
  const token = localStorage.getItem('token')
  
  fetch('https://mon-backend-iql9.onrender.com/utilisateurs', {
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      setUtilisateurs(data)
      setChargement(false)
    })
}, [])

  // Créer un nouvel utilisateur
  function creerUtilisateur() {
    if (!nom || !email) {
      setMessage('Remplis tous les champs !')
      return
    }
fetch('https://mon-backend-iql9.onrender.com/utilisateurs', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({ nom, email })
})
      .then(res => res.json())
      .then(data => {
        setMessage('Utilisateur créé : ' + data.nom + ' !')
        setUtilisateurs([...utilisateurs, data])
        setNom('')
        setEmail('')
      })
  }

  const styles = {
    page: { padding: '24px', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' },
    titre: { color: '#185FA5', marginBottom: '24px' },
    card: { background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '16px' },
    input: { width: '100%', padding: '10px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', marginBottom: '12px', fontFamily: 'Arial' },
    btn: { width: '100%', padding: '12px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' },
    user: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f0f0f0' },
    avatar: { width: '36px', height: '36px', borderRadius: '50%', background: '#E6F1FB', color: '#185FA5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' },
    msg: { padding: '10px 14px', background: '#E1F5EE', borderRadius: '8px', color: '#085041', fontSize: '13px', marginBottom: '12px' }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.titre}>Gestion des utilisateurs 👤</h1>

      {/* Formulaire */}
      <div style={styles.card}>
        <h2 style={{ marginBottom: '16px', fontSize: '16px' }}>Ajouter un utilisateur</h2>
        {message && <div style={styles.msg}>{message}</div>}
        <input
          style={styles.input}
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={e => setNom(e.target.value)}
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button style={styles.btn} onClick={creerUtilisateur}>
          Ajouter →
        </button>
      </div>

      {/* Liste */}
      <div style={styles.card}>
        <h2 style={{ marginBottom: '16px', fontSize: '16px' }}>
          Utilisateurs ({utilisateurs.length})
        </h2>
        {chargement ? (
          <p style={{ color: '#888' }}>Chargement... ⏳</p>
        ) : (
          utilisateurs.map(u => (
            <div key={u.id} style={styles.user}>
              <div style={styles.avatar}>{u.nom[0]}</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{u.nom}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{u.email}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Utilisateurs