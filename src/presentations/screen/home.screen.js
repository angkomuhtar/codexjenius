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
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from '../../applications/services/contact';
import {SwipeListView} from 'react-native-swipe-list-view';
import {navigate} from '../../applications/utils/rootNavigation';

const Home = ({navigation}) => {
  const [text, setText] = useState('');

  const onChangeText = a => {
    setText(a);
  };

  const {data: contactList, isFetching, refetch} = useGetContactQuery();
  const [deleteContact, {isError, isLoading, error}] =
    useDeleteContactMutation();

  const onRefresh = () => {
    refetch();
  };

  const renderItem = ({item}) => {
    return (
      <View
        key={item.id}
        className="mx-4 mb-3 p-2 rounded-md shadow-sm bg-white">
        <TouchableOpacity>
          <View className="flex-row items-center space-x-5">
            <Image
              source={{
                uri:
                  item.photo == 'N/A' ||
                  item?.photo == '' ||
                  !item.photo.startsWith('http')
                    ? `https://ui-avatars.com/api/?name=${item.firstName} ${item.lastName}&background=0f766e&color=fff`
                    : item.photo,
              }}
              className="h-12 aspect-square rounded-full border border-gray-200 object-contain"
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
      <StatusBar barStyle="default" />
      <Headers
        title={'Contacts'}
        rightButton={
          <TouchableOpacity onPress={() => navigate('create')}>
            <View className="px-4 py-2 rounded-full bg-blue-400 flex flex-row items-center space-x-2">
              <Iconify icon="ph:plus-circle-bold" size={16} color={'#fff'} />
              <Text className="font-bold uppercase text-white text-xs bg-blue">
                Add
              </Text>
            </View>
          </TouchableOpacity>
        }
      />
      <View className="space-y-4 h-full bg-white pb-32">
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
        <View className="px-4">
          <Text className="italic text-xs font-extralight text-right">
            Swipe to update or remove
          </Text>
        </View>

        <SwipeListView
          data={contactList}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View className="px-4 text-center">
              <Text>No data</Text>
            </View>
          )}
          renderHiddenItem={({item}) => (
            <View className="flex-row justify-end mx-4 pt-4 pr-4 space-x-2">
              <TouchableOpacity
                onPress={() => {
                  navigate('edit', {id: item.id});
                }}>
                <View className="p-1.5 rounded-md border border-green-500">
                  <Iconify icon="ic:outline-edit" size={20} color={'green'} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteContact({id: item.id});
                }}>
                <View className="p-1.5 rounded-md border border-red-500">
                  <Iconify icon="ic:outline-delete" size={20} color={'red'} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-130}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
