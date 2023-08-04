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
        <div className="flex flex-wrap gap-8 mt-5 justify-center">
          
            {dataFromLocalStorage.map((item, index) => (
                <div key={index} className="flex">
                    <div value={item} onClick={(e) => handleClick(item)} className=" w-28 md:w-28 justify-center items-center bg-white shadow-lg rounded-lg flex flex-col transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:bg-cyan-300 cursor-pointer">
                        <img src={`https://picsum.photos/id/${item}/80/60`} alt="img"  className="w-full h-auto object-cover rounded-t-lg " />
                        <div className="w-full p-3">
                        </div>
                    </div>
                </div>
            ))}
        </div>
     );
}

export default PastResults;