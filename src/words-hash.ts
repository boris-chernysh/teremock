// @ts-ignore
import { createHash } from 'crypto'

const WORDS: string[] = [
  'ack',
  'aim',
  'air',
  'and',
  'angel',
  'apart',
  'app',
  'april',
  'arizona',
  'ark',
  'artist',
  'aspen',
  'august',
  'autumn',
  'avocado',
  'axe',
  'bacon',
  'ban',
  'bark',
  'batman',
  'beam',
  'beer',
  'berlin',
  'biz',
  'black',
  'blue',
  'boo',
  'bravo',
  'bud',
  'bump',
  'burger',
  'bus',
  'butter',
  'carbon',
  'cardinal',
  'carolina',
  'carpet',
  'cat',
  'ceiling',
  'charlie',
  'chicken',
  'clip',
  'coffee',
  'cola',
  'cold',
  'color',
  'comet',
  'crazy',
  'cry',
  'cup',
  'cut',
  'dakota',
  'december',
  'delaware',
  'delta',
  'diet',
  'dog',
  'don',
  'door',
  'duck',
  'early',
  'earth',
  'east',
  'echo',
  'eco',
  'edward',
  'eight',
  'eme',
  'emma',
  'enemy',
  'equal',
  'failed',
  'fake',
  'fanta',
  'fifteen',
  'fillet',
  'finch',
  'fish',
  'five',
  'fix',
  'fiz',
  'floor',
  'flux',
  'fly',
  'four',
  'fruit',
  'gee',
  'georgia',
  'glucose',
  'goby',
  'golf',
  'green',
  'grey',
  'hamper',
  'happy',
  'harry',
  'hawaii',
  'helium',
  'high',
  'hook',
  'hot',
  'hotel',
  'hug',
  'hydrogen',
  'ice',
  'idaho',
  'illinois',
  'india',
  'indigo',
  'ink',
  'iowa',
  'island',
  'item',
  'jaws',
  'jazz',
  'jersey',
  'jet',
  'jig',
  'johnny',
  'juliet',
  'july',
  'jupiter',
  'kansas',
  'kentucky',
  'kid',
  'kilo',
  'king',
  'kitten',
  'lactose',
  'lake',
  'lamp',
  'lax',
  'lemon',
  'leopard',
  'lima',
  'limb',
  'lion',
  'lithium',
  'london',
  'low',
  'magazine',
  'maine',
  'mango',
  'march',
  'mars',
  'mass',
  'may',
  'mexico',
  'mic',
  'mike',
  'mirror',
  'miss',
  'mobile',
  'monkey',
  'moon',
  'muppet',
  'music',
  'neptune',
  'network',
  'nevada',
  'nine',
  'node',
  'north',
  'november',
  'nut',
  'nuts',
  'october',
  'ohio',
  'oil',
  'one',
  'orange',
  'oregon',
  'oscar',
  'oven',
  'owe',
  'oxid',
  'oxygen',
  'papa',
  'paris',
  'pasta',
  'perk',
  'pic',
  'pin',
  'pip',
  'pizza',
  'pluto',
  'potato',
  'queen',
  'quiet',
  'red',
  'rem',
  'ria',
  'river',
  'robin',
  'romeo',
  'rugby',
  'sad',
  'sad',
  'salami',
  'saturn',
  'seven',
  'sexy',
  'shade',
  'sierra',
  'single',
  'sink',
  'six',
  'sixteen',
  'skylark',
  'snake',
  'social',
  'sodium',
  'solar',
  'south',
  'spring',
  'spy',
  'steak',
  'steel',
  'stream',
  'summer',
  'sweet',
  'table',
  'tango',
  'tel',
  'ten',
  'tennis',
  'texas',
  'three',
  'tick',
  'timing',
  'tor',
  'toy',
  'twelve',
  'twenty',
  'two',
  'uncle',
  'uniform',
  'utah',
  'vegan',
  'venus',
  'victor',
  'video',
  'violet',
  'west',
  'white',
  'wiki',
  'winner',
  'winter',
  'xray',
  'yellow',
  'zag',
  'zebra',
  'zee',
  'zero',
  'zulu',
  'zuz',
]

const SEP = '-'

export function humanize(hexdigest: string, words: number = 3): string {
  // if one char changed, all words must change
  const hashed = createHash('md5')
    .update(hexdigest)
    .digest('hex')
  const pairs: string[] = hashed.match(/(..?)/g) as string[]
  const bytes: number[] = pairs.map((x) => parseInt(x, 16))
  const compressed = compress(bytes, words)

  return compressed.map((x: number): string => WORDS[x]).join(SEP)
}

function compress(bytes: number[], len: number): number[] {
  const length = bytes.length

  if (len > length) {
    throw new Error('Fewer input bytes than requested output')
  }

  const seg_size = (length / len) >> 0
  const segments: number[][] = []

  for (let i = 0; i < seg_size * len; i += seg_size) {
    segments.push(bytes.slice(i, i + seg_size))
  }

  segments[segments.length - 1] = segments[segments.length - 1].concat(bytes.slice(len * seg_size))

  const checksums = segments.map((x) => x.reduce((acc, curr) => acc ^ curr))

  return checksums
}