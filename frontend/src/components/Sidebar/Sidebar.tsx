// Link is a React Router component for navigation.

// Unlike a normal HTML <a> tag, Link changes the URL without reloading the page.

// This preserves your React application's state and makes navigation much faster.
import {Link} from "react-router-dom";
function Sidebar() {
    return (
        // Represents complementary content—in this case, the sidebar.
        <aside> 
            <nav>
                {/* An unordered list of navigation items.This is both semantic and accessible. */}
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/datasets">Datasets</Link>
                    </li>
                    <li>
                        <Link to="/analysis">Analysis</Link>
                    </li>
                    </ul>
            </nav>
        </aside>
    );
}
export default Sidebar;