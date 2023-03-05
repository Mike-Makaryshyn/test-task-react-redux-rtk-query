import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './apiSlice';

const store = configureStore({
   reducer:  {[usersApi.reducerPath]: usersApi.reducer },
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware),
   devTools: process.env.NODE_ENV !== 'production',
})

export default store;
