// import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/**
 * persistReducer: Hàm để tạo một reducer có khả năng lưu trữ (persisted reducer).
 * storage: Module định nghĩa cách lưu trữ dữ liệu của Redux state.
 * 
 * ====
 *  const rootReducer = combineReducers({
        user: userReducer,
        });
 * ====
 * `combineReducers` được sử dụng để kết hợp các reducers thành một rootReducer. 
 * Trong trường hợp này, chỉ có một reducer là userReducer được gọi là `user`.

 */

// Combine các reducers thành một rootReducer
const rootReducer = combineReducers({
    user: userReducer,
});

// Cấu hình cho việc lưu trữ dữ liệu (lưu vào localStorage)
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

/** const persistConfig = {...}
 * persistConfig chứa cấu hình cho việc lưu trữ dữ liệu.
 * key là key sẽ được sử dụng để lưu trữ state trong storage, storage là engine để lưu trữ (ở đây sử dụng localStorage),
 * và version là phiên bản cho persisted state (thường được sử dụng khi có các thay đổi cấu trúc dữ liệu).
 *
 */

//  Tạo reducer đã được lưu trữ bằng cách sử dụng persistReducer:
const persistedReducer = persistReducer(persistConfig, rootReducer);
/**
 * Sử dụng `persistReducer` để tạo một reducer đã được lưu trữ.
 * Nó nhận vào persistConfig và rootReducer.
 * Kết quả là persistedReducer sẽ được sử dụng khi tạo Redux store để đảm bảo rằng
 * trạng thái của ứng dụng được lưu trữ qua các phiên làm việc.
 */

// Tạo Redux Store
export const store = configureStore({
    // reducer: { user: userReducer },
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

/**
 * `configureStore`: Sử dụng để tạo một Redux store với cấu hình cụ thể.
 * `reducer`: Truyền vào một object chứa các reducer.
 *      Trong trường hợp này, chỉ có một reducer đã được lưu trữ (persistedReducer).
 * `middleware`: Tùy chọn, sử dụng để cấu hình middleware.
 *      Ở đây, serializableCheck được tắt (false) để tránh cảnh báo về việc sử dụng các đối tượng không thể
 *      `serialize` trong state của Redux.
 *
 */

// Tạo Redux Persist Store
export const persistor = persistStore(store);
/**
 * `persistStore`: Hàm từ redux-persist để tạo một persist store dựa trên Redux store đã được tạo (store).
 * Nó được sử dụng để theo dõi và duy trì trạng thái lưu trữ qua các phiên làm việc.
 */
