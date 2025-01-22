import {Routes,Route} from 'react-router-dom'
import Navbarseller from './components/Navbarseller'
import Signup from './pages/seller/Signup'
import Login from './pages/seller/Login'
import Addproduct from './pages/seller/Addproduct'
import Viewproduct from './pages/seller/Viewproduct'
import Navbaradmin from './components/Navbaradmin'
import Viewproducts from './pages/admin/Viewproducts'
import Home from './pages/buyer/Home'
import Cart from './pages/buyer/Cart'
import Homeseller from './pages/seller/Homeseller'
import Orders from './pages/seller/Orders'

//hhhhhhh
function App() {
  //comment

  return (
    <>
    <Routes>
    <Route path="/buyer" element={<Home />} />
    <Route path="/seller" element={<Navbarseller />} ></Route>
    <Route path='/admin' element={<Navbaradmin/>}></Route>
    <Route path="/seller/homeseller" element={<Homeseller />} />
    <Route path="/seller/signupseller" element={<Signup/>} />
    <Route path="/seller/login" element={<Login/>}/>
    <Route path='/seller/addproduct' element={<Addproduct/>} />
    <Route path='/seller/getproductforseller' element={<Viewproduct/>} />
    <Route path='/seller/orders' element={<Orders/>} />
    <Route path='/navbaradmin' element={<Navbaradmin/>} />
    <Route path='/admin/getproductforadmin' element={<Viewproducts/>} />
    <Route path='/buyer/cart' element={<Cart/>}/>

    </Routes>
    </>
  )
}

export default App
