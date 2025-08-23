import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Order = {
  id: string;
  status: string;
  total: number;
  customer: string;
  createdAt: string;
};
const slice = createSlice({
  name: "orders",
  initialState: { recent: [] as Order[] },
  reducers: {
    setRecent: (s, a: PayloadAction<Order[]>) => {
      s.recent = a.payload;
    },
    addOrder: (s, a: PayloadAction<Order>) => {
      s.recent.unshift(a.payload);
    },
  },
});
export const { setRecent, addOrder } = slice.actions;
export default slice.reducer;
