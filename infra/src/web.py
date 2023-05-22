from constructs import Construct
from aws_cdk import (
    RemovalPolicy,
    Stack,
    aws_s3 as s3,
    aws_iam as iam,
    aws_cloudfront as cloudfront,
    aws_certificatemanager as certificatemanager,
)
from core.constants import org_id, project_id, environment


class WebModule(Construct):
    hosting_bucket: s3.Bucket
    url: str

    def __init__(
        self,
        scope: "Construct",
        id: str,
        domain_name: str,
        certificate: certificatemanager.Certificate,
    ) -> None:
        super().__init__(scope, id)

        stack = Stack.of(self)

        self.hosting_bucket = s3.Bucket(
            self,
            "HostingBucket",
            bucket_name="-".join(
                [
                    org_id,
                    project_id,
                    environment,
                    "web",
                    stack.region,
                ]
            ),
            website_index_document="index.html",
            website_error_document="index.html",
            encryption=None,
            removal_policy=RemovalPolicy.DESTROY,
            access_control=s3.BucketAccessControl.PRIVATE,
            public_read_access=False,
        )

        origin_access_identity = cloudfront.OriginAccessIdentity(
            self, "OriginAccessIdentity", comment="OAI for website"
        )

        self.hosting_bucket.grant_read(origin_access_identity)

        cloudfront.CloudFrontWebDistribution(
            self,
            "Distribution",
            viewer_certificate=cloudfront.ViewerCertificate.from_acm_certificate(
                certificate=certificate,
                aliases=[domain_name],
            ),
            default_root_object="index.html",
            viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            http_version=cloudfront.HttpVersion.HTTP2,
            price_class=cloudfront.PriceClass.PRICE_CLASS_100,  # Cheapest
            error_configurations=[
                cloudfront.CfnDistribution.CustomErrorResponseProperty(
                    error_code=403,
                    error_caching_min_ttl=300,
                    response_page_path="/index.html",
                    response_code=200,
                ),
                cloudfront.CfnDistribution.CustomErrorResponseProperty(
                    error_code=404,
                    error_caching_min_ttl=300,
                    response_page_path="/index.html",
                    response_code=200,
                ),
            ],
            origin_configs=[
                cloudfront.SourceConfiguration(
                    s3_origin_source=cloudfront.S3OriginConfig(
                        s3_bucket_source=self.hosting_bucket,
                        origin_access_identity=origin_access_identity,
                    ),
                    behaviors=[
                        cloudfront.Behavior(
                            compress=True,
                            is_default_behavior=True,
                        )
                    ],
                )
            ],
        )

        cloudfront_s3_access = iam.PolicyStatement(
            effect=iam.Effect.ALLOW,
            actions=[
                "s3:GetBucket*",
                "s3:GetObject*",
                "s3:List*",
            ],
            resources=[
                self.hosting_bucket.bucket_arn,
                f"{self.hosting_bucket.bucket_arn}/*",
            ],
            principals=[origin_access_identity.grant_principal],
        )

        self.hosting_bucket.add_to_resource_policy(cloudfront_s3_access)

        self.url = f"https://{domain_name}"
