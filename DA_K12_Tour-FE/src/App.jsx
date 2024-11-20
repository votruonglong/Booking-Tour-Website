import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import HomePage from './pages/home'
import CustomerLayout from './layouts/CustomerLayout'
import TourMienBac from './pages/tours/tour-mien-bac'
import TourMienTrung from './pages/tours/tour-mien-trung'
import TourMienTay from './pages/tours/tour-mien-tay'
import Register from './pages/register'
import TourDetail from './pages/tours/DetailTour'
import BookingTour from './pages/tours/BookingTour'
import BookingSuccess from './pages/tours/BookingSuccess'
import CancelBooking from './pages/tours/CancelBooking'
import BookingSuccessMomo from './pages/tours/BookingSuccessMomo'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<CustomerLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/mienbac' element={<TourMienBac />} />
          <Route path='/mientrung' element={<TourMienTrung />} />
          <Route path='/mientay' element={<TourMienTay />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/booking/:id" element={<BookingTour />} />
          <Route path="/booking/booking-success/:id" element={<BookingSuccess />} />
          <Route path="/booking/booking-info-momo" element={<BookingSuccessMomo />} />
          <Route path="/cancel-booking" element={<CancelBooking />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
