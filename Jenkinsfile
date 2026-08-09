pipeline {
    agent any


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

        stage('Docker Build') {
            steps {
                bat 'docker build -t aws-devops-lab-app .'
            }
        }
    }
}