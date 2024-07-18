from django.urls import path
from .views import get_movies, save_movie

urlpatterns = [
    path("save-movie/", save_movie, name="save_movie"),  # type:ignore
    path("get-movies/", get_movies, name="get_movies"),  # type:ignore
]
