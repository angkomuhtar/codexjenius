import {View, Text, TextInput, Platform} from 'react-native';
import React, {useState} from 'react';
import {Iconify} from 'react-native-iconify';

const Input = ({label, error, ...props}) => {
  //   console.log(error);
  const ios = Platform.OS == 'ios';
  const [focus, setFocus] = useState(false);
  return (
    <View className="mb-4">
      <Text className="text-sm capitalize font-bold text-gray-500 mb-1 bggray">
        {label}
      </Text>
      <View
        className={`${
          ios ? 'py-2' : ''
        } px-4 flex-row items-center bg-gray-100 border space-x-2 ${
          focus ? 'border-gray-400' : 'border-gray-100'
        }  rounded-md`}>
        <Iconify
          icon="icon-park-outline:id-card-h"
          size={20}
          color={'#9ca3af'}
        />
        <TextInput
          className="flex-1"
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          {...props}
        />
      </View>
      {error && (
        <Text className="text-xs font-semibold text-right text-red-500 mr-2 mt-0.5">
          required
        </Text>
      )}
    </View>
  );
};

export default Input;
