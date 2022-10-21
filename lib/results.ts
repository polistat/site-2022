import { octokit } from "./octokit";

interface Candidates {
  governor: { [key: string]: {party: string, name: string}[] };
  senate: { [key: string]: {party: string, name: string}[] };
}

// fetch candidates.json from @polistat/results-2022
export const getCandidates = async () => {
  const candidates: Candidates = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `candidates.json`
  }).then((res) => {
    if (!("content" in res.data)) return;
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(decoded);
  })
  .catch(err => console.error(err));

  return candidates;
}

// todo: get the keys
interface Incumbents {}

// fetch senateIncumbents.json from @polistat/results-22
export const getIncumbents = async () => {
  const incumbents: Incumbents = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `incumbents.json`
  }).then((res) => {
    if (!("content" in res.data)) return;
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(decoded);
  })
  .catch(err => console.error(err))

  return incumbents;
}

interface Timeline {
  overallSenate: { dates: string[], demWinChances: number[] };
  races: { dates: string[], governor: { [key: string]: string[] }, senate: { [key: string]: string[] } };
}

// fetch timeline.json from @polistat/results-22
export const getTimeline = async () => {
  const timeline: Timeline = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `timeline.json`
  }).then((res) => {
    if (!("content" in res.data)) return;
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(decoded);
  })
  .catch(err => console.error(err));

  return {
    ...timeline,
    overallSenate: {
      ...timeline.overallSenate, dates: timeline.overallSenate.dates.map((date) => date.replaceAll("_", ":"))
    },
    races: {
      ...timeline.races, dates: timeline.races.dates.map((date) => date.replaceAll("_", ":"))
    }
  };
}

interface AveragedState {
  state_po: string;
  office: string;
  BPI: string;
  weighted_polls: string;
  weighted_sd: string;
  weighted_var: string;
  lean: string;
  dem_wins: string;
}

// fetch latest averaged polls and date from @polistat/results-2022
export const getAveragedPolls = async (): Promise<{ averagedPolls: AveragedState[], latestDate: undefined | string}> => {
  const averagedPollsFileName = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `averaged-polls`
  }).then((res) => {
    // get latest file
    // res.data
    if (!Array.isArray(res.data)) return;
    return res.data.map((file) => file.name).sort().at(-1);
  })
  .catch(err => console.error(err));

  if (!averagedPollsFileName) return { averagedPolls: [], latestDate: undefined };

  const latestDate = averagedPollsFileName.replace(/\.[^/.]+$/, "").replaceAll("_", ":");
  
  const averagedPolls = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `averaged-polls/${averagedPollsFileName}`
  }).then((res) => {
    if (!("content" in res.data)) return;
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    // return decoded.split("\r\n").map(a => a.split(','));
    return csvToJson<AveragedState>(decoded);
  })
  .catch(err => console.error(err));

  if (!averagedPolls) return { averagedPolls: [], latestDate: undefined };

  return { averagedPolls, latestDate };
}

interface OverallSenate {
  demSeats: number;
  occurrences: number;
}

// fetch latest overall senate data and date from @polistat/results-2022
export const getOverallSenate = async () => {
  const overallSenateFileName = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `overall-senate`
  }).then((res) => {
    // get latest file
    // res.data
    if (!Array.isArray(res.data)) return;
    return res.data.map((file) => file.name).sort().at(-1);
  })
  .catch(err => console.error(err));

  if (!overallSenateFileName) return [];
  
  const overallSenate = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `overall-senate/${overallSenateFileName}`
  }).then((res) => {
    if (!("content" in res.data)) return;
    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    // return decoded.split("\r\n").map(a => a.split(','));
    return csvToJson<OverallSenate>(decoded);
  })
  .catch(err => console.error(err));

  if (!overallSenate) return [];

  return overallSenate;
}

interface Poll {
  state: string;
  url: string;
  pollster: string;
  population: string;
  end_date: string;
  pct: string;
  answer: string;
  party: string;
  poll_id: string;
}

// fetch latest polls from @polistat/results-2022
export const getLatestPolls = async (category: string, state?: string) => {
  const latestPollsFileName = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `latest-polls/${category}`
  }).then((res) => {
    // get latest file
    // res.data
    if (!Array.isArray(res.data)) return;
    return res.data.map((file) => file.name).sort().at(-1);
  })
  .catch(err => console.error(err));

  if (!latestPollsFileName) return [];
  
  const latestPolls = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'polistat',
    repo: 'results-2022',
    path: `latest-polls/${category}/${latestPollsFileName}`
  }).then((res) => {
    if (!("content" in res.data)) return;

    const encoded = res.data.content.replace(/\s/g, '');
    const decoded = decodeURIComponent(escape(atob(encoded)));
    // return decoded.split("\r\n").map(a => a.split(','));

    const csv = csvToJson<Poll>(decoded);

    if (state) return csv.filter((poll) => poll.state === state);
    return csv;
  })
  .catch(err => console.error(err));

  if (!latestPolls) return [];

  return latestPolls;
}


function csvToJson<Type>(csv: string): Type[] {
  let lines = csv.replace(/\r/g, '').split("\n");
  let result = [];
  let headers=lines[0].split(",");
  for(let i=1;i<lines.length;i++){
    let obj: Record<string, string> = {};
    let currentline=lines[i].split(",");
      for(let j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
  }

  // @ts-expect-error
  return result;
}