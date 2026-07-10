let mongoose = require('mongoose');
let express = require('express');
let app = express();
let cors = require('cors')
let Quiz = require('./models/quiz')

let dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());

// Mock data - 200+ questions
const mockQuestions = [
    { id: 1, question: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Madrid"], answer: "Paris" },
    { id: 2, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { id: 3, question: "Who wrote Romeo and Juliet?", options: ["Jane Austen", "Mark Twain", "William Shakespeare", "Charles Dickens"], answer: "William Shakespeare" },
    { id: 4, question: "What is the largest planet in our solar system?", options: ["Saturn", "Neptune", "Jupiter", "Uranus"], answer: "Jupiter" },
    { id: 5, question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: "Vatican City" },
    { id: 6, question: "In which year did the Titanic sink?", options: ["1912", "1920", "1905", "1915"], answer: "1912" },
    { id: 7, question: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], answer: "Au" },
    { id: 8, question: "Which country is home to the kangaroo?", options: ["New Zealand", "Australia", "South Africa", "Brazil"], answer: "Australia" },
    { id: 9, question: "What is the highest mountain in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], answer: "Mount Everest" },
    { id: 10, question: "Who is the author of Harry Potter?", options: ["J.K. Rowling", "Stephen King", "George R.R. Martin", "J.R.R. Tolkien"], answer: "J.K. Rowling" },
    { id: 11, question: "What is the largest ocean?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
    { id: 12, question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Osmium", "Oil"], answer: "Oxygen" },
    { id: 13, question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
    { id: 14, question: "Who painted the Mona Lisa?", options: ["Michelangelo", "Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"], answer: "Leonardo da Vinci" },
    { id: 15, question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: "Tokyo" },
    { id: 16, question: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Bangalore", "Kolkata"], answer: "New Delhi" },
    { id: 17, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mercury", "Mars", "Saturn"], answer: "Mars" },
    { id: 18, question: "What is the chemical symbol for Silver?", options: ["Si", "Ag", "Au", "Cu"], answer: "Ag" },
    { id: 19, question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
    { id: 20, question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], answer: "George Washington" },
    { id: 21, question: "What is the smallest ocean?", options: ["Indian Ocean", "Arctic Ocean", "Atlantic Ocean", "Southern Ocean"], answer: "Arctic Ocean" },
    { id: 22, question: "Which country has the most population?", options: ["India", "USA", "China", "Indonesia"], answer: "India" },
    { id: 23, question: "What is the chemical symbol for Iron?", options: ["Fe", "Ir", "In", "I"], answer: "Fe" },
    { id: 24, question: "Who wrote '1984'?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Kurt Vonnegut"], answer: "George Orwell" },
    { id: 25, question: "What is the speed of light?", options: ["3 x 10^8 m/s", "2 x 10^8 m/s", "4 x 10^8 m/s", "5 x 10^8 m/s"], answer: "3 x 10^8 m/s" },
    { id: 26, question: "Which is the largest desert?", options: ["Gobi", "Sahara", "Kalahari", "Atacama"], answer: "Sahara" },
    { id: 27, question: "Who invented the telephone?", options: ["Nikola Tesla", "Alexander Graham Bell", "Thomas Edison", "Michael Faraday"], answer: "Alexander Graham Bell" },
    { id: 28, question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
    { id: 29, question: "Which country is also known as the Swiss Confederation?", options: ["Austria", "Belgium", "Switzerland", "Netherlands"], answer: "Switzerland" },
    { id: 30, question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "Nathaniel Hawthorne", "Herman Melville"], answer: "Harper Lee" },
    { id: 31, question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], answer: "Brasília" },
    { id: 32, question: "Which animal is the fastest land animal?", options: ["Lion", "Cheetah", "Greyhound", "Antelope"], answer: "Cheetah" },
    { id: 33, question: "What is the capital of Germany?", options: ["Munich", "Hamburg", "Berlin", "Frankfurt"], answer: "Berlin" },
    { id: 34, question: "Who was the first man on the moon?", options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"], answer: "Neil Armstrong" },
    { id: 35, question: "What is the deepest ocean trench?", options: ["Tonga Trench", "Mariana Trench", "Kuril-Kamchatka Trench", "Philippine Trench"], answer: "Mariana Trench" },
    { id: 36, question: "Which programming language is known as the language of the web?", options: ["Python", "Java", "JavaScript", "C++"], answer: "JavaScript" },
    { id: 37, question: "What is the capital of Egypt?", options: ["Alexandria", "Giza", "Cairo", "Luxor"], answer: "Cairo" },
    { id: 38, question: "Who wrote 'Pride and Prejudice'?", options: ["Jane Austen", "Emily Brontë", "Charlotte Brontë", "Louisa May Alcott"], answer: "Jane Austen" },
    { id: 39, question: "What is 15 × 12?", options: ["170", "180", "190", "200"], answer: "180" },
    { id: 40, question: "Which element is a liquid at room temperature?", options: ["Gold", "Mercury", "Silver", "Copper"], answer: "Mercury" },
    { id: 41, question: "What is the capital of Italy?", options: ["Milan", "Rome", "Florence", "Venice"], answer: "Rome" },
    { id: 42, question: "How many bones are in the human body?", options: ["186", "206", "226", "246"], answer: "206" },
    { id: 43, question: "Who invented the light bulb?", options: ["Benjamin Franklin", "Thomas Edison", "Nikola Tesla", "Joseph Swan"], answer: "Thomas Edison" },
    { id: 44, question: "What is the capital of Spain?", options: ["Barcelona", "Madrid", "Valencia", "Seville"], answer: "Madrid" },
    { id: 45, question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Mercury" },
    { id: 46, question: "What is the currency of Japan?", options: ["Won", "Yuan", "Yen", "Rupee"], answer: "Yen" },
    { id: 47, question: "Who is the creator of Spider-Man?", options: ["Bob Kane", "Stan Lee", "Jack Kirby", "Steve Ditko"], answer: "Stan Lee" },
    { id: 48, question: "What is 25 ÷ 5?", options: ["5", "10", "15", "20"], answer: "5" },
    { id: 49, question: "Which is the hottest planet?", options: ["Mars", "Mercury", "Venus", "Earth"], answer: "Venus" },
    { id: 50, question: "What is the capital of Russia?", options: ["St. Petersburg", "Moscow", "Novosibirsk", "Yekaterinburg"], answer: "Moscow" },
    { id: 51, question: "Who wrote 'The Great Gatsby'?", options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"], answer: "F. Scott Fitzgerald" },
    { id: 52, question: "What is the chemical symbol for Copper?", options: ["Co", "Cu", "Cs", "Cr"], answer: "Cu" },
    { id: 53, question: "How many strings does a violin have?", options: ["3", "4", "5", "6"], answer: "4" },
    { id: 54, question: "What is the capital of Greece?", options: ["Sparta", "Delphi", "Athens", "Corinth"], answer: "Athens" },
    { id: 55, question: "Which country gifted the Statue of Liberty to the USA?", options: ["Germany", "France", "Spain", "Italy"], answer: "France" },
    { id: 56, question: "What is the freezing point of water?", options: ["0°C", "-10°C", "10°C", "-5°C"], answer: "0°C" },
    { id: 57, question: "Who wrote 'Brave New World'?", options: ["George Orwell", "Ray Bradbury", "Aldous Huxley", "Kurt Vonnegut"], answer: "Aldous Huxley" },
    { id: 58, question: "What is 7 × 8?", options: ["54", "56", "58", "60"], answer: "56" },
    { id: 59, question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Korea", "Vietnam", "Japan"], answer: "Japan" },
    { id: 60, question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
    { id: 61, question: "How many days are in a leap year?", options: ["363", "364", "365", "366"], answer: "366" },
    { id: 62, question: "Who discovered America?", options: ["Amerigo Vespucci", "Christopher Columbus", "Ferdinand Magellan", "Bartholomeu Dias"], answer: "Christopher Columbus" },
    { id: 63, question: "What is the capital of Mexico?", options: ["Cancun", "Guadalajara", "Mexico City", "Acapulco"], answer: "Mexico City" },
    { id: 64, question: "Which is the driest continent?", options: ["South America", "Africa", "Antarctica", "Asia"], answer: "Antarctica" },
    { id: 65, question: "What is the chemical symbol for Nitrogen?", options: ["Ni", "No", "N", "Nb"], answer: "N" },
    { id: 66, question: "Who painted 'Starry Night'?", options: ["Pablo Picasso", "Vincent van Gogh", "Wassily Kandinsky", "Salvador Dalí"], answer: "Vincent van Gogh" },
    { id: 67, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], answer: "12" },
    { id: 68, question: "Which country has the Great Wall?", options: ["Russia", "China", "India", "Japan"], answer: "China" },
    { id: 69, question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: "Canberra" },
    { id: 70, question: "How many sides does a hexagon have?", options: ["4", "5", "6", "7"], answer: "6" },
    { id: 71, question: "Who was the first President of India?", options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Sardar Vallabhbhai Patel", "Abul Kalam Azad"], answer: "Dr. Rajendra Prasad" },
    { id: 72, question: "What is the capital of Thailand?", options: ["Phuket", "Chiang Mai", "Bangkok", "Pattaya"], answer: "Bangkok" },
    { id: 73, question: "Which ocean is the largest?", options: ["Indian", "Atlantic", "Arctic", "Pacific"], answer: "Pacific" },
    { id: 74, question: "What is the chemical formula for table salt?", options: ["NaCl", "KCl", "CaCl2", "MgCl2"], answer: "NaCl" },
    { id: 75, question: "Who wrote 'The Hobbit'?", options: ["C.S. Lewis", "George R.R. Martin", "J.R.R. Tolkien", "Terry Pratchett"], answer: "J.R.R. Tolkien" },
    { id: 76, question: "What is 18 + 7?", options: ["23", "24", "25", "26"], answer: "25" },
    { id: 77, question: "Which is the coldest continent?", options: ["Greenland", "Iceland", "Antarctica", "Siberia"], answer: "Antarctica" },
    { id: 78, question: "What is the capital of Turkey?", options: ["Istanbul", "Ankara", "Izmir", "Bursa"], answer: "Ankara" },
    { id: 79, question: "How many hours are in a day?", options: ["12", "20", "24", "30"], answer: "24" },
    { id: 80, question: "Who invented the computer?", options: ["Ada Lovelace", "Charles Babbage", "Alan Turing", "John von Neumann"], answer: "Charles Babbage" },
    { id: 81, question: "What is the capital of Saudi Arabia?", options: ["Jeddah", "Riyadh", "Dammam", "Mecca"], answer: "Riyadh" },
    { id: 82, question: "Which country is also called the Pearl of the Andaman?", options: ["Thailand", "Myanmar", "Maldives", "Sri Lanka"], answer: "Thailand" },
    { id: 83, question: "What is the speed of sound?", options: ["330 m/s", "340 m/s", "350 m/s", "360 m/s"], answer: "340 m/s" },
    { id: 84, question: "Who wrote 'Jane Eyre'?", options: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Anne Brontë"], answer: "Charlotte Brontë" },
    { id: 85, question: "What is 9 × 9?", options: ["72", "81", "90", "99"], answer: "81" },
    { id: 86, question: "Which planet has the most moons?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], answer: "Jupiter" },
    { id: 87, question: "What is the capital of Switzerland?", options: ["Zurich", "Geneva", "Bern", "Basel"], answer: "Bern" },
    { id: 88, question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
    { id: 89, question: "What is the chemical symbol for Sodium?", options: ["Na", "N", "So", "S"], answer: "Na" },
    { id: 90, question: "Who painted 'The Persistence of Memory'?", options: ["Vincent van Gogh", "Salvador Dalí", "Pablo Picasso", "Marc Chagall"], answer: "Salvador Dalí" },
    { id: 91, question: "What is 50 × 2?", options: ["100", "110", "120", "130"], answer: "100" },
    { id: 92, question: "Which country is known as the Land of Smiles?", options: ["India", "Thailand", "Vietnam", "Cambodia"], answer: "Thailand" },
    { id: 93, question: "What is the capital of Portugal?", options: ["Porto", "Lisbon", "Covilhã", "Setúbal"], answer: "Lisbon" },
    { id: 94, question: "How many days are in February in a non-leap year?", options: ["28", "29", "30", "31"], answer: "28" },
    { id: 95, question: "Who discovered penicillin?", options: ["Louis Pasteur", "Alexander Fleming", "Joseph Lister", "Florence Nightingale"], answer: "Alexander Fleming" },
    { id: 96, question: "What is the capital of Poland?", options: ["Krakow", "Warsaw", "Gdansk", "Wroclaw"], answer: "Warsaw" },
    { id: 97, question: "Which desert is the largest?", options: ["Kalahari", "Arabian", "Gobi", "Sahara"], answer: "Sahara" },
    { id: 98, question: "What is the chemical symbol for Potassium?", options: ["P", "Po", "K", "Pt"], answer: "K" },
    { id: 99, question: "Who wrote 'The Catcher in the Rye'?", options: ["J.D. Salinger", "Ernest Hemingway", "F. Scott Fitzgerald", "Mark Twain"], answer: "J.D. Salinger" },
    { id: 100, question: "What is 33 + 17?", options: ["40", "45", "50", "55"], answer: "50" },
    { id: 101, question: "Which country has the longest coastline?", options: ["Australia", "Indonesia", "China", "Russia"], answer: "Indonesia" },
    { id: 102, question: "What is the capital of South Korea?", options: ["Busan", "Incheon", "Seoul", "Daegu"], answer: "Seoul" },
    { id: 103, question: "How many strings does a guitar have?", options: ["5", "6", "7", "8"], answer: "6" },
    { id: 104, question: "Who directed 'Titanic'?", options: ["Ridley Scott", "Steven Spielberg", "James Cameron", "Christopher Nolan"], answer: "James Cameron" },
    { id: 105, question: "What is the capital of Netherlands?", options: ["Rotterdam", "Amsterdam", "Utrecht", "Groningen"], answer: "Amsterdam" },
    { id: 106, question: "Which is the largest lake?", options: ["Lake Superior", "Lake Michigan", "Caspian Sea", "Lake Baikal"], answer: "Caspian Sea" },
    { id: 107, question: "What is the chemical symbol for Chlorine?", options: ["Cl", "C", "Co", "Cr"], answer: "Cl" },
    { id: 108, question: "Who is the father of computers?", options: ["Alan Turing", "Charles Babbage", "John von Neumann", "Steve Jobs"], answer: "Charles Babbage" },
    { id: 109, question: "What is 12 × 11?", options: ["120", "121", "132", "144"], answer: "132" },
    { id: 110, question: "Which country is known as the Land of Fire and Ice?", options: ["New Zealand", "Iceland", "Norway", "Finland"], answer: "Iceland" },
    { id: 111, question: "What is the capital of Sweden?", options: ["Gothenburg", "Stockholm", "Malmö", "Uppsala"], answer: "Stockholm" },
    { id: 112, question: "How many months are in a year?", options: ["10", "11", "12", "13"], answer: "12" },
    { id: 113, question: "Who invented the airplane?", options: ["Alberto Santos-Dumont", "Wright Brothers", "Gabriel Lippmann", "Gustave Whitehead"], answer: "Wright Brothers" },
    { id: 114, question: "What is the capital of Norway?", options: ["Bergen", "Oslo", "Stavanger", "Trondheim"], answer: "Oslo" },
    { id: 115, question: "Which is the second largest desert?", options: ["Sahara", "Gobi", "Arabian", "Kalahari"], answer: "Arabian" },
    { id: 116, question: "What is the chemical symbol for Calcium?", options: ["Ca", "C", "Cm", "Cd"], answer: "Ca" },
    { id: 117, question: "Who wrote 'The Old Man and the Sea'?", options: ["Mark Twain", "Jack London", "Ernest Hemingway", "John Steinbeck"], answer: "Ernest Hemingway" },
    { id: 118, question: "What is 64 ÷ 8?", options: ["6", "7", "8", "9"], answer: "8" },
    { id: 119, question: "Which country is the most visited?", options: ["Italy", "Spain", "United States", "France"], answer: "France" },
    { id: 120, question: "What is the capital of Belgium?", options: ["Bruges", "Antwerp", "Brussels", "Ghent"], answer: "Brussels" },
    { id: 121, question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], answer: "3" },
    { id: 122, question: "Who was the shortest serving Prime Minister of India?", options: ["Lal Bahadur Shastri", "Charan Singh", "Atal Bihari Vajpayee", "Manmohan Singh"], answer: "Charan Singh" },
    { id: 123, question: "What is the capital of Austria?", options: ["Salzburg", "Vienna", "Innsbruck", "Linz"], answer: "Vienna" },
    { id: 124, question: "Which river is the longest?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
    { id: 125, question: "What is the chemical symbol for Magnesium?", options: ["Mg", "M", "Ma", "Mn"], answer: "Mg" },
    { id: 126, question: "Who is the author of 'The Chronicles of Narnia'?", options: ["J.K. Rowling", "Roald Dahl", "C.S. Lewis", "T.H. White"], answer: "C.S. Lewis" },
    { id: 127, question: "What is 15 + 15?", options: ["25", "30", "35", "40"], answer: "30" },
    { id: 128, question: "Which planet rotates backwards?", options: ["Venus", "Mercury", "Uranus", "Neptune"], answer: "Venus" },
    { id: 129, question: "What is the capital of Czech Republic?", options: ["Brno", "Prague", "Ostrava", "Pilsen"], answer: "Prague" },
    { id: 130, question: "How many grams are in a kilogram?", options: ["100", "500", "1000", "1500"], answer: "1000" },
    { id: 131, question: "Who invented the telescope?", options: ["Johannes Kepler", "Galileo Galilei", "Christiaan Huygens", "Isaac Newton"], answer: "Galileo Galilei" },
    { id: 132, question: "What is the capital of Denmark?", options: ["Aarhus", "Copenhagen", "Odense", "Aalborg"], answer: "Copenhagen" },
    { id: 133, question: "Which animal can live the longest?", options: ["Whale", "Parrot", "Tortoise", "Elephant"], answer: "Tortoise" },
    { id: 134, question: "What is the chemical symbol for Sulfur?", options: ["So", "S", "Su", "Sf"], answer: "S" },
    { id: 135, question: "Who wrote 'Sense and Sensibility'?", options: ["Charlotte Brontë", "Jane Austen", "Emily Brontë", "George Eliot"], answer: "Jane Austen" },
    { id: 136, question: "What is 27 ÷ 3?", options: ["7", "8", "9", "10"], answer: "9" },
    { id: 137, question: "Which country is the birthplace of democracy?", options: ["Rome", "Egypt", "Greece", "Mesopotamia"], answer: "Greece" },
    { id: 138, question: "What is the capital of Hungary?", options: ["Debrecen", "Budapest", "Szeged", "Pécs"], answer: "Budapest" },
    { id: 139, question: "How many minutes are in an hour?", options: ["30", "45", "60", "90"], answer: "60" },
    { id: 140, question: "Who was the first woman to win a Nobel Prize?", options: ["Rosalind Franklin", "Marie Curie", "Barbara McClintock", "Lise Meitner"], answer: "Marie Curie" },
    { id: 141, question: "What is the capital of Romania?", options: ["Constanta", "Bucharest", "Brasov", "Timisoara"], answer: "Bucharest" },
    { id: 142, question: "Which is the smallest bone in the human body?", options: ["Radius", "Stapes", "Fibula", "Tibia"], answer: "Stapes" },
    { id: 143, question: "What is the chemical symbol for Phosphorus?", options: ["P", "Po", "Ph", "Pb"], answer: "P" },
    { id: 144, question: "Who is the author of 'Sherlock Holmes'?", options: ["Agatha Christie", "Arthur Conan Doyle", "Dashiell Hammett", "Raymond Chandler"], answer: "Arthur Conan Doyle" },
    { id: 145, question: "What is 10 × 10?", options: ["80", "90", "100", "110"], answer: "100" },
    { id: 146, question: "Which country has the most museums?", options: ["Italy", "France", "Germany", "Greece"], answer: "Germany" },
    { id: 147, question: "What is the capital of Finland?", options: ["Turku", "Helsinki", "Tampere", "Lahti"], answer: "Helsinki" },
    { id: 148, question: "How many bones does an adult have?", options: ["186", "196", "206", "216"], answer: "206" },
    { id: 149, question: "Who developed the theory of evolution?", options: ["Jean-Baptiste Lamarck", "Charles Darwin", "Alfred Wallace", "Thomas Huxley"], answer: "Charles Darwin" },
    { id: 150, question: "What is the capital of Iceland?", options: ["Akureyri", "Reykjavik", "Hafnarfjordur", "Kopavogur"], answer: "Reykjavik" },
    { id: 151, question: "Which country is the largest by area?", options: ["Canada", "China", "USA", "Russia"], answer: "Russia" },
    { id: 152, question: "What is the chemical symbol for Zinc?", options: ["Zn", "Z", "Zo", "Ze"], answer: "Zn" },
    { id: 153, question: "Who is the author of 'Winnie the Pooh'?", options: ["Lewis Carroll", "A.A. Milne", "Dr. Seuss", "Roald Dahl"], answer: "A.A. Milne" },
    { id: 154, question: "What is 99 ÷ 9?", options: ["9", "10", "11", "12"], answer: "11" },
    { id: 155, question: "Which is the largest waterfall?", options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"], answer: "Angel Falls" },
    { id: 156, question: "What is the capital of Ireland?", options: ["Cork", "Dublin", "Galway", "Limerick"], answer: "Dublin" },
    { id: 157, question: "How many petals does a rose typically have?", options: ["4", "5", "6", "12"], answer: "5" },
    { id: 158, question: "Who invented the printing press?", options: ["Gutenberg", "Caxton", "Aldus Manutius", "Paolo Toscanelli"], answer: "Gutenberg" },
    { id: 159, question: "What is the capital of Luxembourg?", options: ["Esch", "Differdange", "Luxembourg City", "Dudelange"], answer: "Luxembourg City" },
    { id: 160, question: "Which animal has the largest brain?", options: ["Sperm Whale", "Elephant", "Dolphin", "Human"], answer: "Sperm Whale" },
    { id: 161, question: "What is the chemical symbol for Tin?", options: ["Ti", "Tin", "Sn", "T"], answer: "Sn" },
    { id: 162, question: "Who wrote 'Frankenstein'?", options: ["Mary Shelley", "Bram Stoker", "Edgar Allan Poe", "H.P. Lovecraft"], answer: "Mary Shelley" },
    { id: 163, question: "What is 21 + 29?", options: ["40", "45", "50", "55"], answer: "50" },
    { id: 164, question: "Which country has won the most Olympic medals?", options: ["China", "Germany", "Russia", "USA"], answer: "USA" },
    { id: 165, question: "What is the capital of Slovenia?", options: ["Maribor", "Ljubljana", "Kranj", "Celje"], answer: "Ljubljana" },
    { id: 166, question: "How many sides does a square have?", options: ["3", "4", "5", "6"], answer: "4" },
    { id: 167, question: "Who discovered X-rays?", options: ["Marie Curie", "Pierre Curie", "Wilhelm Röntgen", "Ernest Rutherford"], answer: "Wilhelm Röntgen" },
    { id: 168, question: "What is the capital of Estonia?", options: ["Tartu", "Tallinn", "Narva", "Pärnu"], answer: "Tallinn" },
    { id: 169, question: "Which bird is the fastest?", options: ["Hawk", "Eagle", "Peregrine Falcon", "Swallow"], answer: "Peregrine Falcon" },
    { id: 170, question: "What is the chemical symbol for Lead?", options: ["Ld", "L", "Pb", "Pl"], answer: "Pb" },
    { id: 171, question: "Who is the author of 'Oliver Twist'?", options: ["Charles Dickens", "George Eliot", "William Thackeray", "Anthony Trollope"], answer: "Charles Dickens" },
    { id: 172, question: "What is 36 × 2?", options: ["62", "70", "72", "80"], answer: "72" },
    { id: 173, question: "Which is the most spoken language?", options: ["Spanish", "English", "Hindi", "Mandarin Chinese"], answer: "Mandarin Chinese" },
    { id: 174, question: "What is the capital of Latvia?", options: ["Daugavpils", "Riga", "Liepaja", "Jelgava"], answer: "Riga" },
    { id: 175, question: "How many sides does an octagon have?", options: ["6", "7", "8", "9"], answer: "8" },
    { id: 176, question: "Who was Isaac Newton?", options: ["Chemist", "Physicist", "Mathematician", "All of the above"], answer: "All of the above" },
    { id: 177, question: "What is the capital of Lithuania?", options: ["Kaunas", "Vilnius", "Klaipeda", "Siauliai"], answer: "Vilnius" },
    { id: 178, question: "Which is the deepest lake?", options: ["Lake Tanganyika", "Lake Baikal", "Caspian Sea", "Lake Superior"], answer: "Lake Baikal" },
    { id: 179, question: "What is the chemical symbol for Bromine?", options: ["Br", "B", "Bo", "Bn"], answer: "Br" },
    { id: 180, question: "Who wrote 'Moby Dick'?", options: ["Nathaniel Hawthorne", "Herman Melville", "James Fenimore Cooper", "Mark Twain"], answer: "Herman Melville" },
    { id: 181, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], answer: "12" },
    { id: 182, question: "Which country has the most time zones?", options: ["USA", "Russia", "France", "China"], answer: "France" },
    { id: 183, question: "What is the capital of Croatia?", options: ["Rijeka", "Zagreb", "Zadar", "Split"], answer: "Zagreb" },
    { id: 184, question: "How many feet are in a mile?", options: ["1000", "2000", "5280", "8000"], answer: "5280" },
    { id: 185, question: "Who is known as the Father of Medicine?", options: ["Galen", "Hippocrates", "Paracelsus", "William Harvey"], answer: "Hippocrates" },
    { id: 186, question: "What is the capital of Serbia?", options: ["Nis", "Novi Sad", "Belgra", "Zemun"], answer: "Belgra" },
    { id: 187, question: "Which animal is known as the 'King of the Jungle'?", options: ["Tiger", "Lion", "Bear", "Leopard"], answer: "Lion" },
    { id: 188, question: "What is the chemical symbol for Iodine?", options: ["I", "Io", "Id", "In"], answer: "I" },
    { id: 189, question: "Who wrote 'The Adventures of Huckleberry Finn'?", options: ["Mark Twain", "Jack London", "Ernest Hemingway", "F. Scott Fitzgerald"], answer: "Mark Twain" },
    { id: 190, question: "What is 50 + 50?", options: ["90", "100", "110", "120"], answer: "100" },
    { id: 191, question: "Which country is also known as 'Helvetia'?", options: ["Austria", "Switzerland", "Slovenia", "Netherlands"], answer: "Switzerland" },
    { id: 192, question: "What is the capital of Slovakia?", options: ["Kosice", "Bratislava", "Zilina", "Presov"], answer: "Bratislava" },
    { id: 193, question: "How many inches are in a foot?", options: ["10", "12", "15", "20"], answer: "12" },
    { id: 194, question: "Who discovered the Americas?", options: ["Amerigo Vespucci", "Christopher Columbus", "John Cabot", "Leif Erikson"], answer: "Leif Erikson" },
    { id: 195, question: "What is the capital of Bulgaria?", options: ["Plovdiv", "Sofia", "Varna", "Burgas"], answer: "Sofia" },
    { id: 196, question: "Which planet has the most visible rings?", options: ["Jupiter", "Uranus", "Neptune", "Saturn"], answer: "Saturn" },
    { id: 197, question: "What is the chemical symbol for Fluorine?", options: ["F", "Fl", "Fn", "Ff"], answer: "F" },
    { id: 198, question: "Who is the author of 'The Stranger'?", options: ["Jean-Paul Sartre", "Albert Camus", "Simone de Beauvoir", "Maurice Merleau-Ponty"], answer: "Albert Camus" },
    { id: 199, question: "What is 13 × 13?", options: ["156", "165", "169", "176"], answer: "169" },
    { id: 200, question: "Which country is the birthplace of the Olympics?", options: ["Rome", "Egypt", "Greece", "Italy"], answer: "Greece" },
];

// Try to connect to MongoDB, but use mock data if connection fails
let dbConnected = false;
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
.then(() => {
    dbConnected = true;
    console.log("Database connected successfully");
})
.catch((error) => {
    dbConnected = false;
    console.log("Database connection failed, using mock data instead");
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Get total questions count
app.get('/questions/count', async (req, res) => {
    try {
        if (dbConnected) {
            const count = await Quiz.countDocuments();
            res.json({ count });
        } else {
            res.json({ count: mockQuestions.length });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Get sequential questions by count
app.get('/questions', async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 10;
        if (dbConnected) {
            const questions = await Quiz.find().limit(count);
            res.json({ questions });
        } else {
            const questions = mockQuestions.slice(0, count);
            res.json({ questions });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Get random questions by count
app.get('/questions/random', async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 10;
        if (dbConnected) {
            const questions = await Quiz.aggregate([
                { $sample: { size: count } }
            ]);
            res.json({ questions });
        } else {
            // Shuffle mock questions and get random count
            const shuffled = [...mockQuestions].sort(() => Math.random() - 0.5);
            const questions = shuffled.slice(0, count);
            res.json({ questions });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Post method for posting data on database
app.post('/postquestions', async (req, res) => {
    try {
        const newQuestion = new Quiz(req.body);
        const saveQuestions = await newQuestion.save();
        res.status(201).json(saveQuestions);
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
});

app.listen(process.env.PORT, function() {
    console.log(`Server is running on port ${process.env.PORT}`);
})
