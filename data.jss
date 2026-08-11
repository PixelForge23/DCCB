/* ============================================================
   DCCB 2026 PREP — QUESTION BANK
   Every question here is genuinely distinct: different facts,
   different numbers, or different sentences. Parametric topics
   (quant/reasoning) generate real variety by looping over
   different values and de-duplicating on the final question
   text, rather than appending a fake "#N" label to one item.
   ============================================================ */

var QUESTIONS = [];
var _qid = 1;

function addQ(section, topic, difficulty, question, options, correctIndex, explanation){
  QUESTIONS.push({
    id: _qid++,
    section: section,
    topic: topic,
    difficulty: difficulty,
    question: question,
    options: options.map(function(t, i){ return { text: t, correct: i === correctIndex }; }),
    explanation: explanation
  });
}

function shuffleArr(a){
  var arr = a.slice();
  for (var i = arr.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

/* ---------- helper to add option sets with a known correct answer,
   keeping the correct index stable at 0 for authoring convenience ---------- */
function A(section, topic, difficulty, question, correctAnswer, distractors, explanation){
  addQ(section, topic, difficulty, question, [correctAnswer].concat(distractors), 0, explanation);
}

/* ================= ENGLISH LANGUAGE ================= */

/* -- Articles -- */
(function(){
  var S = "English Language", T = "Grammar - Articles";
  var items = [
    ["He is ___ honest man.", "an", ["a","the","no article needed"], "'Honest' begins with a silent 'h', so the vowel sound 'an' is used."],
    ["She bought ___ umbrella before the rain started.", "an", ["a","the","some"], "'Umbrella' starts with a vowel sound, so 'an' is correct."],
    ["He is studying at ___ university near his home.", "a", ["an","the","no article"], "'University' starts with a consonant sound (yoo-), so 'a' is used, not 'an'."],
    ["It took only ___ hour to finish the exam.", "an", ["a","the","no article"], "'Hour' has a silent 'h', so it takes 'an'."],
    ["___ Ganga is the longest river flowing through northern India.", "The", ["A","An","No article"], "Names of specific rivers take the definite article 'the'."],
    ["He wants to become ___ engineer after his graduation.", "an", ["a","the","no article"], "'Engineer' starts with a vowel sound."],
    ["She is ___ European by birth.", "a", ["an","the","no article"], "'European' starts with a 'y' sound, so 'a' is used even though it begins with a vowel letter."],
    ["___ Sun rises in the east.", "The", ["A","An","No article"], "Unique natural objects like the Sun take 'the'."],
    ["He gave me ___ one-rupee coin.", "a", ["an","the","no article"], "'One' starts with a 'w' sound (won), so 'a' is used."],
    ["They stayed at ___ Taj Hotel in Hyderabad.", "the", ["a","an","no article"], "Names of specific well-known hotels/buildings usually take 'the'."],
    ["My father is ___ M.A. in Economics.", "an", ["a","the","no article"], "'M.A.' is pronounced 'em-ay', starting with a vowel sound."],
    ["He is ___ best student in the class.", "the", ["a","an","no article"], "Superlative adjectives are preceded by 'the'."],
    ["She wants to buy ___ orange and ___ apple.", "an ... an", ["a ... a","the ... the","a ... an"], "Both 'orange' and 'apple' begin with vowel sounds, so 'an' is used before each."],
    ["___ poor deserve our support and sympathy.", "The", ["A","An","No article"], "'The' before an adjective (poor) refers to the whole class of people described by it."],
    ["He plays ___ violin every evening.", "the", ["a","an","no article"], "Names of musical instruments generally take 'the' when talking about playing them."],
    ["She is ___ MLA from that constituency.", "an", ["a","the","no article"], "'MLA' is pronounced starting with 'em', a vowel sound."],
    ["I saw ___ one-eyed man near the market.", "a", ["an","the","no article"], "'One-eyed' starts with a 'w' sound (won-eyed), so 'a' is used."]
  ];
  items.forEach(function(it){
    A(S, T, "Easy", "Choose the most suitable article: " + it[0], it[1], it[2], it[3]);
  });
})();

/* -- Tenses -- */
(function(){
  var S = "English Language", T = "Grammar - Tenses";
  var items = [
    ["She ___ to the market every morning.", "goes", ["go","is going","went"], "Simple present tense with a routine action ('every morning') and a third-person singular subject takes 'goes'."],
    ["They ___ dinner when the power went out.", "were having", ["have","had","are having"], "An ongoing past action interrupted by another action uses past continuous: 'were having'."],
    ["By next year, she ___ her degree.", "will have completed", ["completes","will complete","has completed"], "An action that will be finished before a future point uses future perfect: 'will have completed'."],
    ["He ___ this company for ten years now.", "has been working with", ["works with","worked with","is working with"], "An action that started in the past and continues to the present, emphasised in duration, uses present perfect continuous."],
    ["I ___ my homework before you called.", "had finished", ["finished","have finished","finish"], "The action that happened before another past action uses past perfect: 'had finished'."],
    ["The train ___ at 6 pm tomorrow.", "arrives", ["is arriving","arrived","will have arrived"], "Fixed timetables and schedules are described using simple present even for future events."],
    ["She ___ tea when I entered the room.", "was drinking", ["drinks","drank","has drunk"], "An action in progress at a specific past moment uses past continuous."],
    ["We ___ each other since childhood.", "have known", ["know","knew","are knowing"], "A state that began in the past and continues now uses present perfect."],
    ["He ___ the letter by the time she arrives.", "will have written", ["writes","is writing","wrote"], "An action expected to be complete before a future event uses future perfect."],
    ["Look! The children ___ in the garden.", "are playing", ["play","played","have played"], "An action happening right now is described using present continuous."],
    ["She always ___ her keys somewhere.", "loses", ["is losing","lost","has lost"], "Habitual actions are expressed in the simple present tense."],
    ["I ___ this movie twice already.", "have watched", ["watch","watched","was watching"], "An action completed at an unspecified time before now, with present relevance, uses present perfect."],
    ["While he ___ the newspaper, the phone rang.", "was reading", ["reads","read","has read"], "A continuing past action interrupted by a shorter one uses past continuous."],
    ["Next month, they ___ in this city for five years.", "will have lived", ["live","lived","are living"], "Duration up to a future point of time takes future perfect."],
    ["She ___ breakfast before she leaves for office.", "eats", ["is eating","ate","will eat"], "A habitual daily action is expressed with simple present."],
    ["He ___ football since he was a child.", "has played", ["plays","played","is playing"], "Present perfect describes an action starting in the past that continues to have relevance now."]
  ];
  items.forEach(function(it){
    A(S, T, "Medium", "Fill in the blank with the correct tense form: " + it[0], it[1], it[2], it[3]);
  });
})();

/* -- Vocabulary: Synonyms -- */
(function(){
  var S = "English Language", T = "Vocabulary - Synonyms";
  var pairs = [
    ["Ephemeral", "Short-lived", ["Everlasting","Enormous","Elegant"]],
    ["Abundant", "Plentiful", ["Scarce","Ordinary","Fragile"]],
    ["Candor", "Honesty", ["Deceit","Confusion","Cruelty"]],
    ["Mundane", "Ordinary", ["Exciting","Rare","Luxurious"]],
    ["Resilient", "Able to recover quickly", ["Fragile","Slow","Timid"]],
    ["Meticulous", "Very careful and precise", ["Careless","Hasty","Lazy"]],
    ["Benevolent", "Kind and generous", ["Cruel","Selfish","Greedy"]],
    ["Ambiguous", "Open to more than one meaning", ["Clear","Certain","Precise"]],
    ["Frugal", "Careful with money", ["Wasteful","Generous","Reckless"]],
    ["Diligent", "Hard-working and careful", ["Lazy","Careless","Indifferent"]],
    ["Candid", "Truthful and straightforward", ["Dishonest","Vague","Secretive"]],
    ["Obsolete", "No longer in use", ["Modern","Popular","Useful"]],
    ["Prudent", "Sensible and cautious", ["Reckless","Foolish","Impulsive"]],
    ["Tedious", "Long and tiresome", ["Exciting","Brief","Pleasant"]],
    ["Lucid", "Clear and easy to understand", ["Confusing","Vague","Complicated"]],
    ["Austere", "Simple and without luxury", ["Lavish","Ornate","Comfortable"]]
  ];
  pairs.forEach(function(p){
    A(S, T, "Medium", "Choose the word closest in meaning to '" + p[0] + "':", p[1], p[2], "'" + p[0] + "' means " + p[1].toLowerCase() + ".");
  });
})();

/* -- Vocabulary: Antonyms -- */
(function(){
  var S = "English Language", T = "Vocabulary - Antonyms";
  var pairs = [
    ["Generous", "Stingy", ["Kind","Wealthy","Cheerful"]],
    ["Optimistic", "Pessimistic", ["Confident","Realistic","Ambitious"]],
    ["Genuine", "Fake", ["Honest","Simple","Rare"]],
    ["Voluntary", "Compulsory", ["Willing","Optional","Free"]],
    ["Transparent", "Opaque", ["Clear","Bright","Visible"]],
    ["Cautious", "Reckless", ["Careful","Alert","Wise"]],
    ["Abundant", "Scarce", ["Plentiful","Excessive","Rich"]],
    ["Humble", "Arrogant", ["Modest","Shy","Kind"]],
    ["Permanent", "Temporary", ["Lasting","Fixed","Stable"]],
    ["Expand", "Contract", ["Grow","Increase","Extend"]],
    ["Ancient", "Modern", ["Old","Historic","Traditional"]],
    ["Praise", "Criticize", ["Admire","Appreciate","Compliment"]]
  ];
  pairs.forEach(function(p){
    A(S, T, "Easy", "Choose the word opposite in meaning to '" + p[0] + "':", p[1], p[2], "'" + p[1] + "' is the direct opposite of '" + p[0] + "'.");
  });
})();

/* ================= REASONING ABILITY ================= */

/* -- Coding-Decoding (hand-authored, distinct code logics) -- */
(function(){
  var S = "Reasoning Ability", T = "Coding-Decoding";
  A(S,T,"Medium","In a certain code, BOOK is written as CPPL. How is CODE written in the same code?","DPEF",["COEF","BPDE","EQFG"],"Each letter of the word is shifted forward by one position in the alphabet: C→D, O→P, D→E, E→F.");
  A(S,T,"Medium","If TABLE is coded as UBCMF, how is CHAIR coded in the same language?","DIBJS",["DIBIS","CIBJT","EIBJS"],"Every letter is shifted one step forward: C→D, H→I, A→B, I→J, R→S.");
  A(S,T,"Hard","In a code language, 'PEN' is written as '25 20 40' and 'BOOK' is written as '4 30 30 22'. How is 'CAT' written?","6 2 40",["3 1 20","6 1 20","3 2 20"],"Each letter's alphabetical position is doubled: C=3→6, A=1→2, T=20→40."); 
  A(S,T,"Medium","If in a code, 'RIVER' is written as 'SJWFS', how would 'FOREST' be written?","GPSFTU",["GPSFSU","FPSFTU","GQSFTU"],"Each letter is shifted forward by exactly one alphabet position.");
  A(S,T,"Hard","In a certain code, 'GARDEN' is written as 'HZQEDM'. How is 'FLOWER' written in that code?","GKPVFQ",["GKNVFQ","GLPVEQ","FKPVFQ"],"Odd-position letters (1st,3rd,5th) shift forward by one, even-position letters (2nd,4th,6th) shift backward by one: F→G, L→K, O→P, W→V, E→F, R→Q.");
  A(S,T,"Medium","If 'MONEY' is coded as 'NPOFZ', what is the code for 'WATER'?","XBUFS",["XBUFR","YBUFS","XBVFS"],"Every letter of the word is replaced with the next letter of the alphabet.");
  A(S,T,"Hard","In a code, 'SUN' is written as '20-22-15' using each letter's position from the end of the alphabet (Z=1). Using the same logic, how is 'DOG' written?","23-12-20",["4-15-7","23-11-20","22-12-19"],"Position from the end: D is 23rd from Z, O is 12th from Z, G is 20th from Z."); 
  A(S,T,"Medium","In a certain code, 'TEACHER' is written as 'UFBDIFS'. How is 'STUDENT' written in that code?","TUVEFOU",["TUVFEOU","SUVEFOU","TUVEFPU"],"Each letter of the word is replaced by the next letter of the alphabet.");
})();

/* -- Syllogism (hand-authored, distinct premise/conclusion sets) -- */
(function(){
  var S = "Reasoning Ability", T = "Syllogism";
  function syl(diff, statements, conclusion, ans, exp){
    A(S,T,diff,"Statements: " + statements + " Conclusion: " + conclusion, ans, ["Follows","Does not follow","Either follows or does not"].filter(function(x){return x!==ans;}), exp);
  }
  syl("Medium","All pens are books. Some books are pencils.","Some pens are pencils.","Does not follow","There is no direct or guaranteed overlap between 'pens' and 'pencils' from the given statements; the shared books need not include any pens.");
  syl("Medium","All cats are dogs. All dogs are animals.","All cats are animals.","Follows","Since all cats are dogs and all dogs are animals, every cat must also be an animal — a valid chain conclusion.");
  syl("Hard","No mobile is a laptop. Some laptops are tablets.","Some tablets are not mobiles.","Follows","Since some laptops (which are not mobiles) are tablets, at least some tablets must fall outside the 'mobile' category.");
  syl("Hard","Some doctors are engineers. All engineers are teachers.","Some doctors are teachers.","Follows","Since some doctors are engineers, and all engineers are teachers, those same doctors must also be teachers.");
  syl("Medium","All flowers are fruits. No fruit is a leaf.","No flower is a leaf.","Follows","If all flowers are fruits, and no fruit is a leaf, then no flower can be a leaf either — a valid chain."); 
  syl("Hard","Some chairs are tables. Some tables are almirahs.","Some chairs are almirahs.","Does not follow","The tables that are chairs and the tables that are almirahs need not be the same tables, so no overlap is guaranteed.");
  syl("Medium","All rivers are lakes. All lakes are oceans.","All rivers are oceans.","Follows","This is a straightforward transitive chain: rivers ⊆ lakes ⊆ oceans, so all rivers are oceans.");
  syl("Hard","No book is a pen. All pens are pencils.","No pencil is a book.","Does not follow","We only know pens are not books and pens are pencils; other pencils (that aren't pens) could still be books, so the conclusion isn't guaranteed.");
})();

/* -- Blood Relations -- */
(function(){
  var S = "Reasoning Ability", T = "Blood Relations";
  A(S,T,"Medium","Pointing to a photograph, Rekha said, 'He is the son of my grandfather's only son.' How is the man in the photo related to Rekha?","Brother",["Father","Cousin","Uncle"],"Rekha's grandfather's only son is Rekha's father, so the man in the photo is her father's son — her brother.");
  A(S,T,"Medium","A is the mother of B. B is the sister of C. C is the father of D. How is A related to D?","Grandmother",["Mother","Aunt","Sister"],"A is B's mother, and B and C are siblings, so A is also C's mother. Since C is D's father, A is D's grandmother.");
  A(S,T,"Hard","Introducing a man, a woman said, 'He is the son of my mother's only daughter.' How is the woman related to the man?","Mother",["Sister","Aunt","Grandmother"],"The woman's mother's only daughter is the woman herself, so the man is her son and she is his mother.");
  A(S,T,"Medium","P is Q's brother. R is Q's mother. S is R's father. How is P related to S?","Grandson",["Son","Nephew","Brother"],"R is Q's mother and P's mother too (siblings share a mother). S is R's father, making S the grandfather of P, so P is S's grandson.");
  A(S,T,"Hard","Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?","Mother",["Aunt","Sister","Grandmother"],"The only daughter of the woman's mother is the woman herself, so the man's mother is the woman — she is his mother.");
})();

/* ================= COMPUTER KNOWLEDGE ================= */
(function(){
  var S = "Computer Knowledge";
  A(S,"Computer Fundamentals","Easy","Which part of the computer is often referred to as its 'brain'?","CPU",["RAM","Hard Disk","Monitor"],"The Central Processing Unit (CPU) executes instructions and is often called the brain of the computer.");
  A(S,"Computer Fundamentals","Easy","Which type of computer memory loses its data when the power is switched off?","RAM",["ROM","Hard Disk","Pen Drive"],"RAM (Random Access Memory) is volatile memory — its contents are lost without power.");
  A(S,"Computer Fundamentals","Medium","Who is widely regarded as the father of the modern computer?","Charles Babbage",["Alan Turing","Bill Gates","Tim Berners-Lee"],"Charles Babbage designed the Analytical Engine and is regarded as the father of the computer.");
  A(S,"Computer Fundamentals","Easy","Which of these is an output device?","Monitor",["Keyboard","Mouse","Scanner"],"A monitor displays output; keyboard, mouse and scanner are primarily input devices.");
  A(S,"Computer Fundamentals","Medium","1 Byte is equal to how many bits?","8 bits",["4 bits","16 bits","2 bits"],"By standard convention, 1 byte consists of 8 bits.");
  A(S,"Computer Fundamentals","Medium","Which generation of computers introduced the microprocessor?","Fourth generation",["First generation","Second generation","Third generation"],"Fourth-generation computers (from the early 1970s) were built around microprocessors.");
  A(S,"MS Office","Easy","What is the default file extension for a Microsoft Word document (2007 onward)?",".docx",[".xlsx",".pptx",".txt"],"Word documents created in modern versions use the .docx extension.");
  A(S,"MS Office","Medium","Which Excel function is used to add a range of numbers?","=SUM()",["=ADD()","=TOTAL()","=PLUS()"],"The SUM function adds the values in a specified range of cells.");
  A(S,"MS Office","Easy","Which keyboard shortcut is used to save a document in most Office applications?","Ctrl + S",["Ctrl + P","Ctrl + O","Ctrl + N"],"Ctrl + S is the universal shortcut for saving a file.");
  A(S,"MS Office","Medium","In MS Excel, which symbol must be typed first to start a formula in a cell?","=",["+","#","@"],"Every formula in Excel begins with an equals sign (=)."); 
  A(S,"MS Office","Medium","Which view in MS PowerPoint is used to rearrange the order of slides?","Slide Sorter view",["Normal view","Reading view","Outline view"],"Slide Sorter view shows thumbnails of all slides, making reordering easy.");
  A(S,"Internet & Networking","Easy","What does 'HTTP' stand for?","Hyper Text Transfer Protocol",["High Transfer Text Process","Hyperlink Text Transfer Program","Home Tool Transfer Protocol"],"HTTP is the protocol used to transfer web pages over the internet.");
  A(S,"Internet & Networking","Medium","What does 'IP' stand for in 'IP address'?","Internet Protocol",["Internal Program","Information Path","Internet Path"],"An IP address is assigned under the Internet Protocol to identify devices on a network.");
  A(S,"Internet & Networking","Easy","What does 'URL' stand for?","Uniform Resource Locator",["Universal Reference Link","United Resource Locator","Uniform Reference Language"],"A URL is the address used to locate a resource on the internet."); 
  A(S,"Internet & Networking","Medium","Which device connects multiple networks and directs data traffic between them?","Router",["Modem","Switch","Hub"],"A router forwards data packets between different computer networks."); 
  A(S,"Internet & Networking","Hard","Which protocol is used to securely transfer web pages, indicated by a padlock icon in the browser?","HTTPS",["FTP","SMTP","HTTP"],"HTTPS adds SSL/TLS encryption on top of HTTP for secure communication."); 
  A(S,"Operating Systems","Easy","Which of the following is a widely used open-source operating system?","Linux",["MS Windows","macOS","iOS"],"Linux is developed and distributed under open-source licences, unlike Windows, macOS or iOS.");
  A(S,"Operating Systems","Medium","What is the primary function of an operating system?","Managing hardware and software resources",["Creating documents","Browsing the internet","Editing photos"],"An operating system manages a computer's hardware and software resources and provides services for programs.");
  A(S,"Operating Systems","Medium","Which of these is NOT an operating system?","MS Excel",["Windows","Linux","Android"],"MS Excel is application software (a spreadsheet program), not an operating system."); 
  A(S,"Cyber Security","Easy","Which system monitors and controls incoming and outgoing network traffic based on security rules?","Firewall",["Antivirus","Malware","Router"],"A firewall acts as a barrier between a trusted network and untrusted external networks."); 
  A(S,"Cyber Security","Medium","Software specifically designed to damage or gain unauthorised access to a computer system is called:","Malware",["Firmware","Freeware","Shareware"],"'Malware' is a general term covering viruses, worms, trojans and other harmful software.");
  A(S,"Cyber Security","Medium","A fraudulent attempt to obtain sensitive information by pretending to be a trustworthy entity is called:","Phishing",["Hacking","Spoofing","Encryption"],"Phishing typically uses fake emails or websites to trick users into revealing personal data.");
  A(S,"Shortcut Keys","Easy","What does the shortcut 'Ctrl + C' do in most applications?","Copy",["Paste","Cut","Undo"],"Ctrl + C copies the selected item to the clipboard."); 
  A(S,"Shortcut Keys","Easy","What does 'Ctrl + Z' do?","Undo the last action",["Redo the last action","Save the file","Close the file"],"Ctrl + Z reverses the most recent action performed."); 
  A(S,"Shortcut Keys","Medium","Which shortcut is used to switch between open applications in Windows?","Alt + Tab",["Ctrl + Tab","Shift + Tab","Windows + Tab (classic switch)"],"Alt + Tab cycles through currently open application windows.");
  A(S,"Shortcut Keys","Easy","What does 'Ctrl + P' do?","Print the current document",["Paste the copied item","Open a new document","Save the document"],"Ctrl + P opens the print dialog for the active document.");
  A(S,"Abbreviations","Easy","What does 'BIOS' stand for?","Basic Input Output System",["Basic Internal Operating System","Binary Input Output Software","Basic Interface Output System"],"BIOS initialises hardware during the boot process before the operating system loads.");
  A(S,"Abbreviations","Easy","What does 'USB' stand for?","Universal Serial Bus",["Universal System Bus","United Serial Board","Universal Storage Bus"],"USB is a standard interface for connecting peripheral devices to computers.");
  A(S,"Abbreviations","Medium","What does 'HTML' stand for?","Hyper Text Markup Language",["High Text Machine Language","Hyperlink and Text Markup Language","Home Tool Markup Language"],"HTML is the standard markup language used to create web pages.");
  A(S,"Abbreviations","Medium","What does 'RAM' stand for?","Random Access Memory",["Read Access Memory","Rapid Access Module","Read And Modify"],"RAM allows data to be read and written in any order, hence 'random access'.");
  A(S,"Abbreviations","Hard","What does 'CPU' stand for?","Central Processing Unit",["Central Program Unit","Computer Processing Utility","Core Processing Unit"],"CPU refers to the primary component that carries out instructions of a computer program.");
})();

/* ================= BANKING & DCCB AWARENESS ================= */
(function(){
  var S = "Banking & Financial Awareness";
  A(S,"Banking Awareness","Easy","Which institution acts as the central bank and chief monetary authority of India?","Reserve Bank of India (RBI)",["State Bank of India","NABARD","SEBI"],"The RBI, established in 1935, regulates monetary policy and the banking system in India.");
  A(S,"Banking Awareness","Medium","What is the minimum amount a customer is generally required to maintain in a savings account called?","Minimum Balance",["Fixed Deposit","Overdraft","Cash Credit"],"Banks require account holders to keep a specified minimum balance in savings accounts, subject to bank policy.");
  A(S,"Banking Awareness","Medium","A cheque that has crossed lines drawn across its face and cannot be paid over the counter is called a:","Crossed cheque",["Bearer cheque","Post-dated cheque","Stale cheque"],"A crossed cheque can only be deposited into a bank account, not encashed directly at the counter.");
  A(S,"Banking Awareness","Hard","The rate at which RBI lends short-term funds to commercial banks is called the:","Repo Rate",["Reverse Repo Rate","Bank Rate","CRR"],"The repo rate is the rate at which the RBI lends money to commercial banks against government securities.");
  A(S,"Banking Awareness","Hard","The percentage of a bank's total deposits that must be kept as reserves with the RBI is called:","Cash Reserve Ratio (CRR)",["Statutory Liquidity Ratio","Repo Rate","Base Rate"],"CRR is the portion of deposits banks must keep with the RBI in cash form, used as a monetary policy tool.");
  A(S,"Banking Awareness","Medium","A loan given against the security of a fixed deposit is generally known as:","Loan against FD",["Personal loan","Overdraft","Cash credit"],"Banks commonly allow customers to borrow against their fixed deposits at competitive interest rates.");
  A(S,"Banking Awareness","Easy","Which of these best describes a 'Non-Performing Asset' (NPA)?","A loan on which interest or principal repayment is overdue for a specified period",["A fixed deposit account","A savings account with zero balance","A new bank branch"],"An NPA is a loan or advance where repayment has been overdue, usually beyond 90 days.");
  A(S,"Cooperative Banking","Medium","Cooperative banks in India generally follow a structure with how many tiers for short-term credit?","Three tiers",["Two tiers","Four tiers","Five tiers"],"The short-term cooperative credit structure typically has State Cooperative Banks, District Central Cooperative Banks (DCCB), and Primary Agricultural Credit Societies (PACS).");
  A(S,"Cooperative Banking","Medium","Which of these sits at the district level in India's short-term cooperative credit structure?","District Central Cooperative Bank (DCCB)",["State Cooperative Bank","Primary Agricultural Credit Society","Regional Rural Bank"],"The DCCB operates at the district level, between the State Cooperative Bank and the PACS.");
  A(S,"Cooperative Banking","Easy","At the village or grassroots level, short-term agricultural credit is primarily provided by:","Primary Agricultural Credit Societies (PACS)",["State Cooperative Banks","District Central Cooperative Banks","Commercial banks only"],"PACS operate at the village level and are the base of the cooperative credit structure.");
  A(S,"Cooperative Banking","Hard","Cooperative banks in India are regulated jointly by which two authorities?","RBI and the respective State Government / Registrar of Cooperative Societies",["SEBI and IRDAI","NABARD alone","Ministry of Finance alone"],"Cooperative banks fall under dual regulation — banking functions by the RBI, and registration/management aspects by state cooperative societies acts.");
  A(S,"Cooperative Banking","Medium","Which apex institution provides refinance support to cooperative banks for agriculture and rural development?","NABARD",["RBI","SEBI","LIC"],"NABARD was set up in 1982 to provide and regulate credit for agriculture and rural development, including refinancing cooperative banks.");
  A(S,"RBI","Easy","In which year was the Reserve Bank of India established?","1935",["1947","1950","1969"],"The RBI was established on 1 April 1935 under the Reserve Bank of India Act, 1934.");
  A(S,"RBI","Medium","Where is the headquarters of the Reserve Bank of India located?","Mumbai",["New Delhi","Kolkata","Chennai"],"The RBI's central office and headquarters are located in Mumbai.");
  A(S,"RBI","Medium","Which committee of the RBI decides the repo rate and other key policy rates?","Monetary Policy Committee (MPC)",["Banking Codes and Standards Board","Board for Financial Supervision","Central Board of Directors"],"The MPC, headed by the RBI Governor, is responsible for setting the policy repo rate.");
  A(S,"RBI","Hard","The RBI was nationalised in which year?","1949",["1935","1955","1969"],"Although established in 1935 as a private shareholders' bank, the RBI was nationalised on 1 January 1949.");
  A(S,"RBI","Medium","Who is the statutory head of the Reserve Bank of India?","Governor",["Chairman","President","Managing Director"],"The RBI is headed by a Governor appointed by the Government of India."); 
  A(S,"NABARD","Easy","NABARD stands for:","National Bank for Agriculture and Rural Development",["National Bureau for Agricultural Reform and Development","National Board for Agricultural Rural Deposits","National Association for Rural Development"],"NABARD is the apex development bank for agriculture and rural development in India.");
  A(S,"NABARD","Medium","In which year was NABARD established?","1982",["1969","1935","1991"],"NABARD was set up in July 1982 on the recommendation of the Committee to Review Arrangements for Institutional Credit (CRAFICARD).");
  A(S,"NABARD","Medium","NABARD primarily provides refinance support and supervision for which type of institutions?","Cooperative banks and Regional Rural Banks",["Only private sector banks","Only insurance companies","Only stock exchanges"],"NABARD refinances and supervises institutions like cooperative banks and RRBs that extend rural and agricultural credit.");
  A(S,"NABARD","Hard","NABARD was formed based on the recommendations of which committee?","CRAFICARD (Committee to Review Arrangements for Institutional Credit for Agriculture and Rural Development)",["Narasimham Committee","Rangarajan Committee","Verma Committee"],"CRAFICARD, chaired by B. Sivaraman, recommended the creation of NABARD in 1979.");
  A(S,"DCCB / PACS","Easy","DCCB stands for:","District Central Cooperative Bank",["District Credit Cooperative Board","Development Cooperative Central Bank","District Cooperative Credit Bureau"],"DCCBs operate at the district level in the short-term cooperative credit structure.");
  A(S,"DCCB / PACS","Medium","PACS stands for:","Primary Agricultural Credit Society",["Primary Agricultural Cooperative Scheme","Public Agricultural Credit System","Panchayat Agricultural Cooperative Society"],"PACS are village-level cooperative credit institutions that lend directly to farmers.");
  A(S,"DCCB / PACS","Medium","In the three-tier cooperative credit structure, which institution funds the DCCBs?","State Cooperative Bank",["NABARD directly to PACS","RBI directly to PACS","Commercial banks"],"State Cooperative Banks sit above DCCBs and channel funds down to them, which in turn fund PACS.");
  A(S,"DCCB / PACS","Hard","Membership in a Primary Agricultural Credit Society (PACS) is generally based on which principle?","Voluntary membership open to residents of the local area",["Compulsory government appointment","Membership limited to bank employees","Membership open only to large landowners"],"PACS are cooperative societies formed on the principle of voluntary, open membership within a defined local area.");
  A(S,"Banking Terms","Easy","The interest rate a bank charges its most creditworthy customers is generally referred to as the:","Base rate / Prime lending rate",["Repo rate","Reverse repo rate","Bank rate"],"The base rate (or MCLR in current practice) is the benchmark rate below which banks typically cannot lend."); 
  A(S,"Banking Terms","Medium","A document that instructs a bank to pay a specific sum from the drawer's account is called a:","Cheque",["Promissory note","Bill of exchange","Bond"],"A cheque is a written, signed order directing a bank to pay a stated sum to a specified person.");
  A(S,"Banking Terms","Medium","The facility allowing an account holder to withdraw more money than is available in their account, up to an agreed limit, is called:","Overdraft",["Fixed deposit","Recurring deposit","Demand draft"],"An overdraft lets a customer withdraw beyond their account balance up to a pre-approved limit.");
  A(S,"Banking Terms","Hard","A negotiable instrument payable to whoever holds it, without needing endorsement, is called a:","Bearer instrument",["Order instrument","Crossed instrument","Post-dated instrument"],"A bearer instrument can be transferred simply by delivery, without endorsement.");
  A(S,"Financial Awareness","Medium","KYC, a mandatory process for opening a bank account, stands for:","Know Your Customer",["Keep Your Cash","Know Your Credit","Key Yield Calculation"],"KYC norms require banks to verify the identity and address of customers to prevent fraud and money laundering.");
  A(S,"Financial Awareness","Medium","The scheme that provides banking access to unbanked households in India, launched in 2014, is called:","Pradhan Mantri Jan Dhan Yojana",["Pradhan Mantri Awas Yojana","Atal Pension Yojana","Sukanya Samriddhi Yojana"],"PMJDY, launched in August 2014, aims to provide universal access to banking facilities.");
  A(S,"Financial Awareness","Hard","The insurance cover provided on bank deposits in India (per depositor, per bank) is currently:","₹5 lakh",["₹1 lakh","₹2 lakh","₹10 lakh"],"The Deposit Insurance and Credit Guarantee Corporation (DICGC) insures deposits up to ₹5 lakh per depositor per bank, a limit revised in 2020.");
})();

/* ================= GENERAL KNOWLEDGE (India / AP) ================= */
(function(){
  var S = "General Knowledge";
  A(S,"India & AP GK","Easy","What is the capital city of Andhra Pradesh (as per the state's current administrative arrangement)?","Amaravati",["Hyderabad","Visakhapatnam","Vijayawada"],"Amaravati has been designated as the capital of Andhra Pradesh following the state's bifurcation.");
  A(S,"India & AP GK","Medium","Which river is closely associated with the districts of coastal Andhra Pradesh and forms a major delta there?","Godavari",["Yamuna","Narmada","Tapi"],"The Godavari river forms a large, fertile delta in coastal Andhra Pradesh.");
  A(S,"India & AP GK","Easy","Who is regarded as the 'Father of the Nation' in India?","Mahatma Gandhi",["Jawaharlal Nehru","Subhas Chandra Bose","Sardar Vallabhbhai Patel"],"Mahatma Gandhi led India's independence movement through non-violent civil disobedience and is honoured as the Father of the Nation.");
  A(S,"India & AP GK","Medium","India's Parliament is composed of the President and which two houses?","Lok Sabha and Rajya Sabha",["Lok Sabha and Vidhan Sabha","Rajya Sabha and Vidhan Parishad","Lok Sabha and Vidhan Parishad"],"The Indian Parliament consists of the President, the Lok Sabha (House of the People), and the Rajya Sabha (Council of States).");
  A(S,"India & AP GK","Medium","Which Article of the Indian Constitution abolished untouchability?","Article 17",["Article 14","Article 19","Article 21"],"Article 17 of the Constitution abolishes 'untouchability' and forbids its practice in any form.");
  A(S,"India & AP GK","Hard","In which year did Andhra Pradesh get bifurcated to form Telangana as a separate state?","2014",["2000","2009","2019"],"Telangana was formed as India's 29th state on 2 June 2014, following the bifurcation of Andhra Pradesh.");
  A(S,"India & AP GK","Medium","Which is the longest river in India?","Ganga",["Godavari","Yamuna","Krishna"],"The Ganga is the longest river flowing through India, originating in the Himalayas.");
  A(S,"India & AP GK","Easy","India gained independence from British rule on which date?","15 August 1947",["26 January 1950","2 October 1947","15 August 1950"],"India became independent on 15 August 1947; 26 January 1950 marks the date the Constitution came into force (Republic Day).");
  A(S,"India & AP GK","Medium","Who was the first Prime Minister of independent India?","Jawaharlal Nehru",["Mahatma Gandhi","Sardar Vallabhbhai Patel","Dr. Rajendra Prasad"],"Jawaharlal Nehru served as India's first Prime Minister from 1947.");
  A(S,"India & AP GK","Medium","Which of these is a classical dance form that originated in Andhra Pradesh?","Kuchipudi",["Bharatanatyam","Odissi","Kathak"],"Kuchipudi is a classical dance form that originated in the Kuchipudi village of Andhra Pradesh.");
  A(S,"India & AP GK","Hard","The Reserve Bank of India regulates cooperative banks jointly with which body for matters of registration and management?","Registrar of Cooperative Societies (state government)",["Election Commission of India","Comptroller and Auditor General","Union Public Service Commission"],"While RBI oversees banking functions, day-to-day registration and management of cooperative societies fall under the state Registrar of Cooperative Societies.");
  A(S,"India & AP GK","Easy","Which is the national emblem of India adopted from the Lion Capital of Ashoka?","The Ashoka Chakra / Lion Capital emblem",["The Peacock","The Banyan Tree","The Lotus"],"India's State Emblem is adapted from the Lion Capital of Ashoka at Sarnath, officially adopted on 26 January 1950.");
})();

/* ================= QUANTITATIVE APTITUDE (parametric, genuinely varied) ================= */

/* Percentage */
(function(){
  var S = "Quantitative Aptitude", T = "Percentage";
  var seen = {};
  var bases = [150,180,220,250,280,320,360,400,450,500,600,750];
  var pcts = [8,12,15,18,20,24,25,30,35,40];
  var count = 0;
  for (var i = 0; i < bases.length && count < 26; i++){
    var base = bases[i];
    var pct = pcts[i % pcts.length];
    var res = Math.round((pct * base) / 100);
    var qtext = "What is " + pct + "% of " + base + "?";
    if (seen[qtext]) continue;
    seen[qtext] = true;
    var diff = (base > 400 || pct > 30) ? "Medium" : "Easy";
    A(S, T, diff, qtext, res.toString(), [(res+5).toString(), Math.max(0,res-5).toString(), (res+12).toString()], "(" + pct + " ÷ 100) × " + base + " = " + res + ".");
    count++;
  }
  var pairs = [[40,320,25],[60,240,15],[120,480,20],[75,300,30],[90,450,10],[36,180,40]];
  pairs.forEach(function(p){
    var part = p[0], whole = p[1];
    var ans = Math.round((part/whole)*100);
    var qtext = part + " is what percent of " + whole + "?";
    if (seen[qtext]) return;
    seen[qtext] = true;
    A(S, T, "Medium", qtext, ans + "%", [(ans+5)+"%", (ans-5)+"%", (ans+10)+"%"], "(" + part + " ÷ " + whole + ") × 100 = " + ans + "%.");
  });
})();

/* Simplification (BODMAS) */
(function(){
  var S = "Quantitative Aptitude", T = "Simplification";
  var seen = {};
  var vals = [[12,3,4],[18,2,6],[24,4,5],[36,6,3],[15,5,7],[20,4,9],[28,7,2],[45,9,3],[16,4,8],[32,8,6],[27,3,5],[40,5,4]];
  vals.forEach(function(v){
    var a=v[0], b=v[1], c=v[2];
    var qtext = a + " + " + b + " × " + c + " − 10 = ?";
    if (seen[qtext]) return;
    seen[qtext] = true;
    var ans = a + b*c - 10;
    A(S, T, "Easy", "Simplify: " + qtext, ans.toString(), [(ans+5).toString(), (ans-5).toString(), (ans+10).toString()], "By BODMAS, multiplication is performed before addition/subtraction: " + a + " + (" + b + "×" + c + ") − 10 = " + ans + ".");
  });
  var vals2 = [[100,5,4,10],[144,12,3,8],[81,9,2,5],[121,11,4,6],[64,8,5,12],[169,13,3,9]];
  vals2.forEach(function(v){
    var a=v[0],b=v[1],c=v[2],d=v[3];
    var qtext = "(" + a + " ÷ " + b + ") + " + c + " × " + d + " = ?";
    if (seen[qtext]) return; seen[qtext]=true;
    var ans = (a/b) + c*d;
    A(S, T, "Medium", "Simplify: " + qtext, ans.toString(), [(ans+6).toString(), (ans-6).toString(), (ans+15).toString()], "Division and multiplication are done before addition: (" + a + "÷" + b + ") + (" + c + "×" + d + ") = " + ans + ".");
  });
})();

/* Time & Work */
(function(){
  var S = "Quantitative Aptitude", T = "Time & Work";
  var days = [8,9,10,12,14,15,16,18,20,21,24,25];
  var seen = {};
  days.forEach(function(d){
    var qtext = "A can complete a piece of work in " + d + " days. What fraction of the work does A complete in one day?";
    if (seen[qtext]) return; seen[qtext]=true;
    A(S, T, "Easy", qtext, "1/" + d, [d + "/2", "1/" + (d+2), "2/" + d], "If a task takes " + d + " days to finish, one day's work is the reciprocal: 1/" + d + ".");
  });
  var pairs = [[10,15],[12,18],[8,24],[15,20],[9,12],[20,30],[6,10],[14,21]];
  pairs.forEach(function(p){
    var a=p[0], b=p[1];
    var lcm = (function(x,y){function gcd(m,n){return n?gcd(n,m%n):m;} return (x*y)/gcd(x,y);})(a,b);
    var work = lcm;
    var rateA = work/a, rateB = work/b;
    var together = Math.round((work/(rateA+rateB))*10)/10;
    var qtext = "A can finish a job in " + a + " days and B can finish the same job in " + b + " days. Working together, in how many days will they finish it?";
    if (seen[qtext]) return; seen[qtext]=true;
    A(S, T, "Hard", qtext, together + " days", [(together+2)+" days", (together-1)+" days", (a+b)+" days"], "Combined one-day work = 1/" + a + " + 1/" + b + ". Total time = " + together + " days.");
  });
})();

/* Simple Interest */
(function(){
  var S = "Quantitative Aptitude", T = "Simple Interest";
  var sets = [[2000,5,2],[3000,6,3],[5000,4,5],[4500,8,2],[6000,7,3],[2500,10,4],[8000,5,2],[7500,6,4],[1000,12,3],[9000,4,3]];
  var seen = {};
  sets.forEach(function(s){
    var p=s[0], r=s[1], t=s[2];
    var si = Math.round((p*r*t)/100);
    var qtext = "Find the simple interest on ₹" + p + " at " + r + "% per annum for " + t + " years.";
    if (seen[qtext]) return; seen[qtext]=true;
    A(S, T, "Medium", qtext, "₹" + si, ["₹" + (si+100), "₹" + Math.max(0,si-100), "₹" + (si+250)], "SI = (P × R × T) / 100 = (" + p + " × " + r + " × " + t + ") / 100 = ₹" + si + ".");
  });
})();

/* Average */
(function(){
  var S = "Quantitative Aptitude", T = "Average";
  var sets = [
    [12,15,18,21],[10,20,30,40],[5,15,25,35,45],[8,16,24,32],[22,28,34,40],[9,18,27,36,45],
    [50,60,70,80],[11,13,17,19],[100,150,200],[6,12,18,24,30]
  ];
  var seen = {};
  sets.forEach(function(nums){
    var sum = nums.reduce(function(a,b){return a+b;},0);
    var avg = Math.round((sum/nums.length)*100)/100;
    var qtext = "Find the average of: " + nums.join(", ") + ".";
    if (seen[qtext]) return; seen[qtext]=true;
    A(S, T, "Easy", qtext, avg.toString(), [(avg+2).toString(), (avg-2).toString(), (avg+5).toString()], "Average = (sum of values) ÷ (number of values) = " + sum + " ÷ " + nums.length + " = " + avg + ".");
  });
})();

/* Profit & Loss */
(function(){
  var S = "Quantitative Aptitude", T = "Profit & Loss";
  var sets = [[400,460],[600,540],[800,920],[1500,1350],[250,300],[1000,1150],[750,675],[2000,2400],[350,420],[900,810]];
  var seen = {};
  sets.forEach(function(s){
    var cp=s[0], sp=s[1];
    var diff = sp - cp;
    var pct = Math.round((Math.abs(diff)/cp)*10000)/100;
    var qtext = "A shopkeeper buys an article for ₹" + cp + " and sells it for ₹" + sp + ". Find the " + (diff>=0?"profit":"loss") + " percentage.";
    if (seen[qtext]) return; seen[qtext]=true;
    A(S, T, "Medium", qtext, pct + "%", [(pct+5).toFixed(2)+"%", Math.max(0,pct-5).toFixed(2)+"%", (pct+10).toFixed(2)+"%"], (diff>=0 ? "Profit" : "Loss") + " % = (|SP − CP| ÷ CP) × 100 = " + pct + "%.");
  });
})();

/* ================= REASONING: Direction Sense & Number Series (parametric) ================= */

(function(){
  var S = "Reasoning Ability", T = "Direction Sense";
  var sets = [[3,4],[5,4],[6,4],[8,4],[4,3],[7,5],[9,4],[10,6],[5,3],[6,5]];
  var seen = {};
  sets.forEach(function(s){
    var north = s[0], east = s[1];
    var qtext = "A person walks " + north + " km North, then turns East and walks " + east + " km, then walks " + north + " km South. How far is he from his starting point?";
    if (seen[qtext]) return; seen[qtext]=true;
    A(S, T, "Medium", qtext, east + " km", [(north)+" km", (north+east)+" km", "0 km"], "The " + north + " km North and " + north + " km South movements cancel out, leaving only the " + east + " km horizontal displacement.");
  });
  var sets2 = [[4,3],[6,8],[5,12],[9,12],[8,6],[7,24]];
  sets2.forEach(function(s){
    var a=s[0], b=s[1];
    var hyp = Math.round(Math.sqrt(a*a+b*b));
    var qtext = "A man walks " + a + " km North and then " + b + " km East. How far is he from his starting point (to the nearest km)?";
    if (seen[qtext]) return; seen[qtext]=true;
    A(S, T, "Hard", qtext, hyp + " km", [(a+b)+" km", (hyp+2)+" km", Math.max(0,hyp-2)+" km"], "The displacement forms a right triangle; distance = √(" + a + "² + " + b + "²) ≈ " + hyp + " km.");
  });
})();

(function(){
  var S = "Reasoning Ability", T = "Number Series";
  var seen = {};
  for (var start = 2; start <= 8; start++){
    for (var diffv = 3; diffv <= 6; diffv++){
      var seq = [start, start+diffv, start+2*diffv, start+3*diffv];
      var next = start + 4*diffv;
      var qtext = "Find the next number in the series: " + seq.join(", ") + ", ?";
      if (seen[qtext]) continue; seen[qtext]=true;
      A(S, T, "Easy", qtext, next.toString(), [(next+2).toString(), (next-2).toString(), (next*2).toString()], "The series increases by a constant difference of " + diffv + " each time.");
      if (Object.keys(seen).length >= 14) break;
    }
    if (Object.keys(seen).length >= 14) break;
  }
  var mulSets = [[2,2],[3,2],[2,3],[1,2],[4,2],[5,2]];
  mulSets.forEach(function(m){
    var start=m[0], ratio=m[1];
    var seq=[start, start*ratio, start*ratio*ratio, start*Math.pow(ratio,3)];
    var next = start*Math.pow(ratio,4);
    var qtext = "Find the next number in the series: " + seq.join(", ") + ", ?";
    if (seen[qtext]) return; seen[qtext]=true;
    A(S, T, "Medium", qtext, next.toString(), [(next+ratio).toString(), Math.round(next/ratio).toString(), (next*ratio).toString()], "Each term is obtained by multiplying the previous term by " + ratio + ".");
  });
  var sqSets = [1,2,3,4,5,6];
  sqSets.forEach(function(st){
    var seq = [st*st, (st+1)*(st+1), (st+2)*(st+2), (st+3)*(st+3)];
    var next = (st+4)*(st+4);
    var qtext = "Find the missing number: " + seq.join(", ") + ", ?";
    if (seen[qtext]) return; seen[qtext]=true;
    A(S, T, "Hard", qtext, next.toString(), [(next+2).toString(), (next-2).toString(), (next+10).toString()], "The series consists of consecutive perfect squares: " + (st) + "² , " + (st+1) + "² , " + (st+2) + "² , " + (st+3) + "² , " + (st+4) + "².");
  });
})();

/* ============================================================
   Build derived metadata used by the app
   ============================================================ */
var SECTIONS = [];
var TOPICS_BY_SECTION = {};
(function(){
  var secSeen = {};
  QUESTIONS.forEach(function(q){
    if (!secSeen[q.section]){ secSeen[q.section]=true; SECTIONS.push(q.section); TOPICS_BY_SECTION[q.section]=[]; }
    if (TOPICS_BY_SECTION[q.section].indexOf(q.topic) === -1){ TOPICS_BY_SECTION[q.section].push(q.topic); }
  });
})();
