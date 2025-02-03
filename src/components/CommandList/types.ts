export const emojiDict = {
	'RECT': '🔲',
	'CIRCLE': '🔴',
	'LINE': '➖',
	'TRIANGLE': '🔺',
	'AREA': '🧹',
	'TEXT': '⌨️',
	'': ''
} as const

export type EmojiKey = keyof typeof emojiDict;
