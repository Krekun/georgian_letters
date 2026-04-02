// Travel vocabulary for Intro (lesson 0) and Finale (lesson 9)
export const VOCABULARY = [
  // Greetings
  { georgian: 'გამარჯობა', romanization: 'gamarjoba',  japanese: 'こんにちは',    category: 'greeting' },
  { georgian: 'მადლობა',   romanization: 'madloba',    japanese: 'ありがとう',    category: 'greeting' },
  { georgian: 'დიახ',      romanization: 'diakh',      japanese: 'はい',          category: 'greeting' },
  { georgian: 'არა',       romanization: 'ara',        japanese: 'いいえ',        category: 'greeting' },
  { georgian: 'ნახვამდის', romanization: 'nakhvamdis', japanese: 'さようなら',    category: 'greeting' },
  { georgian: 'გთხოვთ',   romanization: 'gtkhovt',    japanese: 'お願いします',  category: 'greeting' },

  // Places
  { georgian: 'თბილისი',    romanization: 'tbilisi',   japanese: 'トビリシ',          category: 'place' },
  { georgian: 'საქართველო', romanization: 'sakartvelo', japanese: 'ジョージア（国名）', category: 'place' },
  { georgian: 'კახეთი',     romanization: 'kakheti',   japanese: 'カヘティ（ワイン産地）', category: 'place' },
  { georgian: 'მცხეთა',    romanization: 'mtskheta',  japanese: 'ムツヘタ（世界遺産）', category: 'place' },
  { georgian: 'ბათუმი',    romanization: 'batumi',    japanese: 'バトゥミ',          category: 'place' },

  // Food & drinks
  { georgian: 'ხინკალი',  romanization: 'khinkali',   japanese: 'ヒンカリ（小籠包的な料理）', category: 'food' },
  { georgian: 'ხაჭაპური', romanization: 'khachapuri', japanese: 'ハチャプリ（チーズパン）',   category: 'food' },
  { georgian: 'ღვინო',    romanization: 'ghvino',     japanese: 'ワイン',   category: 'food' },
  { georgian: 'ლუდი',     romanization: 'ludi',       japanese: 'ビール',   category: 'food' },
  { georgian: 'წყალი',    romanization: "ts'qali",    japanese: '水',       category: 'food' },
  { georgian: 'პური',     romanization: 'puri',       japanese: 'パン',     category: 'food' },

  // Useful travel words
  { georgian: 'მეტრო',     romanization: 'metro',     japanese: 'メトロ',       category: 'useful' },
  { georgian: 'აფთიაქი',  romanization: 'aptiaki',   japanese: '薬局',         category: 'useful' },
  { georgian: 'სასტუმრო', romanization: 'sastumro',  japanese: 'ホテル',       category: 'useful' },
  { georgian: 'რესტორანი', romanization: 'restorani', japanese: 'レストラン',   category: 'useful' },
  { georgian: 'ბაზარი',   romanization: 'bazari',    japanese: 'バザール/市場', category: 'useful' },
]

export const CATEGORY_LABELS = {
  greeting: 'あいさつ',
  place:    '地名',
  food:     '食べ物・ワイン',
  useful:   '旅行で便利',
}

export const CATEGORY_ORDER = ['greeting', 'place', 'food', 'useful']
