import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generatedDatasetPath = path.join(__dirname, '..', '..', 'data', 'ipl-players.generated.json');

const makePlayer = (name, overrides = {}) => ({
  name,
  country: 'India',
  overseas: false,
  role: 'batter',
  battingStyle: 'Right-hand bat',
  bowlingType: 'N/A',
  teams: ['RCB'],
  captain: false,
  finisher: false,
  wicketkeeper: false,
  awards: [],
  trophies: 0,
  orangeCap: false,
  purpleCap: false,
  activeSeasons: [2024],
  aggressiveBatting: false,
  deathBowling: false,
  legendStatus: false,
  playoffAppearances: 0,
  battingPosition: 4,
  profileImage: `/players/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.svg`,
  teamCode: 'RCB',
  ...overrides
});

export const basePlayers = [
  makePlayer('Virat Kohli', { captain: true, legendStatus: true, aggressiveBatting: true, orangeCap: true, teams: ['RCB'], battingPosition: 3, playoffAppearances: 7, trophies: 1 }),
  makePlayer('MS Dhoni', { role: 'wicketkeeper', wicketkeeper: true, captain: true, finisher: true, legendStatus: true, teams: ['CSK', 'RPS'], battingPosition: 6, trophies: 5, playoffAppearances: 12 }),
  makePlayer('Rohit Sharma', { captain: true, legendStatus: true, orangeCap: true, teams: ['MI', 'DC'], battingPosition: 1, trophies: 6, playoffAppearances: 13 }),
  makePlayer('AB de Villiers', { country: 'South Africa', overseas: true, wicketkeeper: true, aggressiveBatting: true, legendStatus: true, teams: ['RCB', 'DC'], battingPosition: 3, playoffAppearances: 6 }),
  makePlayer('Chris Gayle', { country: 'West Indies', overseas: true, aggressiveBatting: true, finisher: true, legendStatus: true, teams: ['RCB', 'PBKS', 'KKR'], battingPosition: 1, orangeCap: true }),
  makePlayer('Suresh Raina', { captain: true, aggressiveBatting: true, legendStatus: true, teams: ['CSK', 'GL'], battingPosition: 3, playoffAppearances: 11 }),
  makePlayer('Jasprit Bumrah', { role: 'bowler', bowlingType: 'fast', deathBowling: true, legendStatus: true, purpleCap: true, teams: ['MI'], battingPosition: 9, playoffAppearances: 8 }),
  makePlayer('Rashid Khan', { country: 'Afghanistan', overseas: true, role: 'bowler', bowlingType: 'leg-spin', legendStatus: true, teams: ['SRH', 'GT'], battingPosition: 8, playoffAppearances: 5 }),
  makePlayer('Sunil Narine', { country: 'West Indies', overseas: true, role: 'bowler', bowlingType: 'off-spin', aggressiveBatting: true, finisher: true, legendStatus: true, teams: ['KKR'], battingPosition: 7, playoffAppearances: 8 }),
  makePlayer('Andre Russell', { country: 'West Indies', overseas: true, finisher: true, aggressiveBatting: true, legendStatus: true, teams: ['KKR'], battingPosition: 6, playoffAppearances: 7 }),
  makePlayer('Hardik Pandya', { captain: true, aggressiveBatting: true, finisher: true, legendStatus: true, teams: ['MI', 'GT'], battingPosition: 6, playoffAppearances: 7 }),
  makePlayer('Kieron Pollard', { country: 'West Indies', overseas: true, finisher: true, aggressiveBatting: true, legendStatus: true, teams: ['MI'], battingPosition: 6, playoffAppearances: 10 }),
  makePlayer('David Warner', { country: 'Australia', overseas: true, captain: true, aggressiveBatting: true, orangeCap: true, legendStatus: true, teams: ['SRH', 'DC'], battingPosition: 1, playoffAppearances: 8 }),
  makePlayer('Shikhar Dhawan', { aggressiveBatting: true, orangeCap: true, legendStatus: true, teams: ['DC', 'SRH', 'PBKS'], battingPosition: 1, playoffAppearances: 6 }),
  makePlayer('KL Rahul', { captain: true, wicketkeeper: true, aggressiveBatting: true, orangeCap: true, teams: ['PBKS', 'LSG', 'RCB'], battingPosition: 1, playoffAppearances: 5 }),
  makePlayer('Ravindra Jadeja', { captain: true, role: 'all-rounder', bowlingType: 'left-arm spin', aggressiveBatting: true, legendStatus: true, teams: ['CSK', 'RR', 'GL'], battingPosition: 7, playoffAppearances: 12 }),
  makePlayer('Dwayne Bravo', { country: 'West Indies', overseas: true, role: 'all-rounder', bowlingType: 'medium-fast', deathBowling: true, finisher: true, legendStatus: true, teams: ['CSK', 'MI'], battingPosition: 7, purpleCap: true }),
  makePlayer('Muttiah Muralitharan', { country: 'Sri Lanka', overseas: true, role: 'bowler', bowlingType: 'off-spin', purpleCap: true, legendStatus: true, teams: ['CSK', 'KKR', 'RCB'], battingPosition: 11 }),
  makePlayer('Lasith Malinga', { country: 'Sri Lanka', overseas: true, role: 'bowler', bowlingType: 'fast', deathBowling: true, legendStatus: true, teams: ['MI'], battingPosition: 11, purpleCap: true }),
  makePlayer('Harbhajan Singh', { captain: true, role: 'bowler', bowlingType: 'off-spin', legendStatus: true, teams: ['MI', 'CSK', 'KKR'], battingPosition: 8, playoffAppearances: 10 }),
  makePlayer('Yuvraj Singh', { captain: true, aggressiveBatting: true, legendStatus: true, teams: ['PBKS', 'DC', 'RCB'], battingPosition: 4, playoffAppearances: 6 }),
  makePlayer('Gautam Gambhir', { captain: true, aggressiveBatting: false, legendStatus: true, teams: ['KKR', 'DC'], battingPosition: 1, playoffAppearances: 7 }),
  makePlayer('Andre Tye', { country: 'Australia', overseas: true, role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['GL', 'PBKS'], battingPosition: 9 }),
  makePlayer('Ravichandran Ashwin', { captain: true, role: 'bowler', bowlingType: 'off-spin', legendStatus: true, teams: ['CSK', 'PBKS', 'RR', 'DC'], battingPosition: 8 }),
  makePlayer('Bhuvneshwar Kumar', { role: 'bowler', bowlingType: 'fast', deathBowling: true, purpleCap: true, legendStatus: true, teams: ['SRH', 'PWI'], battingPosition: 9 }),
  makePlayer('Mohammed Shami', { role: 'bowler', bowlingType: 'fast', deathBowling: true, legendStatus: true, teams: ['PBKS', 'SRH', 'GT', 'KKR', 'DC'], battingPosition: 9 }),
  makePlayer('Kuldeep Yadav', { role: 'bowler', bowlingType: 'chinaman spin', aggressiveBatting: false, teams: ['KKR', 'DC', 'MI'], battingPosition: 10 }),
  makePlayer('Axar Patel', { role: 'all-rounder', bowlingType: 'left-arm spin', captain: true, legendStatus: true, teams: ['PBKS', 'DC'], battingPosition: 7, playoffAppearances: 6 }),
  makePlayer('Krunal Pandya', { role: 'all-rounder', bowlingType: 'left-arm spin', aggressiveBatting: true, teams: ['MI', 'LSG', 'RCB'], battingPosition: 7 }),
  makePlayer('Nicholas Pooran', { country: 'West Indies', overseas: true, wicketkeeper: true, aggressiveBatting: true, finisher: true, teams: ['PBKS', 'LSG', 'MI', 'SRH'], battingPosition: 5 }),
  makePlayer('Quinton de Kock', { country: 'South Africa', overseas: true, wicketkeeper: true, aggressiveBatting: true, teams: ['MI', 'LSG', 'RCB'], battingPosition: 1, orangeCap: true }),
  makePlayer('Jos Buttler', { country: 'England', overseas: true, wicketkeeper: true, aggressiveBatting: true, orangeCap: true, legendStatus: true, teams: ['MI', 'RR'], battingPosition: 1 }),
  makePlayer('Faf du Plessis', { country: 'South Africa', overseas: true, captain: true, aggressiveBatting: true, teams: ['CSK', 'RCB', 'PWI'], battingPosition: 1 }),
  makePlayer('Shane Watson', { country: 'Australia', overseas: true, allRounder: true, aggressiveBatting: true, legendStatus: true, teams: ['RR', 'CSK', 'RCB'], battingPosition: 2 }),
  makePlayer('Ben Stokes', { country: 'England', overseas: true, captain: true, aggressiveBatting: true, teams: ['RR', 'CSK'], battingPosition: 3 }),
  makePlayer('Trent Boult', { country: 'New Zealand', overseas: true, role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['MI', 'RR', 'KKR'], battingPosition: 11 }),
  makePlayer('Pat Cummins', { country: 'Australia', overseas: true, captain: true, role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['KKR', 'SRH'], battingPosition: 9 }),
  makePlayer('Kagiso Rabada', { country: 'South Africa', overseas: true, role: 'bowler', bowlingType: 'fast', deathBowling: true, purpleCap: true, teams: ['DC', 'PBKS', 'RR'], battingPosition: 10 }),
  makePlayer('Jofra Archer', { country: 'England', overseas: true, role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['RR', 'MI'], battingPosition: 10 }),
  makePlayer('Ruturaj Gaikwad', { captain: true, orangeCap: true, aggressiveBatting: true, teams: ['CSK'], battingPosition: 1 }),
  makePlayer('Ishan Kishan', { wicketkeeper: true, aggressiveBatting: true, teams: ['MI', 'GT'], battingPosition: 1 }),
  makePlayer('Sanju Samson', { captain: true, wicketkeeper: true, aggressiveBatting: true, teams: ['RR', 'DC'], battingPosition: 3 }),
  makePlayer('Devdutt Padikkal', { aggressiveBatting: true, teams: ['RCB', 'RR', 'LSG'], battingPosition: 1 }),
  makePlayer('Ajinkya Rahane', { captain: true, aggressiveBatting: false, teams: ['RR', 'CSK', 'KKR', 'DC', 'MI'], battingPosition: 3 }),
  makePlayer('Shubman Gill', { captain: true, orangeCap: true, aggressiveBatting: true, teams: ['KKR', 'GT'], battingPosition: 1 }),
  makePlayer('Sai Sudharsan', { aggressiveBatting: true, teams: ['GT'], battingPosition: 3 }),
  makePlayer('Rinku Singh', { finisher: true, aggressiveBatting: true, teams: ['KKR'], battingPosition: 6 }),
  makePlayer('Rahul Tewatia', { finisher: true, aggressiveBatting: true, teams: ['RR', 'GT', 'DC'], battingPosition: 6 }),
  makePlayer('Venkatesh Iyer', { aggressiveBatting: true, teams: ['KKR'], battingPosition: 2 }),
  makePlayer('Nitish Rana', { captain: true, aggressiveBatting: true, teams: ['KKR', 'RR'], battingPosition: 3 }),
  makePlayer('Shivam Dube', { aggressiveBatting: true, finisher: true, teams: ['CSK', 'RR', 'RCB'], battingPosition: 5 }),
  makePlayer('Deepak Chahar', { role: 'bowler', bowlingType: 'fast', deathBowling: false, teams: ['CSK', 'RPS'], battingPosition: 9 }),
  makePlayer('T Natarajan', { role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['SRH', 'DC'], battingPosition: 9 }),
  makePlayer('Sandeep Sharma', { role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['RR', 'SRH', 'PBKS'], battingPosition: 9 }),
  makePlayer('Yuzvendra Chahal', { role: 'bowler', bowlingType: 'leg-spin', purpleCap: true, teams: ['RCB', 'RR', 'MI'], battingPosition: 10 }),
  makePlayer('Varun Chakravarthy', { role: 'bowler', bowlingType: 'mystery spin', teams: ['KKR', 'PBKS'], battingPosition: 10 }),
  makePlayer('Avesh Khan', { role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['RCB', 'LSG', 'RR', 'DC'], battingPosition: 9 }),
  makePlayer('Prasidh Krishna', { role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['KKR', 'RR', 'GT'], battingPosition: 10 }),
  makePlayer('Arshdeep Singh', { role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['PBKS', 'MI'], battingPosition: 9 }),
  makePlayer('Umran Malik', { role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['SRH'], battingPosition: 11 }),
  makePlayer('Mayank Agarwal', { captain: true, aggressiveBatting: true, teams: ['PBKS', 'RCB', 'SRH'], battingPosition: 1 }),
  makePlayer('Manish Pandey', { captain: true, aggressiveBatting: false, teams: ['KKR', 'SRH', 'LSG', 'RCB'], battingPosition: 3 }),
  makePlayer('Shreyas Iyer', { captain: true, aggressiveBatting: true, teams: ['DC', 'KKR', 'PBKS'], battingPosition: 3 }),
  makePlayer('Moeen Ali', { country: 'England', overseas: true, role: 'all-rounder', bowlingType: 'off-spin', aggressiveBatting: true, teams: ['CSK', 'RCB'], battingPosition: 4 }),
  makePlayer('Suryakumar Yadav', { aggressiveBatting: true, legendStatus: true, teams: ['MI', 'KKR'], battingPosition: 3, orangeCap: false, playoffAppearances: 7 }),
  makePlayer('Glenn Maxwell', { country: 'Australia', overseas: true, captain: true, aggressiveBatting: true, finisher: true, teams: ['RCB', 'PBKS', 'MI'], battingPosition: 4 }),
  makePlayer('Marcus Stoinis', { country: 'Australia', overseas: true, role: 'all-rounder', aggressiveBatting: true, finisher: true, teams: ['LSG', 'DC', 'PBKS'], battingPosition: 5 }),
  makePlayer('Riyan Parag', { aggressiveBatting: true, finisher: true, teams: ['RR'], battingPosition: 5 }),
  makePlayer('Dinesh Karthik', { wicketkeeper: true, finisher: true, teams: ['KKR', 'RCB', 'DC', 'MI', 'PBKS'], battingPosition: 6 }),
  makePlayer('Wriddhiman Saha', { wicketkeeper: true, teams: ['CSK', 'KKR', 'PBKS', 'SRH', 'GT'], battingPosition: 1 }),
  makePlayer('Parthiv Patel', { wicketkeeper: true, captain: false, teams: ['MI', 'CSK', 'RCB', 'DC', 'SRH', 'GL'], battingPosition: 1 }),
  makePlayer('Ambati Rayudu', { wicketkeeper: true, aggressiveBatting: true, legendStatus: true, teams: ['MI', 'CSK'], battingPosition: 4 }),
  makePlayer('Robin Uthappa', { wicketkeeper: true, aggressiveBatting: true, legendStatus: true, teams: ['KKR', 'CSK', 'RR', 'RCB'], battingPosition: 3 }),
  makePlayer('Kedar Jadhav', { captain: true, aggressiveBatting: false, teams: ['CSK', 'RCB', 'SRH', 'DC'], battingPosition: 4 }),
  makePlayer('Chetan Sakariya', { role: 'bowler', bowlingType: 'fast', teams: ['RR', 'DC'], battingPosition: 10 }),
  makePlayer('Harshal Patel', { role: 'bowler', bowlingType: 'medium-fast', purpleCap: true, teams: ['RCB', 'PBKS', 'DC'], battingPosition: 9 }),
  makePlayer('Amit Mishra', { role: 'bowler', bowlingType: 'leg-spin', purpleCap: true, teams: ['DC', 'LSG', 'SRH'], battingPosition: 10 }),
  makePlayer('Piyush Chawla', { role: 'bowler', bowlingType: 'leg-spin', teams: ['KKR', 'PBKS', 'MI', 'CSK'], battingPosition: 10 }),
  makePlayer('Anil Kumble', { role: 'bowler', bowlingType: 'leg-spin', captain: true, legendStatus: true, teams: ['RCB', 'MI'], battingPosition: 11 }),
  makePlayer('Adam Zampa', { country: 'Australia', overseas: true, role: 'bowler', bowlingType: 'leg-spin', teams: ['RCB', 'RR', 'SRH'], battingPosition: 10 }),
  makePlayer('Kane Williamson', { country: 'New Zealand', overseas: true, captain: true, aggressiveBatting: false, legendStatus: true, teams: ['SRH', 'GT', 'RCB'], battingPosition: 1 }),
  makePlayer('Brendon McCullum', { country: 'New Zealand', overseas: true, captain: true, aggressiveBatting: true, legendStatus: true, teams: ['KKR', 'CSK', 'GL', 'RCB'], battingPosition: 1 }),
  makePlayer('Eoin Morgan', { country: 'England', overseas: true, captain: true, aggressiveBatting: false, teams: ['KKR', 'SRH'], battingPosition: 3 }),
  makePlayer('Washington Sundar', { role: 'all-rounder', bowlingType: 'off-spin', teams: ['RCB', 'SRH', 'GT'], battingPosition: 7 }),
  makePlayer('Dale Steyn', { country: 'South Africa', overseas: true, role: 'bowler', bowlingType: 'fast', teams: ['SRH', 'RCB'], battingPosition: 11, legendStatus: true }),
  makePlayer('Umesh Yadav', { role: 'bowler', bowlingType: 'fast', teams: ['KKR', 'RCB', 'DC', 'SRH'], battingPosition: 9 }),
  makePlayer('Basil Thampi', { role: 'bowler', bowlingType: 'fast', teams: ['SRH', 'MI', 'GT'], battingPosition: 10 }),
  makePlayer('Prithvi Shaw', { aggressiveBatting: true, teams: ['DC', 'MI'], battingPosition: 1 }),
  makePlayer('Tilak Varma', { aggressiveBatting: true, teams: ['MI'], battingPosition: 3 }),
  makePlayer('Mayank Yadav', { role: 'bowler', bowlingType: 'fast', deathBowling: true, teams: ['LSG'], battingPosition: 11 }),
  makePlayer('Mohit Sharma', { role: 'bowler', bowlingType: 'fast', deathBowling: true, purpleCap: true, teams: ['CSK', 'PBKS', 'GT'], battingPosition: 10 }),
  makePlayer('Shardul Thakur', { role: 'all-rounder', bowlingType: 'fast', aggressiveBatting: true, teams: ['CSK', 'DC', 'KKR', 'LSG'], battingPosition: 8 }),
  makePlayer('Rahul Chahar', { role: 'bowler', bowlingType: 'leg-spin', teams: ['MI', 'PBKS', 'SRH'], battingPosition: 10 })
];

