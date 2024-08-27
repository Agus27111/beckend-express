import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import RefreshToken from "../auth/RefreshToken";

export const getContactList = createAsyncThunk(
  "contact/getContactList",
  async () => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await RefreshToken();
      const response = await axios.get("/api/contacts", {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      const data = JSON.parse(error.request.response);
      throw new Error(data.errors[0] ? data.errors[0] : error.message);
    }
  }
);

export const addKontak = createAsyncThunk("contact/addKontak", async (data) => {
  try {
    await RefreshToken();
    const response = await axios.post("/api/contacts", data, {
      headers: {
        Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorData = JSON.parse(error.request.response);
    throw new Error(errorData.errors[0] ? errorData.errors[0] : error.message);
  }
});

export const deleteKontak = createAsyncThunk(
  "contact/deleteKontak",
  async (id) => {
    try {
      await RefreshToken();
      const response = await axios.delete(`/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("acessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      const errorData = JSON.parse(error.request.response);
      throw new Error(
        errorData.errors[0] ? errorData.errors[0] : error.message
      );
    }
  }
);

export const detailKontak = createAsyncThunk(
  "contact/detailKontak",
  async (data) => {
    return data;
  }
);

export const updateKontak = createAsyncThunk(
  "contact/updateKontak",
  async (data) => {
    try {
      await RefreshToken();
      const response = await axios.put(
        `/api/contacts/${data.contactId}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + secureLocalStorage.getItem("acessToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      const dta = JSON.parse(error.request.response);
      throw new Error(dta.errors[0] ? dta.errors[0] : error.message);
    }
  }
);

const userSlice = createSlice({
  name: "contact",
  initialState: {
    data: null,
    dataVal: null,
    dataAdd: null,
    dataUpdate: null,
    dataDelete: null,
    loading: false,
    error: null,
    errorAdd: null,
    errorEdit: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // process get contact
      .addCase(getContactList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getContactList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // process add contact
      .addCase(addKontak.pending, (state) => {
        state.loading = true;
        state.errorAdd = null;
      })
      .addCase(addKontak.fulfilled, (state, action) => {
        state.loading = false;
        state.errorAdd = null;
        state.dataAdd = action.payload;
      })
      .addCase(addKontak.rejected, (state, action) => {
        state.loading = false;
        state.errorAdd = action.error.message;
        state.dataAdd = null;
      })

      // process delete contact
      .addCase(deleteKontak.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteKontak.fulfilled, (state, action) => {
        state.loading = false;
        state.dataDelete = action.payload;
      })
      .addCase(deleteKontak.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // process detail contact
      .addCase(detailKontak.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dataAdd = null;
        state.dataUpdate = null;
      })
      .addCase(detailKontak.fulfilled, (state, action) => {
        state.loading = false;
        state.dataVal = action.payload;
        state.dataAdd = null;
        state.dataUpdate = null;
      })

      // process update contact
      .addCase(updateKontak.pending, (state) => {
        state.loading = true;
        state.errorEdit = null;
      })
      .addCase(updateKontak.fulfilled, (state, action) => {
        state.loading = false;
        state.errorEdit = null;
        state.dataUpdate = action.payload;
      })
      .addCase(updateKontak.rejected, (state, action) => {
        state.loading = false;
        state.errorEdit = action.error.message;
        state.dataUpdate = null;
      });
  },
});

export default userSlice.reducer;
