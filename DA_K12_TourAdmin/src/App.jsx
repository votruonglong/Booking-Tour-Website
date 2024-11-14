import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import endPoint from "./routers/router";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./components/PrivateRoute";
import DashboardTong from "@pages/dashboard/dashboard-tong";
import DashboardTV from "@pages/dashboard/dashboard-tv";
import CategoriesManagement from "@pages/quan-ly-he-thong/quan-ly-danh-muc";
import UserManagement from "@pages/quan-ly-nguoi-dung";
import Login from "@pages/login";
import Register from "@pages/register";
import DashboardChuyen from "@pages/dashboard/dashboard-chuyen";
import DashboardLoi from "@pages/dashboard/dashboard-loi";
import ToursManagerment from "@pages/quan-ly-he-thong/quan-ly-tour";
import SchedulesManagement from "@pages/quan-ly-he-thong/quan-ly-lich-trinh";
import BookingsManagement from "@pages/quan-ly-he-thong/quan-ly-don-dat-tour";
import PaymentMethodManagement from "@pages/quan-ly-he-thong/quan-ly-phuong-thuc-thanh-toan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={endPoint.LOGIN} element={<Login />} />
        <Route path={endPoint.REGISTER} element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path={endPoint.ALL} element={<AdminLayout />}>
            <Route path={endPoint.DASHBOARD}>
              <Route
                path={endPoint.DASHBOARDTONG}
                element={<DashboardTong />}
              />
              <Route
                path={endPoint.DASHBOARDCHUYEN}
                element={<DashboardChuyen />}
              />
              <Route path={endPoint.DASHBOARDLOI} element={<DashboardLoi />} />
              <Route path={endPoint.DASHBOARDTV} element={<DashboardTV />} />
            </Route>
            <Route path={endPoint.QUANLY}>
              <Route
                path={endPoint.QUANLYDANHMUC}
                element={<CategoriesManagement />}
              />
              <Route
                path={endPoint.QUANLYTOUR}
                element={<ToursManagerment />}
              />
              <Route
                path={endPoint.QUANLYLICHTRINH}
                element={<SchedulesManagement />}
              />
              <Route
                path={endPoint.QUANLYDATTOUR}
                element={<BookingsManagement />}
              />
              <Route
                path={endPoint.QUANLYPHUONGTHUCTHANHTOAN}
                element={<PaymentMethodManagement />}
              />
            </Route>

            <Route
              path={endPoint.QUANLYNGUOIDUNG}
              element={<UserManagement />}
            />
            <Route path={endPoint.LOGIN} element={<Login />} />
            <Route path={endPoint.REGISTER} element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
