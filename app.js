function GameBoard() {
	const rows = 3;
	const cols = 3;
	const board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < cols; j++) {
			board[i][j] = '';
		}
	}

	const getBoard = () => board;

	const printBoard = () => {
		console.table(board);
	};

	return {
		getBoard,
		printBoard,
	};
}

function createPlayer(playerName, playerMarker) {
	const name = playerName;
	const score = 0;
	const marker = playerMarker;
	return {
		name,
		score,
		marker,
	};
}

const game = (function Game() {
	let board = GameBoard().getBoard();
	let turn = 0;

	const winMessageDiv = document.querySelector('.win-message');
	const table = document.querySelector('.table-container');
	const renderCells = () => {
		const cellsArray = board.flat();
		cellsArray.forEach((item) => {
			let div = document.createElement('div');
			div.classList.add('cell');
			div.textContent = item;
			table.appendChild(div);
		});
	};
	const removeCells = () => {
		const cells = document.querySelectorAll('.cell');
		cells.forEach((item) => {
			table.removeChild(item);
		});
	};

	const players = [
		createPlayer('Player 1', 'X', 1),
		createPlayer('Player 2', 'O', 4),
	];
	let activePlayer = players[0];
	const getActivePlayer = () => activePlayer;
	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

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

	//probably eventlistener on each cells
	newRound = (n1, n2) => {
		turn++;
		removeCells();
		const activePlayersMarker = getActivePlayer().marker;
		const activePlayerWinValue =
			activePlayersMarker + activePlayersMarker + activePlayersMarker;
		board[n1][n2] = activePlayersMarker;
		renderCells();

		const reset = () => {
			turn = 0;
			activePlayer = players[0];
			board = GameBoard().getBoard();
			//reset textcontent
		};

		if (
			colSum(board).includes(activePlayerWinValue) ||
			rowSum(board).includes(activePlayerWinValue) ||
			sumX(board) === activePlayerWinValue ||
			sumY(board) === activePlayerWinValue
		) {
			activePlayer.score++;
			winMessageDiv.textContent = `${activePlayer.name} is the winner!`;
			reset();
		} else if (turn === 9) {
			winMessageDiv.textContent = 'Tie!';
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
})();
