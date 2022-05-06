import React from 'react';
import Header from '../components/Header';
import PokeContainer from '../components/PokeContainer';

const Home = () => {
  return (
    <>
    <Header message={'Pokédex'}/>
    <PokeContainer />
    </>
  )
}

export default Home;