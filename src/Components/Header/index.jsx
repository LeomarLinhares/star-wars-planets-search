import React, { useContext } from 'react';
import GlobalContext from '../../Context/GlobalContext';
import filterNumber from '../../helpers/filterNumber';
import { toUpperCaseAndUnderlineRemover } from '../../helpers/stringTreatment';

export default function Header() {
  const { filter, setFilter, data, loading } = useContext(GlobalContext);
  const { filters: { filterByName: { name } } } = filter;
  const handleFilter = ({ target: { value } }) => {
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
    return onlyNumbers;
  };

  if (loading) return '';
  return (
    <aside>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ name }
          onChange={ handleFilter }
        />
      </div>
      <div>
        <select name="column-filter" id="column-filter" data-testid="column-filter">
          {
            numberPropertiesSeparator()
              .map((property, index) => (
                <option key={ index }>
                  { toUpperCaseAndUnderlineRemover(property) }
                </option>))
          }
        </select>
        <select
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
        >
          <option value="bigger-than">maior que</option>
          <option value="less-than">menor que</option>
          <option value="equal">igual</option>
        </select>
      </div>
    </aside>
  );
}
