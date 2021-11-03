import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState({});
  const [loading, setLoading] = useState(true);
  const globalState = {
    planets,
    loading,
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
      const data = await response.json();
      setPlanets(data.results.map((result) => {
        delete result.residents;
        return result;
      }));
      setLoading(false);
    };
    fetchAPI();
  }, []);

  return (
    <GlobalContext.Provider value={ globalState }>
      { children }
    </GlobalContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
