import React from 'react'
import {universalContext} from '../Context/Context';
function Search(){
    const{results, setResults}= universalContext();

    return(
    <div className='w-full flex flex-col items-center mb-6'>
     
        <div className="text-stone-50 mb-4 text-2xl font-medium">Search here for any crypto</div>
        <div>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input type="text" placeholder='search' value={results} 
                onChange={(e)=>setResults(e.target.value)} className='text-white px-1'/>

            </form>
        </div>
    </div>
    )
}

export default Search