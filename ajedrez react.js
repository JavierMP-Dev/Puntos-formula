import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BOARD_SIZE = 8;
const windowWidth = Dimensions.get('window').width;
const SQUARE_SIZE = Math.min(windowWidth - 32, 400) / 8;

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];


const getPieceIcon = (piece) => {
  const iconMap = {
    'k': 'chess-king',
    'q': 'chess-queen',
    'r': 'chess-rook',
    'b': 'chess-bishop',
    'n': 'chess-knight',
    'p': 'chess-pawn',
    'K': 'chess-king',
    'Q': 'chess-queen',
    'R': 'chess-rook',
    'B': 'chess-bishop',
    'N': 'chess-knight',
    'P': 'chess-pawn',
  };
  return iconMap[piece];
};

export default function ChessBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const handlePieceSelect = (row, col) => {
    const piece = board[row][col];
    if (!selectedPiece) {
      // Selecting a piece
      if (piece) {
        const isWhitePiece = piece === piece.toUpperCase();
        if (isWhitePiece === isWhiteTurn) {
          setSelectedPiece({ row, col });
        }
      }
    } else {
      // Moving a piece
      if (row !== selectedPiece.row || col !== selectedPiece.col) {
        const newBoard = [...board.map(row => [...row])];
        newBoard[row][col] = board[selectedPiece.row][selectedPiece.col];
        newBoard[selectedPiece.row][selectedPiece.col] = '';
        setBoard(newBoard);
        setIsWhiteTurn(!isWhiteTurn);
      }
      setSelectedPiece(null);
    }
  };

  const renderSquare = (row, col) => {
    const piece = board[row][col];
    const isSelected = selectedPiece?.row === row && selectedPiece?.col === col;
    const isDark = (row + col) % 2 === 1;

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          isDark ? styles.darkSquare : styles.lightSquare,
          isSelected && styles.selectedSquare,
        ]}
        onPress={() => handlePieceSelect(row, col)}
      >
        {piece && (
          <MaterialCommunityIcons
            name={getPieceIcon(piece)}
            size={SQUARE_SIZE * 0.7}
            color={piece === piece.toLowerCase() ? '#000' : '#FFF'}
          />
        )}
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.turnIndicator}>
        Turno: {isWhiteTurn ? 'Blancas' : 'Negras'}
      </Text>
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
          </View>
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  turnIndicator: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  board: {
    width: SQUARE_SIZE * 8,
    height: SQUARE_SIZE * 8,
    backgroundColor: '#e5c696',
    borderWidth: 2,
    borderColor: '#444',
  },
  row: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row', width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkSquare: {
    backgroundColor: '#b58863',
  },
  lightSquare: {
    backgroundColor: '#f0d9b5',
  },
  selectedSquare: {
    backgroundColor: '#baca2b',
  },
});