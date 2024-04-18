import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Headers from '../components/headers.components';
import Input from '../components/input.components';
import {Controller, useForm} from 'react-hook-form';
import {useStoreContactMutation} from '../../applications/services/contact';
import {goBack} from '../../applications/utils/rootNavigation';

const Create = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    postData(data);
  };
  const [postData, {isSuccess, isError, isLoading, error}] =
    useStoreContactMutation();

  console.log(isError, error);
  return (
    <>
      <SafeAreaView>
        <Modal visible={isLoading} transparent={true} animationType="slide">
          <View className="absolute h-screen w-full bg-black/50 items-center justify-center">
            <ActivityIndicator size="large" color="#fff" />
            <Text className="font-bold text-lg mt-2 text-white">Loading</Text>
          </View>
        </Modal>

        <Modal visible={isSuccess} transparent={true} animationType="slide">
          <View className="absolute h-screen w-full bg-white/30 items-center justify-center">
            <View className="bg-white shadow px-8 py-6 w-3/5 rounded-md">
              <Text className="text-center font-bold text-lg">Success</Text>
              <Text className="text-center font-light text-lg">
                added success
              </Text>
              <TouchableOpacity onPress={() => goBack()}>
                <View className="bg-blue-400 rounded-md py-2 justify-center items-center mt-6">
                  <Text className="text-white font-bold uppercase ">Oke</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <StatusBar barStyle="default" />
        <Headers backButton title="Add Contact" />

        <View className="bg-white h-full px-4 space-y-4">
          <Controller
            control={control}
            rules={{
              required: true,
              messahe: 'required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                //   onBlur={onBlur}
                label="first name"
                placeholder="your first name"
                error={errors.firstName}
              />
            )}
            name="firstName"
          />

          <Controller
            control={control}
            rules={{
              required: true,
              message: 'required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="last name"
                placeholder="your first name"
                error={errors.lastName}
              />
            )}
            name="lastName"
          />

          <Controller
            control={control}
            rules={{
              required: true,
              message: 'required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="age"
                placeholder="your age"
                error={errors.age}
              />
            )}
            name="age"
          />

          <Controller
            control={control}
            rules={{
              required: true,
              message: 'required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Photo"
                placeholder="place url photo"
                error={errors.photo}
              />
            )}
            name="photo"
          />

          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <View className="p-2 rounded-md bg-blue-400 justify-center items-center">
              <Text className="text-white font-bold text-lg">Simpan</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Create;
