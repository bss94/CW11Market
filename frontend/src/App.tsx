import {Route, Routes} from 'react-router-dom';
import Layout from './UI/Layout/Layout.tsx';
import Register from './features/Users/Register.tsx';
import Login from './features/Users/Login.tsx';
import {Typography} from '@mui/material';


const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
      </Routes>
    </Layout>
  )
};

export default App
