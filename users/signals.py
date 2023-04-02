from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Profile
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def createProfile(sender, instance, created, **kwargs):
    print("Profile signal triggered")
    if (created == True):
        user = instance
        profile = Profile.objects.create(
            user=user,
            username=user.username,
            email=user.email,
            name=user.first_name,
        )

@receiver(post_delete, sender=Profile)
def profileDeleted(sender, instance, **kwargs):
    print("Deleting user...")
    user = instance.user
    user.delete()

@receiver(post_save, sender=Profile)
def profileUpdated(sender, instance, created, **kwargs):
    print("Updating user...")
    user = instance.user
    if (created == False):
        user.firstName = instance.name
        user.username = instance.username
        user.email = instance.email
        user.save()

# post_save.connect(receiver=profileUpdated, sender=Profile)
# post_delete.connect(receiver=profileDeleted, sender=Profile)