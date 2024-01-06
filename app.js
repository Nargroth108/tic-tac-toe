function GameBoard() {
	const rows = 3;
	const cols = 3;
	const board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < cols; j++) {
			board[i][j] = 0;
		}
	}

	const getBoard = () => board;

	const printBoard = () => {
		console.table(board);
	};

	return {
		getBoard,
		printBoard,
		// colSum,
		// rowSum,
	};
}

function createPlayer(playerName, playerMarker, playerValue) {
	const name = playerName;
	const score = 0;
	const marker = playerMarker;
	return {
		name,
		score,
		marker,
	};
}

const game = function Game() {
	let board = GameBoard().getBoard();
	//get DOM elements

	const players = [
		createPlayer('Player 1', 'X', 1),
		createPlayer('Player 2', 'O', 4),
	];
	let activePlayer = players[0];
	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};
	const getActivePlayer = () => activePlayer;

	let turn = 0;

	const colSum = (board) => {
		const colSumArr = [];
		board.forEach((sub) => {
			sub.forEach((num, index) => {
				if (colSumArr[index]) {
					colSumArr[index] += num;
				} else {
					colSumArr[index] = num;
				}
			});
		});
		return colSumArr;
	};

	const rowSum = (board) => {
		const rowSumArr = [];
		let sum = 0;
		board.forEach((row) => {
			row.forEach((num) => {
				sum += num;
			});
			rowSumArr.push(sum);
			sum = 0;
		});
		return rowSumArr;
	};

	const sumX = (board) => {
		return board[0][0] + board[1][1] + board[2][2];
	};

	const sumY = (board) => {
		return board[0][2] + board[1][1] + board[2][0];
	};

	//probs eventlistener on each cells
	newRound = (n1, n2) => {
		const activePlayersMarker = getActivePlayer().marker;
		const activePlayerWinValue =
			activePlayersMarker + activePlayersMarker + activePlayersMarker;
		board[n1][n2] = activePlayersMarker;
		//set text of given cell to aPM

		const rs = rowSum(board);
		const cs = colSum(board);
		const sx = sumX(board);
		const sy = sumY(board);
		turn++;

		const reset = () => {
			turn = 0;
			activePlayer = players[0];
			board = GameBoard().getBoard();
			//reset textcontent
		};

		if (
			cs.includes(activePlayerWinValue) ||
			rs.includes(activePlayerWinValue) ||
			sx === activePlayerWinValue ||
			sy === activePlayerWinValue
		) {
			activePlayer.score++;
			console.log(
				`${activePlayer.name} is the winner! score: ${activePlayer.score}; turn: ${turn}`
			);
			reset();
		} else if (turn === 9) {
			console.log('Tie!');
			reset();
		} else {
			switchPlayerTurn();
		}
		console.table(board);
	};

	newRound(0, 0);
	newRound(0, 2);
	newRound(1, 0);
	newRound(2, 2);
	newRound(1, 2);
	newRound(1, 1);
	newRound(0, 1);
};

game();
