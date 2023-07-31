function Footer() {
    return ( 
    <footer className="bg-stone-100 rounded-lg shadow m-2 mt-16 ">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center ">© 2023 <a href="#" className="hover:text-blue-500">QuickPicGen</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
            <li>
                <a href="#" className="mr-6 hover:text-blue-500 ">About</a>
            </li>
            <li>
                <a href="#" className="hover:text-blue-500">Contact</a>
            </li>
        </ul>
        </div>
    </footer>
     );
}

export default Footer;