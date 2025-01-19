import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { tictactoeVal } from './Constants';

export default function App() {

  const[playerTurn,setPlayerTurn] = useState(true);
  const[value,setValue] = useState('o');
  const[turnText,setTurnText] = useState('O`s Turn');
  

  let gameofO = '';
  let gameofX = '';  

  const play = (value) => {
    if (playerTurn === true){
        gameofO += value;
        setTurnText('X`s Turn');
        setPlayerTurn(false);
        setValue('x');
    }
    else if (playerTurn === false){
        gameofO += value;
        setTurnText('O`s Turn');
        setPlayerTurn(true);
        setValue('o');
    }
  }

  const order = (value) => {
    let newVal = Array.from(value);
    for (let i = 0; i < newVal.length;i++){
      if(newVal[i] > newVal[i+1]){
        let temp = newVal[i];
        newVal[i] = newVal[i+1];
        newVal[i+1] = temp;
      }
    }
    
    checkWinner(newVal)
    
  }


  const checkWinner = (val) => {
    const winnerCombo = ['123','159','147','456','789','258','679','357'];
    for (let i = 0; i < val.length;i++){
      if(val === winnerCombo[i]){
        setTurnText('Winner');

      }
      else {
        setTurnText('Draw')
      }
    }    
  }
  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.headingContainer}>
        <Text style = {styles.heading}>Tic Tac Toe</Text> 



      </View>
      <View style={styles.turnContainer}>
        <Text style={styles.turnText}>{turnText}</Text>
      </View>
      <View style={styles.grid}>
        <FlatList
          data = {tictactoeVal}
          numColumns={3}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({item}) => (
              <Pressable
                style={styles.boxes}
                onPress={() => play(item.value)}
              >
                <Text>{item.value}</Text>
              </Pressable>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}><Text style={styles.buttonTxt} >Reset</Text></Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appContainer:{
    flex:1,
    backgroundColor:'#E0DFD5',
    
    
  },
  headingContainer:{
    margin:15,
    flexDirection:'column',
    alignItems:'center',
    
  },
  heading:{
    fontSize:40,
    fontWeight:'600'

  },
  turnContainer:{
    alignSelf:'center',
    height:100,
    width: 300,
    borderRadius:30,
    backgroundColor: '#E8E9EB',
    borderColor: '#F09D51',
    borderWidth: 5,
    marginBottom:40,
    marginTop:20,
    elevation:20
    
  },
  turnText:{
    fontSize:30
  },
  grid:{
    alignSelf:'center',
    height:380,
    width: 380,
    borderRadius:10,
    backgroundColor: '#E8E9EB',
    borderWidth:15,
    elevation:20
  },
  buttonContainer:{
    margin:50,
    alignSelf:'center',
    flexDirection:'column',
    alignItems:'center'
  },
  button:{
    height: 50,
    width:130,
    borderRadius:30,
    backgroundColor: '#313638',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxes: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonTxt:{

  },
  buttonTxt:{
    fontSize: 24,
    color:'white'
  }
})