import React from 'react';
import "./scss/App.scss";
import { ThemeProvider } from './features/Theme/ThemeProvider';
import Main from './features/Main';



function App() {
  return (
     <ThemeProvider>
       <Main/>
     </ThemeProvider>
  );
}

export default App;
