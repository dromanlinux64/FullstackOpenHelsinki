const Filter = (propes)=>{
    const {filtro,handleFiltroChange} = propes
    return(    
    <div>
    filter shown with: <input value={filtro} onChange={handleFiltroChange}/>
  </div>
    )
}

export default Filter