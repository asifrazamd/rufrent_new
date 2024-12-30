import Navbar from "./navbar"

const NotfoundView = () => {
    return (
        <>
            <Navbar/>
            <div style={{display: 'flex',flexDirection: 'column',alignItems:'center', justifyContent: 'center', height:'80vh',}}>
                <h1 className="text-gray-900">Not Found</h1>
                <p className="text-gray-700">This Page is not available to Serve....</p>
            </div>
        </>
    )
}

export default NotfoundView