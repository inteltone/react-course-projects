import { v4 as uuidv4 } from 'uuid'

// Значение фильтра «показать всех». Не отдел — поэтому хранится отдельно
// от списка отделов и не попадает в форму добавления.
export const ALL_DEPARTMENTS = 'Все отделы'

export const DEPARTMENTS = [
	'Отдел продаж',
	'Отдел сервиса и запчастей',
	'Отдел маркетинга и клиентского опыта',
]

// Модуль вычисляется один раз при импорте, поэтому uuid здесь
// не пересоздаются на каждом рендере.
export const initialEmployees = [
	{ id: uuidv4(), name: 'Артём Белов', department: DEPARTMENTS[0], position: 'Старший менеджер по продажам' },
	{ id: uuidv4(), name: 'Екатерина Морозова', department: DEPARTMENTS[0], position: 'Менеджер по продажам' },
	{ id: uuidv4(), name: 'Дмитрий Князев', department: DEPARTMENTS[0], position: 'Консультант по трейд-ин и кредитованию' },
	{ id: uuidv4(), name: 'Мария Светлова', department: DEPARTMENTS[1], position: 'Руководитель сервисного центра' },
	{ id: uuidv4(), name: 'Игорь Громов', department: DEPARTMENTS[1], position: 'Мастер-диагност' },
	{ id: uuidv4(), name: 'Анна Тихонова', department: DEPARTMENTS[1], position: 'Специалист по закупке оригинальных запчастей' },
	{ id: uuidv4(), name: 'Виктор Суханов', department: DEPARTMENTS[1], position: 'Автоэлектрик' },
	{ id: uuidv4(), name: 'Ольга Верещагина', department: DEPARTMENTS[2], position: 'Директор по маркетингу' },
	{ id: uuidv4(), name: 'Павел Новиков', department: DEPARTMENTS[2], position: 'SMM-менеджер и контент-креатор' },
	{ id: uuidv4(), name: 'Юлия Романова', department: DEPARTMENTS[2], position: 'Менеджер по работе с VIP-клиентами' },
]
