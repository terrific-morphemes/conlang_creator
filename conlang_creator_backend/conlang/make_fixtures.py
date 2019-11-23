"""
lexicon.csv
word category

morphology.csv
morpheme category

parameters.csv
attribute category setting

phonology.csv
xsampa ipa description initial medial final

sentences.csv
sentence translation

"""
import csv
import json
from pathlib import Path

def process_phonology(phonology_csv):
    phonemes = list()
    with phonology_csv.open() as source:
        reader = csv.DictReader(source)
        for row in reader:
            morpheme = {
                'xsampa':row['xsampa'],
                'ipa':row['ipa'],
                'description':row['description'],
                'initial':row['initial'],
                'medial':row['medial'],
                'final':row['final']
            }
            phonemes.append(phoneme)
        return phonemes

def process_sentences(sentence_csv):
    sentences = list()
    with sentence_csv.open() as source:
        reader = csv.DictReader(source)
        for row in reader:
            sentence = {
                'sentence':row['sentence'],
                'translation':row['translation'],
            }
            sentences.add(sentence)
    return sentences

def process_lexicon(lexicon_csv):
    lexemes = list()
    with lexicon_csv.open() as source:
        reader = csv.DictReader(source)
        for row in reader:
            lexeme = {
                'word':row['word'],
                'category':row['category'],
                'translation':''
            }
            lexemes.append(lexeme)
        return lexemes

def process_parameters(parameter_csv):
    parameters = list()
    with parameter_csv.open() as source:
        reader = csv.DictReader(source)
        for row in reader:
            parameter = {
                'attribute':row['attribute'],
                'category':row['category'],
                'setting':row['setting']
            }
            parameters.append(parameter)
        return parameters


def process_morphology(morphology_csv):
    morphemes = list()
    with morphology_csv.open() as source:
        reader = csv.DictReader(source)
        for row in reader:
            morpheme = {
                'morpheme':row['morpheme'],
                'category':row['category'],
                'translation':''
            }
            morphemes.append(morpheme)
        return morphemes

