import {configureStore} from '@reduxjs/toolkit';
import {contactService} from '../services/contact';

const store = configureStore({
  reducer: {
    [contactService.reducerPath]: contactService.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactService.middleware),
});

export default store;
