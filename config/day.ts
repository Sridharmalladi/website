/**
 * What I am most likely doing right now.
 *
 * The clock is the same one the sky runs on, which is America/Chicago, so the
 * status and the light outside always agree with each other.
 *
 * A day is a list of blocks. Each block starts at an hour and runs till the
 * next one starts, and each one carries a bunch of words that mean roughly the
 * same thing. The status keeps cycling through that bunch until the block ends,
 * so the line stays alive even when nothing has actually changed.
 *
 * This is the only place to edit the routine. Change the hours, change the
 * words, add a block, and the top of the page follows.
 *
 * Keep every word plain and simple. No dashes anywhere, because this is read
 * by people and not by a parser.
 */

export type Block = {
  /** hour it starts, in Chicago time, as a fraction */
  from: number;
  /** what this stretch of the day is, for screen readers */
  label: string;
  /** words that get cycled while the block is on */
  words: string[];
};

/**
 * Sleep is 2 am to 9 am on most days. The afternoon nap is a maybe, so those
 * words say maybe. Everything here is tentative by nature, which is why the
 * line above it reads "probably".
 */
export const DAY: Block[] = [
  {
    from: 2,
    label: "asleep",
    words: [
      "sleeping",
      "dreaming",
      "dozing",
      "drifting",
      "far away",
      "out cold",
      "recharging",
      "dreaming again",
      "deep in sleep",
      "somewhere else",
    ],
  },
  {
    from: 9,
    label: "waking up",
    words: [
      "waking up",
      "stretching",
      "making chai",
      "blinking at the light",
      "booting up",
      "finding my glasses",
      "slowly starting",
    ],
  },
  {
    from: 10,
    label: "working",
    words: [
      "building",
      "thinking",
      "reading code",
      "wiring things up",
      "breaking something",
      "fixing it back",
      "tinkering",
      "shipping",
      "measuring",
      "in the middle of it",
    ],
  },
  {
    from: 13,
    label: "eating lunch",
    words: [
      "eating",
      "having lunch",
      "stepping away",
      "taking a breather",
      "off the keyboard",
    ],
  },
  {
    from: 14,
    label: "possibly napping",
    words: [
      "maybe napping",
      "resting my eyes",
      "half asleep",
      "possibly dreaming",
      "gone quiet",
      "back in five",
    ],
  },
  {
    from: 15.5,
    label: "working",
    words: [
      "building",
      "debugging",
      "testing",
      "plotting",
      "tuning",
      "reading papers",
      "chasing a bug",
      "cleaning up",
      "trying one more thing",
    ],
  },
  {
    from: 18.5,
    label: "evening",
    words: [
      "eating",
      "walking",
      "calling home",
      "away from the desk",
      "winding down",
      "watching something",
    ],
  },
  {
    from: 20,
    label: "working",
    words: [
      "building",
      "reading",
      "learning",
      "sketching ideas",
      "writing it down",
      "exploring",
      "going deeper",
      "one more commit",
    ],
  },
  {
    from: 23,
    label: "late night",
    words: [
      "still awake",
      "tinkering",
      "slowing down",
      "last commit of the day",
      "should be sleeping",
      "one last look",
      "closing the laptop",
    ],
  },
];

/** The block that covers this hour. Before the first one, the day has wrapped. */
export function blockAt(hour: number): Block {
  let current = DAY[DAY.length - 1];
  for (const block of DAY) {
    if (hour >= block.from) current = block;
  }
  return current;
}
