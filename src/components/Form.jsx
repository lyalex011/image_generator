import { useEffect, useState, useReducer, useContext } from "react";
import copy from "copy-to-clipboard";
import PastResults from "./PastResults";
import { UserContext } from "../App";
import excludeNumbers from "./ExcludeNumbers";
import { useRef } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
       case 'SET_WIDTH':
            return { ...state, width: action.payload };
       case 'SET_HEIGHT':
            return { ...state, height: action.payload };
       case 'B&W_CHECKBOX':
            return { ...state, isChecked: !state.isChecked };
        case 'BLUR_LEVEL':
            return { ...state, sliderLevel: action.payload };
       case 'FILE_OPTION':
            return { ...state, selectedOption: action.payload };
        case 'ID_CHANGE':
            return {...state, id: action.payload}
        case 'URL_CHANGE':
            return {...state, url: action.payload}

      default:
        return state;
    }
  };
  

function Form() {

let used_id = useContext(UserContext)
const imageRef = useRef(null);

  const initialState = {
    width: '300',
    height: '300',
    isChecked: false,
    sliderLevel: 0,
    selectedOption: '.jpg',
    id: used_id,
    url: `https://picsum.photos/id/${used_id}/300/300`
  };

  

  const [state, dispatch] = useReducer(formReducer, initialState);
  const [past, setPast] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isUsed, setIsUsed] = useState(true);

  useEffect(()=>{
    dispatch({type: 'ID_CHANGE', payload: used_id})
  },[])


  // LOCAL STORAGE 

  useEffect(()=>{
    const addToLocalStorage = () => {
        let prevHistory = JSON.parse(localStorage.getItem('pastimages')) || [];
        if(state.id !== 0) {let newHistory = [state.id, ...prevHistory];
            const limitedHistory = newHistory.slice(0, 5);
            localStorage.setItem('pastimages', JSON.stringify(limitedHistory))}
        
    }
    addToLocalStorage()
    },[state.id])


// FUNCTION TO GENERATE A NEW ID

    function generateRandomNumber() {
        while (true) {
          const randomNumber = Math.floor(Math.random() * 1085)
      
          if (!excludeNumbers.includes(randomNumber)) {
            return randomNumber;
          }
        }
      }

    
// FUNCTION TO GENERATE A NEW IMAGE

  const handleSubmit = (e) => {
    e.preventDefault();

    let newId = generateRandomNumber();
    dispatch({type: 'ID_CHANGE', payload: newId})
    
    if(state.isChecked && state.sliderLevel === 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${newId}/${state.width}/${state.height}?grayscale` })
    }
    
    else if (state.isChecked && state.sliderLevel !== 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${newId}/${state.width}/${state.height}?grayscale&blur=${state.sliderLevel}` })
    }
    
    else if (!state.isChecked && state.sliderLevel !== 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${newId}/${state.width}/${state.height}?blur=${state.sliderLevel}` })
    } 
     else {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${newId}/${state.width}/${state.height}` })
    }

    let newPast = [newId, ...past];
    const limitedPast = newPast.slice(0, 5);
    setPast(limitedPast)
    setIsCopied(false);

    
  };


// FUNCTION TO APPLY CHANGES TO THE EXISTING IMAGE

  const handleApply = (evt) => {
    evt.preventDefault();
    
    if (!isUsed) {
        dispatch({type: 'ID_CHANGE', payload: used_id})
        setIsUsed(false)
    }
    
    

    if(state.isChecked && state.sliderLevel === 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${state.id}/${state.width}/${state.height}?grayscale` })
    }
    
    else if (state.isChecked && state.sliderLevel !== 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${state.id}/${state.width}/${state.height}?grayscale&blur=${state.sliderLevel}` })
    }
    
    else if (!state.isChecked && state.sliderLevel !== 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${state.id}/${state.width}/${state.height}?blur=${state.sliderLevel}` })
    } 
    else {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${state.id}/${state.width}/${state.height}` })
    }

    setIsCopied(false);

  }

  // PAST RESULTS

  const pastApply = (id) => {
    dispatch( { type: 'URL_CHANGE', payload: `https://picsum.photos/id/${id}/${state.width}/${state.height}` } )
    dispatch( {type: 'ID_CHANGE', payload: id} )
  }

// COPY TO CLIPBOARD

const handleCopy = () => {
    if(state.selectedOption === '.webp') {
        let newUrl = state.url + state.selectedOption
        copy(newUrl)
        setIsCopied(true);
    }
    else copy(state.url)
    setIsCopied(true);

  };



