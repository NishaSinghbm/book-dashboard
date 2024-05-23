import { Container, Typography } from "@mui/material";
import "./App.css";
import BookTable from "./components/bookTable";

function App() {
  return (
    <div className="App">
      <Container>
        <Typography variant="h4" gutterBottom m={5}>
          Admin Dashboard - Book Records
        </Typography>
        <BookTable />
      </Container>
    </div>
  );
}

export default App;
