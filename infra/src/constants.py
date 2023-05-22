import os
from pathlib import Path

environment = os.getenv("ENVIRONMENT", "production")
org_id = os.getenv("ORG_ID", "aprovan")
project_id = "client"

project_root_dir = Path(__file__).parent.absolute() / "../../.."
