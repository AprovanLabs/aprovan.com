import os

import aws_cdk as cdk
from aws_cdk import Stack, Tags, CfnOutput
from aws_cdk import aws_certificatemanager as certificatemanager
from constructs import Construct
from src.web import Web
from src.constants import environment, project_id


class ClientStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        web = Web(
            self,
            f"{id}-Web",
            domain_name=os.getenv("DOMAIN_NAME"),
            certificate=certificatemanager.Certificate.from_certificate_arn(
                self,
                "Certificate",
                certificate_arn=os.getenv("CERTIFICATE_ARN"),
            ),
        )

        CfnOutput(self, "WebUrl", value=web.url)


app = cdk.App()

project_name = project_id.capitalize()
stack = ClientStack(
    app,
    f"{project_name}-{environment.capitalize()}",
    env=cdk.Environment(
        account=os.environ["CDK_DEFAULT_ACCOUNT"],
        region=os.environ["CDK_DEFAULT_REGION"],
    ),
)
Tags.of(stack).add("Project", project_name)
Tags.of(stack).add("Environment", environment.capitalize())

app.synth()
