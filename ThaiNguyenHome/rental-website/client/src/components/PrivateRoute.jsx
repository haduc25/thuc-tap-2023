import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    // để check `user` hiện tại
    const { currentUser } = useSelector((state) => state.user);
    // console.log('currentUser: ', currentUser);

    return currentUser ? <Outlet /> : <Navigate to="sign-in" />;

    /** 
        const { currentUser } = useSelector((state) => state.user);
        Sử dụng hook useSelector từ thư viện React Redux để lấy dữ liệu từ Redux store.
        Trong trường hợp này, nó lấy thông tin người dùng từ trạng thái Redux (state.user) và lưu vào biến currentUser.
        
        return currentUser ? <Outlet /> : <Navigate to="sign-in" />;
        Kiểm tra xem currentUser có giá trị hay không.
        Nếu có (tức là người dùng đã đăng nhập), thì hiển thị nội dung của <Outlet /> (đây có thể là nơi hiển thị nội dung chính của ứng dụng).
        Nếu không (người dùng chưa đăng nhập), thì chuyển hướng đến trang đăng nhập (<Navigate to="sign-in" />).
    
        => nếu có user thì cho phép truy cập vào: <Route path="/profile" element={<Profile />} /> (profle)
            ngược lại thì vào trang (sign-in)
    */
}
