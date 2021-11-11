import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../../Context/GlobalContext';
import regexFilter from '../../helpers/regexFilter';

export default function Table({ data, headerLine }) {
  const { filter: { filters } } = useContext(GlobalContext);

  const handleFilterByName = () => {
    const { filterByName: { name }, filterByNumericValues } = filters;
    const filteredOnlyByName = regexFilter(data, 'name', name);
    return filterByNumericValues.reduce((acc, curr) => (
      acc.filter((object) => {
        switch (curr.comparison) {
        case 'bigger-than':
          return Number(object[curr.column]) > Number(curr.value);

        case 'less-than':
          return Number(object[curr.column]) < Number(curr.value);

        case 'equal':
          return Number(object[curr.column]) === Number(curr.value);

        default:
          return false;
        }
      })
    ), filteredOnlyByName);
  };

  return (
    <table>
      <thead>
        <tr>
          { headerLine.map((key) => <th key={ key }>{ key }</th>) }
        </tr>
      </thead>
      <tbody>
        { handleFilterByName().map((planet, index) => {
          const keys = Object.keys(planet);
          return (
            <tr
              key={ index }
            >
              { keys.map((key, keyIndex) => <td key={ keyIndex }>{ planet[key] }</td>) }
            </tr>
          );
        }) }
      </tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  headerLine: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
