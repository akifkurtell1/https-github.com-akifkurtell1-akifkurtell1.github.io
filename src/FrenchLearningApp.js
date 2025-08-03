import React, { useState, useEffect } from 'react';
import { Play, Volume2, RotateCcw, Trophy, BookOpen, Target, CheckCircle, XCircle, Star, BarChart3, Grid, List, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';

const FrenchLearningApp = () => {
  const [currentLevel, setCurrentLevel] = useState('A1');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testWords, setTestWords] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Kategorize edilmiş kelime listeleri
  const wordCategories = {
    A1: {
      'Günlük Selamlaşma': [
        { french: 'bonjour', turkish: 'merhaba', pronunciation: 'bon-ZHOOR' },
        { french: 'bonsoir', turkish: 'iyi akşamlar', pronunciation: 'bon-SWAHR' },
        { french: 'salut', turkish: 'selam', pronunciation: 'sa-LÜ' },
        { french: 'au revoir', turkish: 'hoşça kal', pronunciation: 'oh ruh-VWAR' },
        { french: 'à bientôt', turkish: 'görüşürüz', pronunciation: 'ah bee-an-TOH' },
        { french: 'bonne nuit', turkish: 'iyi geceler', pronunciation: 'bun NWEE' }
      ],
      'Temel Kelimeler': [
        { french: 'oui', turkish: 'evet', pronunciation: 'WEE' },
        { french: 'non', turkish: 'hayır', pronunciation: 'NOH' },
        { french: 'merci', turkish: 'teşekkür ederim', pronunciation: 'mer-SEE' },
        { french: 'pardon', turkish: 'özür dilerim', pronunciation: 'par-DON' },
        { french: 's\'il vous plaît', turkish: 'lütfen', pronunciation: 'seel voo PLEH' },
        { french: 'excusez-moi', turkish: 'affedersiniz', pronunciation: 'eks-kü-zeh MWAH' }
      ],
      'Yemek ve İçecek': [
        { french: 'eau', turkish: 'su', pronunciation: 'OH' },
        { french: 'pain', turkish: 'ekmek', pronunciation: 'PAN' },
        { french: 'lait', turkish: 'süt', pronunciation: 'LEH' },
        { french: 'café', turkish: 'kahve', pronunciation: 'ka-FEH' },
        { french: 'thé', turkish: 'çay', pronunciation: 'TEH' },
        { french: 'vin', turkish: 'şarap', pronunciation: 'VAN' },
        { french: 'fromage', turkish: 'peynir', pronunciation: 'fro-MAHZH' },
        { french: 'viande', turkish: 'et', pronunciation: 'vee-YAHND' }
      ],
      'Aile': [
        { french: 'mère', turkish: 'anne', pronunciation: 'MEHR' },
        { french: 'père', turkish: 'baba', pronunciation: 'PEHR' },
        { french: 'fils', turkish: 'oğul', pronunciation: 'FEES' },
        { french: 'fille', turkish: 'kız', pronunciation: 'FEE' },
        { french: 'frère', turkish: 'erkek kardeş', pronunciation: 'FREHR' },
        { french: 'sœur', turkish: 'kız kardeş', pronunciation: 'SÖR' },
        { french: 'grand-mère', turkish: 'büyükanne', pronunciation: 'grahn-MEHR' },
        { french: 'grand-père', turkish: 'büyükbaba', pronunciation: 'grahn-PEHR' }
      ],
      'Hayvanlar': [
        { french: 'chat', turkish: 'kedi', pronunciation: 'SHAH' },
        { french: 'chien', turkish: 'köpek', pronunciation: 'SHYEN' },
        { french: 'oiseau', turkish: 'kuş', pronunciation: 'wah-ZOH' },
        { french: 'poisson', turkish: 'balık', pronunciation: 'pwah-SON' },
        { french: 'cheval', turkish: 'at', pronunciation: 'shuh-VAL' },
        { french: 'vache', turkish: 'inek', pronunciation: 'VAHSH' }
      ]
    },
    A2: {
      'Yerler': [
        { french: 'maison', turkish: 'ev', pronunciation: 'meh-ZON' },
        { french: 'école', turkish: 'okul', pronunciation: 'eh-KOL' },
        { french: 'hôpital', turkish: 'hastane', pronunciation: 'oh-pee-TAL' },
        { french: 'bibliothèque', turkish: 'kütüphane', pronunciation: 'bee-blee-oh-TEHK' },
        { french: 'restaurant', turkish: 'restoran', pronunciation: 'res-toh-RAN' },
        { french: 'magasin', turkish: 'mağaza', pronunciation: 'ma-ga-ZAN' },
        { french: 'banque', turkish: 'banka', pronunciation: 'BAHNK' },
        { french: 'pharmacie', turkish: 'eczane', pronunciation: 'far-ma-SEE' }
      ],
      'Meslekler': [
        { french: 'médecin', turkish: 'doktor', pronunciation: 'mehd-SAN' },
        { french: 'professeur', turkish: 'öğretmen', pronunciation: 'pro-feh-SÖR' },
        { french: 'infirmière', turkish: 'hemşire', pronunciation: 'an-feer-mee-YEHR' },
        { french: 'ingénieur', turkish: 'mühendis', pronunciation: 'an-zheh-nee-ÖR' },
        { french: 'avocat', turkish: 'avukat', pronunciation: 'av-oh-KAH' },
        { french: 'cuisinier', turkish: 'aşçı', pronunciation: 'kwee-zee-nee-YEH' },
        { french: 'vendeur', turkish: 'satıcı', pronunciation: 'vahn-DÖR' }
      ],
      'Ulaşım': [
        { french: 'voiture', turkish: 'araba', pronunciation: 'vwa-TÜR' },
        { french: 'bus', turkish: 'otobüs', pronunciation: 'BÜS' },
        { french: 'train', turkish: 'tren', pronunciation: 'TRAN' },
        { french: 'avion', turkish: 'uçak', pronunciation: 'av-ee-YON' },
        { french: 'vélo', turkish: 'bisiklet', pronunciation: 'veh-LOH' },
        { french: 'métro', turkish: 'metro', pronunciation: 'meh-TROH' },
        { french: 'taxi', turkish: 'taksi', pronunciation: 'tak-SEE' }
      ],
      'Zaman': [
        { french: 'aujourd\'hui', turkish: 'bugün', pronunciation: 'oh-zhoor-DWEE' },
        { french: 'hier', turkish: 'dün', pronunciation: 'ee-YEHR' },
        { french: 'demain', turkish: 'yarın', pronunciation: 'duh-MAN' },
        { french: 'semaine', turkish: 'hafta', pronunciation: 'suh-MEHN' },
        { french: 'mois', turkish: 'ay', pronunciation: 'MWAH' },
        { french: 'année', turkish: 'yıl', pronunciation: 'an-NEH' },
        { french: 'heure', turkish: 'saat', pronunciation: 'ÖR' },
        { french: 'minute', turkish: 'dakika', pronunciation: 'mee-NÜT' }
      ],
      'Teknoloji': [
        { french: 'ordinateur', turkish: 'bilgisayar', pronunciation: 'or-dee-na-TÖR' },
        { french: 'téléphone', turkish: 'telefon', pronunciation: 'teh-leh-FON' },
        { french: 'internet', turkish: 'internet', pronunciation: 'an-ter-NET' },
        { french: 'email', turkish: 'e-posta', pronunciation: 'ee-MEHL' },
        { french: 'télévision', turkish: 'televizyon', pronunciation: 'teh-leh-vee-see-YON' },
        { french: 'radio', turkish: 'radyo', pronunciation: 'ra-dee-OH' }
      ]
    },
    B1: {
      'İş ve Kariyer': [
        { french: 'entreprise', turkish: 'şirket', pronunciation: 'ahn-truh-PREEZ' },
        { french: 'bureau', turkish: 'ofis', pronunciation: 'bü-ROH' },
        { french: 'réunion', turkish: 'toplantı', pronunciation: 'reh-ü-nee-YON' },
        { french: 'projet', turkish: 'proje', pronunciation: 'pro-ZHEH' },
        { french: 'équipe', turkish: 'takım', pronunciation: 'eh-KEEP' },
        { french: 'client', turkish: 'müşteri', pronunciation: 'klee-YAHN' },
        { french: 'contrat', turkish: 'sözleşme', pronunciation: 'kon-TRAH' },
        { french: 'salaire', turkish: 'maaş', pronunciation: 'sa-LEHR' }
      ],
      'Eğitim': [
        { french: 'université', turkish: 'üniversite', pronunciation: 'ü-nee-ver-see-TEH' },
        { french: 'étudiant', turkish: 'öğrenci', pronunciation: 'eh-tü-DYAN' },
        { french: 'cours', turkish: 'ders', pronunciation: 'KOOR' },
        { french: 'examen', turkish: 'sınav', pronunciation: 'eg-za-MAN' },
        { french: 'diplôme', turkish: 'diploma', pronunciation: 'dee-PLOHM' },
        { french: 'recherche', turkish: 'araştırma', pronunciation: 'ruh-SHERSH' },
        { french: 'connaissance', turkish: 'bilgi', pronunciation: 'ko-neh-SANS' },
        { french: 'apprentissage', turkish: 'öğrenme', pronunciation: 'a-pran-tee-SAHZH' }
      ],
      'Sağlık': [
        { french: 'santé', turkish: 'sağlık', pronunciation: 'sahn-TEH' },
        { french: 'maladie', turkish: 'hastalık', pronunciation: 'ma-la-DEE' },
        { french: 'médicament', turkish: 'ilaç', pronunciation: 'meh-dee-ka-MAHN' },
        { french: 'douleur', turkish: 'ağrı', pronunciation: 'doo-LÖR' },
        { french: 'fatigue', turkish: 'yorgunluk', pronunciation: 'fa-TEEG' },
        { french: 'fièvre', turkish: 'ateş', pronunciation: 'fee-YEVR' },
        { french: 'traitement', turkish: 'tedavi', pronunciation: 'treh-tuh-MAHN' }
      ],
      'Toplum': [
        { french: 'société', turkish: 'toplum', pronunciation: 'so-see-eh-TEH' },
        { french: 'culture', turkish: 'kültür', pronunciation: 'kül-TÜR' },
        { french: 'tradition', turkish: 'gelenek', pronunciation: 'tra-dee-see-YON' },
        { french: 'communauté', turkish: 'topluluk', pronunciation: 'ko-mü-noh-TEH' },
        { french: 'citoyen', turkish: 'vatandaş', pronunciation: 'see-twa-YAN' },
        { french: 'démocratie', turkish: 'demokrasi', pronunciation: 'deh-mo-kra-SEE' },
        { french: 'liberté', turkish: 'özgürlük', pronunciation: 'lee-ber-TEH' }
      ],
      'Çevre': [
        { french: 'environnement', turkish: 'çevre', pronunciation: 'an-vee-ron-MAN' },
        { french: 'nature', turkish: 'doğa', pronunciation: 'na-TÜR' },
        { french: 'pollution', turkish: 'kirlilik', pronunciation: 'po-lü-see-YON' },
        { french: 'recyclage', turkish: 'geri dönüşüm', pronunciation: 'ruh-see-KLAHZH' },
        { french: 'énergie', turkish: 'enerji', pronunciation: 'eh-ner-ZHEE' },
        { french: 'climat', turkish: 'iklim', pronunciation: 'klee-MAH' }
      ]
    },
    B2: {
      'Ekonomi': [
        { french: 'économie', turkish: 'ekonomi', pronunciation: 'eh-ko-no-MEE' },
        { french: 'marché', turkish: 'pazar', pronunciation: 'mar-SHEH' },
        { french: 'investissement', turkish: 'yatırım', pronunciation: 'an-ves-tees-MAN' },
        { french: 'bénéfice', turkish: 'kar', pronunciation: 'beh-neh-FEES' },
        { french: 'croissance', turkish: 'büyüme', pronunciation: 'krwa-SAHNS' },
        { french: 'concurrence', turkish: 'rekabet', pronunciation: 'kon-kü-RAHNS' },
        { french: 'inflation', turkish: 'enflasyon', pronunciation: 'an-fla-see-YON' },
        { french: 'consommation', turkish: 'tüketim', pronunciation: 'kon-so-ma-see-YON' }
      ],
      'Politik': [
        { french: 'gouvernement', turkish: 'hükümet', pronunciation: 'goo-ver-nuh-MAN' },
        { french: 'politique', turkish: 'politika', pronunciation: 'po-lee-TEEK' },
        { french: 'élection', turkish: 'seçim', pronunciation: 'eh-lek-see-YON' },
        { french: 'parlement', turkish: 'parlamento', pronunciation: 'par-luh-MAN' },
        { french: 'président', turkish: 'başkan', pronunciation: 'preh-zee-DAHN' },
        { french: 'ministre', turkish: 'bakan', pronunciation: 'mee-NEESTR' },
        { french: 'loi', turkish: 'kanun', pronunciation: 'LWAH' },
        { french: 'réforme', turkish: 'reform', pronunciation: 'reh-FORM' }
      ],
      'Psikoloji': [
        { french: 'comportement', turkish: 'davranış', pronunciation: 'kom-por-tuh-MAN' },
        { french: 'personnalité', turkish: 'kişilik', pronunciation: 'per-so-na-lee-TEH' },
        { french: 'émotion', turkish: 'duygu', pronunciation: 'eh-mo-see-YON' },
        { french: 'motivation', turkish: 'motivasyon', pronunciation: 'mo-tee-va-see-YON' },
        { french: 'créativité', turkish: 'yaratıcılık', pronunciation: 'kreh-a-tee-vee-TEH' },
        { french: 'intelligence', turkish: 'zeka', pronunciation: 'an-tel-lee-ZHAHNS' },
        { french: 'conscience', turkish: 'bilinç', pronunciation: 'kon-see-YAHNS' }
      ],
      'Teknoloji İleri': [
        { french: 'innovation', turkish: 'yenilik', pronunciation: 'ee-no-va-see-YON' },
        { french: 'développement', turkish: 'geliştirme', pronunciation: 'deh-ve-lop-MAN' },
        { french: 'numérique', turkish: 'dijital', pronunciation: 'nü-meh-REEK' },
        { french: 'algorithme', turkish: 'algoritma', pronunciation: 'al-go-REETM' },
        { french: 'intelligence artificielle', turkish: 'yapay zeka', pronunciation: 'an-tel-lee-zhahns ar-tee-fee-see-YEL' },
        { french: 'robotique', turkish: 'robotik', pronunciation: 'ro-bo-TEEK' },
        { french: 'réseau', turkish: 'ağ', pronunciation: 'reh-ZOH' }
      ],
      'Felsefe': [
        { french: 'existence', turkish: 'varoluş', pronunciation: 'eg-zees-TAHNS' },
        { french: 'vérité', turkish: 'gerçek', pronunciation: 'veh-ree-TEH' },
        { french: 'sagesse', turkish: 'bilgelik', pronunciation: 'sa-ZHES' },
        { french: 'conscience', turkish: 'vicdan', pronunciation: 'kon-see-YAHNS' },
        { french: 'morale', turkish: 'ahlak', pronunciation: 'mo-RAL' },
        { french: 'justice', turkish: 'adalet', pronunciation: 'zhüs-TEES' },
        { french: 'beauté', turkish: 'güzellik', pronunciation: 'boh-TEH' }
      ]
    }
  };

  // Progress tracking
  const [progress, setProgress] = useState(() => {
    const initialProgress = {};
    Object.keys(wordCategories).forEach(level => {
      initialProgress[level] = {};
      Object.keys(wordCategories[level]).forEach(category => {
        initialProgress[level][category] = {
          learned: 0,
          total: wordCategories[level][category].length
        };
      });
    });
    return initialProgress;
  });

  const getTotalProgress = (level) => {
    const categories = Object.values(progress[level] || {});
    const totalLearned = categories.reduce((sum, cat) => sum + cat.learned, 0);
    const totalWords = categories.reduce((sum, cat) => sum + cat.total, 0);
    return { learned: totalLearned, total: totalWords };
  };

  const startTest = () => {
    const allWords = [];
    Object.values(wordCategories[currentLevel]).forEach(categoryWords => {
      allWords.push(...categoryWords);
    });
    const shuffled = [...allWords].sort(() => Math.random() - 0.5).slice(0, 10);
    setTestWords(shuffled);
    setCurrentTestIndex(0);
    setTestScore(0);
    setTestMode(true);
    setCurrentScreen('test');
    setShowResult(false);
    setUserAnswer('');
  };

  const submitAnswer = () => {
    const correct = userAnswer.toLowerCase().trim() === testWords[currentTestIndex].turkish.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setTestScore(testScore + 1);
    }
  };

  const nextQuestion = () => {
    if (currentTestIndex < testWords.length - 1) {
      setCurrentTestIndex(currentTestIndex + 1);
      setUserAnswer('');
      setShowResult(false);
    } else {
      setTestMode(false);
      setCurrentScreen('results');
    }
  };

  const playPronunciation = (word) => {
    console.log(`Telaffuz: ${word.pronunciation}`);
  };

  const markAsLearned = (level, category, wordIndex) => {
    setProgress(prev => ({
      ...prev,
      [level]: {
        ...prev[level],
        [category]: {
          ...prev[level][category],
          learned: Math.min(prev[level][category].learned + 1, prev[level][category].total)
        }
      }
    }));
  };

  const nextCard = () => {
    const categoryWords = wordCategories[currentLevel][selectedCategory];
    if (currentCardIndex < categoryWords.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const LevelCard = ({ level }) => {
    const levelProgress = getTotalProgress(level);
    const percentage = levelProgress.total > 0 ? (levelProgress.learned / levelProgress.total) * 100 : 0;
    const categories = Object.keys(wordCategories[level]);
    
    return (
      <div 
        className={`p-6 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
          currentLevel === level 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
            : 'bg-white border-2 border-gray-200 hover:border-blue-300'
        }`}
        onClick={() => setCurrentLevel(level)}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{level}</h3>
          <div className="flex items-center space-x-1">
            <Star className={`w-5 h-5 ${percentage === 100 ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
            <span className="text-sm">{levelProgress.learned}/{levelProgress.total}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              currentLevel === level ? 'bg-white' : 'bg-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className={`text-sm mb-3 ${currentLevel === level ? 'text-blue-100' : 'text-gray-600'}`}>
          %{Math.round(percentage)} tamamlandı
        </p>
        <div className={`text-xs ${currentLevel === level ? 'text-blue-100' : 'text-gray-500'}`}>
          {categories.length} kategori
        </div>
      </div>
    );
  };

  const CategoryCard = ({ category, categoryData, level }) => {
    const categoryProgress = progress[level][category];
    const percentage = categoryProgress.total > 0 ? (categoryProgress.learned / categoryProgress.total) * 100 : 0;
    
    return (
      <div 
        className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-blue-300 transition-all cursor-pointer transform hover:scale-105"
        onClick={() => {
          setSelectedCategory(category);
          setCurrentCardIndex(0);
          setShowAnswer(false);
          setCurrentScreen('cards');
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">{category}</h3>
          <span className="text-sm text-gray-600">
            {categoryProgress.learned}/{categoryProgress.total}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {categoryData.length} kelime
          </span>
          <span className="text-sm font-medium text-blue-600">
            %{Math.round(percentage)}
          </span>
        </div>
      </div>
    );
  };

  const FlashCard = ({ word, isFlipped, onFlip }) => (
    <div className="relative w-full h-80 perspective-1000">
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Ön yüz */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex flex-col items-center justify-center text-white p-8">
          <h2 className="text-4xl font-bold mb-4">{word.french}</h2>
          <button 
            onClick={() => playPronunciation(word)}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors mb-6"
          >
            <Volume2 className="w-6 h-6" />
          </button>
          <p className="text-blue-100 text-center mb-6">
            [{word.pronunciation}]
          </p>
          <button 
            onClick={onFlip}
            className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Cevabı Göster</span>
          </button>
        </div>
        
        {/* Arka yüz */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg flex flex-col items-center justify-center text-white p-8">
          <h2 className="text-3xl font-bold mb-6">{word.turkish}</h2>
          <p className="text-green-100 text-lg mb-8 text-center">
            {word.french}
          </p>
          <button 
            onClick={onFlip}
            className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <EyeOff className="w-4 h-4" />
            <span>Soruyu Göster</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🇫🇷 Fransızca Öğrenme</h1>
          <p className="text-gray-600">Kategorize edilmiş kelimelerle seviye seviye öğrenin</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button 
            onClick={() => setCurrentScreen('home')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              currentScreen === 'home' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kategoriler</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('progress')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              currentScreen === 'progress' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>İlerleme</span>
          </button>
          <button 
            onClick={startTest}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            <Target className="w-4 h-4" />
            <span>Test</span>
          </button>
        </div>

        {/* Home Screen */}
        {currentScreen === 'home' && (
          <div>
            {/* Level Selection */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {Object.keys(wordCategories).map((level) => (
                <LevelCard key={level} level={level} />
              ))}
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {currentLevel} Seviyesi Kategoriler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(wordCategories[currentLevel]).map(([category, words]) => (
                  <CategoryCard 
                    key={category} 
                    category={category} 
                    categoryData={words} 
                    level={currentLevel} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cards Screen */}
        {currentScreen === 'cards' && selectedCategory && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setCurrentScreen('home')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Geri</span>
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedCategory}
                </h2>
                <span className="text-sm text-gray-600">
                  {currentCardIndex + 1} / {wordCategories[currentLevel][selectedCategory].length}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentCardIndex + 1) / wordCategories[currentLevel][selectedCategory].length) * 100}%` }}
                ></div>
              </div>

              <FlashCard 
                word={wordCategories[currentLevel][selectedCategory][currentCardIndex]}
                isFlipped={showAnswer}
                onFlip={() => setShowAnswer(!showAnswer)}
              />

              <div className="flex items-center justify-between mt-6">
                <button 
                  onClick={prevCard}
                  disabled={currentCardIndex === 0}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Önceki</span>
                </button>

                <button 
                  onClick={() => markAsLearned(currentLevel, selectedCategory, currentCardIndex)}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Öğrendim</span>
                </button>

                <button 
                  onClick={nextCard}
                  disabled={currentCardIndex === wordCategories[currentLevel][selectedCategory].length - 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Sonraki</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Screen */}
        {currentScreen === 'progress' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>İlerleme Durumunuz</span>
            </h2>
            <div className="space-y-6">
              {Object.entries(progress).map(([level, categories]) => {
                const levelProgress = getTotalProgress(level);
                const percentage = levelProgress.total > 0 ? (levelProgress.learned / levelProgress.total) * 100 : 0;
                return (
                  <div key={level} className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{level} Seviyesi</h3>
                      <span className="text-lg font-medium text-blue-600">
                        {levelProgress.learned}/{levelProgress.total} kelime
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(categories).map(([category, categoryProgress]) => {
                        const catPercentage = categoryProgress.total > 0 ? (categoryProgress.learned / categoryProgress.total) * 100 : 0;
                        return (
                          <div key={category} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-700">{category}</h4>
                              <span className="text-sm text-gray-600">
                                {categoryProgress.learned}/{categoryProgress.total}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${catPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Test Screen */}
        {currentScreen === 'test' && testMode && (
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentLevel} Seviyesi Test
                </h2>
                <span className="text-gray-600">
                  {currentTestIndex + 1} / {testWords.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentTestIndex + 1) / testWords.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {testWords[currentTestIndex] && (
              <div className="text-center">
                <div className="mb-8">
                  <h3 className="text-4xl font-bold text-blue-600 mb-4">
                    {testWords[currentTestIndex].french}
                  </h3>
                  <button 
                    onClick={() => playPronunciation(testWords[currentTestIndex])}
                    className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    <Volume2 className="w-6 h-6 text-blue-600" />
                  </button>
                </div>

                {!showResult ? (
                  <div>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Türkçe karşılığını yazın..."
                      className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                    />
                    <button 
                      onClick={submitAnswer}
                      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Cevapla
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className={`p-6 rounded-lg mb-4 ${
                      isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'
                    }`}>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                        <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? 'Doğru!' : 'Yanlış!'}
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Doğru cevap: <strong>{testWords[currentTestIndex].turkish}</strong>
                      </p>
                    </div>
                    <button 
                      onClick={nextQuestion}
                      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      {currentTestIndex < testWords.length - 1 ? 'Sonraki Soru' : 'Testi Bitir'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Test Results */}
        {currentScreen === 'results' && (
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Tamamlandı!</h2>
              <p className="text-xl text-gray-600">
                {testWords.length} sorudan {testScore} tanesini doğru yanıtladınız
              </p>
            </div>
            
            <div className="mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                %{Math.round((testScore / testWords.length) * 100)}
              </div>
              <p className="text-gray-600">Başarı oranınız</p>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={startTest}
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tekrar Test</span>
              </button>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Ana Sayfa
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default FrenchLearningApp;