"""conlang_creator_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
import conlang
from conlang import views

router = routers.DefaultRouter()
router.register(r'conlangs', views.ConlangView, 'conlang')
router.register(r'onsets', views.OnsetPhonemeView, 'onset_phoneme')
router.register(r'nuclei', views.NucleusPhonemeView, 'nucleus_phoneme')
router.register(r'codas', views.CodaPhonemeView, 'coda_phoneme')
router.register(r'lemmata', views.LemmaView, 'lemma')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('conlang/', include('conlang.urls')),
]
