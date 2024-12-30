import MyListingCardView from "./MyListingCardView";
import Navbar from "./Navbar"
import propertyData from "../models/myPropertyModel";

  
  const MyListingsView = () => {
    return (
        <>
            <Navbar/>
            <div className="mt-20 p-4">
                <MyListingCardView property={propertyData} />
            </div>
        </>
      
    );
  };
  
  export default MyListingsView;
  