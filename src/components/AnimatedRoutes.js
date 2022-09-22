import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'
import Home from "container/Home";
import Spinner from "./ui/Spinner";
const Dashboard = lazy(() => import('container/Dashboard/Dashboard'))
const SingUpLayout = lazy(() => import('container/SignUp/SignUpLayout'))
const Step1 = lazy(() => import('container/SignUp/Step1'))
const Step2 = lazy(() => import('container/SignUp/Step2'))
const Singin = lazy(() => import('container/Singin/Singin'))
const SignOut = lazy(() => import('components/Auth/SignOut'))
const NotFound = lazy(() => import('components/NotFound'))
const Category = lazy(() => import('container/Dashboard/Category'))
const UpdateMissionModal = lazy(() => import('components/Modals/UpdateMissionModal'))


const AnimatedRoutes = () => {
  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SingUpLayout />}>
              <Route index element={<Step1 />} />
              <Route path="upload-picture" element={<Step2 />} />
            </Route>
            <Route path="/sign-in" element={<Singin />} />
            <Route path="/logout" element={<SignOut />} />
            <Route
              path="/dashboard" element={<Dashboard />} >
              <Route index element={<Category />} />
              <Route path=":category" element={<Category />}>
                <Route path=":missionId" element={<UpdateMissionModal />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />


          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  )
}

export default AnimatedRoutes