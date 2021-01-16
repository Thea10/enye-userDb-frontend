import { configureStore } from '@reduxjs/toolkit';
import FeatureReducer from "../features/components/FeatureSlice";
import SearchReducer from "../features/components/Search/SearchSlice";



export default configureStore({
  reducer: {
    feature: FeatureReducer,
    search: SearchReducer,
  },
});
