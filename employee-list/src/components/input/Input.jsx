import './input.scss'

// Тонкая обёртка над <input>: все переданные атрибуты пробрасываются как есть.
export default function Input({ className = 'form-add-input', ...rest }) {
	return <input className={className} {...rest} />
}
