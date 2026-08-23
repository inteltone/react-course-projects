import { useArray } from "./hooks/useArray"
import { useForm } from "./hooks/useForm"
import { useToggle } from "./hooks/useToggle"

const validationRules = {
	name: [
		(value) => value.trim().length < 2 && "Имя должно содержать минимум 2 символа",
	],
	email: [
		(value) => !/^\S+@\S+\.\S+$/.test(value) && "Введите корректный email",
	],
	password: [
		(value) => value.length < 6 && "Пароль должен быть не короче 6 символов",
	],
}

export function App() {
	const { values, errors, handleChange, handleBlur, handleSubmit, reset } = useForm(
		{ name: "", email: "", password: "" },
		validationRules,
	)
	const {
		value: showPassword,
		toggle: toggleShowPassword,
		setFalse: hidePassword,
	} = useToggle(false)
	const { array: users, push, remove, clear, sort } = useArray([])

	const handleRegister = (formValues) => {
		push({
			id: Date.now(),
			name: formValues.name.trim(),
			email: formValues.email,
		})
		reset()
		hidePassword()
	}

	return (
		<div className="app">
			<header className="app__header">
				<div>
					<p className="app__title">Регистрация пользователей</p>
					<p className="app__subtitle">
						Кастомные хуки: <code>useForm</code>, <code>useToggle</code>,{" "}
						<code>useArray</code>
					</p>
				</div>
			</header>

			<div className="app__main">
				<div className="card">
					<p className="card__title">Форма регистрации</p>

					<form className="form" onSubmit={handleSubmit(handleRegister)} noValidate>
						<div className="field">
							<label className="field__label" htmlFor="name">
								Имя
							</label>
							<input
								className={`field__input ${errors.name ? "field__input--error" : ""}`}
								id="name"
								name="name"
								type="text"
								placeholder="Иван"
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.name && <span className="field__error">{errors.name}</span>}
						</div>

						<div className="field">
							<label className="field__label" htmlFor="email">
								Email
							</label>
							<input
								className={`field__input ${errors.email ? "field__input--error" : ""}`}
								id="email"
								name="email"
								type="email"
								placeholder="ivan@example.com"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.email && <span className="field__error">{errors.email}</span>}
						</div>

						<div className="field">
							<label className="field__label" htmlFor="password">
								Пароль
							</label>
							<div className="password-field">
								<input
									className={`field__input ${
										errors.password ? "field__input--error" : ""
									}`}
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Минимум 6 символов"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<button
									type="button"
									className="password-field__toggle"
									onClick={toggleShowPassword}
								>
									{showPassword ? "Скрыть" : "Показать"}
								</button>
							</div>
							{errors.password && (
								<span className="field__error">{errors.password}</span>
							)}
						</div>

						<button className="button" type="submit">
							Зарегистрироваться
						</button>
					</form>
				</div>

				<div className="card">
					<p className="card__title">
						Зарегистрированные пользователи ({users.length})
					</p>

					{users.length === 0 ? (
						<p className="empty">Пока никто не зарегистрирован</p>
					) : (
						<ul className="user-list">
							{users.map((user, index) => (
								<li className="user-list__item" key={user.id}>
									<div className="user-list__info">
										<p className="user-list__name">{user.name}</p>
										<p className="user-list__email">{user.email}</p>
									</div>
									<button
										className="button button--small button--ghost"
										onClick={() => remove(index)}
									>
										Удалить
									</button>
								</li>
							))}
						</ul>
					)}

					{users.length > 1 && (
						<div className="card__actions">
							<button
								className="button button--small"
								onClick={() => sort((a, b) => a.name.localeCompare(b.name, "ru"))}
							>
								Сортировать по имени
							</button>
							<button
								className="button button--small button--ghost"
								onClick={clear}
							>
								Очистить список
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
