import { Image, View, Text, SectionList, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { CryptoInfo, CryptoTicker, Currency } from '@/interfaces/crypto'
import { CartesianChart, Line, useChartPressState } from 'victory-native'
import { Circle, size, useFont } from '@shopify/react-native-skia'
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import WaitForData from '@/components/WaitForData'
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated'

// Categories in the header
const categories = ['Overview', 'News', 'Orders', 'Transactions'];

// Allow AnimatedProps to render correctly
Animated.addWhitelistedNativeProps({ text: true });

// to handle the update of the field when the chart is selected
// we need to use AnimatedTextInput, this allow us to 
// dinamically update the value
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

// Custom tooltip to use in the chart as indicator
function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

// -----------------------------------------------------------
// Render method
// -----------------------------------------------------------
const CryptoDetailPage = () => {

  // state used to control wich button in the header is pressed and active
  // the background and font
  const [activeIndex, setActiveIndex] = useState(0);
  // gets the id from the route
  const { id } = useLocalSearchParams();
  // get the height of the header to use as padding or margin
  const headerHeight = useHeaderHeight();
  // font defined to use in Chart to render the Grid
  const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);

  // Hook used in the chart to capture when the Chart is pressed and 
  // show a little tooltip with the price
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  // Controls when the pressed is Active in the Chart
  useEffect(() => {
    console.log(isActive)
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);


  // -----------------------------------------------------------
  // Tanstack Querys to Get the information
  // -----------------------------------------------------------
  // make api call to get the information for the selected coin
  const { data, status: infoStatus } = useQuery({
    queryKey: ['info', id],
    queryFn: async () => {
      console.log("id received : ", id)
      const result = await fetch(`/api/info?ids=${id}`).then(res => res.json());
      return result[+id] as CryptoInfo;
    },
  });


  // make api call to get tickers for the selected coin
  const { data: tickers, status } = useQuery({
    queryKey: ['tickers'],
    queryFn: async () => {
      const tickers: CryptoTicker[] = await fetch(`/api/tickers`).then(res => res.json());
      const dickers = Array.from(tickers, (record, _) => ({
        point: record.timestamp,
        price: record.price
      }))
      return dickers;
    }
  });
  // -----------------------------------------------------------
  // AnimatedProps to change the value in the AnimatedInputText
  // Dinamically
  // -----------------------------------------------------------
  const animatedText = useAnimatedProps(() => ({
    text: `$ ${state.y.price.value.value.toFixed(2)}`,
    defaultValue: ''
  }))


  const animateDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: ''
    }
  });

  // TODO: set center and pending status visible
  if (status !== 'success' || infoStatus !== 'success') {
    return <WaitForData message='Loading information .....' />;
  }



  // -----------------------------------------------------------
  // Utilities
  // -----------------------------------------------------------
  // Section of pill buttons with categories, this are sticked 
  // to the top as the screen scrolls
  const sectionHeader = () => (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 8,
        backgroundColor: Colors.background,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setActiveIndex(index)}
          style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}>
          <Text
            style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Row section of buttons 
  const listHeader = () => (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <Text style={styles.subtitle}>{data?.symbol}</Text>
        <Image source={{ uri: data?.logo }} style={{ width: 40, height: 40 }} />
      </View>

      <View style={{ flexDirection: 'row', gap: 10, margin: 12 }}>
        <TouchableOpacity
          style={[
            defaultStyles.pillButtonSmall,
            { backgroundColor: Colors.primary, flexDirection: 'row', gap: 16 },
          ]}>
          <Ionicons name="add" size={24} color={'#fff'} />
          <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButtonSmall,
            { backgroundColor: Colors.primaryMuted, flexDirection: 'row', gap: 16 },
          ]}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          <Text style={[defaultStyles.buttonText, { color: Colors.primary }]}>Receive</Text>
        </TouchableOpacity>
      </View>
    </>
  )

  return (
    <>
      <Stack.Screen options={{ title: 'Bitcoin' }} />
      <SectionList
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior="automatic"
        sections={[{ data: [{ title: 'Charts' }] }]}
        keyExtractor={(i) => i.title}
        renderSectionHeader={() => sectionHeader()}
        ListHeaderComponent={() => listHeader()}
        renderItem={({ item }) => (
          <>
            {/* // TODO: CHART */}
            <View style={[defaultStyles.block, { height: 500 }]}>
              {!isActive && (
                <View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.dark }}>{`$ ${tickers[tickers.length - 1].price.toFixed(2)}`}</Text>
                  <Text style={{ fontSize: 14, color: Colors.gray }}>Today</Text>
                </View>
              )}
              {isActive && (
                <View>
                  <AnimatedTextInput
                    style={{ fontSize: 20, fontWeight: 'bold', color: Colors.dark }}
                    editable={false}
                    underlineColorAndroid={'transparent'}
                    animatedProps={animatedText}
                  >
                  </AnimatedTextInput>
                  <AnimatedTextInput
                    style={{ fontSize: 14, color: Colors.gray }}
                    editable={false}
                    underlineColorAndroid={'transparent'}
                    animatedProps={animateDateText}
                  >
                  </AnimatedTextInput>
                </View>
              )}
              <CartesianChart
                chartPressState={state}
                axisOptions={{
                  font: font,
                  tickCount: 6,
                  labelOffset: { x: -2, y: 0 },
                  labelColor: Colors.gray,
                  formatYLabel: (v) => `$ ${v}`,
                  formatXLabel: (ms) => format(new Date(ms), 'MM/yy'),
                }}
                data={tickers!}
                xKey="point"
                yKeys={["price"]}>
                {({ points }) => (
                  <>
                    <Line points={points.price} color={Colors.primary} strokeWidth={2} />
                    {isActive && (
                      <ToolTip x={state.x.position} y={state.y.price.position} />
                    )}
                  </>
                )}
              </CartesianChart>
            </View>
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central bank or single
                administrator, that can be sent from user to user on the peer-to-peer bitcoin
                network without the need for intermediaries. Transactions are verified by network
                nodes through cryptography and recorded in a public distributed ledger called a
                blockchain.
              </Text>
            </View>
          </>
        )}
      >
      </SectionList >
    </>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.gray,
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
});


export default CryptoDetailPage
