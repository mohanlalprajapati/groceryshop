# groceryshop
1. Run application using docker-compose file. command  -- docker-compose up --build -d
2. Down application -- docker-compose down

# Seeding data 
1. docker-compose exec web bash
2. python manage.py shell
3. from grocery.models import UnitType
4. UnitType.objects.create(name="KG")
5. UnitType.objects.create(name="Litre")
6. UnitType.objectes.create(name="Unit")
7. exit()
8. exit

# Test Backend
1. docker-compose exec web bash
2. python manage.py test


# Enhancements to be done

1. Delete multiple grocery items at once
2. Mark purchased multiple grocery items at once
3. Export and import funcionality through execl, csv, pdf
4. Sorting and filtering in grocery list and grocery items
5. Put validation class in grocery items.
6. Make it comfortable for mobile view.
7. Right test cases for front end.
