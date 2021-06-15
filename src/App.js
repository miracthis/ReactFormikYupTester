import './App.css';
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import Content from './layout/Content';

axios.defaults.baseURL="http://localhost:8080/api";

function App() {

  

  return (
    <div className="App">
      <Content/>
    </div>
  );
}

export default App;
