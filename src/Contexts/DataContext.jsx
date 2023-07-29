import { createContext, useContext, useReducer } from "react";
import { VideoReducer } from "../Reducer/VideoReducer";

export const DataContext = createContext();

const initialState = {
  video: [],
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideoReducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
