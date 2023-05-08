import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import EditTodo from './pages/EditTodo'

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </Router>
  )
}

export default Routers