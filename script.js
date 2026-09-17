// ========================================
// CREATE THE MAP
// ========================================

const map = L.map("map").setView([38.9072, -77.0369], 9);


// ========================================
// ADD OPENSTREETMAP BASEMAP
// ========================================

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// ========================================
// RENEWABLE ENERGY DATA
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
    }

];


// ========================================
// CREATE TWO LAYERS
// ========================================

const solarLayer = L.layerGroup();

const windLayer = L.layerGroup();


// ========================================
// CREATE CUSTOM ICONS
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
// CREATE MARKERS
// ========================================

renewableSites.forEach(site => {

    let icon;


    // Choose icon based on technology

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


    // Popup

    marker.bindPopup(`
        <h3>${site.name}</h3>

        <p>
            <strong>Technology:</strong>
            ${site.type}
        </p>

        <p>
            <strong>Capacity:</strong>
            ${site.capacity}
        </p>

        <p>
            <strong>Coordinates:</strong><br>
            ${site.lat},
            ${site.lng}
        </p>
    `);


    // Add marker to correct layer

    if (site.type === "Solar") {

        marker.addTo(solarLayer);

    }


    if (site.type === "Wind") {

        marker.addTo(windLayer);

    }

});


// ========================================
// SHOW BOTH LAYERS
// ========================================

solarLayer.addTo(map);

windLayer.addTo(map);


// ========================================
// LAYER CONTROL
// ========================================

const overlays = {

    "☀️ Solar": solarLayer,

    "💨 Wind": windLayer

};

L.control.layers(null, overlays).addTo(map);


// ========================================
// SCALE BAR
// ========================================

L.control.scale().addTo(map);