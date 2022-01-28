



export default async function DataPage(props) {
    const persons = await fetch('http://localhost:1945', {
        method: 'POST',
        headers: { 'Accept': 'application/json' }});

    return  (
        <h1>{persons}</h1>
    );
}