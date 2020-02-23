from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from pathlib import Path


"""
word_order: permutation of sov
fusion, flexivity, exponence: l, m, h


{'phonemes':[
  {'xsampa':'',
  'ipa':'',
  'description':'',
  'example':'',
  'initial':'',
  'medial':'',
  'final':''
  }
]}

{'morphemes':[
  {'category':'',
   'meaning':'',
   'lemma':''
  }
]}

{'lexemes':[
  {'category':'',
   'meaning':'',
   'lemma':''
  }
]}

"""

class Conlang(models.Model):
    name = models.CharField(max_length=100)
    word_order = models.CharField(max_length=3, default='sov')
    adpositions = models.CharField(max_length=4, default='post')
    noun_classes = models.BooleanField()
    verb_tense = models.BooleanField(default=True)
    verb_person = models.BooleanField(default=False)
    copula = models.BooleanField(default=True)
    noun_case = models.BooleanField(default=False)
    verb_aspect = models.BooleanField(default=False)
    verb_mood = models.BooleanField(default=False)
    fusion_level = models.CharField(max_length=1, default='L')
    flexivity_level = models.CharField(max_length=1, default='L')
    exponence_level = models.CharField(max_length=1, default='L')
    max_root_syllables = models.IntegerField(default=2)
    lexicon = JSONField()
    phonology = JSONField()
