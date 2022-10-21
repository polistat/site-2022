import { octokit } from "./octokit";

// fetch candidates.json from @polistat/results-2022
export const getCandidates = async () => {
  const candidates = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `candidates.json`
  }).then((res:any) => {
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(decoded);
  })
  .catch(err => console.error(err));

  return candidates;
}
// const candidates = JSON.parse(decodeURIComponent(escape(atob(JSON.parse(await getRawFileFromRepo('candidates.json')).content.replace(/\s/g, '')))));

// fetch senateIncumbents.json from @polistat/results-22
export const getIncumbents = async () => {
  const incumbents = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `incumbents.json`
  }).then((res:any) => {
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(decoded);
  })
  .catch(err => console.error(err))

  return incumbents;
}

// fetch timeline.json from @polistat/results-22
export const getTimeline = async () => {
  const timeline = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `timeline.json`
  }).then((res:any) => {
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(decoded);
  })
  .catch(err => console.error(err));

  return { ...timeline, overallSenate: {...timeline.overallSenate, dates: timeline.overallSenate.dates.map((date:any) => date.replaceAll("_", ":")) }, races: { ...timeline.races, dates: timeline.races.dates.map((date:any) => date.replaceAll("_", ":")) } };
}

// fetch latest averaged polls and date from @polistat/results-2022
export const getAveragedPolls = async () => {
  const averagedPollsFileName = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `averaged-polls`
  }).then((res:any) => {
    // get latest file
    // res.data
    return res.data.map((file:any) => file.name).sort().at(-1);
    // return res.data.find((a:any) => { return a.name === latestFileName });
  })
  .catch(err => console.error(err));

  const latestDate = averagedPollsFileName.replace(/\.[^/.]+$/, "").replaceAll("_", ":");
  
  const averagedPolls = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `averaged-polls/${averagedPollsFileName}`
  }).then((res:any) => {
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    // return decoded.split("\r\n").map(a => a.split(','));
    return csvToJson(decoded);
  })
  .catch(err => console.error(err));

  return { averagedPolls, latestDate };
}

// fetch latest overall senate data and date from @polistat/results-2022
export const getOverallSenate = async () => {
  const overallSenateFileName = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `overall-senate`
  }).then((res:any) => {
    // get latest file
    // res.data
    return res.data.map((file:any) => file.name).sort().at(-1);
    // return res.data.find((a:any) => { return a.name === latestFileName });
  })
  .catch(err => console.error(err));

  const latestDate = overallSenateFileName.replace(/\.[^/.]+$/, "").replaceAll("_", ":");
  
  const overallSenate = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `overall-senate/${overallSenateFileName}`
  }).then((res:any) => {
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    // return decoded.split("\r\n").map(a => a.split(','));
    return csvToJson(decoded);
  })
  .catch(err => console.error(err));

  return { overallSenate, latestDate };
}

// fetch latest polls from @polistat/results-2022
export const getLatestPolls = async (category:string, state?:string) => {
  const latestPollsFileName = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `latest-polls/${category}`
  }).then((res:any) => {
    // get latest file
    // res.data
    return res.data.map((file:any) => file.name).sort().at(-1);
    // return res.data.find((a:any) => { return a.name === latestFileName });
  })
  .catch(err => console.error(err));

  const latestDate = latestPollsFileName.replace(/\.[^/.]+$/, "").replaceAll("_", ":");
  
  const latestPolls = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `latest-polls/${category}/${latestPollsFileName}`
  }).then((res:any) => {
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    // return decoded.split("\r\n").map(a => a.split(','));

    const csv = csvToJson(decoded);

    if (state) return csv.filter((poll:any) => poll.state === state);
    return csv;
  })
  .catch(err => console.error(err));

  return { latestPolls, latestDate };
}


function csvToJson(csv:string){
  let lines=csv.replace(/\r/g, '').split("\n");
  let result = [];
  let headers=lines[0].split(",");
  for(let i=1;i<lines.length;i++){
    let obj:any = {};
    let currentline=lines[i].split(",");
      for(let j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
  }

  return result;
}