import CardData from './component';
import {GlobalFetch, IndonesiaFetch} from './fetchApi';
const $ = require('jquery');

$(document).ready(function() {
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

$(window).scroll(function() {
    CheckScroll();
})

function CheckScroll() {
    var scroll = $(window).scrollTop();
    if (scroll > 50) $('.navbar').removeClass("transparent");
    else $('.navbar').addClass("transparent");
}
