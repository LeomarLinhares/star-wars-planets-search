import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../Context/GlobalContext';
import filterNumber from '../../helpers/filterNumber';

export default function Header() {
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnValue, setColumnValue] = useState('rotation_period');
  const [comparisonValue, setComparisonValue] = useState('bigger-than');
  const [numericValue, setNumericValue] = useState(0);
  const { filter, setFilter, data, loading } = useContext(GlobalContext);
  const { filters: { filterByName: { name } } } = filter;

  const handleNameFilter = ({ target: { value } }) => {
    const { filters } = filter;
    setFilter({ filters: { ...filters, filterByName: { name: value } } });
  };

  const numberPropertiesSeparator = () => {
    const entries = Object.entries(data[0]);
    const onlyNumbers = entries.reduce((acc, curr) => {
      if (!Number.isNaN(filterNumber(curr[1]))) {
        return [...acc, curr[0]];
      }
      return acc;
    }, []);
    setColumnFilters(onlyNumbers);
  };

  const setNumberFilter = () => {
    const { filters } = filter;
    setFilter({ filters: {
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column: columnValue,
          comparison: comparisonValue,
          value: numericValue,
        },
      ] } });
    const newColumnFilters = columnFilters.filter((element) => element !== columnValue);
    setColumnFilters(newColumnFilters);
  };

  useEffect(() => {
    if (!loading) numberPropertiesSeparator();
  }, [loading]);

  if (loading) return '';
  return (
    <aside>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ name }
          onChange={ handleNameFilter }
        />
      </div>
      <div>
        <select
          name="column-filter"
          id="column-filter"
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => setColumnValue(value) }
          value={ columnValue }
        >
          {
            columnFilters
              .map((property, index) => (
                <option key={ index } value={ property }>
                  { property }
                </option>))
          }
        </select>
        <select
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ ({ target: { value } }) => setComparisonValue(value) }
          value={ comparisonValue }
        >
          <option value="bigger-than">maior que</option>
          <option value="equal">igual a</option>
          <option value="less-than">menor que</option>
        </select>
        <input
          type="number"
          name="value-filter"
          id="value-filter"
          data-testid="value-filter"
          onChange={ ({ target: { value } }) => setNumericValue(value) }
          value={ numericValue }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ setNumberFilter }
        >
          Filter
        </button>
      </div>
    </aside>
  );
}
