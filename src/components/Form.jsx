import { useEffect, useState, useReducer } from "react";
import PastResults from "./PastResults";

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

  const initialState = {
    width: '300',
    height: '300',
    isChecked: false,
    sliderLevel: 0,
    selectedOption: '.jpg',
    id: 0,
    url: 'https://picsum.photos/300/300'
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const [past, setPast] = useState([]);


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


// FUNCTION TO GENERATE A NEW IMAGE

  const handleSubmit = (e) => {
    e.preventDefault();

    let newId = Math.floor(Math.random() * 1085);
    dispatch({type: 'ID_CHANGE', payload: newId})

    console.log(newId)
    
    if(state.isChecked && state.sliderLevel === 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${newId}/${state.width}/${state.height}?grayscale` })
    }
    else if (state.isChecked && state.sliderLevel !== 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${newId}/${state.width}/${state.height}?grayscale&blur=${state.sliderLevel}` })
    }
    else if (!state.isChecked && state.sliderLevel !== 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${newId}/${state.width}/${state.height}?blur=${state.sliderLevel}` })
    } else {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${newId}/${state.width}/${state.height}` })
    }
    let newPast = [newId, ...past];
    const limitedPast = newPast.slice(0, 5);
    setPast(limitedPast)

    console.log(state.url)
    console.log('Width:', state.width, 'Height:', state.height, 'Id:', state.id, 'Is Checked:', state.isChecked, 'Blur:', state.sliderLevel, 'Selected Option:', state.selectedOption);
  };


// FUNCTION TO APPLY CHANGES TO THE EXISTING IMAGE

  const handleApply = (evt) => {
    evt.preventDefault();

    console.log(state.id)

    if(state.isChecked && state.sliderLevel === 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${state.id}/${state.width}/${state.height}?grayscale` })
    }
    else if (state.isChecked && state.sliderLevel !== 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${state.id}/${state.width}/${state.height}?grayscale&blur=${state.sliderLevel}` })
    }
    else if (!state.isChecked && state.sliderLevel !== 0) {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${state.id}/${state.width}/${state.height}?blur=${state.sliderLevel}` })
    } else {
        dispatch({ type: 'URL_CHANGE', payload: `https://picsum.photos/id/${state.id}/${state.width}/${state.height}` })
    }

  }


  const pastApply = (id) => {
    dispatch( { type: 'URL_CHANGE', payload: `https://picsum.photos/id/${id}/${state.width}/${state.height}` } )
    dispatch( {type: 'ID_CHANGE', payload: id} )
  }


    return ( 
        <div> 
            <div className="flex flex-row flex-wrap justify-center w-full">
                
                <div className="flex  justify-center w-22 mr-0 sm:mr-2 bg-white border border-gray-200 rounded-lg shadow px-8 pt-8 mt-6">
                    <form onSubmit={handleSubmit}>
                    
                        <div className="flex flex-row justify-center gap-4 mb-6">
                            
                            <div className="flex flex-row gap-4">
                                <label htmlFor="small-input" className="block mt-1 text-sm font-medium text-gray-900 ">Width:</label>
                                <input 
                                type="number" 
                                id="small-input" 
                                className="block w-16 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required
                                value={state.width}
                                onChange={(e) => dispatch({ type: 'SET_WIDTH', payload: e.target.value })}
                                />
                                
                            </div>
                            <div className="flex flex-row gap-4">
                                <label htmlFor="small-input" className="block mt-1 text-sm font-medium text-gray-900 ">Height:</label>
                                <input type="number" 
                                id="small-input" 
                                className="block w-16 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " 
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
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
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
                                <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <div className="relative flex items-start w-full">
                                    <div className="flex items-center h-5">
                                        <input 
                                        id="hs-horizontal-list-group-item-radio-1" 
                                        name="hs-horizontal-list-group-item-radio" 
                                        type="radio" 
                                        className="border-gray-200 rounded-full " 
                                        checked={state.selectedOption === '.jpg'}
                                        onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.jpg' })} 
                                        />
                                    </div>
                                    <label htmlFor="hs-horizontal-list-group-item-radio-1" className="ml-3 block w-full text-sm text-gray-600 dark:text-gray-500">
                                        .jpeg
                                    </label>
                                    </div>
                                </li>

                                <li className="inline-flex items-center gap-x-2.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <div className="relative flex items-start w-full">
                                    <div className="flex items-center h-5">
                                        <input 
                                        id="hs-horizontal-list-group-item-radio-2" 
                                        name="hs-horizontal-list-group-item-radio" 
                                        type="radio" 
                                        className="border-gray-200 rounded-full"
                                        checked={state.selectedOption === '.webp'}
                                        onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.webp' })} 
                                        
                                        />
                                    </div>
                                    <label htmlFor="hs-horizontal-list-group-item-radio-2" className="ml-3 block w-full text-sm text-gray-600 dark:text-gray-500">
                                        .webp
                                    </label>
                                    </div>
                                </li>
                            </ul>
                            <div className="hidden p-4 peer-checked/jpg:block">Use jpg for your design project.</div>
                            <div className="hidden p-4 peer-checked/webp:block">Use webp for websites.</div>


                            <fieldset>
                                
                                <div className="flex flex-column justify-center items-center">
                                    <input 
                                    value=".jpg" 
                                    id="jpg" 
                                    className="hidden peer/jpg" 
                                    type="radio" 
                                    name="status"
                                    checked={state.selectedOption === '.jpg'}
                                    onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.jpg' })} 
                                    />
                                    <label htmlFor="jpg" className="hidden ml-1 peer-checked/jpg:text-sky-500">.jpg</label>

                                    <input 
                                    value=".webp" 
                                    id="webp" 
                                    className="hidden ml-3 peer/webp" 
                                    type="radio" 
                                    name="status" 
                                    checked={state.selectedOption === '.webp'}
                                    onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.webp' })} 
                                    />
                                    <label htmlFor="webp" className=" hidden ml-1 peer-checked/webp:text-sky-500">.webp</label>
                                    
                                        <div className="hidden p-4 peer-checked/jpg:block">jpg is a widely used compressed image</div>
                                        <div className="hidden p-4 peer-checked/webp:block">webp can be up to 34% smaller than jpg</div>

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
                    <div className="flex justify-center w-full h-full px-2 pt-4"><img className="" src={state.url} alt=""  /></div>
                    <div className="flex justify-center">
                            <button type="submit" className="border-b-4 border-gray-400 mt-4 mb-8 bg-gray-300 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                                <span>Download</span>
                            </button>
                            <button onClick={handleApply}  className="ml-4 mt-4 mb-8 bg-cyan-500 hover:bg-cyan-300 text-white font-bold py-2 px-4 border-b-4 border-cyan-600 hover:border-cyan-400 rounded">
                                Copy 
                            </button>
                    </div>
                </div>
            </div>
            
            
                <PastResults past={past} click={pastApply}/>
            </div>

     );
}

export default Form;