import './App.css';
import MainComponent from "./components/mainComponent/MainComponent";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Table from "./page/Table"
import Otchet from "./page/Otchet"
import About from "./page/About";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div>
            <Router>
                <div>
                    <Routes>
                        <Route exact path='/' element={<About/>}></Route>
                        <Route path='/Table' element={<Table/>}/>
                        <Route path='/Otchet' element={<Otchet/>}/>
                        <Route path='/Forma' element={<MainComponent/>}/>
                    </Routes>
                </div>
            </Router>
        </div>

    );
}

export default App;