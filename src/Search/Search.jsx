import React from 'react'
import {universalContext} from '../Context/Context';
function Search(){
    const{results, setResults}= universalContext();

    return(
    <div>
        <div className="text-stone-50">Search here for any crypto</div>
        <div>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input type="text" placeholder='search' value={results} 
                onChange={(e)=>setResults(e.target.value)} className='text-white'/>

            </form>
        </div>
    </div>
    )
}

export default Search