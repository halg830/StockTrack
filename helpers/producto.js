const helpersProducto = {
    precioValido: async(precio)=>{
        if(precio<=0){
            throw new Error('Precio no válido')
        }
    }
}

export default helpersProducto