function loadGeneratedCatalog() {
  if (!fs.existsSync(generatedDatasetPath)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(generatedDatasetPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    if (parsed && Array.isArray(parsed.players) && parsed.players.length > 0) {
      return parsed.players;
    }
  } catch (_error) {
    return null;
  }

  return null;
}

function dedupePlayers(players) {
  const unique = new Map();
  for (const player of players) {
    const key = String(player.canonicalName || player.name).trim().toLowerCase();
    if (!unique.has(key)) {
      unique.set(key, {
        ...player,
        name: player.canonicalName || player.name,
        teamCode: player.teamCode || player.teams?.[0] || 'IPL'
      });
    }
  }
  return Array.from(unique.values());
}

export function getPlayerCatalog() {
  const generated = loadGeneratedCatalog();
  if (generated) {
    return dedupePlayers(generated);
  }
  return basePlayers;
}

export function getDatasetMeta() {
  if (!fs.existsSync(generatedDatasetPath)) {
    return { rawCount: basePlayers.length, uniqueCount: basePlayers.length, hasGenerated: false };
  }

  try {
    const raw = fs.readFileSync(generatedDatasetPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.players)) {
      return {
        rawCount: parsed.rawCount || parsed.players.length,
        uniqueCount: dedupePlayers(parsed.players).length,
        hasGenerated: true
      };
    }
    if (Array.isArray(parsed)) {
      return {
        rawCount: parsed.length,
        uniqueCount: dedupePlayers(parsed).length,
        hasGenerated: true
      };
    }
  } catch (_error) {
    return { rawCount: basePlayers.length, uniqueCount: basePlayers.length, hasGenerated: false };
  }

  return { rawCount: basePlayers.length, uniqueCount: basePlayers.length, hasGenerated: false };
}

