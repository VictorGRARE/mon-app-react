import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Remplace par ta clé publique Stripe
const stripePromise = loadStripe('pk_test_51TT48tF5EA36c39Nh9Ba4fr4f2cJebNDHWUZ5DsIdAoWonVXjd7OYeb6qsBQpeCAlYZyTTJPb9kztyTHq3jfdkIm001hF4mtP2')

function FormulaireCheckout({ montant }) {
  const stripe = useStripe()
  const elements = useElements()
  const [chargement, setChargement] = useState(false)
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')

  async function payer(e) {
    e.preventDefault()
    if (!stripe || !elements) return

    setChargement(true)
    setErreur('')

    try {
      const token = localStorage.getItem('token')

      // 1 — Créer l'intention de paiement côté serveur
      const res = await fetch('https://mon-backend-iql9.onrender.com/creer-paiement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ montant: montant * 100 }) // en centimes
      })
      const data = await res.json()

      if (!res.ok) {
        setErreur(data.erreur)
        setChargement(false)
        return
      }

      // 2 — Confirmer le paiement avec la carte
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        }
      )

      if (error) {
        setErreur(error.message)
      } else if (paymentIntent.status === 'succeeded') {
        setMessage(`✅ Paiement de ${montant}€ réussi !`)
      }
    } catch (err) {
      setErreur('Erreur de connexion au serveur')
    }

    setChargement(false)
  }

  const styles = {
    form: { display: 'flex', flexDirection: 'column', gap: '16px' },
    cardWrap: { border: '1.5px solid #e0e0e0', borderRadius: '8px', padding: '14px', background: '#f8f9fa' },
    btn: { padding: '14px', background: '#635BFF', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: chargement ? 'default' : 'pointer', opacity: chargement ? 0.7 : 1 },
    erreur: { background: '#FCEBEB', color: '#E24B4A', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', borderLeft: '4px solid #E24B4A' },
    succes: { background: '#E1F5EE', color: '#085041', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', borderLeft: '4px solid #1D9E75' }
  }

  return (
    <form style={styles.form} onSubmit={payer}>
      {erreur && <div style={styles.erreur}>⚠️ {erreur}</div>}
      {message && <div style={styles.succes}>{message}</div>}

      <div>
        <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#444', marginBottom: '6px', display: 'block' }}>
          Informations de carte
        </label>
        <div style={styles.cardWrap}>
          <CardElement options={{
            style: {
              base: { fontSize: '16px', color: '#333', '::placeholder': { color: '#aaa' } }
            }
          }} />
        </div>
      </div>

      <button style={styles.btn} type="submit" disabled={!stripe || chargement}>
        {chargement ? 'Traitement...' : `Payer ${montant}€ →`}
      </button>

      <p style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>
        🔒 Paiement sécurisé par Stripe · Mode test
      </p>
    </form>
  )
}

function PaiementStripe() {
  const [connecte, setConnecte] = useState(!!localStorage.getItem('token'))
  const montant = 9.99

  if (!connecte) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'Arial' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
        <h2 style={{ color: '#185FA5', marginBottom: '8px' }}>Connexion requise</h2>
        <p style={{ color: '#888', marginBottom: '24px' }}>Tu dois être connecté pour effectuer un paiement.</p>
        <a href="/connexion" style={{ background: '#185FA5', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Se connecter
        </a>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>

        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>💳</div>
          <h2 style={{ color: '#1a1a1a', marginBottom: '4px' }}>Paiement sécurisé</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Soutien à Victor 🚀</p>
        </div>

        {/* Montant */}
        <div style={{ background: '#f0faf6', borderRadius: '10px', padding: '16px', textAlign: 'center', marginBottom: '24px', border: '1.5px solid #1D9E75' }}>
          <div style={{ fontSize: '13px', color: '#666' }}>Montant</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1D9E75' }}>{montant}€</div>
        </div>

        {/* Carte de test */}
        <div style={{ background: '#FFF3E0', borderRadius: '8px', padding: '12px', marginBottom: '20px', fontSize: '12px', color: '#854F0B' }}>
          🧪 <strong>Mode test</strong> — utilise la carte : <strong>4242 4242 4242 4242</strong> · Date : n'importe quelle date future · CVV : n'importe quoi
        </div>

        {/* Formulaire Stripe */}
        <Elements stripe={stripePromise}>
          <FormulaireCheckout montant={montant} />
        </Elements>

      </div>
    </div>
  )
}

export default PaiementStripe