import './App.css';
import { Box, Container, makeStyles } from '@material-ui/core';
import Login from './Login/login';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundImage: "linear-gradient(to right, #77A1D3,#79CBCA)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
}))

const App = () => {

  const classes = useStyles()

  return (
    <Container maxWidth="xl" className={classes.main}>
      <Login/>
    </Container>
  );
}

export default App;
