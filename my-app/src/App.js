import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";

const number_of_rows = 15;
const number_of_coloms = 15;

const pos = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
const set_colors = [
  "yellow",
  "grey",
  "black",
  "red",
  "orange",
  "green",
];
const create_empty = () => {
  const rows = [];
    for (let i = 0; i < number_of_rows; i++) {
      rows.push(Array.from(Array(number_of_coloms), () => 0));
    }
    return rows;
};

const App = () => {
  const [old_array, new_array] = useState(() => {
    return create_empty();
  });

  const [change_over_time, set_change_over_time] = useState(false);
  const on_run = useRef(change_over_time);
  on_run.current = change_over_time;

  const speed_array = { x1: 1000, x5: 500, x10: 100 };

  const [speed, setSpeed] = useState(100);

  const speedRef = useRef(speed);
  speedRef.current = speed;


  const run = useCallback(() => {
    if (!on_run.current) {
      return;
    }

    new_array((current_array) => {
      return produce(current_array, (created_array) => {
        for (let i = 0; i < number_of_rows; i++) {
          for (let n = 0; n < number_of_coloms; n++) {
            let near_by = 0;
            pos.forEach(([x, y]) => {
              const newI = i + x;
              const newN = n + y;
              if (newI >= 0 && newI < number_of_rows && newN >= 0 && newN < number_of_coloms) {
                near_by = near_by + current_array[newI][newN];
              }
            });

            if (near_by < 2 || near_by > 3) {
              created_array[i][n] = 0;
            } else if (current_array[i][n] === 0 && near_by === 3) created_array[i][n] = 1;
          }
        }
      });
    });

    setTimeout(run, speed_array[speedRef.current]);
  }, [speed_array]);

const [color, setColor] = useState("black");
  return (
    <>
    <h1>Conways game of life</h1>
    <div className="main">
    <div className='left'>
    <div className='midd'
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${number_of_coloms},15px)`,
        }}
    >
        {old_array.map((rows, i) =>
          rows.map((col, n) => (
            <div
              key={`${i}- ${n}`}
              onClick={() => {
                const add_array = produce(old_array, (created_array) => {
                  created_array[i][n] = old_array[i][n] ? 0 : 1;
                });
                new_array(add_array);
              }}
              style={{
                width: 15,
                height: 15,
                backgroundColor: old_array[i][n] ? `${color}` : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
      <button
        onClick={() => {
          set_change_over_time(!change_over_time);
          if (!change_over_time) {
            on_run.current = true;
            run();
          }
        }}
      >
        {change_over_time ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          new_array(create_empty);
        }}
      >
        clear
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < number_of_rows; i++) {
            rows.push(
              Array.from(Array(number_of_coloms), () => (Math.random() > 0.5 ? 1 : 0))
            );
          }
          new_array(rows);
        }}
      >
        Random
      </button>
</div>
<div className='right'>
      <img
      src={require('./img/arraw.png')} alt="arrow"
        onClick={() => {
          const arry1 = [];
          for (let i = 0; i < number_of_rows; i++) {
            arry1.push(Array.from(Array(number_of_coloms), () => 0));
          }
          arry1[5][1] = arry1[6][1] = arry1[6][0] = arry1[5][0]= arry1[5][7] = arry1[6][7] = arry1[6][6] = arry1[5][6] = arry1[7][7] = arry1[7][6]= arry1[8][6]=arry1[4][6]=arry1[3][7]=arry1[9][7]=arry1[4][8]=arry1[8][8]=arry1[5][9]=arry1[7][9]=arry1[6][9]=arry1[6][10]=1;
          new_array(arry1);
        }}>
      </img>
      <img
      src={require('./img/rando.png')} alt="pop"
        onClick={() => {
          const arry2 = [];
          for (let i = 0; i < number_of_rows; i++) {
            arry2.push(Array.from(Array(number_of_coloms), () => 0));
          }
          arry2[5][1] = arry2[6][1] = arry2[6][0] = arry2[5][0]= arry2[5][7] = arry2[6][7] = arry2[6][6] = arry2[5][6] = arry2[7][7] = arry2[7][6]= arry2[8][6]=arry2[4][6]=arry2[3][7]=arry2[9][7]=arry2[4][8]=arry2[8][8]=arry2[5][9]=arry2[7][9]=arry2[6][9]=arry2[6][10]=arry2[5][14]=arry2[5][11]=arry2[5][13]=arry2[5][14]=arry2[11][1]=arry2[11][3]=arry2[11][4]=arry2[1][1]=arry2[2][1]=arry2[5][1] = arry2[6][1] = arry2[6][0] = arry2[5][0]= arry2[5][7] = arry2[6][7] = arry2[6][6] = arry2[5][6] = arry2[7][7] = arry2[7][6]= arry2[8][6]=arry2[4][6]=arry2[3][7]=arry2[9][7]=arry2[4][8]=arry2[8][8]=arry2[5][9]=arry2[7][9]=arry2[6][9]=arry2[6][10]=arry2[5][14]=arry2[5][12]=arry2[5][14]=arry2[5][14]=arry2[11][2]=arry2[11][6]=arry2[11][8]=arry2[2][2]=arry2[8][4]= 1;
   
          new_array(arry2);
        }}>
      </img>
      <img
      src={require('./img/flow.png')} alt="flower"
        onClick={() => {
          const arry1 = [];
           for (let i = 0; i < number_of_rows; i++) {
             arry1.push(Array.from(Array(number_of_coloms), () => 0));
          }
          arry1[5][5] = arry1[5][6] = arry1[5][4] = arry1[6][5]=arry1[4][4] = arry1[4][6]=arry1[3][5]=  1;
          new_array(arry1);
        }}
      >
      </img>

<div className='forms'>
      <form type="submit" className="set_colors">
        <label htmlFor="color">
          <h4>Color</h4>
          <select id="type"value={color}onChange={(e) => setColor(e.target.value)}>
            {set_colors.map((color) => (
              <option key={color}value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
      </form>

      <form type="submit" className="speedForm">
        <label htmlFor="speed">
          <h4>speed</h4>
          <select id="type" value={speed} onChange={(e) => setSpeed(e.target.value)}>
            <option value={speed.x1}>x1</option>
            <option value={speed.x5}>x5</option>
            <option value={speed.x10}> x10</option>
          </select>
        </label>
      </form>
</div>
</div>
<div className='moreright'>
<h4>rules</h4>
<p>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
<p>Any live cell with two or three live neighbours lives on to the next generation.</p>

<p>Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
<p>
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
</div>
</div>
<p className ='end'>
  conways game of life runs from a start state to a end state and changes based on the old state this makes it so you can create moveing pixsels that follow rules so that we can create gliders sill life moveing life and maybe even glider builders 
</p>

    </>
  );
};

export default App;