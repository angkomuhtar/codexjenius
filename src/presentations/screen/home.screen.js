import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  PanResponder,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Headers from '../components/headers.components';
import {Iconify} from 'react-native-iconify';
import {useFetchContactQuery} from '../../applications/services/contact';

const Home = ({navigation}) => {
  const [text, setText] = useState('');

  const onChangeText = a => {
    setText(a);
  };

  const [data, setData] = useState([
    {id: '1', text: 'Item 1'},
    {id: '2', text: 'Item 2'},
    {id: '3', text: 'Item 3'},
    {id: '4', text: 'Item4'},
  ]);

  const {data: contactList, isFetching, refetch} = useFetchContactQuery();

  console.log(contactList);

  const onRefresh = () => {
    refetch();
  };

  const handleDeleteItem = id => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  const panResponder = id => {
    let dx = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        dx = gestureState.dx;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (dx > 50) {
          // Swipe right threshold, you can adjust this value
          handleDeleteItem(id);
        }
      },
    });
  };

  const renderItem = ({item}) => {
    return (
      <View
        {...panResponder(item.id).panHandlers}
        className="mx-4 mb-3 p-2 rounded-md shadow-sm bg-white">
        <TouchableOpacity>
          <View className="flex-row items-center space-x-5">
            <Image
              source={{
                uri:
                  item.photo &&
                  item.photo != 'N/A' &&
                  item.photo.startsWith('http')
                    ? item.photo
                    : `https://ui-avatars.com/api/?name=${item.firstName} ${item.lastName}&background=0f766e&color=fff`,
              }}
              className="h-12 aspect-square rounded-full"
            />
            <View className="flex-1">
              <Text className="justify-center font-semibold capitalize text-sm">
                {item.firstName} {item.lastName}
              </Text>
              <Text className="text-xs font-semibold text-gray-500">
                {item.age} years old
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="black" />
      <Headers />
      <View className="space-y-4 h-full bg-white">
        <View className="flex-row items-center bg-gray-200 rounded-md px-4 py-2 mx-4">
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

        <FlatList
          data={contactList}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View className="">
              <Text>No data</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
