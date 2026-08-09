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

stage('Terraform Check') {
    steps {
        bat 'terraform --version'
    }
}

        stage('Docker Build') {
            steps {
                bat 'docker build -t aws-devops-lab-app .'
            }
        }
    }
}