import React from 'react';

const Scoreboard = () => {
  return (
    <div>
      <h2>Here is the scoreboard</h2>
      <table border="1px solid black">
        <tr>
          <td>Round</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
          <td>10</td>
        </tr>
        <tr>
          <td>Score</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  );
};

export default Scoreboard;