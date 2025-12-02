
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from library.models import Book

class Command(BaseCommand):
    help = 'Create sample data (user + books)'
    def handle(self, *args, **options):
        if not User.objects.filter(username='student').exists():
            User.objects.create_superuser('student','student@example.com','studentpass')
            self.stdout.write('Created superuser: student / studentpass')
        else:
            self.stdout.write('Superuser already exists.')
        if Book.objects.count() == 0:
            books = [
                {'title':'The Great Gatsby','author':'F. Scott Fitzgerald','description':'Classic novel','price':'199.00','available_copies':5,'mode':'both'},
                {'title':'1984','author':'George Orwell','description':'Dystopian novel','price':'249.00','available_copies':4,'mode':'rent'},
                {'title':'Clean Code','author':'Robert C. Martin','description':'Programming best practices','price':'799.00','available_copies':2,'mode':'buy'}
            ]
            for b in books:
                Book.objects.create(**b)
            self.stdout.write('Created sample books.')
        else:
            self.stdout.write('Books already present.')
