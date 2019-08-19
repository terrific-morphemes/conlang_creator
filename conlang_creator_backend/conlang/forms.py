from django import forms
from .models import Conlang, Lemma
from .models import OnsetPhoneme, NucleusPhoneme, CodaPhoneme

class ConlangForm(forms.ModelForm):
    onsets = forms.ModelMultipleChoiceField(
            queryset=OnsetPhoneme.objects.all(), 
            widget=forms.CheckboxSelectMultiple(attrs={"checked":""}),
            )
    nuclei = forms.ModelMultipleChoiceField(
            queryset=NucleusPhoneme.objects.all(),
            widget=forms.CheckboxSelectMultiple(attrs={"checked":""}),
            )
    codas = forms.ModelMultipleChoiceField(queryset=CodaPhoneme.objects.all(),
            widget=forms.CheckboxSelectMultiple(attrs={"checked":""})
            )
 
    class Meta:
        model = Conlang
        fields = (
                'name', 
                'completed', 
                'word_order', 
                'fusion_level', 
                'exponence_level', 
                'flexivity_level', 
                'max_root_syllables',
                'onsets',
                'nuclei',
                'codas',
            ) 

