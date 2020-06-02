const axios = require('axios');

// fetch data global
const GlobalFetch = (country = "Indonesia") => {
    fetch(`https://covid.mathdro.id/api/countries/${country}/confirmed/`)
        .then(response => {
            return response.json();
        }).then(responseJson => {
            DataGlobal(responseJson);
        }).catch(error => {
            console.log(error);
        })
}

// fetch data provinsi Indonesia using axios
async function IndonesiaFetch() {
    try {
        let result = await axios.get('https://indonesia-covid-19.mathdro.id/api/provinsi/');
        return result.data;
    }
    catch (error) {
        console.log('error ' + error)
    }
}

export {GlobalFetch, IndonesiaFetch};

// rendering data global 
function DataGlobal(data) {
    document.getElementById('nama-negara').innerHTML = data[0].countryRegion;
    console.log(data[0].confirmed)
    console.log(data[0].deaths)
    console.log(data[0].active)
    console.log(data[0].recovered)
}
