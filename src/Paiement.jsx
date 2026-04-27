import { useState } from 'react'

function Paiement() {
  const [etape, setEtape] = useState(1)
  const [form, setForm] = useState({
    nom: '', email: '', carte: '', expiry: '', cvv: ''
  })
  const [erreur, setErreur] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validerEtape1() {
    if (!form.nom || !form.email) {
      setErreur('Remplis tous les champs !')
      return
    }
    if (!form.email.includes('@')) {
      setErreur('Email invalide !')
      return
    }
    setErreur('')
    setEtape(2)
  }

  function validerEtape2() {
    if (!form.carte || !form.expiry || !form.cvv) {
      setErreur('Remplis tous les champs !')
      return
    }
    if (form.carte.length < 16) {
      setErreur('Numéro de carte invalide !')
      return
    }
    if (form.cvv.length < 3) {
      setErreur('CVV invalide !')
      return
    }
    setErreur('')
    setEtape(3)
  }

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#f0f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      width: '100%',
      maxWidth: '420px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#185FA5',
      marginBottom: '8px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '14px',
      color: '#888',
      textAlign: 'center',
      marginBottom: '24px'
    },
    label: {
      fontSize: '13px',
      fontWeight: 'bold',
      color: '#444',
      marginBottom: '6px',
      display: 'block'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1.5px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '14px',
      marginBottom: '16px',
      fontFamily: 'Arial',
      outline: 'none'
    },
    btn: {
      width: '100%',
      padding: '14px',
      background: '#1D9E75',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '8px'
    },
    erreur: {
      background: '#FCEBEB',
      color: '#E24B4A',
      padding: '10px 14px',
      borderRadius: '8px',
      fontSize: '13px',
      marginBottom: '16px',
      borderLeft: '4px solid #E24B4A'
    },
    progress: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '24px'
    },
    step: (actif, fait) => ({
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '13px',
      fontWeight: 'bold',
      background: fait ? '#1D9E75' : actif ? '#185FA5' : '#e0e0e0',
      color: fait || actif ? 'white' : '#888'
    }),
    stepLine: {
      width: '40px',
      height: '2px',
      background: '#e0e0e0',
      alignSelf: 'center'
    },
    montant: {
      background: '#f0faf6',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '24px',
      textAlign: 'center',
      border: '1.5px solid #1D9E75'
    },
    row: {
      display: 'flex',
      gap: '12px'
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Barre de progression */}
        <div style={styles.progress}>
          <div style={styles.step(etape === 1, etape > 1)}>1</div>
          <div style={styles.stepLine}></div>
          <div style={styles.step(etape === 2, etape > 2)}>2</div>
          <div style={styles.stepLine}></div>
          <div style={styles.step(etape === 3, false)}>✓</div>
        </div>

        {/* ÉTAPE 1 — Infos personnelles */}
        {etape === 1 && (
          <>
            <div style={styles.title}>Tes informations</div>
            <div style={styles.subtitle}>Étape 1 sur 2</div>

            <div style={styles.montant}>
              <div style={{ fontSize: '13px', color: '#666' }}>Montant à payer</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1D9E75' }}>
                9,99 €
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>
                Soutien à Victor 🚀
              </div>
            </div>

            {erreur && <div style={styles.erreur}>⚠️ {erreur}</div>}

            <label style={styles.label}>Nom complet</label>
            <input
              style={styles.input}
              type="text"
              name="nom"
              placeholder="Alexandre Dupont"
              value={form.nom}
              onChange={handleChange}
            />

            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="alexandre@email.com"
              value={form.email}
              onChange={handleChange}
            />

            <button style={styles.btn} onClick={validerEtape1}>
              Continuer →
            </button>
          </>
        )}

        {/* ÉTAPE 2 — Paiement */}
        {etape === 2 && (
          <>
            <div style={styles.title}>Paiement sécurisé 🔒</div>
            <div style={styles.subtitle}>Étape 2 sur 2</div>

            <div style={styles.montant}>
              <div style={{ fontSize: '13px', color: '#666' }}>Total</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1D9E75' }}>
                9,99 €
              </div>
            </div>

            {erreur && <div style={styles.erreur}>⚠️ {erreur}</div>}

            <label style={styles.label}>Numéro de carte</label>
            <input
              style={styles.input}
              type="text"
              name="carte"
              placeholder="1234 5678 9012 3456"
              maxLength="16"
              value={form.carte}
              onChange={handleChange}
            />

            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Date d'expiration</label>
                <input
                  style={styles.input}
                  type="text"
                  name="expiry"
                  placeholder="MM/AA"
                  maxLength="5"
                  value={form.expiry}
                  onChange={handleChange}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>CVV</label>
                <input
                  style={styles.input}
                  type="text"
                  name="cvv"
                  placeholder="123"
                  maxLength="3"
                  value={form.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ fontSize: '12px', color: '#888', marginBottom: '16px', textAlign: 'center' }}>
              🔒 Paiement simulé — aucune vraie transaction
            </div>

            <button style={styles.btn} onClick={validerEtape2}>
              Payer 9,99 € →
            </button>

            <button
              onClick={() => { setEtape(1); setErreur('') }}
              style={{
                width: '100%', padding: '10px',
                background: 'transparent', border: 'none',
                color: '#888', cursor: 'pointer',
                fontSize: '13px', marginTop: '8px'
              }}
            >
              ← Retour
            </button>
          </>
        )}

        {/* ÉTAPE 3 — Confirmation */}
        {etape === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
            <div style={styles.title}>Paiement réussi !</div>
            <div style={{ fontSize: '14px', color: '#555', margin: '12px 0 24px', lineHeight: '1.6' }}>
              Merci <strong>{form.nom}</strong> !<br />
              Un reçu a été envoyé à <strong>{form.email}</strong>
            </div>
            <div style={{
              background: '#f0faf6', borderRadius: '10px',
              padding: '16px', marginBottom: '24px',
              border: '1.5px solid #1D9E75'
            }}>
              <div style={{ fontSize: '13px', color: '#666' }}>Montant payé</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1D9E75' }}>9,99 €</div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                Soutien à Victor 🚀
              </div>
            </div>
            <button
              style={styles.btn}
              onClick={() => { setEtape(1); setForm({ nom: '', email: '', carte: '', expiry: '', cvv: '' }) }}
            >
              Faire un autre paiement
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Paiement