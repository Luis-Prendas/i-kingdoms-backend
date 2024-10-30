import { DB_RaceWithSubRace, DB_Response_RaceWithSubRace } from "../types/tables/race/race";

export function groupedByRace(items: DB_Response_RaceWithSubRace[]) {
  const groupedByRace = items.reduce((acc: DB_RaceWithSubRace[], item) => {
    const race = acc.find((group) => group.race_id === item.race_id);
    if (race) {
      race.sub_races.push(item.sub_race_name);
    } else {
      acc.push({ race_id: item.race_id, race_name: item.race_name, sub_races: [item.sub_race_name] });
    }
    return acc;
  }, [] as DB_RaceWithSubRace[]);

  return groupedByRace;
};