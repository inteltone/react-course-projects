// Композиция HOC: compose(withA, withB, withC)(Component)
// применяет обёртки справа налево.
export function compose(...fns) {
	return (component) => fns.reduceRight((acc, fn) => fn(acc), component)
}
