import './App.css';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyBlog from './Pages/SurveyBlog';
import ImageBlog from './Pages/ImageBlog';
import VideoBlog from './Pages/VideoBlog';
import SideNavBar from './Layouts/SideNavBar';


function App() {
  return (
    <div className="App">
      <Router>
        <SideNavBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/survey-blog' element={<SurveyBlog />} />
          <Route path='/image-blog' element={<ImageBlog />} />
          <Route path='/video-blog' element={<VideoBlog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
