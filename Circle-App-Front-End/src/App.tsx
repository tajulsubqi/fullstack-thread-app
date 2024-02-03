import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom"
import Home from "./pages/home"
import DetailThread from "./pages/detail-thread"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import { useDispatch } from "react-redux"
import { API, seAuthToken } from "./libs/api"
import { useEffect, useState } from "react"
import { AUTH_CHECK, AUTH_ERROR } from "./store/RootReducer"
import Follow from "./pages/follow"
import ProfilePage from "./pages/profile/Profile"
import SearchPage from "./pages/search/SearchPage"
import EditProfile from "./pages/edit-profile/index"

export default function App() {
  // const auth = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function authCheck() {
    try {
      seAuthToken(localStorage.token)
      const response = await API.get("/auth/check")

      dispatch(AUTH_CHECK(response.data.user))
      setIsLoading(false)
    } catch (err) {
      dispatch(AUTH_ERROR())
      console.log("auth check error", err)
      setIsLoading(false)
      navigate("/login")
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck()
    } else {
      setIsLoading(false)
    }
  }, [])

  function IsNotLogin() {
    if (!localStorage.token) {
      return <Navigate to="/login" />
    } else {
      return <Outlet />
    }
  }

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<IsNotLogin />}>
            <Route path="/" element={<Home />} />
            <Route path="thread/:id" element={<DetailThread />} />
          </Route>

          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  )
}
