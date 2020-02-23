import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse
from rest_framework import viewsets
from .serializers import ConlangSerializer
from django.views.generic import ListView, DetailView
from django.views.decorators.csrf import csrf_exempt
from .models import Conlang
from .utils import create_vocab, SAMPLE_ONSETS, SAMPLE_NUCLEI, SAMPLE_CODAS
from .utils import VOCAB_FNAME
# Create your views here.


@csrf_exempt
def build_lexicon(request):
    data = json.loads(request.body)['conlangParams']
    print(data)
    onsets = data.get('onsets', SAMPLE_ONSETS)
    nuclei = data.get('nuclei', SAMPLE_NUCLEI)
    codas = data.get('codas', SAMPLE_CODAS)
    max_syl_len = int(data.get('maxSylLen', 3))
    lemmata = create_vocab(VOCAB_FNAME, onsets, nuclei, codas, max_syl_len)
    return JsonResponse({'lemmata':lemmata})

def conlang_new(request):
    """Create a new conlang
    """
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


class ConlangView(viewsets.ModelViewSet):
    serializer_class = ConlangSerializer
    queryset = Conlang.objects.all()