// DOWNLOD FILE

  const openInNewTab = (url) => {

    if(state.selectedOption === '.webp') {
        let newUrl = url + state.selectedOption
        window.open(newUrl, "_blank", "noreferrer");
    }
    else window.open(url, "_blank", "noreferrer");
  };




    return ( 
        <div> 
            <div className="flex flex-row flex-wrap justify-center w-full h-full">
                
                <div className="flex  justify-center w-22 mr-0 sm:mr-2 bg-white border border-gray-200 rounded-lg shadow px-8 pt-8 mt-6">
                    <form onSubmit={handleSubmit}>
                    
                        <div className="flex flex-row justify-center gap-4 mb-6">
                            
                            <div className="flex flex-row gap-4">
                                <label htmlFor="small-input" className="block mt-2 text-sm font-medium text-gray-900 ">Width:</label>
                                <input 
                                type="number" 
                                id="small-input" 
                                className="block w-16 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " 
                                required
                                value={state.width}
                                onChange={(e) => dispatch({ type: 'SET_WIDTH', payload: e.target.value })}
                                />
                                
                            </div>
                            <div className="flex flex-row gap-4">
                                <label htmlFor="small-input" className="block mt-2 text-sm font-medium text-gray-900 ">Height:</label>
                                <input type="number" 
                                id="small-input" 
                                className="block w-16 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " 
                                required
                                value={state.height}
                                onChange={(e) => dispatch({ type: 'SET_HEIGHT', payload: e.target.value })}
                                />
                            </div>
                        </div>
                        
                        <div className="flex justify-center items-center mb-6">
                            <input  
                            id="checkbox-1" 
                            type="checkbox" 
                            value="" 
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2 " 
                            checked={state.isChecked}
                            onChange={() => dispatch({ type: 'B&W_CHECKBOX' })}
                            />
                            <label htmlFor="checkbox-1" className="ml-2 text-sm font-medium text-gray-900 ">Make it Black & White</label>
                        </div>

                        <div className="flex justify-center items-center mb-4">
                            <p className="ml-2 text-md font-medium text-gray-900 ">Blur Level: {state.sliderLevel}</p>
                            <input
                            className="flex justify-center items-center ml-4 mt-1"
                            type="range"
                            min={0}
                            max={10}
                            step={1}
                            value={state.sliderLevel}
                            onChange={(e) => dispatch({ type: 'BLUR_LEVEL', payload: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="flex flex-col items-center ">
                            <legend className="ml-2 text-sm font-medium text-gray-900 mt-4">File format</legend>
                            <ul className="flex flex-row mt-4">
                                <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg ">
                                    <div className="relative flex items-start w-full">
                                    <div className="flex items-center h-5">
                                        <input 
                                        id="jpg" 
                                        name="hs-horizontal-list-group-item-radio" 
                                        type="radio" 
                                        className="border-gray-200 rounded-full peer/jpg" 
                                        defaultChecked={state.selectedOption === '.jpg'}
                                        onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.jpg' })} 
                                        />
                                    </div>
                                    <label htmlFor="jpg" className="ml-3 block w-full text-sm text-gray-600 ">
                                        .jpeg
                                    </label>
                                    </div>
                                </li>

                                <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg ">
                                    <div className="relative flex items-start w-full">
                                    <div className="flex items-center h-5">
                                        <input 
                                        id="webp" 
                                        name="hs-horizontal-list-group-item-radio" 
                                        type="radio" 
                                        className="border-gray-200 rounded-full peer/webp"
                                        defaultChecked={state.selectedOption === '.webp'}
                                        onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.webp' })} 
                                        
                                        />
                                    </div>
                                    <label htmlFor="webp" className="ml-3 block w-full text-sm text-gray-600 ">
                                        .webp
                                    </label>
                                    </div>
                                </li>
                            </ul>
                            


                            <fieldset>
                                
                                <div className="flex flex-column justify-center items-center">
                                    <input 
                                    value=".jpg" 
                                    id="jpg" 
                                    className="hidden peer/jpg" 
                                    type="radio" 
                                    name="status"
                                    defaultChecked={state.selectedOption === '.jpg'}
                                    onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.jpg' })} 
                                    />
                                    

                                    <input 
                                    value=".webp" 
                                    id="webp" 
                                    className="hidden ml-3 peer/webp" 
                                    type="radio" 
                                    name="status" 
                                    defaultChecked={state.selectedOption === '.webp'}
                                    onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.webp' })} 
                                    />
                                    
                                    
                                        <div className="hidden text-center p-4 peer-checked/jpg:block">jpg is a widely used compressed image <br /> and recommended for most projects</div>
                                        <div className="hidden text-center p-4 peer-checked/webp:block">webp can be up to 34% smaller<br />but doesn't work with blur settings</div>

                                </div>
                                
                                
                                
                            </fieldset>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-blue-500 mt-4 mb-8 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                Generate a new image
                            </button>
                            <button onClick={handleApply}  className="ml-4 mt-4 mb-8 bg-cyan-500 hover:bg-cyan-300 text-white font-bold py-2 px-4 border-b-4 border-cyan-600 hover:border-cyan-400 rounded">
                                Apply to this image
                            </button>
                        </div>
                       
                    </form>
                    
                </div>





                <div className="flex flex-col justify-center w-22 bg-white border border-gray-200 rounded-lg shadow px-8 py-3 mr-0 sm:mr-2 mt-6 sm:mt-6 md:mt-6">
                    <div className="flex justify-center w-full h-full px-2 pt-4"><img  className="" src={state.url} alt=""  /></div>
                    <div className="flex justify-center">
                            <button role="link"
                                onClick={() => openInNewTab(state.url)} className="border-b-4 border-gray-400 mt-10 mb-8 bg-gray-300 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                                <span>Download</span>
                            </button>
                            <button onClick={handleCopy}  className={isCopied ? "ml-4 mt-10 mb-8 bg-green-500  text-white font-bold py-2 px-4 border-b-4 border-green-600  rounded" : "ml-4 mt-10 mb-8 bg-cyan-500 hover:bg-cyan-300 text-white font-bold py-2 px-4 border-b-4 border-cyan-600 hover:border-cyan-400 rounded"}>
                            {isCopied ? 'Link copied!' : 'Copy link'}
                            </button>
                    </div>
                </div>
            </div>
            
            <h3 className="flex justify-center text-center text-lg font-medium mt-4 text-gray-800">Your last results:</h3>
                <PastResults past={past} click={pastApply}/>
            </div>

     );
}

export default Form;