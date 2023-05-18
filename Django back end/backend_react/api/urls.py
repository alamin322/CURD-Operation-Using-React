from api import views
from django.urls import path

app_name = 'api'

urlpatterns = [
    path(route="list/", view=views.PlanList.as_view(), name="listview"),
    path(route='create/', view=views.PlanCreate.as_view(), name='createview'),
    path(route='read/<int:pk>', view=views.PlanRetrieve.as_view(), name='readview'),
    path(route='update/<int:id>', view=views.PlanUpdate.as_view(), name='updateview'),
    path(route='delete/<int:id>', view=views.PlanDestroy.as_view(), name='deleteview'),
]
