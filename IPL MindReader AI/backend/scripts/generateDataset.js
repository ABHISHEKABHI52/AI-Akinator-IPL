import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { basePlayers } from '../src/data/playerSeeds.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, '..', 'data', 'ipl-players.generated.json');

const seasons = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
const formTags = ['peak', 'prime', 'playoff-hero', 'death-over-specialist', 'anchor', 'match-winner', 'clutch', 'legend'];

function rotate(items, index) {
  return items[index % items.length];
}

function buildProfile(base, index) {
  const season = rotate(seasons, index);
  const form = rotate(formTags, index * 3);
  const teamCode = rotate(base.teams || ['IPL'], index);

  return {
    canonicalName: base.name,
    name: base.name,
    profileName: `${base.name} • ${season} • ${form}`,
    country: base.country,
    overseas: base.overseas,
    role: base.role,
    battingStyle: base.battingStyle,
    bowlingType: base.bowlingType,
    teams: base.teams,
    teamCode,
    captain: base.captain,
    finisher: base.finisher,
    wicketkeeper: base.wicketkeeper,
    awards: base.awards,
    trophies: base.trophies,
    orangeCap: base.orangeCap,
    purpleCap: base.purpleCap,
    activeSeasons: Array.from(new Set([...(base.activeSeasons || []), season])),
    aggressiveBatting: base.aggressiveBatting,
    deathBowling: base.deathBowling,
    legendStatus: base.legendStatus,
    playoffAppearances: base.playoffAppearances,
    battingPosition: base.battingPosition,
    profileImage: base.profileImage,
    season,
    form,
    momentum: (index % 7) + 1
  };
}

const generated = [];
for (let index = 0; index < 1000; index += 1) {
  const base = basePlayers[index % basePlayers.length];
  generated.push(buildProfile(base, index));
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify({
  rawCount: generated.length,
  uniqueCount: basePlayers.length,
  generatedAt: new Date().toISOString(),
  players: generated
}, null, 2));

console.log(`Generated ${generated.length} IPL profiles at ${outputPath}`);
