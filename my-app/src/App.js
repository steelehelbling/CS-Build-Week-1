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

// const findspeed = 100
// const color = "black"
// const set_colors = [
//   "yellow",
//   "grey",
//   "black",
//   "red",
//   "orange",
//   "green",
// ];

// class Point extends React.Component {
//     render() {
//         const { x, y } = this.props;
        
//         return (
//             <div className="point" style={{
//                 backgroundColor: `${color}` ,
//                 left: `${20 * x + 1}px`,
//                 top: `${20 * y + 1}px`,
//                 width: `${20 - 1}px`,
//                 height: `${20 - 1}px`,
//             }} />
//         );
//     }
// }
// class App extends React.Component {

//     constructor() {
//         super();
//         this.rows = 300 / 20;
//         this.cols = 300 / 20;
//         this.grid = this.creatempty();
//     }
//     state = {
//         sqare: [],
//         generation: 0,
//         isRunning: false,
//         speed: findspeed,
//     }

//     creatempty() {
//         let grid = [];
//         for (let y = 0; y < this.rows; y++) {
//             grid[y] = [];
//             for (let x = 0; x < this.cols; x++) {
//                 grid[y][x] = false;
//             }
//         }
//         return grid;
//     }
//     locate() {
//         const rect = this.gridRef.getBoundingClientRect();
//         const doc = document.documentElement;
//         return {
//             x: (rect.left + window.pageXOffset) - doc.clientLeft,
//             y: (rect.top + window.pageYOffset) - doc.clientTop,
//         };
//     }
//     makesqare() {
//         let sqare = [];
//         for (let y = 0; y < this.rows; y++) {
//             for (let x = 0; x < this.cols; x++) {
//                 if (this.grid[y][x]) {
//                     sqare.push({ x, y });
//                 }
//             }
//         }
//         return sqare;
//     }
//     handleClick = (event) => {
//         const elemOffset = this.locate();
//         const offsetX = event.clientX - elemOffset.x;
//         const offsetY = event.clientY - elemOffset.y;
        
//         const x = Math.floor(offsetX / 20);
//         const y = Math.floor(offsetY / 20);
//         if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
//             this.grid[y][x] = !this.grid[y][x];
//         }
//         this.setState({ sqare: this.makesqare() });
//     }
//     run() {
//         let newgrid = this.creatempty();
//         for (let y = 0; y < this.rows; y++) {
//             for (let x = 0; x < this.cols; x++) {
//                 let near = this.find_near(this.grid, x, y);
//                 if (this.grid[y][x]) {
//                     if (near === 2 || near === 3) {
//                         newgrid[y][x] = true;
//                     } else {
//                         newgrid[y][x] = false;
//                     }
//                 } else {
//                     if (!this.grid[y][x] && near === 3) {
//                         newgrid[y][x] = true;
//                     }
//                 }
//             }
//         }
//         this.grid = newgrid;
//         this.setState({ sqare: this.makesqare() });
//         this.timeoutHandler = window.setTimeout(() => {
//             this.run();
//         }, this.state.speed);
//     }
//     find_near(grid, x, y) {
//         let near = 0;
//         const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
//         for (let i = 0; i < dirs.length; i++) {
//             const dir = dirs[i];
//             let y1 = y + dir[0];
//             let x1 = x + dir[1];
//             if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && grid[y1][x1]) {
//                 near++;
//             }
//         }
//         return near;
//     }



//     render() {
//         const { sqare, isRunning } = this.state;
//         return (
//           <div>
//           <div className="main">
//             <div className='left'>
//                 <div className="grid"
//                     style={{ width: 260, height: 260, backgroundSize: `${20}px ${20}px`}}
//                     onClick={this.handleClick}
//                     ref={(n) => { this.gridRef = n; }}>
//                     {sqare.map(point => (
//                         <Point x={point.x} y={point.y} key={`${point.x},${point.y}`}/>
//                     ))}
//                 </div>
//                 <div className="controls">
//                     {isRunning ?
//                         <button onClick={() => {
//                           this.setState({ isRunning: false });
//                           if (this.timeoutHandler) {
//                               window.clearTimeout(this.timeoutHandler);
//                               this.timeoutHandler = null;
//                           }
//                       }}>Stop</button> :
//                         <button onClick={() => {
//                           this.setState({ isRunning: true});
//                           this.run();
//                       }}>Run</button>
//                     }
//                     <button onClick={() => {     
//                       for (let y = 0; y < this.rows; y++) {
//                           for (let x = 0; x < this.cols; x++) {
//                               this.grid[y][x] = (Math.random() >= 0.5);
//                           }
//                       }
//                         this.setState({ sqare: this.makesqare() });
//                     }}
//                     >Random</button>
//                     <button onClick={() => {
//                           for (let y = 0; y < this.rows; y++) {
//                             for (let x = 0; x < this.cols; x++) {
//                               this.grid = this.creatempty();
//                               this.setState({ sqare: this.makesqare() });
                               
