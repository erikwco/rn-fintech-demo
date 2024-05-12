import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Currency } from '@/interfaces/crypto';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const CryptoProtectedPage = () => {

  const headerHeight = useHeaderHeight();

  // get listings
  const currencies = useQuery({
    queryKey: ['listing'],
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
  });


  // search for the ids to get the info and the the image
  const ids = currencies.data?.map((currency: Currency) => currency.id).join(',');

  // get the image of every listing 
  const { data } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then(res => res.json()),
    enabled: !!ids, // enabled only when ids contains some value
  });


  // contentContainerStyle={{ paddingTop: headerHeight }}
  return (
    <ScrollView style={{ backgroundColor: Colors.background }} >
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {
          currencies.data?.map((currency: Currency) => (
            <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
              <TouchableOpacity style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                <Image source={{ uri: data?.[currency.id].logo }} style={{ width: 40, height: 40 }} />
                <View style={{ flex: 1, gap: 6 }}>
                  <Text style={{ fontWeight: '600', color: Colors.dark }}>{currency.name}</Text>
                  <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
                </View>
                <View style={{ gap: 6, alignItems: 'flex-end' }}>
                  <Text>$ {currency.quote.USD.price.toFixed((2))}</Text>
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Ionicons name={currency.quote.USD.percent_change_1h > 0 ? 'caret-up' : 'caret-down'} size={16} color={currency.quote.USD.percent_change_1h > 0 ? 'green' : 'red'} />
                    <Text style={{ color: currency.quote.USD.percent_change_1h > 0 ? 'green' : 'red' }}>
                      {currency.quote.USD.percent_change_1h.toFixed(2)} %
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>

          ))
        }
      </View>
    </ScrollView>
  )
}

export default CryptoProtectedPage
