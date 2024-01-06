import './App.css';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyBlog from './Pages/SurveyBlock.tsx';
import ImageBlog from './Pages/ImageBlock.tsx';
import VideoBlog from './Pages/VideoBlock.tsx';
// import SideNavBar from './Layouts/SideNavBar';
import Analytics from './Pages/Analytics';
import SideNavBar from './Layouts/SideNavBar.tsx';
import AnalyticsBlockTest from './Pages/AnalyticsBlockTest.jsx';


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
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/blocks/:id' element={<AnalyticsBlockTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
