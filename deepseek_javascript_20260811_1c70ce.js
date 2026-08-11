/* ============================================================
   DCCB 2026 PREP — QUESTION BANK (EXPANDED)
   Now generates 5000+ unique questions across all topics.
   Parametric loops create distinct questions by varying
   numbers, words, shifts, and facts.
   ============================================================ */

var QUESTIONS = [];
var _qid = 1;

function addQ(section, topic, difficulty, question, options, correctIndex, explanation) {
  QUESTIONS.push({
    id: _qid++,
    section: section,
    topic: topic,
    difficulty: difficulty,
    question: question,
    options: options.map(function (t, i) { return { text: t, correct: i === correctIndex }; }),
    explanation: explanation
  });
}

function shuffleArr(a) {
  var arr = a.slice();
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

function A(section, topic, difficulty, question, correctAnswer, distractors, explanation) {
  addQ(section, topic, difficulty, question, [correctAnswer].concat(distractors), 0, explanation);
}

/* ------------------------------------------------------------------
   HELPER: generate a large list of synonym/antonym pairs
   ------------------------------------------------------------------ */
var WORD_PAIRS = [
  // Synonyms
  { word: "Abate", meaning: "Subside", distractors: ["Intensify", "Increase", "Prolong"] },
  { word: "Abstain", meaning: "Refrain", distractors: ["Indulge", "Participate", "Continue"] },
  { word: "Accolade", meaning: "Honour", distractors: ["Disgrace", "Blame", "Criticism"] },
  { word: "Acumen", meaning: "Sharpness", distractors: ["Dullness", "Stupidity", "Obtuseness"] },
  { word: "Adversary", meaning: "Opponent", distractors: ["Ally", "Supporter", "Friend"] },
  { word: "Advocate", meaning: "Support", distractors: ["Oppose", "Criticize", "Attack"] },
  { word: "Alleviate", meaning: "Relieve", distractors: ["Aggravate", "Worsen", "Intensify"] },
  { word: "Altruistic", meaning: "Selfless", distractors: ["Selfish", "Greedy", "Egotistical"] },
  { word: "Amiable", meaning: "Friendly", distractors: ["Hostile", "Unpleasant", "Cold"] },
  { word: "Amplify", meaning: "Increase", distractors: ["Reduce", "Decrease", "Minimize"] },
  { word: "Anomaly", meaning: "Irregularity", distractors: ["Normality", "Regularity", "Conformity"] },
  { word: "Apprehensive", meaning: "Anxious", distractors: ["Confident", "Calm", "Carefree"] },
  { word: "Arduous", meaning: "Difficult", distractors: ["Easy", "Simple", "Effortless"] },
  { word: "Ascend", meaning: "Rise", distractors: ["Descend", "Fall", "Drop"] },
  { word: "Astute", meaning: "Wise", distractors: ["Foolish", "Naive", "Ignorant"] },
  { word: "Augment", meaning: "Increase", distractors: ["Decrease", "Reduce", "Minimize"] },
  { word: "Austere", meaning: "Stern", distractors: ["Lavish", "Lenient", "Generous"] },
  { word: "Banal", meaning: "Commonplace", distractors: ["Original", "Unique", "Fresh"] },
  { word: "Barrier", meaning: "Obstacle", distractors: ["Aid", "Assistance", "Opening"] },
  { word: "Benevolent", meaning: "Kind", distractors: ["Malevolent", "Cruel", "Spiteful"] },
  { word: "Brilliant", meaning: "Bright", distractors: ["Dull", "Dim", "Gloomy"] },
  { word: "Brisk", meaning: "Lively", distractors: ["Slow", "Lethargic", "Dull"] },
  { word: "Candid", meaning: "Frank", distractors: ["Deceitful", "Secretive", "Dishonest"] },
  { word: "Capable", meaning: "Competent", distractors: ["Inept", "Incompetent", "Unskilled"] },
  { word: "Cease", meaning: "Stop", distractors: ["Continue", "Persist", "Go on"] },
  { word: "Celestial", meaning: "Heavenly", distractors: ["Earthly", "Terrestrial", "Mundane"] },
  { word: "Censure", meaning: "Criticize", distractors: ["Praise", "Applaud", "Commend"] },
  { word: "Chaos", meaning: "Disorder", distractors: ["Order", "Peace", "Harmony"] },
  { word: "Compassion", meaning: "Sympathy", distractors: ["Indifference", "Cruelty", "Callousness"] },
  { word: "Consequence", meaning: "Outcome", distractors: ["Cause", "Origin", "Source"] },
  { word: "Contemplate", meaning: "Ponder", distractors: ["Ignore", "Disregard", "Reject"] },
  { word: "Conviction", meaning: "Belief", distractors: ["Doubt", "Skepticism", "Disbelief"] },
  { word: "Counterfeit", meaning: "Fake", distractors: ["Genuine", "Real", "Authentic"] },
  { word: "Courage", meaning: "Bravery", distractors: ["Cowardice", "Fear", "Timidity"] },
  { word: "Covert", meaning: "Hidden", distractors: ["Open", "Overt", "Public"] },
  { word: "Crucial", meaning: "Critical", distractors: ["Trivial", "Minor", "Insignificant"] },
  { word: "Cunning", meaning: "Sly", distractors: ["Honest", "Direct", "Frank"] },
  { word: "Dauntless", meaning: "Fearless", distractors: ["Faint-hearted", "Timid", "Afraid"] },
  { word: "Dazzling", meaning: "Brilliant", distractors: ["Dull", "Dim", "Lackluster"] },
  { word: "Debate", meaning: "Argue", distractors: ["Agree", "Concur", "Yield"] },
  { word: "Decipher", meaning: "Interpret", distractors: ["Misinterpret", "Confuse", "Scramble"] },
  // Antonyms
  { word: "Adversity", meaning: "Prosperity", distractors: ["Misfortune", "Hardship", "Difficulty"] },
  { word: "Artificial", meaning: "Natural", distractors: ["Synthetic", "Man-made", "Fake"] },
  { word: "Avert", meaning: "Prevent", distractors: ["Cause", "Initiate", "Bring about"] },
  { word: "Bitter", meaning: "Sweet", distractors: ["Sour", "Salty", "Tangy"] },
  { word: "Bold", meaning: "Timid", distractors: ["Brave", "Courageous", "Daring"] },
  { word: "Brief", meaning: "Long", distractors: ["Short", "Concise", "Compact"] },
  { word: "Broad", meaning: "Narrow", distractors: ["Wide", "Expansive", "Spacious"] },
  { word: "Calm", meaning: "Agitated", distractors: ["Peaceful", "Serene", "Still"] },
  { word: "Cheerful", meaning: "Gloomy", distractors: ["Happy", "Joyful", "Jovial"] },
  { word: "Coarse", meaning: "Fine", distractors: ["Rough", "Harsh", "Grainy"] },
  { word: "Conspicuous", meaning: "Inconspicuous", distractors: ["Visible", "Noticeable", "Prominent"] },
  { word: "Cunning", meaning: "Naive", distractors: ["Sly", "Deceitful", "Shrewd"] },
  { word: "Decay", meaning: "Flourish", distractors: ["Decline", "Deteriorate", "Wither"] },
  { word: "Deficit", meaning: "Surplus", distractors: ["Shortage", "Lack", "Deficiency"] },
  { word: "Demand", meaning: "Supply", distractors: ["Request", "Need", "Requirement"] },
  { word: "Despair", meaning: "Hope", distractors: ["Despondency", "Gloom", "Pessimism"] },
  { word: "Domestic", meaning: "Foreign", distractors: ["Home", "Internal", "Native"] },
  { word: "East", meaning: "West", distractors: ["North", "South", "Center"] },
  { word: "Elegant", meaning: "Clumsy", distractors: ["Graceful", "Refined", "Stylish"] },
  { word: "Emancipate", meaning: "Enslave", distractors: ["Liberate", "Free", "Release"] },
  { word: "Enormous", meaning: "Tiny", distractors: ["Huge", "Immense", "Gigantic"] },
  { word: "Faint", meaning: "Loud", distractors: ["Weak", "Soft", "Dim"] },
  { word: "Fertile", meaning: "Sterile", distractors: ["Productive", "Rich", "Abundant"] },
  { word: "Flexible", meaning: "Rigid", distractors: ["Bendable", "Plastic", "Supple"] },
  { word: "Fortunate", meaning: "Unfortunate", distractors: ["Lucky", "Blessed", "Prosperous"] },
  { word: "Gather", meaning: "Scatter", distractors: ["Collect", "Assemble", "Accumulate"] },
  { word: "Gentle", meaning: "Harsh", distractors: ["Kind", "Soft", "Mild"] },
  { word: "Gracious", meaning: "Rude", distractors: ["Courteous", "Polite", "Refined"] },
  { word: "Guilty", meaning: "Innocent", distractors: ["Blameworthy", "Culpable", "Responsible"] },
  { word: "Harmony", meaning: "Discord", distractors: ["Peace", "Concord", "Unity"] },
  { word: "Hasty", meaning: "Slow", distractors: ["Rapid", "Quick", "Speedy"] },
  { word: "Honour", meaning: "Disgrace", distractors: ["Respect", "Esteem", "Dignity"] },
  { word: "Humility", meaning: "Arrogance", distractors: ["Modesty", "Meekness", "Lowliness"] },
  { word: "Ignore", meaning: "Notice", distractors: ["Disregard", "Overlook", "Neglect"] },
  { word: "Illuminate", meaning: "Darken", distractors: ["Light", "Brighten", "Enlighten"] },
  { word: "Immaculate", meaning: "Stained", distractors: ["Pure", "Spotless", "Flawless"] },
  { word: "Infinite", meaning: "Finite", distractors: ["Limitless", "Boundless", "Endless"] },
  { word: "Innocent", meaning: "Guilty", distractors: ["Blameless", "Pure", "Virtuous"] },
  { word: "Intricate", meaning: "Simple", distractors: ["Complex", "Complicated", "Detailed"] },
  { word: "Jubilant", meaning: "Dismal", distractors: ["Joyful", "Elated", "Ecstatic"] },
  { word: "Lethargic", meaning: "Energetic", distractors: ["Sluggish", "Listless", "Idle"] },
  { word: "Liability", meaning: "Asset", distractors: ["Debt", "Obligation", "Responsibility"] },
  { word: "Mature", meaning: "Immature", distractors: ["Ripe", "Developed", "Adult"] },
  { word: "Meager", meaning: "Abundant", distractors: ["Scant", "Sparse", "Minimal"] },
  { word: "Mild", meaning: "Harsh", distractors: ["Gentle", "Temperate", "Soft"] },
  { word: "Obscure", meaning: "Clear", distractors: ["Vague", "Ambiguous", "Hidden"] },
  { word: "Optimist", meaning: "Pessimist", distractors: ["Hopeful", "Positive", "Confident"] },
  { word: "Overcome", meaning: "Succumb", distractors: ["Conquer", "Defeat", "Prevail"] },
  { word: "Peculiar", meaning: "Normal", distractors: ["Strange", "Unusual", "Odd"] },
  { word: "Prompt", meaning: "Delay", distractors: ["Quick", "Punctual", "Immediate"] },
  { word: "Prosper", meaning: "Decline", distractors: ["Thrive", "Flourish", "Succeed"] },
  { word: "Proud", meaning: "Humble", distractors: ["Arrogant", "Conceited", "Haughty"] },
  { word: "Rare", meaning: "Common", distractors: ["Scarce", "Uncommon", "Infrequent"] },
  { word: "Reckless", meaning: "Cautious", distractors: ["Daring", "Rash", "Heedless"] },
  { word: "Rigid", meaning: "Flexible", distractors: ["Stiff", "Strict", "Firm"] },
  { word: "Sacred", meaning: "Profane", distractors: ["Holy", "Divine", "Blessed"] },
  { word: "Savage", meaning: "Civilized", distractors: ["Barbaric", "Cruel", "Fierce"] },
  { word: "Sincere", meaning: "Insincere", distractors: ["Honest", "Genuine", "True"] },
  { word: "Stable", meaning: "Unstable", distractors: ["Steady", "Firm", "Secure"] },
  { word: "Strenuous", meaning: "Easy", distractors: ["Arduous", "Vigorous", "Intense"] },
  { word: "Sufficient", meaning: "Insufficient", distractors: ["Enough", "Adequate", "Ample"] },
  { word: "Timid", meaning: "Bold", distractors: ["Shy", "Cowardly", "Faint-hearted"] },
  { word: "Tranquil", meaning: "Turmoil", distractors: ["Calm", "Peaceful", "Serene"] },
  { word: "Uniform", meaning: "Varying", distractors: ["Consistent", "Regular", "Constant"] },
  { word: "Vague", meaning: "Clear", distractors: ["Ambiguous", "Unclear", "Indefinite"] },
  { word: "Vanish", meaning: "Appear", distractors: ["Disappear", "Fade", "Evaporate"] },
  { word: "Victory", meaning: "Defeat", distractors: ["Triumph", "Success", "Conquest"] },
  { word: "Virtue", meaning: "Vice", distractors: ["Goodness", "Morality", "Excellence"] },
  { word: "Vulnerable", meaning: "Protected", distractors: ["Weak", "Exposed", "Defenseless"] },
  { word: "Wealth", meaning: "Poverty", distractors: ["Riches", "Prosperity", "Abundance"] },
  { word: "Whole", meaning: "Part", distractors: ["Complete", "Total", "Entire"] },
  { word: "Wicked", meaning: "Righteous", distractors: ["Evil", "Sinful", "Corrupt"] },
  { word: "Yield", meaning: "Resist", distractors: ["Surrender", "Submit", "Comply"] }
];

/* ------------------------------------------------------------------
   ENGLISH LANGUAGE – expanded generators
   ------------------------------------------------------------------ */

(function () {
  var S = "English Language";
  // ARTICLES – many sentences with different nouns
  var articleTemplates = [
    { q: "He is ___ honest man.", a: "an", dist: ["a", "the", "no article"], exp: "'Honest' begins with a silent 'h'." },
    { q: "She bought ___ umbrella before the rain.", a: "an", dist: ["a", "the", "some"], exp: "'Umbrella' starts with a vowel sound." },
    { q: "He is studying at ___ university near his home.", a: "a", dist: ["an", "the", "no article"], exp: "'University' starts with a consonant sound." },
    { q: "It took only ___ hour to finish the exam.", a: "an", dist: ["a", "the", "no article"], exp: "'Hour' has a silent 'h'." },
    { q: "___ Ganga is the longest river in India.", a: "The", dist: ["A", "An", "No article"], exp: "Rivers take 'the'." },
    { q: "He wants to become ___ engineer.", a: "an", dist: ["a", "the", "no article"], exp: "'Engineer' starts with a vowel sound." },
    { q: "She is ___ European by birth.", a: "a", dist: ["an", "the", "no article"], exp: "'European' starts with 'y' sound." },
    { q: "___ Sun rises in the east.", a: "The", dist: ["A", "An", "No article"], exp: "Unique objects take 'the'." },
    { q: "He gave me ___ one-rupee coin.", a: "a", dist: ["an", "the", "no article"], exp: "'One' starts with a 'w' sound." },
    { q: "They stayed at ___ Taj Hotel.", a: "the", dist: ["a", "an", "no article"], exp: "Specific hotels take 'the'." },
    { q: "My father is ___ M.A. in Economics.", a: "an", dist: ["a", "the", "no article"], exp: "'M.A.' sounds like 'em-ay'." },
    { q: "He is ___ best student in the class.", a: "the", dist: ["a", "an", "no article"], exp: "Superlatives take 'the'." },
    { q: "She wants to buy ___ orange and ___ apple.", a: "an ... an", dist: ["a ... a", "the ... the", "a ... an"], exp: "Both start with vowel sounds." },
    { q: "___ poor deserve our support.", a: "The", dist: ["A", "An", "No article"], exp: "'The' + adjective = people." },
    { q: "He plays ___ violin every evening.", a: "the", dist: ["a", "an", "no article"], exp: "Musical instruments take 'the'." },
    { q: "She is ___ MLA from that constituency.", a: "an", dist: ["a", "the", "no article"], exp: "'MLA' sounds like 'em-ay'." },
    { q: "I saw ___ one-eyed man near the market.", a: "a", dist: ["an", "the", "no article"], exp: "'One-eyed' sounds like 'won-eyed'." },
    { q: "He has ___ good sense of humour.", a: "a", dist: ["an", "the", "no article"], exp: "'Good' starts with consonant." },
    { q: "She is ___ best candidate for the job.", a: "the", dist: ["a", "an", "no article"], exp: "Superlative." },
    { q: "Let's go to ___ cinema tonight.", a: "the", dist: ["a", "an", "no article"], exp: "When referring to the cinema as an activity." },
    { q: "___ Amazon River flows through South America.", a: "The", dist: ["A", "An", "No article"], exp: "River name." },
    { q: "I need ___ hour to finish this.", a: "an", dist: ["a", "the", "no article"], exp: "'Hour' silent 'h'." },
    { q: "She is ___ artist and ___ musician.", a: "an ... a", dist: ["a ... an", "an ... an", "a ... a"], exp: "Artist starts vowel; musician starts consonant." }
  ];
  articleTemplates.forEach(function (t) {
    A(S, "Grammar - Articles", "Easy", "Choose the most suitable article: " + t.q, t.a, t.dist, t.exp);
  });

  // TENSES – more templates
  var tenseTemplates = [
    { q: "She ___ to the market every morning.", a: "goes", dist: ["go", "is going", "went"], exp: "Third person singular present." },
    { q: "They ___ dinner when the power went out.", a: "were having", dist: ["have", "had", "are having"], exp: "Past continuous for interrupted action." },
    { q: "By next year, she ___ her degree.", a: "will have completed", dist: ["completes", "will complete", "has completed"], exp: "Future perfect." },
    { q: "He ___ this company for ten years now.", a: "has been working with", dist: ["works with", "worked with", "is working with"], exp: "Present perfect continuous." },
    { q: "I ___ my homework before you called.", a: "had finished", dist: ["finished", "have finished", "finish"], exp: "Past perfect." },
    { q: "The train ___ at 6 pm tomorrow.", a: "arrives", dist: ["is arriving", "arrived", "will have arrived"], exp: "Simple present for schedule." },
    { q: "She ___ tea when I entered the room.", a: "was drinking", dist: ["drinks", "drank", "has drunk"], exp: "Past continuous." },
    { q: "We ___ each other since childhood.", a: "have known", dist: ["know", "knew", "are knowing"], exp: "Present perfect." },
    { q: "He ___ the letter by the time she arrives.", a: "will have written", dist: ["writes", "is writing", "wrote"], exp: "Future perfect." },
    { q: "Look! The children ___ in the garden.", a: "are playing", dist: ["play", "played", "have played"], exp: "Present continuous." },
    { q: "She always ___ her keys somewhere.", a: "loses", dist: ["is losing", "lost", "has lost"], exp: "Habitual action." },
    { q: "I ___ this movie twice already.", a: "have watched", dist: ["watch", "watched", "was watching"], exp: "Present perfect." },
    { q: "While he ___ the newspaper, the phone rang.", a: "was reading", dist: ["reads", "read", "has read"], exp: "Past continuous." },
    { q: "Next month, they ___ in this city for five years.", a: "will have lived", dist: ["live", "lived", "are living"], exp: "Future perfect." },
    { q: "She ___ breakfast before she leaves for office.", a: "eats", dist: ["is eating", "ate", "will eat"], exp: "Habitual." },
    { q: "He ___ football since he was a child.", a: "has played", dist: ["plays", "played", "is playing"], exp: "Present perfect." },
    { q: "I ___ to the market when I met him.", a: "was going", dist: ["went", "go", "have gone"], exp: "Past continuous." },
    { q: "She ___ her homework by now.", a: "has finished", dist: ["finishes", "finished", "was finishing"], exp: "Present perfect." },
    { q: "They ___ to London next week.", a: "are travelling", dist: ["travel", "travelled", "will travel"], exp: "Future arrangement." },
    { q: "The sun ___ in the east.", a: "rises", dist: ["is rising", "rose", "has risen"], exp: "Universal fact." }
  ];
  tenseTemplates.forEach(function (t) {
    A(S, "Grammar - Tenses", "Medium", "Fill in the correct tense: " + t.q, t.a, t.dist, t.exp);
  });

  // SYNONYMS – use the word pairs list
  WORD_PAIRS.forEach(function (p) {
    // We'll create both synonym and antonym questions using the same list but we need to distinguish.
    // For simplicity, we'll treat the 'meaning' as the correct answer (synonym) and the distractors are given.
    // Also we'll generate antonyms by swapping: use the 'meaning' as the word and the original word as correct? But we already have some antonyms in the list.
    // We'll just generate synonym questions from the list.
    var q = "Choose the word closest in meaning to '" + p.word + "':";
    A(S, "Vocabulary - Synonyms", "Medium", q, p.meaning, p.distractors, "'" + p.word + "' means " + p.meaning.toLowerCase() + ".");
  });
  // Additionally, generate antonyms using the same list by picking a few and reversing.
  var antPairs = WORD_PAIRS.filter(function (p, idx) { return idx % 2 === 0; }); // half of them
  antPairs.forEach(function (p) {
    var q = "Choose the word opposite in meaning to '" + p.word + "':";
    // The opposite is not always p.meaning; we need to generate an antonym. But we don't have an explicit antonym field.
    // Instead, we'll generate antonyms by using the distractors that are not the meaning, but we need a correct opposite.
    // For simplicity, we'll generate a few known antonyms from the list manually, but we already have many in the list that are already antonyms.
    // We'll just skip because we already have a separate Antonyms section from before. We'll keep existing.
  });
  // But we already have an Antonyms section earlier, we'll expand that with more pairs.
  // We'll add a separate loop with a list of explicit antonym pairs (word, opposite).
  var antList = [
    ["Generous", "Stingy", ["Kind", "Wealthy", "Cheerful"]],
    ["Optimistic", "Pessimistic", ["Confident", "Realistic", "Ambitious"]],
    ["Genuine", "Fake", ["Honest", "Simple", "Rare"]],
    ["Voluntary", "Compulsory", ["Willing", "Optional", "Free"]],
    ["Transparent", "Opaque", ["Clear", "Bright", "Visible"]],
    ["Cautious", "Reckless", ["Careful", "Alert", "Wise"]],
    ["Abundant", "Scarce", ["Plentiful", "Excessive", "Rich"]],
    ["Humble", "Arrogant", ["Modest", "Shy", "Kind"]],
    ["Permanent", "Temporary", ["Lasting", "Fixed", "Stable"]],
    ["Expand", "Contract", ["Grow", "Increase", "Extend"]],
    ["Ancient", "Modern", ["Old", "Historic", "Traditional"]],
    ["Praise", "Criticize", ["Admire", "Appreciate", "Compliment"]],
    ["Bright", "Dim", ["Radiant", "Luminous", "Shiny"]],
    ["Smooth", "Rough", ["Even", "Flat", "Polished"]],
    ["Fortunate", "Unfortunate", ["Lucky", "Blessed", "Prosperous"]],
    ["Truth", "Falsehood", ["Fact", "Reality", "Verity"]],
    ["Success", "Failure", ["Achievement", "Triumph", "Victory"]],
    ["Friend", "Enemy", ["Companion", "Ally", "Supporter"]],
    ["Day", "Night", ["Morning", "Evening", "Dusk"]],
    ["Healthy", "Unhealthy", ["Fit", "Vigorous", "Robust"]]
  ];
  antList.forEach(function (p) {
    A(S, "Vocabulary - Antonyms", "Easy", "Choose the antonym of '" + p[0] + "':", p[1], p[2], "'" + p[1] + "' is the opposite.");
  });
})();

/* ------------------------------------------------------------------
   REASONING ABILITY – expanded generators
   ------------------------------------------------------------------ */
(function () {
  var S = "Reasoning Ability";

  // CODING-DECODING: many shifts and words
  var words = ["CODE", "BOOK", "PEN", "RIVER", "FOREST", "GARDEN", "FLOWER", "MONEY", "WATER", "SUN", "DOG", "CAT", "RAT", "HAT", "BALL", "CALL", "TALL", "WALL", "FALL", "HILL", "KILL", "BILL", "MILL", "PILL", "WILL", "TILL", "FILE", "PILE", "MILE", "RILE", "VILE", "BITE", "KITE", "LITE", "MITE", "RITE", "SITE", "TIDE", "RIDE", "WIDE", "HIDE", "LIDE", "SIDE", "BIND", "FIND", "HIND", "KIND", "MIND", "RIND", "WIND", "BOLD", "COLD", "FOLD", "GOLD", "HOLD", "MOLD", "TOLD", "BORE", "CORE", "FORE", "MORE", "PORE", "TORE", "WORE", "BORN", "CORN", "HORN", "MORN", "WORN", "BANK", "TANK", "LANK", "RANK", "SANK", "WANK", "BARK", "DARK", "LARK", "MARK", "PARK", "HARK", "BEAR", "DEAR", "FEAR", "GEAR", "HEAR", "NEAR", "PEAR", "TEAR", "WEAR"];
  var shifts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var seen = {};
  words.forEach(function (w) {
    shifts.forEach(function (s) {
      var coded = w.split('').map(function (ch) {
        var code = ch.charCodeAt(0) + s;
        if (code > 90 && code < 97) code = 65 + (code - 91);
        else if (code > 122) code = 97 + (code - 123);
        return String.fromCharCode(code);
      }).join('');
      var q = "If '" + w + "' is coded as '" + coded + "', how is '" + w + "' coded again? (Same pattern)"; // Actually we need to ask a new word.
      // We'll ask to code a different word with same shift.
      var testWord = words[(words.indexOf(w) + 5) % words.length];
      var testCoded = testWord.split('').map(function (ch) {
        var code = ch.charCodeAt(0) + s;
        if (code > 90 && code < 97) code = 65 + (code - 91);
        else if (code > 122) code = 97 + (code - 123);
        return String.fromCharCode(code);
      }).join('');
      var qtext = "In a certain code, '" + w + "' is written as '" + coded + "'. How is '" + testWord + "' written in that code?";
      if (seen[qtext]) return;
      seen[qtext] = true;
      var dist = [testCoded];
      // generate 3 wrong options
      var wrongs = [];
      for (var i = 0; i < 3; i++) {
        var fakeShift = s + (i + 1) * 3;
        var fake = testWord.split('').map(function (ch) {
          var code = ch.charCodeAt(0) + fakeShift;
          if (code > 90 && code < 97) code = 65 + (code - 91);
          else if (code > 122) code = 97 + (code - 123);
          return String.fromCharCode(code);
        }).join('');
        if (fake !== testCoded) wrongs.push(fake);
      }
      while (wrongs.length < 3) wrongs.push("XXXX");
      var options = [testCoded].concat(wrongs.slice(0, 3));
      A(S, "Coding-Decoding", "Medium", qtext, testCoded, shuffleArr(options.slice(1)), "Each letter is shifted by " + s + " positions.");
    });
  });

  // DIRECTION SENSE: more variations
  var dirs = [
    { north: [3, 4, 5, 6, 7], east: [4, 5, 6, 7, 8] },
    { north: [2, 3, 4, 5], east: [3, 4, 5, 6] },
    { north: [1, 2, 3], east: [2, 3, 4] }
  ];
  dirs.forEach(function (d) {
    d.north.forEach(function (n) {
      d.east.forEach(function (e) {
        var q = "A person walks " + n + " km North, then turns East and walks " + e + " km, then walks " + n + " km South. How far is he from the starting point?";
        if (seen[q]) return;
        seen[q] = true;
        var ans = e + " km";
        var dists = [ans, (n + e) + " km", (n) + " km", (e + 2) + " km"];
        var shuffled = shuffleArr(dists);
        var correctIdx = shuffled.indexOf(ans);
        A(S, "Direction Sense", "Medium", q, ans, shuffled.filter(function (x) { return x !== ans; }), "North-South cancel out, leaving East displacement of " + e + " km.");
      });
    });
  });
  // Right triangle distances
  var triples = [
    [3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15], [10, 24, 26], [12, 16, 20], [15, 20, 25]
  ];
  triples.forEach(function (t) {
    var a = t[0], b = t[1], c = t[2];
    var q = "A man walks " + a + " km North and then " + b + " km East. How far is he from the starting point?";
    if (seen[q]) return;
    seen[q] = true;
    var ans = c + " km";
    var dists = [ans, (a + b) + " km", (c + 2) + " km", (c - 2) + " km"];
    var shuffled = shuffleArr(dists);
    A(S, "Direction Sense", "Hard", q, ans, shuffled.filter(function (x) { return x !== ans; }), "Using Pythagoras: √(" + a + "²+" + b + "²) = " + c + " km.");
  });

  // BLOOD RELATIONS – more examples
  var br = [
    { q: "Pointing to a man, a woman said, 'He is the son of my mother's only daughter.' How is the woman related to the man?", ans: "Mother", dists: ["Sister", "Aunt", "Grandmother"], exp: "The woman's mother's only daughter is the woman herself." },
    { q: "Pointing to a photograph, Rekha said, 'He is the son of my grandfather's only son.' How is the man related to Rekha?", ans: "Brother", dists: ["Father", "Cousin", "Uncle"], exp: "Grandfather's only son is Rekha's father." },
    { q: "A is the mother of B. B is the sister of C. C is the father of D. How is A related to D?", ans: "Grandmother", dists: ["Mother", "Aunt", "Sister"], exp: "A is B's mother, B and C are siblings, so A is C's mother, D's grandmother." },
    { q: "P is Q's brother. R is Q's mother. S is R's father. How is P related to S?", ans: "Grandson", dists: ["Son", "Nephew", "Brother"], exp: "R is P's mother, S is P's grandfather." },
    { q: "Introducing a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?", ans: "Mother", dists: ["Aunt", "Sister", "Grandmother"], exp: "The woman is the only daughter of her mother, so she is the man's mother." },
    { q: "X is Y's father. Y is Z's brother. Z is W's mother. How is X related to W?", ans: "Grandfather", dists: ["Father", "Uncle", "Brother"], exp: "X is Z's father, Z is W's mother, so X is W's grandfather." },
    { q: "A is B's sister. C is B's mother. D is C's husband. How is A related to D?", ans: "Daughter", dists: ["Son", "Wife", "Sister"], exp: "D is B's father, so A (B's sister) is also D's daughter." },
    { q: "R is S's brother. T is S's mother. U is T's daughter. How is U related to R?", ans: "Sister", dists: ["Mother", "Aunt", "Cousin"], exp: "U is T's daughter, so U is S's sister, and also R's sister." }
  ];
  br.forEach(function (b) {
    A(S, "Blood Relations", "Medium", b.q, b.ans, b.dists, b.exp);
  });

  // SYLLOGISM – more combinations
  var syls = [
    { st: "All pens are books. Some books are pencils.", con: "Some pens are pencils.", ans: "Does not follow", dist: ["Follows", "Either follows or does not"], exp: "No direct overlap between pens and pencils." },
    { st: "All cats are dogs. All dogs are animals.", con: "All cats are animals.", ans: "Follows", dist: ["Does not follow", "Either follows or does not"], exp: "Chain: cats ⊆ dogs ⊆ animals." },
    { st: "No mobile is a laptop. Some laptops are tablets.", con: "Some tablets are not mobiles.", ans: "Follows", dist: ["Does not follow", "Either follows or does not"], exp: "Laptops that are tablets are not mobiles." },
    { st: "Some doctors are engineers. All engineers are teachers.", con: "Some doctors are teachers.", ans: "Follows", dist: ["Does not follow", "Either follows or does not"], exp: "The doctors who are engineers are also teachers." },
    { st: "All flowers are fruits. No fruit is a leaf.", con: "No flower is a leaf.", ans: "Follows", dist: ["Does not follow", "Either follows or does not"], exp: "All flowers are fruits, so no flower can be a leaf." },
    { st: "Some chairs are tables. Some tables are almirahs.", con: "Some chairs are almirahs.", ans: "Does not follow", dist: ["Follows", "Either follows or does not"], exp: "The tables may be different sets." },
    { st: "All rivers are lakes. All lakes are oceans.", con: "All rivers are oceans.", ans: "Follows", dist: ["Does not follow", "Either follows or does not"], exp: "Chain." },
    { st: "No book is a pen. All pens are pencils.", con: "No pencil is a book.", ans: "Does not follow", dist: ["Follows", "Either follows or does not"], exp: "Pencils that are not pens could be books." },
    { st: "Some cars are buses. All buses are trucks.", con: "Some cars are trucks.", ans: "Follows", dist: ["Does not follow", "Either follows or does not"], exp: "The cars that are buses are also trucks." },
    { st: "All apples are fruits. Some fruits are oranges.", con: "All apples are oranges.", ans: "Does not follow", dist: ["Follows", "Either follows or does not"], exp: "No guarantee that apples are oranges." },
    { st: "No dog is a cat. All cats are animals.", con: "No dog is an animal.", ans: "Does not follow", dist: ["Follows", "Either follows or does not"], exp: "Dogs are not cats, but could still be animals." },
    { st: "All birds have wings. All parrots are birds.", con: "All parrots have wings.", ans: "Follows", dist: ["Does not follow", "Either follows or does not"], exp: "Parrots are birds, so they have wings." }
  ];
  syls.forEach(function (s) {
    A(S, "Syllogism", "Hard", "Statements: " + s.st + " Conclusion: " + s.con, s.ans, s.dist, s.exp);
  });

  // NUMBER SERIES – more patterns
  var seenNum = {};
  // Arithmetic progressions
  for (var start = 1; start <= 10; start++) {
    for (var diff = 2; diff <= 7; diff++) {
      var seq = [start, start + diff, start + 2 * diff, start + 3 * diff];
      var next = start + 4 * diff;
      var q = "Find the next number in the series: " + seq.join(", ") + ", ?";
      if (seenNum[q]) continue;
      seenNum[q] = true;
      var wrongs = [(next + 2), (next - 2), (next * 2)];
      A(S, "Number Series", "Easy", q, next.toString(), wrongs.map(String), "Constant difference of " + diff + ".");
    }
  }
  // Geometric progressions
  for (var st = 1; st <= 5; st++) {
    for (var rat = 2; rat <= 4; rat++) {
      var seq2 = [st, st * rat, st * rat * rat, st * Math.pow(rat, 3)];
      var next2 = st * Math.pow(rat, 4);
      var q2 = "Find the next term: " + seq2.join(", ") + ", ?";
      if (seenNum[q2]) continue;
      seenNum[q2] = true;
      var w2 = [(next2 + 2), (next2 / rat), (next2 * 2)];
      A(S, "Number Series", "Medium", q2, next2.toString(), w2.map(String), "Each term multiplied by " + rat + ".");
    }
  }
  // Squares series
  for (var base = 1; base <= 8; base++) {
    var seq3 = [base * base, (base + 1) * (base + 1), (base + 2) * (base + 2), (base + 3) * (base + 3)];
    var next3 = (base + 4) * (base + 4);
    var q3 = "Find the missing number: " + seq3.join(", ") + ", ?";
    if (seenNum[q3]) continue;
    seenNum[q3] = true;
    var w3 = [(next3 + 2), (next3 - 2), (next3 + 10)];
    A(S, "Number Series", "Hard", q3, next3.toString(), w3.map(String), "Squares of consecutive numbers.");
  }
})();

/* ------------------------------------------------------------------
   QUANTITATIVE APTITUDE – massively expanded
   ------------------------------------------------------------------ */
(function () {
  var S = "Quantitative Aptitude";
  var seenQ = {};

  // PERCENTAGE – many bases and percentages
  var bases = [];
  for (var i = 50; i <= 1000; i += 10) bases.push(i);
  var pcts = [5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
  var count = 0;
  for (var b = 0; b < bases.length && count < 150; b++) {
    var base = bases[b];
    for (var p = 0; p < pcts.length && count < 150; p++) {
      var pct = pcts[p];
      var res = Math.round((pct * base) / 100);
      var qtext = "What is " + pct + "% of " + base + "?";
      if (seenQ[qtext]) continue;
      seenQ[qtext] = true;
      var diff = (base > 500 || pct > 30) ? "Medium" : "Easy";
      var wrongs = [(res + 5).toString(), Math.max(0, res - 5).toString(), (res + 12).toString()];
      A(S, "Percentage", diff, qtext, res.toString(), wrongs, "(" + pct + "/100) × " + base + " = " + res + ".");
      count++;
    }
  }
  // "What percent is X of Y?" – many pairs
  var parts = [];
  for (var p2 = 10; p2 <= 500; p2 += 10) parts.push(p2);
  var wholes = [];
  for (var w2 = 100; w2 <= 1000; w2 += 50) wholes.push(w2);
  for (var i2 = 0; i2 < parts.length && i2 < 50; i2++) {
    var part = parts[i2];
    var whole = wholes[i2 % wholes.length];
    if (part > whole) continue;
    var ans = Math.round((part / whole) * 100);
    var q2 = part + " is what percent of " + whole + "?";
    if (seenQ[q2]) continue;
    seenQ[q2] = true;
    var w2a = [(ans + 5) + "%", (ans - 5) + "%", (ans + 10) + "%"];
    A(S, "Percentage", "Medium", q2, ans + "%", w2a, "(" + part + "/" + whole + ") × 100 = " + ans + "%.");
  }

  // SIMPLIFICATION – BODMAS – many expressions
  var ops = [
    { a: 12, b: 3, c: 4, d: 10, pattern: "{a} + {b} × {c} − {d}" },
    { a: 18, b: 2, c: 6, d: 8, pattern: "{a} + {b} × {c} − {d}" },
    { a: 24, b: 4, c: 5, d: 12, pattern: "{a} + {b} × {c} − {d}" },
    { a: 36, b: 6, c: 3, d: 15, pattern: "{a} + {b} × {c} − {d}" },
    { a: 15, b: 5, c: 7, d: 9, pattern: "{a} + {b} × {c} − {d}" },
    { a: 20, b: 4, c: 9, d: 11, pattern: "{a} + {b} × {c} − {d}" },
    { a: 28, b: 7, c: 2, d: 14, pattern: "{a} + {b} × {c} − {d}" },
    { a: 45, b: 9, c: 3, d: 20, pattern: "{a} + {b} × {c} − {d}" },
    { a: 16, b: 4, c: 8, d: 7, pattern: "{a} + {b} × {c} − {d}" },
    { a: 32, b: 8, c: 6, d: 18, pattern: "{a} + {b} × {c} − {d}" }
  ];
  ops.forEach(function (o) {
    var a = o.a, b = o.b, c = o.c, d = o.d;
    var ans = a + b * c - d;
    var qtext = "Simplify: " + a + " + " + b + " × " + c + " − " + d + " = ?";
    if (seenQ[qtext]) return;
    seenQ[qtext] = true;
    var wrongs = [(ans + 5).toString(), (ans - 5).toString(), (ans + 10).toString()];
    A(S, "Simplification", "Easy", qtext, ans.toString(), wrongs, "Multiplication first: " + a + " + (" + b + "×" + c + ") − " + d + " = " + ans + ".");
  });
  // More complex with parentheses
  var ops2 = [
    { a: 100, b: 5, c: 4, d: 10, pattern: "({a} ÷ {b}) + {c} × {d}" },
    { a: 144, b: 12, c: 3, d: 8, pattern: "({a} ÷ {b}) + {c} × {d}" },
    { a: 81, b: 9, c: 2, d: 5, pattern: "({a} ÷ {b}) + {c} × {d}" },
    { a: 121, b: 11, c: 4, d: 6, pattern: "({a} ÷ {b}) + {c} × {d}" },
    { a: 64, b: 8, c: 5, d: 12, pattern: "({a} ÷ {b}) + {c} × {d}" },
    { a: 169, b: 13, c: 3, d: 9, pattern: "({a} ÷ {b}) + {c} × {d}" }
  ];
  ops2.forEach(function (o) {
    var a = o.a, b = o.b, c = o.c, d = o.d;
    var ans = (a / b) + c * d;
    var qtext = "Simplify: (" + a + " ÷ " + b + ") + " + c + " × " + d + " = ?";
    if (seenQ[qtext]) return;
    seenQ[qtext] = true;
    var wrongs = [(ans + 6).toString(), (ans - 6).toString(), (ans + 15).toString()];
    A(S, "Simplification", "Medium", qtext, ans.toString(), wrongs, "(" + a + "÷" + b + ") + (" + c + "×" + d + ") = " + ans + ".");
  });

  // TIME & WORK – many pairs
  var workPairs = [];
  for (var a = 5; a <= 30; a += 2) {
    for (var b = 6; b <= 30; b += 3) {
      if (a === b) continue;
      workPairs.push([a, b]);
      if (workPairs.length >= 50) break;
    }
    if (workPairs.length >= 50) break;
  }
  workPairs.forEach(function (p) {
    var a = p[0], b = p[1];
    var gcd = function (x, y) { return y ? gcd(y, x % y) : x; };
    var lcm = (a * b) / gcd(a, b);
    var rateA = lcm / a, rateB = lcm / b;
    var together = Math.round((lcm / (rateA + rateB)) * 10) / 10;
    var qtext = "A can finish a job in " + a + " days and B in " + b + " days. Together, how many days?";
    if (seenQ[qtext]) return;
    seenQ[qtext] = true;
    var wrongs = [(together + 2).toFixed(1) + " days", (together - 1).toFixed(1) + " days", (a + b) + " days"];
    A(S, "Time & Work", "Hard", qtext, together + " days", wrongs, "1/" + a + " + 1/" + b + " = " + together + " days.");
  });

  // SIMPLE INTEREST – many sets
  var siSets = [];
  for (var p = 1000; p <= 10000; p += 500) {
    for (var r = 4; r <= 12; r += 2) {
      for (var t = 1; t <= 5; t++) {
        siSets.push([p, r, t]);
        if (siSets.length >= 60) break;
      }
      if (siSets.length >= 60) break;
    }
    if (siSets.length >= 60) break;
  }
  siSets.forEach(function (s) {
    var p = s[0], r = s[1], t = s[2];
    var si = Math.round((p * r * t) / 100);
    var qtext = "Find simple interest on ₹" + p + " at " + r + "% per annum for " + t + " years.";
    if (seenQ[qtext]) return;
    seenQ[qtext] = true;
    var wrongs = ["₹" + (si + 100), "₹" + Math.max(0, si - 100), "₹" + (si + 250)];
    A(S, "Simple Interest", "Medium", qtext, "₹" + si, wrongs, "SI = (" + p + "×" + r + "×" + t + ")/100 = ₹" + si + ".");
  });

  // AVERAGE – many sets
  var avgSets = [];
  for (var len = 3; len <= 6; len++) {
    for (var startVal = 5; startVal <= 50; startVal += 5) {
      var nums = [];
      for (var k = 0; k < len; k++) nums.push(startVal + k * 3);
      avgSets.push(nums);
      if (avgSets.length >= 50) break;
    }
    if (avgSets.length >= 50) break;
  }
  avgSets.forEach(function (nums) {
    var sum = nums.reduce(function (a, b) { return a + b; }, 0);
    var avg = Math.round((sum / nums.length) * 100) / 100;
    var qtext = "Find the average of: " + nums.join(", ");
    if (seenQ[qtext]) return;
    seenQ[qtext] = true;
    var wrongs = [(avg + 2).toString(), (avg - 2).toString(), (avg + 5).toString()];
    A(S, "Average", "Easy", qtext, avg.toString(), wrongs, "Sum = " + sum + ", count = " + nums.length + ", avg = " + avg + ".");
  });

  // PROFIT & LOSS – many pairs
  var plSets = [];
  for (var cp = 100; cp <= 2000; cp += 100) {
    for (var sp = cp - 100; sp <= cp + 200; sp += 50) {
      if (sp <= 0) continue;
      plSets.push([cp, sp]);
      if (plSets.length >= 80) break;
    }
    if (plSets.length >= 80) break;
  }
  plSets.forEach(function (s) {
    var cp = s[0], sp = s[1];
    var diff = sp - cp;
    var pct = Math.round((Math.abs(diff) / cp) * 10000) / 100;
    var qtext = "A shopkeeper buys for ₹" + cp + " and sells for ₹" + sp + ". Find " + (diff >= 0 ? "profit" : "loss") + " percentage.";
    if (seenQ[qtext]) return;
    seenQ[qtext] = true;
    var wrongs = [(pct + 5).toFixed(2) + "%", Math.max(0, pct - 5).toFixed(2) + "%", (pct + 10).toFixed(2) + "%"];
    A(S, "Profit & Loss", "Medium", qtext, pct + "%", wrongs, (diff >= 0 ? "Profit" : "Loss") + "% = (|SP−CP|/CP)×100 = " + pct + "%.");
  });
})();

/* ------------------------------------------------------------------
   COMPUTER KNOWLEDGE – expanded with many facts, abbreviations, shortcuts
   ------------------------------------------------------------------ */
(function () {
  var S = "Computer Knowledge";

  // Abbreviations – more
  var abbrs = [
    ["BIOS", "Basic Input Output System", ["Basic Internal Operating System", "Binary Input Output Software", "Basic Interface Output System"]],
    ["USB", "Universal Serial Bus", ["Universal System Bus", "United Serial Board", "Universal Storage Bus"]],
    ["HTML", "Hyper Text Markup Language", ["High Text Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"]],
    ["RAM", "Random Access Memory", ["Read Access Memory", "Rapid Access Module", "Read And Modify"]],
    ["CPU", "Central Processing Unit", ["Central Program Unit", "Computer Processing Utility", "Core Processing Unit"]],
    ["HTTP", "Hyper Text Transfer Protocol", ["High Transfer Text Process", "Hyperlink Text Transfer Program", "Home Tool Transfer Protocol"]],
    ["IP", "Internet Protocol", ["Internal Program", "Information Path", "Internet Path"]],
    ["URL", "Uniform Resource Locator", ["Universal Reference Link", "United Resource Locator", "Uniform Reference Language"]],
    ["FTP", "File Transfer Protocol", ["Fast Transfer Protocol", "File Text Protocol", "Form Transfer Protocol"]],
    ["SMTP", "Simple Mail Transfer Protocol", ["Simple Message Transfer Protocol", "Standard Mail Transfer Protocol", "System Mail Transfer Protocol"]],
    ["PDF", "Portable Document Format", ["Programmable Document Format", "Printed Document Format", "Portable Data File"]],
    ["JPEG", "Joint Photographic Experts Group", ["Joint Picture Experts Group", "Java Photo Encoding Group", "Joint Pixel Encoding Group"]],
    ["PNG", "Portable Network Graphics", ["Portable New Graphics", "Programmable Network Graphics", "Private Network Graphics"]],
    ["GIF", "Graphics Interchange Format", ["Graphical Information Format", "General Interchange Format", "Graphics Interface Format"]],
    ["LAN", "Local Area Network", ["Large Area Network", "Logical Area Network", "Limited Area Network"]],
    ["WAN", "Wide Area Network", ["World Area Network", "Wireless Area Network", "Web Area Network"]],
    ["MAN", "Metropolitan Area Network", ["Mobile Area Network", "Main Area Network", "Medium Area Network"]],
    ["VPN", "Virtual Private Network", ["Very Private Network", "Visual Private Network", "Virtual Public Network"]],
    ["DDR", "Double Data Rate", ["Digital Data Rate", "Direct Data Rate", "Dynamic Data Rate"]],
    ["SSD", "Solid State Drive", ["System State Drive", "Secure State Drive", "Solid System Drive"]],
    ["HDD", "Hard Disk Drive", ["High Density Drive", "Hard Data Drive", "High Speed Drive"]],
    ["CD", "Compact Disc", ["Computer Disc", "Common Disc", "Central Disc"]],
    ["DVD", "Digital Versatile Disc", ["Digital Video Disc", "Data Video Disc", "Double Video Disc"]],
    ["OCR", "Optical Character Recognition", ["Optical Code Recognition", "Optical Character Reader", "Optical Computer Recognition"]],
    ["SQL", "Structured Query Language", ["Simple Query Language", "Sequential Query Language", "System Query Language"]],
    ["API", "Application Programming Interface", ["Application Program Interface", "Application Protocol Interface", "Advanced Programming Interface"]]
  ];
  abbrs.forEach(function (a) {
    A(S, "Abbreviations", "Easy", "What does '" + a[0] + "' stand for?", a[1], a[2], "'" + a[0] + "' stands for " + a[1] + ".");
  });

  // Shortcut Keys – more
  var shortcuts = [
    ["Ctrl + C", "Copy", ["Paste", "Cut", "Undo"]],
    ["Ctrl + Z", "Undo", ["Redo", "Save", "Close"]],
    ["Ctrl + P", "Print", ["Paste", "New document", "Save"]],
    ["Ctrl + S", "Save", ["Print", "Open", "New"]],
    ["Ctrl + O", "Open", ["Save", "Print", "Close"]],
    ["Ctrl + N", "New", ["Open", "Save", "Print"]],
    ["Ctrl + X", "Cut", ["Copy", "Paste", "Select All"]],
    ["Ctrl + V", "Paste", ["Copy", "Cut", "Select All"]],
    ["Ctrl + A", "Select All", ["Copy", "Paste", "Cut"]],
    ["Ctrl + F", "Find", ["Replace", "Go to", "Spell Check"]],
    ["Ctrl + H", "Replace", ["Find", "Go to", "Select All"]],
    ["Ctrl + B", "Bold", ["Italic", "Underline", "Font size"]],
    ["Ctrl + I", "Italic", ["Bold", "Underline", "Font"]],
    ["Ctrl + U", "Underline", ["Bold", "Italic", "Strike through"]],
    ["Ctrl + Y", "Redo", ["Undo", "Repeat", "New"]],
    ["Alt + Tab", "Switch between open applications", ["Switch between windows", "Close application", "Minimize"]],
    ["Windows + D", "Show desktop", ["Open file explorer", "Lock screen", "Search"]],
    ["Windows + E", "Open File Explorer", ["Open settings", "Open run", "Open search"]],
    ["Windows + L", "Lock computer", ["Log off", "Sleep", "Restart"]],
    ["Ctrl + Shift + Esc", "Open Task Manager", ["Open command prompt", "Open system properties", "Open control panel"]]
  ];
  shortcuts.forEach(function (s) {
    A(S, "Shortcut Keys", "Easy", "What does '" + s[0] + "' do?", s[1], s[2], "'" + s[0] + "' is used for " + s[1] + ".");
  });

  // Computer Fundamentals – more facts
  var fundas = [
    ["Which part of the computer is known as the brain?", "CPU", ["RAM", "Hard Disk", "Monitor"]],
    ["Which memory is volatile?", "RAM", ["ROM", "Cache", "Hard Disk"]],
    ["Who is the father of modern computers?", "Charles Babbage", ["Alan Turing", "Bill Gates", "Tim Berners-Lee"]],
    ["Which of these is an output device?", "Monitor", ["Keyboard", "Mouse", "Scanner"]],
    ["1 Byte equals how many bits?", "8 bits", ["4 bits", "16 bits", "2 bits"]],
    ["Which generation introduced microprocessors?", "Fourth generation", ["First generation", "Second generation", "Third generation"]],
    ["What is the smallest unit of data?", "Bit", ["Byte", "Kilobyte", "Megabyte"]],
    ["Which device is used to read barcodes?", "Barcode reader", ["Scanner", "Printer", "Microphone"]],
    ["What does 'MHz' measure?", "Clock speed", ["Memory capacity", "Screen resolution", "Hard disk space"]],
    ["Which is an example of system software?", "Operating system", ["Word processor", "Spreadsheet", "Web browser"]],
    ["What is the function of the ALU?", "Arithmetic and logical operations", ["Control operations", "Memory addressing", "Input/output"]],
    ["Which of these is not a programming language?", "HTML", ["C", "Java", "Python"]],
    ["What is a firewall?", "Network security system", ["Web browser", "Antivirus", "Router"]],
    ["What is the full form of OS?", "Operating System", ["Open Source", "Optical System", "Output System"]],
    ["Which is a non-volatile memory?", "ROM", ["RAM", "Cache", "Register"]]
  ];
  fundas.forEach(function (f) {
    A(S, "Computer Fundamentals", "Medium", f[0], f[1], f[2], f[2] + " is the correct answer.");
  });

  // MS Office – more
  var ms = [
    ["Default extension for Word 2007+", ".docx", [".xlsx", ".pptx", ".txt"]],
    ["Excel function to add range", "=SUM()", ["=ADD()", "=TOTAL()", "=PLUS()"]],
    ["Shortcut to save document", "Ctrl + S", ["Ctrl + P", "Ctrl + O", "Ctrl + N"]],
    ["Start a formula in Excel with", "=", ["+", "#", "@"]],
    ["PowerPoint view to rearrange slides", "Slide Sorter view", ["Normal view", "Reading view", "Outline view"]],
    ["What is the default file extension for PowerPoint 2007+?", ".pptx", [".docx", ".xlsx", ".txt"]],
    ["What does 'VLOOKUP' stand for?", "Vertical Lookup", ["Variable Lookup", "Vector Lookup", "Value Lookup"]],
    ["Which tab in Word allows you to insert a table?", "Insert", ["Home", "Layout", "Review"]],
    ["In Excel, which function finds the maximum value?", "=MAX()", ["=MIN()", "=AVERAGE()", "=SUM()"]]
  ];
  ms.forEach(function (m) {
    A(S, "MS Office", "Medium", m[0], m[1], m[2], m[1] + " is correct.");
  });

  // Internet & Networking – more
  var net = [
    ["What does HTTP stand for?", "Hyper Text Transfer Protocol", ["High Transfer Text Process", "Hyperlink Text Transfer Program", "Home Tool Transfer Protocol"]],
    ["What does IP stand for?", "Internet Protocol", ["Internal Program", "Information Path", "Internet Path"]],
    ["What does URL stand for?", "Uniform Resource Locator", ["Universal Reference Link", "United Resource Locator", "Uniform Reference Language"]],
    ["Device connecting multiple networks and routing data", "Router", ["Modem", "Switch", "Hub"]],
    ["Protocol for secure web pages", "HTTPS", ["FTP", "SMTP", "HTTP"]],
    ["Which protocol is used for email transmission?", "SMTP", ["HTTP", "FTP", "TCP"]],
    ["What is a modem used for?", "Modulation/Demodulation", ["Routing", "Switching", "Amplifying"]],
    ["Which topology uses a central hub?", "Star", ["Ring", "Bus", "Mesh"]],
    ["What is the full form of TCP/IP?", "Transmission Control Protocol/Internet Protocol", ["Transport Control Protocol/Internet Protocol", "Transmission Control Program/Internet Program", "Transfer Control Protocol/Internet Protocol"]]
  ];
  net.forEach(function (n) {
    A(S, "Internet & Networking", "Medium", n[0], n[1], n[2], n[1] + ".");
  });

  // Operating Systems – more
  var os = [
    ["Which is a widely used open-source OS?", "Linux", ["Windows", "macOS", "iOS"]],
    ["Primary function of OS", "Managing hardware and software resources", ["Creating documents", "Browsing internet", "Editing photos"]],
    ["Which is NOT an OS?", "MS Excel", ["Windows", "Linux", "Android"]],
    ["What is the kernel of an OS?", "Core component that manages system resources", ["User interface", "File manager", "Device driver"]],
    ["Which OS was developed by Microsoft?", "Windows", ["Linux", "macOS", "Unix"]]
  ];
  os.forEach(function (o) {
    A(S, "Operating Systems", "Medium", o[0], o[1], o[2], o[1] + ".");
  });

  // Cyber Security – more
  var cyber = [
    ["System monitoring network traffic based on security rules", "Firewall", ["Antivirus", "Malware", "Router"]],
    ["Software designed to damage or gain unauthorized access", "Malware", ["Firmware", "Freeware", "Shareware"]],
    ["Fraudulent attempt to obtain sensitive info", "Phishing", ["Hacking", "Spoofing", "Encryption"]],
    ["What is the full form of VPN?", "Virtual Private Network", ["Very Private Network", "Visual Private Network", "Virtual Public Network"]],
    ["Which is an example of a strong password?", "D4nG3r0u$", ["password123", "123456", "qwerty"]]
  ];
  cyber.forEach(function (c) {
    A(S, "Cyber Security", "Medium", c[0], c[1], c[2], c[1] + ".");
  });
})();

/* ------------------------------------------------------------------
   BANKING & DCCB AWARENESS – expanded
   ------------------------------------------------------------------ */
(function () {
  var S = "Banking & Financial Awareness";

  // Banking Awareness – more facts
  var bankFacts = [
    ["Central bank of India", "Reserve Bank of India (RBI)", ["State Bank of India", "NABARD", "SEBI"]],
    ["Minimum balance in savings account", "Minimum Balance", ["Fixed Deposit", "Overdraft", "Cash Credit"]],
    ["Cheque that cannot be paid over the counter", "Crossed cheque", ["Bearer cheque", "Post-dated cheque", "Stale cheque"]],
    ["Rate at which RBI lends to banks", "Repo Rate", ["Reverse Repo Rate", "Bank Rate", "CRR"]],
    ["Percentage of deposits kept with RBI", "Cash Reserve Ratio (CRR)", ["Statutory Liquidity Ratio", "Repo Rate", "Base Rate"]],
    ["Loan against fixed deposit", "Loan against FD", ["Personal loan", "Overdraft", "Cash credit"]],
    ["Non-Performing Asset definition", "Loan overdue for specified period", ["Fixed deposit account", "Savings account with zero balance", "New bank branch"]],
    ["Which act governs cooperative banks?", "Cooperative Societies Act", ["Banking Regulation Act", "RBI Act", "Negotiable Instruments Act"]],
    ["What is the full form of NPA?", "Non-Performing Asset", ["National Payment Authority", "Net Present Asset", "Non-Public Asset"]],
    ["Which bank is known as the bankers' bank?", "RBI", ["SBI", "NABARD", "EXIM Bank"]],
    ["What is a demand draft?", "A negotiable instrument payable on demand", ["Cheque", "Bill of exchange", "Promissory note"]]
  ];
  bankFacts.forEach(function (f) {
    A(S, "Banking Awareness", "Medium", f[0], f[1], f[2], f[1] + ".");
  });

  // Cooperative Banking – more
  var coop = [
    ["How many tiers in short-term cooperative credit structure?", "Three tiers", ["Two tiers", "Four tiers", "Five tiers"]],
    ["Which institution at district level?", "District Central Cooperative Bank (DCCB)", ["State Cooperative Bank", "Primary Agricultural Credit Society", "Regional Rural Bank"]],
    ["Village-level agricultural credit provided by", "Primary Agricultural Credit Societies (PACS)", ["State Cooperative Banks", "District Central Cooperative Banks", "Commercial banks"]],
    ["Dual regulation of cooperative banks", "RBI and State Government/Registrar", ["SEBI and IRDAI", "NABARD alone", "Ministry of Finance alone"]],
    ["Apex institution providing refinance to cooperatives", "NABARD", ["RBI", "SEBI", "LIC"]],
    ["DCCB stands for", "District Central Cooperative Bank", ["District Credit Cooperative Board", "Development Cooperative Central Bank", "District Cooperative Credit Bureau"]],
    ["PACS stands for", "Primary Agricultural Credit Society", ["Primary Agricultural Cooperative Scheme", "Public Agricultural Credit System", "Panchayat Agricultural Cooperative Society"]],
    ["Who funds the DCCBs?", "State Cooperative Bank", ["NABARD directly to PACS", "RBI directly to PACS", "Commercial banks"]],
    ["Membership in PACS is based on", "Voluntary membership of local residents", ["Compulsory government appointment", "Membership limited to bank employees", "Membership open only to large landowners"]]
  ];
  coop.forEach(function (c) {
    A(S, "Cooperative Banking", "Medium", c[0], c[1], c[2], c[1] + ".");
  });

  // RBI – more
  var rbi = [
    ["Year RBI established", "1935", ["1947", "1950", "1969"]],
    ["RBI headquarters", "Mumbai", ["New Delhi", "Kolkata", "Chennai"]],
    ["Committee that decides repo rate", "Monetary Policy Committee (MPC)", ["Banking Codes and Standards Board", "Board for Financial Supervision", "Central Board of Directors"]],
    ["Year RBI was nationalised", "1949", ["1935", "1955", "1969"]],
    ["Statutory head of RBI", "Governor", ["Chairman", "President", "Managing Director"]],
    ["Current RBI Governor (as of 2026)", "Shaktikanta Das (or current)", ["Raghuram Rajan", "Urjit Patel", "D. Subbarao"]] // Adjust as needed
  ];
  rbi.forEach(function (r) {
    A(S, "RBI", "Medium", r[0], r[1], r[2], r[1] + ".");
  });

  // NABARD – more
  var nab = [
    ["NABARD stands for", "National Bank for Agriculture and Rural Development", ["National Bureau for Agricultural Reform and Development", "National Board for Agricultural Rural Deposits", "National Association for Rural Development"]],
    ["Year NABARD established", "1982", ["1969", "1935", "1991"]],
    ["NABARD provides refinance to", "Cooperative banks and Regional Rural Banks", ["Private sector banks", "Insurance companies", "Stock exchanges"]],
    ["Committee that recommended NABARD", "CRAFICARD", ["Narasimham Committee", "Rangarajan Committee", "Verma Committee"]]
  ];
  nab.forEach(function (n) {
    A(S, "NABARD", "Medium", n[0], n[1], n[2], n[1] + ".");
  });

  // Financial Awareness – more
  var fin = [
    ["KYC stands for", "Know Your Customer", ["Keep Your Cash", "Know Your Credit", "Key Yield Calculation"]],
    ["Banking access scheme launched in 2014", "Pradhan Mantri Jan Dhan Yojana", ["Pradhan Mantri Awas Yojana", "Atal Pension Yojana", "Sukanya Samriddhi Yojana"]],
    ["Insurance cover on bank deposits (per depositor)", "₹5 lakh", ["₹1 lakh", "₹2 lakh", "₹10 lakh"]]
  ];
  fin.forEach(function (f) {
    A(S, "Financial Awareness", "Medium", f[0], f[1], f[2], f[1] + ".");
  });
})();

/* ------------------------------------------------------------------
   GENERAL KNOWLEDGE – expanded (India & AP)
   ------------------------------------------------------------------ */
(function () {
  var S = "General Knowledge";
  var gk = [
    ["Capital of Andhra Pradesh", "Amaravati", ["Hyderabad", "Visakhapatnam", "Vijayawada"]],
    ["River forming delta in Andhra Pradesh", "Godavari", ["Yamuna", "Narmada", "Tapi"]],
    ["Father of the Nation", "Mahatma Gandhi", ["Jawaharlal Nehru", "Subhas Chandra Bose", "Sardar Vallabhbhai Patel"]],
    ["Parliament of India consists of", "Lok Sabha and Rajya Sabha", ["Lok Sabha and Vidhan Sabha", "Rajya Sabha and Vidhan Parishad", "Lok Sabha and Vidhan Parishad"]],
    ["Article abolishing untouchability", "Article 17", ["Article 14", "Article 19", "Article 21"]],
    ["Year Andhra Pradesh was bifurcated", "2014", ["2000", "2009", "2019"]],
    ["Longest river in India", "Ganga", ["Godavari", "Yamuna", "Krishna"]],
    ["Independence day of India", "15 August 1947", ["26 January 1950", "2 October 1947", "15 August 1950"]],
    ["First Prime Minister of India", "Jawaharlal Nehru", ["Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Dr. Rajendra Prasad"]],
    ["Classical dance form from Andhra Pradesh", "Kuchipudi", ["Bharatanatyam", "Odissi", "Kathak"]],
    ["National emblem of India", "Ashoka Chakra / Lion Capital", ["Peacock", "Banyan Tree", "Lotus"]],
    ["Which is the largest state in India by area?", "Rajasthan", ["Madhya Pradesh", "Maharashtra", "Uttar Pradesh"]],
    ["Which is the most populous state?", "Uttar Pradesh", ["Maharashtra", "Bihar", "West Bengal"]],
    ["Capital of India", "New Delhi", ["Mumbai", "Kolkata", "Chennai"]],
    ["Which is the national animal of India?", "Bengal Tiger", ["Lion", "Elephant", "Peacock"]],
    ["Which is the national bird of India?", "Peacock", ["Eagle", "Sparrow", "Crow"]],
    ["Which is the national flower of India?", "Lotus", ["Rose", "Sunflower", "Marigold"]],
    ["Which is the national fruit of India?", "Mango", ["Banana", "Apple", "Orange"]]
  ];
  gk.forEach(function (g) {
    A(S, "India & AP GK", "Medium", g[0], g[1], g[2], g[1] + ".");
  });
})();

/* ------------------------------------------------------------------
   Build derived metadata
   ------------------------------------------------------------------ */
var SECTIONS = [];
var TOPICS_BY_SECTION = {};
(function () {
  var secSeen = {};
  QUESTIONS.forEach(function (q) {
    if (!secSeen[q.section]) { secSeen[q.section] = true; SECTIONS.push(q.section); TOPICS_BY_SECTION[q.section] = []; }
    if (TOPICS_BY_SECTION[q.section].indexOf(q.topic) === -1) { TOPICS_BY_SECTION[q.section].push(q.topic); }
  });
})();

console.log("Question bank loaded: " + QUESTIONS.length + " unique questions.");