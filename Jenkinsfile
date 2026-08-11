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
                withCredentials([usernamePassword(
                    credentialsId: 'aws-terraform',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    bat 'terraform -chdir=terraform init -input=false'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-terraform',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    bat 'terraform -chdir=terraform plan -input=false'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t aws-devops-lab-app .'
            }
        }

        stage('Docker Test') {
            steps {
                bat 'docker compose up -d'
                bat 'timeout /t 15 /nobreak'
                bat 'curl -f http://localhost:3000'
            }
            post {
                always {
                    bat 'docker compose down'
                }
            }
        }
    }
}