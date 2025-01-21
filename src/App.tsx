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

  const [bestOf3ofO,setBestOf3ofO] = useState(0);

  const [bestOf3ofX,setBestOf3ofX] = useState(0);

  const [isHidden,setIsHidden] = useState(false);

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
        if(playerTurn){
          
          setBestOf3ofO((bestOf3ofO) < 3 ? (bestOf3ofO)+ 1 : 1);
          setTurnText('Player O wins');
        }
        else if(!playerTurn){
          setBestOf3ofX((bestOf3ofX) < 3 ? (bestOf3ofX)+ 1 : 1);
          setTurnText('Player X wins');
        }
        
        
        

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
    if (!grid[index] && !gameOver) { // Only allow moves if the box is empty and game is not over
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
  
      // Check for a draw after the move
      if (newGrid.every((cell) => cell !== "") && !gameOver) {
        setTurnText("It's a Draw!");
        setGameOver(true); // Stop further moves
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

  const draw = () => {
    if (grid[index] && gameOver){
      setTurnText('Draw');
    }
  }

  const bestOf3 = () => {
    if(isHidden){
      setIsHidden(false);
      setBestOf3ofO(0);
      setBestOf3ofX(0);
    }
    else{
      setIsHidden(true);
    }
    

  }

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
        <Pressable style={[styles.button , { backgroundColor: '#F09D51' }]} onPress={bestOf3}>
          
        <Text style={[styles.buttonTxt, { backgroundColor: '#F09D51' }]}>Best of 3</Text>
        </Pressable>
      </View>
      {!isHidden &&  <View style={styles.bestOf3} >
        <View style={styles.bestOf3ofO}>
          <Text style={styles.bestOf3ofOheading}>O`s Score</Text>
          <Text style={styles.bestOf3ofOtext}>{bestOf3ofO}</Text>

        </View>
        <View style={styles.bestOf3ofX}>
          <Text style={styles.bestOf3ofXheading}>X`s Score</Text>
          <Text style={styles.bestOf3ofXtext}>{bestOf3ofX}</Text>

        </View>
      </View>}
        
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
    elevation: 10
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
    borderWidth: 5,
    elevation: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    
    alignSelf: "center",
    alignItems: "center",
  },
  button: {
    height: 50,
    width: 130,
    borderRadius: 30,
    backgroundColor: "#313638",
    alignItems: "center",
    justifyContent: "center",
    marginRight:15,
    elevation: 10
  },
  boxes: {
    width: 124,
    height: 124,
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
    fontSize: 95,
    fontWeight: 400,
  },
  bestOf3:{
    flex:1,
    alignSelf: 'center',
    flexDirection: 'row'

  },
  bestOf3ofO:{
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    

  },
  bestOf3ofOtext:{
    fontSize: 40

  },
  bestOf3ofX:{
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center'

  },
  bestOf3ofXtext:{
    fontSize: 40

  },
  bestOf3ofOheading:{
    fontSize: 32,
    fontWeight: 600,
    backgroundColor: "#E8E9EB",
    width: 140,
    borderRadius: 20,
    


  },
  bestOf3ofXheading:{
    fontSize: 32,
    fontWeight: 600,
    backgroundColor: "#E8E9EB",
    width: 140,
    borderRadius: 20,

  }


});
