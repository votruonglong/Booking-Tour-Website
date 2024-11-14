// sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  activeKey: "",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
    },
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { toggleSidebar, setActiveKey, setCollapsed } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
