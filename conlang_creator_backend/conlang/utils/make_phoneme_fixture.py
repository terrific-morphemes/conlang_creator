import csv
import json
from pathlib import Path

CONLANG_DIR = Path("/home/user/Work/conlang_creator")
BACKEND_DIR = CONLANG_DIR / "conlang_creator_backend"
APP_DIR = BACKEND_DIR / "conlang"
ONSET_MODEL = "conlang.OnsetPhoneme"
NUCLEUS_MODEL = "conlang.NucleusPhoneme"
CODA_MODEL = "conlang.CodaPhoneme"
PHONEME_MODELS = [ONSET_MODEL, NUCLEUS_MODEL, CODA_MODEL]
PHONEME_CSV = APP_DIR / "resources/phonemes.csv"
DEST_JSON = APP_DIR / "fixtures/phoneme_fixture.json"

def create_phoneme_object(row, pk, model):
    obj = dict()
    obj["model"] = model
    obj["pk"] = pk
    obj["fields"] = {
        "arpa":row["ARPA"],
        "example":row["Example"],
        "ipa":row["IPA"],
        "xsampa":row["XSAMPA"],
    }
    return obj
 
def make_phoneme_fixture(phoneme_csv):
    fixture_objects = list()
    with phoneme_csv.open() as source:
        reader = csv.DictReader(source, 
                # fieldnames=["ARPA","Example","IPA","XSAMPA"]
        )
        pk_index = 0
        for row in reader:
            for model in PHONEME_MODELS:
                obj = create_phoneme_object(row, pk_index, model)
                fixture_objects.append(obj)
            pk_index += 1
    return fixture_objects

def save_phoneme_fixture_json(phoneme_fixture, dest_json):
    if not Path(dest_json.parent).exists():
        Path(dest_json.parent).mkdir(parents=True, exist_ok=True)
    with dest_json.open('w') as dest:
        json.dump(phoneme_fixture, dest)


if __name__ == "__main__":
    fixture_objects = make_phoneme_fixture(PHONEME_CSV)
    save_phoneme_fixture_json(fixture_objects, DEST_JSON)
