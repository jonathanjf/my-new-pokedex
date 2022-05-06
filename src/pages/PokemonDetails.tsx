import React, { useState ,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { Box, Flex, Image, Text  } from '@chakra-ui/react'


const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(Object)
  const [regions, setRegions] = useState(Array)

  useEffect(() => {
    name && requestPokemonDetails(name)
  },[])

  useEffect(() => {
    pokemon.name && requestPokemonLocation(pokemon.location_area_encounters)
    console.log(regions)
  },[pokemon])

  const requestPokemonDetails = async (name: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const config = {
      method: 'GET',
      url: url
    }
    await axios.request(config).then((response) => setPokemon(response.data))
  }

  const requestPokemonLocation = async (url:string) => {
    const config = {
      method: 'GET',
      url: url,
    }

    return await axios.request(config).then((response:any) => setRegions(response.data))
    
  }

  if (pokemon.name) {
    return (
      <Flex bg='whitesmoke' w='100vw' flexDirection='column' h='100vh'>
      <Header message={`Detalhes de ${pokemon.name}`} />
        <Box boxShadow='dark-lg' display='flex' flexDirection='row' backgroundColor='white' w='80%' justifyContent='space-between' borderRadius={5} alignItems='center' h='15em' margin='3em'>
        <Image src={pokemon.sprites.other.dream_world.front_default} h='80%' w='30%'/>
          <Box w='70%' h='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center' color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'> 
            
            <Text fontSize='1em' pb='0.5em'>{` ${pokemon.name} possui as seguintes habilidades:  `}</Text>
            {pokemon.abilities.map((habilitie:any) => {
              return <Text key={habilitie.ability.name}>{habilitie.ability.name}</Text>
            })}
            <Text pt='0.5em'>{`Além de possuir uma altura de ${pokemon.height} pés e um peso aproximado de ${pokemon.weight}lbs.`}</Text>
            <Text>{`${pokemon.name} esteve presente em ${pokemon.moves.length} filmes durante toda a franquia.`}</Text>
          </Box>
        </Box>
        <Box boxShadow='dark-lg' display='flex' flexDirection='row' backgroundColor='white' w='80%' justifyContent='center' borderRadius={5} alignItems='center' h='15em' margin='3em'>
        <Box 
              w='70%' 
              h='100%'
              display='flex'
              flexDirection='column' 
              justifyContent='center'
              alignItems='center' 
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
        > 
            <Text>{`Onde encontrar um ${pokemon.name}:`}</Text>
            {regions.length > 1 ? regions.map(({location_area}:any) => {
              return <Text key={location_area.name}>{location_area.name}</Text>
              }) : <Text>Não possuímos informações relevantes sobre onde encontrarmos esse Pokémon</Text>
            }
        </Box>
        </Box>
      </Flex>
    )
  }
  return (
    <p>carregando...</p>
  )
}

export default PokemonDetails;