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
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-column gap-4">
                        <div className="flex flex-column gap-4">
                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Width</label>
                            <input 
                            type="number" 
                            id="small-input" 
                            className="block w-16 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required
                            value={state.width}
                            onChange={(e) => dispatch({ type: 'SET_WIDTH', payload: e.target.value })}
                            />
                            
                        </div>
                        <div className="flex flex-column gap-4">
                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 ">Height</label>
                            <input type="number" 
                            id="small-input" 
                            className="block w-16 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " 
                            required
                            value={state.height}
                            onChange={(e) => dispatch({ type: 'SET_HEIGHT', payload: e.target.value })}
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                        <input  
                        id="checkbox-1" 
                        type="checkbox" 
                        value="" 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                        checked={state.isChecked}
                        onChange={() => dispatch({ type: 'B&W_CHECKBOX' })}
                        />
                        <label htmlFor="checkbox-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Make it Black & White</label>
                    </div>

                    <div>
                        Blur Level: {state.sliderLevel}
                        <input
                        type="range"
                        min={0}
                        max={10}
                        step={1}
                        value={state.sliderLevel}
                        onChange={(e) => dispatch({ type: 'BLUR_LEVEL', payload: parseInt(e.target.value) })}
                        />
                    </div>

                    <fieldset>
                        <legend>File format</legend>

                        <input 
                        value=".jpg" 
                        id="jpg" 
                        className="peer/jpg" 
                        type="radio" 
                        name="status"
                        checked={state.selectedOption === '.jpg'}
                        onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.jpg' })} 
                        />
                        <label htmlFor="jpg" className="peer-checked/jpg:text-sky-500">.jpg</label>

                        <input 
                        value=".webp" 
                        id="webp" className="peer/webp" 
                        type="radio" 
                        name="status" 
                        checked={state.selectedOption === '.webp'}
                        onChange={() => dispatch({ type: 'FILE_OPTION', payload: '.webp' })} 
                        />
                        <label htmlFor="webp" className="peer-checked/webp:text-sky-500">.webp</label>

                        <div className="hidden peer-checked/jpg:block">Use jpg for your design project.</div>
                        <div className="hidden peer-checked/webp:block">Use webp for websites.</div>
                    </fieldset>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Generate a new image
                    </button>
                    
                </form>
                <button onClick={handleApply}  className="bg-cyan-500 hover:bg-cyan-300 text-white font-bold py-2 px-4 border-b-4 border-cyan-600 hover:border-cyan-400 rounded">
                        Apply to this image
                    </button>
                <div><img src={state.url} alt=""  /></div>

                <PastResults past={past} click={pastApply}/>
            </div>

     );
}

export default Form;