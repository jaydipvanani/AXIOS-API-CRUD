import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const Axios = () => {
    let name = useRef()
    let age = useRef()
    let [data, setData] = useState([]);

    let api = () => {
        axios.get("http://localhost:8000/post").then((res) => {
            setData(res.data)
        })
    }


    useEffect(() => {
        api();
    }, [])


    let submit = () => {
        var obj = {
            "name": name.current.value,
            "age": age.current.value
        };
        axios.post("http://localhost:8000/post", obj)
        setData([...data, obj]);
    }
    
    return (
        <>
            <input type="text" ref={name} placeholder='Name' />
            <input type="text" ref={age} placeholder='Age' />
            <button onClick={submit}>Submit</button>


            <div>
                {
                    data.map((item, index) => {
                        return (
                            <>
                                <h1>{item.name}</h1>
                                <h1>{item.age}</h1>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Axios
