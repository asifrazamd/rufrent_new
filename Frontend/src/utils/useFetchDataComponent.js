 import useFetchData from './useFetchData';

// // Custom hook to fetch data required by PostPropertiesView component
// const useFetchDataComponents = (formData) => {
//   // Fetching data for states, cities, and builders
//   const { data: stateList, isLoading: isLoadingState, error: stateError } = useFetchData('states', { country: formData.country });
//   const { data: cityList, isLoading: isLoadingCity, error: cityError } = useFetchData('cities', { state: formData.state });
//   const { data: builderList, isLoading: isLoadingBuilder, error: builderError } = useFetchData('builders', { city: formData.city });

//   return {
//     stateList, isLoadingState, stateError,
//     cityList, isLoadingCity, cityError,
//     builderList, isLoadingBuilder, builderError,
//   };
// };

// export default useFetchDataComponents;


const useFetchDataComponents = (formData) => {
    // Fetch Static Data
    // const { data: propType, isLoading: isLoadingPropType, error: propTypeError } = useFetchData("st_prop_type", "id,name");
    // const { data: homeType, isLoading: isLoadingHomeType, error: homeTypeError } = useFetchData("st_home_type", "id,name");
    // const { data: balcony, isLoading: isLoadingBalcony, error: balconyError } = useFetchData("st_balcony", "id,name");
    // const { data: bathrooms, isLoading: isLoadingBathrooms, error: bathroomsError } = useFetchData("st_baths", "id,name");
    // //const { data: bedrooms, isLoading: isLoadingBedrooms, error: bedroomsError } = useFetchData("st_beds", "id,name");
    // const { data: floorRange, isLoading: isLoadingFloorRange, error: floorRangeError } = useFetchData("st_floor_range", "id,name");
    // const { data: parkingCount, isLoading: isLoadingParkingCount, error: parkingCountError } = useFetchData("st_parking_count", "id,name");
    // const { data: propDesc, isLoading: isLoadingPropDesc, error: propDescError } = useFetchData("st_prop_desc", "id,name");
    // const { data: tenant, isLoading: isLoadingTenant, error: tenantError } = useFetchData("st_tenant", "id,name");
    // const { data: tenantEat, isLoading: isLoadingTenantEat, error: tenantEatError } = useFetchData("st_tenant_eat_pref", "id,name");
  
    // Fetch Dynamic Data
    const { data: stateList, isLoading: isLoadingState, error: stateError } = useFetchData("st_state", "id,name");
    // const { data: cityList, isLoading: isLoadingCity, error: cityError } = useFetchData("st_city", "id,name", { state_id: formData.state });
    // const { data: builderList, isLoading: isLoadingBuilder, error: builderError } = useFetchData("st_builder", "id,name", { city_id: formData.city });
    // const { data: communityList, isLoading: isLoadingCommunity, error: communityError } = useFetchData("st_community", "id,name", { builder_id: formData.builder });
    console.log(stateList)
    return {
    //   propType, isLoadingPropType, propTypeError,
    //   homeType, isLoadingHomeType, homeTypeError,
    //   balcony, isLoadingBalcony, balconyError,
    //   bathrooms, isLoadingBathrooms, bathroomsError,
    //  // bedrooms, isLoadingBedrooms, bedroomsError,
    //   floorRange, isLoadingFloorRange, floorRangeError,
    //   parkingCount, isLoadingParkingCount, parkingCountError,
    //   propDesc, isLoadingPropDesc, propDescError,
    //   tenant, isLoadingTenant, tenantError,
    //   tenantEat, isLoadingTenantEat, tenantEatError,
      stateList, isLoadingState, stateError,
      // cityList, isLoadingCity, cityError,
      // builderList, isLoadingBuilder, builderError,
      // communityList, isLoadingCommunity, communityError,
    };
  };
  

  export default useFetchDataComponents;