const { AUTHOR, TOP_REPO, STATS_THEME } = require('../config');
const renderReadmeCard = (username, repo, theme = '') => {
    return `[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo}${theme})](https://github.com/${username}/${repo})`
};
const curryRenderReadMeCard = (repo) => renderReadmeCard(AUTHOR, repo, STATS_THEME);
const repoArray = [
    `# Repo`,
    ...TOP_REPO.map(repo => curryRenderReadMeCard(repo))

];
module.exports = repoArray.join('\n');