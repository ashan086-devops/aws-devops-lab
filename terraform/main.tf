terraform {
  backend "s3" {
    bucket = "aws-devops-lab-terraform-state-2026"
    key    = "devops-lab/terraform.tfstate"
    region = "ap-southeast-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}

data "aws_ssm_parameter" "amazon_linux" {
  name = "/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64"
}

resource "aws_instance" "devops_lab" {
  ami           = data.aws_ssm_parameter.amazon_linux.value
  instance_type = "t3.micro"


  tags = {
    Name        = "devops-lab"
    Environment = "dev"
  }
}
