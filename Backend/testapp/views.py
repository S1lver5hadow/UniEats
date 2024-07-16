from django.shortcuts import render
from django.http import HttpResponse

def helloWorld(request):
    return HttpResponse("This was updated at 16:01pm on the 31st")
