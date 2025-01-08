const propertyFields = () => {
    return `
        LEFT JOIN st_prop_type spt ON dy.prop_type_id = spt.id
        LEFT JOIN st_home_type sht ON dy.home_type_id = sht.id
        LEFT JOIN st_prop_desc spd ON dy.prop_desc_id = spd.id
        LEFT JOIN st_community sc ON dy.community_id = sc.id
        LEFT JOIN st_builder sb ON sc.builder_id = sb.id
        LEFT JOIN st_city scity ON sb.city_id = scity.id
        LEFT JOIN st_beds snbe ON dy.no_beds = snbe.id
        LEFT JOIN st_baths snba ON dy.no_baths = snba.id
        LEFT JOIN st_balcony snbc ON dy.no_balconies = snbc.id
        LEFT JOIN st_tenant_eat_pref step ON dy.tenant_eat_pref_id = step.id
        LEFT JOIN st_parking_count spc ON dy.parking_count_id = spc.id
        LEFT JOIN st_deposit_range sdr ON dy.deposit_range_id = sdr.id
        LEFT JOIN st_maintenance sm ON dy.maintenance_id = sm.id
    `;
};


module.exports={propertyFields}