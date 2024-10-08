import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchJsonData } from "./fileUploadAPI"

export interface FileReadState {
  status: "idle" | "loading" | "failed"
  rows: [],
}

const initialState: FileReadState = {
  status: "idle",
  rows:[],
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchFileReadData = createAsyncThunk(
  "FileRead/fetchRead",
  async () => {
    const response = await fetchJsonData()
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const FileReadSlice = createSlice({
  name: "FileRead",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileReadData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchFileReadData.fulfilled, (state, action) => {
        state.status = "idle"
        state.rows = action.payload
      })
      .addCase(fetchFileReadData.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const {  } = FileReadSlice.actions

export const selectReadData = (state: RootState) => state.readFile.rows;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


export default FileReadSlice.reducer
