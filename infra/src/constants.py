import os
from pathlib import Path

environment = os.getenv("ENVIRONMENT", "prd")
org_id = os.getenv("ORG_ID", "aprovan")
project_id = "client"
aws_region = os.getenv("CDK_DEFAULT_REGION", "us-east-2")
region_short_code = os.getenv("REGION_SHORT_CODE", "use2")

project_root_dir = Path(__file__).parent.absolute() / "../../.."
