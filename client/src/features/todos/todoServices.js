import axios from 'axios';


const API_URL = 'http://localhost:5000/todos/';

//get all todos
const getTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  const response = await axios.get(`${API_URL}list`, config)
  return response.data
}

//get single todo
const getTodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + todoId, config)

  return response.data
}

//create a todo
const createTodo = async (todo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}create`, todo, config)

  if (response.data) {
    return response.data
  }
}

//update a todo
const updateTodo = async (todoId, todo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + todoId, todo, config)
  return response.data
}

//delete a todo
const deleteTodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + todoId, config)
  return response.data
}

//upload image
const uploadImage = async (image, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response = await axios.post(`${API_URL}upload`, image, config)
  return response.data
}

const todoService = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  uploadImage
}

export default todoService;