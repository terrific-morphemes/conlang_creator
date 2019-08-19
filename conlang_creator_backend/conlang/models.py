from django.db import models
from pathlib import Path
from .utils import create_vocab
# Create your models here.

VOCAB_FNAME = Path("conlang/utils/vocab_list.csv")

class OnsetPhoneme(models.Model):
    example = models.CharField(max_length=50)
    ipa = models.CharField(max_length=5)
    arpa = models.CharField(max_length=5)
    xsampa = models.CharField(max_length=5)
    def __str__(self):
        return "{} ({})".format(self.ipa, self.example)


class NucleusPhoneme(models.Model):
    example = models.CharField(max_length=50)
    ipa = models.CharField(max_length=5)
    arpa = models.CharField(max_length=5)
    xsampa = models.CharField(max_length=5)
    def __str__(self):
        return "{} ({})".format(self.ipa, self.example)



class CodaPhoneme(models.Model):
    example = models.CharField(max_length=50)
    ipa = models.CharField(max_length=5)
    arpa = models.CharField(max_length=5)
    xsampa = models.CharField(max_length=5)
    def __str__(self):
        return "{} ({})".format(self.ipa, self.example)



class Conlang(models.Model):
    HIGH = 'H'
    MED = 'M'
    LOW = 'L'
    MORPH_LEVEL_CHOICES = [
        (HIGH, 'High'),
        (MED, 'Medium'),
        (LOW, 'Low'),
    ]
    WORD_ORDER_CHOICES = [
        ('SOV','SOV'),
        ('SVO','SVO'),
        ('VOS','VOS'),
        ('VSO','VSO'),
        ('OSV','OSV'),
        ('OVS','OVS'),

    ]
    name = models.CharField(max_length=120)
    completed = models.BooleanField(default=True)
    word_order = models.CharField(
        max_length=3,
        choices=WORD_ORDER_CHOICES,
        default='SOV',
    )
    # How connected grammatical markers tend to be to their host
    fusion_level = models.CharField(
            max_length=1,
            choices=MORPH_LEVEL_CHOICES,
            default=MED
    )
    # Number of categories expressed in a single marker
    exponence_level = models.CharField(
            max_length=1,
            choices=MORPH_LEVEL_CHOICES,
            default=LOW
    )
    # Level of allomorphy and inflection classes
    flexivity_level = models.CharField(
            max_length=1,
            choices=MORPH_LEVEL_CHOICES,
            default=LOW
    )
    max_root_syllables = models.IntegerField(default=2) 
    onsets = models.ManyToManyField(OnsetPhoneme)
    nuclei = models.ManyToManyField(NucleusPhoneme)
    codas = models.ManyToManyField(CodaPhoneme)

    class Meta:
        ordering = ["-name"]

    def __str__(self):
        return self.name

    def create_lemmata(self):
        onsets = [obj.ipa for obj in self.onsets.all()]
        nuclei = [obj.ipa for obj in self.nuclei.all()]
        codas =  [obj.ipa for obj in self.codas.all()]
        lemmata = create_vocab(VOCAB_FNAME, onsets, nuclei, codas, max_syl_len=self.max_root_syllables)
        for lemma in lemmata:
            l = Lemma(
                root = lemma['root'],
                meaning = lemma['meaning'],
                pos = lemma['pos'],
                conlang = self,
            )
            l.save()



class Lemma(models.Model):
    root = models.CharField(max_length=150)
    meaning = models.CharField(max_length=1000)
    pos = models.CharField(max_length=25)
    conlang = models.ForeignKey(Conlang, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return "{}: {}".format(self.root, self.meaning)


