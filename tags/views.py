from django.shortcuts import render, redirect
from tags.models import Tag
from blogPosts.models import Post
from django.http import HttpResponse, JsonResponse

class TagView:
    def create(request):
        tag = Tag.objects.create(content=request.POST['content'])
        return JsonResponse({'tagId': tag.id})
    
    def read(request, id):
        tag = Tag.objects.get(id=id)
        posts = Post.objects.filter(tags=tag)
        return render(request, 'tags/detail.html', {'tag': tag, 'posts': posts})
    
    def update(request, id):
        tag = Tag.objects.get(id=id)
        tag.content = request.POST['content']
        tag.save()
        if request.method == 'POST':
            return HttpResponse(status=200)
        else:
            return render(request, 'tag/detail.html', {'tag': tag})
    
    def delete(request, id):
        Tag.objects.get(id=id).delete()
        return redirect('blogPosts:index')
