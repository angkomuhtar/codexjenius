import {View, Text, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../components/headers.components';
import {Iconify} from 'react-native-iconify';

const Home = () => {
  const [text, setText] = useState('');

  const onChangeText = a => {
    setText(a);
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="bg-rose-400" />
      <Headers />
      <View className="px-4">
        <View className="flex-row items-center bg-gray-300 rounded-md px-4 py-2">
          <TextInput
            onChangeText={onChangeText}
            value={text}
            placeholder="Search"
            className="text-lg flex-1"
          />
          <TouchableOpacity>
            <Iconify icon="mdi:search" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
