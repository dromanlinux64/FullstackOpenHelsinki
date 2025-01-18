const Filter = (propes)=>{
    const {filtro,handleFiltroChange} = propes
    return(    
    <div>
    find countries: <input value={filtro} onChange={handleFiltroChange}/>
  </div>
    )
}

export default Filter