export function getQuestionBank() {
  return [
    { id: 'overseas', text: 'Is your player an overseas cricketer?', reasoning: 'Overseas vs domestic is a strong first split.' },
    { id: 'keeper', text: 'Is your player primarily a wicketkeeper?', reasoning: 'Wicketkeepers are easy to isolate early.' },
    { id: 'captain', text: 'Has your player captained an IPL franchise?', reasoning: 'Captaincy narrows the search dramatically.' },
    { id: 'fast-bowler', text: 'Is your player primarily a fast bowler?', reasoning: 'Bowling style reduces the pool fast.' },
    { id: 'finisher', text: 'Is your player known as a finisher in T20 cricket?', reasoning: 'Finisher roles are extremely discriminative.' },
    { id: 'aggressive', text: 'Is your player known for aggressive batting?', reasoning: 'Batting tempo helps distinguish role archetypes.' },
    { id: 'top-order', text: 'Does your player usually bat in the top five?', reasoning: 'Batting order helps cut the pool in half.' },
    { id: 'orange-cap', text: 'Has your player won the Orange Cap?', reasoning: 'Orange Cap winners are rare and iconic.' },
    { id: 'purple-cap', text: 'Has your player won the Purple Cap?', reasoning: 'Bowling award winners are highly specific.' },
    { id: 'legend', text: 'Would you call your player an IPL legend?', reasoning: 'Legend status identifies all-time greats.' }
  ];
}
