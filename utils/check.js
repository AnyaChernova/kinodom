export default {
	isBrowser: typeof window !== 'undefined' && typeof window.document !== 'undefined',
	isNode: typeof process !== 'undefined' && process.versions != null && process.versions.node != null,
}
