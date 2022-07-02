const { AUTHOR, STATS_THEME } = require('../config');
const renderStat = (username, theme = '') => `![https://github-readme-stats.vercel.app/api?username=${username}&theme-synthwave](https://github-readme-stats.vercel.app/api?username=${username}${theme})`;
const statArray = [
    `# Stats`,
    renderStat(AUTHOR, STATS_THEME)
]
module.exports = statArray.join('\n');