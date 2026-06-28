// Defines a reusable React component.Anywhere in the app, you can render:
function Navbar() {
    return ( 
//This is semantic HTML.
// It tells browsers and assistive technologies that this section is the page header.
// Using semantic HTML improves accessibility and SEO.
        <header>
            Navbar
        </header>
    );
}
// Makes the component available for import in other files.
export default Navbar;