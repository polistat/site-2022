import { octokit } from "../../lib/octokit";
import { getCandidates } from "../../lib/results";

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // get overall-senate timeline
    const overallSenateFileNames = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'polistat',
      repo: 'results-2022',
      path: `overall-senate`
    }).then((res) => {
      return res.data.map((file) => file.name).sort();
    })
    .catch(err => console.error(err));
    const overallSenateTimeline = await Promise.all(overallSenateFileNames.map(async (fileName) => {
      return await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'polistat',
        repo: 'results-2022',
        path: `overall-senate/${fileName}`
      }).then((res) => {
        //Buffer.from(res.data.content, 'base64').toString()
        const encoded = res.data.content.replace(/\s/g, '');
        const decoded = decodeURIComponent(escape(atob(encoded)));
        const csv = csvToJson(decoded);

        const totalSimulations = csv.reduce((sum, a) => sum+Number(a.occurrences), 0);
        const demWinChance = csv.filter((a) => Number(a.demSeats)>=50).reduce((sum, a) => sum+Number(a.occurrences), 0) / totalSimulations;
        
        return demWinChance;
      });
    }));


    // get averaged-polls timeline
    const averagedPollsFileNames = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'polistat',
      repo: 'results-2022',
      path: `averaged-polls`
    }).then((res) => {
      return res.data.map((file) => file.name).sort();
    })
    .catch(err => console.error(err));
    const racesTimeline = await Promise.all(averagedPollsFileNames.map(async (fileName) => {
      return await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'polistat',
        repo: 'results-2022',
        path: `averaged-polls/${fileName}`
      }).then((res) => {
        const encoded = res.data.content.replace(/\s/g, '');
        const decoded = decodeURIComponent(escape(atob(encoded)));
        const csv = csvToJson(decoded);

        const senate = Object.fromEntries(csv.filter((a) => a.office === 'Senate').map(a => [a.state_po, a.dem_wins]));
        const governor = Object.fromEntries(csv.filter((a) => a.office === 'Governor').map(a => [a.state_po, a.dem_wins]));
        
        return { senate, governor };
      });
    }));

    return res.json({
      timestamp: new Date().toJSON(),
      overallSenate: {
        dates: overallSenateFileNames.map((fileName) => fileName.replace(/\.[^/.]+$/, "")),
        demWinChances: overallSenateTimeline,
      },
      races: {
        dates: averagedPollsFileNames.map((fileName) => fileName.replace(/\.[^/.]+$/, "")),
        senate: Object.fromEntries(Object.keys(racesTimeline[0].senate).map((state) => [state, racesTimeline.map((a) => a.senate[state])])),
        governor: Object.fromEntries(Object.keys(racesTimeline[0].governor).map((state) => [state, racesTimeline.map((a) => a.governor[state])])),
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: `Error: ${err.message}`,
    });
  }
}


function csvToJson(csv){
  let lines=csv.replace(/\r/g, '').split("\n");
  let result = [];
  let headers=lines[0].split(",");
  for(let i=1;i<lines.length;i++){
    let obj = {};
    let currentline=lines[i].split(",");
      for(let j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
  }

  return result;
}