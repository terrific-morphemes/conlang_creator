from rest_framework import serializers
from .models import Conlang

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

