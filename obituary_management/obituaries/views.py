from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Obituary  # Import your Obituary model
from django.utils import timezone

def submit_obituary(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        date_of_birth = request.POST.get('date_of_birth')
        date_of_death = request.POST.get('date_of_death')
        content = request.POST.get('content')
        author = request.POST.get('author')
        slug = name.replace(" ", "-").lower()  

        
        new_obituary = Obituary(
            name=name,
            date_of_birth=date_of_birth,
            date_of_death=date_of_death,
            content=content,
            author=author,
            submission_date=timezone.now(),
            slug=slug
        )
        new_obituary.save()

        return HttpResponse("Obituary submitted successfully!")  # Confirmation message
    else:
        return render(request, 'obituaries/obituary_form.html')  # Render the form

        from django.shortcuts import render
from .models import Obituary

def view_obituaries(request):
    obituaries = Obituary.objects.all()
    return render(request, 'obituaries/obituary_list.html', {'obituaries': obituaries})