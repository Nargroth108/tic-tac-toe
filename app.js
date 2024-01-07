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

	return {
		getBoard,
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

	let players = [
		createPlayer(prompt('Please enter a name', 'Player 1'), 'X', 1),
		createPlayer(prompt('Please enter a name', 'Player 2'), 'O', 4),
	];
	let activePlayer = players[0];
	const getActivePlayer = () => activePlayer;
	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};
	const namingDivs = function () {
		const nameDivs = document.querySelectorAll('.names');
		nameDivs.forEach((div, index) => {
			div.textContent = players[index].name;
		});
	};
	namingDivs();

	const scoreDivs = document.querySelectorAll('.scores');
	const addScoreToDivs = () => {
		scoreDivs.forEach((div, index) => {
			div.textContent = players[index].score;
		});
	};
	addScoreToDivs();

	const winMessageDiv = document.querySelector('.win-message');
	const table = document.querySelector('.table-container');
	const renderCells = () => {
		const flatBoard = board.flat();
		flatBoard.forEach((item) => {
			let button = document.createElement('button');
			button.classList.add('cell');
			button.textContent = item;
			table.appendChild(button);
		});
		const cells = document.querySelectorAll('.cell');
		let cellNumber = 0;
		for (xRow = 0; xRow < 3; xRow++) {
			for (yCol = 0; yCol < 3; yCol++) {
				cells[cellNumber].setAttribute('data-x', xRow);
				cells[cellNumber].setAttribute('data-y', yCol);
				cellNumber++;
			}
		}
		cells.forEach((cell) => {
			cell.addEventListener('click', () => {
				const xValue = cell.dataset.x;
				const yValue = cell.dataset.y;
				if (board[xValue][yValue] === '') {
					newRound(xValue, yValue);
				}
			});
		});
	};
	renderCells();
	const removeCells = () => {
		const cells = document.querySelectorAll('.cell');
		cells.forEach((cell) => {
			table.removeChild(cell);
		});
	};
	const restartBtn = document.querySelector('.restart');
	restartBtn.addEventListener('click', () => restartTurn());
	const restartTurn = () => {
		turn = 0;
		activePlayer = players[0];
		board = GameBoard().getBoard();
		removeCells();
		renderCells();
	};
	const resetBtn = document.querySelector('.reset');
	resetBtn.addEventListener('click', () => {
		board = GameBoard().getBoard();
		turn = 0;
		removeCells();
		renderCells();
		players = [
			createPlayer(prompt('Please enter a name', 'Player 1'), 'X', 1),
			createPlayer(prompt('Please enter a name', 'Player 2'), 'O', 4),
		];
		activePlayer = players[0];
		winMessageDiv.textContent = '';
		namingDivs();
		addScoreToDivs();
	});

	newRound = (n1, n2) => {
		winMessageDiv.textContent = '';
		turn++;
		removeCells();
		const activePlayersMarker = getActivePlayer().marker;
		const activePlayerWinValue =
			activePlayersMarker + activePlayersMarker + activePlayersMarker;
		board[n1][n2] = activePlayersMarker;
		renderCells();

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
			let sum = '';
			board.forEach((row) => {
				row.forEach((num) => {
					sum += num;
				});
				rowSumArr.push(sum);
				sum = '';
			});
			return rowSumArr;
		};
		const sumX = (board) => {
			return board[0][0] + board[1][1] + board[2][2];
		};
		const sumY = (board) => {
			return board[0][2] + board[1][1] + board[2][0];
		};

		if (
			colSum(board).includes(activePlayerWinValue) ||
			rowSum(board).includes(activePlayerWinValue) ||
			sumX(board) === activePlayerWinValue ||
			sumY(board) === activePlayerWinValue
		) {
			activePlayer.score++;
			addScoreToDivs();
			winMessageDiv.textContent = `${activePlayer.name} is the winner!`;
			restartTurn();
		} else if (turn === 9) {
			winMessageDiv.textContent = 'Tie!';
			restartTurn();
		} else {
			switchPlayerTurn();
		}
	};
})();
