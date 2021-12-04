import Nav from "./Nav"
import Footer from "./Footer"
const Layout = ({children}) => {
    return (
        <div className="king">
            <Nav />
           {children} 
           <Footer />
        </div>
    )
}

export default Layout
