import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import backendAPI from "../../api/BackendApi";
import { toast } from "sonner";
import type { NavigateFunction } from "react-router";

interface User{
    _id : string;
    email : string;
    name?:string;
    token:string;
    uploadCount:number;
    downloadCount:number;
}

interface SignupPayLoad{
    email : string;
    password : string;
}
interface VideoCreatePayLoad{
    title?: string;
    description?: string;
    path: string;
    isPrivate : boolean;
    thumbNail?: string;
}
interface SigninPayLoad{
    email : string;
    password : string;
    navigate : NavigateFunction;
}
interface AuthResponse{
    success: boolean;
    message: string;
    user?: User;
}

export interface AuthState{
    loggedInUser: User | null;
    loading: boolean;
}

const initialState : AuthState = {
    loggedInUser : null,
    loading : false
}



export const SignupUser = createAsyncThunk<
  AuthResponse, // 👈 return type
  SignupPayLoad, // 👈 argument type
  { rejectValue: string }
>("auth/sign-up-user", async (payload, { rejectWithValue }) => {
  try {
    const { email, password } = payload;
    const { data } = await backendAPI.post<AuthResponse>("/api/v1/auth/sign-up", {
      email,
      password,
    });

    if (data.success) {
      toast.success(data.message);
      return data; // ✅ Must return
    } else {
      toast.warning(data.message);
      return rejectWithValue(data.message);
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Signup failed");
    return rejectWithValue(error?.response?.data?.message || "Signup failed");
  }
});

export const VideoCreate = createAsyncThunk<
  AuthResponse, // 👈 return type
  VideoCreatePayLoad, // 👈 argument type
  { rejectValue: string }
>("auth/sign-up-user", async (payload, { rejectWithValue }) => {
  try {
    const { title, description,path,isPrivate,thumbNail } = payload;
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    if (!token) {
      return rejectWithValue("No token found");
    }
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
console.log("CONFIG:", config);
    const { data } = await backendAPI.post<AuthResponse>("/api/v1/form/upload", {
      title, description,path,isPrivate,thumbNail
    },config);

    if (data.success) {
      toast.success(data.message);
      return data; // ✅ Must return
    } else {
      toast.warning(data.message);
      return rejectWithValue(data.message);
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Signup failed");
    return rejectWithValue(error?.response?.data?.message || "Signup failed");
  }
});

export const signInUser = createAsyncThunk<
  string | null, // return type: token or null
  SigninPayLoad, // input
  { rejectValue: string }
>(
  "auth/sign-in-user",
  async (payload, thunkApi) => {
    try {
      const { email, password } = payload;
      const { data } = await backendAPI.post<AuthResponse>("/api/v1/auth/sign-in", {
        email,
        password,
      });

      if (data.success && data.user?.token) {
        toast.success(data.message);
        localStorage.setItem("token", data.user.token);
        return data.user.token;
      } else {
        toast.warning(data.message);
        return thunkApi.rejectWithValue(data.message);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message); // ✅ corrected
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk<
  User | null,                       // return type
  void,                              // argument passed to the thunk (you're not passing anything)
  { rejectValue: string }           // thunk API config
>(
  "auth/fetch-user-details",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkApi.rejectWithValue("No Authorization Token Found");
      }

      const { data } = await backendAPI.get<AuthResponse>("/api/v1/auth/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        return data.user;
      } else {
        return thunkApi.rejectWithValue(data.message);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message); // was `toast.error(error)` which logs `[object Object]`
      return thunkApi.rejectWithValue(message);
    }
  }
);


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers : {
        logOutUser : (state,action)=>{
            const navigate = action.payload
            localStorage.removeItem("token")
            state.loggedInUser = null;
            toast.info("we will miss you")
            navigate("/sign-in")
        },
        updatedUser : (state,action) => {
            const {name,email} = action.payload
            if(state.loggedInUser){
                state.loggedInUser.name = name;
                state.loggedInUser.email = email

            }
        }
    },
    extraReducers : (builder) => {
        builder.addCase(signInUser.pending,(state) => {
            (state.loading = true)
        })
        .addCase(signInUser.fulfilled,(state,action)=>{
            state.loading = false;
        })
        .addCase(signInUser.rejected,(state)=>{
            state.loading = false;  
        })
        .addCase(fetchUserDetails.pending,(state)=>{ state.loading = true})
        .addCase(fetchUserDetails.fulfilled,(state,action)=>{
            state.loggedInUser = action.payload
            state.loading = false
        })
        .addCase(fetchUserDetails.rejected,(state)=>{state.loading = false})
    }
})


export const authReducer = authSlice.reducer;
export const {logOutUser,updatedUser} = authSlice.actions;
export const selectLoggedInUser = (state : RootState) => state.auth.loggedInUser
export const selectLoading = (state : RootState) => state.auth.loading