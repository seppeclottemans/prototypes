import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      todos: []
    },
    getters: {
      allTodos: state => state.todos.sort((a, b) => new Date(a.date) - new Date(b.date))
    },
    actions: {
        async saveUser(context, { username, email, password }) {
            const data = {
              username,
              email,
              password,
              timestamp: new Date().getTime()
            }
            try {
              await this.$axios.post('/api/register', data)
            } catch (error) {
              console.error(error)
            }
          },


          async saveTodo(context, { title, description, date }) {
            const user = this.$auth.user
            const data = {
              userId: user.id,
              title,
              description,
              done: false,
              date,
              uploaded: true,
              timestamp: new Date().getTime()
            }
            try {
              await this.$axios.post('/api/todos', data);
              return true;
            } catch (error) {
              return false;
            }
          },

          async getTodos({ commit }) {
            try {
              const res = await this.$axios.get('/api/todos')
              commit('setTodos', { todos: res.data })
              
            } catch (error) {
              console.error(error)
            }
          }
    },
    mutations: {
      setTodos(state, { todos }) {
        state.todos = todos
      },
    }
  })
};



export default createStore