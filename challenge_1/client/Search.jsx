import React from 'react';

const Search = (props) => {
  const { onChange, handleClick } = props;
  //let handleClick = props.handleClick;
  return (
   <div>
     <input onChange={onChange}/>
     <button type="button" onClick={handleClick}> Search </button>
   </div>
  );
};

export default Search;