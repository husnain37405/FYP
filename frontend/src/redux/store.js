// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { donationApi } from './features/donation/donationApi.js';
// import { donationReducer } from './features/donation/donationSlice.js';
// import { projectApi } from './features/project/projectApi';
// import { projectReducer } from './features/project/projectSlice';
// import { authApi } from './features/auth/authApi.js';
// import { authReducer } from './features/auth/authSlice.js';
// import { userApi } from './features/user/userApi.js';
// // import { userReducer } from './features/user/userSlice.js';
// import { requestApi } from './features/request/requestApi.js';
// import { requestReducer } from './features/request/requestSlice.js';
// import { accountApi } from './features/account/accountApi.js';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: 'user',
//   storage,
// }
// const rootReducer = combineReducers({
//   [projectApi.reducerPath]: projectApi.reducer, 
//     projects: projectReducer,                    
//     [donationApi.reducerPath]: donationApi.reducer, 
//     donation: donationReducer,                      
//     [authApi.reducerPath]: authApi.reducer,         
//     auth: authReducer,                              
//     [userApi.reducerPath]: userApi.reducer,         
//     // user: userReducer,                             
//     [requestApi.reducerPath]: requestApi.reducer,   
//     requests: requestReducer,                       
//     [accountApi.reducerPath]: accountApi.reducer,
// })
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       authApi.middleware,
//       userApi.middleware,
//       requestApi.middleware,
//       projectApi.middleware,
//       donationApi.middleware,
//       accountApi.middleware
//     ),
// });

// export const persistor = persistStore(store);


import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { donationApi } from './features/donation/donationApi.js';
import { donationReducer } from './features/donation/donationSlice.js';
import { projectApi } from './features/project/projectApi';
import { projectReducer } from './features/project/projectSlice';
import { authApi } from './features/auth/authApi.js';
import { authReducer } from './features/auth/authSlice.js';
import { userApi } from './features/user/userApi.js';
import { requestApi } from './features/request/requestApi.js';
import { requestReducer } from './features/request/requestSlice.js';
import { accountApi } from './features/account/accountApi.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'user',
  storage,
};

const rootReducer = combineReducers({
  [projectApi.reducerPath]: projectApi.reducer,
  projects: projectReducer,
  [donationApi.reducerPath]: donationApi.reducer,
  donation: donationReducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [requestApi.reducerPath]: requestApi.reducer,
  requests: requestReducer,
  [accountApi.reducerPath]: accountApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['_persist'], // Ignore Persist-related non-serializable values
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      requestApi.middleware,
      projectApi.middleware,
      donationApi.middleware,
      accountApi.middleware
    ),
});

export const persistor = persistStore(store);


