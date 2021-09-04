from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'pages/index.html')
def render3D(request):
    return render(request,'pages/3d_test.html')