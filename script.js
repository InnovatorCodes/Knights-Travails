function knightMoves(src,dest){
    if(src==null || dest==null || !Array.isArray(src) || !Array.isArray(dest) || src.length!=2 || dest.length!=2){
        console.log("Invalid Arguments");
        return;
    } 
    if(src[0]==dest[0] && src[1]==dest[1]){
        console.log("The knight is already at its destination!");
        return;
    } 
    const visitedSquares=new Map();
    const KNIGHT_MOVES=[[1,2],[2,1],[2,-1],[1,-2],[-1,2],[-2,-1],[-2,1],[-1,2]] ;
    const squareNode=([x,y],pred)=>{
        return {x,y,pred,name:`${x},${y}`};
    }
    const generateMoves=([X,Y])=>{
        let possibleMoves=[];
        KNIGHT_MOVES.map((offset)=>{
            let newX=X+offset[0];
            let newY=Y+offset[1];
            if(newX<8 && newX>=0 && newY<8 && newY>=0) possibleMoves.push([newX,newY]);
        })
        return possibleMoves;
    }
    let finalNode;
    let reachedDest=false;
    srcNode=squareNode(src,null)
    let queue=[srcNode];
    while(!reachedDest){
        let currentSquare=queue.shift();
        let currentSquareKey=`${currentSquare.x},${currentSquare.y}`
        if(!visitedSquares.has(currentSquareKey)){
            let moves=generateMoves([currentSquare.x,currentSquare.y]);
            moves.forEach(([X,Y])=>{
                if(X==dest[0] && Y==dest[1]){
                    finalNode=squareNode([X,Y],currentSquare.name);
                    reachedDest=true;
                }
                else queue.push(squareNode([X,Y],currentSquare.name));
            })
            visitedSquares.set(currentSquareKey,currentSquare);
            if(reachedDest) break;
        }
    }
    const route=[];
    let currentNode=finalNode;
    while(currentNode!=srcNode){
        route.push([currentNode.x,currentNode.y]);
        currentNode=visitedSquares.get(currentNode.pred);
    }
    route.push(src);
    route.reverse();
    console.log(`You made it in ${route.length} moves! Here's your path:`);
    route.forEach((square)=>console.log(`[${square[0]},${square[1]}]`));
}

knightMoves(0,[7,5]);