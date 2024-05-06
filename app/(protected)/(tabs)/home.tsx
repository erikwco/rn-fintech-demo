import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import RoundButton from '@/components/RoundButton';
import DropDownMenu from '@/components/DropDownMenu';
import { useBalanceStore } from '@/store/balanceStore';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import WidgetList from '@/components/SortableList/WidgetList';

const HomeProtectedPage = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();

  const getTransactionDescription = (amount: number) => {
    if (amount === 0) {
      return 'Not allowed amount';
    } else if (amount > 0) {
      return 'Money Deposited'
    } else {
      return 'Money Withdrawn'
    }
  }

  const AddMoney = () => {
    let amount = Math.floor(Math.random() * 2000) * (Math.random() > 0.5 ? 1 : -1);
    if (amount < 0 && balance() < Math.abs(amount)) {
      amount = 0
    }
    runTransaction({
      id: Math.random().toString(),
      amount,
      date: new Date(),
      title: getTransactionDescription(amount)
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
        {/* // Transactions sort((a, b) => b.date.getTime() - a.date.getTime())*/}
        {/* // No transactions */}
        {
          transactions.length === 0 ? (<Text style={{ color: Colors.gray }}>There is no transactions yet!</Text>) :
            (transactions.map((tx) => (
              <View key={tx.id} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 16 }}>
                <View style={styles.circle}>
                  <Ionicons name={`${tx.amount > 0 ? 'add' : 'remove'}` as "add" | "remove"} size={24} color={Colors.dark} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '500' }}>{tx.title}</Text>
                  <Text style={{ color: Colors.gray, fontSize: 12 }}>{tx.date.toString()}</Text>
                </View>
                <View>
                  <Text>${tx.amount}</Text>
                </View>
              </View>
            ))
            )
        }
      </View>
      {/* // Widget List */}
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
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
