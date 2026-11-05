
// ========================================
// RENEWABLE ENERGY EXPLORER
// ========================================


// ========================================
// 1. RENEWABLE ENERGY DATA
// ========================================

const renewableSites = [

    {
        name: "Capital Solar",
        type: "Solar",
        lat: 38.9072,
        lng: -77.0369,
        capacity: "15 MW"
    },
    {
        name: "Maryland Solar Farm",
        type: "Solar",
        lat: 39.0458,
        lng: -76.6413,
        capacity: "25 MW"
    },
    {
        name: "Virginia Wind Site",
        type: "Wind",
        lat: 38.4500,
        lng: -78.0000,
        capacity: "40 MW"
    },
    {
        name: "Northern Maryland Wind",
        type: "Wind",
        lat: 39.3000,
        lng: -77.1000,
        capacity: "32 MW"
    },
    {
        name: "Gemini Solar Project",
        type: "Solar",
        lat: 36.4678,
        lng: -114.8060,
        capacity: "690 MW"
    },
    {
        name: "Hecate Energy Longhorn",
        type: "Solar",
        lat: 33.0442,
        lng: -98.3405,
        capacity: "650 MW"
    },
    {
        name: "Hornet Solar",
        type: "Solar",
        lat: 34.4852,
        lng: -101.9714,
        capacity: "600 MW"
    },
    {
        name: "Double Back Diamond Solar",
        type: "Solar",
        lat: 39.5350,
        lng: -89.8950,
        capacity: "593 MW"
    },
    {
        name: "Topaz Solar Farm",
        type: "Solar",
        lat: 35.4056,
        lng: -120.0686,
        capacity: "586 MW"
    },
    {
        name: "Fox Squirrel Solar",
        type: "Solar",
        lat: 39.7832,
        lng: -83.3451,
        capacity: "577 MW"
    },
    {
        name: "Hecate Energy Outpost",
        type: "Solar",
        lat: 27.8592,
        lng: -99.1617,
        capacity: "515 MW"
    },
    {
        name: "Hecate Energy Frye Solar",
        type: "Solar",
        lat: 34.4067,
        lng: -101.5966,
        capacity: "500 MW"
    },
    {
        name: "Centennial Flats",
        type: "Solar",
        lat: 33.5883,
        lng: -113.5283,
        capacity: "500 MW"
    },
    {
        name: "Sonoran Solar Energy",
        type: "Solar",
        lat: 33.2425,
        lng: -112.5418,
        capacity: "490 MW"
    }

];


// ========================================
// 2. CALCULATE FACILITY STATISTICS
// ========================================

const totalSites = renewableSites.length;

const solarSites = renewableSites.filter(
    site => site.type === "Solar"
);

const windSites = renewableSites.filter(
    site => site.type === "Wind"
);

const totalSolarCapacity = solarSites.reduce(
    (total, site) => total + parseFloat(site.capacity),
    0
);

const totalWindCapacity = windSites.reduce(
    (total, site) => total + parseFloat(site.capacity),
    0
);

const totalCapacity = totalSolarCapacity + totalWindCapacity;


// Display statistics in console

console.log("RENEWABLE ENERGY STATISTICS");

console.log("Total Facilities:", totalSites);

console.log("Solar Facilities:", solarSites.length);

console.log("Wind Facilities:", windSites.length);

console.log("Total Solar Capacity:", totalSolarCapacity, "MW");

console.log("Total Wind Capacity:", totalWindCapacity, "MW");

console.log("Combined Capacity:", totalCapacity, "MW");


// ========================================
// 3. CREATE THE MAP
// ========================================

const map = L.map("map");


// ========================================
// 4. ADD OPENSTREETMAP BASEMAP
// ========================================

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
    }
).addTo(map);


// ========================================
// 5. CREATE TWO LAYERS
// ========================================

const solarLayer = L.layerGroup();

const windLayer = L.layerGroup();


// ========================================
// 6. CREATE CUSTOM ICONS
// ========================================

const solarIcon = L.divIcon({

    className: "solar-marker",

    html: '<span>☀</span>',

    iconSize: [38, 38],

    iconAnchor: [19, 19]

});


const windIcon = L.divIcon({

    className: "wind-marker",

    html: '<span>⚑</span>',

    iconSize: [38, 38],

    iconAnchor: [19, 19]

});


// ========================================
// 7. CREATE FACILITY MARKERS
// ========================================

renewableSites.forEach(site => {

    let icon;

    // Select icon based on energy type

    if (site.type === "Solar") {

        icon = solarIcon;

    } else {

        icon = windIcon;

    }


    // Create marker

    const marker = L.marker(

        [site.lat, site.lng],

        { icon: icon }

    );


    // Create interactive popup

    marker.bindPopup(`

        <div class="popup-content">

            <h3>${site.name}</h3>

            <p>
                <strong>Technology:</strong>
                ${site.type}
            </p>

            <p>
                <strong>Installed Capacity:</strong>
                ${site.capacity}
            </p>

            <p>
                <strong>Latitude:</strong>
                ${site.lat}
            </p>

            <p>
                <strong>Longitude:</strong>
                ${site.lng}
            </p>

        </div>

    `);


    // Add marker to appropriate layer

    if (site.type === "Solar") {

        marker.addTo(solarLayer);

    }

    if (site.type === "Wind") {

        marker.addTo(windLayer);

    }

});


// ========================================
// 8. ADD LAYERS TO MAP
// ========================================

solarLayer.addTo(map);

windLayer.addTo(map);


// ========================================
// AUTOMATICALLY ZOOM TO ALL FACILITIES
// ========================================

const siteCoordinates = renewableSites.map(site => [
    site.lat,
    site.lng
]);

map.fitBounds(siteCoordinates, {
    padding: [40, 40]
});


// ========================================
// 10. ADD LAYER CONTROL
// ========================================

const overlays = {

    "☀️ Solar Facilities": solarLayer,

    "⚑ Wind Facilities": windLayer

};

L.control.layers(

    null,

    overlays,

    {
        collapsed: false
    }

).addTo(map);


// ========================================
// 11. ADD SCALE BAR
// ========================================

L.control.scale({

    position: "bottomleft",

    metric: true,

    imperial: false

}).addTo(map);


// ========================================
// 12. PRINT FINAL SUMMARY
// ========================================

console.log("-----------------------------");

console.log("RENEWABLE ENERGY EXPLORER");

console.log("-----------------------------");

console.log("Facilities:", totalSites);

console.log("Solar:", solarSites.length);

console.log("Wind:", windSites.length);

console.log("Solar Capacity:", totalSolarCapacity + " MW");

console.log("Wind Capacity:", totalWindCapacity + " MW");

console.log("Total Capacity:", totalCapacity + " MW");

console.log("-----------------------------");
