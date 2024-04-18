import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Iconify} from 'react-native-iconify';
import {goBack, navigate} from '../../applications/utils/rootNavigation';

const Headers = ({backButton = false, title, rightButton}) => {
  return (
    <View className="flex flex-row items-center justify-between p-4 bg-white space-x-3">
      {backButton && (
        <TouchableOpacity onPress={() => goBack()}>
          <View className="p-1 rounded-full border border-blue-500 flex flex-row items-center space-x-2">
            <Iconify icon="ph:arrow-left" size={16} color={'#3b82f6'} />
          </View>
        </TouchableOpacity>
      )}
      <Text className="font-bold text-2xl flex-1 ">{title}</Text>
      {rightButton}
    </View>
  );
};

export default Headers;
