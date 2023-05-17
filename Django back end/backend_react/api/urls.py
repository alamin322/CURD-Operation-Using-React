from django.urls import path
from api import views

app_name = 'api'

urlpatterns = [
    path(route="list/", view=views.PlanList.as_view(), name="listview"),
    path(route='create/', view=views.PlanCreate.as_view(), name='createview'),
    path(route='delete/<int:id>',view=views.PlanDestroy.as_view(), name='deleteview'),
    path(route='update/<int:id>',view=views.PlanUpdate.as_view(), name='updateview'),
]
