import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useAssets } from 'expo-asset'
import { ResizeMode, Video } from 'expo-av';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';


// -----------------------------------------------------------
// Render
// -----------------------------------------------------------
const IndexPage = () => {
  // load asset videos
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);
  return (
    <View style={styles.container}>
      {
        assets && <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video} />
      }
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link href={'/login'} style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]} asChild>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link href={'/sign-up'} style={[defaultStyles.pillButton, { flex: 1, backgroundColor: '#fff' }]} asChild>
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: '500' }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View >
  )
}

// -----------------------------------------------------------
// Styling
// -----------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
    paddingVertical: 40
  }
})

// -----------------------------------------------------------
// Exporting default
// -----------------------------------------------------------
export default IndexPage 
