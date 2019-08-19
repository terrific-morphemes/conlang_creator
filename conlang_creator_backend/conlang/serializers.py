from rest_framework import serializers
from .models import Conlang, OnsetPhoneme, NucleusPhoneme, CodaPhoneme
from .models import Lemma

class ConlangSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conlang
        fields = (
            'id',
            'name',
            'completed',
            'word_order',
            'fusion_level',
            'exponence_level',
            'flexivity_level',
            'max_root_syllables',
        )
class OnsetPhonemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnsetPhoneme
        fields = (
            'id',
            'example',
            'ipa',
            'arpa',
            'xsampa',
            'conlang',
        )
class NucleusPhonemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NucleusPhoneme
        fields = (
            'id',
            'example',
            'ipa',
            'arpa',
            'xsampa',
            'conlang',
        )
class CodaPhonemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodaPhoneme
        fields = (
            'id',
            'example',
            'ipa',
            'arpa',
            'xsampa',
            'conlang',
        )
class LemmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lemma
        fields = (
            'id',
            'root',
            'meaning',
            'pos',
            'conlang',
        )

