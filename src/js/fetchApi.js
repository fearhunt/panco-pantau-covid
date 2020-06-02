const axios = require('axios');

// fetch data global
const GlobalFetch = (country = "Indonesia") => {
    fetch(`https://covid.mathdro.id/api/countries/${country}/confirmed/`)
        .then(response => {
            return response.json();
        }).then(responseJson => {
            // respons berupa array dengan data di array[0]
            DataGlobal(responseJson); 
        }).catch(error => {
            DataError(country);
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
function DataGlobal(responseJson) {
    document.getElementById('keterangan').innerHTML = `
        Jumlah kasus di <strong>${responseJson[0].countryRegion}</strong> saat ini:
    `;

    let total_pasien = 0, pasien_sembuh = 0, dalam_perawatan = 0, kasus_meninggal = 0;
    responseJson.forEach((data) => {
        total_pasien += data.confirmed;
        pasien_sembuh += data.recovered;
        dalam_perawatan += data.active;
        kasus_meninggal += data.deaths;
    })

    document.getElementById('total-pasien-num').innerHTML = total_pasien;
    document.getElementById('pasien-sembuh-num').innerHTML = pasien_sembuh;
    document.getElementById('dalam-perawatan-num').innerHTML = dalam_perawatan;
    document.getElementById('kasus-meninggal-num').innerHTML = kasus_meninggal;
}

// error fetch data global
function DataError(country) { 
    document.getElementById('keterangan').innerHTML = `
        <strong>Oops~!</strong> Kami tidak bisa menemukan statistik COVID-19 di <strong>${country}</strong> pada <em>database</em><br>
        Sudahkah Anda memastikan nama negara yang dimasukkan benar?
    `;
    document.getElementById('total-pasien-num').innerHTML = '-----';
    document.getElementById('pasien-sembuh-num').innerHTML = '-----';
    document.getElementById('dalam-perawatan-num').innerHTML = '-----';
    document.getElementById('kasus-meninggal-num').innerHTML = '-----';
    
}