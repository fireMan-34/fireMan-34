async function getWheather() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000)).then(
        data => {
            return 'workflow will change it ,fileMan-34';
        }
    )
}
module.exports = getWheather;