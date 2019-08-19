from django.contrib import admin
from .models import Conlang, Lemma
from .models import OnsetPhoneme, NucleusPhoneme, CodaPhoneme

# Register your models here.

class ConlangAdmin(admin.ModelAdmin):
    list_display = ('name',
            'completed', 
            'word_order',
            'fusion_level',
            'exponence_level',
            'flexivity_level',
            'max_root_syllables',
    )


class OnsetPhonemeAdmin(admin.ModelAdmin):
    def get_conlangs(self):
        return ", ".join([lang for lang in self.conlang.all()])
    
    list_display = (
        'example', 'ipa', 'arpa', 'xsampa', 'get_conlangs',
    )

class NucleusPhonemeAdmin(admin.ModelAdmin):
    def get_conlangs(self):
        return ", ".join([lang for lang in self.conlang.all()])
 
    list_display = (
        'example', 'ipa', 'arpa', 'xsampa', 'get_conlangs',
    )

class CodaPhonemeAdmin(admin.ModelAdmin):
    def get_conlangs(self):
        return ", ".join([lang for lang in self.conlang.all()])

    list_display = (
        'example', 'ipa', 'arpa', 'xsampa', 'get_conlangs',
    )

class LemmaAdmin(admin.ModelAdmin):
    list_display = (
        'root', 'meaning', 'pos', 'conlang'
    )


admin.site.register(Conlang, ConlangAdmin)
admin.site.register(OnsetPhoneme, OnsetPhonemeAdmin)
admin.site.register(NucleusPhoneme, NucleusPhonemeAdmin)
admin.site.register(CodaPhoneme, CodaPhonemeAdmin)
admin.site.register(Lemma, LemmaAdmin)
