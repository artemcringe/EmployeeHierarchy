from datetime import timedelta, datetime
import random
from random import choice, randint
from mptt.models import TreeManager

from .models import *


def create_workers():
    pos_list = ['Заместитель генерального директора',
                'Начальник подразделения',
                'Начальник участка',
                'Работник']
    name_list = ['Олег', 'Сергей', 'Арсен', 'Дмитрий', 'Евгений', 'Степан', 'Руслан', 'Дмитрий', 'Александр']
    surname_list = ['Ступницкий', 'Иванов', 'Сидоров', 'Энговатов', 'Рябинин', 'Бодров', 'Кулибин', 'Зарубин']
    patron_list = ['Сергеевич', 'Дмитриевич', 'Арсенович', 'Викторович', 'Саныч', 'Людовикович']
    employees = list(Employee.objects.filter(position=None))

    counter = 0

    for i in range(1000):
        employee = Employee.objects.create(
            name=choice(name_list),
            salary=0,
            employment_date=datetime.now() - timedelta(days=random.randint(0, 365 * 5)),
            surname=choice(surname_list),
            patronymic=choice(patron_list)
        )
        employees.append(employee)

        print(f'{counter} / 1000')
        counter += 1

    counter = 0

    for emp in employees:
        if len(Employee.objects.filter(position=Position.objects.get(position='Заместитель генерального директора'))) \
                >= len(Employee.objects.all()) / 100 * 1:
            if pos_list.count('Заместитель генерального директора') == 1:
                pos_list.remove('Заместитель генерального директора')
            else:
                pass
        if len(Employee.objects.filter(position=Position.objects.get(position='Начальник подразделения'))) \
                >= len(Employee.objects.all()) / 100 * 7:
            if pos_list.count('Начальник подразделения') == 1:
                pos_list.remove('Начальник подразделения')
            else:
                pass
        if len(Employee.objects.filter(position=Position.objects.get(position='Начальник участка'))) \
                >= len(Employee.objects.all()) / 100 * 12:
            if pos_list.count('Начальник участка') == 1:
                pos_list.remove('Начальник участка')
            else:
                pass

        pos_target = Position.objects.get(position=choice(pos_list))

        emp.position = pos_target
        print(f'{counter} / 1000')
        emp.save()
        counter += 1

    for emp in Employee.objects.all():
        if str(emp.position) == 'Работник' and emp.salary == 0:
            emp.salary = 1000
            emp.parent = choice(
                list(Employee.objects.filter(position=Position.objects.get(position='Начальник участка'))))
            emp.save()
            print(f'Для {emp} назначен руководитель {emp.position}')
        if str(emp.position) == 'Начальник участка' and emp.salary == 0:
            emp.salary = 2000
            emp.parent = choice(
                list(Employee.objects.filter(position=Position.objects.get(position='Начальник подразделения'))))
            emp.save()
            print(f'Для {emp} назначен руководитель {emp.position}')
        if str(emp.position) == 'Начальник подразделения' and emp.salary == 0:
            emp.salary = 3000
            emp.parent = choice(
                list(Employee.objects.filter(
                    position=Position.objects.get(position='Заместитель генерального директора'))))
            emp.save()
            print(f'Для {emp} назначен руководитель {emp.position}')
        if str(emp.position) == 'Заместитель генерального директора' and emp.salary == 0:
            emp.salary = 5000
            emp.parent = choice(
                list(Employee.objects.filter(position=Position.objects.get(position='Генеральный директор'))))
            emp.save()
            print(f'Для {emp} назначен руководитель {emp.position}')

    # Сначала добавляем генерального директора в админке и должности, после чего запускаем скрипт. По окончании
    # в shell выполняем команду Employee.objects.rebuild(), чтобы пересобрать связи в бд


def checking():
    TreeManager.rebuild(TreeManager(Employee))
    print('done')