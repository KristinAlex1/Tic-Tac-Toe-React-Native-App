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
  const [playerTurn, setPlayerTurn] = useState(true);
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [turnText, setTurnText] = useState("O's Turn");
  const [gameofO, setGameofO] = useState([]);
  const [gameofX, setGameofX] = useState([]);
  const [gameOver, setGameOver] = useState(false); // Add a new state to track if the game is over

  const checkWinner = (playerMoves) => {
    const winnerCombo = ["123", "159", "147", "456", "789", "258", "679", "357"];
    for (let combo of winnerCombo) {
      if (combo.split("").every((char) => playerMoves.includes(char))) {
        setTurnText(`Player ${playerTurn ? "O" : "X"} Wins!`);
        setGameOver(true); // Mark the game as over
        return true; // Indicate a winner was found
      }
    }
    return false; // No winner yet
  };

  const play = (index) => {
    if (!grid[index] && !gameOver) { // Prevent moves if the game is over
      const newGrid = [...grid];
      const symbol = playerTurn ? "o" : "x";
      newGrid[index] = symbol;
      setGrid(newGrid);

      if (playerTurn) {
        const updatedMoves = [...gameofO, index + 1];
        setGameofO(updatedMoves);
        if (!checkWinner(updatedMoves.sort((a, b) => a - b).join(""))) {
          setTurnText("X's Turn");
          setPlayerTurn(false);
        }
      } else {
        const updatedMoves = [...gameofX, index + 1];
        setGameofX(updatedMoves);
        if (!checkWinner(updatedMoves.sort((a, b) => a - b).join(""))) {
          setTurnText("O's Turn");
          setPlayerTurn(true);
        }
      }
    }
  };

  const reset = () => {
    setGrid(Array(9).fill(""));
    setPlayerTurn(true);
    setTurnText("O's Turn");
    setGameofO([]);
    setGameofX([]);
    setGameOver(false); // Reset the game state
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Tic Tac Toe</Text>
      </View>
      <View style={styles.turnContainer}>
        <Text style={styles.turnText}>{turnText}</Text>
      </View>
      <View style={styles.grid}>
        <FlatList
          data={grid.map((value, index) => ({ value, index }))}
          numColumns={3}
          keyExtractor={(item) => item.index.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.boxes}
              onPress={() => play(item.index)}
              disabled={item.value !== "" || gameOver} // Disable presses if the game is over
            >
              <Text>{item.value}</Text>
            </Pressable>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={reset}>
          <Text style={styles.buttonTxt}>Reset</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonTxt: {
    fontSize: 24,
    color: "white",
  },
});
