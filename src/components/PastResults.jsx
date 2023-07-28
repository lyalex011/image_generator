import { useState, useEffect} from "react";

function PastResults(props) {

    const { past, click } = props;

    const [dataFromLocalStorage, setDataFromLocalStorage] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('pastimages'));
        if (storedData) {
          setDataFromLocalStorage(storedData);
        }
      }, [past]);

      const handleClick = (item) => {
        click(item)
        console.log(item)
      } 

    return ( 
        <div className="flex gap-8 mt-12 justify-center">
            {dataFromLocalStorage.reverse().map((item, index) => (
                <div key={index} className="flex">
                    <div value={item} onClick={(e) => handleClick(item)} className="w-28 md:w-28 justify-center items-center bg-white shadow-lg rounded-lg flex flex-col transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:bg-sky-200 cursor-pointer">
                        <img src={`https://picsum.photos/id/${item}/80/60`} alt="img"  className="w-full h-auto object-cover rounded-t-lg " />
                        <div className="w-full p-3 justify-start flex flex-col">
                            {/* <button value={item} onClick={handleClick} className="bg-transparent my-2 px-2 py-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" >Use it</button> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
     );
}

export default PastResults;