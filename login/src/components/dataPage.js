import { useEffect, useState } from "react";




export default function DataPage(props) {
    const [data, setData] = useState({name: "no name", age: 0});
    useEffect(() =>{
        async function getPostData() {
            const response = await fetch('http://localhost:1945', {
                method: 'POST',
                headers: { 'Accept': 'application/json' }
            });
            const obj = await response.body.getReader().read();
            const str = new TextDecoder().decode(obj.value);
            setData(JSON.parse(str));
        }
         getPostData();
    }, []);

    return (
        <div>
            <h1>Welcome to the data presented</h1>
            <h2>My name is {data.name} and my age is {data.age}</h2>
        </div>
    );
}




