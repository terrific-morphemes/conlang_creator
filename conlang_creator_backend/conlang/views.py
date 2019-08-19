from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework import viewsets
from .serializers import ConlangSerializer, LemmaSerializer
from .serializers import OnsetPhonemeSerializer, NucleusPhonemeSerializer, CodaPhonemeSerializer
from django.views.generic import ListView, DetailView
from .models import Conlang, OnsetPhoneme, NucleusPhoneme, CodaPhoneme
from .models import Lemma
from .forms import ConlangForm
from .utils import create_vocab
# Create your views here.


def conlang_new(request):
    if request.method == "POST":
        form = ConlangForm(request.POST)
        if form.is_valid():
            conlang = form.save()
            conlang.create_lemmata()
            return redirect('conlang_detail', pk=conlang.pk)
    else:
        form = ConlangForm()
    return render(request, 'conlang/conlang_edit.html', {'form':form})


class ConlangList(ListView):
    model = Conlang
    template_name = "conlang/conlang_list.html"


class ConlangDetail(DetailView):
    model = Conlang
    template_name = "conlang/conlang_detail.html"

    def get_context_data(self, **kwargs):
        obj = super().get_object()
        context = super().get_context_data(**kwargs)
        context['lemmata'] = Lemma.objects.filter(conlang=obj)
        return context


class OnsetPhonemeList(ListView):
    model = OnsetPhoneme
    template_name = "conlang/onset_phoneme_list.html"


class NucleusPhonemeList(ListView):
    model = NucleusPhoneme
    template_name = "conlang/nucleus_phoneme_list.html"


class CodaPhonemeList(ListView):
    model = CodaPhoneme
    template_name = "conlang/coda_phoneme_list.html"


class LemmaList(ListView):
    model = Lemma
    template_name = "conlang/lemma_list.html"


class ConlangView(viewsets.ModelViewSet):
    serializer_class = ConlangSerializer
    queryset = Conlang.objects.all()


class OnsetPhonemeView(viewsets.ModelViewSet):
    serializer_class = OnsetPhonemeSerializer
    queryset = OnsetPhoneme.objects.all()


class NucleusPhonemeView(viewsets.ModelViewSet):
    serializer_class = NucleusPhonemeSerializer
    queryset = NucleusPhoneme.objects.all()


class CodaPhonemeView(viewsets.ModelViewSet):
    serializer_class = CodaPhonemeSerializer
    queryset = CodaPhoneme.objects.all()


class LemmaView(viewsets.ModelViewSet):
    serializer_class = LemmaSerializer
    queryset = Lemma.objects.all()


