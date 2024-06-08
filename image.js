
const searchParams = new URLSearchParams(window.location.search);
const objectId = searchParams.get("object-id");      

const apiURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;

fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        
        const title = data.title; 
        const artist = data.artistDisplayName; 
        var artist_val = (artist === "") ? "Unidentified artist" : artist; 
        const imageURL = data.primaryImageSmall; 
        const objectdate = data.objectDate; 
        var object_val = (objectdate === "") ? "unidentified date" : objectdate; 
        const artworkInfo = `${data.title} | ${artist_val} | ${object_val}`;
        const material = data.medium;
        const dimensions = data.dimensions;
        const department = data.department; 
        const objectURL = data.objectURL;  

        
        document.getElementById('artwork-title').textContent = title;
        document.getElementById('artwork-artist').textContent = artist_val;        
        document.getElementById('artwork-image').src = imageURL;
        document.getElementById('artwork-info').innerText = artworkInfo;
        document.getElementById('artwork-material').textContent = material;
        document.getElementById('artwork-dimensions').textContent = dimensions;
        document.getElementById('artwork-department').textContent = department;
        
    })
    .catch(error => {
        console.error('Error fetching artwork details:', error);
    });
