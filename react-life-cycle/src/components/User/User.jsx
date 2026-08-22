import './User.scss'

export default function User({user}) {
  return (
    <ul className="user">
        <li><span>Имя:</span> {user.firstName}</li>
        <li><span>Фамилия:</span> {user.lastName}</li>
        <li><span>E-mail:</span> {user.email}</li>
        <li><span>Пол:</span> {user.gender}</li>
        <li><span>Возраст:</span> {user.age}</li>
        <li><span>Цвет глаз:</span> {user.eyeColor}</li>
        <li><span>Телефон:</span> {user.phone}</li>
    </ul>
  )
}
