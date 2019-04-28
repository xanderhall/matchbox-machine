import React from 'react';
import { Board, WeightTable } from '..';
import { orderBy } from 'lodash';

export default function StateTable(props) {
  const entries = Object.entries(props.states);
  const sortedEntries = orderBy(entries, (e) => JSON.parse(e[0]).filter(square => !square).length, 'desc');
  const rows = sortedEntries.map((entry) => {
    const [key, moves] = entry;
    return (
      <tr key={key}>
        <td className='board-display'><Board squares={JSON.parse(key)} /></td>
        <td className='weight-display'><WeightTable moves={moves} /></td>
      </tr>
    );
  });

  return (
    <table className='state-table'>
      <thead>
        <tr>
          <th scope='col' className='board-header'>Board state</th>
          <th scope='col' className='weight-header'>Available moves</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

