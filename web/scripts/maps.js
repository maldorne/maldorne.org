// Generates the public map viewer from the map files in source/_data/maps/<slug>/*.json
// (format mapper/1, copied there by `npm run maps:sync`):
//   /maps/                        games that have maps
//   /maps/<slug>/                 maps of one game
//   /maps/<slug>/<map>/           the viewer
//   /maps/<slug>/<map>/map.json   the map, fetched by the viewer
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { createHash } = require('node:crypto');

const FORMAT = 'mapper/1';

const readConfig = () => {
  try {
    return JSON.parse(readFileSync(join(hexo.base_dir, 'maps.config.json'), 'utf8'));
  } catch {
    return {};
  }
};

// { slug: { file: mapData } } from hexo's data box (keys look like maps/<slug>/<file>)
const collect = (data) => {
  const games = {};
  Object.keys(data).forEach((key) => {
    const parts = key.split('/');
    if (parts.length !== 3 || parts[0] !== 'maps') return;
    const map = data[key];
    if (!map || map.format !== FORMAT) {
      hexo.log.warn(`maps: ${key} is not a ${FORMAT} file, skipped`);
      return;
    }
    games[parts[1]] = games[parts[1]] || {};
    games[parts[1]][parts[2]] = map;
  });
  return games;
};

// area path -> file of the map that holds locations of that area
const indexAreas = (maps) => {
  const byArea = {};
  Object.keys(maps).forEach((file) => {
    maps[file].locations.forEach((l) => {
      if (!byArea[l.area]) byArea[l.area] = file;
    });
  });
  return byArea;
};

// adds to every external exit the map and location it leads to, when a map has them
const resolveExternal = (file, maps, byArea) => {
  const map = maps[file];
  const external = (map.external || []).map((e) => {
    const target = byArea[e.area];
    if (!target) return { ...e };
    const dest = maps[target].locations.find(
      (l) => l.area === e.area && (l.id === e.to || l.id.endsWith('/' + e.to)),
    );
    return {
      ...e,
      target: { map: target, name: maps[target].name || target, id: dest ? dest.id : null },
    };
  });
  return { ...map, external };
};

hexo.extend.generator.register('maps', function (locals) {
  const config = readConfig();
  const games = collect(locals.data);
  const routes = [];
  const gameList = [];

  Object.keys(games)
    .sort()
    .forEach((slug) => {
      const maps = games[slug];
      const byArea = indexAreas(maps);
      const title = (config[slug] && config[slug].title) || slug;
      const entries = [];

      Object.keys(maps)
        .sort()
        .forEach((file) => {
          const map = maps[file];
          const base = `maps/${slug}/${file}/`;
          const raw = map.name || file;
          const name = raw.charAt(0).toUpperCase() + raw.slice(1);
          entries.push({
            name,
            url: `/${base}`,
            locations: map.locations.length,
            levels: map.levels.length,
            areas: map.areas.length,
          });

          const json = JSON.stringify(resolveExternal(file, maps, byArea));
          // the viewer asks for map.json?v=<hash of its content>, so a browser never
          // keeps an old map once it changes
          const version = createHash('sha1').update(json).digest('hex').slice(0, 10);
          routes.push({
            path: base + 'map.json',
            data: json,
          });
          routes.push({
            path: base,
            layout: 'map',
            data: {
              title: `Map of ${name}`,
              map_name: name,
              game_title: title,
              game_url: `/maps/${slug}/`,
              json_url: `/${base}map.json?v=${version}`,
              base_url: `/${base}`,
              generated: map.generated || '',
            },
          });
        });

      gameList.push({ name: title, url: `/maps/${slug}/`, maps: entries.length });
      routes.push({
        path: `maps/${slug}/`,
        layout: 'maps-index',
        data: { title: `Maps of ${title}`, parent: { name: 'Maps', url: '/maps/' }, entries },
      });
    });

  if (gameList.length) {
    routes.push({
      path: 'maps/',
      layout: 'maps-index',
      data: { title: 'Maps', entries: gameList, games: true },
    });
  }

  return routes;
});
