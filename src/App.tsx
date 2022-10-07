import React from 'react';
import logo from './logo.svg';
import './App.css';

// /* s01-fixed */
// import FixedPosition from "./components/s01-fixed/example01";

// /* s02-fade */
// import AppBarWithButtons from "./components/s02-fade/example01";

// /* s03-abstraction */
// import CustomAppBar from "./components/s03-abstraction/example01";

/* s04-withNavigation */
import {BrowserRouter} from "react-router-dom";
import WithNavigation from "./components/s04-withNavigation/example01";

function App() {
  // /* s01-fixed */
  // return (
  //     <>
  //       <FixedPosition />
  //     </>
  // );

  // /* s02-fade */
  // return (
  //     <>
  //         <AppBarWithButtons />
  //     </>
  // );

  // /* s03-abstraction */
  // return (
  //     <>
  //         <CustomAppBar />
  //     </>
  // );

  /* s04-withNavigation */
  return (
      <BrowserRouter>
        <WithNavigation />
      </BrowserRouter>
  );
}

export default App;
