from django.urls import path
from .views import ConlangList, LemmaList, conlang_new
from .views import OnsetPhonemeList, NucleusPhonemeList, CodaPhonemeList, ConlangDetail

urlpatterns = [
    path('conlangs/', ConlangList.as_view(), name='conlangs_list'),
    path('conlangs/new/', conlang_new, name='conlang_new'),
    path('conlangs/<int:pk>/', ConlangDetail.as_view(), name='conlang_detail'),
    path('onsets/', OnsetPhonemeList.as_view(), name='onsets_list'),
    path('nuclei/', NucleusPhonemeList.as_view(), name='nuclei_list'),
    path('codas/',  CodaPhonemeList.as_view(), name='codas_list'),
    path('lemmata/', LemmaList.as_view(), name='lemmata_list'),
]
