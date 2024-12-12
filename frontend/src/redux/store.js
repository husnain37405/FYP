import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { donationApi } from './features/donation/donationApi.js';
import { projectApi } from './features/project/projectApi';
import { authApi } from './features/auth/authApi.js';
import { authReducer } from './features/auth/authSlice.js';
import { userApi } from './features/user/userApi.js';
import { requestApi } from './features/request/requestApi.js';
import { accountApi } from './features/account/accountApi.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const resetApiMiddleware = (store) => (next) => (action) => {
  if (action.type === 'auth/authLogout') {
    const reducers = [
      userApi,
      authApi,
      donationApi,
      projectApi,
      requestApi,
      accountApi,
    ];
    reducers.forEach((api) => store.dispatch(api.util.resetApiState()));
  }
  return next(action);
};

const persistConfig = {
  key: 'user',
  storage,
};

const rootReducer = combineReducers({
  [projectApi.reducerPath]: projectApi.reducer,
  [donationApi.reducerPath]: donationApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [requestApi.reducerPath]: requestApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['_persist'],
      },
    }).concat(
      resetApiMiddleware, 
      authApi.middleware,
      userApi.middleware,
      requestApi.middleware,
      projectApi.middleware,
      donationApi.middleware,
      accountApi.middleware
    ),
});

export const persistor = persistStore(store);
