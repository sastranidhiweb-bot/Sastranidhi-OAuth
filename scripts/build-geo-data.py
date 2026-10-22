"""Build the country and city lists used by the launch registration form.

Source: GeoNames (https://www.geonames.org), CC BY 4.0. Download these three
files from https://download.geonames.org/export/dump/ into one folder:
    countryInfo.txt, admin1CodesASCII.txt, cities15000.zip (unzipped)

Usage:
    python scripts/build-geo-data.py <geonames-folder>

Writes:
    src/data/countries.js            name + ISO code + dialling code
    public/data/places/<ISO>.json    {states: [name, ...] A-Z,
                                      cities: [[city, stateIndex], ...] largest first}

Names are plain English without diacritics (see plain()), with a
few corrections below so common places read as they do on Google Maps.
"""

import json
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Uninhabited territories with no dialling code; nobody registers from these.
SKIP = {'AQ', 'BV', 'GS', 'HM', 'TF'}
# Former countries GeoNames still lists.
FORMER = {'CS', 'AN'}
# GeoNames leaves Kosovo's code blank.
DIAL_FIXES = {'XK': '383'}

# Spellings that differ from Google Maps, keyed by (country, ASCII name).
STATE_FIXES = {
    ('IN', 'Andaman and Nicobar'): 'Andaman and Nicobar Islands',
}
CITY_FIXES = {
    ('IN', 'Sholapur'): 'Solapur',
    ('IN', 'Teni'): 'Theni',
    ('IN', 'Dombivali'): 'Dombivli',
    ('IN', 'Borivli'): 'Borivali',
    ('IN', 'Nowrangapur'): 'Nabarangpur',
    ('IN', 'Punch'): 'Poonch',
    ('DE', 'Koln'): 'Cologne',
}
# Renamed cities, keyed by (country, state, ASCII name): the same old name
# can be a different city elsewhere (Aurangabad, Bihar is unchanged).
RENAMED_CITIES = {
    ('IN', 'Maharashtra', 'Aurangabad'): 'Chhatrapati Sambhajinagar',
    ('IN', 'Maharashtra', 'Osmanabad'): 'Dharashiv',
}
# GeoNames files these as city sections (PPLX), but they are cities in
# their own right; other sections (Dharavi, Rohini, Kowloon...) are left out.
KEEP_SECTIONS = {('IN', 'Navi Mumbai'), ('IN', 'Teni')}


# Countries whose ASCII names mark the Cyrillic soft sign with an apostrophe
# ("Homyel'", "Tver'"); Google spells these without it.
CYRILLIC = {'RU', 'UA', 'BY', 'KZ', 'KG', 'TJ', 'UZ', 'TM', 'MN', 'BG', 'MK', 'RS', 'ME', 'BA', 'MD'}


# Letters that don't decompose into base + accent, and fancy apostrophes
LETTERS = str.maketrans({
    'ı': 'i', 'ł': 'l', 'Ł': 'L', 'ø': 'o', 'Ø': 'O', 'æ': 'ae', 'Æ': 'Ae', 'ß': 'ss',
    'đ': 'd', 'Đ': 'D', 'ð': 'd', 'þ': 'th', 'œ': 'oe',
    'ʻ': "'", '’': "'", 'ʼ': "'", '‘': "'", 'ʿ': '', 'ʾ': '',
})


def plain(name, ascii_name='', iso=''):
    """Plain-English spelling: 'Zürich' -> 'Zurich', 'São Tomé' -> 'Sao Tome'.

    Strips accents from the local name rather than using GeoNames' ASCII
    name, which writes ü as 'ue' ('Zuerich'); falls back to the ASCII name
    for the few letters that still don't map.
    """
    text = ''.join(c for c in unicodedata.normalize('NFKD', name.translate(LETTERS)) if not unicodedata.combining(c))
    if not text.isascii():
        text = ascii_name or text
    text = text.replace('`', '')  # Arabic ayn: "Madinat `Isa" -> "Madinat Isa"
    if iso in CYRILLIC:
        text = text.replace("'", '')
    return ' '.join(text.split())


def dial_code(iso, raw):
    raw = DIAL_FIXES.get(iso, raw).strip()
    # "+1-809 and 1-829" -> "+1 809"; "358-18" -> "+358 18"
    raw = raw.split(' and ')[0].lstrip('+').replace('-', ' ')
    return f'+{raw}' if raw else ''


def main(src):
    src = Path(src)

    countries = []
    for line in (src / 'countryInfo.txt').read_text(encoding='utf-8').splitlines():
        if not line or line.startswith('#'):
            continue
        cols = line.split('\t')
        iso, name, phone = cols[0], cols[4], cols[12]
        if iso in SKIP or iso in FORMER:
            continue
        countries.append({'code': iso, 'name': plain(name), 'dial': dial_code(iso, phone)})
    countries.sort(key=lambda c: c['name'])

    # first-level divisions (states / provinces / regions) per country
    states = defaultdict(dict)  # iso -> {admin1 code: name}
    for line in (src / 'admin1CodesASCII.txt').read_text(encoding='utf-8').splitlines():
        cols = line.split('	')
        iso, admin1 = cols[0].split('.', 1)
        name = plain(cols[1], cols[2], iso)
        states[iso][admin1] = STATE_FIXES.get((iso, name), name)

    cities = defaultdict(list)
    for line in (src / 'cities15000.txt').read_text(encoding='utf-8').splitlines():
        cols = line.split('	')
        iso, admin1, population = cols[8], cols[10], int(cols[14] or 0)
        name = plain(cols[1], cols[2], iso)
        if cols[7] == 'PPLX' and (iso, name) not in KEEP_SECTIONS:
            continue
        state = states[iso].get(admin1, '')
        name = RENAMED_CITIES.get((iso, state, name)) or CITY_FIXES.get((iso, name), name)
        cities[iso].append((population, name, state))

    out_dir = ROOT / 'public' / 'data' / 'places'
    out_dir.mkdir(parents=True, exist_ok=True)
    for old in out_dir.glob('*.json'):
        old.unlink()
    codes = {c['code'] for c in countries}
    files = 0
    for iso in sorted(codes & (set(states) | set(cities))):
        state_names = sorted(set(states[iso].values()))
        index = {n: i for i, n in enumerate(state_names)}
        rows = sorted(cities[iso], key=lambda r: -r[0])
        seen = set()
        city_rows = []
        for _, name, state in rows:
            if (name, state) in seen:
                continue
            seen.add((name, state))
            # [city, index into states]; a city with no known state is just [city]
            city_rows.append([name, index[state]] if state in index else [name])
        (out_dir / f'{iso}.json').write_text(
            json.dumps({'states': state_names, 'cities': city_rows}, ensure_ascii=False, separators=(',', ':')),
            encoding='utf-8',
        )
        files += 1

    lines = [
        '// Generated by scripts/build-geo-data.py from GeoNames (CC BY 4.0). Do not edit.',
        '// code: ISO 3166-1 alpha-2; dial: international dialling prefix.',
        'export const countries = [',
    ]
    for c in countries:
        lines.append(
            f"  {{ code: '{c['code']}', name: {json.dumps(c['name'], ensure_ascii=False)}, dial: '{c['dial']}' }},"
        )
    lines.append('];')
    (ROOT / 'src' / 'data' / 'countries.js').write_text('\n'.join(lines) + '\n', encoding='utf-8')

    print(f'{len(countries)} countries, {sum(len(v) for v in states.values())} states, '
          f'{sum(len(v) for v in cities.values())} cities in {files} files')


if __name__ == '__main__':
    main(sys.argv[1])
