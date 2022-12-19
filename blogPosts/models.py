from django.db import models
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth.models import User
from tags.models import Tag

class Post(models.Model):
    title = models.CharField(max_length=256)
    content = models.TextField()
    author = models.ForeignKey(User, null=True, on_delete= models.CASCADE)
    like_users = models.ManyToManyField(User, blank=True, related_name='like_posts', through='Like')
    tags = models.ManyToManyField(Tag, blank=True, related_name='posts')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    like_users = models.ManyToManyField(User, blank=True, related_name='like_posts', through='Like')
    tags = models.ManyToManyField(Tag, blank=True, related_name='posts')
    
    def update_date(self):
        self.update_at = timezone.now()
        self.save()

    def __str__(self):
        return self.title


class Comment(models.Model):
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(User, blank=True, related_name='like_comments', through='CommentLike')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'[post: {self.post}] {self.content}'

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)


class CommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
