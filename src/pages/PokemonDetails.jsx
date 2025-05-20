import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ClockLoader } from "react-spinners";

function PokemonDetails() {

  const navigate = useNavigate() // nos permite acceder a la function navigate para hacer redirecciones

  const params = useParams()
  console.log(params)

  const [ details, setDetails ] = useState(null)

  useEffect(() => {
    getData() // llamamos a la api y actualizamos el estado
  }, [params])
  // cuando los parametros dinamicos cambien, vuelva a llamar a la api y vuelve a actualizar el estado

  const getData = async () => {

    setDetails(null) // forzar la animación a ocurrir incluso cuando cambio de enlaces

    try {

      // aqui hacemos la llamada a la API
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`)
      console.log(response)
      // setTimeout(() => {
        setDetails(response.data)
      // }, 2000)

    } catch(error) {
      console.log(error)
      // redireccionar al usuario a la página de errores.
      navigate("/error")
    }

  }

  if (details === null) {
    return <div><ClockLoader color="red" size={100}/></div>
  }

  return (
    <div>
      
      <h1>{details.name}</h1>
      <img src={details.sprites.front_default} alt="pokemon" width={"150px"}/>

      <h3>Peso: {details.weight}</h3>
      <h3>Altura: {details.height}</h3>

    </div>
  )
}

export default PokemonDetails