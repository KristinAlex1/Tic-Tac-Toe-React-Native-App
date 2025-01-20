import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";

export default function App() {
  // State to track which player's turn it is (true for "O", false for "X")
  const [playerTurn, setPlayerTurn] = useState(true);

  // State for the grid that holds the values for each box (empty by default)
  const [grid, setGrid] = useState(Array(9).fill(""));

  // State for displaying whose turn it is
  const [turnText, setTurnText] = useState("O's Turn");

  // State to track the moves of player "O"
  const [gameofO, setGameofO] = useState([]);

  // State to track the moves of player "X"
  const [gameofX, setGameofX] = useState([]);

  // State to track if the game is over
  const [gameOver, setGameOver] = useState(false);

  /**
   * Function to check if a player has won
   * @param {Array} playerMoves - Array of moves played by a player
   * @returns {boolean} - Returns true if a winning combination is found, otherwise false
   */
  const checkWinner = (playerMoves) => {
    // Array of all possible winning combinations
    const winnerCombo = ["123", "159", "147", "456", "789", "258", "679", "357"];

    // Loop through each winning combination
    for (let combo of winnerCombo) {
      // Check if all characters in the combo are in the player's moves
      if (combo.split("").every((char) => playerMoves.includes(char))) {
        // Update the turn text to display the winner
        setTurnText(`Player ${playerTurn ? "O" : "X"} Wins!`);

        // Set the game over state to true
        setGameOver(true);
        return true; // A winner is found
      }
    }

    return false; // No winner found
  };

  /**
   * Function to handle the game logic when a box is pressed
   * @param {number} index - Index of the box pressed
   */
  const play = (index) => {
    // Only allow the move if the box is empty and the game is not over
    if (!grid[index] && !gameOver) {
      const newGrid = [...grid]; // Copy the current grid
      const symbol = playerTurn ? "o" : "x"; // Determine the symbol for the current player
      newGrid[index] = symbol; // Update the grid with the player's symbol
      setGrid(newGrid); // Set the updated grid

      // Update the moves and check for a winner
      if (playerTurn) {
        const updatedMoves = [...gameofO, index + 1]; // Add the move to "O"'s moves
        setGameofO(updatedMoves);
        if (!checkWinner(updatedMoves.sort((a, b) => a - b).join(""))) {
          setTurnText("X's Turn"); // Switch to "X"'s turn if no winner
          setPlayerTurn(false); // Update player turn
        }
      } else {
        const updatedMoves = [...gameofX, index + 1]; // Add the move to "X"'s moves
        setGameofX(updatedMoves);
        if (!checkWinner(updatedMoves.sort((a, b) => a - b).join(""))) {
          setTurnText("O's Turn"); // Switch to "O"'s turn if no winner
          setPlayerTurn(true); // Update player turn
        }
      }
    }
  };

  /**
   * Function to reset the game
   */
  const reset = () => {
    setGrid(Array(9).fill("")); // Clear the grid
    setPlayerTurn(true); // Reset to "O"'s turn
    setTurnText("O's Turn"); // Reset turn text
    setGameofO([]); // Clear "O"'s moves
    setGameofX([]); // Clear "X"'s moves
    setGameOver(false); // Reset game over state
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      {/* Game Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Tic Tac Toe</Text>
      </View>

      {/* Display whose turn it is */}
      <View style={styles.turnContainer}>
        <Text style={styles.turnText}>{turnText}</Text>
      </View>

      {/* Grid for the Tic Tac Toe game */}
      <View style={styles.grid}>
        <FlatList
          data={grid.map((value, index) => ({ value, index }))}
          numColumns={3} // Set grid to 3x3
          keyExtractor={(item) => item.index.toString()} // Use index as key
          renderItem={({ item }) => (
            <Pressable
              style={styles.boxes}
              onPress={() => play(item.index)} // Call play function on press
              disabled={item.value !== "" || gameOver} // Disable if box is filled or game is over
            >
              <Text style={styles.value}>{item.value}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* Reset button */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={reset}>
          <Text style={styles.buttonTxt}>Reset</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // App container styles
  appContainer: {
    flex: 1,
    backgroundColor: "#E0DFD5",
  },
  headingContainer: {
    margin: 15,
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: 40,
    fontWeight: "600",
  },
  turnContainer: {
    alignSelf: "center",
    height: 100,
    width: 300,
    borderRadius: 30,
    backgroundColor: "#E8E9EB",
    borderColor: "#F09D51",
    borderWidth: 5,
    marginBottom: 40,
    marginTop: 20,
    elevation: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  turnText: {
    fontSize: 30,
  },
  grid: {
    alignSelf: "center",
    height: 380,
    width: 380,
    borderRadius: 10,
    backgroundColor: "#E8E9EB",
    borderWidth: 15,
    elevation: 20,
  },
  buttonContainer: {
    margin: 50,
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    height: 50,
    width: 130,
    borderRadius: 30,
    backgroundColor: "#313638",
    alignItems: "center",
    justifyContent: "center",
  },
  boxes: {
    width: 117,
    height: 117,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonTxt: {
    fontSize: 24,
    color: "white",
  },
  value: {
    fontSize: 90,
    fontWeight: 600,
  },
});
