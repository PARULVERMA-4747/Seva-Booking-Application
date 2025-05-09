    import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latestOrders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLatestOrders(state, action) {
      state.latestOrders = action.payload;
    },
  },
});

export const { setLatestOrders } = orderSlice.actions;
export default orderSlice.reducer;
