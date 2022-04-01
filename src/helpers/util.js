export const CreateMaze=(MAZE_SIZE)=>{
    let maze=[];
    let currentRow=[];
    for(let i=0 ; i < MAZE_SIZE ; i++){
        currentRow=[];
        for(let j=0 ; j< MAZE_SIZE ; j++){
            currentRow.push(1);
        }
        maze.push(currentRow);
    }
    return maze;
}
export const generateVisitedArray=(size)=>{
    let visited=[];
    let currentRow=[];
    for(let i=0 ; i < size ; i++){
        currentRow=[];
        for(let j=0 ; j< size ; j++){
            currentRow.push(0);
        }
        visited.push(currentRow);
    }
    return visited;
}
export const getMazeSize=(width)=>{
    if(width > 600) return 15;
    if(width > 400) return 10;
    return 8;
    
}