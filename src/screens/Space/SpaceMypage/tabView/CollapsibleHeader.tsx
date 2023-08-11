import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

function CollapsibleHeader(): any {
  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <Text style={styles.headerText}>Header</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: 302,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#587058',
  },
  headerText: {
    fontSize: 25,
    color: '#FFD800',
  },
})

export default CollapsibleHeader
