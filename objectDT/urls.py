from django.urls import path
from . import views
urlpatterns=[
    path('objectDT/',views.index, name='objectDT'),
    path('PoseDT/', views.pose_DT, name="PoseDT")
]