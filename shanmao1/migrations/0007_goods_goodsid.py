# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-12-11 12:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shanmao1', '0006_user_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='goods',
            name='goodsid',
            field=models.CharField(default='', max_length=8),
        ),
    ]