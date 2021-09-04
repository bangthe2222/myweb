from django.shortcuts import redirect, render

# Create your views here.
def index(request):
    return render(request,'pages/objectDT.html')
def pose_DT(request):
    return render(request,'pages/Pose_DT.html')