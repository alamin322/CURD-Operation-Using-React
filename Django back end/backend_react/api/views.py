from api.models import Plan
from api.serializers import PlanSerializer
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, UpdateAPIView


# Create your views here.
class PlanList(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanCreate(CreateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanDestroy(DestroyAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    lookup_field = 'id'


class PlanUpdate(UpdateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    lookup_field = 'id'