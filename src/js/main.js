import CardData from './component';
import {GlobalFetch, IndonesiaFetch} from './fetchApi';
const $ = require('jquery');

$(document).ready(function() {
    // check scroll position
    CheckScroll();

    // component card-data
    customElements.get('card-data') || customElements.define('card-data', CardData); // memastikan define card-data

    // fetch global API
    GlobalFetch()

    // fetch data provinsi Indonesia
    IndonesiaFetch()
        .then((result) => {
            let table_content = "";
            let table_index = 1;
            for (let i of result.data) {
                table_content += `
                    <tr>
                        <td>${table_index}.</td>
                        <td>${i.provinsi}</td>
                        <td>${i.kasusPosi}</td>
                        <td>${i.kasusSemb}</td>
                        <td>${i.kasusMeni}</td>
                    </tr>
                `
                table_index++;
            }

            document.getElementById('table-content').innerHTML = table_content;
        }) 
})

const search_data = document.getElementById('search-data');
search_data.addEventListener('submit', (e) => {
    e.preventDefault();

    // variable to store country name
    let country = ""

    // get search box value
    let search_value = search_data['search-box'].value.toLowerCase();
    let join_string = ""

    if (search_value.includes("-")) {
        search_value = search_value.split('-')
        join_string = "-"
    }
    else {
        search_value = search_value.split(' ')
        join_string = " "
    }
    
    // capitalizing string before passed to API
    search_value.forEach((s) => {
        // to make sure word "and" & "the" not capitalized
        if (s != "and" && s!= "the") s = s.charAt(0).toUpperCase() + s.substring(1);
        country += s + join_string;
    })

    // remove last character by only pick from first to last char
    country = country.slice(0, -1);
    
    GlobalFetch(country)
})

$(window).scroll(function() {
    CheckScroll();
})

function CheckScroll() {
    var scroll = $(window).scrollTop();
    if (scroll > 50) $('.navbar').removeClass("transparent");
    else $('.navbar').addClass("transparent");
}
