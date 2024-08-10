import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import hackReducer from "../features/hack/hackSlice"
import gcpReducer from "../features/gcp/gcpSlice"
import fileReadReducer from "../features/fileUpload/fileReadSlice"
import fileUploadReducer from "../features/fileUpload/fileUploadSlice"
import storageReducer from "../features/storage/storageSlice"

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    counter: counterReducer,
    hack: hackReducer,
    gcp: gcpReducer,
    fileUpload: fileUploadReducer,
    storage: storageReducer,
    readFile: fileReadReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
