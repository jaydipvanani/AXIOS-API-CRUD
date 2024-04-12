import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'


const Axios2 = () => {

    let title = useRef()
    let price = useRef()
    let description = useRef()

    let [data, setData] = useState([])
    let [view, setview] = useState({})

    let api = () => {
        axios.get("http://localhost:4000/product").then((res) => {
            setData(res.data)
            // console.log(res.data);
        })
    }

    useEffect(() => {
        api();
    }, [])


    let submit = () => {
        var obj = {
            "title": title.current.value,
            "price": price.current.value,
            "description": description.current.value
        }
        axios.post("http://localhost:4000/product", obj).then((res)=>{

            setData([...data, res.data])
        })

    }




    const deletedata = (id) => {
        axios.delete(`http://localhost:4000/product/${id}`).then((res) => {
            // console.log(res);
            setData(data.filter(val => val.id !== id));

        })
    }


    const viewData = (index) => {

        // console.log("hello");
        // console.log(index);
        let userupdate = data[index]

        setview(userupdate)

    }

    let handleview = (e) => {
        setview({...view,[e.target.name]: e.target.value})

    }

    let handleupdate = ()=>{
       axios.put(`http://localhost:4000/product/${view.id}`,  view).then((res)=>{
        setData(data.map((val,ind)=>{
            if(val.id == res.data.id){
                return res.data
            }
            else{
                return val
            }
        }))
       })
    
      }




    return (
        <>
            <input type="text" ref={title} placeholder='title' />
            <input type="text" ref={price} placeholder='price' />
            <input type="text" ref={description} placeholder='Description' />
            <button onClick={submit}>Submit</button>



            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">

                            </button>
                        </div>
                        <div class="modal-body">
                            <input type="text" placeholder='title' value={view.title} name='title' onChange={handleview} /><br />
                            <input type="text" placeholder='price' value={view.price} name='price' onChange={handleview} /><br />
                            {/* <input type="text" placeholder='Description' value={view.description} /> */}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleupdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>


            {
                data?.map((val, ind) => {
                    return (
                        <div class="card padding">
                            <h5 class="card-header">{val.title}</h5>
                            <div class="card-body">
                                <h5 class="card-title">{val.description}</h5>
                                <p class="card-text">{val.price}</p>
                                <button onClick={() => deletedata(val.id)} class="btn btn-primary m-3">delete</button>
                                {/* <button  class="btn btn-primary m-3">view</button> */}
                                <button onClick={() => viewData(ind)} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    View
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Axios2
