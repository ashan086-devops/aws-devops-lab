pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Terraform Init') {
            steps {
                bat 'terraform -chdir=terraform init -input=false'
            }
        }

        stage('Terraform Plan') {
            steps {
                bat 'terraform -chdir=terraform plan -input=false'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t aws-devops-lab-app .'
            }
        }
    }
}