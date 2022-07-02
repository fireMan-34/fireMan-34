async function getWheather() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000)).then(
        data => {
            return {
                style: '.weather_iframe{width:100%;height:600px;}',
                content: '<iframe class="weather_iframe" src="https://wttr.in/Shantou?M"></iframe>'
            };
        }
    )
}
// module.exports = {
//     style: "h2{color:red;}",
//     content: "<h2>hello</h2>",
// };
module.exports = getWheather;