// Dependencies
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const commit = process.env.COMMIT_SHA;

async function getCommit() {
  if (!commit) return { sha: '' };
  try {
    const res = await fetch(
      `https://api.github.com/repos/danestves/danestves.com/commits/${commit}`
    );
    const data = await res.json();
    return {
      isDeployCommit: commit === 'HEAD' ? 'Unknown' : true,
      sha: data.sha,
      author: data.commit.author.name,
      date: data.commit.author.date,
      message: data.commit.message,
      link: data.html_url,
    };
  } catch (error) {
    return `Unable to get git commit info: ${error.message}`;
  }
}

async function go() {
  const buildInfo = {
    buildTime: Date.now(),
    commit: await getCommit(),
  };

  fs.writeFileSync(
    path.join(__dirname, '../public/build/info.json'),
    JSON.stringify(buildInfo, null, 2)
  );
  console.log('build info generated', buildInfo);
}
go();

/*
eslint
  consistent-return: "off",
*/