//                             }
//                         }
//                         this.setState({ sqare: this.makesqare() });
//                         }}>Clear</button>
//             </div>
//             </div>
//             <div className='right'>
//                     <img
//                       src={require('./img/arraw.png')} alt="arrow"
//                         onClick={() => {
//                           for (let y = 0; y < this.rows; y++) {
//                             for (let x = 0; x < this.cols; x++) {
//                               this.grid = this.creatempty();
//                               this.setState({ sqare: this.makesqare() });
//                               this.grid[5][1] = this.grid[6][1] = this.grid[6][0] = this.grid[5][0]= this.grid[5][7] = this.grid[6][7] = this.grid[6][6] = this.grid[5][6] = this.grid[7][7] = this.grid[7][6]= this.grid[8][6]=this.grid[4][6]=this.grid[3][7]=this.grid[9][7]=this.grid[4][8]=this.grid[8][8]=this.grid[5][9]=this.grid[7][9]=this.grid[6][9]=this.grid[6][10]=1;
                               
//                             }
//                         }
//                         this.setState({ sqare: this.makesqare() });
//                         }}>
//                       </img>
//                     <img
//                         src={require('./img/rando.png')} alt="pop"
//                           onClick={() => {
//                             for (let y = 0; y < this.rows; y++) {
//                               for (let x = 0; x < this.cols; x++) {
//                                 this.grid = this.creatempty();
//                                 this.setState({ sqare: this.makesqare() });
//                                 this.grid[5][1] = this.grid[6][1] = this.grid[6][0] = this.grid[5][0]= this.grid[5][7] = this.grid[6][7] = this.grid[6][6] = this.grid[5][6] = this.grid[7][7] = this.grid[7][6]= this.grid[8][6]=this.grid[4][6]=this.grid[3][7]=this.grid[9][7]=this.grid[4][8]=this.grid[8][8]=this.grid[5][9]=this.grid[7][9]=this.grid[6][9]=this.grid[6][10]=this.grid[5][14]=this.grid[5][11]=this.grid[5][13]=this.grid[5][14]=this.grid[11][1]=this.grid[11][3]=this.grid[11][4]=this.grid[1][1]=this.grid[2][1]=this.grid[5][1] = this.grid[6][1] = this.grid[6][0] = this.grid[5][0]= this.grid[5][7] = this.grid[6][7] = this.grid[6][6] = this.grid[5][6] = this.grid[7][7] = this.grid[7][6]= this.grid[8][6]=this.grid[4][6]=this.grid[3][7]=this.grid[9][7]=this.grid[4][8]=this.grid[8][8]=this.grid[5][9]=this.grid[7][9]=this.grid[6][9]=this.grid[6][10]=this.grid[5][14]=this.grid[5][12]=this.grid[5][14]=this.grid[5][14]=this.grid[11][2]=this.grid[11][6]=this.grid[11][8]=this.grid[2][2]=this.grid[8][4]= 1;
  
//                               }
//                           }
//                           this.setState({ sqare: this.makesqare() });
//                           }}>
//                         </img>  
//                     <img
//                           src={require('./img/flow.png')} alt="flower"
//                             onClick={() => {
//                               for (let y = 0; y < this.rows; y++) {
//                                 for (let x = 0; x < this.cols; x++) {
//                                  this.grid = this.creatempty();
//                                  this.setState({ sqare: this.makesqare() });
//                                  this.grid[5][5] = this.grid[5][6] = this.grid[5][4] = this.grid[6][5]=this.grid[4][4] = this.grid[4][6]=this.grid[3][5]=  1;

//                                 }
//                             }
//                             this.setState({ sqare: this.makesqare() });
                              
//                             }}
//                           >
//                           </img>
//                           <div className='forms'>
//                           <form type="submit" className="set_colors">
//                             <label htmlFor="color">
//                               <h4>Color</h4>
//                               <select id="type"value={color}>
//                                 {set_colors.map((color) => (
//                                   <option key={color}value={color}>
//                                     {color}
//                                   </option>
//                                 ))}
//                               </select>
//                             </label>
//                           </form>


//                       </div>   
//             </div>       
//             <div className='moreright'>
//               <h4>rules</h4>
//               <p>Any live point with fewer than two live neighbours dies, as if by underpopulation.</p>
//               <p>Any live point with two or three live neighbours lives on to the next generation.</p>

//               <p>Any live point with more than three live neighbours dies, as if by overpopulation.</p>
//               <p>
//               Any dead point with exactly three live neighbours becomes a live point, as if by reproduction.</p>
//               </div>
//              </div> 
//             <p className ='end'>
//             conways game of life runs from a start state to a end state and changes based on the old state this makes it so you can create moveing pixsels that follow rules so that we can create gliders sill life moveing life and maybe even glider builders 
//             </p>
            
//           </div>
//         );
//     }
// }
// export default App;


