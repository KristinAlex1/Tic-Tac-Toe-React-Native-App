import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.headingContainer}>
        <Text style = {styles.heading}>Tic Tac Toe</Text>
      </View>
      <View style={styles.turnContainer}>
        <Text style={styles.turnText}></Text>
      </View>
      <View style={styles.grid}>

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
  buttonTxt:{
    fontSize: 24,
    color:'white'
  }
})