import PropTypes from 'prop-types';
import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState({});
  const [loading, setLoading] = useState(true);
  const globalState = {
    planets,
    setPlanets,
    loading,
    setLoading,
  };

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
