// ──────────────────────────────────────────────────────────────────────
// ADD A NEW LEVEL HERE.
// Copy one object below, change the words, and save. That's it!
// The progress bar, lock order, level page, journal, Reflect page and
// printable challenge cards all read from this list.
//
//   id        short lowercase word, used in the web address (#/level/<id>)
//   short     label shown in the progress bar
//   icon      the name of an icon in js/ui/icons.js (for example 'bulb')
//   title     big heading on the level page
//   mission   one sentence challenge (grade 3–5 reading level)
//   steps     what to try, in order
//   think     a hint about what to look for
//   idea      (optional) a "Big idea" box that explains the AI concept
//   cards     which printable cards to use
//   prompts   journal questions: { id, text }  (id must be unique in the level)
// ──────────────────────────────────────────────────────────────────────

export const LEVELS = [
  {
    id: 'lighting',
    short: 'Lighting',
    icon: 'bulb',
    title: 'Lighting',
    mission: 'Can you fool the computer by changing the light?',
    steps: [
      'Hold up a card the computer already knows. Check that it guesses right.',
      'Now change the light. Turn the room lights down, make a shadow with your hand, or shine a phone flashlight on the card.',
      'Watch the bars. Does the computer still pick the right card?',
    ],
    think: 'Remember the light in the room when you took your training pictures.',
    cards: 'Sun and Fish cards',
    prompts: [
      { id: 'changed', text: 'What did you change about the light?' },
      { id: 'result', text: 'What did the computer guess?' },
      { id: 'why', text: 'Why do you think it got confused?' },
      { id: 'fix', text: 'How could you help the computer? (Hint: go back to Teach and add more pictures.)' },
    ],
  },
  {
    id: 'angles',
    short: 'Angles',
    icon: 'rotate-2',
    title: 'Angles',
    mission: 'Can you fool the computer by turning the card?',
    steps: [
      'Tilt the card sideways. Then turn it upside down.',
      'Hold the card very close to the camera. Then hold it far away.',
      'Cover half of the card with your hand.',
      'Which one confuses the computer the most?',
    ],
    think: 'Did you ever show the computer the card tilted, far away, or half hidden?',
    cards: 'Sun and Fish cards',
    prompts: [
      { id: 'changed', text: 'Which angle or distance did you try?' },
      { id: 'result', text: 'What did the computer guess?' },
      { id: 'why', text: 'Why do you think it got confused?' },
      { id: 'fix', text: 'What pictures could you add to help it?' },
    ],
  },
  {
    id: 'clutter',
    short: 'Clutter',
    icon: 'blocks',
    title: 'Clutter',
    mission: 'Can you fool the computer with a messy background?',
    steps: [
      'Put the Busy Background sheet behind your card. Or put toys, books and pencils around it.',
      'Hold up the Sun card. Then the Fish card.',
      'Watch the bars. What does the computer look at?',
    ],
    think: 'Was the background plain when you taught the computer?',
    cards: 'Sun and Fish cards, plus the Busy Background sheet',
    prompts: [
      { id: 'changed', text: 'What was in the background?' },
      { id: 'result', text: 'What did the computer guess?' },
      { id: 'why', text: 'Why do you think the background confused it?' },
      { id: 'fix', text: 'How could you teach it to ignore the clutter?' },
    ],
  },
  {
    id: 'neverseen',
    short: 'Never Seen',
    icon: 'rocket',
    title: 'Never Seen It',
    mission: 'Show the camera a brand new object you never trained. What does the AI guess?',
    steps: [
      'Hold up the Rocket card or the Moon card. The computer has never seen them! Or use any new object you like.',
      'Now try the Yellow Fish card and the Blue Sun card.',
      'Watch the bars. Does the computer ever say “I don’t know”?',
    ],
    think: 'The computer can only choose from the cards it learned. What clues might it use?',
    idea: 'An AI does not know what it does not know. It only has the “buckets” you gave it, like Sun and Fish. When it sees something new, it still has to pick a bucket, so it squeezes the new thing into the closest one. A person would say “Hmm, I have never seen that.” The AI just guesses, and it can sound very sure.',
    cards: 'Mystery cards (Rocket, Moon, Yellow Fish, Blue Sun)',
    prompts: [
      { id: 'guess', text: 'What did the computer say about the new object or card?' },
      { id: 'colour', text: 'What happened with the Yellow Fish and Blue Sun cards?' },
      { id: 'why', text: 'Why do you think the computer made those guesses?' },
      { id: 'bias', text: 'Why is it unfair or dangerous if an AI makes decisions about people using only narrow examples it was trained on?' },
    ],
  },
];
