import PropTypes from 'prop-types';
import React from 'react';

export default function Table({ data, headerLine }) {
  return (
    <table>
      <thead>
        <tr>
          { headerLine.map((key) => <th key={ key }>{ key }</th>) }
        </tr>
      </thead>
      <tbody>
        { data.map((planet, index) => {
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
