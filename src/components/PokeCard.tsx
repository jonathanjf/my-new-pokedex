import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Badge, Flex, Progress, Image } from '@chakra-ui/react'

const PokeCard = ( { values }: any) => {
  const [pokeInfo, setPokeInfo] = useState(Object)
  
  useEffect(() => {
    requestPokemonDetails()
  }, [])

  const SetColorSchemaPokemonType = (type:String) => {
    switch(type){
      case 'fire': return 'red'
      case 'poison': return 'purple'
      case 'water': return 'blue'
      case 'flaying': return 'gray'
      case 'electric': return 'yellow'
      case 'grass': return 'green'
      case 'fairy': return 'pink'
      case 'ice': return 'cyan'
    }
  }

  const setColorSchemaPokemonStatus = (status: Number) => {
    switch(true) {
      case (status < 40) : return 'red'
      case (status < 70) : return 'yellow'
      default: return 'green'
    }
  }
 
  const requestPokemonDetails = async () => {
    const { url } = values;
    const config = {
      method : 'GET',
      url: url
    }
    values.url &&
    await axios.request(config).then((response) => setPokeInfo(response.data))
  }
  if (pokeInfo.name) {
    return (
      
        <Flex direction="column" w='18em' p='1em' borderRadius='16px' bg="white" boxShadow='md' _hover={{ w: '22em', h:'35em' }}  transitionDuration="2s">
          <Link to={`/pokemon/${pokeInfo.name}`} className="link-style">
          <Image alt="pokemon"  objectFit='cover' src={pokeInfo.sprites.other['official-artwork'].front_default} />
          <Box display='flex' alignItems='center'>
              { pokeInfo.types.map(({type}:any) => {
                return (
                  <Badge 
                  borderRadius='full' 
                  px='2' 
                  colorScheme={SetColorSchemaPokemonType(type.name)}
                  >
                  {type.name}
                </Badge>
                )
              })}
            </Box>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              <p>{pokeInfo.name}</p>
              <Box display='flex' justifyContent="flex-start" flexDirection='column'>
                {pokeInfo.stats.map((stat:any) => {
                return <Box >
                          <p>
                            {stat.stat.name}:
                          </p> 
                          <Progress value={stat.base_stat} colorScheme={setColorSchemaPokemonStatus(stat.base_stat)} />
                        </Box>
                })
                }
                </Box>
              </Box>
              </Link>
        </Flex>
    )
  }
  return (
    <p>loading...</p>
  )
}
export default PokeCard; 