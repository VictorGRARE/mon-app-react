import { useState, useEffect } from 'react'

function Pokemon({ nom, image, numero }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      width: '150px'
    }}>
      <img src={image} alt={nom} style={{ width: '100px' }} />
      <p style={{
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: '#D85A30',
        marginTop: '8px',
        textTransform: 'capitalize'
      }}>
        {nom}
      </p>
      <p style={{
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#888'
      }}>
        #{numero}
      </p>
    </div>
  )
}

function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [chargement, setChargement] = useState(true)
  const [page, setPage] = useState(0)
  const PAR_PAGE = 20

  useEffect(() => {
    let actif = true

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAR_PAGE}&offset=${page * PAR_PAGE}`)
      .then(res => res.json())
      .then(data => {
        const promesses = data.results.map(p =>
          fetch(p.url).then(r => r.json())
        )
        Promise.all(promesses).then(details => {
          if (actif) {
            setPokemons(details)
            setChargement(false)
          }
        })
      })

    return () => {
      actif = false
      setChargement(true)
    }
  }, [page])

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#185FA5' }}>
        Mon Pokédex React 🎮
      </h1>

      <p style={{ textAlign: 'center', color: '#888', marginBottom: '16px' }}>
        Pokémon {page * PAR_PAGE + 1} à {Math.min((page + 1) * PAR_PAGE, 151)}
      </p>

      {chargement ? (
        <p style={{ textAlign: 'center', fontSize: '24px' }}>
          Chargement... ⏳
        </p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          marginTop: '16px'
        }}>
          {pokemons.map(pokemon => (
            <Pokemon
              key={pokemon.id}
              nom={pokemon.name}
              image={pokemon.sprites.front_default}
              numero={pokemon.id}
            />
          ))}
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '24px'
      }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          style={{
            background: page === 0 ? '#ccc' : '#185FA5',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: page === 0 ? 'default' : 'pointer'
          }}
        >
          ← Précédent
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={(page + 1) * PAR_PAGE >= 151}
          style={{
            background: (page + 1) * PAR_PAGE >= 151 ? '#ccc' : '#185FA5',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: (page + 1) * PAR_PAGE >= 151 ? 'default' : 'pointer'
          }}
        >
          Suivant →
        </button>
      </div>
    </div>
  )
}

export default Pokedex