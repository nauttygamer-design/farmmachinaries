import axios from 'axios'
import react, { useState, useEffect } from 'react'
import { use } from 'react'
import{ useNavigate} from 'react-router-dom'
import Carousel from './Carousel'
 const Getproduct = () => {
    let navigate=useNavigate()
    // declare ourstates here 
    const[loading,setLoading]=useState("")
    const[products,setProduct]=useState([])
    const[error,setError]=useState("")
    // function to get product 
    const getproduct= async()=>{
        setLoading("product loadimg...")
        try {
            const response=await axios.get("http://markhiggs.alwaysdata.net/api/getproduct")
            setProduct(response.data)
            setLoading("")
        } catch (error) {
            
        }
    }
    // call the funtion 
    useEffect(()=>{
        getproduct()
    },[])
    console.log(products);
    const imagepath="http://markhiggs.alwaysdata.net/static/images/"
    

    
    return (
        <div className="row g-3">
            {/* caroucel goes here  */}
            <Carousel/>
            <h1 className='text-primary'>Avillable products</h1>
            {/* bind the states "" */}
            <h2 className='text-warning'>{loading}</h2>
            <h2 className='text-danger'> {error}</h2>
            {/* map here  */}
            {products.map(singleproduct=>(

                
                <div className="col-md-3  mb-4">
                    <div className='card shadow h-100 '>

                {/* image goes here  */}
                <img src={imagepath + singleproduct.product_photo} alt="" style={{height:"200px", objectFit:"cover"}}/>
                <div className="card-body">
                    <h2 className='text-success  ' >{singleproduct.product_name}</h2>
                    <p >{singleproduct.product_description}</p>
                    <b className='text-success ' > ksh{singleproduct.product_cost}</b><br />
                    <button className='btn btn-warning w-100' onClick={()=>navigate("/makepayment", {state:{singleproduct}})}>purchase now</button>
                </div>
                    </div>
            </div>
            ))}

        </div>
         
    )
}
export default Getproduct