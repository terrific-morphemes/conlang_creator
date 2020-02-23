"""
lexicon.csv
word category

morphology.csv
morpheme category

parameters.csv
attribute display category setting

phonology.csv
xsampa ipa description initial medial final

sentences.csv
sentence translation

"""
import csv
import json
from pathlib import Path

PHONOLOGY_CSV = Path('/home/user/Work/conlang_creator/conlang_creator_backend/conlang/resources/phonology.csv')
PARAMETER_CSV = Path('/home/user/Work/conlang_creator/conlang_creator_backend/conlang/resources/parameters.csv')
DEST_FNAME = Path('/home/user/Work/conlang_creator/conlang-creator/src/resources/parameters.json')

def process_phonology(phonology_csv):
    phonemes = list()
    with phonology_csv.open() as source:
        reader = csv.DictReader(source)
        for row in reader:
            phoneme = {
                'xsampa':row['xsampa'],
                'ipa':row['ipa'],
                'description':row['description'],
            }
            phonemes.append(phoneme)
        return phonemes

def process_parameters(parameter_csv):
    parameters = list()
    with parameter_csv.open() as source:
        reader = csv.DictReader(source)
        for row in reader:
            parameter = {
                'attribute':row['attribute'],
                'display':row['display'],
                'category':row['category'],
                'setting':row['setting'].split(',')
            }
            parameters.append(parameter)
        return parameters

def process_sentences(sentence_csv):
    sentences = list()
    with sentence_csv.open() as source:
        reader = csv.DictReader(source)
        for row in reader:
            sentence = {
                'sentence':row['sentence'],
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
            }
            lexemes.append(lexeme)
        return lexemes

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

def create_parameter_json(phonology_csv, parameter_csv, dest_fname):
    parameter_data = dict()
    phonemes = process_phonology(phonology_csv)
    parameters = process_parameters(parameter_csv)
    parameter_data['phonemes'] = phonemes
    parameter_data['parameters'] = parameters
    with dest_fname.open('w') as dest:
        json.dump(parameter_data, dest)


if __name__ == "__main__":
    create_parameter_json(PHONOLOGY_CSV, PARAMETER_CSV, DEST_FNAME)
