import random
import csv
from pathlib import Path

VOCAB_FNAME = Path("/home/user/Work/conlang_creator/conlang_creator_backend/conlang/resources/lexicon.csv")
SAMPLE_ONSETS = [
        'p','t','k',
        'b','d','g',
        'y','w',
        'm','n','r','l',
        's','sh','z','zh',
        'ch','j',
        'h',
        'kr', 'kl', 'ky',
        'gr', 'gl', 'gy',
        'sp', 'st', 'sk', 'sn', 'sl',
        'pl', 'pr',
        'bl', 'br', 'by',
        'tr', 'dr', 'ty',
        'zl', 'zr', 'zy',
        "",
]

SAMPLE_NUCLEI = [
    'a','e','i','o','u',
    'ae', 'ai', 
    'ei', 'eo',
]

SAMPLE_CODAS = [
        'p','t','k',
        'b','d','g',
        'y',
        'm','n','r','l',
        's','sh','z','zh',
        'ch','j',
        'sp', 'st', 'sk', 
        "ng",
]

def load_vocab(vocab_fname):
    words = list()  # (meaning, pos)
    with vocab_fname.open() as source:
        reader = csv.DictReader(source)
        for row in reader:
            meaning = row['meaning']
            pos = row['pos']
            category = row['category']
            words.append((meaning, pos, category))
    return words

def create_vocab(vocab_fname, onsets, nuclei, codas, max_syl_len):
    lemmata = list()
    used_roots = set()
    words = load_vocab(vocab_fname)
    for meaning, pos, category in words:
        is_ok = False
        # TODO: prevent possibility of endless loop
        while not is_ok:
            root = ""
            syl_len = random.randint(1, max_syl_len)
            for i in range(syl_len):
                onset = random.choice(onsets)
                nucleus = random.choice(nuclei)
                coda = random.choice(codas)
                root += "{}{}{}".format(onset, nucleus, coda)
                if root not in used_roots:
                    is_ok = True
        lemma = {
            "meaning":meaning,
            "lemma":root,
            "pos":pos,
            "category":category,
        }
        lemmata.append(lemma)
        used_roots.add(root)
    return lemmata


if __name__ == "__main__":
    lemmata = create_vocab(VOCAB_FNAME, SAMPLE_ONSETS, SAMPLE_NUCLEI, SAMPLE_CODAS, max_syl_len=2)
    for lemma in lemmata:
        print("{}: {} ({})".format(lemma['lemma'], lemma['meaning'], lemma['pos'], lemma['category']))
