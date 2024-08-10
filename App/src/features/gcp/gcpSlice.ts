import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchBarChartData, fetchChartData, fetchData, fetchColumnChartData, approveGcpDataAPI, rejectGcpDataAPI } from "./GcpAPI"

export interface GcpState {
  status: "idle" | "loading" | "failed"
  rows: any,
  series: any,
  graphDataXAxis: any
  graphDataYAxis: any
  chartData: any
  barChartData: any
  barChartXAxis: any
  columnXChartData: any
  columnYChartData : any
}

const initialState: GcpState = {
  status: "idle",
  rows:[],
  series: [],
  graphDataXAxis: [],
  graphDataYAxis: [],
  chartData: [],
  barChartData: [],
  barChartXAxis: [],
  columnXChartData: [],
  columnYChartData: []
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchGcpData = createAsyncThunk(
  "Gcp/fetchData",
  async () => {
    const response = await fetchData()
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const fetchGcpChartData = createAsyncThunk(
  "Gcp/fetchChartData",
  async () => {
    const response = await fetchChartData()
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const fetchGcpBarChartData = createAsyncThunk(
  "Gcp/fetchBarChartData",
  async () => {
    const response = await fetchBarChartData()
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const fetchGcpColumnChartData = createAsyncThunk(
  "Gcp/fetchColumnChartData",
  async () => {
    const response = await fetchColumnChartData()
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const approveColumGcpData =  createAsyncThunk(
  "Gcp/approveGcpData",
  async (data:any) => {
    const response = await approveGcpDataAPI(data)
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const rejectColumGcpData =  createAsyncThunk(
  "Gcp/rejectGcpData",
  async (data:any) => {
    const response = await rejectGcpDataAPI(data)
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const GcpSlice = createSlice({
  name: "Gcp",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setXaxisData: (state, action: PayloadAction<any>) => {
      state.graphDataXAxis = action.payload
    },
    setYaxisData: (state, action: PayloadAction<any>) => {
      state.graphDataYAxis = action.payload
    },

    setPieSeries: (state, action: PayloadAction<any>) => {
      state.series = action.payload
    },

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchGcpData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchGcpData.fulfilled, (state, action) => {
        state.status = "idle"
        state.rows = action.payload
      })
      .addCase(fetchGcpData.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(fetchGcpChartData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchGcpChartData.fulfilled, (state, action) => {
        state.status = "idle"
        state.chartData = action.payload.rows
      })
      .addCase(fetchGcpChartData.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(fetchGcpBarChartData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchGcpBarChartData.fulfilled, (state, action) => {
        state.status = "idle"
        state.barChartData = action.payload.rows?.map((ele: { cnt: any }) => ele.cnt)
        state.barChartXAxis = action.payload?.rows?.map((ele: { Manual_Review: any }) => ele.Manual_Review)
      })
      .addCase(fetchGcpBarChartData.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(fetchGcpColumnChartData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchGcpColumnChartData.fulfilled, (state, action) => {
        state.status = "idle"
        state.columnXChartData = action.payload.rows?.map((ele: { score: any }) => ele.score)
        state.columnYChartData = action.payload.rows?.map((ele: { cnt: any }) => ele.cnt)
      })
      .addCase(fetchGcpColumnChartData.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { setXaxisData, setYaxisData, setPieSeries } = GcpSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGcpData = (state: RootState) => state.gcp.rows
export const selectXAxisData = (state: RootState) => state.gcp.graphDataXAxis
export const selectYAxisData = (state: RootState) => state.gcp.graphDataYAxis
export const selectChartData = (state: RootState) => state.gcp?.chartData
export const selectSeries = (state: RootState) => state.gcp?.series
export const selectBarChartData = (state: RootState) => state.gcp?.barChartData
export const selectBarChartXAxisData = (state: RootState) => state.gcp?.barChartXAxis

export const selectColumnXChartData = (state: RootState) => state.gcp?.columnXChartData
export const selectColumnYChartData = (state: RootState) => state.gcp?.columnYChartData

export default GcpSlice.reducer
