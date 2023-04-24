from .models import Profile, Skill, Message
from rest_framework import serializers
from django.contrib.auth.models import User

class SkillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()
    skills = serializers.StringRelatedField(many=True)
    messages_sent = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='inbox', source='sender')
    messages_received = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='inbox', source='messages')
    class Meta:
        model = Profile
        fields = '__all__'

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    # sender = serializers.HyperlinkedRelatedField(view_name='profile-detail', read_only=True)
    # recipient = serializers.HyperlinkedRelatedField(view_name='profile-detail', queryset=Profile.objects.all())

    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ['id', 'is_read', 'createdAt']
