import { useEffect, useState } from "react";



export default function AggregationPage(props) {

    const [time, setTime] = useState(0);
    useEffect(() =>{
        setAggreationTime();
    }, []);
    return (
        <div>
            <h1>The time it took to aggreate data is: {time}</h1>
        </div>
    );

    async function setAggreationTime() {
        const response = await fetch('http://localhost:1945/aggregate');
        const obj = await response.body.getReader().read();
        const str = new TextDecoder().decode(obj.value);
        setTime(str);
    }
}