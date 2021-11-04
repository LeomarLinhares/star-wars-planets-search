import React, { useContext } from 'react';
import GlobalContext from '../../Context/GlobalContext';

export default function Header() {
  const { filter, setFilter } = useContext(GlobalContext);
  const { filters: { filterByName: { name } } } = filter;
  const handleFilter = ({ target: { value } }) => {
    const { filters } = filter;
    setFilter({ filters: { ...filters, filterByName: { name: value } } });
  };

  return (
    <header>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ handleFilter }
      />
    </header>
  );
}
