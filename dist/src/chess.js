// chess.ts
let currentPos = [
    0,
    0
];
let isWhite = true;
let selectedSquareId = null;
// Get the square element by coordinates
function getSquareElement([x, y]) {
    return document.getElementById(`square-${x}-${y}`);
}
// Set a piece (pawn, rook, knight, bishop, queen, king) on the board at pos
export function setPieceAtPosition(piece, pos, booleanWhite) {
    isWhite = booleanWhite;
    currentPos = pos;
    console.log(`Setting ${isWhite ? 'White' : 'Black'} ${piece} at [${pos[0]}, ${pos[1]}]`);
    const targetSquare = getSquareElement(pos);
    if (!targetSquare) {
        console.warn(`Square at position [${pos[0]}, ${pos[1]}] not found.`);
        return;
    }
    targetSquare.innerHTML = '';
    const img = document.createElement('img');
    img.src = isWhite ? `/images/chess/white_${piece}.svg` : `/images/chess/black_${piece}.svg`;
    img.alt = `${isWhite ? 'White' : 'Black'} ${piece}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    targetSquare.appendChild(img);
}
// Get piece info at position, or null if empty
export function getPieceAtPosition(pos) {
    const square = getSquareElement(pos);
    const output = document.getElementById('output');
    if (!square) {
        console.warn(`Square at position [${pos[0]}, ${pos[1]}] not found.`);
        if (output) output.textContent = `Square [${pos[0]}, ${pos[1]}] not found.`;
        return null;
    }
    const img = square.querySelector('img');
    if (!img) {
        if (output) output.textContent = `Square [${pos[0]}, ${pos[1]}]: Empty`;
        return null;
    }
    const src = img.getAttribute('src');
    if (!src) {
        if (output) output.textContent = `Square [${pos[0]}, ${pos[1]}]: Unknown piece`;
        return null;
    }
    const filename = src.split('/').pop() || '';
    const match = filename.match(/(white|black)_(\w+)\.svg/);
    if (!match) {
        if (output) output.textContent = `Square [${pos[0]}, ${pos[1]}]: Unknown image format`;
        return null;
    }
    const isWhite = match[1] === 'white';
    const piece = match[2];
    if (output) {
        output.textContent = `Square [${pos[0]}, ${pos[1]}]: ${isWhite ? 'White' : 'Black'} ${piece}`;
    }
    return {
        piece,
        isWhite
    };
}
document.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('setBoardBtn');
    if (btn) {
        btn.addEventListener('click', ()=>setBoard());
    }
});
export function setBoard() {
    // Clear the board first (optional: implement if needed)
    // Set white pawns on row 1
    for(let col = 0; col < 8; col++){
        setPieceAtPosition('pawn', [
            col,
            1
        ], true);
    }
    // Set black pawns on row 6
    for(let col = 0; col < 8; col++){
        setPieceAtPosition('pawn', [
            col,
            6
        ], false);
    }
    setPieceAtPosition('rook', [
        0,
        0
    ], true);
    setPieceAtPosition('knight', [
        1,
        0
    ], true);
    setPieceAtPosition('bishop', [
        2,
        0
    ], true);
    setPieceAtPosition('queen', [
        3,
        0
    ], true);
    setPieceAtPosition('king', [
        4,
        0
    ], true);
    setPieceAtPosition('bishop', [
        5,
        0
    ], true);
    setPieceAtPosition('knight', [
        6,
        0
    ], true);
    setPieceAtPosition('rook', [
        7,
        0
    ], true);
    setPieceAtPosition('rook', [
        0,
        7
    ], false);
    setPieceAtPosition('knight', [
        1,
        7
    ], true);
    setPieceAtPosition('bishop', [
        2,
        7
    ], false);
    setPieceAtPosition('queen', [
        3,
        7
    ], false);
    setPieceAtPosition('king', [
        4,
        7
    ], false);
    setPieceAtPosition('bishop', [
        5,
        7
    ], false);
    setPieceAtPosition('knight', [
        6,
        7
    ], false);
    setPieceAtPosition('rook', [
        7,
        7
    ], false);
}
export function printPosition(text) {
    const output = document.getElementById('output');
    if (output) {
        output.textContent = text;
    }
}
export function initBoardUI() {
    const board = document.getElementById('board');
    const setBoardBtn = document.getElementById('setBoardBtn');
    if (!board || !setBoardBtn) return;
    // Create 8x8 grid
    for(let row = 0; row < 8; row++){
        for(let col = 0; col < 8; col++){
            const displayRow = 7 - row; // Flip Y-axis for bottom-left origin
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            square.dataset.col = col.toString();
            square.dataset.row = displayRow.toString();
            square.id = `square-${col}-${displayRow}`;
            square.title = `[${col}, ${displayRow}]`;
            square.addEventListener('click', ()=>{
                printPosition(`Clicked square: [${col}, ${displayRow}]`);
                getPieceAtPosition([
                    col,
                    displayRow
                ]);
                // Highlight selected square
                const clickedId = square.id;
                const prev = window.selectedSquareId ? document.getElementById(window.selectedSquareId) : null;
                if (prev && prev !== square) {
                    prev.classList.remove('selected');
                }
                square.classList.add('selected');
                window.selectedSquareId = clickedId;
            });
            board.appendChild(square);
        }
    }
    // Hook up Set Board button
    setBoardBtn.addEventListener('click', ()=>{
        setBoard();
    });
}
document.addEventListener('DOMContentLoaded', ()=>{
    initBoardUI();
    setBoard(); // Optional: auto-set board on load
});
// Optional: expose globally
//(window as any).setBoard = setBoard;
window.setPieceAtPosition = setPieceAtPosition;
window.getPieceAtPosition = getPieceAtPosition;

//# sourceMappingURL=chess.js.map