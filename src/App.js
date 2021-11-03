import React, { useContext, useEffect } from 'react';
import './App.css';
import Table from './Components/Table';
import GlobalContext from './Context/GlobalContext';

function App() {
  const { planets, setPlanets, loading, setLoading } = useContext(GlobalContext);

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
    <main>
      {
        loading
          ? ''
          : <Table planets={ planets } />
      }
    </main>
  );
}

export default App;
