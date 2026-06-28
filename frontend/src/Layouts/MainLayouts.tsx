// Outlet is a special React Router component.It tells React:
// "Render the current child page here."
import{Outlet} from "react-router-dom"; 
// We're importing reusable components that we created earlier.
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

// Creates a React component.
function MainLayout() {
    return (
        <>
        {/* Represents the top navigation. */}
        <Navbar />
        {/* Represents Sidebar. */}
        <Sidebar />
        <main>
            {/* React replaces ONLY this component. */}
            <Outlet />
        </main>
        </>
    );
}
export default MainLayout;