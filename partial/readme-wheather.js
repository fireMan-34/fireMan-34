async function getWheather() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000)).then(
        data => {
            return 'string';
        }
    )
}
module.exports = getWheather;