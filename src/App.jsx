import Sidebar from "./component/Sidebar"
import HomePage from "./pages/HomePage"
import {Route, Routes} from 'react-router-dom'
import FavoritesPage from "./pages/FavoritesPage"


function App() {
  return (
    <div className="flex">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/favorites" element={<FavoritesPage />}/>
      </Routes>
    </div>
  )
}

export default App
