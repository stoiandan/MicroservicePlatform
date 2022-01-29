import { useEffect, useState } from "react";




export default function DataPage(props) {
    const [data, setData] = useState({name: "no name", age: 0});
    useEffect(() =>{
        (async () => {
            setData(await getPersonAsync());
        })();
    }, []);

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <input type="button" value="Generate Random data" onClick={async () => setData( await getPersonAsync())}/>
                    </li>
                </ul>
            </nav>
            <h1>Welcome to the data presented</h1>
            <h2>My name is {data.name} and my age is {data.age}</h2>
        </div>
    );
}

async function getPersonAsync() {
    const response = await fetch('http://localhost:1945', {
        method: 'POST',
        headers: { 'Accept': 'application/json' }
    });
    const obj = await response.body.getReader().read();
    const str = new TextDecoder().decode(obj.value);
    return JSON.parse(str);
}




