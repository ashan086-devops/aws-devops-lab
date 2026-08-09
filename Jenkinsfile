pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests...'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t aws-devops-lab-app .'
            }
        }
    }
}