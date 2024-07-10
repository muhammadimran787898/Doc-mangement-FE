import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  isAdmin: "true" | "false";
  isDoctor: "true" | "false";
}

interface UserState {
  isAuthenticated: boolean;
  user: User;
}

const initialState: UserState = {
  isAuthenticated: localStorage.getItem("authToken") ? true : false,
  user: localStorage.getItem("authToken")
    ? JSON.parse(localStorage.getItem("user") as any)
    : { name: "", email: "", isAdmin: "", isDoctor: "" },
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: any, action: any) => {
      state.user = action.payload;
    },
    ClearUser: (state: any) => {
      state.user = {
        name: "",
        email: "",
        isAdmin: "",
        isDoctor: "",
      };
    },
  },
});

export const { setUser, ClearUser } = UserSlice.actions;
export default UserSlice.reducer;
