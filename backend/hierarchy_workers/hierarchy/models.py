from django.db import models
from mptt.models import MPTTModel, TreeForeignKey


class Position(models.Model):
    POSITIONS_LIST = [
        ('Генеральный директор', 'Генеральный директор'),
        ('Заместитель генерального директора', 'Заместитель генерального директора'),
        ('Начальник подразделения', 'Начальник подразделения'),
        ('Начальник участка', 'Начальник участка'),
        ('Работник', 'Работник')
    ]
    position = models.CharField(choices=POSITIONS_LIST, default='5', max_length=100)

    def __str__(self):
        return f'{self.get_position_display()}'


class Employee(MPTTModel):
    parent = TreeForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='children')
    position = models.ForeignKey(Position, on_delete=models.CASCADE, blank=True, null=True)
    salary = models.IntegerField()
    employment_date = models.DateField()
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50)

    class MPTTMeta:
        order_insertion_by = ['name']

    def __str__(self):
        return f'{self.surname} {self.name} {self.patronymic}'
