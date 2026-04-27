function Carte(props) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      maxWidth: '300px',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px'
    }}>
      <h2 style={{ 
        color: '#D85A30',
        fontSize: '16px',
        fontWeight: 'normal',
        marginBottom: '8px'
      }}>{props.nom}</h2>
      <p>{props.role}</p>
      <p>{props.emoji}</p>
    </div>
  )
}

export default Carte