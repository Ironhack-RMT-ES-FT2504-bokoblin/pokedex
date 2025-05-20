import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Queremos llamar a la api para que nos de los primeros 20 pokemon y pintamos esa info haciendo un Link por cada pokemon de la lista

// 1. Que herramienta usamos para llamar a la API? fetch/axios
// 2. Donde hacemos la llamada a la API? useEffect => componentDidMount
// 3. Como procesamos una llamada que es asincrona? then/catch o async/await 
// 4. Que hacemos con la data una vez la recibimos? La almacenamos en un estado
// 5. Como pintamos los enlaces por cada pokemon? .map
// 6. Hacer nuestro gestor de carga siempre que llamemos a una API para buscar data.

function Sidebar() {

  const [ allPokemon, setAllPokemon ] = useState(null)

  useEffect(() => {

    fetch("https://pokeapi.co/api/v2/pokemon")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      setAllPokemon(data.results)
    })

  }, [])

  // gestor de loading
  if (allPokemon === null) {
    return <h3>... buscando los pokemon</h3>
  }

  return (
    <nav className="sidebar">
      
      {/* example of 3 links */}
      {/* <Link to={"/"}>bulbasaur</Link>
      <Link to={"/"}>charmander</Link>
      <Link to={"/"}>squirtle</Link> */}

      { allPokemon.map((eachPokemon) => {
        return <Link key={eachPokemon.name} to={"/"}>{eachPokemon.name}</Link>
      }) }

    </nav>
  )
}

export default Sidebar