import React from 'react';
import ResultListEntry from './resultListEntry.jsx';

const ResultList = (props) => {
  const { eventList } = props;
  return (
    <div>
      {eventList.map(event => <ResultListEntry event={event} />)}
    </div>
  );
};

export default ResultList;
