import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import RoundButton from '@/components/RoundButton';
import DropDownMenu from '@/components/DropDownMenu';
import { useBalanceStore } from '@/store/balanceStore';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const HomeProtectedPage = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();

  const AddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 2000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: 'Added money'
    });
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      {/* // Header */}
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{`${balance()}`}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>
      {/* // Menu buttons */}
      <View style={styles.actionRow}>
        <RoundButton icon={'add'} text='Add Money' onPress={AddMoney} />
        <RoundButton icon={'refresh'} text='Exchange' onPress={clearTransactions} />
        <RoundButton icon={'list'} text='Details' />
        <DropDownMenu />
      </View>

      {/* // Transactions Lists */}
      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {/* // No transactions */}
        {
          transactions.length === 0 && (<Text style={{ color: Colors.gray }}>There is no transactions yet!</Text>)
        }
        {/* // Transactions */}
        {
          transactions.sort((a, b) => b.date.getTime() - a.date.getTime()).map((transaction) => (
            <View key={transaction.id} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 16 }}>
              <View style={styles.circle}>
                <Ionicons name={`${transaction.amount > 0 ? 'add' : 'remove'}` as "add" | "remove"} size={24} color={Colors.dark} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500' }}>{transaction.title}</Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>{transaction.date.toLocaleDateString()}</Text>
              </View>
              <View>
                <Text>${transaction.amount}</Text>
              </View>
            </View>
          ))
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default HomeProtectedPage
