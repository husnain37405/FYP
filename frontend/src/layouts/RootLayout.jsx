import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function RootLayout() {
    const location = useLocation();
    const hideNavbarFooterRoutes = ['/admin', '/donor-login', '/requester-login', '/donor-signup', '/requester-signup'];
    const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);
    return (
        <div>

            {!shouldHideNavbarFooter && <Navbar />}
            <main>
                <Outlet />
            </main>
            {!shouldHideNavbarFooter && <Footer />}
        </div>
    )
}

export default RootLayout;





