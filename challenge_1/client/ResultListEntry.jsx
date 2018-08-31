import React from 'react';

const ResultListEntry = (props) => {
  const { date, description } = props;
  return (
  <div>
    <span>
      { props.event.date }
    </span>
    <span>
      { props.event.description }
    </span>
  </div>
  );
};

export default ResultListEntry;
