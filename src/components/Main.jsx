import Form from "./Form";

function Main() {
    return ( 
        <main className="flex flex-col justify-center items-center px-3">
            <h1 className="justify-center text-4xl font-bold mt-6 text-gray-800 text-center">Stylish image placeholders for your designs</h1>
            <h3 className=" justify-center text-lg font-medium my-2 text-gray-800 text-center">Just add your desired image size and effects  and you'll get a beautiful random image.</h3>
            <Form/>
        </main>
     );
}

export default Main;