import React, { useEffect } from 'react'
import { useState,useRef } from 'react'
import { CreateMaze, generateVisitedArray, getMazeSize } from '../helpers/util';
import styles from "./Maze.module.css";
import rat from "../assets/rat.jpeg";
import { getRatCoords } from '../helpers/util';
const Maze = () => {
    const pathsRef=useRef([]);
    const visitedRef=useRef(generateVisitedArray(getMazeSize(window.innerWidth)));
    const [maze,setMaze]=useState(CreateMaze(getMazeSize(window.innerWidth)));
    const [ratCoord,setRatCoord]=useState([0,0]);
    const intervalRef=useRef(null);
    useEffect(()=>{
        if(ratCoord[0] === maze.length -1 && ratCoord[1] === maze.length -1) clearInterval(intervalRef.current);
    },[ratCoord]);
    const createBlock=(row,col)=>{
        if(row === 0 && col === 0 || row === maze.length -1 && col === maze.length -1) return;
        // deep copying maze
        let newMaze=[];
        let eachRow;
        for(let i=0 ; i< maze.length ; i++){
            eachRow=[];
            for(let j=0 ; j< maze.length ; j++){
                eachRow.push(maze[i][j]);
            }
            newMaze.push(eachRow);
        }
        newMaze[row][col]=0;
        setMaze(newMaze);
    }
    const isSafe=(x,y)=>{
        if(x >= 0 && x< maze.length && y >= 0 && y < maze.length && maze[x][y] === 1 && visitedRef.current[x][y] === 0 && pathsRef.current.length === 0){
            
            return true;
        }
        return false;
    }
    const goAhead=(x,y,path)=>{
        
        if(x == maze.length-1 && y == maze.length - 1 ){
            
            pathsRef.current.push(path);
            return;
        }
        visitedRef.current[x][y]=1;
        // down
        if(isSafe(x+1,y)){
            path=path.concat('D');
            goAhead(x+1,y,path);
            path=path.slice(0,-1);
        }
        // right
        if(isSafe(x,y+1)){
            path=path.concat('R');
            goAhead(x,y+1,path);
            path=path.slice(0,-1);
        }
        // up
        if(isSafe(x-1,y)){
            path=path.concat('U');
            goAhead(x-1,y,path);
            path=path.slice(0,-1);
        }
        // left
        if(isSafe(x,y-1)){
            path=path.concat('L');
            goAhead(x,y-1,path);
            path=path.slice(0,-1);
        }
        visitedRef.current[x][y]=0;
    }
    const moveRat=()=>{
        const id=setInterval(()=>{
            setRatCoord(state=> getRatCoords(state,pathsRef.current[0][0]));
            pathsRef.current[0]=pathsRef.current[0].slice(1);
        },100);
        intervalRef.current=id;
    }
  return (
      <>
        <button style={{marginBottom : "1rem"}} onClick={()=> {
            goAhead(0,0,"");
            moveRat();
    console.log(pathsRef.current);}}>let me go</button>
        <div className={styles.maze}>
            {maze.map((eachRow,rowInd)=>{
                return(
                    <div key={rowInd} className={styles.row}>
                        {eachRow.map((eachCell,cellInd)=>{
                            return(
                                <div key={cellInd}   onClick={()=> createBlock(rowInd,cellInd)} className={`${styles.cell} ${eachCell === 0 && styles.block}`}>
                                    {rowInd === ratCoord[0] && cellInd === ratCoord[1] && <img src={rat}/>}
                                </div>
                            )
                        })}
                    </div>
                )
            })}

        </div>
     </>
  )
}

export default Maze