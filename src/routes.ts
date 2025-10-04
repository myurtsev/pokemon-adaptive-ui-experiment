import Home from './views/Home.vue'
import PokemonDetail from './views/PokemonDetail.vue'

export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' }},
  { path: '/pokemon/:id', component: PokemonDetail, meta: { title: 'Pokemon Detail' }},
]
