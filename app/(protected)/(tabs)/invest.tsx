import { Text, ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

const items = [
  { id: 1, name: 'Item-1', span: 3, url: '' },
  { id: 2, name: 'Item-2', span: 1, url: '' },
  { id: 3, name: 'Item-3', span: 2, url: '' },
  { id: 4, name: 'Item-4', span: 3, url: '' },
  { id: 5, name: 'Item-5', span: 1, url: '' },
  { id: 6, name: 'Item-6', span: 2, url: '' },
  { id: 7, name: 'Item-7', span: 2, url: '' },
  { id: 8, name: 'Item-8', span: 1, url: '' },
  { id: 9, name: 'Item-1', span: 3, url: '' },
  { id: 10, name: 'Item-2', span: 1, url: '' },
  { id: 11, name: 'Item-3', span: 2, url: '' },
  { id: 12, name: 'Item-4', span: 3, url: '' },
  { id: 13, name: 'Item-5', span: 1, url: '' },
  { id: 14, name: 'Item-6', span: 2, url: '' },
  { id: 15, name: 'Item-7', span: 2, url: '' },
  { id: 16, name: 'Item-8', span: 1, url: '' },
];

const baseWidth = 139;

const InvestProtectedPage = () => {

  const { width } = Dimensions.get("window");
  console.log(width / 3);



  return (
    <ScrollView style={styles.gridView}>
      <View style={styles.gridContainer}>
        {
          items.map((item) => (
            <View style={[styles.card, { width: baseWidth * item.span }]} key={item.id}>
              <Text>{item.name}</Text>
            </View>
          ))
        }
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.lightGray,
    height: 100,
    padding: 2,
    borderRadius: 8,
    alignSelf: 'center'
  },
  gridView: {
    padding: 4
  },
  gridContainer: {
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
  }
})



export default InvestProtectedPage
