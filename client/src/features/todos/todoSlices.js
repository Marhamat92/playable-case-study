import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from './todoServices';

const initialState = {
  todos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//create a todo
export const createTodoSlice = createAsyncThunk('todo/create',
  async (todo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.createTodo(todo, token)
    } catch (error) {
      const message =
        (
          error.message &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getTodosSlice = createAsyncThunk('todos/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.getTodos(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteTodoSlice = createAsyncThunk('todos/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.deleteTodo(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const getTodoSlice = createAsyncThunk('todos/getSingle',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.getTodo(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const updateTodoSlice = createAsyncThunk('todos/update',
  async (todo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.updateTodo(todo._id, todo, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const uploadImageSlice = createAsyncThunk('todos/uploadImage',
  async (image, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.uploadImage(image, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)



export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    reset: (state) => state.initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        createTodoSlice.pending, (state) => {
          state.isLoading = true
        })
      .addCase(
        createTodoSlice.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.todos.push(action.payload)
        }
      )
      .addCase(
        createTodoSlice.rejected, (state, action) => {
          state.isLoading = false
          state.isSuccess = false
          state.message = action.payload
        }
      )
      .addCase(
        getTodosSlice.pending, (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        getTodosSlice.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.todos = action.payload
        }
      )
      .addCase(
        getTodosSlice.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        }
      )
      .addCase(
        deleteTodoSlice.pending, (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        deleteTodoSlice.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.todos = state.todos.filter((todo) => todo._id !== action.payload.id)
        }
      )
      .addCase(
        deleteTodoSlice.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        }
      )
      .addCase(
        getTodoSlice.pending, (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        getTodoSlice.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.todos = action.payload
        }
      )
      .addCase(
        getTodoSlice.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        }
      )
      .addCase(
        updateTodoSlice.pending, (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        updateTodoSlice.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.todos = state.todos.map((todo) => {
            if (todo._id === action.payload._id) {
              return action.payload
            } else {
              return todo
            }
          })
        }
      )
      .addCase(
        updateTodoSlice.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        }
      )
      .addCase(
        uploadImageSlice.pending, (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        uploadImageSlice.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.todos = state.todos.map((todo) => {
            if (todo._id === action.payload._id) {
              return action.payload
            } else {
              return todo
            }
          })
        }
      )
      .addCase(
        uploadImageSlice.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        }
      )
  }
})


export const { reset } = todoSlice.actions
export default todoSlice.reducer