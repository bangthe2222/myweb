from django.urls import path
from . import views
urlpatterns=[
    path('',views.index, name='home'),
    path('3dpage/',views.render3D, name='3dpage')
]