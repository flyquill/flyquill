"use client";

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface DetectionSettings {
  autoDetect: boolean;
  enhancedEdge: boolean;
  keepShadows: boolean;
}

interface RemoveBackgroundState {
  originalImage: string | null;
  detectionSettings: DetectionSettings;
  processedImage: string | null;
  loading: boolean;
}

const initialState: RemoveBackgroundState = {
  originalImage: null,
  detectionSettings: {
    autoDetect: true,
    enhancedEdge: true,
    keepShadows: false,
  },
  processedImage: null,
  loading: false,
};

const removeBackgroundSlice = createSlice({
  name: "removeBackground",
  initialState,
  reducers: {
    setOriginalImage(state, action: PayloadAction<string | null>) {
      state.originalImage = action.payload;
      state.processedImage = null;
    },
    toggleDetectionSetting(state, action: PayloadAction<keyof DetectionSettings>) {
      const key = action.payload;
      state.detectionSettings[key] = !state.detectionSettings[key];
    },
    setProcessedImage(state, action: PayloadAction<string | null>) {
      state.processedImage = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setOriginalImage,
  toggleDetectionSetting,
  setProcessedImage,
  setLoading,
} = removeBackgroundSlice.actions;

export const store = configureStore({
  reducer: {
    removeBackground: removeBackgroundSlice.reducer,
  },
});

// Typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
