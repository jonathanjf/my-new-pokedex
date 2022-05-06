import axios, { AxiosError }from 'axios';
import { useState, useEffect } from 'react';
import PokeCard from './PokeCard';
import { SimpleGrid, Spinner } from '@chakra-ui/react';


const PokeContainer = () => {
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [pokeItems, setPokeItems] = useState(Array)

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting )) {
        setOffset((offsetInsideState) => offsetInsideState  + 10)
        console.log(pokeItems)
      }
    })

    const el = document.querySelector("#intersection-element");
    
    if (el != null) {
      intersectionObserver.observe(el)
    }

    return () => intersectionObserver.disconnect()
  }, [])


  useEffect(() => {
    requestPokeApi()
  }, [offset])

  
  const requestPokeApi = async () => {
    interface getPokemonsData {
      results?: Array<object> | any,
    }

    const API = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    const config = {
      method: 'GET',
      url: API,
    }
    return await axios.request<getPokemonsData>(config)
    .then( (data) =>  {
     
      let newPokemons:Array<object> = data.data.results;
      if (newPokemons && newPokemons.length) {
        let newPokemonList = [...pokeItems];
        for (let x in newPokemons) {
          newPokemonList.push(newPokemons[x])
        }
      return setPokeItems(newPokemonList)
      }
    }
     )
      .catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error))  {
        console.log(`Axios error: ${error}`)
      }
    })
  }

  return ( 
    <>
    <SimpleGrid spacing={5} columns={[1,2,3]} bg="whitesmoke" paddingTop={10} boxShadow=''>
      {pokeItems.length > 5 && pokeItems.map((item: any) => <PokeCard key={item.name} values={item} />)}
    </SimpleGrid>
    <Spinner id="intersection-element" color='red.500'/>
    </>
  );
}

export default PokeContainer;