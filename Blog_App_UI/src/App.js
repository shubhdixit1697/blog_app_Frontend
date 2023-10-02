import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import Base from './Components/Base';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import About from './Pages/About';
import Services from './Pages/Services';
import Contactus from './Pages/Contactus';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserDashboard from './Pages/Routes/UserDashboard';
import PrivateRoute from './Components/PrivateRoute';
import ProfileInfo from './Pages/Routes/ProfileInfo';
import NewFeed from './Components/NewFeed';
import PostPage from './Pages/PostPage';
import userProvider from './context/userProvider';
import Categories from './Pages/Categories';
import UpdateBlog from './Pages/UpdateBlog';

function App() {
  return (
    <userProvider>
    <BrowserRouter>
    <ToastContainer position='bottom-center' />
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/about" element={<About></About>}></Route>
      <Route path="/services" element={<Services></Services>}></Route>
      <Route path="/contactus" element={<Contactus></Contactus>}></Route>
      <Route path="/newfeed" element={<NewFeed></NewFeed>}></Route>
      <Route path="/posts/:postId" element={<PostPage></PostPage>}></Route>
      <Route path="/categories/:categoryId" ekement={<Categories></Categories>}></Route>

      <Route path="/user" element={<PrivateRoute />}>
        <Route path="dashboard" element={<UserDashboard></UserDashboard>} />
        <Route path="profile-info/:userId" element={<ProfileInfo></ProfileInfo>} />
        <Route path="update-blog/:blogId" element={<UpdateBlog></UpdateBlog>} />
      </Route>

    </Routes>
    </BrowserRouter>
    </userProvider>

  );
}

export default App;
