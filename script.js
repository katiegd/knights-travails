// much of this logic is credited to

function knightMoves(start, end) {
  const board = buildboard(); // build board of 8 x 8 squares
  const startIndex = getIndex(board, start); // find index of start position in board
  const endIndex = getIndex(board, end); // find index of end position in board
  const bfsInfo = buildSearchArray(board, startIndex);
  const adjacentList = buildAdjacentList(board);
  const queue = [startIndex];
  let current;

  while (queue.length > 0) {
    // Set current as first item in queue
    current = queue.shift();

    // Iterate thru neighbors of current
    for (let i = 0; i < adjacentList[current].length; i++) {
      let currNeighbor = adjacentList[current][i];
      if (currNeighbor === endIndex) {
        bfsInfo[currNeighbor].parent = current;
        let path = [];
        createPath(board, bfsInfo, bfsInfo[currNeighbor], currNeighbor, path);
        path.reverse();
        path.unshift(start);
        console.log(
          `You made it in ${path.length - 1} moves! Your path is as follows:`,
          path
        );
        return path;
      } else {
        if (bfsInfo[currNeighbor].distance === null) {
          bfsInfo[currNeighbor].distance = bfsInfo[current].distance + 1;
          bfsInfo[currNeighbor].parent = current;
          queue.push(currNeighbor);
        }
      }
    }
  }
  return "It is impossible!";
}

function buildboard() {
  let board = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push([i, j]);
    }
  }
  return board;
}

function getIndex(board, target) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === target[0] && board[i][1] === target[1]) {
      return i;
    }
  }
}

// creates array of objects that contain distance & parent parameters
function buildSearchArray(board, startIndex) {
  let newArray = [];
  for (let i = 0; i < board.length; i++) {
    newArray[i] = {
      distance: null,
      parent: null,
    };
  }
  newArray[startIndex].distance = 0;
  return newArray;
}

// returns list of all neighbors of the next moves
function buildAdjacentList(board) {
  let adjacentList = [];
  for (let i = 0; i < board.length; i++) {
    let neighbors = [];
    for (let j = 0; j < 8; j++) {
      let neighbor = findNextMove(j, board[i][0], board[i][1]);
      if (containsSpot(neighbor)) {
        neighbors.push(getIndex(board, neighbor));
      }
    }
    adjacentList[i] = neighbors;
  }
  return adjacentList;
}

// All possible moves for any given position
function findNextMove(index, x, y) {
  const moves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];
  return [x + moves[index][0], y + moves[index][1]];
}

// Makes sure spot exists on board
function containsSpot(target) {
  return target[0] > 0 && target[0] < 8 && target[1] > 0 && target[1] < 8;
}

function createPath(board, infoArray, item, index, newArray) {
  if (item.parent !== null) {
    // if item.parent is not the original position
    newArray.push(board[index]);
    createPath(board, infoArray, infoArray[item.parent], item.parent, newArray);
  }
}

const playGame = knightMoves([2, 3], [3, 3]);
console.log(playGame);
