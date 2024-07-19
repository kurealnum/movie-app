from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Movie
import json


@api_view(["POST"])
def save_movie(request):
    data = request.data
    title = data["title"]

    saved_movie = Movie.objects.create(title=title)

    if saved_movie:
        return Response({"success": "movie saved"}, status=201)
    else:
        return Response({"error": "something went wrong"}, status=400)


@api_view(["GET"])
def get_movies(request):  # type:ignore
    movies = Movie.objects.values()

    return Response({"movies": movies})
