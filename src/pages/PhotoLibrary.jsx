import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function Library({UseNewLId}) {

    let [currentPage, setCurrentPage] = useState(1)
    let [list, setList] = useState([])
    const [showBackToTop, setShowBackToTop] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        handleAPICall()
      }, [currentPage])

      const handleScroll = () => {
        const shouldShow = window.scrollY > 300;
        setShowBackToTop(shouldShow);
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

     

      const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    

    const totalPages = 10

    async function handleAPICall() {
        try {
          const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=100`);
          const data = await response.json();
          setList(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
      };



      const handleIdChange = (id) => {
        UseNewLId(id)
        navigate('/')
      }



  

    return ( 
    <div className="p-3">
        <div className="flex flex-wrap gap-8 justify-center flex-start items-end py-8 ">
            {list.map((photo, index) => {
                return ( <div className="bg-white border border-gray-200 rounded-lg shadow pb-2" key={index}> 
                
                    <img src={`https://picsum.photos/id/${photo.id}/250`} alt="" /> 
                    
                    <h1 className=" flex flex-row justify-center mt-1 text-sm font-medium text-gray-900">Author: {photo.author}, Id: {photo.id}</h1>
                    
                    <div className="flex flex-col justify-center items-center ">
                    
                    <button 
                    
                    onClick={() => handleIdChange(photo.id)}
                    className="border-b-4 border-gray-400 mt-4 mb-1 bg-gray-300 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                        <span>Use this image</span>
                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                    </button>
                    
                    <div className="flex flex-row justify-center items-center">
                    <a className="text-sm font-medium text-gray-900 inline-flex items-center text-blue-600 hover:underline" href={photo.url}>Original size</a> 
                    </div>
                    
                </div>
                    </div> )
                    
            })}
        </div>
        <nav className="flex justify-center items-end ">
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <button 
                        onClick={() => handleClick(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 mr-2 sm:mr-0 hidden sm:block ">Previous</button>
                </li>

                {[...Array(totalPages)].map((_, index) => (
                    <li key={index}>
                        <button
                        
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700   ${
                            currentPage === index+1 ? 'border-2 border-blue-500' : 'border-gray-300'
                          } `}
                        onClick={() => handleClick(index + 1)}
                    >
                        {index + 1}
                    </button>
                    </li>
                    
                ))}

                <li>
                    <button
                        onClick={() => handleClick(currentPage + 1)}
                        disabled={currentPage === totalPages}  
                        className="flex items-center justify-center px-6 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 hidden sm:block  ">Next</button>
                </li>
            </ul>
        </nav>

        {showBackToTop && (
        <button
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        className=" back-to-top-button !fixed bottom-5 right-5 rounded-full bg-cyan-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg"
        id="btn-back-to-top"
        onClick={handleBackToTop}>
            
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            className="h-4 w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512">
            <path
            fill="currentColor"
            d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path>
        </svg>
    </button>
      )}
        
    </div>
    
    );
}

export default Library;