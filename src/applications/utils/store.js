import {configureStore} from '@reduxjs/toolkit';
import {contactService} from '../services/contact';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [contactService.reducerPath]: contactService.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactService.middleware),
});

setupListeners(store.dispatch);
// export default store;
