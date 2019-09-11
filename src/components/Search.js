import React, { useState } from 'react'

const Search = (props) => {
   const [searchValue,setSearchValue] = useState('')

   const handleChange = e => {
      setSearchValue(e.target.value)
   }

   const handleSubmit = e => {
      e.preventDefault()
      props.search(searchValue)
      setSearchValue('')
   }

   return (
     <form className="search" onSubmit={handleSubmit}>
       <input
          value={searchValue}
          onChange={handleChange}
          type="text"
        />
       <input type="submit" value="Search"/>
     </form>
   );
}

export default Search;
