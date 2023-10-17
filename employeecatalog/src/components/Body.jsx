import React, {useState, useRef} from "react";
import SortingArrow from "./SortingArrow";

function Body({employees, setEmployees, originalEmployees}) {
  const [activeField, setActiveField] = useState('')

  let sortConfig = useRef({
    'name': 'desc',
    'surname': 'desc',
    'patronymic': 'desc',
    'position': 'desc',
    'salary': 'desc',
    'employment_date': 'desc'
  })

  function setSortConfig(field) {
    Object.keys(sortConfig.current).forEach(key => {
      if (key !== field) {
        sortConfig.current[key] = 'desc'
      }
    })
  }


  const dictionary = {
    1: "Генеральный директор",
    2: "Заместитель генерального директора",
    3: "Начальник подразделения",
    4: "Начальник участка",
    5: "Работник"
  };

  // Функция сортировки в зависимости от выбранного поля
  const handleSort = (field) => {
    setActiveField(field)
    setSortConfig(field)
    const config = sortConfig.current[field]
    let sorted;

    if (field !== 'salary' && field !== 'employment_date') {
      if (config === 'desc') {
        sorted = [...employees].sort((a, b) => {
          if (a[field] < b[field]) return -1;
          if (a[field] > b[field]) return 1;
          return 0
        });
        sortConfig.current[field] = 'asc'
      } else if (config === 'asc') {
        sorted = [...employees].sort((a, b) => {
          if (a[field] > b[field]) return -1;
          if (a[field] < b[field]) return 1;
          return 0;
        });
        sortConfig.current[field] = ''

      } else {
        sorted = [...originalEmployees.current]
        sortConfig.current[field] = 'desc'

      }
      setEmployees(sorted);
    } else {
      if (config === 'desc') {
        if (field === 'salary') {
          sorted = [...employees].sort((a, b) => b[field] - a[field])
          sortConfig.current[field] = 'asc'
        } else {
          sorted = [...employees].sort((a, b) => {
            const dateA = new Date(a.employment_date)
            const dateB = new Date(b.employment_date)
            return dateB - dateA
          })
          sortConfig.current[field] = 'asc'
        }
      } else if (config === 'asc') {
        if (field === 'salary') {
          sorted = [...employees].sort((a, b) => a[field] - b[field])
          sortConfig.current[field] = ''
        } else {
          sorted = [...employees].sort((a, b) => {
            const dateA = new Date(a.employment_date)
            const dateB = new Date(b.employment_date)
            return dateA - dateB
          })
          sortConfig.current[field] = ''
        }
      } else {
        sorted = [...originalEmployees.current]
        sortConfig.current[field] = 'desc'
      }
    }
    setEmployees(sorted)
  }


  return (
    <div className="content__block">
      <table className="table">
        <thead>
        <tr className='fields-name'>
          <th onClick={() => handleSort('surname')}>
            <div>
              Фамилия
              {activeField === 'surname' ? <SortingArrow sortOrder={sortConfig.current['surname']}></SortingArrow>
                : ''}
            </div>
          </th>
          <th onClick={() => handleSort('name')}>
            <div>
              Имя
              {activeField === 'name' ? <SortingArrow sortOrder={sortConfig.current['name']}></SortingArrow>
                : ''}
            </div>
          </th>
          <th onClick={() => handleSort('patronymic')}>
            <div>
              Отчество
              {activeField === 'patronymic' ? <SortingArrow sortOrder={sortConfig.current['patronymic']}></SortingArrow>
                : ''}
            </div>
          </th>
          <th onClick={() => handleSort('position')}>
            <div>
              Должность
              {activeField === 'position' ? <SortingArrow sortOrder={sortConfig.current['position']}></SortingArrow>
                : ''}
            </div>
          </th>
          <th onClick={() => handleSort('salary')}>
            <div>
              Зарплата
              {activeField === 'salary' ? <SortingArrow sortOrder={sortConfig.current['salary']}></SortingArrow>
                : ''}
            </div>
          </th>
          <th onClick={() => handleSort('employment_date')}>
            <div>
              Дата трудоустройства
              {activeField === 'employment_date' ?
                <SortingArrow sortOrder={sortConfig.current['employment_date']}></SortingArrow>
                : ''}
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        {employees.map(item => (
          <tr key={item.id}>
            <td>{item.surname}</td>
            <td>{item.name}</td>
            <td>{item.patronymic}</td>
            <td>{dictionary[item.position]}</td>
            <td>{item.salary}</td>
            <td>{item.employment_date}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Body;