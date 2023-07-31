import { Link } from "react-router-dom";


function Header() {
    return ( 
        
    <div>
        <header className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-lg">
            <div className="container w-5/6 flex flex-col items-center justify-between p-3 mx-auto md:flex-row">
                <a className="mb-0">
                    <img className="w-auto h-10" src="src\assets\quickpiclogo2.png" alt="logo" />
                </a>
                <nav className="pl-3 text-base md:ml-auto">
                    <a href="#_" className="hidden  mr-10 font-medium hover:text-blue-500 md:visible">Home</a>
                    <Link className="mr-10 font-medium hover:text-blue-500" to="/">Home</Link>
                    <Link className="mr-10 font-medium hover:text-blue-500" to="/photolibrary">All photos</Link>
                    
                </nav>
                
            </div>
        </header>

    </div>

     );
}

export default Header;