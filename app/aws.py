import boto3
import os

s3_resource = boto3.resource(service_name='s3',
                             region_name='us-west',
                             aws_access_key_id=os.environ.get('S3_KEY'),
                             aws_secret_access_key=os.environ.get('S3_SECRET'),)
a = s3_resource.Bucket(os.environ.get('S3_BUCKET'))
for obj in a.objects.all():
    #object URL
    print("https://<your bucket name>.s3.<your bucket region>.amazonaws.com/")
