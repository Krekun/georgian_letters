// 33 Georgian Mkhedruli characters
export const CHARACTERS = [
  // Lesson 1: ა ბ გ დ ე
  { character: 'ა', romanization: 'a', type: 'vowel',     lesson: 1, order: 1 },
  { character: 'ბ', romanization: 'b', type: 'consonant', lesson: 1, order: 2 },
  { character: 'გ', romanization: 'g', type: 'consonant', lesson: 1, order: 3 },
  { character: 'დ', romanization: 'd', type: 'consonant', lesson: 1, order: 4 },
  { character: 'ე', romanization: 'e', type: 'vowel',     lesson: 1, order: 5 },

  // Lesson 2: ვ ზ თ ი კ
  { character: 'ვ', romanization: 'v',  type: 'consonant', lesson: 2, order: 1 },
  { character: 'ზ', romanization: 'z',  type: 'consonant', lesson: 2, order: 2 },
  { character: 'თ', romanization: 't',  type: 'consonant', lesson: 2, order: 3 },
  { character: 'ი', romanization: 'i',  type: 'vowel',     lesson: 2, order: 4 },
  { character: 'კ', romanization: 'k',  type: 'consonant', lesson: 2, order: 5 },

  // Lesson 3: ლ მ ნ ო პ
  { character: 'ლ', romanization: 'l', type: 'consonant', lesson: 3, order: 1 },
  { character: 'მ', romanization: 'm', type: 'consonant', lesson: 3, order: 2 },
  { character: 'ნ', romanization: 'n', type: 'consonant', lesson: 3, order: 3 },
  { character: 'ო', romanization: 'o', type: 'vowel',     lesson: 3, order: 4 },
  { character: 'პ', romanization: 'p', type: 'consonant', lesson: 3, order: 5 },

  // Lesson 4: ჟ რ ს ტ უ
  { character: 'ჟ', romanization: 'zh', type: 'consonant', lesson: 4, order: 1 },
  { character: 'რ', romanization: 'r',  type: 'consonant', lesson: 4, order: 2 },
  { character: 'ს', romanization: 's',  type: 'consonant', lesson: 4, order: 3 },
  { character: 'ტ', romanization: "t'", type: 'consonant', lesson: 4, order: 4 },
  { character: 'უ', romanization: 'u',  type: 'vowel',     lesson: 4, order: 5 },

  // Lesson 5: ფ ქ ღ ყ შ
  { character: 'ფ', romanization: "p'", type: 'consonant', lesson: 5, order: 1 },
  { character: 'ქ', romanization: "k'", type: 'consonant', lesson: 5, order: 2 },
  { character: 'ღ', romanization: 'gh', type: 'consonant', lesson: 5, order: 3 },
  { character: 'ყ', romanization: 'q',  type: 'consonant', lesson: 5, order: 4 },
  { character: 'შ', romanization: 'sh', type: 'consonant', lesson: 5, order: 5 },

  // Lesson 6: ჩ ც ძ წ ჭ
  { character: 'ჩ', romanization: 'ch',  type: 'consonant', lesson: 6, order: 1 },
  { character: 'ც', romanization: 'ts',  type: 'consonant', lesson: 6, order: 2 },
  { character: 'ძ', romanization: 'dz',  type: 'consonant', lesson: 6, order: 3 },
  { character: 'წ', romanization: "ts'", type: 'consonant', lesson: 6, order: 4 },
  { character: 'ჭ', romanization: "ch'", type: 'consonant', lesson: 6, order: 5 },

  // Lesson 7: ხ ჯ ჰ
  { character: 'ხ', romanization: 'kh', type: 'consonant', lesson: 7, order: 1 },
  { character: 'ჯ', romanization: 'j',  type: 'consonant', lesson: 7, order: 2 },
  { character: 'ჰ', romanization: 'h',  type: 'consonant', lesson: 7, order: 3 },
]

// Lesson 8 = all 33 chars shuffled (generated at runtime)
export function getLesson8Chars() {
  return [...CHARACTERS].sort(() => Math.random() - 0.5)
}

export function getCharsForLesson(lessonId) {
  if (lessonId === 8) return getLesson8Chars()
  return CHARACTERS.filter(c => c.lesson === lessonId).sort((a, b) => a.order - b.order)
}

export const LESSON_META = [
  { id: 0, title: 'イントロ',   subtitle: '旅行フレーズを見てみよう', type: 'intro' },
  { id: 1, title: 'レッスン 1', subtitle: 'ა ბ გ დ ე',              type: 'lesson' },
  { id: 2, title: 'レッスン 2', subtitle: 'ვ ზ თ ი კ',              type: 'lesson' },
  { id: 3, title: 'レッスン 3', subtitle: 'ლ მ ნ ო პ',              type: 'lesson' },
  { id: 4, title: 'レッスン 4', subtitle: 'ჟ რ ს ტ უ',              type: 'lesson' },
  { id: 5, title: 'レッスン 5', subtitle: 'ფ ქ ღ ყ შ',              type: 'lesson' },
  { id: 6, title: 'レッスン 6', subtitle: 'ჩ ც ძ წ ჭ',              type: 'lesson' },
  { id: 7, title: 'レッスン 7', subtitle: 'ხ ჯ ჰ',                  type: 'lesson' },
  { id: 8, title: '総復習',     subtitle: '全33文字シャッフル',       type: 'lesson' },
  { id: 9, title: 'フィナーレ', subtitle: '旅行フレーズを読もう！',   type: 'finale' },
]
