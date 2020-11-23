import { Container } from "@material-ui/core";
import React from "react";
import "./App.css";
import MDT from "./components/MDT";
import SimpleTabs from "./components/SimpleTabs";
import Stiffness from "./components/Stiffness";

export const globalContext = React.createContext({});

export default function App() {
  return (
    <Container maxWidth="lg">
      <SimpleTabs
        tabs={[
          { label: "Moment Distribution Table", content: <MDT /> },
          { label: "SF & DF", content: <Stiffness /> },
        ]}
      />
    </Container>
  );
}
