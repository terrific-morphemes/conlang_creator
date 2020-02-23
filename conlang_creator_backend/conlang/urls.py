from django.urls import path
from . import views

urlpatterns = [
    path('lexicon/', views.build_lexicon, name='lexicon'),
]
