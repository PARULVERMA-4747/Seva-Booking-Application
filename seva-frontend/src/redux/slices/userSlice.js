import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  otpSent: false,
  isVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setOtpSent(state, action) {
      state.otpSent = action.payload;
    },
    setIsVerified(state, action) {
      state.isVerified = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.otpSent = false;
      state.isVerified = false;
    },
  },
});

export const { setUser, setOtpSent, setIsVerified, logoutUser } = userSlice.actions;
export default userSlice.reducer;
