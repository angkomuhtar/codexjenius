import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Iconify} from 'react-native-iconify';

const Headers = () => {
  return (
    <View className="flex flex-row items-center justify-between p-4 bg-white">
      <Text className="font-bold text-3xl">Contacts</Text>
      <TouchableOpacity>
        <View className="px-4 py-2 rounded-full bg-blue-400 flex flex-row items-center space-x-2">
          <Iconify icon="ph:plus-circle-bold" size={16} color={'#fff'} />
          <Text className="font-bold uppercase text-white text-xs">Add</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Headers;
